const db = require("../configDB");

const createCliente = (nome, telefone, email, callback) => {
  const sql = `INSERT INTO CLIENTES (nome,telefone,email) VALUES (?,?,?)`;
  db.run(sql, [nome, telefone, email], function (err) {
    callback(err, { id: this.lastID });
  });
};
const readClientes = (callback) => {
  const sql = `SELECT * FROM CLIENTES`;
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};
const deleteCliente = (id, callback) => {
  const sql = `DELETE FROM CLIENTES WHERE id = ?`;
  db.run(sql, [id], function (err) {
    callback(err, { changes: this.changes });
  });
};
const updateCliente = (id, nome, telefone, email, callback) => {
  const sql = `UPDATE CLIENTES SET nome = ?, telefone = ?, email = ? WHERE id = ?`;
  db.run(sql, [nome, telefone, email, id], function (err) {
    callback(err, { changes: this.changes });
  });
};

module.exports = { createCliente, readClientes, deleteCliente, updateCliente };
