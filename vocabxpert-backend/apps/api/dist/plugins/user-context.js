import fp from "fastify-plugin";
import { z } from "zod";
const UserIdSchema = z.string().min(1);
export default fp(async (app) => {
    app.addHook("preHandler", async (req, reply) => {
        // rotas sem userId
        if (req.url === "/health")
            return;
        if (req.method === "POST" && req.url === "/onboarding")
            return;
        const raw = req.headers["x-user-id"];
        const parsed = UserIdSchema.safeParse(raw);
        if (!parsed.success) {
            return reply.status(400).send({
                ok: false,
                error: "MISSING_USER_ID",
                message: "Envie o header x-user-id.",
            });
        }
        // normaliza (Fastify types)
        req.userId = parsed.data;
    });
});
