"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteSchema = void 0;
const zod_1 = require("zod");
const clienteSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, 'Nome é obrigatório'),
    email: zod_1.z.string().email('Email inválido'),
    telefone: zod_1.z.number('Telefone deve ser um numero'),
});
exports.clienteSchema = clienteSchema;
//# sourceMappingURL=clienteSchema.js.map