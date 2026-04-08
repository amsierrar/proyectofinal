const express = require('express');
const router = express.Router();
const grupoCompatibilidadCtrl = require('../controllers/grupo_compatibilidad.controller');


router.get('/', grupoCompatibilidadCtrl.getAll);
router.post('/', grupoCompatibilidadCtrl.create);
router.get('/:id', grupoCompatibilidadCtrl.getOne);
router.put('/:id', grupoCompatibilidadCtrl.update);
router.delete('/:id', grupoCompatibilidadCtrl.delete);

module.exports = router;