const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/producto_pictograma.controller');


// GENERAR TODAS LAS RELACIONES (producto ↔ pictogramas)
router.post('/generar', ctrl.generarRelacionesAutomaticas);


// OBTENER TODAS LAS RELACIONES
router.get('/', ctrl.obtenerRelaciones);


// OBTENER RELACIONES POR PRODUCTO
router.get('/producto/:id_producto', ctrl.obtenerPorProducto);


// ELIMINAR UNA RELACIÓN POR ID (Mongo _id)
router.delete('/:id', ctrl.eliminarRelacion);


module.exports = router;