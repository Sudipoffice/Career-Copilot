export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  RESUME: '/resume',
  JOB_DESCRIPTION: '/job-description',
  ANALYSIS: '/analysis',
  QUESTIONS: '/questions',
  STUDY_PLAN: '/study-plan',
} as const;

export const QUERY_KEYS = {
  RESUMES: ['resumes'] as const,
  RESUME: (id: string) => ['resume', id] as const,
  JDS: ['job-descriptions'] as const,
  JD: (id: string) => ['jd', id] as const,
  ANALYSIS: (resumeId: string, jdId: string) => ['analysis', resumeId, jdId] as const,
  QUESTIONS: (jdId: string) => ['questions', jdId] as const,
  STUDY_PLAN: (goal: string) => ['study-plan', goal] as const,
};
