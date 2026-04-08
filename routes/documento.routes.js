const express = require('express');
const router = express.Router();
const documentoCtrl = require('../controllers/documento.controller');


router.get('/', documentoCtrl.getDocumentos);
router.get('/:id', documentoCtrl.getDocumento);
router.post('/', documentoCtrl.createDocumento);
router.put('/:id', documentoCtrl.updateDocumento);
router.delete('/:id', documentoCtrl.deleteDocumento);

module.exports = router;