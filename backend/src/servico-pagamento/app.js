const express = require('express');
const cors = require('cors');
const pino = require('pino-http')();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const pagamentoRouter = require('./routes/pagamento.routes.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(pino);

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Barbearia — Pagamentos',
      version: '1.0.0',
      description: 'Microserviço de pagamentos (agendamentos)',
    },
  },
  apis: ['./routes/pagamento.routes.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use('/', pagamentoRouter);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () =>
  console.log(`servico-pagamento rodando em http://localhost:${PORT} (Swagger: /api-docs)`),
);

module.exports = app;
