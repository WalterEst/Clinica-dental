const express = require('express');
const router = express.Router();
const controller = require('../controllers/pacienteController');

router.get('/', controller.getAllPacientes);
router.get('/:id', controller.getPacienteById);
router.post('/', controller.createPaciente);
router.put('/:id', controller.updatePaciente);    
router.delete('/:id', controller.deletePaciente); 

module.exports = router;
