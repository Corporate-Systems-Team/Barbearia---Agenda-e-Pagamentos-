const db = require ('../configDB');

const createCliente = (nome,telefone,email,senha, callback) => {
    const sql = `INSERT INTO CLIENTES (nome,telefone,email,senha) VALUES (?,?,?,?)`;
    db.run(sql, [nome,telefone,email,senha ], function (err) {
        callback(err,{id: this.lastID});
    });
}
const readClientes = (callback) => {
    const sql = `SELECT * FROM CLIENTES`;
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
}
// função para retornar um cliente pelo id
const readClienteById = (id, callback) => {
    const sql = `SELECT * FROM CLIENTES WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
}
const deleteCliente = (id, callback) => {
    const sql = `DELETE FROM CLIENTES WHERE id = ?`;
    db.run(sql, [id], function (err) {
        callback(err, {changes: this.changes});
    });
}
const updateCliente = (id,nome,telefone,email,senha, callback) => {
    const sql = `UPDATE CLIENTES SET nome = ?, telefone = ?, email = ?, senha = ? WHERE id = ?`;
    db.run(sql, [nome,telefone,email,senha,id], function (err) {
        callback(err, {changes: this.changes});
    });
}

module.exports = {createCliente, readClientes, deleteCliente, updateCliente, readClienteById};