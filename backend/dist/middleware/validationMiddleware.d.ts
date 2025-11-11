import { z } from 'zod';
declare const validateSchema: (schema: z.ZodSchema<any>) => (req: any, res: any, next: any) => any;
export { validateSchema };
