const express = require('express');
const cors = require('cors');
const app = express();
const pino = require('pino-http')()
const servicoRouter = require('./servico-servico/routes/ServicoRoutes.js');

app.use(cors());
app.use(express.json());
app.use(pino);


app.use('/', servicoRouter);
app.listen(3003, () => {
    console.log('Server está rodando 3003')
})

module.exports = app;
