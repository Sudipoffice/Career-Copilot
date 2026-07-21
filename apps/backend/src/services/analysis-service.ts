import type { AnalysisRequestInput } from '@career-copilot/schemas';
import { resumeRepository } from '../repositories/resume-repository';
import { jdRepository } from '../repositories/jd-repository';
import { aiEngine } from '../lib/ai-engine';
import { extractText } from '../utils/text-extractor';

export const analysisService = {
  async analyzeSkillGap(data: AnalysisRequestInput) {
    const resume = await resumeRepository.findById(data.resumeId);
    if (!resume) throw new Error('Resume not found');

    const jd = await jdRepository.findById(data.jdId);
    if (!jd) throw new Error('Job description not found');

    const resumeText = await extractText(resume.filePath, resume.mimeType);

    return aiEngine.analyzeSkillGap(resumeText, jd.rawText);
  },

  async scoreResume(data: { resumeId: string }) {
    const resume = await resumeRepository.findById(data.resumeId);
    if (!resume) throw new Error('Resume not found');

    const resumeText = await extractText(resume.filePath, resume.mimeType);

    return aiEngine.analyzeResume(resumeText);
  },
};
