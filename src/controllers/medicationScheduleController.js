const pool = require("../config/db");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();

// ==========================================
// FUNGSI HELPER
// ==========================================

// Fungsi helper untuk mengirim silent push
const sendSilentPush = async (expoPushToken) => {
  if (!Expo.isExpoPushToken(expoPushToken)) return;

  const messages = [
    {
      to: expoPushToken,
      data: { action: "SYNC_MEDICATION_SCHEDULES" },
      // _contentAvailable: true sangat penting di iOS untuk background sync
      _contentAvailable: true,
    },
  ];

  try {
    const chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
      await expo.sendPushNotificationsAsync(chunk);
    }
  } catch (error) {
    console.error("Gagal mengirim silent push:", error);
  }
};

// Helper baru: Ekstrak logika pencarian token dan trigger push ke dalam 1 fungsi
const triggerSyncPushForUser = async (medicationId) => {
  try {
    // Cari expo_push_token milik user yang memiliki medication_id tersebut
    const [users] = await pool.query(
      `SELECT u.expo_push_token 
       FROM users u
       JOIN medications m ON u.id = m.user_id
       WHERE m.id = ?`,
      [medicationId]
    );

    if (users.length > 0 && users[0].expo_push_token) {
      // Kirim silent push tanpa perlu 'await' agar response API lebih cepat
      sendSilentPush(users[0].expo_push_token);
    }
  } catch (error) {
    console.error("Gagal mencari token untuk push sync:", error);
  }
};

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

// ==========================================
// KONTROLER UTAMA
// ==========================================

// 1. Menambahkan jadwal obat baru
exports.createSchedule = async (req, res) => {
  try {
    const { medication_id, schedule_date, status = "pending", takenAt = null, late = 0 } = req.body;

    const formattedScheduleDate = formatDateTime(schedule_date);
    const formattedTakenAt = formatDateTime(takenAt);

    const [result] = await pool.query(`INSERT INTO medication_schedules (medication_id, schedule_date, status, takenAt, late) VALUES (?, ?, ?, ?, ?)`, [medication_id, formattedScheduleDate, status, formattedTakenAt, late]);

    // 🚀 ACTION: Pemicu push notifikasi setelah insert berhasil
    triggerSyncPushForUser(medication_id);

    res.status(201).json({
      id: result.insertId,
      message: "Jadwal obat berhasil ditambahkan",
    });
  } catch (error) {
    console.error("Error createSchedule:", error);
    res.status(500).json({ error: "Gagal menambahkan jadwal obat" });
  }
};

// 2. Mengambil semua jadwal obat
exports.getAllSchedules = async (req, res) => {
  // ... (Tidak ada perubahan pada get/read) ...
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
        const startOfRangeLocal = `${start_date}T00:00:00${timezone}`;
        const endOfRangeLocal = `${end_date}T23:59:59${timezone}`;

        const utcStartRange = new Date(startOfRangeLocal).toISOString().slice(0, 19).replace("T", " ");
        const utcEndRange = new Date(endOfRangeLocal).toISOString().slice(0, 19).replace("T", " ");

        query += " AND ms.schedule_date >= ? AND ms.schedule_date <= ?";
        params.push(utcStartRange, utcEndRange);
      } else {
        const formattedStart = formatDateTime(start_date) || start_date;
        const formattedEnd = formatDateTime(end_date) || end_date;
        query += " AND ms.schedule_date >= ? AND ms.schedule_date <= ?";
        params.push(formattedStart, formattedEnd);
      }
    } else if (schedule_date) {
      if (schedule_date.length === 10) {
        const startOfDayLocal = `${schedule_date}T00:00:00${timezone}`;
        const endOfDayLocal = `${schedule_date}T23:59:59${timezone}`;

        const utcStart = new Date(startOfDayLocal).toISOString().slice(0, 19).replace("T", " ");
        const utcEnd = new Date(endOfDayLocal).toISOString().slice(0, 19).replace("T", " ");

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
  // ... (Tidak ada perubahan pada get/read) ...
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT ms.*, m.user_id, m.generic_name, m.brand_name, m.dosage_form, m.strength, m.route, m.meal_relation
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

// 4. Memperbarui status jadwal obat
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { medication_id, schedule_date, status, takenAt, late } = req.body;

    // A. Ambil data lama terlebih dahulu sebelum diupdate
    const [schedules] = await pool.query("SELECT * FROM medication_schedules WHERE id = ?", [id]);
    
    if (schedules.length === 0) {
      return res.status(404).json({ message: "Jadwal obat tidak ditemukan" });
    }

    const existing = schedules[0];

    // B. Atur nilai baru, jika tidak dikirim dalam request body, gunakan nilai lama dari DB
    const newMedicationId = medication_id !== undefined ? medication_id : existing.medication_id;
    const newStatus = status !== undefined ? status.toLowerCase() : existing.status;
    const newLate = late !== undefined ? late : existing.late;
    const newScheduleDate = schedule_date !== undefined ? formatDateTime(schedule_date) : formatDateTime(existing.schedule_date);
    const newTakenAt = takenAt !== undefined ? formatDateTime(takenAt) : formatDateTime(existing.takenAt);

    // C. Validasi status jika dikirimkan oleh user
    if (status !== undefined) {
      const allowedStatuses = ["pending", "taken", "missed"];
      if (!allowedStatuses.includes(newStatus)) {
        return res.status(400).json({
          error: "Status tidak valid. Gunakan 'pending', 'taken', atau 'missed'.",
        });
      }
    }

    // D. Lakukan Update Menyeluruh ke tabel
    await pool.query(
      "UPDATE medication_schedules SET medication_id = ?, schedule_date = ?, status = ?, takenAt = ?, late = ? WHERE id = ?", 
      [newMedicationId, newScheduleDate, newStatus, newTakenAt, newLate, id]
    );

    // 🚀 ACTION: Pemicu push notifikasi (menggunakan medication_id yang baru agar akurat)
    triggerSyncPushForUser(newMedicationId);

    res.status(200).json({ message: "Semua aspek jadwal obat berhasil diperbarui" });
  } catch (error) {
    console.error("Error updateSchedule:", error);
    res.status(500).json({ error: "Gagal memperbarui jadwal obat" });
  }
};

// 5. Menghapus jadwal obat
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    
    // A. Sebelum dihapus, simpan medication_id-nya untuk target notifikasi
    const [schedules] = await pool.query("SELECT medication_id FROM medication_schedules WHERE id = ?", [id]);

    if (schedules.length === 0) {
      return res.status(404).json({ message: "Jadwal obat tidak ditemukan" });
    }

    // B. Lakukan penghapusan
    await pool.query("DELETE FROM medication_schedules WHERE id = ?", [id]);

    // 🚀 ACTION: Pemicu push notifikasi (menyuruh app agar menghapus alarm obat ini)
    triggerSyncPushForUser(schedules[0].medication_id);

    res.status(200).json({ message: "Jadwal obat berhasil dihapus" });
  } catch (error) {
    console.error("Error deleteSchedule:", error);
    res.status(500).json({ error: "Gagal menghapus jadwal obat" });
  }
};