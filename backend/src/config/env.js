import dotenv from "dotenv";
import { z } from "zod";

// Load .env from backend directory or parent
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required for Gemini AI services"),
  ALLOWED_ORIGINS: z.string().default("http://localhost:3000,http://127.0.0.1:3000"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000), // 15 mins
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
});

let parsedConfig;
try {
  parsedConfig = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    const missing = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
    console.warn(`[Config Warning]: Environment validation issues: ${missing}`);
    // Provide safe development fallback so app boots with clear status in health check
    parsedConfig = {
      PORT: Number(process.env.PORT) || 5000,
      NODE_ENV: process.env.NODE_ENV || "development",
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
      ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://127.0.0.1:3000",
      RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000,
      RATE_LIMIT_MAX_REQUESTS: 100,
    };
  } else {
    throw error;
  }
}

export const env = parsedConfig;
