// ─── AI Client ──────────────────────────────────────────
export { createAIClient, getAIClient, type AIClient } from './lib/client';

// ─── Prompts ────────────────────────────────────────────
export { RESUME_ANALYSIS_PROMPT } from './prompts/resume';
export { JOB_DESCRIPTION_PROMPT } from './prompts/job-description';
export { SKILL_GAP_PROMPT } from './prompts/skill-gap';
export { QUESTION_GEN_PROMPT } from './prompts/questions';
export { STUDY_PLAN_PROMPT } from './prompts/study-plan';

// ─── JSON Schemas ───────────────────────────────────────
export {
  resumeAnalysisSchema,
  jobDescriptionSchema,
  skillGapSchema,
  questionSchema,
  studyPlanSchema as aiStudyPlanSchema,
} from './schemas/output';

// ─── Utils ──────────────────────────────────────────────
export { parseAIResponse, extractJSON } from './utils/parser';
export { type AIModel, AI_MODELS } from './utils/models';
