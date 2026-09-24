const express = require("express");
const router = express.Router();
const heartIssueController = require("../controllers/heartIssueController");

/**
 * @swagger
 * components:
 *   schemas:
 *     HeartIssue:
 *       type: object
 *       required:
 *         - user_id
 *         - issue_type
 *         - bpm_recorded
 *         - recorded_at
 *       properties:
 *         id:
 *           type: integer
 *           description: ID otomatis (Auto Increment)
 *         user_id:
 *           type: integer
 *           description: ID dari User yang bersangkutan
 *         issue_type:
 *           type: string
 *           enum: [Takikardia, Bradikardia, Aritmia]
 *           description: Jenis isu detak jantung yang terdeteksi
 *         bpm_recorded:
 *           type: integer
 *           description: Detak jantung per menit (BPM) saat isu terjadi
 *         recorded_at:
 *           type: string
 *           format: date-time
 *           description: Waktu pencatatan isu jantung
 *       example:
 *         user_id: 1
 *         issue_type: 'Takikardia'
 *         bpm_recorded: 120
 *         recorded_at: '2026-09-19T10:00:00Z'
 */

/**
 * @swagger
 * tags:
 *   name: Heart Issues
 *   description: API untuk manajemen data isu detak jantung (Heart Issues)
 */

/**
 * @swagger
 * /api/hr-issues:
 *   post:
 *     summary: Menambahkan data isu detak jantung baru
 *     tags: [Heart Issues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HeartIssue'
 *     responses:
 *       201:
 *         description: Data berhasil ditambahkan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/", heartIssueController.createHeartIssue);

/**
 * @swagger
 * /api/hr-issues:
 *   get:
 *     summary: Mengambil data isu detak jantung (bisa filter 1 tanggal atau rentang tanggal)
 *     tags: [Heart Issues]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter berdasarkan ID user
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: "2026-09-20"
 *         description: Filter untuk 1 tanggal spesifik (YYYY-MM-DD)
 *       - in: query
 *         name: start_time
 *         schema:
 *           type: string
 *           example: "2026-09-19"
 *         description: Tanggal awal / rentang mulai
 *       - in: query
 *         name: end_time
 *         schema:
 *           type: string
 *           example: "2026-09-20"
 *         description: Tanggal akhir / rentang selesai
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HeartIssue'
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/", heartIssueController.getAllHeartIssues);

/**
 * @swagger
 * /api/hr-issues/{id}:
 *   get:
 *     summary: Mengambil data isu detak jantung berdasarkan ID
 *     tags: [Heart Issues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari data heart issue
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HeartIssue'
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/:id", heartIssueController.getHeartIssueById);

/**
 * @swagger
 * /api/hr-issues/{id}:
 *   put:
 *     summary: Memperbarui data isu detak jantung berdasarkan ID
 *     tags: [Heart Issues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari data heart issue yang ingin diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HeartIssue'
 *     responses:
 *       200:
 *         description: Data berhasil diperbarui
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.put("/:id", heartIssueController.updateHeartIssue);

/**
 * @swagger
 * /api/hr-issues/{id}:
 *   delete:
 *     summary: Menghapus data isu detak jantung berdasarkan ID
 *     tags: [Heart Issues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari data heart issue yang ingin dihapus
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.delete("/:id", heartIssueController.deleteHeartIssue);

module.exports = router;