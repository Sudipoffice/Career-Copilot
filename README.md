# Career Copilot AI

> AI-powered career preparation platform that helps users improve their resumes, analyze job descriptions, identify skill gaps, generate ATS-friendly suggestions, create personalized interview questions, and build study plans.

## Architecture

This project uses a **pnpm workspace monorepo** with two application packages and six shared packages.

```
career-copilot-ai/
├── apps/
│   ├── web/          # Next.js 15 frontend (App Router)
│   └── api/          # Express REST API
├── packages/
│   ├── ui/           # Shared UI component library
│   ├── shared/       # Constants, utilities, helpers
│   ├── types/        # Shared TypeScript type definitions
│   ├── schemas/      # Shared Zod validation schemas
│   ├── config/       # Environment and app configuration
│   └── ai/           # AI prompts, JSON schemas, parsers
└── docs/
```

## Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9 (install with `npm install -g pnpm`)
- **MongoDB** >= 7 (local or Atlas)

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development servers (web + api concurrently)
pnpm dev
```

- Frontend: http://localhost:3000
- API: http://localhost:4000
- Health check: http://localhost:4000/health

## Project Principles

1. **Feature-based architecture** — code is organized by feature, not by technical role.
2. **Shared validation** — Zod schemas live in `packages/schemas` and are consumed by both frontend and backend.
3. **Separation of concerns** — each package has a single responsibility.
4. **Type safety first** — strict TypeScript with full type coverage across the monorepo.
5. **Scalable foundation** — architecture supports adding new features without restructuring.

## Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | Start all apps in development mode |
| `pnpm dev:web`   | Start frontend only                |
| `pnpm dev:api`   | Start API only                     |
| `pnpm build`     | Build all packages and apps        |
| `pnpm lint`      | Run ESLint across the monorepo     |
| `pnpm typecheck` | Run TypeScript type checking       |
| `pnpm format`    | Format code with Prettier          |

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS v4, shadcn/ui, TanStack Query, Zustand
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose
- **Validation**: Zod (shared between frontend and backend)
- **AI**: OpenAI SDK
- **Future**: Redis, BullMQ, AWS S3
