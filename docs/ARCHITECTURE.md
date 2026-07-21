# Architecture

## Why This Architecture?

### Monorepo with pnpm Workspaces

A monorepo allows all code — frontend, backend, and shared packages — to live in a single repository while maintaining clear boundaries. This eliminates version drift between frontend and backend dependencies, enables atomic commits across the stack, and simplifies refactoring.

### Separation into apps/ and packages/

```
apps/
├── frontend/ — Presentation layer (User-facing UI)
└── backend/  — API layer (HTTP server, business logic)

packages/
├── ui/      — Presentational components
├── shared/  — Utilities & constants
├── types/   — TypeScript type definitions
├── schemas/ — Zod validation schemas
├── config/  — Environment & app configuration
└── ai/      — AI-related code
```

**Why separate packages?**

- **`packages/schemas`** — Single source of truth for validation. Frontend and backend both import from here, ensuring that request/response shapes are always in sync.
- **`packages/types`** — Shared TypeScript interfaces prevent type drift between the API response types and what the frontend expects.
- **`packages/ai`** — Isolates AI prompt engineering, JSON output schemas, and parsing logic. The API layer calls `@career-copilot/ai` rather than dealing with OpenAI directly.
- **`packages/config`** — Centralizes environment loading and validation. Both apps validate their environment at startup using the same Zod schema.
- **`packages/shared`** — Constants, helpers, and utilities used across both apps.
- **`packages/ui`** — Design system components that could eventually be published independently.

### Frontend (`apps/frontend`) Architecture (Feature-Based)

```
src/
├── app/             # Next.js App Router (routes, layouts)
├── components/      # Shared UI components (layout, providers)
├── features/        # Feature modules (resume, jd, analysis, etc.)
├── hooks/           # Shared React hooks
├── services/        # API client and service functions
├── store/           # Zustand state stores
├── lib/             # Utility libraries
├── utils/           # Pure utility functions
├── constants/       # Constants and enum-like objects
├── types/           # Frontend-specific types
├── styles/          # Global CSS
└── config/          # Frontend configuration
```

**Why feature-based?** As the application grows, grouping code by feature (not by type) makes it easier to locate related files, reduces merge conflicts, and keeps modules self-contained. Each feature folder contains its own components, hooks, and API calls.

### Backend (`apps/backend`) Architecture (Layered)

```
src/
├── config/          # App configuration
├── controllers/     # Request handlers (thin — delegates to services)
├── services/        # Business logic
├── repositories/    # Data access layer (MongoDB queries)
├── routes/          # Route definitions
├── middlewares/      # Express middleware
├── models/          # Mongoose schemas
├── interfaces/      # Shared interfaces
├── types/           # Backend-specific types
├── utils/           # Utility functions
├── lib/             # Core libraries (db, ai-engine)
└── storage/         # File storage abstraction
```

**Why layered?** Controllers handle HTTP concerns, services contain business logic, repositories manage data access. This separation makes the codebase testable, maintainable, and adaptable to change.

### API Versioning

Routes are mounted under `/api/v1/` via `API_PREFIX`. This allows introducing v2 alongside v1 without breaking existing clients.

### Design System

Design tokens live in `packages/config/src/design-tokens.ts` and are consumed by the TailwindCSS theme in the frontend. This enforces visual consistency across all UI components.

---

## Implementation Progress

### ✅ Step 1 — Database Connection (index.ts → lib/db.ts)

**File:** `apps/backend/src/index.ts`

The server bootstrap now calls `connectDB()` before starting the HTTP listener:

```
loadEnv() → connectDB() → createApp() → listen()
```

`connectDB()` (in `lib/db.ts`) uses Mongoose to connect to MongoDB using `MONGODB_URI` and `MONGODB_DB_NAME` from the environment. On failure, it logs the error and exits — the server never starts without a database.

On graceful shutdown (SIGTERM/SIGINT), the server closes HTTP connections first, then calls `mongoose.disconnect()`.

**Interview Takeaway:**

- MongoDB connection is a prerequisite for the server — fail fast if DB is down.
- Graceful shutdown: close HTTP → close DB → exit, with a 10s forced shutdown fallback.

