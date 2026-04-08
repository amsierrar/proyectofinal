const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    nit: {
        type: Number,
        required: true,
        trim: true
    },
    nombre_proveedor: {
        type: String,
        required: true,
    },
    telefono_proveedor: {
        type: String,
    },
    contacto_proveedor: {
        type: String,
    },
    correo_proveedor: {
        type: String,
        required: true,
        trim: true
    },
    direccion_proveedor: {
        type: String,
    },
    pais_proveedor: {
        type: String,
    },
    ciudad_proveedor: {
        type: String,
    },
    observaciones_proveedor: {
        type: String,
    },
    fecha_creacion_proveedor: {
        type: Date,
        required: true,
        trim: true
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const ModeloProveedor = mongoose.model("Proveedor", userSchema, "Proveedor");

module.exports = ModeloProveedor;