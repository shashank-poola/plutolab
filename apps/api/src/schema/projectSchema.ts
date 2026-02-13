import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1).max(120),
    initialPrompt: z.string().min(1),
    sandboxId: z.string().optional(),
    sandboxUrl: z.string().url().optional(),
});

export const projectFileSchema = z.object({
    projectId: z.string(),
    filePath: z.string().min(1),
    content: z.string().optional(),
})