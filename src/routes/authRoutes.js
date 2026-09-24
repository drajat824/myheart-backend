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
 *           example: "patient"
 *           description: "Role user (opsional, default: patient)"
 *     
 *     # ... (Skema LoginRequest dan LoginResponse yang sudah ada sebelumnya)
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
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API Autentikasi Pengguna
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
 *         description: Input tidak lengkap
 *       409:
 *         description: Email sudah terdaftar
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentikasi Login User & Update Push Token
 *     tags: [Authentication]
 *     # ... (Dokumentasi /login yang sudah ada)
 */
router.post("/login", authController.login);

module.exports = router;