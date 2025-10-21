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

db.run(`PRAGMA foreign_keys = ON`);


})
module.exports = db;