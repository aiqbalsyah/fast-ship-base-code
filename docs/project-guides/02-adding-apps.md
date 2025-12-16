# Adding Apps to Your Monorepo

This guide explains how to use `pnpm projects:add` to scaffold new applications with intelligent, context-aware defaults.

---

## Overview

The `projects:add` command creates new applications in `apps/` directory using YOUR conventions from `project-context.md`.

**Key features:**
- Interactive prompts OR CLI arguments
- Reads YOUR conventions from project-context.md
- Scaffolds apps matching YOUR tech stack
- Auto-updates workspace configuration
- Supports multiple app types and frameworks

---

## Quick Start

```bash
pnpm projects:add
```

Follow the interactive prompts to create your app.

---

## Interactive Mode

### Step-by-Step Example

```bash
$ pnpm projects:add

📱 BMAD App Scaffolder

? App name: api
? App type:
  ❯ node      (Node.js backend)
    python    (Python backend)
    react     (React web app)
    nextjs    (Next.js full-stack)
    react-native (Mobile app)
    custom    (Custom structure)

? App type: node

? Framework:
  ❯ express   (Minimal, flexible)
    fastify   (High performance)
    hono      (Modern, lightweight)

? Framework: fastify

? Description (optional): REST API for the platform
? Port (optional): 3000

✅ Creating app 'api' with Fastify...
✅ App created at apps/api/
✅ Workspace updated
✅ Run: cd apps/api && pnpm install && pnpm dev

Next steps:
1. cd apps/api
2. pnpm install
3. pnpm dev
```

---

## CLI Arguments Mode

For automation or CI/CD, use CLI arguments:

```bash
# Basic usage
pnpm projects:add --name=api --type=node --framework=express

# With all options
pnpm projects:add \
  --name=web \
  --type=react \
  --framework=vite \
  --description="Frontend dashboard" \
  --port=5173
```

**Arguments:**
- `--name` - App name (required)
- `--type` - App type (required)
- `--framework` - Framework choice (optional, will prompt if needed)
- `--description` - Brief description (optional)
- `--port` - Development port (optional)

---

## Supported App Types

### 1. Node.js Backend (`type=node`)

**Frameworks:**
- **Express** - Minimal, flexible, most popular
- **Fastify** - High performance, modern
- **Hono** - Lightweight, edge-compatible

**Scaffolds:**
```
apps/{name}/
├── src/
│   ├── routes/
│   │   └── index.ts
│   ├── middleware/
│   ├── utils/
│   └── index.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

**Usage:**
```bash
pnpm projects:add --name=api --type=node --framework=fastify
```

---

### 2. Python Backend (`type=python`)

**Frameworks:**
- **Flask** - Lightweight, simple
- **FastAPI** - Modern, async, auto-docs

**Scaffolds:**
```
apps/{name}/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── routes/
│   └── services/
├── tests/
├── requirements.txt
├── .env.example
└── README.md
```

**Usage:**
```bash
pnpm projects:add --name=api --type=python --framework=fastapi
```

---

### 3. React Web App (`type=react`)

**Frameworks:**
- **Vite** - Fast, modern (recommended)
- **Create React App (CRA)** - Classic, stable
- **Next.js** - Full-stack with SSR

**Scaffolds:**
```
apps/{name}/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts (or next.config.js)
└── README.md
```

**Usage:**
```bash
pnpm projects:add --name=web --type=react --framework=vite
```

---

### 4. Next.js Full-Stack (`type=nextjs`)

**Options:**
- **App Router** - New (Next.js 13+), recommended
- **Pages Router** - Classic, stable

**Scaffolds:**
```
apps/{name}/
├── src/
│   ├── app/              # If App Router
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── pages/            # If Pages Router
│   ├── components/
│   └── lib/
├── public/
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

**Usage:**
```bash
pnpm projects:add --name=web --type=nextjs --framework=app-router
```

---

### 5. React Native Mobile (`type=react-native`)

**Options:**
- **Bare React Native** - Full control, native modules
- **Expo** - Managed workflow, easier
- **Expo Router** - File-based routing

**Scaffolds:**
```
apps/{name}/
├── src/
│   ├── screens/
│   ├── components/
│   ├── navigation/
│   └── App.tsx
├── app/                  # If Expo Router
├── assets/
├── app.json             # If Expo
├── package.json
├── tsconfig.json
└── README.md
```

**Usage:**
```bash
pnpm projects:add --name=mobile --type=react-native --framework=expo
```

---

### 6. Custom (`type=custom`)

Minimal structure for custom app types:

**Scaffolds:**
```
apps/{name}/
├── src/
│   └── index.ts
├── package.json
└── README.md
```

You define the rest!

**Usage:**
```bash
pnpm projects:add --name=worker --type=custom
```

---

## Context-Aware Scaffolding

The scaffolder reads `project-context.md` to apply YOUR conventions:

### Naming Conventions

If your context defines:
```markdown
## Naming Convention
- Scope: @acme
- Format: @acme/app-{name}
```

