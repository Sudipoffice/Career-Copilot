import { apiClient } from './api-client';
import type { StudyPlan } from '@career-copilot/types';
import type { StudyPlanInput } from '@career-copilot/schemas';

export const studyPlanService = {
  generate: (data: StudyPlanInput) => apiClient.post<StudyPlan>('/study-plan/generate', data),
};
