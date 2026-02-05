import { z } from "zod";

export const messageEnumSystem = z.enum(["USER", "AI", "SYSTEM"]);

export const projectSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional()
});

export const chatSchema = z.object({
    projectId: z.string(),
});

export const messageSchema = z.object({
    chatId: z.string().cuid(),
    role: messageEnumSystem,
    content: z.string().min(1),
    toolName: z.string().optional(),
    toolData: z.unknown().optional()
});