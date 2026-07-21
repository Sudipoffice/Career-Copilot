# AI Career Copilot - Project Blueprint

> Version: MVP v1
> Goal: Build a production-quality AI-powered career preparation platform.

## 1. Vision

An end-to-end platform that helps job seekers optimize resumes, understand job fit, identify skill gaps, generate personalized interview preparation, and track progress.

## 2. Core User Journey

1. Register/Login
2. Upload Resume (PDF/DOCX)
3. Resume Parsing
4. Paste Job Description
5. JD Analysis
6. AI Match Score
7. Resume Improvement Suggestions
8. Topic-wise Skill Gap Analysis
9. Personalized Interview Question Generator
10. 7-Day Study Plan
11. History Dashboard

## 3. Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form + Zod
- Recharts

### Backend

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- Redis (cache)
- BullMQ (background jobs)

### AI

- LLM with structured JSON outputs
- Resume parser
- Prompt templates
- Embeddings (future)

## 4. Pages

- Landing
- Login/Register
- Dashboard
- Resume Upload
- Resume Analysis
- Job Description Analysis
- Match Report
- Resume Optimizer
- Interview Preparation
- Study Plan
- History
- Profile
- Settings

## 5. Backend Modules

- Auth
- Users
- Resume
- Job Description
- Match Engine
- AI Service
- Question Generator
- Study Plan
- History
- File Upload

## 6. Database Collections

- users
- resumes
- parsed_resumes
- job_descriptions
- analyses
- question_sets
- study_plans
- history

## 7. APIs

### Auth

POST /auth/register
POST /auth/login
POST /auth/refresh

### Resume

POST /resume/upload
POST /resume/parse
GET /resume/:id

### JD

POST /jd/analyze

### Analysis

POST /analysis/match
GET /analysis/:id

### Questions

POST /questions/generate

### Study Plan

POST /study-plan/generate

### History

GET /history

## 8. Resume Pipeline

Upload -> Extract Text -> Parse Sections -> Normalize -> AI Enhancement -> Store

## 9. JD Pipeline

Paste JD -> Extract Skills -> Responsibilities -> Seniority -> Tech Stack -> Store

## 10. Match Engine

Resume + JD -> Weighted Comparison -> Explainability -> Suggestions

Outputs:

- ATS Score
- Skill Match
- Experience Match
- Missing Skills
- Strengths
- Weaknesses
- Resume Rewrite Suggestions

## 11. Interview Preparation

Generate:

- Topic-wise questions
- Easy/Medium/Hard
- Expected answer points
- Revision topics
- Resource recommendations

## 12. Study Plan

Generate personalized 7-day plan from gaps.

## 13. Frontend Architecture

App Router
Reusable UI
Feature-based folders
Shared components
API layer
Hooks
State management

## 14. Backend Architecture

Routes -> Controllers -> Services -> Repositories -> MongoDB

Background workers for AI-heavy jobs.

## 15. Security

JWT
Refresh tokens
Rate limiting
Input validation
File validation
Prompt injection safeguards

## 16. Deployment

Frontend: Vercel
Backend: Docker
MongoDB Atlas
Redis
GitHub Actions

## 17. Future Roadmap

- Voice interview
- Coding assessment
- System design prep
- Company-specific preparation
- Career analytics

## 18. Documentation to Create

- PRODUCT_REQUIREMENTS.md
- SYSTEM_ARCHITECTURE.md
- DATABASE_DESIGN.md
- API_SPEC.md
- FRONTEND_SPEC.md
- BACKEND_SPEC.md
- AI_ENGINE.md
- UI_GUIDE.md
- DEPLOYMENT.md
- TESTING.md

---

This blueprint is intentionally high-level and acts as the master roadmap. Each section should later be expanded into its own detailed specification.
