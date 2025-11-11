import { z } from 'zod';

const barbeiroSchema = z.object({
    nome: z.string().min(2).max(100),
    especialidade: z.string().min(2).max(100)
});

export { barbeiroSchema };