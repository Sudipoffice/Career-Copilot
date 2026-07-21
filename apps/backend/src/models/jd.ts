import { Schema, model, type Document } from 'mongoose';

export interface IJobDescription extends Document {
  userId?: string;
  title: string;
  company?: string;
  rawText: string;
  structuredData?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const jdSchema = new Schema<IJobDescription>(
  {
    userId: { type: String, index: true },
    title: { type: String, required: true },
    company: { type: String },
    rawText: { type: String, required: true },
    structuredData: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const JobDescription = model<IJobDescription>('JobDescription', jdSchema);
