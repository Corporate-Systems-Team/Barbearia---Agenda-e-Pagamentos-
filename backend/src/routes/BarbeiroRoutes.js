/**
 * @swagger
 * /barbeiros:
 *   post:
 *     tags:
 *       - Barbeiros
 *     summary: Criar um novo barbeiro
 *     description: Cria um novo barbeiro com os dados fornecidos no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do barbeiro
 *               especialidade:
 *                 type: string
 *                 description: Especialidade do barbeiro
 *             required:
 *               - nome
 *               - especialidade
 *     responses:
 *       201:
 *         description: Barbeiro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do barbeiro
 *                 nome:
 *                   type: string
 *                   description: Nome do barbeiro
 *                 especialidade:
 *                   type: string
 *                   description: Especialidade do barbeiro
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /barbeiros:
 *   get:
 *     tags:
 *       - Barbeiros
 *     summary: Listar todos os barbeiros
 *     description: Retorna todos os barbeiros cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Lista de barbeiros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do barbeiro
 *                   nome:
 *                     type: string
 *                     description: Nome do barbeiro
 *                   especialidade:
 *                     type: string
 *                     description: Especialidade do barbeiro
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /barbeiros/{id}:
 *   get:
 *     tags:
 *       - Barbeiros
 *     summary: Buscar um barbeiro por ID
 *     description: Retorna os dados de um barbeiro específico baseado no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do barbeiro a ser buscado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Barbeiro encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do barbeiro
 *                 nome:
 *                   type: string
 *                   description: Nome do barbeiro
 *                 especialidade:
 *                   type: string
 *                   description: Especialidade do barbeiro
 *       404:
 *         description: Barbeiro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /barbeiros/{id}:
 *   put:
 *     tags:
 *       - Barbeiros
 *     summary: Atualizar os dados de um barbeiro
 *     description: Atualiza as informações de um barbeiro específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do barbeiro a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do barbeiro
 *               especialidade:
 *                 type: string
 *                 description: Especialidade do barbeiro
 *             required:
 *               - nome
 *               - especialidade
 *     responses:
 *       200:
 *         description: Barbeiro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do barbeiro
 *                 nome:
 *                   type: string
 *                 especialidade:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Barbeiro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /barbeiros/{id}:
 *   delete:
 *     tags:
 *       - Barbeiros
 *     summary: Deletar um barbeiro
 *     description: Deleta um barbeiro existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do barbeiro a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Barbeiro deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Barbeiro deletado com sucesso"
 *       404:
 *         description: Barbeiro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */


const express = require('express');
const router = express.Router();
const { validateSchema } = require('../middleware/validationMiddleware.ts');
const {barbeiroSchema} = require('../schemas/BarbeiroSchema.ts');
const logger = require('pino-http');
const {createBarbeiro, readBarbeiros, deleteBarbeiro, updateBarbeiro, readBarbeiroById} = require ('../controller/ControllerBarbeiro');
// Rota para criar um novo barbeiro
router.post('/barbeiros', validateSchema(barbeiroSchema), (req,res) =>{
    const {nome,especialidade} = req.body;
    createBarbeiro(nome,especialidade, (err, barbeiro) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao criar barbeiro' });
        }
        res.status(201).json(barbeiro);
    });
});
// Rota para listar todos os barbeiros
router.get('/barbeiros', (req, res) => {
    readBarbeiros((err, barbeiros) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao buscar barbeiros' });
        }
        res.status(200).json(barbeiros);
    });
});
// Rota para atualizar um barbeiro existente
router.put('/barbeiros/:id', validateSchema(barbeiroSchema), (req, res) => {
    const { id } = req.params;
    const { nome, especialidade } = req.body;
    updateBarbeiro(id, nome, especialidade, (err, result) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar barbeiro' });
        }
        res.status(200).json(result);
    });
});
// Rota para deletar um barbeiro
router.delete('/barbeiros/:id', (req, res) => {
    const { id } = req.params;
    deleteBarbeiro(id, (err, result) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: 'Erro ao deletar barbeiro' });
        }
        res.status(200).json(result);
    }
);
});
module.exports = router;