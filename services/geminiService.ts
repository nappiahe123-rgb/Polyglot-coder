import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCodeFromPrompt = async (
  prompt: string,
  targetLanguage: string
): Promise<GeneratedResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        You are an expert polyglot programmer. 
        Convert the following description or pseudocode into idiomatic, syntactically correct ${targetLanguage} code.
        
        Input:
        ${prompt}
        
        Requirements:
        1. The 'code' field must contain ONLY the valid source code. Do not include markdown backticks in the 'code' string itself.
        2. The 'explanation' field should briefly explain the logic or any specific language features used.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            code: {
              type: Type.STRING,
              description: "The generated source code in the target language.",
            },
            explanation: {
              type: Type.STRING,
              description: "A brief explanation of the code logic.",
            },
          },
          required: ["code", "explanation"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const result = JSON.parse(text) as GeneratedResult;
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate code. Please try again.");
  }
};