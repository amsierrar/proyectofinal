const ModeloDocumento = require('../models/documento');
const documentoCtrl = {};

//  CREAR
documentoCtrl.createDocumento = async (req, res) => {
  const {
    id_doc,
    nombre_documento,
    documento_cargado,
    observaciones_documento,
    tipo_documento,
    fecha_creacion_documento,
  } = req.body;

  if (!id_doc || !tipo_documento) {
    return res.status(400).json({
      mensaje: 'Los campos "id_doc" y "tipo_documento" son obligatorios'
    });
  }

  try {
    const nuevoDocumento = await ModeloDocumento.create({
      id_doc,
      nombre_documento,
      documento_cargado,
      observaciones_documento,
      tipo_documento,
      fecha_creacion_documento,
    });

    res.status(201).json({
      mensaje: 'Documento creado correctamente',
      documento: nuevoDocumento
    });

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el documento',
      error: error.message
    });
  }
};

// OBTENER TODOS
documentoCtrl.getDocumentos = async (req, res) => {
  try {
    const documentos = await ModeloDocumento.find({});
    res.status(200).json(documentos);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener documentos',
      error: error.message
    });
  }
};

// OBTENER UNO
documentoCtrl.getDocumento = async (req, res) => {
  const id = req.params.id;

  try {
    const documento = await ModeloDocumento.findOne({
      id_doc: id
    });

    if (!documento) {
      return res.status(404).json({
        mensaje: 'No se encontró el documento'
      });
    }

    res.status(200).json({
      mensaje: 'Documento encontrado',
      documento
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error en la consulta',
      error: error.message
    });
  }
};

// ACTUALIZAR
documentoCtrl.updateDocumento = async (req, res) => {
  const id = req.params.id;

  try {
    const documentoActualizado = await ModeloDocumento.findOneAndUpdate(
      { id_doc: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!documentoActualizado) {
      return res.status(404).json({
        mensaje: 'No se encontró el documento'
      });
    }

    res.status(200).json({
      mensaje: 'Documento actualizado correctamente',
      documento: documentoActualizado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar el documento',
      error: error.message
    });
  }
};

//  ELIMINAR
documentoCtrl.deleteDocumento = async (req, res) => {
  const id = req.params.id;

  try {
    const documentoEliminado = await ModeloDocumento.findOneAndDelete({
      id_doc: id
    });

    if (!documentoEliminado) {
      return res.status(404).json({
        mensaje: 'No se encontró el documento'
      });
    }

    res.status(200).json({
      mensaje: 'Documento eliminado correctamente',
      documento: documentoEliminado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar el documento',
      error: error.message
    });
  }
};

module.exports = documentoCtrl;