const express = require('express');
const router = express.Router();
const controller = require('../controllers/pacienteController');

router.get('/', controller.getAllPaciente);
router.post('/', controller.createPaciente);
router.get('/:rut', controller.getPacienteByRut);
router.put('/:rut', controller.updatePaciente);  // usa RUT, coherente con todo
router.delete('/:rut', controller.deletePaciente);



module.exports = router;
