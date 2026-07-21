import type { StudyPlanInput } from '@career-copilot/schemas';
import { aiEngine } from '../lib/ai-engine';

export const studyPlanService = {
  async generate(data: StudyPlanInput) {
    return aiEngine.generateStudyPlan(data.focusAreas.join(', '), data.goal, data.durationWeeks);
  },
};