### ✅ Step 2 — Repositories (Data Access Layer)

**Files:**

- `apps/backend/src/repositories/resume-repository.ts`
- `apps/backend/src/repositories/jd-repository.ts`

Repositories are the data access layer. They wrap Mongoose operations and return typed documents. Services call repositories — controllers never touch Mongoose directly.

```
Controller → Service → Repository → Mongoose Model → MongoDB
```

Each repository exposes a consistent interface:

| Method           | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `create(data)`   | Insert a document, return it                  |
| `findAll()`      | List all documents, newest first              |
| `findById(id)`   | Find by MongoDB `_id`, return null if missing |
| `deleteById(id)` | Delete by MongoDB `_id`                       |

Since the MVP has no auth, `userId` is optional on both models. When auth is added later, it becomes required.

**Why this matters for interviews:**

- **Separation of concerns** — if you switch from MongoDB to PostgreSQL, only the repository layer changes. Controllers and services stay untouched.
- **Testability** — you can mock the repository when testing services.
- **Consistent error boundary** — all DB errors surface through one layer.

### ✅ Step 3 — AI Engine (Orchestration Layer)

**File:** `apps/backend/src/lib/ai-engine.ts`

**Model:** Google Gemini (`gemini-2.5-flash` default, `gemini-2.5-pro` for higher quality)

The AI engine is the bridge between the feature services and the LLM. It:

1. Initializes the Gemini client lazily with `GEMINI_API_KEY` from env
2. Selects the system prompt based on the operation
3. Sends the user's input with `temperature: 0.3` and `responseMimeType: 'application/json'` (forces valid JSON output)
4. Parses the raw LLM response, validates it against a Zod schema, and returns a typed object

```
Feature Service → aiEngine.analyzeResume(text)
                    ↓
                  callAI(systemPrompt, userMessage)
                    ↓
                  createAIClient(apiKey)  →  Google Generative AI SDK
                    ↓
                  model.generateContent({ systemInstruction, contents, generationConfig })
                    ↓
                  parseAIResponse(text, resumeAnalysisSchema)
                    ↓
                  Typed result (z.infer<typeof resumeAnalysisSchema>)
```

Available operations:

| Method                                    | Prompt                   | Output Schema                                                  |
| ----------------------------------------- | ------------------------ | -------------------------------------------------------------- |
| `analyzeResume(resumeText)`               | `RESUME_ANALYSIS_PROMPT` | `resumeAnalysisSchema` (score, keywords, issues, ATS rating)   |
| `analyzeJD(jdText)`                       | `JOB_DESCRIPTION_PROMPT` | `jobDescriptionSchema` (skills, responsibilities, tech stack)  |
| `analyzeSkillGap(resumeText, jdText)`     | `SKILL_GAP_PROMPT`       | `skillGapSchema` (match %, missing skills, recommendations)    |
| `generateQuestions(jdText, count)`        | `QUESTION_GEN_PROMPT`    | `questionSchema` (questions with difficulty, type, key points) |
| `generateStudyPlan(gapText, goal, weeks)` | `STUDY_PLAN_PROMPT`      | `studyPlanSchema` (weekly plans, resources, milestones)        |

**Interview takeaway:**

- `responseMimeType: 'application/json'` forces Gemini to return valid JSON — no markdown fences to strip.
- `systemInstruction` is Gemini's equivalent of OpenAI's `system` message role.
- Low temperature (0.3) for deterministic structured output.
- Structured outputs via Zod — the AI can return anything, so we validate before the app touches it.

### ✅ Step 4 — Feature Services (Business Logic)

**Files:** `apps/backend/src/services/*-service.ts`

Each controller delegates to a service, which composes the AI engine + repositories:

```
Controller → Service → aiEngine (AI analysis)
                       → Repository → MongoDB (persistence)
```

