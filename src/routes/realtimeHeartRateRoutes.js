const express = require("express");
const router = express.Router();
const realtimeHeartRateController = require("../controllers/realtimeHeartRateController");

/**
 * @swagger
 * tags:
 *   name: Realtime Heart Rates
 *   description: API untuk manajemen data detak jantung real-time
 */

/**
 * @swagger
 * /api/hr:
 *   post:
 *     summary: Menambahkan data detak jantung real-time baru
 *     tags: [Realtime Heart Rates]
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
router.post("/", realtimeHeartRateController.createHeartRate);

/**
 * @swagger
 * /api/hr:
 *   get:
 *     summary: Mengambil data detak jantung real-time (bisa filter date / range) dengan Paginasi
 *     tags: [Realtime Heart Rates]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Nomor halaman (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Jumlah data per halaman (default 30)
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter berdasarkan ID user
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: "2026-09-22"
 *         description: Filter untuk 1 tanggal spesifik (YYYY-MM-DD)
 *       - in: query
 *         name: start_time
 *         schema:
 *           type: string
 *           example: "2026-09-22"
 *         description: Tanggal awal / rentang mulai
 *       - in: query
 *         name: end_time
 *         schema:
 *           type: string
 *           example: "2026-09-22"
 *         description: Tanggal akhir / rentang selesai
 *       - in: query
 *         name: timezone
 *         schema:
 *           type: string
 *           default: "+07:00"
 *         description: Zona waktu pengguna (default +07:00)
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar data beserta metadata paginasi
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/", realtimeHeartRateController.getAllHeartRates);

/**
 * @swagger
 * /api/hr/{id}:
 *   get:
 *     summary: Mengambil data detak jantung real-time berdasarkan ID
 *     tags: [Realtime Heart Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/:id", realtimeHeartRateController.getHeartRateById);

/**
 * @swagger
 * /api/hr/{id}:
 *   put:
 *     summary: Memperbarui data detak jantung real-time berdasarkan ID
 *     tags: [Realtime Heart Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
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
router.put("/:id", realtimeHeartRateController.updateHeartRate);

/**
 * @swagger
 * /api/hr/{id}:
 *   delete:
 *     summary: Menghapus data detak jantung real-time berdasarkan ID
 *     tags: [Realtime Heart Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.delete("/:id", realtimeHeartRateController.deleteHeartRate);

module.exports = router;