import OpenAI from 'openai';

export type AIClient = OpenAI;

let ai: AIClient | null = null;

export function createAIClient(apiKey: string): AIClient {
  if (ai) return ai;
  ai = new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'https://career-copilot.ai',
      'X-Title': 'Career Copilot AI',
    },
  });
  return ai;
}

export function getAIClient(): AIClient {
  if (!ai) {
    throw new Error('AI client not initialized. Call createAIClient() first.');
  }
  return ai;
}
