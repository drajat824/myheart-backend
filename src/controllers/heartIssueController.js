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

// Create
exports.createHeartIssue = async (req, res) => {
  try {
    const { user_id, issue_type, bpm_recorded, recorded_at } = req.body;

    // Format tanggal sebelum query
    const formattedRecordedAt = formatDateTime(recorded_at);

    const [result] = await pool.query(
      "INSERT INTO heart_issues (user_id, issue_type, bpm_recorded, recorded_at) VALUES (?, ?, ?, ?)",
      [user_id, issue_type, bpm_recorded, formattedRecordedAt],
    );
    res
      .status(201)
      .json({
        id: result.insertId,
        message: "Data heart issue berhasil ditambahkan",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambahkan data" });
  }
};

// Read All / Filter by Date or Date Range
exports.getAllHeartIssues = async (req, res) => {
  try {
    // Tangkap parameter timezone (default '+07:00' jika tidak dikirim)
    const { date, start_time, end_time, user_id, timezone = "+07:00" } = req.query;

    let query = "SELECT * FROM heart_issues WHERE 1=1";
    const params = [];

    // Filter berdasarkan user_id (opsional)
    if (user_id) {
      query += " AND user_id = ?";
      params.push(user_id);
    }

    // Penanganan filter tanggal menggunakan kolom recorded_at
    const singleDate = date || (!end_time ? start_time : null);

    if (singleDate && !end_time) {
      // Case 1: Filter 1 tanggal (konversi UTC di DB ke timezone pilihan user)
      query += " AND DATE(CONVERT_TZ(recorded_at, '+00:00', ?)) = DATE(?)";
      params.push(timezone, singleDate);
    } else if (start_time && end_time) {
      // Case 2: Filter Rentang Tanggal / Waktu
      if (start_time.length === 10 && end_time.length === 10) {
        // Rentang YYYY-MM-DD
        query += " AND DATE(CONVERT_TZ(recorded_at, '+00:00', ?)) BETWEEN ? AND ?";
        params.push(timezone, start_time, end_time);
      } else {
        // Rentang timestamp ISO / Date Time murni
        const formattedStart = formatDateTime(start_time) || start_time;
        const formattedEnd = formatDateTime(end_time) || end_time;
        query += " AND recorded_at >= ? AND recorded_at <= ?";
        params.push(formattedStart, formattedEnd);
      }
    }

    query += " ORDER BY recorded_at DESC";

    const [rows] = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Read One by ID
exports.getHeartIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM heart_issues WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Update
exports.updateHeartIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, issue_type, bpm_recorded, recorded_at } = req.body;

    // Format tanggal sebelum query
    const formattedRecordedAt = formatDateTime(recorded_at);

    const [result] = await pool.query(
      "UPDATE heart_issues SET user_id = ?, issue_type = ?, bpm_recorded = ?, recorded_at = ? WHERE id = ?",
      [user_id, issue_type, bpm_recorded, formattedRecordedAt, id],
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json({ message: "Data berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memperbarui data" });
  }
};

// Delete
exports.deleteHeartIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM heart_issues WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus data" });
  }
};