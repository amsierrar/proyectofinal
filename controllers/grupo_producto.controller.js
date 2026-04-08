const ModeloGrupoproducto = require('../models/grupo_producto');
const grupoProductoCtrl = {};

// CREAR
grupoProductoCtrl.createGrupoProducto = async (req, res) => {
  const {
    id_grupo_producto,
    nombre_grupo_producto,
    descripcion_grupo_producto,
  } = req.body;

  if (!id_grupo_producto || !nombre_grupo_producto) {
    return res.status(400).json({
      mensaje: 'Los campos "id_grupo_producto" y "nombre_grupo_producto" son obligatorios'
    });
  }

  try {
    const nuevoGrupopro = await ModeloGrupoproducto.create({
      id_grupo_producto,
      nombre_grupo_producto,
      descripcion_grupo_producto,
    });

    res.status(201).json({
      mensaje: 'Grupo de producto creado correctamente',
      grupo_producto: nuevoGrupopro
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el grupo',
      error: error.message
    });
  }
};

// OBTENER TODOS
grupoProductoCtrl.getGruposProducto = async (req, res) => {
  try {
    const grupospro = await ModeloGrupoproducto.find();

    res.status(200).json({
      total: grupospro.length,
      data: grupospro
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los grupos',
      error: error.message
    });
  }
};

// OBTENER UNO
grupoProductoCtrl.getGrupoProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const grupopro = await ModeloGrupoproducto.findOne({
      id_grupo_producto: id
    });

    if (!grupopro) {
      return res.status(404).json({
        mensaje: 'No se encontró ningún grupo con ese ID'
      });
    }

    res.status(200).json({
      mensaje: 'Grupo encontrado',
      grupo_producto: grupopro
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error en la consulta',
      error: error.message
    });
  }
};

// ACTUALIZAR
grupoProductoCtrl.updateGrupoProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const grupoproActualizado = await ModeloGrupoproducto.findOneAndUpdate(
      { id_grupo_producto: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!grupoproActualizado) {
      return res.status(404).json({
        mensaje: 'No se encontró ningún grupo con ese ID'
      });
    }

    res.status(200).json({
      mensaje: 'Grupo actualizado correctamente',
      grupo_producto: grupoproActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar el grupo',
      error: error.message
    });
  }
};

// ELIMINAR
grupoProductoCtrl.deleteGrupoProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const grupoproEliminado = await ModeloGrupoproducto.findOneAndDelete({
      id_grupo_producto: id
    });

    if (!grupoproEliminado) {
      return res.status(404).json({
        mensaje: 'No se encontró ningún grupo con ese ID'
      });
    }

    res.status(200).json({
      mensaje: 'Grupo eliminado correctamente',
      grupo_producto: grupoproEliminado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar el grupo',
      error: error.message
    });
  }
};

module.exports = grupoProductoCtrl;