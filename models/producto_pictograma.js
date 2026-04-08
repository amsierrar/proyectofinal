const mongoose = require('mongoose');

const productoPictogramaSchema = new mongoose.Schema({
    id_producto: {
        type: String,
        required: true,
        trim: true,
        index: true 
    },
    id_pictograma: {
        type: String,
        required: true,
        trim: true,
        index: true 
    },
    activo: {
        type: Boolean,
        default: true 
    }
}, {
    timestamps: true
});


// ÍNDICE COMPUESTO ÚNICO (ANTI DUPLICADOS)
productoPictogramaSchema.index(
    { id_producto: 1, id_pictograma: 1 },
    { unique: true }
);


// OPCIONAL: evitar que falle insertMany por duplicados
productoPictogramaSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});


module.exports = mongoose.model('ProductoPictograma', productoPictogramaSchema);