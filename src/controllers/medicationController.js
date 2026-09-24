const pool = require("../config/db");

// Create Medication
exports.createMedication = async (req, res) => {
  try {
    const { user_id, generic_name, brand_name, dosage_form, strength, route, meal_relation } = req.body;

    const [result] = await pool.query(
      "INSERT INTO medications (user_id, generic_name, brand_name, dosage_form, strength, route, meal_relation) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user_id, generic_name, brand_name, dosage_form, strength, route, meal_relation]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Data medication berhasil ditambahkan",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambahkan data medication" });
  }
};

// Read All Medications (dengan filter opsional user_id)
exports.getAllMedications = async (req, res) => {
  try {
    const { user_id } = req.query;
    let query = "SELECT * FROM medications";
    const params = [];

    if (user_id) {
      query += " WHERE user_id = ?";
      params.push(user_id);
    }

    const [rows] = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data medications" });
  }
};

// Read One by ID
exports.getMedicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM medications WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data medication" });
  }
};

// Update Medication
exports.updateMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const { generic_name, brand_name, dosage_form, strength, route, meal_relation } = req.body;

    const [result] = await pool.query(
      "UPDATE medications SET generic_name = ?, brand_name = ?, dosage_form = ?, strength = ?, route = ?, meal_relation = ? WHERE id = ?",
      [generic_name, brand_name, dosage_form, strength, route, meal_relation, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({ message: "Data medication berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memperbarui data" });
  }
};

// Delete Medication
exports.deleteMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM medications WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({ message: "Data medication berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus data" });
  }
};