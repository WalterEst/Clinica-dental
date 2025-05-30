const express = require('express');
const router = express.Router();
const controller = require('../controllers/tratamientoController');

//define rutas para funciones de obtener, crear, actualizar y eliminar
router.get('/', controller.getTratamientos);
router.get('/:id', controller.getTratamientoById);
router.post('/', controller.createTratamiento);
router.put('/:id', controller.updateTratamiento);    
router.delete('/:id', controller.deleteTratamiento); 

module.exports = router;
