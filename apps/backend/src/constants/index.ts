export const RESUME_ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

export const RESUME_MAX_SIZE = 10 * 1024 * 1024;

export const SKILL_CATEGORIES = [
  'programming-languages',
  'frameworks',
  'databases',
  'cloud',
  'devops',
  'soft-skills',
  'tools',
] as const;

export const QUESTION_TYPES = ['behavioral', 'technical', 'situational'] as const;
export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'] as const;
