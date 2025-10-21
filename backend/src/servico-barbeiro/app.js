const express = require('express');
const cors = require('cors');
const app = express();
const barbeiroRouter = require('./servico-barbeiro/routes/BarbeiroRoutes.js');
const pino = require('pino-http')()

app.use(cors());
app.use(express.json());
app.use(pino);


app.use('/', barbeiroRouter);
app.listen(3002, () => {
    console.log('Server está rodando 3002')
})

module.exports = app;
