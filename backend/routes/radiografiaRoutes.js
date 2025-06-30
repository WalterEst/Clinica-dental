const express = require('express');
const router = express.Router();
const controller = require('../controllers/radiografiaController');
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = 'archivo-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Rutas
router.get('/', controller.getAllRadiografias);
router.get('/:id', controller.getRadiografiaById);
router.get('/paciente/:rut', controller.getRadiografiasByRut);
router.post('/', upload.single('archivo'), controller.createRadiografia); // Aquí se maneja el archivo
router.put('/:id', upload.single('archivo'), controller.updateRadiografia);
router.delete('/:id', controller.deleteRadiografia);

module.exports = router;
