"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteSchema = void 0;
const zod_1 = require("zod");
const clienteSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, 'Nome é obrigatório'),
    email: zod_1.z.string().email('Email inválido'),
    senha: zod_1.z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    telefone: zod_1.z.string().min(5, 'Telefone inválido'),
});
exports.clienteSchema = clienteSchema;
//# sourceMappingURL=userSchema.js.map