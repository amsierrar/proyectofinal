const express = require("express");
const dbconnect = require("./db");
const cors = require("cors");
const productoPictogramaRoutes = require('./routes/producto_pictograma.routes');


const app = express();


app.use(cors({ origin: "*" }));
app.use(express.json());


app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/compatibilidad', require('./routes/compatibilidad.routes'));
app.use('/api/documento', require('./routes/documento.routes'));
app.use('/api/grupo_compatibilidad', require('./routes/grupo_compatibilidad.routes'));
app.use('/api/grupo_producto', require('./routes/grupo_producto.routes'));
app.use('/api/inventario', require('./routes/inventario.routes'));
app.use('/api/pictograma', require('./routes/pictograma.routes'));
//app.use('/api/producto_pictograma2', require('./routes/producto_pictograma2.routes'));
app.use('/api/producto', require('./routes/producto.routes'));
app.use('/api/proveedor',require('./routes/proveedor.routes'));
app.use('/api/ubicacion',require('./routes/ubicacion.routes'));
app.use('/api/restriccion',require('./routes/restriccion.routes'));
app.use('/api/producto-pictograma', productoPictogramaRoutes);

app.listen(3015, () => {
  console.log("Servidor corriendo en el puerto 3015");
});


dbconnect();

module.exports = app;