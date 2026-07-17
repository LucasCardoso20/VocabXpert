import { config as loadEnv } from "dotenv";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
// Carrega .env da raiz do monorepo SOMENTE se ainda não existir DATABASE_URL
if (!process.env.DATABASE_URL) {
    const envPath = resolve(__dirname, "../../../.env"); // <- root: vocabxpert-backend/.env
    if (existsSync(envPath))
        loadEnv({ path: envPath });
}
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client/client.js";
const cs = process.env.DATABASE_URL;
if (!cs)
    throw new Error("DATABASE_URL ausente no runtime");
const adapter = new PrismaPg({ connectionString: cs });
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
