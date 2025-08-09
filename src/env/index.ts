import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
  API_URL: z.string().url(),
  WEB_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)