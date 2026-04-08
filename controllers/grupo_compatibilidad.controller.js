const ModeloGrupocompatibilidad = require('../models/grupo_compatibilidad');
const grupo_compatibilidadCtrl = {};

// CREAR
grupo_compatibilidadCtrl.create = async (req, res) => {
  const {
    id_grupo_compatibilidad,
    nombre_grupo_compatibilidad,
    descripcion_grupo_compatibilidad,
    reglas_almacenamiento,
  } = req.body;

  if (!id_grupo_compatibilidad || !reglas_almacenamiento) {
    return res.status(400).json({
      mensaje: 'Los campos "id_grupo_compatibilidad" y "reglas_almacenamiento" son obligatorios'
    });
  }

  try {
    const nuevoGrucomp = await ModeloGrupocompatibilidad.create({
      id_grupo_compatibilidad,
      nombre_grupo_compatibilidad,
      descripcion_grupo_compatibilidad,
      reglas_almacenamiento,
    });

    res.status(201).json({
      mensaje: 'Grupo de compatibilidad creado correctamente',
      grucomp: nuevoGrucomp
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el grupo',
      error: error.message
    });
  }
};

// OBTENER TODOS
grupo_compatibilidadCtrl.getAll = async (req, res) => {
  try {
    const grupos = await ModeloGrupocompatibilidad.find({});
    res.status(200).json(grupos);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los grupos',
      error: error.message
    });
  }
};

// OBTENER UNO
grupo_compatibilidadCtrl.getOne = async (req, res) => {
  const id = req.params.id;

  try {
    const grupo = await ModeloGrupocompatibilidad.findOne({
      id_grupo_compatibilidad: id
    });

    if (!grupo) {
      return res.status(404).json({
        mensaje: 'No se encontró el grupo'
      });
    }

    res.status(200).json({
      mensaje: 'Grupo encontrado',
      grupo
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error en la consulta',
      error: error.message
    });
  }
};

// ACTUALIZAR
grupo_compatibilidadCtrl.update = async (req, res) => {
  const id = req.params.id;

  try {
    const grupoActualizado = await ModeloGrupocompatibilidad.findOneAndUpdate(
      { id_grupo_compatibilidad: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!grupoActualizado) {
      return res.status(404).json({
        mensaje: 'No se encontró el grupo'
      });
    }

    res.status(200).json({
      mensaje: 'Grupo actualizado correctamente',
      grupo: grupoActualizado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar el grupo',
      error: error.message
    });
  }
};

// ELIMINAR
grupo_compatibilidadCtrl.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const grupoEliminado = await ModeloGrupocompatibilidad.findOneAndDelete({
      id_grupo_compatibilidad: id
    });

    if (!grupoEliminado) {
      return res.status(404).json({
        mensaje: 'No se encontró el grupo'
      });
    }

    res.status(200).json({
      mensaje: 'Grupo eliminado correctamente',
      grupo: grupoEliminado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar el grupo',
      error: error.message
    });
  }
};

module.exports = grupo_compatibilidadCtrl;