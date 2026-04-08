const ModeloProducto = require('../models/producto');
const ProductoPictograma = require('../models/producto_pictograma');
const Pictograma = require('../models/pictograma');

const productoCtrl = {};


//FUNCIÓN INTERNA MEJORADA (SIN DUPLICADOS)
const asignarPictogramasANuevoProducto = async (id_producto) => {
  try {
    const pictogramas = await Pictograma.find();

    if (pictogramas.length === 0) return;

    // Buscar existentes
    const existentes = await ProductoPictograma.find({ id_producto });
    const existentesIds = existentes.map(e => e.id_pictograma);

    // Filtrar los que NO existen
    const nuevasRelaciones = pictogramas
      .filter(p => !existentesIds.includes(p.id_pictograma))
      .map(p => ({
        id_producto,
        id_pictograma: p.id_pictograma
      }));

    if (nuevasRelaciones.length > 0) {
      await ProductoPictograma.insertMany(nuevasRelaciones);
    }

  } catch (error) {
    console.error('Error auto-asignando pictogramas:', error.message);
  }
};



// CREAR PRODUCTO
productoCtrl.createProducto = async (req, res) => {
  try {
    const data = req.body;

    if (!data.id_producto || !data.nombre_comercial) {
      return res.status(400).json({
        mensaje: 'id_producto y nombre_comercial son obligatorios'
      });
    }

    // 🚫 Evitar duplicados
    const existe = await ModeloProducto.findOne({ id_producto: data.id_producto });
    if (existe) {
      return res.status(400).json({
        mensaje: 'El producto ya existe'
      });
    }

    const nuevoProducto = new ModeloProducto(data);
    await nuevoProducto.save();

    //AUTO RELACIÓN
    await asignarPictogramasANuevoProducto(data.id_producto);

    res.status(201).json({
      mensaje: 'Producto creado correctamente',
      producto: nuevoProducto
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el producto',
      error: error.message
    });
  }
};



// OBTENER TODOS
productoCtrl.getProductos = async (req, res) => {
  try {
    const productos = await ModeloProducto.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: productos.length,
      data: productos
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener productos',
      error: error.message
    });
  }
};



// OBTENER UNO
productoCtrl.getProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;

    const producto = await ModeloProducto.findOne({ id_producto });

    if (!producto) {
      return res.status(404).json({
        mensaje: 'No se encontró el producto'
      });
    }

    res.status(200).json({
      mensaje: 'Producto encontrado',
      producto
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error en la consulta',
      error: error.message
    });
  }
};



// ACTUALIZAR
productoCtrl.updateProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;

    const productoActualizado = await ModeloProducto.findOneAndUpdate(
      { id_producto },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!productoActualizado) {
      return res.status(404).json({
        mensaje: 'No se encontró el producto'
      });
    }

    res.status(200).json({
      mensaje: 'Producto actualizado correctamente',
      producto: productoActualizado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar el producto',
      error: error.message
    });
  }
};



//ELIMINAR (CON LIMPIEZA TOTAL)
productoCtrl.deleteProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;

    const productoEliminado = await ModeloProducto.findOneAndDelete({ id_producto });

    if (!productoEliminado) {
      return res.status(404).json({
        mensaje: 'No se encontró el producto'
      });
    }

    // Eliminar TODAS las relaciones asociadas
    await ProductoPictograma.deleteMany({ id_producto });

    res.status(200).json({
      mensaje: 'Producto eliminado correctamente',
      producto: productoEliminado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar el producto',
      error: error.message
    });
  }
};



module.exports = productoCtrl;