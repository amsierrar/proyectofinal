const express = require('express');
const router = express.Router();
const pictogramaCtrl = require('../controllers/pictograma.controller');


router.get('/', pictogramaCtrl.getPictogramas);
router.post('/', pictogramaCtrl.createPictograma);
router.get('/:id', pictogramaCtrl.getPictograma);
router.put('/:id', pictogramaCtrl.updatePictograma);
router.delete('/:id', pictogramaCtrl.deletePictograma);

module.exports = router;