import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import { createTable } from './database/database.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

//Inicializa o banco de dados
createTable();

//Middleware para processar JSON
app.use(bodyParser.json());

app.use(express.static(__dirname));

//Rotas da API
app.use('/users', userRoutes);

//Rota para API de tarefas
app.use('/tasks', (await import('./routes/task.js')).default);

//Rota raiz para verificar se a API está rodando
app.get('/', (req, res)=>{
    console.log('[GET ROUTE] enviando index.html');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server conectado: http://localhost:${PORT}`));