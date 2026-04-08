const express = require ('express');
const router =express.Router();
const proveedorCtrl = require('../controllers/proveedor.controller');

router.get('/', proveedorCtrl.getProveedor);
router.post('/', proveedorCtrl.createProveedor);
router.get('/:nit', proveedorCtrl.getUniqueProveedor);
router.put('/:nit', proveedorCtrl.editProveedor);
router.delete('/:nit', proveedorCtrl.deleteProveedor);

module.exports = router;