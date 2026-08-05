import { config as loadEnv } from 'dotenv';
import { defineConfig, env } from 'prisma/config';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Carrega sempre o .env localizado na raiz do monorepo,
 * independentemente de onde o comando Prisma foi executado.
 */
loadEnv({
  path: resolve(__dirname, '.env'),
});

export default defineConfig({
  schema: 'packages/db/prisma/schema.prisma',

  migrations: {
    path: 'packages/db/prisma/migrations',
  },

  datasource: {
    url: env('DATABASE_URL'),
  },
});