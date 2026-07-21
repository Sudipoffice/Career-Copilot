# Folder Structure

## Why This Structure?

The folder structure is designed for **scalability, discoverability, and maintainability**. Every directory has a single, clear purpose, and the structure guides developers to the right place without ambiguity.

```
career-copilot-ai/
├── apps/
│   ├── frontend/                     # Next.js 15 frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (dashboard)/
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── dashboard/page.tsx
│   │   │   │   │   ├── resume/page.tsx
│   │   │   │   │   ├── job-description/page.tsx
│   │   │   │   │   ├── analysis/page.tsx
│   │   │   │   │   ├── questions/page.tsx
│   │   │   │   │   └── study-plan/page.tsx
│   │   │   │   ├── layout.tsx        # Root layout with fonts & metadata
│   │   │   │   ├── page.tsx          # Landing page
│   │   │   │   ├── error.tsx         # Error boundary
│   │   │   │   ├── loading.tsx       # Loading state
│   │   │   │   └── not-found.tsx     # 404 page
│   │   │   ├── components/
│   │   │   │   ├── layout/           # Header, Sidebar, DashboardLayout
│   │   │   │   └── providers/        # ThemeProvider, QueryProvider, etc.
│   │   │   ├── features/              # Feature modules (future use)
│   │   │   ├── hooks/                # Shared React hooks
│   │   │   ├── services/             # API client & service functions
│   │   │   ├── store/                # Zustand stores
│   │   │   ├── lib/                  # Utility libraries (api-client.ts, utils.ts)
│   │   │   ├── utils/                # Pure utility functions
│   │   │   ├── constants/            # App constants
│   │   │   ├── types/                # TypeScript types
│   │   │   ├── styles/               # Global CSS
│   │   │   ├── assets/               # Static assets
│   │   │   └── config/               # Frontend config
│   │   ├── next.config.ts
│   │   ├── postcss.config.mjs
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── backend/                      # Express REST API
│       ├── src/
│       │   ├── config/               # App configuration
│       │   ├── controllers/          # Request handlers
│       │   ├── services/             # Business logic
│       │   ├── repositories/         # Data access layer
│       │   ├── routes/
│       │   │   └── v1/               # API version 1 routes
│       │   ├── middlewares/          # Express middleware
│       │   ├── models/               # Mongoose models
│       │   ├── interfaces/           # TypeScript interfaces
│       │   ├── types/                # TypeScript types
│       │   ├── utils/                # Utility functions
│       │   ├── constants/            # API constants
│       │   ├── lib/                  # Core libraries (db, ai-engine)
│       │   └── storage/              # File storage abstraction
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── ui/                           # Shared UI components
│   │   └── src/
│   │       ├── components/           # Button, Card, Input, etc.
│   │       ├── utils/                # cn() helper
│   │       ├── hooks/                # useMediaQuery, etc.
│   │
│   ├── shared/                       # Constants, utilities, helpers
│   │   └── src/
│   │       └── index.ts
│   │
│   ├── types/                        # Shared TypeScript types
│   │   └── src/
│   │       └── index.ts
│   │
│   ├── schemas/                      # Zod validation schemas
│   │   └── src/
│   │       └── index.ts              # Env, Resume, JD, Analysis, etc.
│   │
│   ├── config/                       # Environment & app config
│   │   └── src/
│   │       ├── index.ts              # loadEnv(), getEnv()
│   │       └── design-tokens.ts      # Design system tokens
│   │
│   └── ai/                           # AI prompts, schemas, parsers
│       └── src/
│           ├── index.ts
│           ├── lib/client.ts         # OpenAI client factory
│           ├── prompts/              # System prompts per feature
│           ├── schemas/output.ts     # AI output JSON schemas
│           └── utils/                # Parser utilities
│
├── docs/
│   ├── ARCHITECTURE.md               # Architectural decisions
│   ├── GETTING_STARTED.md            # Setup instructions
│   └── FOLDER_STRUCTURE.md           # This file
│
├── .husky/                           # Git hooks
├── .vscode/                          # VS Code settings
├── .editorconfig
├── .env.example
├── .gitignore
├── .npmrc
├── .prettierrc
├── .prettierignore
├── commitlint.config.js
├── eslint.config.js
├── lint-staged.config.js
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.json
```

### Feature Module Convention

Each feature folder can contain:

```
features/resume/
├── components/     # Feature-specific components
├── hooks/          # Feature-specific hooks
├── services/       # Feature-specific API calls
├── schemas/        # Zod validation schemas
├── types/          # Feature-specific types
└── index.ts        # Barrel export
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
| `packages/ai`      | AI client, prompts, and output schemas |
| `docs`             | Architecture and usage documentation   |

## Configuration Files

```
├── pnpm-workspace.yaml    # pnpm workspace definition
├── tsconfig.json           # Root TypeScript configuration
├── eslint.config.js        # ESLint flat config
├── .prettierrc             # Prettier configuration
├── .editorconfig           # Editor settings
├── commitlint.config.js    # Commit message linting
├── .husky/                 # Git hooks
│   ├── pre-commit          # Run lint-staged before commits
│   └── commit-msg          # Validate commit messages
└── .github/workflows/      # CI/CD pipelines (future)
```
