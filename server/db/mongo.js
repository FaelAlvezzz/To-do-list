const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.log(`❌ Erro no MongoDB: ${error.message}`);
    }
};
module.exports = connectMongo;