import { z } from 'zod';
declare const clienteSchema: z.ZodObject<{
    nome: z.ZodString;
    email: z.ZodString;
    telefone: z.ZodNumber;
}, z.core.$strip>;
export { clienteSchema };
