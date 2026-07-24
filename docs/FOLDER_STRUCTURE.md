# Folder Structure

## Why This Structure?

The folder structure is designed for **scalability, discoverability, and maintainability**. Every directory has a single, clear purpose, and the structure guides developers to the right place without ambiguity.

```
career-copilot-ai/
├── apps/
│   ├── frontend/                     # Next.js 15 frontend
│   │   ├── public/
│   │   │   └── favicon.svg           # Site favicon
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (dashboard)/
│   │   │   │   │   ├── layout.tsx                    # Dashboard layout wrapper
│   │   │   │   │   ├── dashboard/page.tsx            # Overview with career readiness score
│   │   │   │   │   ├── resume/page.tsx               # Resume upload, list, ATS analysis
│   │   │   │   │   ├── job-description/page.tsx      # JD create/view/delete
│   │   │   │   │   ├── analysis/page.tsx             # Skill gap analysis
│   │   │   │   │   ├── questions/page.tsx            # Interview question generation
│   │   │   │   │   └── study-plan/page.tsx           # Study plan generation
│   │   │   │   ├── layout.tsx        # Root layout (fonts, metadata, Providers)
│   │   │   │   ├── page.tsx          # Landing page (hero, how-it-works, features, FAQ, etc.)
│   │   │   │   ├── error.tsx         # Global error boundary
│   │   │   │   ├── loading.tsx       # Global loading state (spinner)
│   │   │   │   └── not-found.tsx     # 404 page
│   │   │   ├── components/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── career-readiness-score.tsx    # Animated weighted score card
│   │   │   │   ├── landing/
│   │   │   │   │   ├── hero.tsx             # Full-screen hero with resume mockup & score widget
│   │   │   │   │   ├── how-it-works.tsx     # 4-step process cards
│   │   │   │   │   ├── features.tsx         # 6 core feature cards
│   │   │   │   │   ├── feature-showcase.tsx # 4 deep-dive feature rows
│   │   │   │   │   ├── questions-preview.tsx # Sample interview questions
│   │   │   │   │   ├── study-plan-preview.tsx # Sample 14-day study plan
│   │   │   │   │   ├── faq.tsx             # Accordion FAQ (6 items)
│   │   │   │   │   ├── cta-banner.tsx      # Call-to-action banner
│   │   │   │   │   ├── footer.tsx          # 4-column footer
│   │   │   │   │   └── stats.tsx           # [Commented out] Fake data stats
│   │   │   │   ├── layout/
│   │   │   │   │   ├── dashboard-layout.tsx # Dashboard shell: sidebar + mobile header
│   │   │   │   │   ├── sidebar.tsx         # Sticky nav sidebar (7 items with icons)
│   │   │   │   │   └── site-header.tsx     # Landing page header (scroll-aware, dropdown)
│   │   │   │   ├── providers/
│   │   │   │   │   ├── providers.tsx       # QueryClient + Theme + Toast providers
│   │   │   │   │   └── theme-provider.tsx  # Light/dark/system theme context
│   │   │   │   └── ui/
│   │   │   │       ├── command-palette.tsx  # Cmd+K search modal (6 dashboard items)
│   │   │   │       ├── empty-state.tsx      # Reusable empty state placeholder
│   │   │   │       ├── file-upload-zone.tsx # Drag-and-drop upload with validation/progress
│   │   │   │       ├── info-banner.tsx      # Dismissable alert (info/success/warning/error)
│   │   │   │       ├── next-steps.tsx       # Suggested next action links
│   │   │   │       ├── score-card.tsx       # Animated score card with progress bar
│   │   │   │       └── thinking-steps.tsx   # Multi-step animated progress indicator
│   │   │   ├── features/              # Feature modules (all placeholders — actual impl in pages)
│   │   │   ├── hooks/                 # Shared React hooks (use-resume-upload, use-analysis, use-debounce)
│   │   │   ├── services/              # API client & service functions
│   │   │   ├── store/                 # Zustand stores (resume-store, analysis-store, ui-store)
│   │   │   ├── lib/                   # Typed API client (api-client.ts) + utils
│   │   │   ├── utils/                 # Pure utility functions (date, file)
│   │   │   ├── constants/             # ROUTES, QUERY_KEYS constants
│   │   │   ├── types/                 # Re-exports from @career-copilot/types
│   │   │   ├── styles/                # Global CSS (Tailwind v4 theme)
│   │   │   └── config/                # Frontend config (env.ts with Zod, site.ts)
│   │   ├── next.config.ts
│   │   ├── postcss.config.mjs
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── backend/                      # Express REST API
│       ├── src/
│       │   ├── index.ts              # Entry point (loadEnv → connectDB → createApp → listen)
│       │   ├── app.ts                # Express app factory (helmet, cors, middleware stack)
│       │   ├── config/               # App configuration
│       │   ├── controllers/          # Request handlers (thin — delegates to services)
│       │   │   ├── resume/
│       │   │   ├── jd/
│       │   │   ├── analysis/
│       │   │   ├── questions/
│       │   │   └── studyPlan/
│       │   ├── services/             # Business logic orchestration
│       │   ├── repositories/         # Data access layer (MongoDB queries)
│       │   ├── routes/
│       │   │   └── v1/               # API version 1 route definitions
│       │   ├── middlewares/          # Express middleware (error-handler, upload, validate)
│       │   ├── models/               # Mongoose models (Resume, JobDescription)
│       │   ├── interfaces/           # TypeScript interfaces (pagination, file upload)
│       │   ├── types/                # AsyncRequestHandler type
│       │   ├── utils/                # APIError class, text-extractor (PDF/DOCX)
│       │   ├── lib/                  # Core libraries (ai-engine, db, logger)
│       │   ├── storage/              # Abstract storage provider interface
│       │   └── constants/            # Allowed types, max sizes, skill categories
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── ui/                           # Shared UI components
│   │   └── src/
│   │       ├── components/           # Button, Card, Input, Toast, etc.
│   │       ├── utils/                # cn() helper (clsx + tailwind-merge)
│   │       └── hooks/               # useMediaQuery, etc.
│   │
│   ├── shared/                       # Constants, utilities, helpers
│   │   └── src/
│   │       └── index.ts
│   │
│   ├── types/                        # Shared TypeScript types
│   │   └── src/
│   │       └── index.ts
│   │
│   ├── schemas/                      # Zod validation schemas (shared FE + BE)
│   │   └── src/
│   │       └── index.ts              # envSchema, jdCreateSchema, analysisRequestSchema, etc.
│   │
│   ├── config/                       # Environment & app configuration
│   │   └── src/
│   │       ├── index.ts              # loadEnv(), getEnv() with Zod validation
│   │       └── design-tokens.ts      # Design system tokens
│   │
│   └── ai/                           # AI client, prompts, output schemas, parsers
│       └── src/
│           ├── index.ts              # Public API (callAI function)
│           ├── lib/
│           │   └── client.ts         # OpenAI SDK factory (OpenRouter endpoint)
│           ├── prompts/              # 5 system prompts
│           │   ├── resume.ts
│           │   ├── job-description.ts
│           │   ├── skill-gap.ts
│           │   ├── questions.ts
│           │   └── study-plan.ts
│           ├── schemas/
│           │   └── output.ts         # AI output Zod schemas (resumeAnalysis, skillGap, etc.)
│           └── utils/
│               └── index.ts          # Parser utilities
│
├── docs/
│   ├── ARCHITECTURE.md               # Architectural decisions
│   ├── GETTING_STARTED.md            # Setup instructions
│   └── FOLDER_STRUCTURE.md           # This file
│
├── .husky/                           # Git hooks (pre-commit, commit-msg)
├── .vscode/                          # VS Code settings
├── .github/workflows/
│   └── ci.yml                        # CI: lint → typecheck → build on Node 22
├── netlify.toml                      # Frontend deployment config (Netlify)
├── render.yaml                       # Backend deployment config (Render)
├── .editorconfig
├── .env.example                      # All env vars with defaults
├── .gitignore
├── .npmrc                            # pnpm config (shamefully-hoist, auto-install-peers)
├── .prettierrc
├── .prettierignore
├── .node-version                     # Node 20.18.0
├── commitlint.config.js
├── eslint.config.js                  # ESLint flat config (TS, React, Next.js)
├── lint-staged.config.js
├── pnpm-workspace.yaml               # packages: ["apps/*", "packages/*"]
├── package.json
└── tsconfig.json                     # Root TypeScript config
```

