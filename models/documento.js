const mongoose = require('mongoose');

const documentoSchema = new mongoose.Schema(
{
    id_doc: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nombre_documento: {
        type: String,
        required: true,
    },
    documento_cargado: {
        type: String,
    },
    observaciones_documento: {
        type: String,
    },
    tipo_documento: {
        type: [String],
    },
    fecha_creacion_documento: {
        type: Date,
        required: true,
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const ModeloDocumento = mongoose.model("Documento", documentoSchema, "Documentos");

module.exports = ModeloDocumento;