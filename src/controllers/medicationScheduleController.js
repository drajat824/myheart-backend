const pool = require("../config/db");

// Helper untuk format ISO String ke 'YYYY-MM-DD HH:mm:ss'
const formatDateTime = (dateString) => {
  if (!dateString) return null;
  if (
    typeof dateString === "string" &&
    dateString.length === 10 &&
    !dateString.includes("T")
  ) {
    return dateString;
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toISOString().slice(0, 19).replace("T", " ");
};

// 1. Menambahkan jadwal obat baru
exports.createSchedule = async (req, res) => {
  try {
    const {
      medication_id,
      schedule_date,
      status = "pending",
      takenAt = null,
      late = 0,
    } = req.body;

    const formattedScheduleDate = formatDateTime(schedule_date);
    const formattedTakenAt = formatDateTime(takenAt);

    const [result] = await pool.query(
      `INSERT INTO medication_schedules 
       (medication_id, schedule_date, status, takenAt, late) 
       VALUES (?, ?, ?, ?, ?)`,
      [medication_id, formattedScheduleDate, status, formattedTakenAt, late],
    );

    res.status(201).json({
      id: result.insertId,
      message: "Jadwal obat berhasil ditambahkan",
    });
  } catch (error) {
    console.error("Error createSchedule:", error);
    res.status(500).json({ error: "Gagal menambahkan jadwal obat" });
  }
};

// 2. Mengambil semua jadwal obat (Support Single Date, Range Date, maupun Range Timestamp)
exports.getAllSchedules = async (req, res) => {
  try {
    const { user_id, schedule_date, start_date, end_date, status, timezone = "+07:00" } = req.query;

    let query = `
      SELECT ms.*, m.user_id, m.generic_name, m.brand_name, m.dosage_form, m.strength, m.route, m.meal_relation
      FROM medication_schedules ms
      JOIN medications m ON ms.medication_id = m.id
      WHERE 1=1
    `;
    const params = [];

    if (user_id) {
      query += " AND m.user_id = ?";
      params.push(user_id);
    }
    
    if (start_date && end_date) {
      if (start_date.length === 10 && end_date.length === 10) {
        // 1. Rangkai menjadi waktu batas awal (start_date) dan akhir (end_date) di lokasi user
        const startOfRangeLocal = `${start_date}T00:00:00${timezone}`;
        const endOfRangeLocal = `${end_date}T23:59:59${timezone}`;

        // 2. Konversi ke waktu absolut (UTC) untuk dicocokkan ke database
        const utcStartRange = new Date(startOfRangeLocal).toISOString().slice(0, 19).replace("T", " ");
        const utcEndRange = new Date(endOfRangeLocal).toISOString().slice(0, 19).replace("T", " ");

        query += " AND ms.schedule_date >= ? AND ms.schedule_date <= ?";
        params.push(utcStartRange, utcEndRange);
      } else {
        // Fallback jika suatu saat frontend mengirim format timestamp (YYYY-MM-DD HH:mm:ss)
        const formattedStart = formatDateTime(start_date) || start_date;
        const formattedEnd = formatDateTime(end_date) || end_date;
        query += " AND ms.schedule_date >= ? AND ms.schedule_date <= ?";
        params.push(formattedStart, formattedEnd);
      }
    } else if (schedule_date) {
      if (schedule_date.length === 10) {
        // --- LOGIKA BARU: Filter Jam 12 Malam ke 12 Malam Sesuai Timezone User ---
        
        // 1. Rangkai menjadi format waktu lokal User sesuai parameter tanggal dan timezone
        // Contoh: "2026-09-24T00:00:00+07:00" dan "2026-09-24T23:59:59+07:00"
        const startOfDayLocal = `${schedule_date}T00:00:00${timezone}`;
        const endOfDayLocal = `${schedule_date}T23:59:59${timezone}`;

        // 2. Konversi waktu lokal tersebut ke format UTC
        // toISOString() akan mengembalikan ke waktu UTC (contoh: "2026-09-23T17:00:00.000Z")
        const utcStart = new Date(startOfDayLocal).toISOString().slice(0, 19).replace("T", " ");
        const utcEnd = new Date(endOfDayLocal).toISOString().slice(0, 19).replace("T", " ");

        // 3. Query menggunakan rentang waktu UTC yang sudah dihitung
        query += " AND ms.schedule_date >= ? AND ms.schedule_date <= ?";
        params.push(utcStart, utcEnd);
      } else {
        query += " AND ms.schedule_date = ?";
        params.push(formatDateTime(schedule_date));
      }
    }

    if (status) {
      query += " AND ms.status = ?";
      params.push(status);
    }

    query += " ORDER BY ms.schedule_date ASC";

    const [rows] = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getAllSchedules:", error);
    res.status(500).json({ error: "Gagal mengambil jadwal obat" });
  }
};

// 3. Mengambil detail jadwal obat berdasarkan ID
exports.getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Update query SELECT untuk menyesuaikan relasi field tabel medications terbaru
    const [rows] = await pool.query(
      `SELECT ms.*, m.user_id, m.generic_name, m.brand_name, m.dosage_form, m.strength, m.route, m.meal_relation
       FROM medication_schedules ms
       JOIN medications m ON ms.medication_id = m.id
       WHERE ms.id = ?`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Jadwal obat tidak ditemukan" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error getScheduleById:", error);
    res.status(500).json({ error: "Gagal mengambil detail jadwal obat" });
  }
};

// 4. Memperbarui status jadwal obat
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Field 'status' wajib diisi" });
    }

    const allowedStatuses = ["pending", "taken", "missed"];
    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        error: "Status tidak valid. Gunakan 'pending', 'taken', atau 'missed'.",
      });
    }

    const [result] = await pool.query(
      "UPDATE medication_schedules SET status = ? WHERE id = ?",
      [status.toLowerCase(), id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Jadwal obat tidak ditemukan" });
    }

    res.status(200).json({ message: "Status jadwal obat berhasil diperbarui" });
  } catch (error) {
    console.error("Error updateSchedule:", error);
    res.status(500).json({ error: "Gagal memperbarui status jadwal obat" });
  }
};

// 5. Menghapus jadwal obat
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "DELETE FROM medication_schedules WHERE id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Jadwal obat tidak ditemukan" });
    }

    res.status(200).json({ message: "Jadwal obat berhasil dihapus" });
  } catch (error) {
    console.error("Error deleteSchedule:", error);
    res.status(500).json({ error: "Gagal menghapus jadwal obat" });
  }
};
