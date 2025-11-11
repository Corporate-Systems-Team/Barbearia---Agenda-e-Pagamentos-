import { z } from 'zod';

const servicoSchema = z.object({
    descricao: z.string().min(2).max(100),
    preco: z.number().min(0)
});
export { servicoSchema };