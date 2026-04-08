const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    id_tipo_usuario: {
        type: String,
    },
    tipo_usuario: {
        type: String,
        enum: ["admin", "usuario", "supervisor", "almacenista", "auditor", "gerente", "operador", "tecnico", "invitado"]
    },
    permiso: {
        type: [String],
        enum: ["crear", "editar", "eliminar", "ver", "aprobar", "registrar"]
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const ModeloRestriccion = mongoose.model("Restriccion", userSchema, "Restriccion");

module.exports = ModeloRestriccion;