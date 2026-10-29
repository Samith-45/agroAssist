import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import apiRoutes from "./routes/api.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allow SSE streaming and API requests
    crossOriginEmbedderPolicy: false,
  })
);

// Dynamic CORS configuration
const allowedOrigins = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
const localhostRegex = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin, localhost on any port, or explicitly configured origins
      if (
        !origin ||
        localhostRegex.test(origin) ||
        allowedOrigins.includes("*") ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked request from origin: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-request-id"],
    credentials: true,
  })
);

// HTTP request logger
if (env.NODE_ENV !== "test") {
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
}

// Request body parser with payload limit for image attachments (up to 25MB)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Direct root health endpoint for reverse proxies and ingress controllers
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mount modular API router
app.use("/api", apiRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: `Endpoint ${req.method} ${req.originalUrl} not found.`,
      code: "NOT_FOUND",
    },
  });
});

// Centralized error handler
app.use(errorHandler);

export default app;
