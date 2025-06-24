const express = require('express');
const router = express.Router();
const controller = require('../controllers/historial_medicoController');

//define rutas para funciones de obtener, crear, actualizar y eliminar
router.get('/', controller.getHistoriales);
router.get('/paciente/:id', controller.getHistorialByPaciente);
router.get('/:id', controller.getHistorialById);
router.post('/', controller.createHistorial);
router.put('/:id', controller.updateHistorial);    
router.delete('/:id', controller.deleteHistorial); 

module.exports = router;
