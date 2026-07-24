import type { QuestionGenInput } from '@career-copilot/schemas';
import { jdRepository } from '../repositories/jd-repository';
import { resumeRepository } from '../repositories/resume-repository';
import { aiEngine } from '../lib/ai-engine';
import { extractText } from '../utils/text-extractor';

export const questionsService = {
  async generate(data: QuestionGenInput) {
    if (data.resumeId) {
      const resume = await resumeRepository.findById(data.resumeId);
      if (!resume) throw new Error('Resume not found');
      const text = await extractText(resume.filePath, resume.mimeType);
      return aiEngine.generateQuestionsFromResume(text, data.count);
    }

    if (data.jdId) {
      const jd = await jdRepository.findById(data.jdId);
      if (!jd) throw new Error('Job description not found');
      return aiEngine.generateQuestions(jd.rawText, data.count);
    }

    throw new Error('Either jdId or resumeId is required');
  },
};
