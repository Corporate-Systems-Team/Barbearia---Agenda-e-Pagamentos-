const express = require('express');
const {createCliente, readClientes, updateCliente, deleteCliente} = require ('../controller/ControllerCliente.js');
const router = express.Router();

router.post('/clientes', (req,res) =>{
    const {nome,telefone,email} = req.body;
    createCliente(nome,telefone,email, (err,clientes) =>{
        if(err){
            res.status(500).send(err.message);
        } else {
            res.status(200).json(clientes);
        }
    })
}),
// Rota para listar todos os clientes
router.get('/clientes', (req, res) => {
    readClientes((err, clientes) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(clientes);
        }
    });
});


router.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;
    updateCliente(id, nome, telefone, email, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result);
        }
    });
});
router.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    deleteCliente(id, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;