const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Chamando o user do PostgreSQL
const User = require('../models/User');

// Rota de Registro
// @route   POST /api/auth/register
// @desc    Registra um novo usuário no PostgreSQL
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ msg: 'Usuário já existe' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await user.create({
            name,
            email,
            password: hashedPassword // Salva o hash da senha
        })

        // CRIAÇÃO DO TOKEN
        const playload = {
            user: {
                id: user.id //ID do POSTGRES
            }
        };

        jwt.sing(
            playload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // O token expira em 1h
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Retornando o TOKEN para o cliente
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro do servidor');
    }
});

// Rota de Login
// @route   POST /api/auth/login
// @desc    Autentica usuário e retorna token JWT
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!await User.findOne({ where: { email } })) return res.status(400).json({ msg: 'Login inválido!' });

        // Comparando a senha enviada com a cryptografada
        const isMatch = await bcrypt.compare(password, (await User.findOne({ where: { email } })).password);
        if (!isMatch) return res.status(400).json({ msg: 'Senha inválida!' });

        // Se a senha bater crie um id
        const playload = {
            user: {
                id: user.id
            }
        };

        // Assina o TOKEN
        jwt.sing(
            playload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json ({ token });
            }
        );
    }catch (err) {
        console.err(err.message);
        res.status(500).send('Erro no servidor!');
    }
});
module.exports = router;