const express = require('express');
const router = express.Router();
const controller = require('../controllers/historial_MedicoController');

router.get('/', controller.getHistoriales);
router.get('/:id', controller.getHistorialById);
router.post('/', controller.createHistorial);
router.put('/:id', controller.updateHistorial);    
router.delete('/:id', controller.deleteHistorial); 

module.exports = router;
