const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); //Autenticação de JWT
const Task = require('../models/task'); // Modelo MongoDB

//Criando nova tarefa
router.post('/', auth, async (req, res) => {
    const userId = req.user.id;
    const {title} = req.body;

    try {
        const newTask = new Task({
            title,
            userId: userId.toString()
        });

        const taks = await newTask.save();
        res.status(201).json(task);
    } catch (err) {
        console.error('Erro ao criar tarefa: ', err.message);
        res.status(500).send('Erro no servidor.');
    }
});

router.get('/', auth, async(req, res) => {
    const userId = req.user.id;

    try {
        const tasks = await Task.find({ userId: userId.toString() }).sort({ createdAt: -1 });
        res.json(tasks);
    }catch (err) {
        console.error('Erro ao buscar a Tarefa: ', err.message);
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;