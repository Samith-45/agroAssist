import { Router } from "express";
import { getHealth, getReadiness } from "../controllers/healthController.js";
import {
  streamChat,
  sendChat,
  getCropSuggestions,
} from "../controllers/chatController.js";
import { validateChatPayload } from "../middleware/validate.js";
import { chatRateLimiter, generalRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Observability Probes
router.get("/health", generalRateLimiter, getHealth);
router.get("/ready", generalRateLimiter, getReadiness);

// Agronomy AI Advisory Endpoints
router.post("/chat/stream", chatRateLimiter, validateChatPayload, streamChat);
router.post("/chat", chatRateLimiter, validateChatPayload, sendChat);
router.get("/crops/suggestions", generalRateLimiter, getCropSuggestions);

export default router;
