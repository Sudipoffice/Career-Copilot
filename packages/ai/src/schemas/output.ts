import { z } from 'zod';

export const resumeAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  missingKeywords: z.array(z.string()),
  formattingIssues: z.array(z.string()),
  sectionSuggestions: z.array(z.string()),
  atsRating: z.enum(['poor', 'fair', 'good', 'excellent']),
  improvements: z.array(z.string()),
});

export const jobDescriptionSchema = z.object({
  title: z.string(),
  level: z.string().nullish(),
  requiredSkills: z.array(z.string()),
  preferredSkills: z.array(z.string()),
  experienceRequired: z.string().nullish(),
  educationRequired: z.string().nullish(),
  responsibilities: z.array(z.string()),
  technologies: z.array(z.string()),
});

export const skillGapSchema = z.object({
  matchingSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  matchPercentage: z.number().min(0).max(100),
  recommendations: z.array(z.string()),
  resumeSuggestions: z.array(z.string()),
});

export const questionSchema = z.object({
  questions: z.array(
    z.object({
      text: z.string(),
      type: z.enum(['behavioral', 'technical', 'situational']),
      difficulty: z.enum(['easy', 'medium', 'hard']),
      skillTested: z.string(),
      keyPoints: z.array(z.string()),
      suggestedStructure: z.string().optional(),
    }),
  ),
});

export const studyPlanSchema = z.object({
  goal: z.string(),
  totalWeeks: z.number(),
  weeklyPlans: z.array(
    z.object({
      week: z.number(),
      topic: z.string(),
      duration: z.string(),
      resources: z.array(
        z.object({
          title: z.string(),
          type: z.enum(['course', 'book', 'article', 'video', 'project']),
          url: z.string().optional(),
        }),
      ),
      practiceExercises: z.array(z.string()),
      milestones: z.array(z.string()),
    }),
  ),
});
