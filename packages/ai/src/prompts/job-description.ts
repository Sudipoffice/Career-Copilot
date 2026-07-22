export const JOB_DESCRIPTION_PROMPT = `You are an expert job description analyzer. Extract structured information from the provided job description and return ONLY valid JSON matching this exact schema:
{
  "title": string,
  "level": string (optional),
  "requiredSkills": string[],
  "preferredSkills": string[],
  "experienceRequired": string (optional),
  "educationRequired": string (optional),
  "responsibilities": string[],
  "technologies": string[]
}`;
