const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagosController');

router.get('/', controller.getPagos);
router.get('/:id', controller.getPagoById);
router.post('/', controller.createPago);
router.put('/:id', controller.updatePago);    
router.delete('/:id', controller.deletePago); 

module.exports = router;
