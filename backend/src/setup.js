// backend/src/setup.js
const sqlite3 = require("sqlite3");

// 1. Conecta ao banco no local CORRETO ('../database.db')
// que é o mesmo caminho do seu controller.
const db = new sqlite3.Database("../database.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco:", err.message);
  }
  console.log("Conectado ao banco de dados database.db.");
});

// 2. O SQL para criar a tabela
// (id, email, password, nome)
const sql_create_table = `
CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nome TEXT
);`;

// 3. Inicia o processo de criação da tabela
db.serialize(() => {
  db.run(sql_create_table, (err) => {
    if (err) {
      console.error("Erro ao criar a tabela:", err.message);
    }
    console.log('Tabela "User" criada com sucesso (ou já existia).');
  });
});

// 4. Fecha a conexão com o banco
db.close((err) => {
  if (err) {
    console.error("Erro ao fechar o banco:", err.message);
  }
  console.log("Conexão com o banco fechada.");
});
