import { z } from 'zod';
declare const barbeiroSchema: z.ZodObject<{
    nome: z.ZodString;
    especialidade: z.ZodString;
}, z.core.$strip>;
export { barbeiroSchema };
