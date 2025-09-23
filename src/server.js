// src/server.js
require('dotenv').config(); 
const express = require('express');
const app = express();

app.use(express.json());

// Logs de inicialização
console.log('=== INICIANDO SERVIDOR BARBEARIA ===');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
const PORT = process.env.PORT || 3000;
console.log(`PORTA CONFIGURADA: ${PORT}`);

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor rodando', env: process.env.NODE_ENV });
});

// Rota teste
app.get('/', (req, res) => {
  res.json({ message: 'Servidor da Barbearia rodando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
