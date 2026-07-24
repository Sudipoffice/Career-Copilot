# Career Copilot AI

> AI-powered career preparation platform that helps users improve their resumes, analyze job descriptions, identify skill gaps, generate ATS-friendly suggestions, create personalized interview questions, and build study plans.

## Architecture

This project uses a **pnpm workspace monorepo** with two application packages and six shared packages.

```
career-copilot-ai/
├── apps/
│   ├── frontend/    # Next.js 15 frontend (App Router)
│   └── backend/     # Express REST API
├── packages/
│   ├── ui/          # Shared UI component library
│   ├── shared/      # Constants, utilities, helpers
│   ├── types/       # Shared TypeScript type definitions
│   ├── schemas/     # Shared Zod validation schemas
│   ├── config/      # Environment and app configuration
│   └── ai/          # AI prompts, JSON schemas, parsers
├── docs/
├── netlify.toml     # Netlify deployment config (frontend)
└── render.yaml      # Render deployment config (backend)
```

## Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9 (install with `npm install -g pnpm`)
- **MongoDB** >= 7 (local or Atlas)
- **OpenRouter API key** ([get one free](https://openrouter.ai/keys))

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your MONGODB_URI and OPENROUTER_API_KEY

# Start development servers (frontend + backend concurrently)
pnpm dev
```

- Frontend: http://localhost:3000
- API: http://localhost:4000
- Health: http://localhost:4000/health or http://localhost:4000/api/v1/health

## Project Principles

1. **Feature-based architecture** — code is organized by feature, not by technical role.
2. **Shared validation** — Zod schemas live in `packages/schemas` and are consumed by both frontend and backend.
3. **Separation of concerns** — each package has a single responsibility.
4. **Type safety first** — strict TypeScript with full type coverage across the monorepo.
5. **Scalable foundation** — architecture supports adding new features without restructuring.

## Scripts

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `pnpm dev`           | Start both apps in development mode      |
| `pnpm dev:frontend`  | Start frontend only                      |
| `pnpm dev:backend`   | Start backend only                       |
| `pnpm build`         | Build frontend for production            |
| `pnpm build:all`     | Build all packages and apps              |
| `pnpm lint`          | Run ESLint across the monorepo           |
| `pnpm typecheck`     | Run TypeScript type checking             |
| `pnpm format`        | Format code with Prettier                |
| `pnpm clean`         | Clean build outputs                      |

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS v4, Framer Motion, TanStack Query, Zustand, Lucide Icons
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose, Multer, Helmet
- **Validation**: Zod (shared between frontend and backend)
- **AI**: OpenRouter (DeepSeek Chat V3.1) via OpenAI SDK — `response_format: json_object`, temperature 0.3
- **File Processing**: PDF (pdf-parse), DOCX (mammoth)
- **Code Quality**: ESLint, Prettier, Husky, lint-staged, commitlint

## Deployment

| Service  | URL                                          | Host     |
| -------- | -------------------------------------------- | -------- |
| Frontend | https://career-copilotai.netlify.app         | Netlify  |
| Backend  | https://career-copilot-vrs7.onrender.com     | Render   |

- **Frontend**: Built with `next build`, published from `apps/frontend/.next/`. Public assets copied to `.next/` during build. Global security headers via `netlify.toml`.
- **Backend**: Started with `tsx src/index.ts` (no compile step). Health check at `/health`. Secrets set via Render dashboard (`MONGODB_URI`, `OPENROUTER_API_KEY`, `CORS_ORIGIN`).

## API Endpoints

All under `/api/v1/`:

| Method | Endpoint                          | Description                        |
| ------ | --------------------------------- | ---------------------------------- |
| GET    | `/health`                         | Health check                       |
| POST   | `/resume/upload`                  | Upload & analyze resume (PDF/DOCX) |
| GET    | `/resume`                         | List all resumes                   |
| GET    | `/resume/:id`                     | Get resume details                 |
| GET    | `/resume/:id/file`                | Download resume file               |
| DELETE | `/resume/:id`                     | Delete resume                      |
| POST   | `/jd`                             | Create & analyze job description   |
| GET    | `/jd`                             | List all JDs                       |
| GET    | `/jd/:id`                         | Get JD details                     |
| DELETE | `/jd/:id`                         | Delete JD                          |
| POST   | `/analysis/skill-gap`             | Analyze skill gap (resume vs JD)   |
| POST   | `/analysis/resume-score`          | Score a single resume              |
| POST   | `/questions/generate`             | Generate interview questions       |
| POST   | `/study-plan/generate`            | Generate study plan                |
