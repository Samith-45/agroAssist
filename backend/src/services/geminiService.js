import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env.js";
import { AGRO_SYSTEM_PROMPT } from "../constants/agriPrompt.js";

let genAIInstance = null;

function getGenAI() {
  if (!genAIInstance) {
    if (!env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured on the server.");
    }
    genAIInstance = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  }
  return genAIInstance;
}

/**
 * Maps frontend chat history & image input into standard Gemini Content format
 */
function formatGeminiContents(history = [], imageInput = null) {
  const contents = [];

  for (const item of history) {
    const role = item.isBot ? "model" : "user";
    const parts = [];

    if (item.text && item.text.trim()) {
      parts.push({ text: item.text });
    }

    // Historical image preview data if provided
    if (item.image && typeof item.image === "object" && item.image.inlineData) {
      parts.push({
        inlineData: {
          mimeType: item.image.inlineData.mimeType,
          data: item.image.inlineData.data,
        },
      });
    }

    if (parts.length > 0) {
      contents.push({ role, parts });
    }
  }

  // Attach latest image to the last user message if supplied separately
  if (imageInput && imageInput.inlineData) {
    const lastMessage = contents[contents.length - 1];
    if (lastMessage && lastMessage.role === "user") {
      lastMessage.parts.push({
        inlineData: {
          mimeType: imageInput.inlineData.mimeType,
          data: imageInput.inlineData.data,
        },
      });
    } else {
      contents.push({
        role: "user",
        parts: [
          { text: "Analyze this agricultural specimen:" },
          {
            inlineData: {
              mimeType: imageInput.inlineData.mimeType,
              data: imageInput.inlineData.data,
            },
          },
        ],
      });
    }
  }

  return contents;
}

/**
 * Stream agricultural advice with Server-Sent Events (SSE)
 *
 * @param {Array} history - Array of { text, isBot, image }
 * @param {Object} imageInput - { inlineData: { mimeType, data } }
 * @param {Function} onChunk - Callback for each streaming text delta
 */
export async function streamAgriculturalAdvice(history, imageInput, onChunk) {
  const ai = getGenAI();
  const contents = formatGeminiContents(history, imageInput);

  if (contents.length === 0) {
    throw new Error("Cannot send empty prompt without content or image.");
  }

  // Attempt with primary Gemini 2.5 Flash, fallback to 1.5 Flash if required
  const modelNames = ["gemini-2.5-flash", "gemini-1.5-flash"];
  let lastError = null;

  for (const modelName of modelNames) {
    try {
      const model = ai.getGenerativeModel({
        model: modelName,
        systemInstruction: AGRO_SYSTEM_PROMPT,
      });

      const responseStream = await model.generateContentStream({
        contents,
      });

      for await (const chunk of responseStream.stream) {
        const text = chunk.text();
        if (text) {
          onChunk(text);
        }
      }

      return; // Streamed successfully
    } catch (err) {
      console.warn(`[GeminiService]: Streaming with ${modelName} encountered error:`, err.message);
      lastError = err;
      // If error is related to quota or invalid key, break early
      if (err.status === 401 || err.status === 403) {
        break;
      }
    }
  }

  throw lastError || new Error("Failed to generate content from AI model.");
}

/**
 * Synchronous non-streaming generation for headless clients or batch requests
 */
export async function generateAgriculturalAdvice(history, imageInput) {
  const ai = getGenAI();
  const contents = formatGeminiContents(history, imageInput);

  const model = ai.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: AGRO_SYSTEM_PROMPT,
  });

  const result = await model.generateContent({ contents });
  return result.response.text();
}
