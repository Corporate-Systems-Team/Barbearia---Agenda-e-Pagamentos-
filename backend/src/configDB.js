const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS CLIENTES(
        id INTEGER PRIMARY KEY,
        nome STRING,
        telefone STRING,
        email STRING
        )`);

db.run(`PRAGMA foreign_keys = ON`);

})
module.exports = db;