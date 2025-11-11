"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicoSchema = void 0;
const zod_1 = require("zod");
const servicoSchema = zod_1.z.object({
    descricao: zod_1.z.string().min(2).max(100),
    preco: zod_1.z.number().min(0)
});
exports.servicoSchema = servicoSchema;
//# sourceMappingURL=servicoSchema.js.map