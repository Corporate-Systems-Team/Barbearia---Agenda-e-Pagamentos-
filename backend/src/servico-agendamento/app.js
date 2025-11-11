const express = require('express');
const cors = require('cors');
const app = express();
const pino = require('pino-http')()
const agendamentoRouter = require('./routes/AgendamentoRoutes.js');

app.use(cors());
app.use(express.json());
app.use(pino);

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
    apis: ['./Routes/AgendamentoRoutes.js'], // Path to files containing the JSDoc comments (or directly in this file)
  };
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', agendamentoRouter);
app.listen(3004, () => {
    console.log('Server está rodando 3004')
})

module.exports = app;
