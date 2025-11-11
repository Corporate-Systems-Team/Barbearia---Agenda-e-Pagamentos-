
/**
 * @swagger
 * /clientes:
 *   post:
 *     tags:
 *       - Clientes
 *     summary: Criar um novo cliente
 *     description: Cria um novo cliente com os dados fornecidos no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *               telefone:
 *                 type: number
 *                 description: Telefone do cliente
 *               email:
 *                 type: string
 *                 description: E-mail do cliente
 *               senha:
 *                 type: string
 *                 description: Senha do cliente
 *             required:
 *               - nome
 *               - telefone
 *               - email
 *               - senha
 *     responses:
 *       200:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do cliente
 *                 nome:
 *                   type: string
 *                   description: Nome do cliente
 *                 telefone:
 *                   type: number
 *                   description: Telefone do cliente
 *                 email:
 *                   type: string
 *                   description: E-mail do cliente
 *                 senha:
 *                   type: string
 *                   description: Senha do cliente
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Listar todos os clientes
 *     description: Retorna todos os clientes cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do cliente
 *                   nome:
 *                     type: string
 *                     description: Nome do cliente
 *                   telefone:
 *                     type: number
 *                     description: Telefone do cliente
 *                   email:
 *                     type: string
 *                     description: E-mail do cliente
 *                   senha:
 *                     type: string
 *                     description: Senha do cliente
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Buscar um cliente por ID
 *     description: Retorna os dados de um cliente específico baseado no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente a ser buscado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do cliente
 *                 nome:
 *                   type: string
 *                   description: Nome do cliente
 *                 telefone:
 *                   type: number
 *                   description: Telefone do cliente
 *                 email:
 *                   type: string
 *                   description: E-mail do cliente
 *                 senha:
 *                   type: string
 *                   description: Senha do cliente
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     tags:
 *       - Clientes
 *     summary: Atualizar os dados de um cliente
 *     description: Atualiza as informações de um cliente específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *               telefone:
 *                 type: number
 *                 description: Telefone do cliente
 *               email:
 *                 type: string
 *                 description: E-mail do cliente
 *               senha:
 *                 type: string
 *                 description: Senha do cliente
 *             required:
 *               - nome
 *               - telefone
 *               - email
 *               - senha
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do cliente
 *                 nome:
 *                   type: string
 *                 telefone:
 *                   type: number
 *                 email:
 *                   type: string
 *                 senha:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     tags:
 *       - Clientes
 *     summary: Deletar um cliente
 *     description: Deleta um cliente existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cliente deletado com sucesso"
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */




const express = require('express');
const {createCliente, readClientes, updateCliente, deleteCliente, readClienteById} = require ('../Controller/ControllerCliente.js');
const router = express.Router();
const { validateSchema } = require('../../middleware/validationMiddleware.ts');
const {clienteSchema} = require('../../schemas/ClienteSchema.ts');
const logger = require('pino-http');

router.post('/clientes', validateSchema(clienteSchema), (req,res) =>{
    const {nome,telefone,email,senha} = req.body;
    createCliente(nome,telefone,email,senha, (err,clientes) =>{
        if(err){
            req.log.info('Erro 500');
            res.status(500).send(err.message);
        } else {
            req.log.info('Servindo post clientes');
            res.status(200).json(clientes);
        }
    })
}),
// Rota para listar todos os clientes
router.get('/clientes', (req, res) => {
    readClientes((err, clientes) => {
        if (err) {
            req.log.info('Erro 500');
            res.status(500).send(err.message);
        } else {
            req.log.info('Servindo get clientes');
            res.status(200).json(clientes);
        }
    });
});


router.put('/clientes/:id',validateSchema(clienteSchema), (req, res) => {
    const { id } = req.params;
    const { nome, telefone, email, senha } = req.body;
    updateCliente(id, nome, telefone, email, senha, (err, result) => {
        if (err) {
            req.log.info('Erro 500');
            res.status(500).send(err.message);
        } else {
            req.log.info('Servindo put clientes');
            res.status(200).json(result);
        }
    });
});
router.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    deleteCliente(id, (err, result) => {
        if (err) {
            req.log.info('Erro 500');
            res.status(500).send(err.message);
        } else {
            req.log.info('Servindo delete clientes');
            res.status(200).json(result);
        }
    });
});
router.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    readClienteById(id, (err, cliente) => {
        if (err) {
            req.log.info('Erro 500');
            res.status(500).send(err.message);
        } else if (!cliente) {
            req.log.info('Cliente não encontrado');
            res.status(404).send('Cliente não encontrado');
        } else {
            req.log.info('Servindo get cliente por id');
            res.status(200).json(cliente);
        }   
    });
});

module.exports = router;