# Getting Started with Fast-Ship Base Code

Welcome to your domain-agnostic monorepo template! This guide will walk you through setting up your project from scratch.

---

## Philosophy

This template is built on four core principles:

1. **Domain-Agnostic** - No assumptions about your project type
2. **Docs-First** - Documentation drives AI analysis and code generation
3. **AI-Native** - Intelligent scaffolding based on YOUR requirements
4. **Infrastructure Flexible** - Support for any tech stack or deployment strategy

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** ≥ 18.0.0 ([Download](https://nodejs.org/))
- **PNPM** ≥ 8.0.0 (`npm install -g pnpm`)
- **BMAD** installed and configured ([BMAD Setup](https://github.com/anthropics/claude-code))
- Basic understanding of monorepo concepts

---

## Setup Steps

### Step 1: Get the Template

```bash
# Option A: Clone/copy the template
cp -r /path/to/fast-ship-base-code my-project
cd my-project

# Option B: If it's a git repo
git clone <repo-url> my-project
cd my-project
```

### Step 2: Understand the Structure

Your template contains:

```
my-project/
├── docs/project-materials/    # 👈 YOU populate this with YOUR docs
├── docs/project-guides/        # Template guides (already done)
├── apps/                       # Your apps (created by projects:add)
├── packages/                   # Shared packages
└── scripts/                    # Automation scripts
```

### Step 3: Add YOUR Documentation

This is the MOST IMPORTANT step. The AI needs to understand YOUR project.

Navigate to `docs/project-materials/` and replace the EXAMPLE files with YOUR actual documentation:

#### Requirements (`docs/project-materials/requirements/`)

Add files that describe WHAT you're building:

- Product Requirements Document (PRD)
- User stories
- Feature specifications
- Business requirements

**Example:**
```markdown
# My SaaS Platform PRD

## Overview
A subscription-based platform for managing...

## Features
- User authentication
- Dashboard with analytics
- Payment processing
- ...
```

#### Architecture (`docs/project-materials/architecture/`)

Add files that describe HOW you'll build it:

- Technology stack decisions
- Architecture diagrams
- API design
- Data flow
- Coding standards

**Example:**
```markdown
# Technology Stack

## Backend
- Node.js with TypeScript
- Express.js for REST API
- PostgreSQL database

## Frontend
- Next.js 14 (App Router)
- Tailwind CSS
- ...
```

#### Design (`docs/project-materials/design/`)

Add files that describe the USER EXPERIENCE:

- UI/UX specifications
- Design system
- Wireframes
- Component library decisions

**Example:**
```markdown
# Design System

## Colors
- Primary: #3B82F6
- ...

## Typography
- Headings: Inter
- ...
```

#### Infrastructure (`docs/project-materials/infrastructure/`)

Add files that describe your DEPLOYMENT and DATA:

- Database choice and rationale
- Deployment strategy
- Hosting decisions
- Infrastructure-as-code

**Example:**
```markdown
# Infrastructure Decisions

## Database
PostgreSQL hosted on AWS RDS

## Hosting
- API: Docker containers on AWS ECS
- Web: Vercel
- Mobile: Expo updates + app stores

## CI/CD
GitHub Actions
```

### Step 4: Initialize Your Project

Once you've added your documentation, run:

```bash
pnpm install
pnpm projects:init
```

**What happens:**
1. AI reads ALL your documentation
2. Analyzes your domain, tech stack, conventions
3. Generates `docs/project-context.md` - your project's "bible"

**Check the output:**
```bash
cat docs/project-context.md
```

This file should contain:
- Your project overview
- Your technology decisions
- Your coding conventions
- Your infrastructure choices

### Step 5: Add Your First App

Now you can start scaffolding apps:

```bash
pnpm projects:add
```

Interactive prompts will ask:
- App name (e.g., "api", "web", "mobile")
- App type (Node.js, Python, React, React Native, etc.)
- Framework (Express, Fastify, Next.js, Expo, etc.)

**Example flow:**
```
? App name: api
? App type: node
? Framework: express
? Description: REST API for the platform
✅ App created at apps/api/
```

The scaffolded app will use YOUR conventions from project-context.md!

### Step 6: Verify Setup

```bash
# Check structure
ls -la apps/

# Install dependencies
pnpm install

# Try running (if app has dev script)
cd apps/api
pnpm dev
```

### Step 7: Create Stories and Start Building

Use BMAD workflows to create development stories:

```bash
# Create a story
pnpm create:story

# Or use BMAD workflows
/bmad:bmm:workflows:dev-story <story-file>
```

---

## Common Workflows

### Adding More Apps

```bash
pnpm projects:add
```

Add as many apps as you need:
- `apps/api` - Backend API
- `apps/web` - Web dashboard
- `apps/mobile` - Mobile app
- `apps/admin` - Admin panel
- `apps/landing` - Marketing site

### Creating Shared Packages

Manually create shared packages:

```bash
mkdir -p packages/shared
cd packages/shared
npm init -y
```

Then reference them in your apps:
```json
{
  "dependencies": {
    "@myproject/shared": "workspace:*"
  }
}
```

### Running All Apps

```bash
pnpm dev          # Run all apps in parallel
pnpm build        # Build all apps
pnpm typecheck    # Type check everything
```

---

## Tips for Success

### 1. **Be Specific in Documentation**

The more detailed your docs, the better the AI understands your project.

❌ Bad: "We need authentication"
✅ Good: "JWT-based authentication with refresh tokens, using Firebase Auth for social logins"

### 2. **Update project-context.md**

As your project evolves, update the context:

```bash
# Re-run init to regenerate context
pnpm projects:init
```

### 3. **Use BMAD Workflows**

Leverage BMAD for:
- Story creation (`pnpm create:story`)
- Development (`/bmad:bmm:workflows:dev-story`)
- Code review (`/bmad:bmm:workflows:code-review`)

### 4. **Keep Docs in Sync**

Update `docs/project-materials/` as requirements change. The AI relies on this!

---

## Troubleshooting

### "projects:init" fails

**Cause**: Missing or insufficient documentation
**Solution**: Add more detail to `docs/project-materials/`

### "projects:add" creates wrong structure

**Cause**: project-context.md doesn't reflect your conventions
**Solution**: Update documentation and re-run `pnpm projects:init`

### Apps not linking to shared packages

**Cause**: Workspace not configured or dependencies not installed
**Solution**:
```bash
pnpm install
```

---

## Next Steps

1. ✅ Read `01-monorepo-conventions.md` to understand naming and structure
2. ✅ Read `02-adding-apps.md` for detailed app scaffolding guide
3. ✅ Read `03-bmad-workflows.md` to learn BMAD integration
4. ✅ Start building your first feature!

---

## Questions?

Check the other guides:
- `01-monorepo-conventions.md` - Naming, structure, patterns
- `02-adding-apps.md` - App scaffolding details
- `03-bmad-workflows.md` - BMAD workflow integration

**Happy shipping! 🚀**
