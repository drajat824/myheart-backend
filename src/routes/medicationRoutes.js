const express = require("express");
const router = express.Router();
const medicationController = require("../controllers/medicationController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Medication:
 *       type: object
 *       required:
 *         - user_id
 *         - generic_name
 *         - dosage_form
 *         - strength
 *         - route
 *         - meal_relation
 *       properties:
 *         user_id:
 *           type: integer
 *           description: ID user pemilik data obat
 *           example: 1
 *         generic_name:
 *           type: string
 *           description: Nama generik obat
 *           example: "Paracetamol"
 *         brand_name:
 *           type: string
 *           description: Nama merek obat (opsional)
 *           example: "Panadol"
 *         dosage_form:
 *           type: string
 *           description: Bentuk sediaan obat
 *           example: "Tablet"
 *         strength:
 *           type: string
 *           description: Kekuatan/dosis obat
 *           example: "500 mg"
 *         route:
 *           type: string
 *           enum: [oral, topical, sublingual, intravenous, intramuscular, subcutaneous, rectal, inhalation]
 *           description: Rute pemberian obat
 *           example: "oral"
 *         meal_relation:
 *           type: string
 *           enum: [before_meal, with_meal, after_meal, any_time]
 *           description: Aturan minum terkait makanan
 *           example: "after_meal"
 */

/**
 * @swagger
 * tags:
 *   name: Medications
 *   description: API untuk manajemen data obat (Medications)
 */

/**
 * @swagger
 * /api/medications:
 *   post:
 *     summary: Menambahkan data obat baru
 *     tags: [Medications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medication'
 *     responses:
 *       201:
 *         description: Data obat berhasil ditambahkan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/", medicationController.createMedication);

/**
 * @swagger
 * /api/medications:
 *   get:
 *     summary: Mengambil semua data obat
 *     tags: [Medications]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter berdasarkan ID user
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar obat
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/", medicationController.getAllMedications);

/**
 * @swagger
 * /api/medications/{id}:
 *   get:
 *     summary: Mengambil data obat berdasarkan ID
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID obat
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data obat
 *       404:
 *         description: Data obat tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/:id", medicationController.getMedicationById);

/**
 * @swagger
 * /api/medications/{id}:
 *   put:
 *     summary: Memperbarui data obat
 *     tags: [Medications]
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
 *             $ref: '#/components/schemas/Medication'
 *     responses:
 *       200:
 *         description: Data obat berhasil diperbarui
 *       404:
 *         description: Data obat tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.put("/:id", medicationController.updateMedication);

/**
 * @swagger
 * /api/medications/{id}:
 *   delete:
 *     summary: Menghapus data obat
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Data obat berhasil dihapus
 *       404:
 *         description: Data obat tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.delete("/:id", medicationController.deleteMedication);

module.exports = router;