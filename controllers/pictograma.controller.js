const ModeloPictograma = require('../models/pictograma');
const pictogramaCtrl = {};

// Crear pictograma
pictogramaCtrl.createPictograma = async (req, res) => {
  const {
    id_pictograma,
    figura_pictograma,
    descripcion_pictograma,
    observacion_pictograma,
  } = req.body;

  if (!id_pictograma) {
    return res.status(400).json({
      mensaje: 'El campo "id_pictograma" es obligatorio'
    });
  }

  try {
    const nuevoPictograma = await ModeloPictograma.create({
      id_pictograma,
      figura_pictograma,
      descripcion_pictograma,
      observacion_pictograma,
    });

    res.status(201).json({
      mensaje: 'Pictograma creado correctamente',
      pictograma: nuevoPictograma
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el pictograma',
      error: error.message
    });
  }
};

// Obtener todos
pictogramaCtrl.getPictogramas = async (req, res) => {
  try {
    const pictogramas = await ModeloPictograma.find();
    res.status(200).json(pictogramas);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener pictogramas',
      error: error.message
    });
  }
};

// Obtener uno
pictogramaCtrl.getPictograma = async (req, res) => {
  const id_pictograma = req.params.id;

  try {
    const pictograma = await ModeloPictograma.findOne({ id_pictograma });

    if (!pictograma) {
      return res.status(404).json({
        mensaje: 'No se encontró el pictograma'
      });
    }

    res.status(200).json(pictograma);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error en la consulta',
      error: error.message
    });
  }
};

// Actualizar
pictogramaCtrl.updatePictograma = async (req, res) => {
  const id_pictograma = req.params.id;

  try {
    const pictogramaActualizado = await ModeloPictograma.findOneAndUpdate(
      { id_pictograma },
      req.body,
      { new: true, runValidators: true }
    );

    if (!pictogramaActualizado) {
      return res.status(404).json({
        mensaje: 'No se encontró el pictograma'
      });
    }

    res.status(200).json({
      mensaje: 'Pictograma actualizado',
      pictograma: pictogramaActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar',
      error: error.message
    });
  }
};

// Eliminar
pictogramaCtrl.deletePictograma = async (req, res) => {
  const id_pictograma = req.params.id;

  try {
    const pictogramaEliminado = await ModeloPictograma.findOneAndDelete({ id_pictograma });

    if (!pictogramaEliminado) {
      return res.status(404).json({
        mensaje: 'No se encontró el pictograma'
      });
    }

    res.status(200).json({
      mensaje: 'Pictograma eliminado',
      pictograma: pictogramaEliminado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar',
      error: error.message
    });
  }
};

module.exports = pictogramaCtrl;