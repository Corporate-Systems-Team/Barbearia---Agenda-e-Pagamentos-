// src/schemas/userSchemas.ts
import { z } from 'zod';

const clienteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  telefone: z.number('Telefone deve ser um numero'),
});

export { clienteSchema };
