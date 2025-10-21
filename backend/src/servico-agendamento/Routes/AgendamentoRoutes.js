/**
 * @swagger
 * tags:
 *   name: Agendamento
 *   description: Rotas para gerenciamento de agendamentos
 */

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     tags:
 *       - Agendamento
 *     summary: Criar um novo agendamento
 *     description: Cria um novo agendamento com os dados fornecidos no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente_id:
 *                 type: integer
 *                 description: ID do cliente
 *               barbeiro_id:
 *                 type: integer
 *                 description: ID do barbeiro
 *               servico_id:
 *                 type: integer
 *                 description: ID do serviço
 *               data_hora:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora do agendamento
 *               status:
 *                 type: string
 *                 description: Status do agendamento
 *             required:
 *               - cliente_id
 *               - barbeiro_id
 *               - servico_id
 *               - data_hora
 *               - status
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do agendamento
 *                 cliente_id:
 *                   type: integer
 *                 barbeiro_id:
 *                   type: integer
 *                 servico_id:
 *                   type: integer
 *                 data_hora:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 *
 *   get:
 *     tags:
 *       - Agendamento
 *     summary: Listar todos os agendamentos
 *     description: Retorna todos os agendamentos cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do agendamento
 *                   cliente_id:
 *                     type: integer
 *                   barbeiro_id:
 *                     type: integer
 *                   servico_id:
 *                     type: integer
 *                   data_hora:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /agendamentos/{id}:
 *   get:
 *     tags:
 *       - Agendamento
 *     summary: Buscar um agendamento por ID
 *     description: Retorna os dados de um agendamento específico baseado no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agendamento a ser buscado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Agendamento encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cliente_id:
 *                   type: integer
 *                 barbeiro_id:
 *                   type: integer
 *                 servico_id:
 *                   type: integer
 *                 data_hora:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     tags:
 *       - Agendamento
 *     summary: Atualizar um agendamento existente
 *     description: Atualiza as informações de um agendamento específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agendamento a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente_id:
 *                 type: integer
 *               barbeiro_id:
 *                 type: integer
 *               servico_id:
 *                 type: integer
 *               data_hora:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *             required:
 *               - cliente_id
 *               - barbeiro_id
 *               - servico_id
 *               - data_hora
 *               - status
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Agendamento atualizado com sucesso
 *       500:
 *         description: Erro interno do servidor
 *
 *   delete:
 *     tags:
 *       - Agendamento
 *     summary: Deletar um agendamento
 *     description: Deleta um agendamento existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agendamento a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Agendamento deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Agendamento deletado com sucesso
 *       500:S
 *         description: Erro interno do servidor
 */


const express = require('express');
const router = express.Router();
const { createAgendamento, readAgendamentos, readAgendamentoById, updateAgendamento, deleteAgendamento } = require('../Controller/ControllerAgendamento.js');
const { validateSchema } = require('../../middleware/validationMiddleware.ts');
const { agendamentoSchema } = require('../../schemas/AgendamentoSchema.ts');
const logger = require('pino-http');
// Rota para criar um novo agendamento
router.post('/agendamentos', validateSchema(agendamentoSchema), (req, res) => {
    const { cliente_id, barbeiro_id, servico_id, data_hora, status } = req.body;
    createAgendamento(cliente_id, barbeiro_id, servico_id, data_hora, status, (err, agendamento) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao criar agendamento' });
        }
        res.status(201).json(agendamento);
    });
});
// Rota para listar todos os agendamentos
router.get('/agendamentos', (req, res) => {
    readAgendamentos((err, agendamentos) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
        }
        res.status(200).json(agendamentos);
    });
});
// Rota para obter um agendamento por ID
router.get('/agendamentos/:id', (req, res) => {
    const { id } = req.params;
    readAgendamentoById(id, (err, agendamento) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao buscar agendamento' });
        }
        res.status(200).json(agendamento);
    });
});
// Rota para atualizar um agendamento existente
router.put('/agendamentos/:id', validateSchema(agendamentoSchema), (req, res) => {
    const { id } = req.params;
    const { cliente_id, barbeiro_id, servico_id, data_hora, status } = req.body;
    updateAgendamento(id, cliente_id, barbeiro_id, servico_id, data_hora, status, (err, result) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar agendamento' });
        }
        res.status(200).json({ message: 'Agendamento atualizado com sucesso' });
    });
});
// Rota para deletar um agendamento
router.delete('/agendamentos/:id', (req, res) => {
    const { id } = req.params;
    deleteAgendamento(id, (err, result) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao deletar agendamento' });
        }
        res.status(200).json({ message: 'Agendamento deletado com sucesso' });
    });
});
module.exports = router;