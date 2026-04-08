const express = require('express');
const router = express.Router();
const productoCtrl = require('../controllers/productos.controller');



// Crear
router.post('/', productoCtrl.createProducto);

// Obtener todos
router.get('/', productoCtrl.getProductos);

// Obtener uno
router.get('/:id_producto', productoCtrl.getProducto);

// Actualizar
router.put('/:id_producto', productoCtrl.updateProducto);

// Eliminar
router.delete('/:id_producto', productoCtrl.deleteProducto);

module.exports = router; 