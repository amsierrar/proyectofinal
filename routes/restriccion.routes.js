const express = require('express');
const router = express.Router();

const restriccionCtrl = require('../controllers/restriccion.controller');

// Crear restricción
router.post('/', restriccionCtrl.createRestriccion);

// Obtener todas las restricciones
router.get('/', restriccionCtrl.getRestricciones);

// Obtener una restricción por ID
router.get('/:id_tipo_usuario', restriccionCtrl.getRestriccion);

// Actualizar restricción
router.put('/:id_tipo_usuario', restriccionCtrl.updateRestriccion);

// Eliminar restricción
router.delete('/:id_tipo_usuario', restriccionCtrl.deleteRestriccion);

module.exports = router;