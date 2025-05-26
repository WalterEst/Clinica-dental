const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagosController');

//define rutas para funciones de obtener, crear, actualizar y eliminar
router.get('/', controller.getPagos);
router.get('/:id', controller.getPagoById);
router.post('/', controller.createPago);
router.put('/:id', controller.updatePago);    
router.delete('/:id', controller.deletePago); 

module.exports = router;
