import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({
  path: path.resolve(process.cwd(), "../../.env"),
});

const EnvSchema = z.object({
  SERVER_PORT: z.string().default("8000").transform(Number),
  JWT_SECRET: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  SERVER_GOOGLE_GEMINI_API: z.string().optional(),
  SERVER_GROQ_API: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().optional(),
});

export const env = EnvSchema.parse(process.env);