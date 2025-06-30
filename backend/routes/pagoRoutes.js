const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagoController');

router.get('/', controller.getAllPagos);
router.get('/:id', controller.getPagoById); 
router.post('/', controller.createPago);
router.get('/tratamiento/:id', controller.getPagosByTratamientoId);
router.put('/:id', controller.updatePagoById);
router.delete('/:id', controller.deletePagoById);

module.exports = router;
