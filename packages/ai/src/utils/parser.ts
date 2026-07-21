import { z } from 'zod';

export function extractJSON(text: string): string {
  const jsonRegex = /```(?:json)?\s*([\s\S]*?)```/;
  const match = text.match(jsonRegex);
  if (match) return match[1]?.trim() ?? text;
  return text.trim();
}

export function parseAIResponse<T>(text: string, schema: z.ZodSchema<T>): T {
  const raw = extractJSON(text);
  const parsed = JSON.parse(raw);
  return schema.parse(parsed);
}
