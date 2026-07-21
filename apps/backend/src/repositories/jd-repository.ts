import { JobDescription, type IJobDescription } from '../models/jd';

type CreateJDData = {
  title: string;
  company?: string;
  rawText: string;
};

export const jdRepository = {
  async create(data: CreateJDData): Promise<IJobDescription> {
    const jd = await JobDescription.create(data);
    return jd;
  },

  async findAll(): Promise<IJobDescription[]> {
    const jds = await JobDescription.find().sort({ createdAt: -1 });
    return jds;
  },

  async findById(id: string): Promise<IJobDescription | null> {
    const jd = await JobDescription.findById(id);
    return jd;
  },

  async deleteById(id: string): Promise<void> {
    await JobDescription.findByIdAndDelete(id);
  },
};
