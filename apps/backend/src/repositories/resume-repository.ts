import { Resume, type IResume } from '../models/resume';

type CreateResumeData = {
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
};

export const resumeRepository = {
  async create(data: CreateResumeData): Promise<IResume> {
    const resume = await Resume.create(data);
    return resume;
  },

  async findAll(): Promise<IResume[]> {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    return resumes;
  },

  async findById(id: string): Promise<IResume | null> {
    const resume = await Resume.findById(id);
    return resume;
  },

  async deleteById(id: string): Promise<void> {
    await Resume.findByIdAndDelete(id);
  },
};
