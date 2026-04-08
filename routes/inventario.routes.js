const express = require('express');
const router = express.Router();
const inventarioCtrl = require('../controllers/inventario.controller');

// CREAR
router.post('/', inventarioCtrl.createInventario);
// TODOS
router.get('/', inventarioCtrl.getInventario);
// KARDEX
router.get('/producto/:id', inventarioCtrl.getInventarioByProducto);
// STOCK
router.get('/stock/:id', inventarioCtrl.getStockByProducto);
// STOCK MINIMO
router.get('/alerta-stock', inventarioCtrl.getStockMinimo);
// VENCIMIENTO
router.get('/alerta-vencimiento', inventarioCtrl.getAlertasVencimiento);

module.exports = router;