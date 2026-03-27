import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

export async function openDb() {
    return open({
        filename: './database/database.db',
        driver: sqlite3.Database
    });
}

export async function createTable() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        description TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id)
        );
    `);
}