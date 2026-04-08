const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ubicacion.controller');

router.post('/', ctrl.createUbicacion);
router.get('/', ctrl.getUbicaciones);
router.get('/:id', ctrl.getUbicacionById);
router.put('/:id', ctrl.updateUbicacion);
router.delete('/:id', ctrl.deleteUbicacion);

module.exports = router;