const pool = require("../config/db");

// Create
// Create
exports.createDemographic = async (req, res) => {
  try {
    const { 
        user_id, date_of_birth, gender, age, 
        height, weight, bmi, blood_sugar, cholesterol 
    } = req.body;

    // Pastikan jumlah parameter (?) persis 9 buah, sesuai dengan jumlah kolom
    const [result] = await pool.query(
      `INSERT INTO demographic 
      (user_id, date_of_birth, gender, age, height, weight, bmi, blood_sugar, cholesterol) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, date_of_birth, gender, age, height, weight, bmi, blood_sugar, cholesterol]
    );
    
    res.status(201).json({
      id: result.insertId,
      message: "Data demografi berhasil ditambahkan",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambahkan data" });
  }
};

// Read All / Filter by Date or Date Range (menggunakan created_at)
exports.getAllDemographics = async (req, res) => {
  try {
    const { date, start_date, end_date, user_id } = req.query;

    // Menggunakan u.name sesuai dengan struktur tabel users Anda
    let query = `
      SELECT d.*, u.name AS name 
      FROM demographic d
      LEFT JOIN users u ON d.user_id = u.id 
      WHERE 1=1
    `;
    const params = [];

    // Filter berdasarkan user_id (opsional)
    if (user_id) {
      query += " AND d.user_id = ?";
      params.push(user_id);
    }

    // Penanganan filter tanggal menggunakan kolom DATE(created_at)
    const singleDate = date || (!end_date ? start_date : null);

    if (singleDate && !end_date) {
      // Filter 1 tanggal spesifik (YYYY-MM-DD)
      query += " AND DATE(d.created_at) = ?";
      params.push(singleDate);
    } else if (start_date && end_date) {
      // Filter Rentang Tanggal (YYYY-MM-DD)
      query += " AND DATE(d.created_at) BETWEEN ? AND ?";
      params.push(start_date, end_date);
    }

    query += " ORDER BY d.created_at DESC";

    const [rows] = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Read One by ID
exports.getDemographicById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM demographic WHERE id = ?", [id]);
    
    if (rows.length === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
      
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Update
exports.updateDemographic = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
        user_id, date_of_birth, gender, age, 
        height, weight, bmi, blood_sugar, cholesterol 
    } = req.body;

    const [result] = await pool.query(
      `UPDATE demographic SET 
      user_id = ?, date_of_birth = ?, gender = ?, age = ?, 
      height = ?, weight = ?, bmi = ?, blood_sugar = ?, cholesterol = ? 
      WHERE id = ?`,
      [user_id, date_of_birth, gender, age, height, weight, bmi, blood_sugar, cholesterol, id]
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
exports.deleteDemographic = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM demographic WHERE id = ?", [id]);
    
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
      
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus data" });
  }
};