## Purpose of Each Top-Level Directory

| Directory          | Purpose                                |
| ------------------ | -------------------------------------- |
| `apps/frontend`    | User-facing Next.js application        |
| `apps/backend`     | Express REST API server                |
| `packages/ui`      | Reusable UI component library          |
| `packages/shared`  | Shared constants and utility functions |
| `packages/types`   | Shared TypeScript type definitions     |
| `packages/schemas` | Shared Zod validation schemas          |
| `packages/config`  | Environment loading and configuration  |
| `packages/ai`      | AI client, prompts, schemas, parsers   |
| `docs`             | Architecture and usage documentation   |

## Configuration Files

```
├── pnpm-workspace.yaml    # pnpm workspace definition
├── tsconfig.json           # Root TypeScript configuration (ES2022, strict)
├── eslint.config.js        # ESLint flat config (TS + React + Next.js)
├── .prettierrc             # Prettier configuration
├── .editorconfig           # Editor settings
├── commitlint.config.js    # Conventional commit linting
├── lint-staged.config.js   # Auto-format & lint on commit
├── .husky/                 # Git hooks
│   ├── pre-commit          # Run lint-staged before commits
│   └── commit-msg          # Validate commit messages
├── .github/workflows/      # CI/CD pipelines
│   └── ci.yml              # Lint → typecheck → build on push/PR to main
├── netlify.toml            # Netlify deployment (frontend)
└── render.yaml             # Render deployment (backend)
```
