/**
 * @swagger
 * tags:
 *   - name: Servico
 *     description: Rotas relacionadas aos serviços
 */

/**
 * @swagger
 * /servicos:
 *   post:
 *     tags:
 *       - Servico
 *     summary: Criar um novo serviço
 *     description: Cria um novo serviço com os dados fornecidos no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *                 description: Descrição do serviço
 *               preco:
 *                 type: number
 *                 format: float
 *                 description: Preço do serviço
 *             required:
 *               - descricao
 *               - preco
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do serviço
 *                 descricao:
 *                   type: string
 *                   description: Descrição do serviço
 *                 preco:
 *                   type: number
 *                   format: float
 *                   description: Preço do serviço
 *       500:
 *         description: Erro ao criar serviço
 */

/**
 * @swagger
 * /servicos:
 *   get:
 *     tags:
 *       - Servico
 *     summary: Listar todos os serviços
 *     description: Retorna todos os serviços cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Lista de serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do serviço
 *                   descricao:
 *                     type: string
 *                     description: Descrição do serviço
 *                   preco:
 *                     type: number
 *                     format: float
 *                     description: Preço do serviço
 *       500:
 *         description: Erro ao listar serviços
 */

/**
 * @swagger
 * /servicos/{id}:
 *   put:
 *     tags:
 *       - Servico
 *     summary: Atualizar um serviço existente
 *     description: Atualiza as informações de um serviço específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *                 description: Descrição do serviço
 *               preco:
 *                 type: number
 *                 format: float
 *                 description: Preço do serviço
 *             required:
 *               - descricao
 *               - preco
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do serviço
 *                 descricao:
 *                   type: string
 *                 preco:
 *                   type: number
 *                   format: float
 *       500:
 *         description: Erro ao atualizar serviço
 */

/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     tags:
 *       - Servico
 *     summary: Deletar um serviço
 *     description: Deleta um serviço existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Serviço deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serviço deletado com sucesso
 *       500:
 *         description: Erro ao deletar serviço
 */

const express = require('express');
// ROTA PARA SERVICO NAO BARBEIRO
const router = express.Router();
const { validateSchema } = require('../../middleware/validationMiddleware.ts');
const {servicoSchema} = require('../../schemas/servicoSchema.ts');
const {createServico, readServicos, deleteServico, updateServico, readServicoById} = require('../controller/ControllerServico.js');
const logger = require('pino-http');
// Rota para criar um novo servico
router.post('/servicos', validateSchema(servicoSchema), (req,res) =>{
    const {descricao,preco} = req.body;
    createServico(descricao,preco, (err, servico) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao criar servico' });
        }
        res.status(201).json(servico);
    });
});
// Rota para listar todos os servicos
router.get('/servicos', (req, res) => {
    readServicos((err, servicos) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao listar servicos' });
        }
        res.status(200).json(servicos);
    });
});
// Rota para atualizar um servico existente
router.put('/servicos/:id', validateSchema(servicoSchema), (req, res) => {
    const { id } = req.params;
    const { descricao, preco } = req.body;
    updateServico(id, descricao, preco, (err, result) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar servico' });
        }
        res.status(200).json(result);
    });
});

// Rota para deletar um servico
router.delete('/servicos/:id', (req, res) => {
    const { id } = req.params;
    deleteServico(id, (err, result) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao deletar servico' });
        }
        res.status(200).json(result);
    });
});

module.exports = router;
