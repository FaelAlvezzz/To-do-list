const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Chamando o user
const User = require('../models/User');

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
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro do servidor');
    }
});

module.exports = router;