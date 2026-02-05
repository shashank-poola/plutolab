import { z } from "zod";

export const signinSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email(),
    image: z.string().url().optional()
});

