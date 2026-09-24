const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 1. Fungsi Register User Baru
exports.register = async (req, res) => {
  try {
    const { name, email, password, role = "patient" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Nama, email, dan password wajib diisi" });
    }

    const [existingUsers] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Email sudah terdaftar. Silakan gunakan email lain." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: result.insertId,
        name,
        email,
        role,
      },
    });
  } catch (error) {
    console.error("Error register:", error);
    res.status(500).json({ error: "Gagal melakukan registrasi" });
  }
};

// 2. Fungsi Login User
exports.login = async (req, res) => {
  try {
    const { email, password, expo_push_token } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib diisi" });
    }

    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    const user = users[0];

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    if (expo_push_token) {
      await pool.query("UPDATE users SET expo_push_token = ? WHERE id = ?", [
        expo_push_token,
        user.id,
      ]);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "smart_health_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "patient",
      },
    });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ error: "Gagal melakukan proses login" });
  }
};