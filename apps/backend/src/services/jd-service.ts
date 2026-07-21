import type { JdCreateInput } from '@career-copilot/schemas';
import { jdRepository } from '../repositories/jd-repository';
import { aiEngine } from '../lib/ai-engine';

export const jdService = {
  async create(data: JdCreateInput) {
    const structuredData = await aiEngine.analyzeJD(data.rawText);

    const jd = await jdRepository.create({
      title: data.title,
      company: data.company,
      rawText: data.rawText,
    });

    jd.structuredData = structuredData as unknown as Record<string, unknown>;
    await jd.save();

    return jd;
  },

  async list() {
    return jdRepository.findAll();
  },

  async getById(id: string) {
    const jd = await jdRepository.findById(id);
    if (!jd) {
      throw new Error('Job description not found');
    }
    return jd;
  },

  async delete(id: string) {
    await jdRepository.deleteById(id);
  },
};
