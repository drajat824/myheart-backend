const pool = require("../config/db");

const formatDateTime = (dateString) => {
  if (!dateString) return null;

  // Jika berupa tanggal saja (YYYY-MM-DD), biarkan untuk query filter
  if (typeof dateString === "string" && dateString.length === 10 && !dateString.includes("T")) {
    return dateString;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  // Simpan dalam format YYYY-MM-DD HH:mm:ss murni UTC
  return date.toISOString().slice(0, 19).replace("T", " ");
};

// Create Realtime Heart Rate Data
exports.createHeartRate = async (req, res) => {
  try {
    const { user_id, bpm, start_time, end_time } = req.body;

    const formattedStart = formatDateTime(start_time);
    const formattedEnd = formatDateTime(end_time);

    const [result] = await pool.query(
      "INSERT INTO heart_rates (user_id, bpm, start_time, end_time) VALUES (?, ?, ?, ?)",
      [user_id, bpm, formattedStart, formattedEnd]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Data realtime heart rate berhasil ditambahkan",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambahkan data realtime heart rate" });
  }
};

// Read All / Filter by Date or Date Range with Pagination
exports.getAllHeartRates = async (req, res) => {
  try {
    const { date, start_time, end_time, user_id, timezone = "+07:00" } = req.query;

    // 1. Setup Pagination (Default: Page 1, Limit 30)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const offset = (page - 1) * limit;

    let whereClause = " WHERE 1=1";
    const params = [];

    // 2. Build Where Clause
    if (user_id) {
      whereClause += " AND user_id = ?";
      params.push(user_id);
    }

    const singleDate = date || (!end_time ? start_time : null);

    if (singleDate && !end_time) {
      whereClause += " AND DATE(CONVERT_TZ(start_time, '+00:00', ?)) = DATE(?)";
      params.push(timezone, singleDate);
    } else if (start_time && end_time) {
      if (start_time.length === 10 && end_time.length === 10) {
        whereClause += " AND DATE(CONVERT_TZ(start_time, '+00:00', ?)) BETWEEN ? AND ?";
        params.push(timezone, start_time, end_time);
      } else {
        const formattedStart = formatDateTime(start_time) || start_time;
        const formattedEnd = formatDateTime(end_time) || end_time;
        whereClause += " AND start_time >= ? AND start_time <= ?";
        params.push(formattedStart, formattedEnd);
      }
    }

    // 3. Query Total Data untuk Metadata Paginasi
    const countQuery = `SELECT COUNT(*) as total FROM heart_rates ${whereClause}`;
    const [countRows] = await pool.query(countQuery, params);
    const totalItems = countRows[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    // 4. Query Data Utama dengan Limit & Offset
    const dataQuery = `SELECT * FROM heart_rates ${whereClause} ORDER BY start_time DESC LIMIT ? OFFSET ?`;
    
    // Duplikasi params dan tambahkan limit serta offset di akhir array
    const dataParams = [...params, limit, offset];
    
    const [rows] = await pool.query(dataQuery, dataParams);

    // 5. Kirim Response dengan Struktur Paginasi
    res.status(200).json({
      data: rows,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Read One by ID
exports.getHeartRateById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM heart_rates WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data realtime heart rate" });
  }
};

// Update
exports.updateHeartRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, bpm, start_time, end_time } = req.body;

    const formattedStart = formatDateTime(start_time);
    const formattedEnd = formatDateTime(end_time);

    const [result] = await pool.query(
      "UPDATE heart_rates SET user_id = ?, bpm = ?, start_time = ?, end_time = ? WHERE id = ?",
      [user_id, bpm, formattedStart, formattedEnd, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({ message: "Data realtime heart rate berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memperbarui data" });
  }
};

// Delete
exports.deleteHeartRate = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM heart_rates WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({ message: "Data realtime heart rate berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus data" });
  }
};