const express = require('express');
const router = express.Router();
const controller = require('../controllers/radiografiaController');

router.get('/', controller.getRadiografias);
router.get('/:id', controller.getRadiografiaById);
router.post('/', controller.createRadiografia);
router.put('/:id', controller.updateRadiografia);    
router.delete('/:id', controller.deleteRadiografia); 

module.exports = router;