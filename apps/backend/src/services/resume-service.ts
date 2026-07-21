import { resumeRepository } from '../repositories/resume-repository';
import { aiEngine } from '../lib/ai-engine';
import { extractText } from '../utils/text-extractor';
import fs from 'fs/promises';

export const resumeService = {
  async processUpload(file: Express.Multer.File) {
    const text = await extractText(file.path, file.mimetype);

    const analysis = await aiEngine.analyzeResume(text);

    const resume = await resumeRepository.create({
      fileName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
      mimeType: file.mimetype,
    });

    resume.parsedContent = analysis as unknown as Record<string, unknown>;
    await resume.save();

    return resume;
  },

  async list() {
    return resumeRepository.findAll();
  },

  async getById(id: string) {
    const resume = await resumeRepository.findById(id);
    if (!resume) {
      throw new Error('Resume not found');
    }
    return resume;
  },

  async getFile(id: string) {
    const resume = await resumeRepository.findById(id);
    if (!resume) throw new Error('Resume not found');
    const data = await fs.readFile(resume.filePath);
    return { data, mimeType: resume.mimeType, fileName: resume.fileName };
  },

  async delete(id: string) {
    await resumeRepository.deleteById(id);
  },
};
