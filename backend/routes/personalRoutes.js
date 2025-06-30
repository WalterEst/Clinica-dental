const express = require('express');
const router = express.Router();
const controller = require('../controllers/personalController');

router.get('/', controller.getAllPersonal);
router.post('/', controller.createPersonal);
router.get('/:rut', controller.getPersonalByRut);
router.put('/:rut', controller.updatePersonal);  // usa RUT, coherente con todo
router.delete('/:rut', controller.deletePersonal);



module.exports = router;
