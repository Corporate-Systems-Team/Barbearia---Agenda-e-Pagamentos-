"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    error: "Invalid data",
                    details: error.issues,
                });
            }
            next(error);
        }
    };
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validationMiddleware.js.map