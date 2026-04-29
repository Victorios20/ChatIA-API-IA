import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3333),
  GEMINI_API_KEY: z
    .string({
      error: 'A variavel GEMINI_API_KEY e obrigatoria para iniciar a aplicacao.',
    })
    .trim()
    .min(1, 'A variavel GEMINI_API_KEY e obrigatoria para iniciar a aplicacao.'),
  GEMINI_MODEL: z.string().trim().min(1).default('gemini-3-flash-preview'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const parsedEnv = envSchema.safeParse({
  PORT: process.env.PORT,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: process.env.GEMINI_MODEL,
  NODE_ENV: process.env.NODE_ENV,
});

if (!parsedEnv.success) {
  const details = parsedEnv.error.issues
    .map((issue) => `${issue.path.join('.') || 'env'}: ${issue.message}`)
    .join('; ');

  throw new Error(`Falha ao validar as variaveis de ambiente: ${details}`);
}

export const env = parsedEnv.data;
