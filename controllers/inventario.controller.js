const ModeloInventario = require('../models/inventario');
const inventarioCtrl = {};

//  CREAR MOVIMIENTO
inventarioCtrl.createInventario = async (req, res) => {
  try {
    const nuevo = await ModeloInventario.create(req.body);

    res.status(201).json({
      mensaje: 'Movimiento creado correctamente',
      data: nuevo
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear movimiento',
      error: error.message
    });
  }
};

//  OBTENER TODOS LOS MOVIMIENTOS
inventarioCtrl.getInventario = async (req, res) => {
  try {
    const data = await ModeloInventario.find();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener inventario',
      error: error.message
    });
  }
};

//  MOVIMIENTOS POR PRODUCTO (KARDEX BASE)
inventarioCtrl.getInventarioByProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await ModeloInventario.find({ id_producto: id });

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al consultar',
      error: error.message
    });
  }
};

//  CALCULAR STOCK
inventarioCtrl.getStockByProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const movimientos = await ModeloInventario.find({ id_producto: id });

    let stock = 0;

    movimientos.forEach(mov => {
      if (mov.movimiento.includes('entrada')) {
        stock += Number(mov.cantidad);
      }
      if (mov.movimiento.includes('salida')) {
        stock -= Number(mov.cantidad);
      }
    });

    res.status(200).json({
      producto: id,
      stock
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al calcular stock',
      error: error.message
    });
  }
};

//  STOCK MÍNIMO GLOBAL
inventarioCtrl.getStockMinimo = async (req, res) => {
  try {
    const productos = await ModeloInventario.aggregate([
      {
        $group: {
          _id: "$id_producto",
          stock: {
            $sum: {
              $cond: [
                { $in: ["entrada", "$movimiento"] },
                { $toInt: "$cantidad" },
                { $multiply: [{ $toInt: "$cantidad" }, -1] }
              ]
            }
          },
          stock_minimo: { $first: "$stock_minimo" }
        }
      }
    ]);

    const alerta = productos.filter(p => p.stock <= Number(p.stock_minimo));

    res.status(200).json({
      alerta_stock_bajo: alerta
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error en stock mínimo',
      error: error.message
    });
  }
};

//  ALERTA DE VENCIMIENTO (30 días)
inventarioCtrl.getAlertasVencimiento = async (req, res) => {
  try {
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + 30);

    const vencimientos = await ModeloInventario.find({
      fecha_vencimiento: {
        $lte: limite,
        $gte: hoy
      }
    });

    res.status(200).json({
      proximos_a_vencer: vencimientos
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error en alertas de vencimiento',
      error: error.message
    });
  }
};

module.exports = inventarioCtrl;