const express = require('express');
const router = express.Router();
const controller = require('../controllers/paciente-tratamientoController');

router.get('/', controller.getAllPacienteTratamientos);
router.post('/', controller.createPacienteTratamiento);
router.get('/paciente/:rut', controller.getPacienteTratamientosByRut);
router.put('/:id', controller.updatePacienteTratamientoById);
router.delete('/:id', controller.deletePacienteTratamientoById);

module.exports = router;
