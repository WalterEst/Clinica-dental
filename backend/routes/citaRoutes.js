const express = require('express');
const router = express.Router();
const controller = require('../controllers/citaController');

router.get('/', controller.getCitas);
router.get('/:id', controller.getCitaById);
router.post('/', controller.createCita);
router.put('/:id', controller.updateCita);    
router.delete('/:id', controller.deleteCita); 

module.exports = router;
