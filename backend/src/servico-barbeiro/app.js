const express = require('express');
const cors = require('cors');
const app = express();
const barbeiroRouter = require('./routes/BarbeiroRoutes.js');
const pino = require('pino-http')()


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
    apis: ['./routes/BarbeiroRoutes.js'], // Path to files containing the JSDoc comments (or directly in this file)
  };
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use(pino);


app.use('/', barbeiroRouter);
app.listen(3002, () => {
    console.log('Server está rodando 3002')
})

module.exports = app;
