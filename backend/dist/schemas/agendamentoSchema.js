"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agendamentoSchema = void 0;
const zod_1 = require("zod");
const agendamentoSchema = zod_1.z.object({
    data_hora: zod_1.z.string().min(1).max(100),
    status: zod_1.z.string().min(2).max(50)
});
exports.agendamentoSchema = agendamentoSchema;
//# sourceMappingURL=agendamentoSchema.js.map