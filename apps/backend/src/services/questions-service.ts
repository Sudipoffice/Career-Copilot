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
      try {
        const text = await extractText(resume.filePath, resume.mimeType);
        return aiEngine.generateQuestionsFromResume(text, data.count);
      } catch (err) {
        console.error('Questions generation failed (resume):', err);
        throw new Error('Failed to generate questions from resume');
      }
    }

    if (data.jdId) {
      const jd = await jdRepository.findById(data.jdId);
      if (!jd) throw new Error('Job description not found');
      try {
        return aiEngine.generateQuestions(jd.rawText, data.count);
      } catch (err) {
        console.error('Questions generation failed (JD):', err);
        throw new Error('Failed to generate questions from job description');
      }
    }

    throw new Error('Either jdId or resumeId is required');
  },
};
