import { z } from 'zod';
declare const servicoSchema: z.ZodObject<{
    descricao: z.ZodString;
    preco: z.ZodNumber;
}, z.core.$strip>;
export { servicoSchema };
