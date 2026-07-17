import { z } from "zod";
export declare const UserIdHeaderSchema: z.ZodObject<{
    "x-user-id": z.ZodString;
}, "strip", z.ZodTypeAny, {
    "x-user-id": string;
}, {
    "x-user-id": string;
}>;
export type UserIdHeader = z.infer<typeof UserIdHeaderSchema>;
