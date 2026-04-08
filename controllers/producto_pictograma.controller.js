const ProductoPictograma = require('../models/producto_pictograma');
const Producto = require('../models/producto');
const Pictograma = require('../models/pictograma');

const ctrl = {};


// FUNCIÓN INTERNA (USADA POR PRODUCTO)
ctrl.asignarPictogramasANuevoProducto = async (id_producto) => {
    try {
        const pictogramas = await Pictograma.find();

        if (pictogramas.length === 0) return;

        // 🔍 Evitar duplicados
        const existentes = await ProductoPictograma.find({ id_producto });
        const existentesIds = existentes.map(e => e.id_pictograma);

        const nuevasRelaciones = pictogramas
            .filter(p => !existentesIds.includes(p.id_pictograma))
            .map(p => ({
                id_producto,
                id_pictograma: p.id_pictograma
            }));

        if (nuevasRelaciones.length > 0) {
            await ProductoPictograma.insertMany(nuevasRelaciones);
        }

    } catch (error) {
        console.error('Error auto-asignando pictogramas:', error.message);
    }
};



// GENERAR TODAS LAS RELACIONES (GLOBAL)
ctrl.generarRelacionesAutomaticas = async (req, res) => {
    try {
        const productos = await Producto.find();
        const pictogramas = await Pictograma.find();

        if (productos.length === 0 || pictogramas.length === 0) {
            return res.status(404).json({
                mensaje: 'Debe haber productos y pictogramas registrados'
            });
        }

        const existentes = await ProductoPictograma.find();
        const setExistentes = new Set(
            existentes.map(e => `${e.id_producto}-${e.id_pictograma}`)
        );

        let nuevasRelaciones = [];

        for (let prod of productos) {
            for (let pic of pictogramas) {
                const key = `${prod.id_producto}-${pic.id_pictograma}`;

                if (!setExistentes.has(key)) {
                    nuevasRelaciones.push({
                        id_producto: prod.id_producto,
                        id_pictograma: pic.id_pictograma
                    });
                }
            }
        }

        if (nuevasRelaciones.length === 0) {
            return res.status(200).json({
                mensaje: 'Todas las relaciones ya existen'
            });
        }

        const resultado = await ProductoPictograma.insertMany(nuevasRelaciones);

        res.status(201).json({
            mensaje: 'Relaciones generadas correctamente',
            total: resultado.length
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al generar relaciones',
            error: error.message
        });
    }
};



// OBTENER TODAS
ctrl.obtenerRelaciones = async (req, res) => {
    try {
        const relaciones = await ProductoPictograma.find();

        res.status(200).json({
            total: relaciones.length,
            data: relaciones
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener relaciones',
            error: error.message
        });
    }
};



// OBTENER POR PRODUCTO
ctrl.obtenerPorProducto = async (req, res) => {
    try {
        const { id_producto } = req.params;

        const relaciones = await ProductoPictograma.find({ id_producto });

        res.status(200).json({
            total: relaciones.length,
            data: relaciones
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener relaciones',
            error: error.message
        });
    }
};



// ELIMINAR RELACIÓN
ctrl.eliminarRelacion = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await ProductoPictograma.findByIdAndDelete(id);

        if (!eliminado) {
            return res.status(404).json({
                mensaje: 'Relación no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Relación eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar relación',
            error: error.message
        });
    }
};



module.exports = ctrl;