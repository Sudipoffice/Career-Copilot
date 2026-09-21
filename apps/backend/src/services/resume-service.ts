import { resumeRepository } from '../repositories/resume-repository';
import { aiEngine } from '../lib/ai-engine';
import { extractText } from '../utils/text-extractor';
import fs from 'fs/promises';
import path from 'path';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const MAX_UPLOADS = 50;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function cleanupOldUploads() {
  try {
    const files = await fs.readdir(UPLOADS_DIR);
    if (files.length <= MAX_UPLOADS) return;
    
    const fileStats = await Promise.all(
      files.map(async (f) => {
        const stat = await fs.stat(path.join(UPLOADS_DIR, f));
        return { name: f, mtime: stat.mtimeMs };
      })
    );
    
    fileStats.sort((a, b) => a.mtime - b.mtime);
    const toDelete = fileStats.slice(0, fileStats.length - MAX_UPLOADS);
    
    await Promise.all(
      toDelete.map(f => fs.unlink(path.join(UPLOADS_DIR, f.name)).catch(() => {}))
    );
  } catch {
    // ignore cleanup errors
  }
}

export const resumeService = {
  async processUpload(file: Express.Multer.File) {
    const text = await extractText(file.path, file.mimetype);

    const analysis = await aiEngine.analyzeResume(text);

    await sleep(100);
    await cleanupOldUploads();

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
    const resume = await resumeRepository.findById(id);
    if (resume) {
      try {
        await fs.unlink(resume.filePath);
      } catch {
        // ignore if file already deleted
      }
    }
    await resumeRepository.deleteById(id);
  },
};
