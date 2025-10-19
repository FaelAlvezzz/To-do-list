require('dotenv').config();
import express, { json } from 'express';
import cors from 'cors';

// Puxando os dois bancos de dados
import connectMongo from './db/mongo';
import { connectPostgres } from './db/postgre';

const app = express();

// Conecta aos bancos de dados
connectMongo();
connectPostgres();

//Middlware
app.use(cors());
app.use(json());

//Rotas
//Auth usa o PostgreSQL
app.use('/api/auth', require('./router/auth'));
//Task usa o modelo Taks do MongoDB
app.use('/api/tasks', require('./router/task'));

const PORT = process.env.PORT || 5000;

//app.listen(4000, () => {
//    console.log("Servidor rodando na porta 4000");
//});
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));