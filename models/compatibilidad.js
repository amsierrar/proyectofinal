const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    id_compatibilidad: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    id_grupo1: {
        type: String,
        required: true,
    },
    id_grupo2: {
        type: String,
        required: true,
    },
    nivel_compatibilidad: {
        type: String,
    },
    reglas_almacenamiento: {
        type: String,
    },
    observaciones_compatibilidad: {
        type: String,
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const ModeloCompatibilidad = mongoose.model("Compatibilidad", userSchema, "Compatibilidad");

module.exports = ModeloCompatibilidad;