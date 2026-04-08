const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    id_producto: {
        type: String,
        required: true,
        trim: true
    },
    nit: {
        type: Number,
        required: true,
    },
    nombre_comercial: {
        type: String,
        required: true,
        trim: true
    },
    nombre_sustancia: {
        type: String,
    },
    numero_cas: {
        type: String,
        required: true,
        trim: true
    },
    tipo_producto: {
        type: String,
    },
    estado_fisico: {
        type: String,
    },
    ph: {
        type: Number,
    },
    pto_inflamacion: {
        type: Number,
    },
    id_documento:{
        type: String,
        required: true,
        trim: true
    },
    fecha_creacion_producto: {
        type: Date,
        required: true,
        trim: true
    },
    clase_peligro: {
        type: String,
        required: true,
        trim: true
    },
    categoria:{
        type: String,
    },
    palabra_advertencia: {
        type: String,
    },
    id_pictograma: {
        type: String,
    },
    codigo_h: {
        type: String,
    },
    codigo_p: {
        type: String,
    },
    id_grupo_producto: {
        type: String,
    },
    id_compatibilidad: {
        type: String,
    },
    observaciones_producto:{
        type: String,
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const ModeloProducto = mongoose.model("Producto", userSchema, "Producto");

module.exports = ModeloProducto;