# Getting Started

## Prerequisites

- **Node.js** >= 20.0.0 (see `.node-version`)
- **pnpm** >= 9.0.0 (`npm install -g pnpm`)
- **MongoDB** >= 7 (local or Atlas)
- **OpenRouter API key** ([get one free at openrouter.ai/keys](https://openrouter.ai/keys))
- **Git**

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd career-copilot-ai

# Install all dependencies
pnpm install
```

## Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your values. The only required variables:

| Variable            | Description               | Required             |
| ------------------- | ------------------------- | -------------------- |
| `MONGODB_URI`       | MongoDB connection string | Yes                  |
| `OPENROUTER_API_KEY`| OpenRouter API key        | Yes (no default)     |

All other variables have sensible defaults for local development (see `.env.example`).

## Development

```bash
# Start both frontend and API concurrently
pnpm dev

# Or start individually:
pnpm dev:frontend   # http://localhost:3000
pnpm dev:backend    # http://localhost:4000
```

- Frontend: http://localhost:3000
- API: http://localhost:4000
- Health check: http://localhost:4000/health or http://localhost:4000/api/v1/health

## Verify Setup

```bash
# Check health
curl http://localhost:4000/health
# Expected: { "status": "ok", "timestamp": "2025-01-01T00:00:00.000Z" }

# Open the app in your browser
open http://localhost:3000
```

## Development Workflow

### Adding a new feature

1. Add Zod schemas in `packages/schemas/src/`
2. Export types from `packages/types/src/`
3. Update shared constants in `packages/shared/src/`
4. Add API routes, controller, service in `apps/backend/`
5. Add API service client in `apps/frontend/src/services/`
6. Add React Query hooks in `apps/frontend/src/hooks/`
7. Build UI components in `apps/frontend/src/components/`
8. Add route page in `apps/frontend/src/app/`

## Code Quality

```bash
# Lint all packages
pnpm lint

# Format all files
pnpm format

# Type-check all packages
pnpm typecheck

# Clean build outputs
pnpm clean
```

All checks run automatically on commit via lint-staged + husky (ESLint + Prettier).

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

```
feat: add resume upload feature
fix: correct ATS score calculation
docs: update API documentation
chore: upgrade dependencies
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`
Allowed scopes: `web`, `api`, `ui`, `shared`, `types`, `schemas`, `config`, `ai`, `docs`, `root`

## Project Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `pnpm dev`         | Start both apps in dev mode              |
| `pnpm dev:frontend`| Start frontend only (port 3000)          |
| `pnpm dev:backend` | Start backend only (port 4000)           |
| `pnpm build`       | Build frontend for production            |
| `pnpm build:all`   | Build all packages and apps              |
| `pnpm lint`        | Run ESLint across all packages           |
| `pnpm format`      | Format code with Prettier                |
| `pnpm typecheck`   | Run TypeScript type checking             |
| `pnpm clean`       | Clean build outputs                      |

## Deployment

### Frontend (Netlify)

```bash
pnpm build
# Output: apps/frontend/.next/
```

Deployed at: https://career-copilotai.netlify.app

### Backend (Render)

```bash
pnpm --filter @career-copilot/api start:prod
```

Deployed at: https://career-copilot-vrs7.onrender.com

Set these secrets in the Render dashboard:
- `MONGODB_URI`
- `OPENROUTER_API_KEY`
- `CORS_ORIGIN` (set to the frontend URL)
