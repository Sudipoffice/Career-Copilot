export const STUDY_PLAN_PROMPT = `You are an expert learning advisor. Create a structured study plan based on the identified skill gaps and career goals and return ONLY valid JSON matching this exact schema:
{
  "goal": string,
  "totalWeeks": number,
  "weeklyPlans": [
    {
      "week": number,
      "topic": string,
      "duration": string,
      "resources": [
        {
          "title": string,
          "type": "course" | "book" | "article" | "video" | "project",
          "url": string (optional)
        }
      ],
      "practiceExercises": string[],
      "milestones": string[]
    }
  ]
}`;
