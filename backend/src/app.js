const express = require('express');
const cors = require('cors');
const app = express();
const clienteRouter = require('./routes/ClienteRoutes.js');

app.use(cors());
app.use(express.json());

app.use('/', clienteRouter);

app.listen(3001, () => {
    console.log('Server está rodando 3001')
})

module.exports = app;