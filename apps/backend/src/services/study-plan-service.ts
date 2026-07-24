import type { StudyPlanInput } from '@career-copilot/schemas';
import { aiEngine } from '../lib/ai-engine';
import { jdRepository } from '../repositories/jd-repository';
import { resumeRepository } from '../repositories/resume-repository';
import { extractText } from '../utils/text-extractor';

export const studyPlanService = {
  async generate(data: StudyPlanInput) {
    if (data.jdId) {
      const jd = await jdRepository.findById(data.jdId);
      if (!jd) throw new Error('Job description not found');
      const text = jd.rawText;
      return aiEngine.generateStudyPlanFromJD(text, data.goal || '', data.durationWeeks, data.focusAreas);
    }

    if (data.resumeId) {
      const resume = await resumeRepository.findById(data.resumeId);
      if (!resume) throw new Error('Resume not found');
      const text = await extractText(resume.filePath, resume.mimeType);
      return aiEngine.generateStudyPlanFromResume(text, data.goal || '', data.durationWeeks, data.focusAreas);
    }

    return aiEngine.generateStudyPlan(data.focusAreas.join(', '), data.goal || 'Career growth', data.durationWeeks);
  },
};
