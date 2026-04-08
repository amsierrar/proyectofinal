const ModeloRestriccion = require('../models/restriccion');
const restriccionCtrl = {};

// Crear
restriccionCtrl.createRestriccion = async (req, res) => {
  const {
    id_tipo_usuario,
    tipo_usuario,
    permiso,
  } = req.body;

  if (!id_tipo_usuario || !tipo_usuario) {
    return res.status(400).json({
      mensaje: 'Los campos "id_tipo_usuario" y "tipo_usuario" son obligatorios'
    });
  }

  try {
    const nuevaRestriccion = await ModeloRestriccion.create({
      id_tipo_usuario,
      tipo_usuario,
      permiso
    });

    res.status(201).json({
      mensaje: 'Restricción creada correctamente',
      restriccion: nuevaRestriccion
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear la restricción',
      error: error.message
    });
  }
};

// Obtener todas
restriccionCtrl.getRestricciones = async (req, res) => {
  try {
    const restricciones = await ModeloRestriccion.find();

    res.status(200).json({
      total: restricciones.length,
      data: restricciones
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las restricciones',
      error: error.message
    });
  }
};

// Obtener una por ID
restriccionCtrl.getRestriccion = async (req, res) => {
  const { id_tipo_usuario } = req.params;

  try {
    const restriccion = await ModeloRestriccion.findOne({ id_tipo_usuario });

    if (!restriccion) {
      return res.status(404).json({
        mensaje: 'No se encontró ninguna restricción con ese ID'
      });
    }

    res.status(200).json({
      mensaje: 'Restricción encontrada',
      restriccion
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error en la consulta',
      error: error.message
    });
  }
};

// Actualizar
restriccionCtrl.updateRestriccion = async (req, res) => {
  const { id_tipo_usuario } = req.params;
  const body = req.body;

  try {
    const restriccionActualizada = await ModeloRestriccion.findOneAndUpdate(
      { id_tipo_usuario },
      body,
      { new: true, runValidators: true }
    );

    if (!restriccionActualizada) {
      return res.status(404).json({
        mensaje: 'No se encontró ninguna restricción con ese ID'
      });
    }

    res.status(200).json({
      mensaje: 'Restricción actualizada correctamente',
      restriccion: restriccionActualizada
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar la restricción',
      error: error.message
    });
  }
};

// Eliminar
restriccionCtrl.deleteRestriccion = async (req, res) => {
  const { id_tipo_usuario } = req.params;

  try {
    const restriccionEliminada = await ModeloRestriccion.findOneAndDelete({
      id_tipo_usuario
    });

    if (!restriccionEliminada) {
      return res.status(404).json({
        mensaje: 'No se encontró ninguna restricción con ese ID'
      });
    }

    res.status(200).json({
      mensaje: 'Restricción eliminada correctamente',
      restriccion: restriccionEliminada
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar la restricción',
      error: error.message
    });
  }
};

module.exports = restriccionCtrl;