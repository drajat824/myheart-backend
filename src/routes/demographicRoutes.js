const express = require("express");
const router = express.Router();
const demographicController = require("../controllers/demographicController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Demographic:
 *       type: object
 *       required:
 *         - user_id
 *         - date_of_birth
 *         - gender
 *         - age
 *         - height
 *         - weight
 *         - bmi
 *       properties:
 *         id:
 *           type: integer
 *           description: ID otomatis (Auto Increment)
 *         user_id:
 *           type: integer
 *           description: ID dari User yang bersangkutan
 *         date_of_birth:
 *           type: string
 *           format: date
 *           description: Tanggal lahir (YYYY-MM-DD)
 *         gender:
 *           type: string
 *           enum: [Male, Female]
 *           description: Jenis kelamin
 *         age:
 *           type: integer
 *           description: Umur pengguna
 *         height:
 *           type: number
 *           format: float
 *           description: Tinggi badan dalam Centimeter
 *         weight:
 *           type: number
 *           format: float
 *           description: Berat badan dalam Kilogram
 *         bmi:
 *           type: number
 *           format: float
 *           description: Body Mass Index (BMI)
 *         blood_sugar:
 *           type: number
 *           format: float
 *           description: Kadar gula darah (mg/dL) - Opsional
 *         cholesterol:
 *           type: number
 *           format: float
 *           description: Kadar kolesterol (mg/dL) - Opsional
 *       example:
 *         user_id: 1
 *         date_of_birth: "1990-05-15"
 *         gender: "Male"
 *         age: 36
 *         height: 175.0
 *         weight: 70.5
 *         bmi: 23.02
 *         blood_sugar: 95.0
 *         cholesterol: 180.0
 */

/**
 * @swagger
 * tags:
 *   name: Demographic
 *   description: API untuk manajemen data demografi dan metrik kesehatan dasar pengguna
 */

/**
 * @swagger
 * /api/demographic:
 *   post:
 *     summary: Menambahkan data demografi baru
 *     tags: [Demographic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Demographic'
 *     responses:
 *       201:
 *         description: Data berhasil ditambahkan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/", demographicController.createDemographic);

/**
 * @swagger
 * /api/demographic:
 *   get:
 *     summary: Mengambil data demografi (bisa difilter berdasarkan tanggal pembuatan atau user)
 *     tags: [Demographic]
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
 *         description: Filter untuk 1 tanggal spesifik berdasarkan tanggal pembuatan (YYYY-MM-DD)
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
 *                 $ref: '#/components/schemas/Demographic'
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/", demographicController.getAllDemographics);

/**
 * @swagger
 * /api/demographic/{id}:
 *   get:
 *     summary: Mengambil data demografi berdasarkan ID
 *     tags: [Demographic]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari data demografi
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Demographic'
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/:id", demographicController.getDemographicById);

/**
 * @swagger
 * /api/demographic/{id}:
 *   put:
 *     summary: Memperbarui data demografi berdasarkan ID
 *     tags: [Demographic]
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
 *             $ref: '#/components/schemas/Demographic'
 *     responses:
 *       200:
 *         description: Data berhasil diperbarui
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.put("/:id", demographicController.updateDemographic);

/**
 * @swagger
 * /api/demographic/{id}:
 *   delete:
 *     summary: Menghapus data demografi berdasarkan ID
 *     tags: [Demographic]
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
router.delete("/:id", demographicController.deleteDemographic);

module.exports = router;