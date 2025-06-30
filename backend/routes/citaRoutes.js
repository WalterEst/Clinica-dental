const express = require('express');
const router = express.Router();
const controller = require('../controllers/citaController');

router.get('/', controller.getAllCita);
router.post('/', controller.createCita);
router.get('/:id', controller.getCitaByid);
router.put('/:id', controller.updateCita);  // usa id, coherente con todo
router.delete('/:id', controller.deleteCita);



module.exports = router;
