const express = require('express');
const cors = require('cors');
const app = express();
const pino = require('pino-http')()
const clienteRouter = require('./Routes/ClienteRoutes.js');

app.use(cors());
app.use(express.json());
app.use(pino);


app.use('/', clienteRouter);
app.listen(3001, () => {
    console.log('Server está rodando 3001')
})

module.exports = app;
