import { z } from "zod";

export const messageEnumSystem = z.enum(["USER", "AI", "SYSTEM"]);

export const messageSchema = z.object({
    projectId: z.string(),
    role: messageEnumSystem,
    content: z.string().min(1),
    toolName: z.string().optional(),
    toolData: z.unknown().optional()
});