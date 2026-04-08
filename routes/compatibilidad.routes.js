const express = require('express');
const router = express.Router();
const compatibilidadCtrl = require('../controllers/compatibilidad.controller');


router.post('/', compatibilidadCtrl.createCompatibilidad);
router.get('/', compatibilidadCtrl.getCompatibilidades);
router.get('/:id', compatibilidadCtrl.getCompatibilidad);
router.put('/:id', compatibilidadCtrl.updateCompatibilidad);
router.delete('/:id', compatibilidadCtrl.deleteCompatibilidad);

module.exports = router;