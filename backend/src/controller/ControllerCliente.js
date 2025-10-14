const db = require ('../configDB');

const createCliente = (nome,telefone,email, callback) => {
    const sql = `INSERT INTO CLIENTES (nome,telefone,email) VALUES (?,?,?)`;
    db.run(sql, [nome,telefone,email], function (err) {
        callback(err,{id: this.lastID});
    });
}
const readClientes = (callback) => {
    const sql = `SELECT * FROM CLIENTES`;
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
}

module.exports = {createCliente, readClientes};