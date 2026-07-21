import type { QuestionGenInput } from '@career-copilot/schemas';
import { jdRepository } from '../repositories/jd-repository';
import { aiEngine } from '../lib/ai-engine';

export const questionsService = {
  async generate(data: QuestionGenInput) {
    const jd = await jdRepository.findById(data.jdId);
    if (!jd) throw new Error('Job description not found');

    return aiEngine.generateQuestions(jd.rawText, data.count);
  },
};
