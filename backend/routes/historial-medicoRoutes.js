const express = require('express');
const router = express.Router();
const controller = require('../controllers/historial-medicoController');

router.get('/', controller.getAllHistorialMedico);
router.post('/', controller.createHistorialMedico);
router.get('/:rut', controller.getHistorialByPacienteRut);
router.put('/:rut', controller.updateHistorialByPacienteRut); 
router.delete('/:id', controller.deleteHistorialMedico); 
router.get('/id/:id', controller.getHistorialMedicoById);
router.put('/id/:id', controller.updateHistorialMedicoById);

module.exports = router;
