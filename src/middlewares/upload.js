const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ambil user_id dari req.body. 
        // Jika tidak ada (misal kelupaan), gunakan folder 'unknown' agar tidak error
        const userId = req.body.user_id || 'unknown'; 
        
        // Tentukan path folder: ../../file/[user_id]
        const uploadDir = path.join(__dirname, '../../file', String(userId));

        // Buat folder secara dinamis jika belum ada
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Format penamaan file: fieldname-timestamp.ext
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;