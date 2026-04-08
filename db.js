const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

const dbconnect = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log("Conexión exitosa a MongoDB");
    } catch (err) {
        console.log("Error:", err.message);
    }
};

module.exports = dbconnect;