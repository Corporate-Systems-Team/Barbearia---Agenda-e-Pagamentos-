const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("../database.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco:", err.message);
  }
  console.log("Conectado ao banco de dados database.db.");
});

const sql_create_table = `
CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nome TEXT
);`;

db.serialize(() => {
  db.run(sql_create_table, (err) => {
    if (err) {
      console.error("Erro ao criar a tabela:", err.message);
    }
    console.log('Tabela "User" criada com sucesso (ou já existia).');
  });
});

db.close((err) => {
  if (err) {
    console.error("Erro ao fechar o banco:", err.message);
  }
  console.log("Conexão com o banco fechada.");
});
