const express = require('express');
const router = express.Router();
const controller = require('../controllers/personalController');

//define rutas para funciones de obtener, crear, actualizar y eliminar
router.get('/', controller.getPersonal);
router.get('/:id', controller.getPersonalById);
router.post('/', controller.createPersonal);
router.put('/:id', controller.updatePersonal);    
router.delete('/:id', controller.deletePersonal); 

module.exports = router;
