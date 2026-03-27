import express from 'express';
import { openDb } from '../database/database.js';
import { verificarToken } from '../middleware/auth.js';
import { saveLog } from '../database/database.js';

const router = express.Router();

// 1. GET para lista apenas a tarefa do usuário
router.get('/', verificarToken, async (req, res) => {
    try {
        const db = await openDb();
        const tasks = await db.all('SELECT * FROM tasks WHERE user_id = ?', [req.userId]);
        
        console.log(`[LOG] Usuário ${req.userId} listou suas tarefas.`);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tarefas.' });
    }
});

// 2. PATCH para atualizar a tarefa
router.patch('/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    const { description, completed } = req.body;
    const db = await openDb();

    try {
        const task = await db.get('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, req.userId]);
        
        if (!task) { return res.status(404).json({ error: 'Tarefa não encontrada ou acesso negado.' });}

        const novaDesc = description !== undefined ? description : task.description;
        const novoStatus = completed !== undefined ? completed : task.completed;

        await db.run(
            'UPDATE tasks SET description = ?, completed = ? WHERE id = ? AND user_id = ?',
            [novaDesc, novoStatus, id, req.userId]
        );

        console.log(`[LOG] Usuário ${req.userId} atualizou a tarefa ${id}.`);
        res.json({ message: 'Tarefa atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
    }
});

// 3. DELETE para remover a tarefa
router.delete('/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    const db = await openDb();

    try {
        const result = await db.run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, req.userId]);

        if (result.changes > 0) {
            // REGISTRO DO LOG: Quem deletou
            await saveLog(req.userId, 'DELETE_TASK', id);
            
            res.json({ message: 'Tarefa removida e log registrado!' });
        } else {
            res.status(404).json({ error: 'Tarefa não encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor.' });
    }
});

export default router;