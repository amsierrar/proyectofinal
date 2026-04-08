const ModeloCompatibilidad = require('../models/compatibilidad');
const compatibilidadCtrl = {};

//  CREAR
compatibilidadCtrl.createCompatibilidad = async (req, res) => {
  const {
    id_compatibilidad,
    id_grupo1,
    id_grupo2,
    nivel_compatibilidad,
    reglas_almacenamiento,
    observaciones_compatiilidad
  } = req.body;

  if (!id_compatibilidad) {
    return res.status(400).json({
      mensaje: 'El campo "id_compatibilidad" es obligatorio'
    });
  }

  try {
    const nuevaCompatibilidad = await ModeloCompatibilidad.create({
      id_compatibilidad,
      id_grupo1,
      id_grupo2,
      nivel_compatibilidad,
      reglas_almacenamiento,
      observaciones_compatiilidad
    });

    res.status(201).json({
      mensaje: 'Compatibilidad creada correctamente',
      compatibilidad: nuevaCompatibilidad
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear la compatibilidad',
      error: error.message
    });
  }
};

//  OBTENER TODAS
compatibilidadCtrl.getCompatibilidades = async (req, res) => {
  try {
    const data = await ModeloCompatibilidad.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener compatibilidades',
      error: error.message
    });
  }
};

//  OBTENER UNA (POR id_compatibilidad)
compatibilidadCtrl.getCompatibilidad = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await ModeloCompatibilidad.findOne({
      id_compatibilidad: id
    });

    if (!data) {
      return res.status(404).json({
        mensaje: 'No se encontró la compatibilidad'
      });
    }

    res.status(200).json({
      mensaje: 'Compatibilidad encontrada',
      compatibilidad: data
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error en la consulta',
      error: error.message
    });
  }
};

//  ACTUALIZAR
compatibilidadCtrl.updateCompatibilidad = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await ModeloCompatibilidad.findOneAndUpdate(
      { id_compatibilidad: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!data) {
      return res.status(404).json({
        mensaje: 'No se encontró la compatibilidad'
      });
    }

    res.status(200).json({
      mensaje: 'Compatibilidad actualizada',
      compatibilidad: data
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar',
      error: error.message
    });
  }
};

//  ELIMINAR
compatibilidadCtrl.deleteCompatibilidad = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await ModeloCompatibilidad.findOneAndDelete({
      id_compatibilidad: id
    });

    if (!data) {
      return res.status(404).json({
        mensaje: 'No se encontró la compatibilidad'
      });
    }

    res.status(200).json({
      mensaje: 'Compatibilidad eliminada',
      compatibilidad: data
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar',
      error: error.message
    });
  }
};

module.exports = compatibilidadCtrl;