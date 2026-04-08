const mongoose = require('mongoose');

const pictogramaSchema = new mongoose.Schema(
{
    id_pictograma: {
        type: String,
        required: true, // ✅ corregido
    },
    figura_pictograma: {
        type: String,
    },
    descripcion_pictograma: {
        type: String,
    },
    observacion_pictograma: {
        type: String,
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const ModeloPictograma = mongoose.model("Pictograma", pictogramaSchema, "Pictograma");

module.exports = ModeloPictograma;