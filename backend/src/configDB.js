const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS CLIENTES(
        id INTEGER PRIMARY KEY,
        nome STRING NOT NULL,
        telefone INT NOT NULL,
        email STRING NOT NULL UNIQUE COLLATE NOCASE,
        senha STRING NOT NULL
        )`);


    db.run(`CREATE TABLE IF NOT EXISTS BARBEIRO(
        id INTEGER PRIMARY KEY,
        nome STRING NOT NULL,
        especialidade STRING NOT NULL
        )`);
    db.run(`CREATE TABLE IF NOT EXISTS SERVICO(
        id INTEGER PRIMARY KEY,
        descricao STRING NOT NULL,
        preco REAL NOT NULL
        )`);
    db.run(`CREATE TABLE IF NOT EXISTS AGENDAMENTO(
        id INTEGER PRIMARY KEY,
        cliente_id INTEGER NOT NULL,
        barbeiro_id INTEGER NOT NULL,
        servico_id INTEGER NOT NULL,
        data_hora TEXT NOT NULL,
        status STRING NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES CLIENTES(id) ON DELETE CASCADE,
        FOREIGN KEY (barbeiro_id) REFERENCES BARBEIRO(id) ON DELETE CASCADE,
        FOREIGN KEY (servico_id) REFERENCES SERVICO(id) ON DELETE CASCADE
        )`);

db.run(`PRAGMA foreign_keys = ON`);


})
module.exports = db;