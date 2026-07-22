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

export const aiEngine = {
  async analyzeResume(resumeText: string) {
    const text = await callAI(RESUME_ANALYSIS_PROMPT, resumeText);
    return parseAIResponse(text, resumeAnalysisSchema);
  },

  async analyzeJD(jdText: string) {
    const text = await callAI(JOB_DESCRIPTION_PROMPT, jdText);
    return parseAIResponse(text, jobDescriptionSchema);
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

  async generateStudyPlan(skillGapText: string, goal: string, weeks = 2) {
    const userMessage = `Skill Gaps:\n${skillGapText}\n\nGoal: ${goal}\nDuration: ${weeks} weeks`;
    const text = await callAI(STUDY_PLAN_PROMPT, userMessage);
    return parseAIResponse(text, aiStudyPlanSchema);
  },
};
