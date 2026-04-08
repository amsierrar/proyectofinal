const mongoose = require('mongoose');
require ('dotenv').config()

const dbconnect = () => {
    mongoose.set('strictQuery', true);

    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Conexión exitosa a tecquimdb"))
        .catch((err) => console.log("Error:", err.message));
}

module.exports = dbconnect;