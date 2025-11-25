/**
 * @swagger
 * tags:
 *   name: Pagamento
 *   description: Rotas para gerenciamento de pagamentos
 */

const express = require('express');
const router = express.Router();

const {
  createPagamento,
  readPagamentos,
  readPagamentoById,
  updatePagamentoStatus,
  deletePagamento,
} = require('../controller/ControllerPagamento.js');

const { validateSchema } = require('../middleware/validationMiddleware.js');
const {
  pagamentoCreateSchema,
  pagamentoStatusSchema,
  pagamentoQuerySchema,
} = require('../schemas/PagamentoSchema.js');

/**
 * @swagger
 * /pagamentos:
 *   post:
 *     tags: [Pagamento]
 *     summary: Criar um pagamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/PagamentoCreate' }
 *     responses:
 *       201: { description: Criado }
 *       400: { description: Requisição inválida }
 *   get:
 *     tags: [Pagamento]
 *     summary: Listar pagamentos (com filtros e paginação)
 *     parameters:
 *       - in: query
 *         name: agendamento_id
 *         schema: { type: integer }
 *       - in: query
 *         name: metodo
 *         schema: { type: string, enum: [pix, cartao, dinheiro] }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [pendente, pago, cancelado, estornado] }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
router.post('/pagamentos', validateSchema(pagamentoCreateSchema), (req, res) => {
  const { agendamento_id, valor, metodo, status, descricao } = req.body;
  createPagamento(agendamento_id, valor, metodo, status, descricao, (err, pagamento) => {
    if (err) return res.status(500).json({ error: 'Erro ao criar pagamento' });
    res.status(201).json(pagamento);
  });
});

router.get('/pagamentos', validateSchema(pagamentoQuerySchema, 'query'), (req, res) => {
  readPagamentos(req.query, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao listar pagamentos' });
    res.status(200).json(result);
  });
});

/**
 * @swagger
 * /pagamentos/{id}:
 *   get:
 *     tags: [Pagamento]
 *     summary: Obter pagamento por ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Não encontrado }
 *   delete:
 *     tags: [Pagamento]
 *     summary: Deletar pagamento
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deletado }
 */
router.get('/pagamentos/:id', (req, res) => {
  readPagamentoById(req.params.id, (err, pagamento) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar pagamento' });
    if (!pagamento) return res.status(404).json({ error: 'Pagamento não encontrado' });
    res.status(200).json(pagamento);
  });
});

router.delete('/pagamentos/:id', (req, res) => {
  deletePagamento(req.params.id, (err, r) => {
    if (err) return res.status(500).json({ error: 'Erro ao deletar pagamento' });
    res.status(200).json({ message: 'Pagamento deletado com sucesso', ...r });
  });
});

/**
 * @swagger
 * /pagamentos/{id}/status:
 *   patch:
 *     tags: [Pagamento]
 *     summary: Atualizar status do pagamento
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/PagamentoStatus' }
 *     responses:
 *       200: { description: Atualizado }
 *       400: { description: Transição de status inválida }
 *       404: { description: Não encontrado }
 */
router.patch('/pagamentos/:id/status', validateSchema(pagamentoStatusSchema), (req, res) => {
  updatePagamentoStatus(req.params.id, req.body.status, (err, atualizado) => {
    if (err) return res.status(err.statusCode || 500).json({ error: err.message || 'Erro ao atualizar status' });
    if (!atualizado) return res.status(404).json({ error: 'Pagamento não encontrado' });
    res.status(200).json(atualizado);
  });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     PagamentoCreate:
 *       type: object
 *       required: [agendamento_id, valor, metodo]
 *       properties:
 *         agendamento_id: { type: integer }
 *         valor: { type: number }
 *         metodo: { type: string, enum: [pix, cartao, dinheiro] }
 *         status: { type: string, enum: [pendente, pago, cancelado, estornado], default: pendente }
 *         descricao: { type: string }
 *     PagamentoStatus:
 *       type: object
 *       required: [status]
 *       properties:
 *         status: { type: string, enum: [pendente, pago, cancelado, estornado] }
 */

module.exports = router;
