const db = require ('../configDB');

const createBarbeiro = (nome,especialidade, callback) => {
    const sql = `INSERT INTO BARBEIRO (nome,especialidade) VALUES (?,?)`;
    db.run(sql, [nome,especialidade ], function (err) {
        callback(err,{id: this.lastID});
    }
    );
}
const readBarbeiros = (callback) => {
    const sql = `SELECT * FROM BARBEIRO`;
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
}
const readBarbeiroById = (id, callback) => {
    const sql = `SELECT * FROM BARBEIRO WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
}
const deleteBarbeiro = (id, callback) => {
    const sql = `DELETE FROM BARBEIRO WHERE id = ?`;
    db.run(sql, [id], function (err) {
        callback(err, { changes: this.changes });
    });
}
const updateBarbeiro = (id,nome,especialidade, callback) => {
    const sql = `UPDATE BARBEIRO SET nome = ?, especialidade = ? WHERE id = ?`;
    db.run(sql, [nome,especialidade,id], function (err) {
        callback(err, { changes: this.changes });
    });
}
module.exports = {createBarbeiro, readBarbeiros, deleteBarbeiro, updateBarbeiro, readBarbeiroById};