import { GoogleGenerativeAI } from '@google/generative-ai';

export type AIClient = GoogleGenerativeAI;

let genAI: AIClient | null = null;

export function createAIClient(apiKey: string): AIClient {
  if (genAI) return genAI;
  genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
}

export function getAIClient(): AIClient {
  if (!genAI) {
    throw new Error('AI client not initialized. Call createAIClient() first.');
  }
  return genAI;
}
