import { ChatOpenAI } from "@langchain/openai";
import { env } from "../config/env";

export const getModel = ( modelName: string ) => {
    return new ChatOpenAI({
        modelName,
        apiKey: env.OPENROUTER_API_KEY,
        temperature: 0.2,
        maxTokens: 8000,
        configuration: {
            baseURL: "https://openrouter.ai/api/v1",
            defaultHeaders: {
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "MyAIApp",
            },
        },
    });
}