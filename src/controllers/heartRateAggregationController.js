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
exports.createHeartRate = async (req, res) => {
  try {
    const { user_id, bpm, start_time, end_time } = req.body;

    // Format tanggal sebelum query
    const formattedStart = formatDateTime(start_time);
    const formattedEnd = formatDateTime(end_time);

    const [result] = await pool.query(
      "INSERT INTO heart_rates_aggregation (user_id, bpm, start_time, end_time) VALUES (?, ?, ?, ?)",
      [user_id, bpm, formattedStart, formattedEnd],
    );
    res
      .status(201)
      .json({
        id: result.insertId,
        message: "Data heart rate berhasil ditambahkan",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambahkan data" });
  }
};

// Read All
// Read All / Filter by Date or Date Range
exports.getAllHeartRates = async (req, res) => {
  try {
    // Ambil timezone dari query string (default +07:00 jika tidak dikirim)
    const { date, start_time, end_time, user_id, timezone = "+07:00" } = req.query;

    let query = "SELECT * FROM heart_rates_aggregation WHERE 1=1";
    const params = [];

    if (user_id) {
      query += " AND user_id = ?";
      params.push(user_id);
    }

    const singleDate = date || (!end_time ? start_time : null);

    if (singleDate && !end_time) {
      // Konversi waktu UTC di DB (+00:00) ke timezone dinamis pilihan user
      query += " AND DATE(CONVERT_TZ(start_time, '+00:00', ?)) = DATE(?)";
      params.push(timezone, singleDate);
    } else if (start_time && end_time) {
      if (start_time.length === 10 && end_time.length === 10) {
        query += " AND DATE(CONVERT_TZ(start_time, '+00:00', ?)) BETWEEN ? AND ?";
        params.push(timezone, start_time, end_time);
      } else {
        const formattedStart = formatDateTime(start_time) || start_time;
        const formattedEnd = formatDateTime(end_time) || end_time;
        query += " AND start_time >= ? AND start_time <= ?";
        params.push(formattedStart, formattedEnd);
      }
    }

    query += " ORDER BY start_time DESC";

    const [rows] = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Read One by ID
exports.getHeartRateById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM heart_rates_aggregation WHERE id = ?", [
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
exports.updateHeartRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, bpm, start_time, end_time } = req.body;

    // Format tanggal sebelum query
    const formattedStart = formatDateTime(start_time);
    const formattedEnd = formatDateTime(end_time);

    const [result] = await pool.query(
      "UPDATE heart_rates_aggregation SET user_id = ?, bpm = ?, start_time = ?, end_time = ? WHERE id = ?",
      [user_id, bpm, formattedStart, formattedEnd, id],
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
exports.deleteHeartRate = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM heart_rates_aggregation WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus data" });
  }
};

