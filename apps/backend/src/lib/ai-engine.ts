import { getEnv } from '@career-copilot/config';
import {
  createAIClient,
  getAIClient,
  RESUME_ANALYSIS_PROMPT,
  JOB_DESCRIPTION_PROMPT,
  SKILL_GAP_PROMPT,
  QUESTION_GEN_PROMPT,
  STUDY_PLAN_PROMPT,
  resumeAnalysisSchema,
  jobDescriptionSchema,
  skillGapSchema,
  questionSchema,
  aiStudyPlanSchema,
  extractJSON,
  parseAIResponse,
} from '@career-copilot/ai';

function ensureClient() {
  const apiKey = getEnv().OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set');
  }
  createAIClient(apiKey);
}

async function callAI(systemPrompt: string, userMessage: string): Promise<string> {
  ensureClient();
  const client = getAIClient();
  const modelName = getEnv().AI_MODEL;

  const response = await client.chat.completions.create({
    model: modelName,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  });

  const text = response.choices[0]?.message?.content;
  if (!text) {
    throw new Error('AI returned empty response');
  }
  return text;
}

function stripNulls(obj: unknown): unknown {
  if (obj === null) return undefined;
  if (Array.isArray(obj)) return obj.map(stripNulls);
  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, stripNulls(v)]),
    );
  }
  return obj;
}

export const aiEngine = {
  async analyzeResume(resumeText: string) {
    const text = await callAI(RESUME_ANALYSIS_PROMPT, resumeText);
    return parseAIResponse(text, resumeAnalysisSchema);
  },

  async analyzeJD(jdText: string) {
    const text = await callAI(JOB_DESCRIPTION_PROMPT, jdText);
    const raw = JSON.parse(extractJSON(text));
    return jobDescriptionSchema.parse(stripNulls(raw));
  },

  async analyzeSkillGap(resumeText: string, jdText: string) {
    const userMessage = `Resume:\n${resumeText}\n\nJob Description:\n${jdText}`;
    const text = await callAI(SKILL_GAP_PROMPT, userMessage);
    return parseAIResponse(text, skillGapSchema);
  },

  async generateQuestions(jdText: string, count = 10) {
    const userMessage = `Job Description:\n${jdText}\n\nGenerate ${count} questions.`;
    const text = await callAI(QUESTION_GEN_PROMPT, userMessage);
    return parseAIResponse(text, questionSchema);
  },

  async generateQuestionsFromResume(resumeText: string, count = 10) {
    const userMessage = `Resume:\n${resumeText}\n\nBased on the skills and experience mentioned in this resume, generate ${count} practice interview questions.`;
    const text = await callAI(QUESTION_GEN_PROMPT, userMessage);
    return parseAIResponse(text, questionSchema);
  },

  async generateStudyPlan(skillGapText: string, goal: string, weeks = 2) {
    const userMessage = `Skill Gaps:\n${skillGapText}\n\nGoal: ${goal}\nDuration: ${weeks} weeks`;
    const text = await callAI(STUDY_PLAN_PROMPT, userMessage);
    return parseAIResponse(text, aiStudyPlanSchema);
  },

  async generateStudyPlanFromResume(resumeText: string, goal: string, weeks: number, focusAreas: string[]) {
    const userMessage = `Resume Context:\n${resumeText}\n\nGoal: ${goal || 'Career growth'}\nDuration: ${weeks} weeks\nFocus Areas: ${focusAreas.join(', ')}`;
    const text = await callAI(STUDY_PLAN_PROMPT, userMessage);
    return parseAIResponse(text, aiStudyPlanSchema);
  },

  async generateStudyPlanFromJD(jdText: string, goal: string, weeks: number, focusAreas: string[]) {
    const userMessage = `Job Description:\n${jdText}\n\nGoal: ${goal || 'Prepare for this role'}\nDuration: ${weeks} weeks\nFocus Areas: ${focusAreas.join(', ')}`;
    const text = await callAI(STUDY_PLAN_PROMPT, userMessage);
    return parseAIResponse(text, aiStudyPlanSchema);
  },
};
