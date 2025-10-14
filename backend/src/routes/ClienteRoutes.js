const express = require('express');
const {createCliente, readClientes} = require ('../controller/ControllerCliente.js');
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

module.exports = router;