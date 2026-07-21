import { GoogleGenAI } from '@google/genai';

export type AIClient = GoogleGenAI;

let genAI: AIClient | null = null;

export function createAIClient(apiKey: string): AIClient {
  if (genAI) return genAI;
  genAI = new GoogleGenAI({ apiKey });
  return genAI;
}

export function getAIClient(): AIClient {
  if (!genAI) {
    throw new Error('AI client not initialized. Call createAIClient() first.');
  }
  return genAI;
}
