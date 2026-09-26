const express = require("express");
const router = express.Router();
const medicationScheduleController = require("../controllers/medicationScheduleController");

/**
 * @swagger
 * components:
 *   schemas:
 *     MedicationSchedule:
 *       type: object
 *       required:
 *         - medication_id
 *         - schedule_date
 *       properties:
 *         medication_id:
 *           type: integer
 *           description: ID relasi ke tabel medications
 *         schedule_date:
 *           type: string
 *           format: date-time
 *           example: "2026-09-24 08:00:00"
 *           description: Waktu dan tanggal jadwal obat (Timestamp)
 *         status:
 *           type: string
 *           enum: [pending, taken, missed]
 *           default: pending
 *           description: Status minum obat
 *         takenAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2026-09-24 08:15:00"
 *           description: Waktu aktual obat diminum
 *         late:
 *           type: integer
 *           enum: [0, 1]
 *           default: 0
 *           description: Indikator terlambat minum obat (0 = tidak, 1 = ya)
 */

/**
 * @swagger
 * tags:
 *   name: Medication Schedules
 *   description: API Manajemen Jadwal Pengingat Obat
 */

/**
 * @swagger
 * /api/medication-schedules:
 *   post:
 *     summary: Menambahkan jadwal obat baru
 *     tags: [Medication Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicationSchedule'
 *     responses:
 *       201:
 *         description: Jadwal obat berhasil ditambahkan
 *       500:
 *         description: Gagal menambahkan jadwal obat
 */
router.post("/", medicationScheduleController.createSchedule);

/**
 * @swagger
 * /api/medication-schedules:
 *   get:
 *     summary: Mengambil semua data jadwal obat (support single date / timestamp range)
 *     tags: [Medication Schedules]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter berdasarkan ID user (dari tabel medications)
 *       - in: query
 *         name: schedule_date
 *         schema:
 *           type: string
 *           example: "2026-09-24"
 *         description: Filter berdasarkan 1 tanggal spesifik (YYYY-MM-DD) atau Timestamp penuh
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           example: "2026-09-01 00:00:00"
 *         description: Waktu/tanggal awal pencarian rentang waktu
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           example: "2026-09-30 23:59:59"
 *         description: Waktu/tanggal akhir pencarian rentang waktu
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, taken, missed]
 *         description: Filter berdasarkan status
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar jadwal obat
 *       500:
 *         description: Gagal mengambil jadwal obat
 */
router.get("/", medicationScheduleController.getAllSchedules);

/**
 * @swagger
 * /api/medication-schedules/{id}:
 *   get:
 *     summary: Mengambil detail jadwal obat berdasarkan ID
 *     tags: [Medication Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID jadwal obat
 *     responses:
 *       200:
 *         description: Berhasil mengambil detail jadwal obat
 *       404:
 *         description: Jadwal obat tidak ditemukan
 *       500:
 *         description: Gagal mengambil detail jadwal obat
 */
router.get("/:id", medicationScheduleController.getScheduleById);

/**
 * @swagger
 * /api/medication-schedules/{id}:
 *   put:
 *     summary: Memperbarui semua aspek jadwal obat berdasarkan ID
 *     tags: [Medication Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID jadwal obat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medication_id:
 *                 type: integer
 *                 description: ID obat baru (jika berubah)
 *               schedule_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-24 08:00:00"
 *               status:
 *                 type: string
 *                 enum: [pending, taken, missed]
 *                 example: "taken"
 *               takenAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-24 08:15:00"
 *               late:
 *                 type: integer
 *                 enum: [0, 1]
 *                 example: 1
 *                 description: Status keterlambatan (0=tepat waktu, 1=telat)
 *     responses:
 *       200:
 *         description: Seluruh aspek jadwal obat berhasil diperbarui
 *       400:
 *         description: Field input ada yang tidak valid
 *       404:
 *         description: Jadwal obat tidak ditemukan
 *       500:
 *         description: Gagal memperbarui jadwal obat
 */
router.put("/:id", medicationScheduleController.updateSchedule);
/**
 * @swagger
 * /api/medication-schedules/{id}:
 *   delete:
 *     summary: Menghapus data jadwal obat berdasarkan ID
 *     tags: [Medication Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID jadwal obat
 *     responses:
 *       200:
 *         description: Jadwal obat berhasil dihapus
 *       404:
 *         description: Jadwal obat tidak ditemukan
 *       500:
 *         description: Gagal menghapus jadwal obat
 */
router.delete("/:id", medicationScheduleController.deleteSchedule);

module.exports = router;