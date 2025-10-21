const express = require('express');
const cors = require('cors');
const app = express();
const clienteRouter = require('./routes/ClienteRoutes.js');
const barbeiroRouter = require('./routes/BarbeiroRoutes.js');
const servicoRouter = require('./routes/ServicoRoutes.js');
const AgendamentoRouter = require('./routes/AgendamentoRoutes.js');
const { z } = require('zod');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const pino = require('pino-http')()

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // You can specify OpenAPI version 3.0
    info: {
      title: 'API Barbearia',  // API title
      version: '1.0.0', // API version
      description: 'API para aplicação de agendamento de barbearia', // API description
    },
  },
  // Path to the API specifications (use your own file names or paths)
  apis: ['./src/routes/ClienteRoutes.js', './src/routes/BarbeiroRoutes.js', './src/routes/ServicoRoutes.js', './src/routes/AgendamentoRoutes.js'], // Path to files containing the JSDoc comments (or directly in this file)
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use(pino);


app.use('/', clienteRouter);
app.use('/', barbeiroRouter);
app.use('/', servicoRouter);
app.use('/', AgendamentoRouter);

app.listen(3001, () => {
    console.log('Server está rodando 3001')
})

module.exports = app;