const express = require('express');
const router = express.Router();
const controller = require('../controllers/citaController');

//define rutas para funciones de obtener, crear, actualizar y eliminar
router.get('/', controller.getCitas);
router.get('/:id', controller.getCitaById);
router.post('/', controller.createCita);
router.put('/:id', controller.updateCita);    
router.delete('/:id', controller.deleteCita); 

module.exports = router;
