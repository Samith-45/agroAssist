import { env } from "../config/env.js";

const startTime = Date.now();

export function getHealth(req, res) {
  res.status(200).json({
    status: "healthy",
    service: "agro-assist-backend",
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
  });
}

export function getReadiness(req, res) {
  const hasApiKey = Boolean(env.GEMINI_API_KEY && env.GEMINI_API_KEY.length > 5);

  if (!hasApiKey) {
    return res.status(503).json({
      status: "unready",
      message: "GEMINI_API_KEY is missing or invalid in server configuration.",
    });
  }

  const memory = process.memoryUsage();

  res.status(200).json({
    status: "ready",
    checks: {
      geminiConfigured: true,
      memoryHeapUsedMB: Math.round(memory.heapUsed / 1024 / 1024),
    },
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
