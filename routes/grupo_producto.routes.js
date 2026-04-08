const express = require('express');
const router = express.Router();
const grupoProductoCtrl = require('../controllers/grupo_producto.controller');

router.get('/', grupoProductoCtrl.getGruposProducto);
router.post('/', grupoProductoCtrl.createGrupoProducto);
router.get('/:id', grupoProductoCtrl.getGrupoProducto);
router.put('/:id', grupoProductoCtrl.updateGrupoProducto);
router.delete('/:id', grupoProductoCtrl.deleteGrupoProducto);

module.exports = router;