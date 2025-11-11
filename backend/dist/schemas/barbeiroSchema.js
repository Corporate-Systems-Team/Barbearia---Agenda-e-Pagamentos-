"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barbeiroSchema = void 0;
const zod_1 = require("zod");
const barbeiroSchema = zod_1.z.object({
    nome: zod_1.z.string().min(2).max(100),
    especialidade: zod_1.z.string().min(2).max(100)
});
exports.barbeiroSchema = barbeiroSchema;
//# sourceMappingURL=barbeiroSchema.js.map