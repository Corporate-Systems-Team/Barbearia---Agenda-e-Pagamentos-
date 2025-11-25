const { ZodError } = require('zod');

const validateSchema = (schema, source = 'body') => (req, res, next) => {
  try {
    const data = schema.parse(req[source]);
    req[source] = data;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: 'ValidationError',
        issues: err.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
      });
    }
    return res.status(500).json({ error: 'InternalError' });
  }
};

module.exports = { validateSchema };
