import {z} from 'zod';

const agendamentoSchema = z.object({
    data_hora: z.string().min(1).max(100), // Formato: YYYY-MM-DD
    status: z.string().min(2).max(50)
});
export { agendamentoSchema };