const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/postgre');

const User = sequelize.define('user', {
    id: {
        type: DataTypes,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes,
        allowNull: false
    },
    email: {
        type: DataTypes,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes,
        allowNull: false
    }
}, {});

module.exports = User;

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Conectado com sucesso!!');
        await sequelize.sync();
    } catch (error) {
        console.error('❌ Error no PostgreSQL', error.message);
    }
}

module.exports = { sequelize, connectDB };