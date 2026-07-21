# Getting Started

## Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0 (`npm install -g pnpm`)
- **MongoDB** >= 7 (local or Atlas)
- **Google Gemini API key** ([get one free at aistudio.google.com](https://aistudio.google.com))
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

Edit `.env` with your values:

| Variable         | Description               | Required         |
| ---------------- | ------------------------- | ---------------- |
| `MONGODB_URI`    | MongoDB connection string | Yes              |
| `GEMINI_API_KEY` | Google Gemini API key     | No (placeholder) |

## Development

```bash
# Start both frontend and API in development mode
pnpm dev

# Or start individually:
pnpm dev:frontend   # http://localhost:3000
pnpm dev:backend    # http://localhost:4000
```

- API Health: http://localhost:4000/api/v1/health

## Verify Setup

```bash
curl http://localhost:4000/health
# Expected: { "status": "ok", "timestamp": "..." }
```

## Development Workflow

### Adding a new feature

1. Add Zod schemas in `packages/schemas/src/`
2. Export types from `packages/types/src/`
3. Update shared constants in `packages/shared/src/`
4. Add API routes, controller, service in `apps/backend/`
5. Add API service client in `apps/frontend/src/services/`
6. Add React Query hooks in `apps/frontend/src/hooks/`
7. Build UI components in `apps/frontend/src/features/`
8. Add route pages in `apps/frontend/src/app/`

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

All checks run automatically on commit via lint-staged + husky.

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

```
feat: add resume upload feature
fix: correct ATS score calculation
docs: update API documentation
chore: upgrade dependencies
```

## Project Scripts

| Script           | Description                    |
| ---------------- | ------------------------------ |
| `pnpm dev`       | Start all apps in dev mode     |
| `pnpm build`     | Build all apps for production  |
| `pnpm lint`      | Run ESLint across all packages |
| `pnpm format`    | Format code with Prettier      |
| `pnpm typecheck` | Run TypeScript type checking   |
| `pnpm clean`     | Clean build outputs            |
