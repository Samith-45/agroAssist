import { env } from "../config/env.js";

/**
 * Production-ready centralized error handling middleware
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const correlationId = req.headers["x-request-id"] || `req-${Date.now()}`;

  console.error(`[Error] [${correlationId}] ${req.method} ${req.url}:`, {
    message: err.message,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });

  res.status(statusCode).json({
    error: {
      message: err.message || "An unexpected internal server error occurred.",
      code: err.code || "INTERNAL_ERROR",
      correlationId,
      ...(env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
}
