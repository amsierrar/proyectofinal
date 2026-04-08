const mongoose = require('mongoose');

const grupoProductoSchema = new mongoose.Schema(
{
    id_grupo_producto: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nombre_grupo_producto: {
        type: String,
        required: true,
        trim: true
    },
    descripcion_grupo_producto: {
        type: String,
        trim: true
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const ModeloGrupoproducto = mongoose.model(
    "GrupoProducto",
    grupoProductoSchema,
    "Grupo_producto"
);

module.exports = ModeloGrupoproducto;