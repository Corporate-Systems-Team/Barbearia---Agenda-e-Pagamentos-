const db = require('../configDB');

const nowIso = () => new Date().toISOString();

// CREATE
const createPagamento = (agendamento_id, valor, metodo, status, descricao, cb) => {
  const sql =
    `INSERT INTO PAGAMENTO (agendamento_id, valor, metodo, status, descricao, criado_em, atualizado_em)
     VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const ts = nowIso();
  db.run(sql, [agendamento_id, valor, metodo, status, descricao || null, ts, ts], function (err) {
    if (err) return cb(err);
    cb(null, {
      id: this.lastID,
      agendamento_id,
      valor,
      metodo,
      status,
      descricao: descricao || null,
      criado_em: ts,
      atualizado_em: ts,
    });
  });
};

// LIST + filtros simples
const readPagamentos = (filters, cb) => {
  const where = [];
  const params = [];
  if (filters.agendamento_id) { where.push('agendamento_id = ?'); params.push(filters.agendamento_id); }
  if (filters.metodo) { where.push('metodo = ?'); params.push(filters.metodo); }
  if (filters.status) { where.push('status = ?'); params.push(filters.status); }

  const page = Number(filters.page || 1);
  const limit = Math.min(Number(filters.limit || 10), 100);
  const offset = (page - 1) * limit;

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const sql = `SELECT * FROM PAGAMENTO ${whereSql} ORDER BY criado_em DESC LIMIT ? OFFSET ?`;
  db.all(sql, [...params, limit, offset], (err, rows) => {
    if (err) return cb(err);
    // total
    db.get(`SELECT COUNT(*) AS total FROM PAGAMENTO ${whereSql}`, params, (err2, countRow) => {
      if (err2) return cb(err2);
      cb(null, { total: countRow.total, items: rows });
    });
  });
};

// GET by id
const readPagamentoById = (id, cb) => {
  db.get(`SELECT * FROM PAGAMENTO WHERE id = ?`, [id], (err, row) => cb(err, row));
};

// PATCH status com regras de transição
const updatePagamentoStatus = (id, novoStatus, cb) => {
  db.get(`SELECT * FROM PAGAMENTO WHERE id = ?`, [id], (err, atual) => {
    if (err) return cb(err);
    if (!atual) return cb(null, null);

    const permitido =
      (atual.status === 'pendente' && (novoStatus === 'pago' || novoStatus === 'cancelado')) ||
      (atual.status === 'pago' && (novoStatus === 'estornado' || novoStatus === 'pago')) ||
      (novoStatus === atual.status);

    if (!permitido) {
      const e = new Error(`Transição de '${atual.status}' para '${novoStatus}' não permitida`);
      e.statusCode = 400;
      return cb(e);
    }

    const ts = nowIso();
    db.run(
      `UPDATE PAGAMENTO SET status = ?, atualizado_em = ? WHERE id = ?`,
      [novoStatus, ts, id],
      function (err2) {
        if (err2) return cb(err2);
        cb(null, { ...atual, status: novoStatus, atualizado_em: ts });
      },
    );
  });
};

// DELETE (opcional)
const deletePagamento = (id, cb) => {
  db.run(`DELETE FROM PAGAMENTO WHERE id = ?`, [id], function (err) {
    if (err) return cb(err);
    cb(null, { changes: this.changes });
  });
};

module.exports = {
  createPagamento,
  readPagamentos,
  readPagamentoById,
  updatePagamentoStatus,
  deletePagamento,
};
