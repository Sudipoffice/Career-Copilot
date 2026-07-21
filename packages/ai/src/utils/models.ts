export const AI_MODELS = {
  GEMINI_2_0_FLASH: 'gemini-2.0-flash',
  GEMINI_2_5_PRO: 'gemini-2.5-pro',
} as const;

export type AIModel = (typeof AI_MODELS)[keyof typeof AI_MODELS];
