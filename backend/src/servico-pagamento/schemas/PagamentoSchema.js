const { z } = require('zod');

const metodoEnum = z.enum(['pix', 'cartao', 'dinheiro']);
const statusEnum = z.enum(['pendente', 'pago', 'cancelado', 'estornado']);

const pagamentoCreateSchema = z.object({
  agendamento_id: z.number().int().min(1),
  valor: z.number().positive(),
  metodo: metodoEnum,
  descricao: z.string().max(255).optional().nullable(),
  status: statusEnum.default('pendente'),
});

const pagamentoStatusSchema = z.object({
  status: statusEnum,
});

const pagamentoQuerySchema = z.object({
  agendamento_id: z.coerce.number().int().min(1).optional(),
  metodo: metodoEnum.optional(),
  status: statusEnum.optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

module.exports = {
  pagamentoCreateSchema,
  pagamentoStatusSchema,
  pagamentoQuerySchema,
  metodoEnum,
  statusEnum,
};
