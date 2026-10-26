/**
 * AgroAssist API Client Service
 * Connects frontend to the secure backend proxy (/api/chat/stream)
 * Eliminates client-side secret exposure
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const sendMsgToAI = async (chatHistory, imageInput, onChunkCallback) => {
  const endpoint = `${API_BASE_URL}/api/chat/stream`;

  const requestPayload = {
    history: chatHistory.map((msg) => ({
      text: msg.text || "",
      isBot: Boolean(msg.isBot),
      image: msg.image || null,
    })),
    imageInput: imageInput || null,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      let errorMessage = `Server responded with status ${response.status}`;
      try {
        const errorJson = await response.json();
        errorMessage = errorJson.error?.message || errorJson.error || errorMessage;
      } catch (_) {
        // Fall back to default status text
      }
      throw new Error(errorMessage);
    }

    if (!response.body) {
      throw new Error("ReadableStream not supported by response.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      // Keep unfinished chunk in the buffer
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("data: ")) {
          const rawData = trimmed.replace("data: ", "").trim();
          if (rawData === "[DONE]") {
            return;
          }

          try {
            const parsed = JSON.parse(rawData);
            if (parsed.chunk) {
              onChunkCallback(parsed.chunk);
            } else if (parsed.error) {
              onChunkCallback(`\n\n**Advisory Warning**: ${parsed.error}`);
            }
          } catch (parseError) {
            console.warn("Unable to parse stream SSE chunk:", rawData);
          }
        }
      }
    }
  } catch (error) {
    console.error("[AgroAssist Client Error]:", error);
    onChunkCallback(
      `\n\n*Unable to connect to AgroAssist Backend Service (${error.message}). Please ensure the backend is running at ${API_BASE_URL} and your GEMINI_API_KEY is configured.*`
    );
  }
};