const { Sequelize } = require('sequelize');

const sequelize = new sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'postgre', 
        logging: false, 
    }
);

const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Conectado com sucesso!!')
        await sequelize.sync();
    }catch (error) {
        console.error('❌ Error no PostgreSQL', error.message);
    }
};

module.exports = { sequelize, connectPostgres };