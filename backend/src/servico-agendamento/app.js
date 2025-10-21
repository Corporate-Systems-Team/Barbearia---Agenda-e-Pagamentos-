const express = require('express');
const cors = require('cors');
const app = express();
const pino = require('pino-http')()
const agendamentoRouter = require('./servico-agendamento/routes/AgendamentoRoutes.js');

app.use(cors());
app.use(express.json());
app.use(pino);


app.use('/', agendamentoRouter);
app.listen(3004, () => {
    console.log('Server está rodando 3004')
})

module.exports = app;
