import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

/**
 * Chat endpoint rate limiter to prevent API abuse & runaway token consumption
 */
export const chatRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    error: "Too many requests",
    message: "You have exceeded the request limit. Please wait before submitting another agronomy query.",
    retryAfterMinutes: Math.ceil(env.RATE_LIMIT_WINDOW_MS / (60 * 1000)),
  },
});

/**
 * Health check rate limiter
 */
export const generalRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
