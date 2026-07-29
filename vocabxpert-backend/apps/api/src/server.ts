import dotenv from "dotenv";
import { resolve } from "node:path";
import cors from '@fastify/cors';
dotenv.config({ path: resolve(process.cwd(), "../../.env") });

import Fastify from "fastify";
import { prisma } from "@vocabxpert/db";
import "dotenv/config";
import { HealthResponseSchema } from "@vocabxpert/shared";
import userContext from "./plugins/user-context.js";

//Routes
import { onboardingRoutes } from "./routes/onboarding.js";
import { listsRoutes } from "./routes/lists.js";
import { vocabsRoutes } from "./routes/vocabs.js";
import { studyRoutes } from "./routes/study.js";
import formbody from "@fastify/formbody";
import { userIdGuardPlugin } from "./plugins/userIdGuard.js";
import { reviewsRoutes } from "./routes/reviews.js";
import { tooltipRoutes } from "./routes/tooltip.js";

const app = Fastify({
  logger: true
});

await app.register(cors, {
  origin: [
    'http://localhost:8081',
    'http://127.0.0.1:8081',
  ],

  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

  allowedHeaders: [
    'Content-Type',
    'x-user-id',
  ],
});

function getErrCode(err: unknown): string | undefined {
  return typeof err === "object" && err !== null ? (err as any).code : undefined;
}

app.setErrorHandler((err, req, reply) => {
  const code = getErrCode(err);

  // Unique constraint (Prisma)
  if (code === "P2002") {
    return reply.status(409).send({
      ok: false,
      error: "VOCAB_ALREADY_EXISTS",
      code: "P2002",
    });
  }

  req.log.error({ err }, "UNHANDLED_ERROR");
  return reply.status(500).send({
    ok: false,
    error: "INTERNAL_SERVER_ERROR",
  });
});

app.register(formbody);

app.get("/health", async () => {
  const payload = {
    ok: true as const,
    service: "vocabxpert-api",
    time: new Date().toISOString()
  };

  // garante que estamos entregando o formato combinado
  HealthResponseSchema.parse(payload);
  return payload;
});

if (process.env.NODE_ENV !== "production") {
  app.get("/debug/db", async () => {
    const userCount = await prisma.user.count();
    return { ok: true, userCount };
  });
}
app.register(onboardingRoutes);
app.register(userContext);
app.register(listsRoutes);
app.register(vocabsRoutes);
app.register(studyRoutes);
app.register(userIdGuardPlugin);
app.register(reviewsRoutes);
app.register(tooltipRoutes);
const port = Number(process.env.API_PORT ?? 3000);
const host = "0.0.0.0";

await app.listen({ port, host });

async function shutdown() {
  try {
    await prisma.$disconnect();
  } finally {
    process.exit(0);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);