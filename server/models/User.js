const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/postgre');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});

module.exports = User;

const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Conectado com sucesso!!')
        await sequelize.sync();
    } catch (error) {
        console.error('❌ Error no PostgreSQL', error.message);
    }
};

module.exports = { sequelize, connectPostgres };