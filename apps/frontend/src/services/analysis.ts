import { apiClient } from './api-client';
import type { SkillGapAnalysis } from '@career-copilot/types';
import type { AnalysisRequestInput } from '@career-copilot/schemas';

export const analysisService = {
  getSkillGap: (params: AnalysisRequestInput) =>
    apiClient.post<SkillGapAnalysis>('/analysis/skill-gap', params),
};
