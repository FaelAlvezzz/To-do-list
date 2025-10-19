const Sequelize = require('sequelize');

const sequelize = new Sequelize( 
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres', 
        logging: false, 
    }
);

async function connectDB() {
    try {
        await sequelize;
        console.log('✅ PostgreSQL Conectado com sucesso!!');
        return sequelize;
    } catch (error) {
        console.error('❌ Error no PostgreSQL: ', error.message);
    }
}

module.exports = { sequelize, connectDB };