Scaffolded `package.json`:
```json
{
  "name": "@acme/app-api"
}
```

### TypeScript Configuration

If your context includes TypeScript:
```markdown
## Technology Stack
- Language: TypeScript
- Strict mode: enabled
```

Scaffolded app includes:
- `tsconfig.json` with strict mode
- `.ts`/`.tsx` files (not `.js`/`.jsx`)
- TypeScript dev dependencies

### Code Style

If your context defines linting:
```markdown
## Code Style
- ESLint with Airbnb config
- Prettier with single quotes
```

Scaffolded app includes:
- `.eslintrc.json` with your config
- `.prettierrc` with your rules

### File Structure

If your context defines structure:
```markdown
## Folder Structure
- Components: kebab-case
- Group by feature, not type
```

Scaffolder adapts structure accordingly!

---

## What Gets Created

### 1. App Directory

```
apps/{name}/
```

### 2. package.json

With:
- Correct name using YOUR scope
- Scripts: `dev`, `build`, `start`, `typecheck`, `lint`
- Dependencies based on framework choice
- Workspace references to shared packages (if they exist)

### 3. Source Files

Starter files matching the framework:
- Entry point (`index.ts`, `main.py`, `App.tsx`)
- Basic routing setup
- Example components/routes
- Configuration files

### 4. Configuration Files

- TypeScript: `tsconfig.json`
- Linting: `.eslintrc.json`
- Environment: `.env.example`
- Framework configs: `vite.config.ts`, `next.config.js`, etc.

### 5. README

With:
- App description
- Tech stack
- Getting started instructions
- Available scripts

### 6. Workspace Updates

- `pnpm-workspace.yaml` already includes `apps/*`
- Dependencies auto-link after `pnpm install`

---

## Multiple Apps Example

Common pattern for a SaaS platform:

```bash
# Backend API
pnpm projects:add --name=api --type=node --framework=fastify

# Web dashboard
pnpm projects:add --name=web --type=nextjs --framework=app-router

# Mobile app
pnpm projects:add --name=mobile --type=react-native --framework=expo

# Admin panel
pnpm projects:add --name=admin --type=react --framework=vite

# Marketing site
pnpm projects:add --name=landing --type=nextjs --framework=pages-router
```

Result:
```
apps/
├── api/           (Fastify API)
├── web/           (Next.js dashboard)
├── mobile/        (Expo mobile app)
├── admin/         (Vite admin panel)
└── landing/       (Next.js marketing site)
```

---

## After Adding an App

### 1. Install Dependencies

```bash
cd apps/{name}
pnpm install
```

Or from root:
```bash
pnpm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Start Development

```bash
pnpm dev
```

### 4. Add Shared Package Dependencies

If you have shared packages:

```json
{
  "dependencies": {
    "@yourscope/shared-types": "workspace:*",
    "@yourscope/ui-components": "workspace:*"
  }
}
```

Then:
```bash
pnpm install
```

---

## Customizing Scaffolds

The scaffolder uses YOUR conventions from `project-context.md`.

**To customize:**

1. Update your documentation in `docs/project-materials/`
2. Re-run `pnpm projects:init` to regenerate context
3. New apps will use updated conventions!

**Example:**

Add to `docs/project-materials/architecture/conventions.md`:
```markdown
## App Structure Standard

All apps must include:
- `/src` directory
- `/tests` directory with Jest
- `Dockerfile` for containerization
- GitHub Actions workflow
```

After `pnpm projects:init`, new apps will include these!

---

## Troubleshooting

### "App already exists"

**Solution:** Choose a different name or delete the existing app.

### "Invalid app type"

**Solution:** Use one of: `node`, `python`, `react`, `nextjs`, `react-native`, `custom`

### "Workspace not updated"

**Solution:**
```bash
pnpm install
```

### "Shared packages not found"

**Solution:** Ensure packages exist and run:
```bash
pnpm install
```

---

## Best Practices

### 1. Descriptive Names

✅ Good: `api`, `web-dashboard`, `mobile-ios`
❌ Bad: `app1`, `test`, `new`

### 2. Consistent Frameworks

Stick to one framework per type across your project:
- All web apps: Next.js OR Vite (not both)
- All APIs: Express OR Fastify (not both)

### 3. Share Code via Packages

If multiple apps need the same code, create a shared package:

```bash
mkdir -p packages/shared-utils
cd packages/shared-utils
npm init -y
```

### 4. Document Each App

Maintain the generated README with:
- What the app does
- How to run it
- Environment variables needed
- Deployment instructions

---

## Summary

✅ Use `pnpm projects:add` for all new apps
✅ Interactive mode OR CLI arguments
✅ Scaffolding adapts to YOUR conventions
✅ Supports Node, Python, React, Next.js, React Native, custom
✅ Auto-links to shared packages
✅ Generated apps are ready to run

---

**Next**: Read `03-bmad-workflows.md` to learn about development workflows with BMAD.
