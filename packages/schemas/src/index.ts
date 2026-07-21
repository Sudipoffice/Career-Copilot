import { z } from 'zod';

// ─── Environment ────────────────────────────────────────
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  API_PREFIX: z.string().default('/api/v1'),
  MONGODB_URI: z.string().url(),
  MONGODB_DB_NAME: z.string().default('career-copilot'),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default('gemini-2.0-flash'),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.coerce.number().optional(),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

export type Env = z.infer<typeof envSchema>;

// ─── Resume Upload ──────────────────────────────────────
export const resumeUploadSchema = z.object({
  file: z.instanceof(File).or(z.instanceof(Buffer)),
});

// ─── Job Description ────────────────────────────────────
export const jdCreateSchema = z.object({
  title: z.string().min(1).max(200),
  company: z.string().max(200).optional(),
  rawText: z.string().min(10).max(50000),
});

export type JdCreateInput = z.infer<typeof jdCreateSchema>;

// ─── Analysis Request ───────────────────────────────────
export const analysisRequestSchema = z.object({
  resumeId: z.string().length(24),
  jdId: z.string().length(24),
});

export type AnalysisRequestInput = z.infer<typeof analysisRequestSchema>;

export const resumeScoreSchema = z.object({
  resumeId: z.string().length(24),
});

export type ResumeScoreInput = z.infer<typeof resumeScoreSchema>;

// ─── Question Generation ────────────────────────────────
export const questionGenSchema = z.object({
  jdId: z.string().length(24),
  count: z.coerce.number().min(1).max(20).default(10),
  types: z.array(z.enum(['behavioral', 'technical', 'situational'])).optional(),
});

export type QuestionGenInput = z.infer<typeof questionGenSchema>;

// ─── Study Plan ─────────────────────────────────────────
export const studyPlanSchema = z.object({
  goal: z.string().min(10).max(1000),
  durationWeeks: z.coerce.number().min(1).max(52),
  focusAreas: z.array(z.string()).min(1).max(10),
});

export type StudyPlanInput = z.infer<typeof studyPlanSchema>;

// ─── Pagination ─────────────────────────────────────────
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
