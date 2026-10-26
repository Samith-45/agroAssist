import { z } from "zod";

export const chatPayloadSchema = z.object({
  history: z
    .array(
      z.object({
        text: z.string().optional().default(""),
        isBot: z.boolean().optional().default(false),
        image: z.any().optional(),
      })
    )
    .default([]),
  imageInput: z
    .object({
      inlineData: z.object({
        mimeType: z.string().regex(/^image\//, "MIME type must be an image format"),
        data: z.string().min(1, "Base64 image data cannot be empty"),
      }),
    })
    .nullable()
    .optional(),
});

export function validateChatPayload(req, res, next) {
  try {
    const parsed = chatPayloadSchema.parse(req.body);
    req.validatedBody = parsed;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    next(error);
  }
}
