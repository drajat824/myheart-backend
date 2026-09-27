const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.body.user_id || 'unknown'; 
        const uploadDir = path.join(__dirname, '../../file', String(userId));

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        console.log("Data file yang diterima Multer:", file);

        // Ekstensi dipaksa menjadi .pdf karena tipe lain sudah diblokir oleh fileFilter
        cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf');
    }
});

// Filter untuk memblokir selain PDF
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Hanya file dengan format PDF yang diperbolehkan, termasuk untuk medical image!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

module.exports = upload;