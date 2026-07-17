import { z } from "zod";
export declare const HealthResponseSchema: z.ZodObject<{
    ok: z.ZodLiteral<true>;
    service: z.ZodString;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ok: true;
    service: string;
    time: string;
}, {
    ok: true;
    service: string;
    time: string;
}>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
