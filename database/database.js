// database/database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
    return open({
        filename: './database/database.db',
        driver: sqlite3.Database
    });
}

export async function createTable() {
    const db = await openDb();
    
    // Tabela de Usuários
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `);

    // Tabela de Tarefas
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            description TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    `);

    // Tabela de Logs de Auditoria
    await db.exec(`
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            action TEXT NOT NULL,
            target_id INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    `);
    
    console.log('Tabelas prontas para uso.');
}

// Função para salvar logs de forma reutilizável
export async function saveLog(userId, action, targetId = null) {
    try {
        const db = await openDb();
        await db.run(
            'INSERT INTO audit_logs (user_id, action, target_id) VALUES (?, ?, ?)',
            [userId, action, targetId]
        );
    } catch (error) {
        console.error('Erro ao salvar log de auditoria:', error);
    }
}