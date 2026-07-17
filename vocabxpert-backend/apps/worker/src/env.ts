import dotenv from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// src -> api -> apps -> (raiz do monorepo)
dotenv.config({ path: resolve(__dirname, "../../../.env") });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL não encontrada. Verifique vocabxpert-backend/.env (ou variáveis do ambiente).",
  );
}