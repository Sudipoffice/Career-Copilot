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
├── ui/      — Presentational components (Button, Card, Input, Toast, cn())
├── shared/  — Utilities & constants
├── types/   — TypeScript type definitions
├── schemas/ — Zod validation schemas
├── config/  — Environment & app configuration
└── ai/      — AI client, prompts, schemas, parsers
```

**Why separate packages?**

- **`packages/schemas`** — Single source of truth for validation. Frontend and backend both import from here, ensuring that request/response shapes are always in sync.
- **`packages/types`** — Shared TypeScript interfaces prevent type drift between the API response types and what the frontend expects.
- **`packages/ai`** — Isolates AI prompt engineering, JSON output schemas, and parsing logic. The API layer calls `@career-copilot/ai` rather than dealing with OpenRouter directly.
- **`packages/config`** — Centralizes environment loading and validation. Both apps validate their environment at startup using the same Zod schema.
- **`packages/shared`** — Constants, helpers, and utilities used across both apps.
- **`packages/ui`** — Design system components that could eventually be published independently.

### Frontend (`apps/frontend`) Architecture

```
src/
├── app/             # Next.js App Router (routes, layouts, error/loading/404)
├── components/      # Shared UI components
│   ├── landing/     # Landing page: hero, how-it-works, features, FAQ, footer, etc.
│   ├── layout/      # SiteHeader, Sidebar, DashboardLayout
│   ├── providers/   # QueryClient, Theme, Toast providers
│   ├── ui/          # Reusable primitives: file-upload-zone, score-card, empty-state, etc.
│   └── dashboard/   # Career readiness score component
├── features/        # Feature modules (placeholders — actual implementation in pages)
├── hooks/           # Shared React hooks (use-resume-upload, use-analysis, use-debounce)
├── services/        # API service functions
├── store/           # Zustand state stores (resume, analysis, UI)
├── lib/             # Typed API client class (api-client.ts)
├── utils/           # Pure utility functions (date formatting, file validation)
├── constants/       # ROUTES and QUERY_KEYS
├── types/           # Re-exports from @career-copilot/types
├── styles/          # Tailwind CSS v4 globals
└── config/          # Zod-validated env vars, site constants
```

**Nav structure:**
- **Landing page** ( `/` ): Shows `SiteHeader` with Home, How It Works, Features links + a hover-expandable Dashboard dropdown (Resume, JD, Analysis, Questions, Plan).
- **Dashboard pages** ( `/dashboard`, `/resume`, etc. ): Shows `Sidebar` only (no top nav). Sidebar has brand logo at top and 7 items: Home, Dashboard, Resume, Job Description, Analysis, Interview Questions, Study Plan. The sidebar is `sticky top-0 h-dvh` and the main content area scrolls independently.

### Backend (`apps/backend`) Architecture (Layered)

```
src/
├── index.ts         # Entry point: loadEnv → connectDB → createApp → listen
├── app.ts           # Express app factory (middleware stack, route mounting)
├── config/          # App configuration from @career-copilot/config
├── controllers/     # Request handlers (thin — delegates to services)
├── services/        # Business logic orchestration (resume, jd, analysis, questions, study-plan)
├── repositories/    # Data access layer (MongoDB queries via Mongoose)
├── routes/v1/       # Route definitions (health, resume, jd, analysis, questions, study-plan)
├── middlewares/     # Express middleware (error-handler, validate, upload, not-found, request-id)
├── models/          # Mongoose schemas (Resume, JobDescription)
├── interfaces/      # TypeScript interfaces
├── types/           # Backend-specific types
├── utils/           # APIError class, text-extractor (PDF/DOCX)
├── lib/             # Core libraries (ai-engine, db, logger)
├── storage/         # Storage provider interface (local/S3)
└── constants/       # Allowed MIME types, max sizes, skill categories
```

**Why layered?** Controllers handle HTTP concerns, services contain business logic, repositories manage data access. This separation makes the codebase testable, maintainable, and adaptable to change.

### API Versioning

Routes are mounted under `/api/v1/` via `API_PREFIX`. This allows introducing v2 alongside v1 without breaking existing clients. A root-level `/health` endpoint is also available outside the prefix.

### AI Provider

**Model:** `deepseek/deepseek-chat-v3.1` via **OpenRouter** (OpenAI-compatible SDK).

Key configuration:
- `response_format: { type: 'json_object' }` — forces valid JSON from the LLM
- `temperature: 0.3` — low temperature for deterministic structured output
- Zod schema validation on all AI responses before they reach application code

---

## Request Flow

```
HTTP Request
  → helmet (security headers, CSP with frame-ancestors)
  → cors (configured origin, trailing slash stripped)
  → compression
  → body parsing (JSON 10mb limit, urlencoded)
  → requestId (UUID attached to req/res)
  → morgan (HTTP logging)
  → [GET /health root health check]
  → v1Router at /api/v1
     → healthRouter       (GET /health)
     → resumeRouter       (POST /upload, GET /, GET /:id, GET /:id/file, DELETE /:id)
     → jdRouter           (POST /, GET /, GET /:id, DELETE /:id)
     → analysisRouter     (POST /skill-gap, POST /resume-score)
     → questionsRouter    (POST /generate)
     → studyPlanRouter    (POST /generate)
  → notFoundHandler (404)
  → errorHandler (catches ZodError, AppError, generic errors)
```

## Data Flow Patterns

### Controller → Service → Repository

```
Controller → Service → aiEngine (AI analysis via @career-copilot/ai)
                       → Repository (MongoDB persistence)
