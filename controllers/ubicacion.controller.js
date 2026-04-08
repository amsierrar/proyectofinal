const ModeloUbicacion = require('../models/ubicacion');
const ubicacionCtrl = {};

// ✅ Crear ubicación (POST)
ubicacionCtrl.createUbicacion = async (req, res) => {
  try {
    const {
      id_ubicacion,
      id_producto,
      id_inventario,
      cantidad,
      fecha_creacion,
      observaciones_ubicacion,
      stock_maximo,
      unidad,
    } = req.body;

    // Validación básica
    if (!id_ubicacion || !id_producto || !stock_maximo) {
      return res.status(400).json({
        mensaje: 'Los campos "id_ubicacion", "id_producto" y "stock_maximo" son obligatorios'
      });
    }

    // Evitar duplicados
    const existe = await ModeloUbicacion.findOne({ id_ubicacion });
    if (existe) {
      return res.status(400).json({
        mensaje: 'La ubicación ya existe'
      });
    }

    const nuevaUbicacion = new ModeloUbicacion({
      id_ubicacion,
      id_producto,
      id_inventario,
      cantidad,
      fecha_creacion,
      observaciones_ubicacion,
      stock_maximo,
      unidad,
    });

    await nuevaUbicacion.save();

    res.status(201).json({
      mensaje: 'Ubicación creada satisfactoriamente',
      ubicacion: nuevaUbicacion
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear la ubicación',
      error: error.message
    });
  }
};

// ✅ Obtener todas
ubicacionCtrl.getUbicaciones = async (req, res) => {
  try {
    const ubicaciones = await ModeloUbicacion.find({});
    res.status(200).json(ubicaciones);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener ubicaciones',
      error: error.message
    });
  }
};

// ✅ Obtener por ID personalizado (NO _id)
ubicacionCtrl.getUbicacionById = async (req, res) => {
  try {
    const ubicacion = await ModeloUbicacion.findOne({
      id_ubicacion: req.params.id
    });

    if (!ubicacion) {
      return res.status(404).json({
        mensaje: 'No se encontró la ubicación'
      });
    }

    res.status(200).json(ubicacion);

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error en la consulta',
      error: error.message
    });
  }
};

// ✅ Actualizar por id_ubicacion
ubicacionCtrl.updateUbicacion = async (req, res) => {
  try {
    const ubicacionActualizada = await ModeloUbicacion.findOneAndUpdate(
      { id_ubicacion: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!ubicacionActualizada) {
      return res.status(404).json({
        mensaje: 'No se encontró la ubicación'
      });
    }

    res.status(200).json({
      mensaje: 'Ubicación actualizada correctamente',
      ubicacion: ubicacionActualizada
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar la ubicación',
      error: error.message
    });
  }
};

// ✅ Eliminar por id_ubicacion
ubicacionCtrl.deleteUbicacion = async (req, res) => {
  try {
    const ubicacionEliminada = await ModeloUbicacion.findOneAndDelete({
      id_ubicacion: req.params.id
    });

    if (!ubicacionEliminada) {
      return res.status(404).json({
        mensaje: 'No se encontró la ubicación'
      });
    }

    res.status(200).json({
      mensaje: 'Ubicación eliminada correctamente',
      ubicacion: ubicacionEliminada
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar la ubicación',
      error: error.message
    });
  }
};

module.exports = ubicacionCtrl;