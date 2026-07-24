import { z } from 'zod';

export function extractJSON(text: string): string {
  const jsonRegex = /```(?:json)?\s*([\s\S]*?)```/;
  const match = text.match(jsonRegex);
  if (match) return match[1]?.trim() ?? text;
  return text.trim();
}

function stripNulls(obj: unknown): unknown {
  if (obj === null) return undefined;
  if (Array.isArray(obj)) return obj.map(stripNulls);
  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, stripNulls(v)]),
    );
  }
  return obj;
}

export function parseAIResponse<T>(text: string, schema: z.ZodSchema<T>): T {
  const raw = extractJSON(text);
  const parsed = JSON.parse(raw);
  return schema.parse(stripNulls(parsed));
}
