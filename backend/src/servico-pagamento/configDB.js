const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS PAGAMENTO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agendamento_id INTEGER NOT NULL,
    valor REAL NOT NULL,
    metodo TEXT NOT NULL CHECK (metodo IN ('pix','cartao','dinheiro')),
    status TEXT NOT NULL CHECK (status IN ('pendente','pago','cancelado','estornado')),
    descricao TEXT,
    criado_em TEXT NOT NULL,
    atualizado_em TEXT NOT NULL
  )`);
});

module.exports = db;
