const express = require("express");
const router = express.Router();
const heartRateController = require("../controllers/heartRateAggregationController");

/**
 * @swagger
 * components:
 *   schemas:
 *     HeartRate:
 *       type: object
 *       required:
 *         - user_id
 *         - bpm
 *       properties:
 *         id:
 *           type: integer
 *           description: ID otomatis (Auto Increment)
 *         user_id:
 *           type: integer
 *           description: ID dari User yang bersangkutan
 *         bpm:
 *           type: integer
 *           description: Detak jantung per menit (Beats Per Minute)
 *         start_time:
 *           type: string
 *           format: date-time
 *           description: Waktu mulai pencatatan
 *         end_time:
 *           type: string
 *           format: date-time
 *           description: Waktu akhir pencatatan
 *       example:
 *         user_id: 1
 *         bpm: 80
 *         start_time: '2026-09-19T10:00:00Z'
 *         end_time: '2026-09-19T10:30:00Z'
 */

/**
 * @swagger
 * tags:
 *   name: Heart Rates
 *   description: API untuk manajemen data detak jantung (Heart Rates)
 */

/**
 * @swagger
 * /api/hr-aggregation:
 *   post:
 *     summary: Menambahkan data detak jantung baru
 *     tags: [Heart Rates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HeartRate'
 *     responses:
 *       201:
 *         description: Data berhasil ditambahkan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/", heartRateController.createHeartRate);

/**
 * @swagger
 * /api/hr-aggregation:
 *   get:
 *     summary: Mengambil data detak jantung (bisa filter 1 tanggal atau rentang tanggal)
 *     tags: [Heart Rates]
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
 *         description: Tanggal awal / rentang mulai (YYYY-MM-DD atau ISO string)
 *       - in: query
 *         name: end_time
 *         schema:
 *           type: string
 *           example: "2026-09-20"
 *         description: Tanggal akhir / rentang selesai (YYYY-MM-DD atau ISO string)
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HeartRate'
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/", heartRateController.getAllHeartRates);

/**
 * @swagger
 * /api/hr-aggregation/{id}:
 *   get:
 *     summary: Mengambil data detak jantung berdasarkan ID
 *     tags: [Heart Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari data heart rate
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HeartRate'
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/:id", heartRateController.getHeartRateById);

/**
 * @swagger
 * /api/hr-aggregation/{id}:
 *   put:
 *     summary: Memperbarui data detak jantung berdasarkan ID
 *     tags: [Heart Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari data heart rate yang ingin diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HeartRate'
 *     responses:
 *       200:
 *         description: Data berhasil diperbarui
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.put("/:id", heartRateController.updateHeartRate);

/**
 * @swagger
 * /api/hr-aggregation/{id}:
 *   delete:
 *     summary: Menghapus data detak jantung berdasarkan ID
 *     tags: [Heart Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari data heart rate yang ingin dihapus
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.delete("/:id", heartRateController.deleteHeartRate);

module.exports = router;
