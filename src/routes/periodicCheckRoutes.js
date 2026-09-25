const express = require("express");
const router = express.Router();
const periodicCheckController = require("../controllers/periodicCheckController");

/**
 * @swagger
 * components:
 *   schemas:
 *     PeriodicCheck:
 *       type: object
 *       required:
 *         - user_id
 *         - check_date
 *         - weight
 *         - height
 *         - blood_sugar
 *         - cholesterol
 *       properties:
 *         id:
 *           type: integer
 *           description: ID otomatis (Auto Increment)
 *         user_id:
 *           type: integer
 *           description: ID dari User yang bersangkutan
 *         check_date:
 *           type: string
 *           format: date
 *           description: Tanggal pengecekan dilakukan (YYYY-MM-DD)
 *         weight:
 *           type: number
 *           format: float
 *           description: Berat badan dalam Kilogram
 *         height:
 *           type: number
 *           format: float
 *           description: Tinggi badan dalam Centimeter
 *         blood_sugar:
 *           type: number
 *           format: float
 *           description: Kadar gula darah (mg/dL)
 *         cholesterol:
 *           type: number
 *           format: float
 *           description: Kadar kolesterol (mg/dL)
 *       example:
 *         user_id: 1
 *         check_date: '2026-09-25'
 *         weight: 70.5
 *         height: 175.0
 *         blood_sugar: 95.0
 *         cholesterol: 180.0
 */

/**
 * @swagger
 * tags:
 *   name: Periodic Checks
 *   description: API untuk manajemen data pengecekan rutin (Periodic Checks)
 */

/**
 * @swagger
 * /api/periodic:
 *   post:
 *     summary: Menambahkan data pengecekan rutin baru
 *     tags: [Periodic Checks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PeriodicCheck'
 *     responses:
 *       201:
 *         description: Data berhasil ditambahkan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/", periodicCheckController.createPeriodicCheck);

/**
 * @swagger
 * /api/periodic:
 *   get:
 *     summary: Mengambil data pengecekan (bisa filter 1 tanggal atau rentang tanggal)
 *     tags: [Periodic Checks]
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
 *           example: "2026-09-25"
 *         description: Filter untuk 1 tanggal spesifik (YYYY-MM-DD)
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           example: "2026-09-01"
 *         description: Tanggal awal rentang (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           example: "2026-09-25"
 *         description: Tanggal akhir rentang (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PeriodicCheck'
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/", periodicCheckController.getAllPeriodicChecks);

/**
 * @swagger
 * /api/periodic/{id}:
 *   get:
 *     summary: Mengambil data pengecekan berdasarkan ID
 *     tags: [Periodic Checks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari data periodic check
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PeriodicCheck'
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/:id", periodicCheckController.getPeriodicCheckById);

/**
 * @swagger
 * /api/periodic/{id}:
 *   put:
 *     summary: Memperbarui data pengecekan berdasarkan ID
 *     tags: [Periodic Checks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari data yang ingin diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PeriodicCheck'
 *     responses:
 *       200:
 *         description: Data berhasil diperbarui
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.put("/:id", periodicCheckController.updatePeriodicCheck);

/**
 * @swagger
 * /api/periodic/{id}:
 *   delete:
 *     summary: Menghapus data pengecekan berdasarkan ID
 *     tags: [Periodic Checks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari data yang ingin dihapus
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.delete("/:id", periodicCheckController.deletePeriodicCheck);

module.exports = router;