| Service              | AI Operation                                           | Repository            |
| -------------------- | ------------------------------------------------------ | --------------------- |
| `resume-service`     | `aiEngine.analyzeResume(text)` → stores parsed content | `resumeRepository`    |
| `jd-service`         | `aiEngine.analyzeJD(text)` → stores structured data    | `jdRepository`        |
| `analysis-service`   | `aiEngine.analyzeSkillGap(resume, jd)`                 | reads from both repos |
| `questions-service`  | `aiEngine.generateQuestions(jdText)`                   | reads JD from repo    |
| `study-plan-service` | `aiEngine.generateStudyPlan(gaps, goal)`               | standalone (no DB)    |

**Complete data flow for a resume upload:**

```
POST /api/v1/resume/upload (multipart file)
  → upload middleware (multer saves to ./uploads/)
  → resumeController.upload()
    → resumeService.processUpload(file)
      → extractText(filePath, mimeType)     // PDF → pdf-parse, DOCX → mammoth
      → aiEngine.analyzeResume(text)        // OpenAI → structured JSON
      → resumeRepository.create({...})      // Mongoose → MongoDB
      → resume.save({ parsedContent })      // update with AI result
      → return resume
```

**Text extraction** (`utils/text-extractor.ts`):

- PDF → `pdf-parse` v2 (async, parses text + metadata)
- DOCX/DOC → `mammoth` (extracts raw text)
- Throws on unsupported types

**Interview takeaways:**

- Services are the "brain" — they orchestrate, they don't deal with HTTP or raw DB.
- Controllers stay thin: parse the request, call a service, return the response.
- This layered architecture makes each piece independently testable and swappable.

---

### ✅ Step 5 — Frontend API Client & Dashboard Pages

**File:** `apps/frontend/src/lib/api-client.ts`

A typed API client that wraps all backend endpoints with proper TypeScript interfaces:

| Method | Endpoint | Type |
|--------|----------|------|
| `api.resume.upload(file)` | `POST /resume/upload` (multipart) | `Promise<Resume>` |
| `api.resume.list()` | `GET /resume` | `Promise<Resume[]>` |
| `api.resume.get(id)` | `GET /resume/:id` | `Promise<Resume>` |
| `api.resume.delete(id)` | `DELETE /resume/:id` | `Promise<void>` |
| `api.jd.create(data)` | `POST /jd` | `Promise<JobDescription>` |
| `api.jd.list()` | `GET /jd` | `Promise<JobDescription[]>` |
| `api.jd.get(id)` | `GET /jd/:id` | `Promise<JobDescription>` |
| `api.jd.delete(id)` | `DELETE /jd/:id` | `Promise<void>` |
| `api.analysis.skillGap(data)` | `POST /analysis/skill-gap` | `Promise<SkillGapResult>` |
| `api.analysis.resumeScore(data)` | `POST /analysis/resume-score` | `Promise<ResumeScoreResult>` |
| `api.questions.generate(data)` | `POST /questions/generate` | `Promise<{ questions: Question[] }>` |
| `api.studyPlan.generate(data)` | `POST /study-plan/generate` | `Promise<StudyPlan>` |

The client uses `NEXT_PUBLIC_API_URL` (default `http://localhost:4000/api/v1`) from frontend env. Errors are wrapped in a typed `APIError` class with `status`, `code`, `message`, and optional `details` for validation errors.

**Dashboard Pages** (under `(dashboard)` route group):

| Route | Page | Features |
|-------|------|----------|
| `/dashboard` | Overview | Stats cards linking to each tool |
| `/resume` | Resume Upload | File upload (PDF/DOCX), list view, delete, ATS scoring |
| `/job-description` | JD Input | Text input form, list view, structured data display |
| `/analysis` | Skill Gap | Select resume + JD, match % breakdown, recommendations |
| `/questions` | Questions | Select JD, configure count, filter by difficulty |
| `/study-plan` | Study Plan | Goal/duration/focus area inputs, weekly plan display |

**Interview takeaways:**

- **Typed API client** eliminates manual fetch setup and provides autocomplete across all endpoints.
- **Error classification** — validation errors, not-found errors, and server errors are distinguished by code.
- **Optimistic UI** — list pages add new items to local state immediately after successful creation.
- **`(dashboard)` route group** keeps the sidebar layout scoped to authenticated (guest) tools without affecting the landing page.