```

### Complete Resume Upload Flow

```
POST /api/v1/resume/upload (multipart file)
  → upload middleware (Multer, validates type + size, saves to ./uploads/)
  → resumeController.upload()
    → resumeService.processUpload(file)
      → extractText(filePath, mimeType)   // PDF → pdf-parse, DOCX → mammoth
      → aiEngine.analyzeResume(text)      // OpenRouter → structured JSON
      → resumeRepository.create({...})    // Save to MongoDB
      → return resume
```

### Skill Gap Analysis Flow

```
POST /api/v1/analysis/skill-gap { resumeId, jdId }
  → analysisController.analyzeSkillGap()
    → analysisService.analyzeSkillGap({ resumeId, jdId })
      → resumeRepository.findById(resumeId)    // Load resume
      → jdRepository.findById(jdId)            // Load JD
      → aiEngine.analyzeSkillGap(resumeText, jdText)  // AI comparison
      → return SkillGapResult
```

---

## Frontend - Key Patterns

### API Client (`src/lib/api-client.ts`)

A typed API client class that wraps all 12 backend endpoints. Key features:
- Uses `NEXT_PUBLIC_API_URL` (default `http://localhost:4000/api/v1`)
- Typed `APIError` class with `status`, `code`, `message`, optional `details`
- Methods organized by domain: `api.resume.*`, `api.jd.*`, `api.analysis.*`, `api.questions.*`, `api.studyPlan.*`

### Data Fetching

TanStack React Query for server state. Configuration:
- `staleTime: 5 * 60 * 1000` (5 minutes)
- `retry: 1`
- `refetchOnWindowFocus: false`

### Client State

Zustand stores for:
- `resume-store.ts` — selected resume ID
- `analysis-store.ts` — selected JD ID
- `ui-store.ts` — sidebar open state

---

## Database Models

### Resume
| Field         | Type     | Description                    |
| ------------- | -------- | ------------------------------ |
| `userId`      | string?  | Optional user association      |
| `fileName`    | string   | Original filename              |
| `filePath`    | string   | Path on disk                   |
| `fileSize`    | number   | Size in bytes                  |
| `mimeType`    | string   | MIME type (pdf, docx)          |
| `parsedContent`| object? | AI analysis result (ATS score, keywords, etc.) |
| `createdAt`   | Date     | Auto-generated                 |
| `updatedAt`   | Date     | Auto-generated                 |

### Job Description
| Field            | Type     | Description                    |
| ---------------- | -------- | ------------------------------ |
| `userId`         | string?  | Optional user association      |
| `title`          | string   | Job title                      |
| `company`        | string?  | Company name                   |
| `rawText`        | string   | Raw JD text                    |
| `structuredData` | object?  | AI-extracted structured data   |
| `createdAt`      | Date     | Auto-generated                 |
| `updatedAt`      | Date     | Auto-generated                 |

---

## AI Output Schemas

All AI responses are validated against Zod schemas in `packages/ai/src/schemas/output.ts`:

| Schema                   | Key Fields                                                                 |
| ------------------------ | -------------------------------------------------------------------------- |
| `resumeAnalysisSchema`   | overallScore, missingKeywords[], formattingIssues[], atsRating, improvements[] |
| `jobDescriptionSchema`   | title, level?, requiredSkills[], preferredSkills[], responsibilities[], technologies[] |
| `skillGapSchema`         | matchingSkills[], missingSkills[], matchPercentage, recommendations[], resumeSuggestions[] |
| `questionSchema`         | questions[{ text, type, difficulty, skillTested, keyPoints[] }]           |
| `studyPlanSchema`        | goal, totalWeeks, weeklyPlans[{ week, topic, duration, resources[], milestones[] }] |

---

## Security

- **Helmet** with CSP including `frame-ancestors` set to `CORS_ORIGIN` (allows PDF iframe preview)
- **CORS** configured with trailing-slash-stripped origin
- **Multer** validates file type (PDF/DOCX only) and size (10MB max)
- **Zod** validates all request bodies/query params
- **No authentication in MVP** — `userId` is optional on all models

---

## Deployment

| Service  | Host     | Config File        | Build Command                                       |
| -------- | -------- | ------------------ | --------------------------------------------------- |
| Frontend | Netlify  | `netlify.toml`     | `pnpm install && pnpm build && cp -r public/. .next/` |
| Backend  | Render   | `render.yaml`      | `pnpm install --frozen-lockfile`                    |

### Frontend (Netlify)
- Publish directory: `apps/frontend/.next`
- Global security headers via `[[headers]]`
- Public assets copied to `.next/` during build for favicon to work

### Backend (Render)
- Free plan, Node runtime
- Health check: `/health`
- Secrets set via Render dashboard: `MONGODB_URI`, `OPENROUTER_API_KEY`, `CORS_ORIGIN`
- Started with `pnpm --filter @career-copilot/api start:prod` (runs `tsx src/index.ts`)

### CI (GitHub Actions)
- Triggered on push/PR to `main`
- Steps: install → lint → typecheck → build
- Node 22, pnpm with caching

---

## Design System

- **Brand:** Primary `#F97316` (orange-500), warm white `#fafaf9` (stone-50)
- **Typography:** Playfair Display (serif headings), Inter (sans body)
- **Components:** Built on Radix UI primitives via `packages/ui`
- **Utility:** `cn()` from `packages/ui` (clsx + tailwind-merge)
- **CSS:** Tailwind CSS v4 with `@import "tailwindcss"`, custom theme variables in `globals.css`
