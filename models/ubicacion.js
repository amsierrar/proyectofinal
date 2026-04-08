const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    id_ubicacion: {
        type: String,
        required: true,
        trim: true
    },
    id_producto: { 
        type: String,
        required: true,
    },
    id_inventario: {
        type: String,
    },
    cantidad: {
        type: String,
    },
    fecha_creacion: {
        type: Date,
        required: true,      
    },
    observaciones_ubicacion: {
        type: String,
    },
    stock_maximo: {
        type: String,
        required: true,
    },
    unidad: {
        type: [String],
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const ModeloUbicacion = mongoose.model("Ubicacion", userSchema, "Ubicacion");

module.exports = ModeloUbicacion;