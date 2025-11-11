import { z } from 'zod';
declare const agendamentoSchema: z.ZodObject<{
    data_hora: z.ZodString;
    status: z.ZodString;
}, z.core.$strip>;
export { agendamentoSchema };
