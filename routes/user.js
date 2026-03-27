import express from 'express';
import { openDb } from '../database/database.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { SignJWT } from 'jose';

dotenv.config();

const router = express.Router();
const saltRounds = 10;
const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);

//O getter da lista no banco de dados
router.get('/', async (req, res) => {
    const db = await openDb();
    const users = await db.all('SELECT * FROM users');
    res.json(users);
});

//POST criando usuário com hash de senha
router.post('/', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const db = await openDb();
    const alg = 'HS256';

    try {
        const hashedPassword =  await bcrypt.hash(password, saltRounds);

        await db.run(
            'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
            [first_name, last_name, email, hashedPassword]
        )
        res.status(201).json({ message: 'Usuário adicionado com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).json({ error: 'Erro ao adicionar usuário ao banco de dados.' });

    }

    //Gerando token com Jose
    const token = await new SignJWT({ id: user.id, email: user.email })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(SECRET_KEY);

    res.json({ 
        message: 'Usuário adicionado com sucesso!',
        token: token,
        user: { id: user.id, first_name: user.first_name }
    });
});

//GET para buscar por ID do usuário
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const db = await openDb();
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    
    if(user) {
        res.json(user);
    }else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

//PATCH para atualizar dados do usuário
router.patch('/:id', async (req, res) => {
    const {id} = req.params;
    const {first_name, last_name, email, password} = req.body;
    const db = await openDb();

    const userAtual = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if(!userAtual){return res.status(404).json({ error: 'Usuário não encontrado' });}

    const novoNome = first_name || userAtual.first_name;
    const novoSobrenome = last_name || userAtual.last_name;
    const novoEmail = email || userAtual.email;
    const novaPassword = password ? await bcrypt.hash(password, saltRounds) : userAtual.password;


    await db.run(
        'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?',
        [novoNome, novoSobrenome, novoEmail, novaPassword, id]
    );

    res.json({ message: `Usuário com o ${id} foi atualizado com sucesso!` });
});

//DELETE para deletar um usuário
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await openDb();
    await db.run('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: `Usuário com ID ${id} deletado com sucesso do banco de dados!` });
});

//POST para login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.get(query, [email, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao acessar o banco de dados.' });
        }
        if (row) {
            res.status(200).json({ message: 'Login bem-sucedido!', user: row });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas.' });
        }
    });
});



export default router;