const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecordController");
const upload = require("../middlewares/upload");

// Konfigurasi field Multer untuk menerima file yang spesifik
const uploadFields = upload.fields([
  { name: 'lab_result', maxCount: 1 },
  { name: 'medical_image', maxCount: 1 },
  { name: 'diagnosis', maxCount: 1 }
]);

/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalRecord:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID rekam medis (Auto Increment)
 *         user_id:
 *           type: integer
 *           description: ID dari User yang bersangkutan
 *         lab_result:
 *           type: string
 *           description: Path menuju file hasil lab
 *         medical_image:
 *           type: string
 *           description: Path menuju file citra medis (X-Ray, MRI, dll)
 *         diagnosis:
 *           type: string
 *           description: Path menuju file diagnosis dokumen
 *         check_date:
 *           type: string
 *           format: date
 *           description: Tanggal pemeriksaan (YYYY-MM-DD)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Waktu data dibuat
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Waktu data diperbarui
 *       example:
 *         id: 1
 *         user_id: 12
 *         lab_result: "../file/12/lab_result-1695781234567.pdf"
 *         medical_image: "../file/12/medical_image-1695781234999.jpg"
 *         diagnosis: "../file/12/diagnosis-1695781235111.pdf"
 *         check_date: "2026-09-27"
 */

/**
 * @swagger
 * tags:
 *   name: Medical Records
 *   description: API untuk manajemen rekam medis beserta unggahan file
 */

/**
 * @swagger
 * /api/medical-records:
 *   post:
 *     summary: Menambahkan data rekam medis baru beserta file
 *     tags: [Medical Records]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID user (PENTING diletakkan sebelum file pada form-data)
 *               check_date:
 *                 type: string
 *                 format: date
 *                 description: Tanggal pengecekan (YYYY-MM-DD)
 *               lab_result:
 *                 type: string
 *                 format: binary
 *                 description: File hasil lab
 *               medical_image:
 *                 type: string
 *                 format: binary
 *                 description: File citra medis
 *               diagnosis:
 *                 type: string
 *                 format: binary
 *                 description: File hasil diagnosis
 *     responses:
 *       201:
 *         description: Data rekam medis berhasil ditambahkan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/", uploadFields, medicalRecordController.createMedicalRecord);

/**
 * @swagger
 * /api/medical-records:
 *   get:
 *     summary: Mengambil daftar rekam medis (bisa difilter berdasarkan user_id)
 *     tags: [Medical Records]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter berdasarkan ID user
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MedicalRecord'
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/", medicalRecordController.getAllMedicalRecords);

/**
 * @swagger
 * /api/medical-records/view:
 *   get:
 *     summary: Melihat file lampiran rekam medis (pdf, jpg, dll)
 *     tags: [Medical Records]
 *     parameters:
 *       - in: query
 *         name: path
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Berhasil memuat file
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Parameter path diperlukan
 *       404:
 *         description: File tidak ditemukan di server
 *       500:
 *         description: Gagal memuat file
 */
router.get("/view", medicalRecordController.viewFile);

/**
 * @swagger
 * /api/medical-records/{id}:
 *   get:
 *     summary: Mengambil data rekam medis berdasarkan ID
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari rekam medis
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalRecord'
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/:id", medicalRecordController.getMedicalRecordById);

/**
 * @swagger
 * /api/medical-records/{id}:
 *   put:
 *     summary: Memperbarui data rekam medis beserta file
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari rekam medis yang ingin diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID user (PENTING diletakkan sebelum file pada form-data)
 *               check_date:
 *                 type: string
 *                 format: date
 *                 description: Tanggal pengecekan (YYYY-MM-DD)
 *               lab_result:
 *                 type: string
 *                 format: binary
 *                 description: File hasil lab baru (biarkan kosong jika tidak ingin mengubah file lama)
 *               medical_image:
 *                 type: string
 *                 format: binary
 *                 description: File citra medis baru (biarkan kosong jika tidak ingin mengubah file lama)
 *               diagnosis:
 *                 type: string
 *                 format: binary
 *                 description: File hasil diagnosis baru (biarkan kosong jika tidak ingin mengubah file lama)
 *     responses:
 *       200:
 *         description: Data rekam medis berhasil diperbarui
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.put("/:id", uploadFields, medicalRecordController.updateMedicalRecord);

/**
 * @swagger
 * /api/medical-records/{id}:
 *   delete:
 *     summary: Menghapus data rekam medis berdasarkan ID
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari rekam medis yang ingin dihapus
 *     responses:
 *       200:
 *         description: Data rekam medis berhasil dihapus
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.delete("/:id", medicalRecordController.deleteMedicalRecord);


module.exports = router;