const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema(
{
  //  id_inventario: {
    //    type: String,
      //  required: true,
        //unique: true,
//        trim: true
  //  },
    id_producto: {
        type: String,
        required: true,
        trim: true
    },
    id_ubicacion: {
        type: String,
        trim: true
    },
    lote: {
        type: String,
        trim: true
    },
    fecha_vencimiento: {
        type: Date,
        required: true
    },
    movimiento: {
        type: [String],
        required: true
    },
    fecha_movimiento: {
        type: Date,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    stock_minimo: {
        type: Number
    },
    stock_maximo: {
        type: Number
    },
    observaciones_inventario: {
        type: String,
        trim: true
    },
    unidad: {
        type: [String]
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const ModeloInventario = mongoose.model(
    "Inventario",
    inventarioSchema,
    "Inventario"
);

module.exports = ModeloInventario;