import { Schema, model, type Document } from 'mongoose';

export interface IResume extends Document {
  userId?: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  parsedContent?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    userId: { type: String, index: true },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    mimeType: { type: String, required: true },
    parsedContent: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const Resume = model<IResume>('Resume', resumeSchema);
