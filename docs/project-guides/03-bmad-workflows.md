# BMAD Workflows Integration

This guide explains how to use BMAD (Build, Measure, Manage) workflows with your fast-ship monorepo for AI-assisted development.

---

## What is BMAD?

**BMAD** is an AI-native development methodology that uses Claude Code for systematic, story-driven development.

**Official Resources:**
- **[BMAD Method Repository](https://github.com/bmad-code-org/BMAD-METHOD)** - Official methodology and documentation
- **[Claude Code](https://claude.ai/claude-code)** - AI development environment

### BMAD Capabilities

BMAD enables AI-assisted development through:
- Analyze requirements and generate implementation plans
- Create detailed development stories
- Execute stories with AI assistance
- Review code and ensure quality
- Track progress systematically

---

## BMAD in This Template

This template integrates BMAD workflows through:

1. **project-context.md** - The "bible" that guides all AI work
2. **Story creation** - `pnpm create:story` command
3. **Development workflows** - BMAD BMM workflows
4. **Documentation structure** - Organized for AI analysis

---

## Core Workflows

### 1. Project Initialization

**Command:** `pnpm projects:init`

**What it does:**
- Analyzes YOUR documentation in `docs/project-materials/`
- Generates `docs/project-context.md` with:
  - Project domain and context
  - Technology stack decisions
  - Coding conventions
  - Architecture patterns
  - Infrastructure choices

**When to use:**
- Initial project setup
- After major architecture changes
- When updating conventions

**Example:**
```bash
# Add your docs to project-materials/
pnpm projects:init

# Review generated context
cat docs/project-context.md
```

---

### 2. Story Creation

**Command:** `pnpm create:story`

**What it does:**
- Creates a new BMAD story file
- Includes standard structure:
  - User story
  - Acceptance criteria
  - Technical design
  - Tasks checklist
  - Testing requirements

**When to use:**
- Planning a new feature
- Breaking down an epic
- Documenting a bug fix
- Creating a refactoring task

**Example:**
```bash
$ pnpm create:story

📝 BMAD Story Creator

? Story title: Add user authentication API
? App/scope: api
? Brief overview: Implement JWT-based auth endpoints

✅ Story created at apps/api/docs/stories/add-user-authentication-api.md
```

**Story structure:**
```markdown
---
id: add-user-authentication-api
title: Add User Authentication API
app: api
status: draft
---

# Add User Authentication API

## Overview
Implement JWT-based auth endpoints

## User Story
As a user,
I want to authenticate via API,
So that I can access protected resources.

## Acceptance Criteria
- [ ] POST /auth/register creates new user
- [ ] POST /auth/login returns JWT token
- [ ] GET /auth/me returns current user
- [ ] Invalid credentials return 401

## Technical Design
...
```

---

### 3. Story Development

**Command:** `/bmad:bmm:workflows:dev-story <story-file>`

**What it does:**
- Reads the story file
- Reads `project-context.md` for conventions
- Implements the story following acceptance criteria
- Writes tests
- Updates the story file with progress

**When to use:**
- Implementing a planned story
- AI-assisted feature development

**Example:**
```bash
# Via Claude Code
/bmad:bmm:workflows:dev-story apps/api/docs/stories/add-user-authentication-api.md

# Or if you have a custom script:
pnpm dev:story apps/api/docs/stories/add-user-authentication-api.md
```

---

### 4. Code Review

**Command:** `/bmad:bmm:workflows:code-review`

**What it does:**
- Reviews recent code changes
- Checks against project conventions
- Identifies issues:
  - Code quality problems
  - Security vulnerabilities
  - Performance issues
  - Convention violations
- Provides specific fixes

**When to use:**
- After implementing a story
- Before creating a pull request
- Periodic quality checks

**Example:**
```bash
# Via Claude Code
/bmad:bmm:workflows:code-review

# Or with specific files:
/bmad:bmm:workflows:code-review apps/api/src/routes/auth.ts
```

---

## Story-Driven Development

### Workflow Pattern

```
1. Requirements → docs/project-materials/
2. Initialize → pnpm projects:init
3. Create story → pnpm create:story
4. Implement → /bmad:bmm:workflows:dev-story
5. Review → /bmad:bmm:workflows:code-review
6. Test → pnpm test
7. Commit → git commit
8. Repeat
```

### Example: Full Feature Implementation

```bash
# 1. Add feature requirements
echo "## User Authentication
- JWT-based auth
- Email/password registration
- Protected routes
" > docs/project-materials/requirements/auth-feature.md

# 2. Update project context
pnpm projects:init

# 3. Create story
pnpm create:story
# Title: Implement user authentication
# App: api
# Overview: JWT auth with register/login endpoints

# 4. Develop the story (via Claude Code)
/bmad:bmm:workflows:dev-story apps/api/docs/stories/implement-user-authentication.md

# 5. Review the code
/bmad:bmm:workflows:code-review

# 6. Test
cd apps/api
pnpm test

# 7. Commit
git add .
git commit -m "feat(api): add user authentication"
```

---

## Project Context as the "Bible"

The `docs/project-context.md` file is critical. It contains:

### What's in project-context.md

1. **Project Overview**
   - Domain and purpose
   - Business context
   - Target users

2. **Technology Stack**
   - Languages and frameworks
   - Libraries and tools
   - Version requirements

3. **Database & Infrastructure**
   - Database choice and schema approach
   - Hosting and deployment
   - Infrastructure patterns

4. **Architecture Patterns**
   - Code organization
   - Design patterns used
   - API design standards

5. **Coding Conventions**
   - Naming conventions
   - File structure
   - Code style rules

6. **Workflows**
   - Development process
   - Testing requirements
   - Deployment procedure

### Why It Matters

Every BMAD workflow reads this file to ensure:
- ✅ New code follows YOUR conventions
- ✅ Implementations match YOUR architecture
- ✅ Code quality meets YOUR standards
- ✅ Everything is consistent across the monorepo

### Keeping It Updated

```bash
# After major changes to requirements/architecture
pnpm projects:init

# Manual edits (if needed)
nano docs/project-context.md
```

---

## Story Organization

### Where Stories Live

**App-specific stories:**
```
apps/api/docs/stories/
apps/web/docs/stories/
apps/mobile/docs/stories/
```

**Cross-cutting stories:**
```
docs/stories/
```

### Story Naming

Use kebab-case with descriptive names:

✅ Good:
- `add-user-authentication.md`
- `implement-payment-processing.md`
- `refactor-database-layer.md`

❌ Bad:
- `story1.md`
- `task.md`
- `fix.md`

---

## Integration with Git

### Branch per Story

```bash
# Create story
pnpm create:story
# Title: Add product search

# Create branch
git checkout -b feature/add-product-search

# Implement
/bmad:bmm:workflows:dev-story docs/stories/add-product-search.md

# Commit
git add .
git commit -m "feat: add product search"

# Push
git push origin feature/add-product-search
```

### Commit Messages

Follow conventional commits:

```
feat(api): add user authentication endpoints
fix(web): resolve dashboard loading issue
refactor(shared): simplify type definitions
docs: update API documentation
test(api): add auth endpoint tests
```

---

## Custom Workflows

You can create custom BMAD workflows in `.bmad/bmm/workflows/`:

### Example: Custom Deploy Workflow

```bash
mkdir -p .bmad/bmm/workflows/deploy
nano .bmad/bmm/workflows/deploy/workflow.md
```

Add workflow definition following BMAD patterns.

Then use via Claude Code:
```bash
/bmad:bmm:workflows:deploy
```

---

## Tips for Effective BMAD Usage

### 1. Detailed Stories

The more detail in your story, the better the AI implementation:

❌ Bad story:
```markdown
## Overview
Add authentication

## Tasks
- [ ] Do auth stuff
```

✅ Good story:
```markdown
## Overview
Implement JWT-based authentication with email/password registration,
login, and protected route middleware.

## Acceptance Criteria
- [ ] POST /auth/register validates email format
- [ ] POST /auth/register hashes passwords with bcrypt
- [ ] POST /auth/login returns JWT token (7-day expiry)
- [ ] Middleware verifies JWT and attaches user to req.user
- [ ] Invalid tokens return 401 with clear error message

## Technical Design
- Use jsonwebtoken library
- Store JWT secret in environment variable
- Hash passwords with bcrypt (10 rounds)
- Token payload: { userId, email }
```

### 2. Reference project-context.md

When writing stories, reference conventions from project-context.md:

```markdown
## Technical Design
Follow API patterns defined in project-context.md:
- Error handling middleware
- Response format: { success, data, error }
- Logging with Winston
```

### 3. Incremental Stories

Break large features into small stories:

Instead of:
- "Build entire e-commerce platform"

Do:
- "Add product listing API"
- "Add product detail API"
- "Add shopping cart API"
- "Add checkout API"

### 4. Test Coverage in Stories

Include testing requirements:

```markdown
## Testing
- [ ] Unit test: register with valid data succeeds
- [ ] Unit test: register with invalid email fails
- [ ] Unit test: login with correct password succeeds
- [ ] Unit test: login with wrong password fails
- [ ] Integration test: full register → login flow
```

---

## BMAD + Monorepo Best Practices

### 1. Shared Stories

For changes affecting multiple apps:

```markdown
# docs/stories/update-user-type-definition.md

## Overview
Update User type to include avatarUrl field

## Apps Affected
- @myproject/shared-types (source)
- @myproject/app-api (usage)
- @myproject/app-web (usage)

## Tasks
- [ ] Update User interface in shared-types
- [ ] Update API user responses
- [ ] Update web UI user display
- [ ] Update tests in all affected apps
```

### 2. Dependencies Between Stories

Document prerequisites:

```markdown
## Dependencies
- Requires: implement-user-authentication.md (completed)
- Blocks: add-user-profile-page.md
```

### 3. Epic Management

Use epics to group related stories:

```
docs/epics/user-management-system.md
├── stories/add-user-authentication.md
├── stories/add-user-profile.md
├── stories/add-user-settings.md
└── stories/add-user-roles.md
```

---

## Summary

✅ **project-context.md** - The AI's guide to YOUR project
✅ **pnpm create:story** - Create structured development stories
✅ **dev-story workflow** - AI-assisted implementation
✅ **code-review workflow** - Automated quality checks
✅ **Story-driven** - Plan first, implement second
✅ **Monorepo-aware** - Handle cross-app changes

---

## Next Steps

1. ✅ Create your first story: `pnpm create:story`
2. ✅ Implement it: `/bmad:bmm:workflows:dev-story <file>`
3. ✅ Review code: `/bmad:bmm:workflows:code-review`
4. ✅ Iterate and ship!

**Happy building with BMAD! 🚀**
