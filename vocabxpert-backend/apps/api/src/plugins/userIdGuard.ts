import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";

const publicRoutes = new Set([
  "GET /",
  "GET /health",
  "GET /debug/db",
  "POST /onboarding",
  "GET /favicon.ico",
]);

export const userIdGuardPlugin: FastifyPluginAsync = fp(async (app) => {
  app.addHook("preHandler", async (req, reply) => {
    const key = `${req.method} ${req.routeOptions.url}`;
    if (publicRoutes.has(key)) return;

    const header = req.headers["x-user-id"];
    const userId = typeof header === "string" ? header : undefined;

    if (!userId) {
      return reply.status(400).send({
        ok: false,
        error: "MISSING_USER_ID",
        message: "Envie o header x-user-id.",
      });
    }

    req.userId = userId;
  });
});