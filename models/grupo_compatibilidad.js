const mongoose = require('mongoose');

const grupoCompatibilidadSchema = new mongoose.Schema(
{
    id_grupo_compatibilidad: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nombre_grupo_compatibilidad: {
        type: String,
        required: true,
        trim: true
    },
    descripcion_grupo_compatibilidad: {
        type: String,
        trim: true
    },
    reglas_almacenamiento: {
        type: [String], // 🔥 mejor como lista de reglas
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const ModeloGrupocompatibilidad = mongoose.model(
    "GrupoCompatibilidad",
    grupoCompatibilidadSchema,
    "Grupo_compatibilidad" // colección en MongoDB
);

module.exports = ModeloGrupocompatibilidad;