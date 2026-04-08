const ModeloProveedor = require('../models/proveedor');
const proveedorCtrl = {};

// Crear nuevo proveedor
proveedorCtrl.createProveedor = async (req, res) => {
  const {
    nit,
    nombre_proveedor,
    telefono_proveedor,
    contacto_proveedor,
    correo_proveedor,
    direccion_proveedor,
    pais_proveedor,
    ciudad_proveedor,
    observaciones_proveedor,
    fecha_creacion_proveedor,
  } = req.body;

  if (!nit || !nombre_proveedor) {
    return res.status(400).json({
      mensaje: 'Los campos "nit" y "nombre_proveedor" son obligatorios'
    });
  }

  try {
    const nuevoProveedor = await ModeloProveedor.create({
        nit,
        nombre_proveedor,
        telefono_proveedor,
        contacto_proveedor,
        correo_proveedor,
        direccion_proveedor,
        pais_proveedor,
        ciudad_proveedor,
        observaciones_proveedor,
        fecha_creacion_proveedor,
    });

    res.status(201).json({
      mensaje: 'Proveedor creado satisfactoriamente',
      proveedor: nuevoProveedor
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el proveedor',
      error: error.message
    });
  }
};

// Obtener todos los proveedores
proveedorCtrl.getProveedor = async (req, res) => {
  try {
    const proveedores = await ModeloProveedor.find({});
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener proveedores',
      error: error.message
    });
  }
};

// Obtener un proveedor por NIT
proveedorCtrl.getUniqueProveedor = async (req, res) => {
  const nit = req.params.nit;

  try {
    const proveedor = await ModeloProveedor.findOne({ nit });

    if (!proveedor) {
      return res.status(404).json({
        mensaje: 'No se encontró ningún proveedor con el NIT proporcionado'
      });
    }

    res.status(200).json({
      mensaje: 'Proveedor encontrado',
      proveedor
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'NIT no válido o error en la consulta',
      error: error.message
    });
  }
};

// Actualizar proveedor
proveedorCtrl.editProveedor = async (req, res) => {
  const nit = req.params.nit;
  const body = req.body;

  try {
    const proveedorActualizado = await ModeloProveedor.findOneAndUpdate(
      { nit },
      body,
      { new: true, runValidators: true }
    );

    if (!proveedorActualizado) {
      return res.status(404).json({
        mensaje: 'No se encontró ningún proveedor con el NIT proporcionado'
      });
    }

    res.status(200).json({
      mensaje: 'Proveedor actualizado correctamente',
      proveedor: proveedorActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar el proveedor',
      error: error.message
    });
  }
};

// Eliminar proveedor
proveedorCtrl.deleteProveedor = async (req, res) => {
  const nit = req.params.nit;

  try {
    const proveedorEliminado = await ModeloProveedor.findOneAndDelete({ nit });

    if (!proveedorEliminado) {
      return res.status(404).json({
        mensaje: 'No se encontró ningún proveedor con el NIT proporcionado'
      });
    }

    res.status(200).json({
      mensaje: 'Proveedor eliminado correctamente',
      proveedor: proveedorEliminado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar el proveedor',
      error: error.message
    });
  }
};

module.exports = proveedorCtrl;