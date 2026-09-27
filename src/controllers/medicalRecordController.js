const pool = require("../config/db");
const path = require('path');
const fs = require('fs');

// Helper function untuk menghapus file jika terjadi error
const deleteUploadedFiles = (files) => {
  if (files) {
    Object.values(files).forEach(fileArray => {
      fileArray.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    });
  }
};

// Create
exports.createMedicalRecord = async (req, res) => {
  try {
    const { user_id, check_date } = req.body;
    const folderId = user_id || 'unknown';

    const lab_result = req.files['lab_result'] ? `../file/${folderId}/${req.files['lab_result'][0].filename}` : null;
    const medical_image = req.files['medical_image'] ? `../file/${folderId}/${req.files['medical_image'][0].filename}` : null;
    const diagnosis = req.files['diagnosis'] ? `../file/${folderId}/${req.files['diagnosis'][0].filename}` : null;

    const [result] = await pool.query(
      `INSERT INTO medical_records (user_id, lab_result, medical_image, diagnosis, check_date) 
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, lab_result, medical_image, diagnosis, check_date]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Data rekam medis berhasil ditambahkan",
      files: { lab_result, medical_image, diagnosis }
    });
  } catch (error) {
    // Hapus file yang terlanjur diunggah jika database gagal (misal: user_id tidak ada)
    deleteUploadedFiles(req.files);
    
    console.error(error);
    res.status(500).json({ 
      error: "Gagal menambahkan data", 
      message: error.sqlMessage || error.message 
    });
  }
};

// Read All
exports.getAllMedicalRecords = async (req, res) => {
  try {
    const { user_id } = req.query;

    let query = `
      SELECT m.*, u.name AS name 
      FROM medical_records m
      LEFT JOIN users u ON m.user_id = u.id 
      WHERE 1=1
    `;
    const params = [];

    if (user_id) {
      query += " AND m.user_id = ?";
      params.push(user_id);
    }

    query += " ORDER BY m.created_at DESC";

    const [rows] = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Read One by ID
exports.getMedicalRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT m.*, u.name AS name 
      FROM medical_records m
      LEFT JOIN users u ON m.user_id = u.id 
      WHERE m.id = ?`, [id]
    );
    
    if (rows.length === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
      
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// Update
exports.updateMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, check_date } = req.body;

    const [oldData] = await pool.query("SELECT * FROM medical_records WHERE id = ?", [id]);
    if (oldData.length === 0) {
      // Hapus file baru jika data lama ternyata tidak ditemukan di DB
      deleteUploadedFiles(req.files);
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    const folderId = user_id || oldData[0].user_id || 'unknown';

    const lab_result = req.files && req.files['lab_result'] 
        ? `../file/${folderId}/${req.files['lab_result'][0].filename}` : oldData[0].lab_result;
        
    const medical_image = req.files && req.files['medical_image'] 
        ? `../file/${folderId}/${req.files['medical_image'][0].filename}` : oldData[0].medical_image;
        
    const diagnosis = req.files && req.files['diagnosis'] 
        ? `../file/${folderId}/${req.files['diagnosis'][0].filename}` : oldData[0].diagnosis;

    await pool.query(
      `UPDATE medical_records SET user_id = ?, lab_result = ?, medical_image = ?, diagnosis = ?, check_date = ? WHERE id = ?`,
      [user_id, lab_result, medical_image, diagnosis, check_date, id]
    );
    
    res.status(200).json({ message: "Data rekam medis berhasil diperbarui" });
  } catch (error) {
    // Hapus file baru yang terlanjur diunggah jika database gagal update
    deleteUploadedFiles(req.files);

    console.error(error);
    res.status(500).json({ 
      error: "Gagal memperbarui data",
      message: error.sqlMessage || error.message 
    });
  }
};

// Delete
exports.deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM medical_records WHERE id = ?", [id]);
    
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
      
    // (Opsional) Anda juga bisa menambahkan logika di sini untuk menghapus 
    // file fisik dari server jika record dihapus dari database.
      
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus data" });
  }
};