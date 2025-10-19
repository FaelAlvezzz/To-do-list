const path = require("path");
require(`dotenv`).config({ path: path.resolve(__dirname, '..', '.env' )});
const express = require('express');
const cors = require('cors');

// Puxando os dois bancos de dados
const connectMongo = require('./db/mongo');
const { connectDB } = require('./db/postgre');

const app = express();

// Conecta aos bancos de dados
connectMongo();
connectDB();

//Middlware
app.use(cors());
app.use(express.json());

//Rotas
//Auth usa o PostgreSQL
app.use('/api/auth', require('./router/auth'));
//Task usa o modelo Taks do MongoDB
app.use('/api/tasks', require('./router/task'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));