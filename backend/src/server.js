import app from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.PORT, () => {
  console.log(`===============================================`);
  console.log(` AgroAssist Enterprise Agronomy Backend Service `);
  console.log(` Port: ${env.PORT} | Environment: ${env.NODE_ENV}`);
  console.log(` Health Check: http://localhost:${env.PORT}/health`);
  console.log(` API Endpoint: http://localhost:${env.PORT}/api/chat/stream`);
  console.log(`===============================================`);
});

/**
 * Graceful shutdown handler for zero-downtime containerized deployments
 */
function gracefulShutdown(signal) {
  console.log(`[Lifecycle]: Received ${signal}. Closing HTTP server gracefully...`);
  server.close(() => {
    console.log("[Lifecycle]: Closed all active HTTP connections. Exiting process.");
    process.exit(0);
  });

  // Force close after 10 seconds if connections refuse to terminate
  setTimeout(() => {
    console.error("[Lifecycle]: Forcing process termination after timeout.");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  console.error("[Fatal]: Unhandled Promise Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[Fatal]: Uncaught Exception:", error);
  process.exit(1);
});
