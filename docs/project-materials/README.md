# Project Materials

**⚠️ IMPORTANT: Replace this content with YOUR actual project documentation!**

This directory is where YOU provide documentation about YOUR project. The AI will read these files to understand your domain, tech stack, and requirements.

---

## What Goes Here?

### requirements/

**Purpose:** Describe WHAT you're building

Add files that explain:
- Product Requirements Documents (PRDs)
- User stories and scenarios
- Feature specifications
- Business requirements
- Use cases
- Success criteria

**Examples of files to add:**
- `prd.md` - Main product requirements
- `user-stories.md` - User scenarios
- `features.md` - Detailed feature list
- `mvp-scope.md` - MVP definition

**Example content:**
```markdown
# Product Requirements Document

## Vision
Build a SaaS platform for...

## Target Users
- Small business owners
- Team leads
- ...

## Core Features
1. User authentication
2. Dashboard with analytics
3. ...
```

---

### architecture/

**Purpose:** Describe HOW you'll build it

Add files that explain:
- Technology stack decisions
- Architecture patterns
- API design standards
- Database schema approach
- Code organization
- Third-party integrations

**Examples of files to add:**
- `tech-stack.md` - Technologies chosen
- `architecture.md` - System architecture
- `api-design.md` - API standards
- `database-schema.md` - Data model
- `coding-standards.md` - Code style guide

**Example content:**
```markdown
# Technology Stack

## Backend
- Node.js 20 with TypeScript
- Fastify for REST API
- PostgreSQL database
- Prisma ORM

## Frontend
- Next.js 14 (App Router)
- Tailwind CSS
- React Query for data fetching

## Rationale
- TypeScript for type safety
- Fastify for performance
- ...
```

---

### design/

**Purpose:** Describe the USER EXPERIENCE

Add files that explain:
- UI/UX specifications
- Design system
- Component library
- Wireframes and mockups
- Accessibility requirements
- Responsive design approach

**Examples of files to add:**
- `design-system.md` - Colors, typography, spacing
- `component-library.md` - Reusable components
- `wireframes/` - Low-fi mockups
- `ux-flows.md` - User journeys

**Example content:**
```markdown
# Design System

## Colors
- Primary: #3B82F6 (Blue)
- Secondary: #10B981 (Green)
- Error: #EF4444 (Red)
- Background: #FFFFFF / #111827

## Typography
- Headings: Inter (Bold)
- Body: Inter (Regular)
- Code: JetBrains Mono

## Components
- Button: Rounded, 8px padding, hover state
- Input: Border, focus ring, error state
- ...
```

---

### infrastructure/

**Purpose:** Describe DEPLOYMENT and DATA

Add files that explain:
- Database choice and rationale
- Hosting decisions
- Deployment strategy
- CI/CD pipeline
- Environment management
- Monitoring and logging

**Examples of files to add:**
- `database.md` - Database choice
- `deployment.md` - Deployment strategy
- `hosting.md` - Where apps are hosted
- `cicd.md` - CI/CD pipeline
- `monitoring.md` - Observability

**Example content:**
```markdown
# Infrastructure Decisions

## Database
PostgreSQL 15 hosted on AWS RDS

**Rationale:**
- ACID compliance needed
- Complex queries
- Strong typing
- Battle-tested

## Hosting
- **API**: Docker containers on AWS ECS
- **Web**: Vercel (automatic deployments)
- **Mobile**: Expo updates + app stores

## CI/CD
- GitHub Actions for testing and deployment
- Automatic PR previews on Vercel
- Production deployments on main branch merge

## Monitoring
- Sentry for error tracking
- DataDog for metrics
- Logs aggregated in CloudWatch
```

---

## Placeholder Examples

This directory contains EXAMPLE files to show you the format:

- `requirements/EXAMPLE-prd.md`
- `architecture/EXAMPLE-tech-stack.md`
- `design/EXAMPLE-design-system.md`
- `infrastructure/EXAMPLE-database-choice.md`
- `infrastructure/EXAMPLE-deployment-strategy.md`

**⚠️ DELETE THESE and replace with YOUR actual documentation!**

---

## How This Works

### 1. You Add Documentation

Populate this directory with YOUR project docs.

### 2. AI Analyzes

When you run `pnpm projects:init`, the AI:
- Reads ALL files in this directory
- Analyzes your domain, tech stack, patterns
- Extracts conventions and requirements

### 3. AI Generates Context

Creates `docs/project-context.md` containing:
- Your project overview
- Your technology decisions
- Your coding conventions
- Your infrastructure choices

### 4. AI Uses Context

All future AI work (story development, app scaffolding, code review) uses this context to ensure consistency with YOUR project.

---

## Tips for Good Documentation

### 1. Be Specific

❌ Bad: "We'll use a database"
✅ Good: "PostgreSQL 15 for transactional data, Redis for caching"

### 2. Explain Why

Include rationale for decisions:

```markdown
## Technology: Next.js

**Rationale:**
- SEO requirements need SSR
- Team familiar with React
- Vercel deployment is seamless
- Built-in API routes reduce complexity
```

### 3. Keep It Updated

As your project evolves, update these docs and re-run:

```bash
pnpm projects:init
```

### 4. Use Markdown

All files should be `.md` (Markdown) format for easy parsing.

### 5. Include Diagrams

You can include:
- Mermaid diagrams in markdown
- Links to Figma/diagrams
- Excalidraw exports
- ASCII art

```markdown
## Architecture

\`\`\`mermaid
graph TD
    A[Web] --> B[API]
    B --> C[Database]
    B --> D[Cache]
\`\`\`
```

---

## What If I Don't Have All This?

### Minimal Setup

At minimum, provide:

1. **requirements/basic-requirements.md**
   - Brief description of what you're building
   - 3-5 core features

2. **architecture/tech-stack.md**
   - Languages/frameworks you'll use
   - Database choice

That's enough for `projects:init` to work!

### Iterative Approach

Start minimal, add details as you go:

```bash
# Week 1: Basic setup
echo "Building a task management SaaS" > requirements/overview.md
echo "Node.js, PostgreSQL, React" > architecture/tech-stack.md
pnpm projects:init

# Week 2: Add design docs
# (add design-system.md)
pnpm projects:init

# Week 3: Add infrastructure
# (add deployment.md)
pnpm projects:init
```

---

## Summary

✅ **This directory is for YOUR docs** - Not template docs
✅ **Delete the EXAMPLE files** - Replace with real content
✅ **Be specific and detailed** - More detail = better AI results
✅ **Keep it updated** - Re-run `projects:init` when docs change
✅ **Start minimal, grow over time** - Don't need everything upfront

---

**Ready to start? Delete the EXAMPLE files and add your first requirement!**

```bash
rm docs/project-materials/*/EXAMPLE-*
nano docs/project-materials/requirements/prd.md
```
