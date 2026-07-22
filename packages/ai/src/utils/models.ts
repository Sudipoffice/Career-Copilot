export const AI_MODELS = {
  DEEPSEEK_V3_1: 'deepseek/deepseek-chat-v3.1',
  LLAMA_3_3_70B: 'meta-llama/llama-3.3-70b-instruct',
  QWEN_2_5_72B: 'qwen/qwen-2.5-72b-instruct',
} as const;

export type AIModel = (typeof AI_MODELS)[keyof typeof AI_MODELS];
