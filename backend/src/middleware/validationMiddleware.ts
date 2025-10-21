import { z, ZodError } from 'zod';


// Validation middleware
const validateSchema = (schema: z.ZodSchema<any>) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid data",
          details: error.issues,
        });
      }
      next(error); // If another error occurs, pass it along to the next error handler
    }
  };
};
export { validateSchema };

