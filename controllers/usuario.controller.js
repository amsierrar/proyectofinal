const ModeloUsuario = require('../models/usuario');
const usuarioCtrl = {};

//  Crear usuario
usuarioCtrl.createUser = async (req, res) => {
  const {
    id_usuario,
    nombre_usuario,
    cargo_usuario,
    tipo_usuario,
    correo_usuario,
    telefono_usuario,
    dependencia,
    password,
    observacion_usuario,
  } = req.body;

  //  Validación
  if (!id_usuario || !password || !nombre_usuario || !correo_usuario) {
    return res.status(400).json({
      mensaje: 'Los campos id_usuario, nombre_usuario, correo_usuario y password son obligatorios'
    });
  }

  try {
    const nuevoUsuario = await ModeloUsuario.create({
      id_usuario,
      nombre_usuario,
      cargo_usuario,
      tipo_usuario,
      correo_usuario,
      telefono_usuario,
      dependencia,
      password,
      observacion_usuario,
    });

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario: nuevoUsuario
    });

  } catch (error) {
    //  Error común: correo duplicado
    if (error.code === 11000) {
      return res.status(400).json({
        mensaje: 'El correo ya está registrado'
      });
    }

    res.status(500).json({
      mensaje: 'Error al crear el usuario',
      error: error.message
    });
  }
};

//  Obtener todos
usuarioCtrl.getUsers = async (req, res) => {
  try {
    const usuarios = await ModeloUsuario.find();
    res.status(200).json({
      total: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

//  Obtener por ID (Mongo _id)
usuarioCtrl.getUniqueUser = async (req, res) => {
  const id = req.params.id;

  try {
    const usuario = await ModeloUsuario.findById(id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    res.status(200).json(usuario);

  } catch (error) {
    res.status(400).json({
      mensaje: 'ID inválido',
      error: error.message
    });
  }
};

//  Obtener por id_usuario (tu campo personalizado)
usuarioCtrl.getUniqueUser = async (req, res) => {
  const id_usuario = req.params.id;

  try {
    const usuario = await ModeloUsuario.findOne({ id_usuario });

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    res.status(200).json(usuario);

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error en la consulta',
      error: error.message
    });
  }
};

//  Actualizar
usuarioCtrl.editUser = async (req, res) => {
  const id_usuario = req.params.id;
  const body = req.body;

  try {
    const usuarioActualizado = await ModeloUsuario.findOneAndUpdate(
      { id_usuario: id_usuario },
      body,
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: usuarioActualizado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar',
      error: error.message
    });
  }
};

//  Eliminar
usuarioCtrl.deleteUser = async (req, res) => {
  const id_usuario = req.params.id;

  try {
    const usuarioEliminado = await ModeloUsuario.findOneAndDelete({
      id_usuario: id_usuario
    });

    if (!usuarioEliminado) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      mensaje: 'Usuario eliminado correctamente',
      usuario: usuarioEliminado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar',
      error: error.message
    });
  }
};
module.exports = usuarioCtrl;