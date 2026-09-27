const pool = require("../config/db");

// Create
exports.createPeriodicCheck = async (req, res) => {
  try {
    const { user_id, check_date, weight, height, blood_sugar, cholesterol } = req.body;

    const [result] = await pool.query(
      "INSERT INTO periodic_checks (user_id, check_date, weight, height, blood_sugar, cholesterol) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, check_date, weight, height, blood_sugar, cholesterol]
    );
    res.status(201).json({
      id: result.insertId,
      message: "Data periodic check berhasil ditambahkan",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambahkan data" });
  }
};

// Read All / Filter by Date or Date Range
exports.getAllPeriodicChecks = async (req, res) => {
  try {
    const { date, start_date, end_date, user_id } = req.query;

    let query = "SELECT * FROM periodic_checks WHERE 1=1";
    const params = [];

    // Filter berdasarkan user_id (opsional)
    if (user_id) {
      query += " AND user_id = ?";
      params.push(user_id);
    }

    // Penanganan filter tanggal menggunakan kolom check_date
    const singleDate = date || (!end_date ? start_date : null);

    if (singleDate && !end_date) {
      // Filter 1 tanggal spesifik (YYYY-MM-DD)
      query += " AND check_date = ?";
      params.push(singleDate);
    } else if (start_date && end_date) {
      // Filter Rentang Tanggal (YYYY-MM-DD)
      query += " AND check_date BETWEEN ? AND ?";
      params.push(start_date, end_date);
    }

    query += " ORDER BY check_date DESC";

    const [rows] = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Read One by ID
exports.getPeriodicCheckById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM periodic_checks WHERE id = ?", [id]);
    
    if (rows.length === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
      
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Update
exports.updatePeriodicCheck = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, check_date, weight, height, blood_sugar, cholesterol } = req.body;

    const [result] = await pool.query(
      "UPDATE periodic_checks SET user_id = ?, check_date = ?, weight = ?, height = ?, blood_sugar = ?, cholesterol = ? WHERE id = ?",
      [user_id, check_date, weight, height, blood_sugar, cholesterol, id]
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
exports.deletePeriodicCheck = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM periodic_checks WHERE id = ?", [id]);
    
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
      
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus data" });
  }
};