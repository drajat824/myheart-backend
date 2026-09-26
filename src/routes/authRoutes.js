const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           example: "password123"
 *         role:
 *           type: string
 *           example: "user"
 *           description: "Role user (opsional, default: user)"
 *     
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           example: "password123"
 *         expo_push_token:
 *           type: string
 *           nullable: true
 *           example: "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"
 *           
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Login berhasil"
 *         token:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *             expo_push_token:
 *               type: string
 *               nullable: true
 * 
 *     UserListResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         role:
 *           type: string
 *           example: "user"
 *         expo_push_token:
 *           type: string
 *           nullable: true
 *           example: "ExponentPushToken[...]"
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API Autentikasi dan Manajemen Pengguna
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Mendaftarkan User Baru
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Input tidak lengkap (Nama, email, password wajib diisi)
 *       409:
 *         description: Email sudah terdaftar
 *       500:
 *         description: Terjadi kesalahan pada server saat registrasi
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentikasi Login User & Update Push Token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan token dan detail user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Input tidak lengkap (Email dan password wajib diisi)
 *       401:
 *         description: Email atau password salah
 *       500:
 *         description: Terjadi kesalahan pada server saat proses login
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Mengambil semua data user terdaftar
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar user (password disembunyikan)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserListResponse'
 *       500:
 *         description: Terjadi kesalahan pada server saat mengambil data user
 */
router.get("/users", authController.getAllUsers);

/**
 * @swagger
 * /api/auth/users/{id}:
 *   delete:
 *     summary: Menghapus data user secara permanen berdasarkan ID
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID user yang akan dihapus dari sistem
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User berhasil dihapus"
 *       404:
 *         description: User tidak ditemukan dengan ID tersebut
 *       500:
 *         description: Terjadi kesalahan pada server saat menghapus user
 */
router.delete("/users/:id", authController.deleteUser);

module.exports = router;