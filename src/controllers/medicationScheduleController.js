const pool = require("../config/db");

// Helper untuk format ISO String ke 'YYYY-MM-DD HH:mm:ss'
const formatDateTime = (dateString) => {
  if (!dateString) return null;
  if (typeof dateString === "string" && dateString.length === 10 && !dateString.includes("T")) {
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
      schedule_date, // Nilai timestamp (misal: "2026-09-24 08:00:00" atau ISO string)
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
      [medication_id, formattedScheduleDate, status, formattedTakenAt, late]
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
      SELECT ms.*, m.user_id, m.drug_names, m.rules
      FROM medication_schedules ms
      JOIN medications m ON ms.medication_id = m.id
      WHERE 1=1
    `;
    const params = [];

    // Filter user_id
    if (user_id) {
      query += " AND m.user_id = ?";
      params.push(user_id);
    }

    // Filter Range vs Single Date/Timestamp
    if (start_date && end_date) {
      const formattedStart = formatDateTime(start_date) || start_date;
      const formattedEnd = formatDateTime(end_date) || end_date;
      query += " AND ms.schedule_date >= ? AND ms.schedule_date <= ?";
      params.push(formattedStart, formattedEnd);
    } else if (schedule_date) {
      // Jika input format tanggal YYYY-MM-DD, lakukan filter DATE() dengan konversi timezone
      if (schedule_date.length === 10) {
        query += " AND DATE(CONVERT_TZ(ms.schedule_date, '+00:00', ?)) = DATE(?)";
        params.push(timezone, schedule_date);
      } else {
        query += " AND ms.schedule_date = ?";
        params.push(formatDateTime(schedule_date));
      }
    }

    // Filter status
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
    const [rows] = await pool.query(
      `SELECT ms.*, m.user_id, m.drug_names, m.rules
       FROM medication_schedules ms
       JOIN medications m ON ms.medication_id = m.id
       WHERE ms.id = ?`,
      [id]
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

// 4. Memperbarui jadwal obat
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { medication_id, schedule_date, status, takenAt, late } = req.body;

    const formattedScheduleDate = formatDateTime(schedule_date);
    const formattedTakenAt = formatDateTime(takenAt);

    const [result] = await pool.query(
      `UPDATE medication_schedules 
       SET medication_id = ?, schedule_date = ?, status = ?, takenAt = ?, late = ? 
       WHERE id = ?`,
      [medication_id, formattedScheduleDate, status, formattedTakenAt, late, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Jadwal obat tidak ditemukan" });
    }

    res.status(200).json({ message: "Jadwal obat berhasil diperbarui" });
  } catch (error) {
    console.error("Error updateSchedule:", error);
    res.status(500).json({ error: "Gagal memperbarui jadwal obat" });
  }
};

// 5. Menghapus jadwal obat
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM medication_schedules WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Jadwal obat tidak ditemukan" });
    }

    res.status(200).json({ message: "Jadwal obat berhasil dihapus" });
  } catch (error) {
    console.error("Error deleteSchedule:", error);
    res.status(500).json({ error: "Gagal menghapus jadwal obat" });
  }
};