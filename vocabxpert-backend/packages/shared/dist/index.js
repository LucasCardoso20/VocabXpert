"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthResponseSchema = void 0;
const zod_1 = require("zod");
exports.HealthResponseSchema = zod_1.z.object({
    ok: zod_1.z.literal(true),
    service: zod_1.z.string(),
    time: zod_1.z.string()
});
