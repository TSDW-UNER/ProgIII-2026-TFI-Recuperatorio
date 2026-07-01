import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/fotos/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `foto_${Date.now()}${ext}`);
    }
});

const filtroArchivo = (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png|webp/;
    const esValido = tiposPermitidos.test(path.extname(file.originalname).toLowerCase())
        && tiposPermitidos.test(file.mimetype);
    if (esValido) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp).'));
    }
};

export const subirFoto = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: filtroArchivo
}).single('foto');
