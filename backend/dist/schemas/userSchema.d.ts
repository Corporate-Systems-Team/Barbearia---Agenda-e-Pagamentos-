import { z } from 'zod';
declare const clienteSchema: z.ZodObject<{
    nome: z.ZodString;
    email: z.ZodString;
    senha: z.ZodString;
    telefone: z.ZodString;
}, z.core.$strip>;
export { clienteSchema };
