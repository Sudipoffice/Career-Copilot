import { env } from '@/config/env';

const BASE_URL = env.NEXT_PUBLIC_API_URL;

class APIError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, string[]>,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });

  const body = await res.json();

  if (!res.ok) {
    throw new APIError(
      res.status,
      body?.error?.code ?? 'UNKNOWN',
      body?.error?.message ?? 'Request failed',
      body?.error?.details,
    );
  }

  return body.data as T;
}

export interface Resume {
  _id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  parsedContent?: {
    overallScore: number;
    missingKeywords: string[];
    formattingIssues: string[];
    sectionSuggestions: string[];
    atsRating: 'poor' | 'fair' | 'good' | 'excellent';
    improvements: string[];
  };
  createdAt: string;
}

export interface JobDescription {
  _id: string;
  title: string;
  company?: string;
  rawText: string;
  structuredData?: {
    title: string;
    level?: string;
    requiredSkills: string[];
    preferredSkills: string[];
    experienceRequired?: string;
    educationRequired?: string;
    responsibilities: string[];
    technologies: string[];
  };
  createdAt: string;
}

export interface SkillGapResult {
  matchingSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  recommendations: string[];
  resumeSuggestions: string[];
}

export interface ResumeScoreResult {
  overallScore: number;
  missingKeywords: string[];
  formattingIssues: string[];
  sectionSuggestions: string[];
  atsRating: 'poor' | 'fair' | 'good' | 'excellent';
  improvements: string[];
}

export interface Question {
  text: string;
  type: 'behavioral' | 'technical' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  skillTested: string;
  keyPoints: string[];
  suggestedStructure?: string;
}

export interface StudyPlan {
  goal: string;
  totalWeeks: number;
  weeklyPlans: {
    week: number;
    topic: string;
    duration: string;
    resources: { title: string; type: string; url?: string }[];
    practiceExercises: string[];
    milestones: string[];
  }[];
}

export const api = {
  resume: {
    fileUrl: (id: string) => `${BASE_URL}/resume/${id}/file`,

    async upload(file: File) {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${BASE_URL}/resume/upload`, { method: 'POST', body: form });
      const body = await res.json();
      if (!res.ok) throw new APIError(res.status, body?.error?.code ?? 'UPLOAD_FAILED', body?.error?.message ?? 'Upload failed');
      return body.data as Resume;
    },
    uploadWithProgress(file: File, onProgress?: (pct: number) => void): Promise<Resume> {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload = () => {
          try {
            const body = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300) resolve(body.data as Resume);
            else reject(new APIError(xhr.status, body?.error?.code ?? 'UPLOAD_FAILED', body?.error?.message ?? 'Upload failed'));
          } catch { reject(new Error('Invalid server response')); }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        const form = new FormData();
        form.append('file', file);
        xhr.open('POST', `${BASE_URL}/resume/upload`);
        xhr.send(form);
      });
    },
    list: () => request<Resume[]>('/resume'),
    get: (id: string) => request<Resume>(`/resume/${id}`),
    delete: async (id: string) => {
      const res = await fetch(`${BASE_URL}/resume/${id}`, { method: 'DELETE' });
      if (!res.ok) { const body = await res.json().catch(() => ({})); throw new APIError(res.status, body?.error?.code ?? 'DELETE_FAILED', body?.error?.message ?? 'Delete failed'); }
    },
  },

  jd: {
    create: (data: { title: string; company?: string; rawText: string }) =>
      request<JobDescription>('/jd', { method: 'POST', body: JSON.stringify(data) }),
    list: () => request<JobDescription[]>('/jd'),
    get: (id: string) => request<JobDescription>(`/jd/${id}`),
    delete: async (id: string) => {
      const res = await fetch(`${BASE_URL}/jd/${id}`, { method: 'DELETE' });
      if (!res.ok) { const body = await res.json().catch(() => ({})); throw new APIError(res.status, body?.error?.code ?? 'DELETE_FAILED', body?.error?.message ?? 'Delete failed'); }
    },
  },

  analysis: {
    skillGap: (data: { resumeId: string; jdId: string }) =>
      request<SkillGapResult>('/analysis/skill-gap', { method: 'POST', body: JSON.stringify(data) }),
    resumeScore: (data: { resumeId: string }) =>
      request<ResumeScoreResult>('/analysis/resume-score', { method: 'POST', body: JSON.stringify(data) }),
  },

  questions: {
    generate: (data: { jdId: string; count?: number; types?: string[] }) =>
      request<{ questions: Question[] }>('/questions/generate', { method: 'POST', body: JSON.stringify(data) }),
  },

  studyPlan: {
    generate: (data: { goal: string; durationWeeks: number; focusAreas: string[] }) =>
      request<StudyPlan>('/study-plan/generate', { method: 'POST', body: JSON.stringify(data) }),
  },
};
