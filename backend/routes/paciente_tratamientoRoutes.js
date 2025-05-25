const express = require('express');
const router = express.Router();
const controller = require('../controllers/paciente_TratamientoController');

router.get('/', controller.getPacienteTratamientos);
router.get('/:id', controller.getPacienteTratamientoById);
router.post('/', controller.createPacienteTratamiento);
router.put('/:id', controller.updatePacienteTratamiento);    
router.delete('/:id', controller.deletePacienteTratamiento); 

module.exports = router;
