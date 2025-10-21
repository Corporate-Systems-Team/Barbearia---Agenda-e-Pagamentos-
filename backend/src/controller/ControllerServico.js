const db = require ('../configDB');
//servico agora, faça no mesmo modelo que o controller barbeiro
const createServico = (descricao,preco, callback) => {
    const sql = `INSERT INTO SERVICO (descricao,preco) VALUES (?,?)`;
    db.run(sql, [descricao,preco ], function (err) {
        callback(err,{id: this.lastID});
    });
}
const readServicos = (callback) => {
    const sql = `SELECT * FROM SERVICO`;
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
}
const readServicoById = (id, callback) => {
    const sql = `SELECT * FROM SERVICO WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
}
const deleteServico = (id, callback) => {
    const sql = `DELETE FROM SERVICO WHERE id = ?`;
    db.run(sql, [id], function (err) {
        callback(err, { changes: this.changes });
    });
}
const updateServico = (id,descricao,preco, callback) => {
    const sql = `UPDATE SERVICO SET descricao = ?, preco = ? WHERE id = ?`;
    db.run(sql, [descricao,preco,id], function (err) {
        callback(err, { changes: this.changes });
    });
}
module.exports = {createServico, readServicos, deleteServico, updateServico, readServicoById};
