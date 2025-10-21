const db = require ('../configDB');

const createAgendamento = (cliente_id,barbeiro_id,servico_id,data_hora,status, callback) => {
    const sql = `INSERT INTO AGENDAMENTO (cliente_id,barbeiro_id,servico_id,data_hora,status) VALUES (?,?,?,?,?)`;
    db.run(sql, [cliente_id,barbeiro_id,servico_id,data_hora,status ], function (err) {
        callback(err,{id: this.lastID});
    });
}
const readAgendamentos = (callback) => {
    const sql = `SELECT * FROM AGENDAMENTO`;
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
}
const readAgendamentoById = (id, callback) => {
    const sql = `SELECT * FROM AGENDAMENTO WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
}
const deleteAgendamento = (id, callback) => {
    const sql = `DELETE FROM AGENDAMENTO WHERE id = ?`;
    db.run(sql, [id], function (err) {
        callback(err, { changes: this.changes });
    });
}
const updateAgendamento = (id,cliente_id,barbeiro_id,servico_id,data_hora,status, callback) => {
    const sql = `UPDATE AGENDAMENTO SET cliente_id = ?, barbeiro_id = ?, servico_id = ?, data_hora = ?, status = ? WHERE id = ?`;
    db.run(sql, [cliente_id,barbeiro_id,servico_id,data_hora,status,id], function (err) {
        callback(err, { changes: this.changes });
    });
}
module.exports = {createAgendamento, readAgendamentos, deleteAgendamento, updateAgendamento, readAgendamentoById};