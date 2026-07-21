import { apiClient } from './api-client';
import type { Question } from '@career-copilot/types';
import type { QuestionGenInput } from '@career-copilot/schemas';

export const questionService = {
  generate: (data: QuestionGenInput) => apiClient.post<Question[]>('/questions/generate', data),
};
