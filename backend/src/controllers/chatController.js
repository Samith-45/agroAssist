import {
  streamAgriculturalAdvice,
  generateAgriculturalAdvice,
} from "../services/geminiService.js";

/**
 * SSE Streaming controller for agricultural consultation
 */
export async function streamChat(req, res, next) {
  const { history, imageInput } = req.validatedBody;

  // Set SSE response headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no", // Disable Nginx proxy buffering
  });

  // Flush headers immediately if supported
  if (res.flushHeaders) {
    res.flushHeaders();
  }

  let isAborted = false;
  req.on("close", () => {
    isAborted = true;
  });

  try {
    await streamAgriculturalAdvice(history, imageInput, (chunk) => {
      if (!isAborted) {
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      }
    });

    if (!isAborted) {
      res.write("data: [DONE]\n\n");
      res.end();
    }
  } catch (error) {
    console.error("[ChatController Error]:", error);
    if (!isAborted) {
      res.write(
        `data: ${JSON.stringify({
          error: error.message || "Failed to process agronomy consultation.",
        })}\n\n`
      );
      res.end();
    }
  }
}

/**
 * Standard synchronous non-streaming JSON endpoint
 */
export async function sendChat(req, res, next) {
  try {
    const { history, imageInput } = req.validatedBody;
    const reply = await generateAgriculturalAdvice(history, imageInput);
    res.status(200).json({ reply });
  } catch (error) {
    next(error);
  }
}

/**
 * Curated suggestions endpoint
 */
export function getCropSuggestions(req, res) {
  res.status(200).json({
    categories: [
      {
        id: "diagnostics",
        label: "Disease & Pest Diagnostics",
        description: "Upload leaf or pest photos for visual AI inspection",
        prompt: "Identify this symptom and suggest cultural and organic remedies:",
      },
      {
        id: "soil_nutrients",
        label: "Soil & Nutrient Management",
        description: "Soil test interpretation, pH balancing, and fertilizer schedules",
        prompt: "What is the recommended NPK dosing schedule and soil pH for wheat?",
      },
      {
        id: "irrigation",
        label: "Smart Irrigation & Weather",
        description: "Drip schedules, moisture conservation, and drought mitigation",
        prompt: "How much water is required per acre for drip-irrigated tomato plants?",
      },
      {
        id: "seasonal_crops",
        label: "Seasonal Crop Selection",
        description: "High-yield Kharif, Rabi, and Zaid crop recommendations",
        prompt: "Suggest best high-yield drought-tolerant pulse varieties for drylands.",
      },
    ],
  });
}
