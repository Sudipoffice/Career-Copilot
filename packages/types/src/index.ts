// ─── API ────────────────────────────────────────────────
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
};

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, string[]>;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

// ─── Resume ─────────────────────────────────────────────
export type ResumeSection = 'education' | 'experience' | 'projects' | 'skills' | 'certifications';

export type Resume = {
  id: string;
  userId: string;
  fileName: string;
  sections: ResumeSection[];
  parsedContent?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

// ─── Job Description ────────────────────────────────────
export type JobDescription = {
  id: string;
  userId: string;
  title: string;
  company?: string;
  rawText: string;
  structuredData?: Record<string, unknown>;
  createdAt: Date;
};

// ─── Analysis ───────────────────────────────────────────
export type SkillGapAnalysis = {
  resumeId: string;
  jdId: string;
  missingSkills: string[];
  matchingSkills: string[];
  matchScore: number;
  suggestions: string[];
};

// ─── Questions ──────────────────────────────────────────
export type Question = {
  id: string;
  text: string;
  type: 'behavioral' | 'technical' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  expectedPoints: string[];
};

// ─── Study Plan ─────────────────────────────────────────
export type StudyPlanItem = {
  id: string;
  topic: string;
  duration: string;
  resources: string[];
  completed: boolean;
};

export type StudyPlan = {
  id: string;
  userId: string;
  goal: string;
  items: StudyPlanItem[];
  startDate: Date;
  endDate: Date;
};

// ─── User ───────────────────────────────────────────────
export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
};
