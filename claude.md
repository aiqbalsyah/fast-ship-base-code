# Claude Code Project Context

This is a **Fast-Ship Base Code** monorepo template - a domain-agnostic starter for rapid AI-assisted development using BMAD methodology.

---

## 🎯 Project Type

**Template Repository** - This is NOT a specific application. It's a clean starter template that users clone to begin new projects.

**Key Principle:** Domain-agnostic, zero assumptions about features or business logic.

---

## 📁 Project Structure

```
fast-ship-base-code/
├── .bmad/                    # Full BMAD installation
├── .claude/                  # Claude Code configuration
├── .vscode/                  # VS Code workspace settings
├── .github/                  # GitHub Copilot configuration
├── docs/
│   ├── project-guides/       # User guides (DO NOT MODIFY)
│   ├── project-materials/    # PLACEHOLDER examples (users replace)
│   └── templates/            # Story/epic templates
├── apps/                     # Empty (users add via projects:add)
├── packages/                 # Empty (users add as needed)
└── scripts/
    ├── create-story.js       # Manual BMAD story creator
    ├── init-project.js       # ✅ Analyzes docs → project-context.md
    └── add-app.js            # ✅ Creates story for new app
```

---

## 🚨 Critical Rules

### 1. Keep It Generic
- ❌ NO pre-built features (auth, payments, products, etc.)
- ❌ NO domain-specific business logic
- ❌ NO technology mandates
- ✅ YES to structure, tooling, automation
- ✅ YES to documentation and examples

### 2. Don't Touch Project Guides
Files in `docs/project-guides/` are **final user documentation**. Only update if:
- Fixing errors
- Adding new features to the template itself
- User requests changes

### 3. EXAMPLE Files Are Templates
Files prefixed with `EXAMPLE-` in `docs/project-materials/` are:
- Placeholders that show users what to provide
- NOT to be filled with real content
- Clearly marked as examples to delete

### 4. Follow Existing Conventions
- File names: kebab-case (enforced in conventions guide)
- Code style: See `.prettierrc` and `.eslintrc.json`
- Documentation: Markdown with clear structure

---

## 📚 Key Documentation

### User-Facing Docs (Read-Only)
- `docs/project-guides/00-getting-started.md` - Setup walkthrough
- `docs/project-guides/01-monorepo-conventions.md` - Naming, structure
- `docs/project-guides/02-adding-apps.md` - App scaffolding guide
- `docs/project-guides/03-bmad-workflows.md` - BMAD integration

### Template Maintenance
- `README.md` - Main template description
- `plan.md` - Implementation plan and phases
- This file (`claude.md`) - Context for Claude Code

---

## 🛠️ Available Commands

### Project Management
```bash
pnpm projects:init     # ✅ Validate docs → direct to BMAD workflow
pnpm projects:add      # ✅ Create story file for new app
pnpm create:story      # ✅ Manual BMAD story creation
```

### BMAD Workflows
```bash
# Initialize project (AI-powered analysis)
/bmad:bmm:workflows:init-project

# Add new app (story-based)
pnpm projects:add

# Develop story
/bmad:bmm:workflows:dev-story docs/stories/[story-file].md

# Code review
/bmad:bmm:workflows:code-review
```

### Story-Driven Workflow (3 Steps)
```bash
# Step 1: Create story
pnpm projects:add

# Step 2: Fill story using BMAD agents (in Claude Code)
/fill-story docs/stories/add-[app-name].md
# This invokes: /bmad:bmm:workflows:fill-story

# Step 3: Implement app (in Claude Code)
/bmad:bmm:workflows:dev-story docs/stories/add-[app-name].md
```

### Development
```bash
pnpm install           # Install dependencies
pnpm dev               # Run all apps (once apps exist)
pnpm build             # Build all apps
pnpm typecheck         # Type check all apps
pnpm lint              # Lint all apps
pnpm test              # Run tests
```

---

## 🎯 BMAD Integration

### Official BMAD Method
- Repository: https://github.com/bmad-code-org/BMAD-METHOD
- This template includes full BMAD installation (copied from working setup)

### Available Workflows
The `.bmad/` folder contains:
- **Core workflows**: party-mode, brainstorming
- **BMM workflows**: dev-story, code-review, create-epics-and-stories, etc.
- **CIS workflows**: design-thinking, problem-solving, storytelling
- **18 specialized agents**: analyst, architect, dev, pm, etc.

### Project Initialization Workflow
This template uses **AI-powered documentation analysis** instead of simple keyword matching:

1. **Add Documentation** (`docs/project-materials/`): Add PRD, architecture, design docs
2. **Validate** (`pnpm projects:init`): Checks docs exist and directs to workflow
3. **Analyze** (`/bmad:bmm:workflows:init-project`): AI analyzes docs and generates project-context.md

**Why AI analysis?** Deep comprehension of requirements, intelligent domain extraction, comprehensive context generation.

### Story-Driven App Creation
This template uses a **3-step story-driven workflow** with BMAD agent intelligence:

1. **Create Story** (`pnpm projects:add`): Generates story file with basic structure
2. **Fill Story** (`/fill-story`): BMAD agents analyze project docs, web search for latest versions, generate comprehensive content
3. **Implement** (`/dev-story`): BMAD dev workflow implements the app following the story

**Why BMAD agents?** Deep understanding of your project, intelligent content generation, latest versions automatically, adapts to your specific context and conventions.

---

## 🔧 Technology Stack

### Base Requirements
- **Node.js**: ≥18.0.0
- **Package Manager**: pnpm ≥8.0.0
- **BMAD**: Installed and configured

### Tooling Included
- **Code Quality**: ESLint + Prettier
- **IDE**: VS Code settings (`.vscode/`)
- **Monorepo**: PNPM workspaces
- **GitHub**: Copilot configuration (`.github/`)

### Supported App Types (via story-driven workflow)
- Node.js API (Express, Fastify, Hono)
- Python API (Flask, FastAPI)
- React Web (Vite, Next.js, CRA)
- React Native Mobile (Bare, Expo, Expo Router)
- Custom

---

## 📝 Working on This Template

### Adding Features
If adding features to the template itself:
1. Update relevant documentation in `docs/project-guides/`
2. Update `README.md` if needed
3. Test thoroughly
4. Commit with clear message

### Updating Documentation
- Project guides: Only for template features
- EXAMPLE files: Keep generic, clearly marked
- Templates: Update if improving story/epic structure

### Testing Changes
```bash
# Create test project
mkdir ../test-project
cp -r . ../test-project/
cd ../test-project

# Test workflows
pnpm install
# ... test features
```

---

## 🚫 Common Pitfalls to Avoid

### Don't Add Domain Logic
❌ Bad: Adding authentication implementation
✅ Good: Documenting how users can add auth

### Don't Fill EXAMPLE Files
❌ Bad: Filling EXAMPLE-prd.md with real requirements
✅ Good: Keeping it as a template/example

### Don't Mandate Technologies
❌ Bad: "You must use PostgreSQL"
✅ Good: "Supports PostgreSQL, MongoDB, Firebase, etc."

### Don't Create Pre-Built Features
❌ Bad: Creating a user management system
✅ Good: Creating scripts that scaffold based on user needs

---

## 🎓 Philosophy

This template follows these principles:

1. **Domain-Agnostic** - No assumptions about what users are building
2. **Docs-First** - Users provide docs, AI generates structure
3. **AI-Native** - Leverages BMAD for intelligent scaffolding
4. **Technology Flexible** - Supports multiple stacks and tools
5. **Clean Slate** - Start fresh, build exactly what you need

---

## 📞 Context for AI Assistants

### When Working on This Template

**You are maintaining a TEMPLATE, not an application.**

**Your role:**
- Keep it generic and flexible
- Improve structure, tooling, documentation
- Fix bugs and add requested features
- Help users understand how to use it

**NOT your role:**
- Add domain-specific features
- Make opinionated tech choices for users
- Fill in EXAMPLE files with content
- Implement business logic

### When a User Asks for Help

**If they're using the template:**
- Guide them to appropriate documentation
- Help them understand the AI-powered workflows
- DO NOT scaffold apps directly — guide them through BMAD workflows

**If they want to initialize the project:**
1. Have them add documentation to `docs/project-materials/`
2. Run `pnpm projects:init` to validate docs
3. Run `/bmad:bmm:workflows:init-project` to generate project-context.md

**If they want to add an app:**
1. Run `pnpm projects:add` to create story
2. Run `/fill-story` to fill with latest versions
3. Run `/dev-story` to implement

**If they're customizing the template itself:**
- Support improvements to scripts and workflows
- Help maintain generic, domain-agnostic approach
- Assist with documentation updates

---

## 🔗 Related Resources

- **Main README**: `README.md`
- **Implementation Plan**: `plan.md`
- **BMAD Method**: https://github.com/bmad-code-org/BMAD-METHOD
- **Claude Code**: https://claude.ai/claude-code

---

## ✅ Quick Checklist

Before committing changes to this template:

- [ ] Changes are generic (not domain-specific)
- [ ] Documentation updated if needed
- [ ] EXAMPLE files remain examples
- [ ] Tests pass (lint, typecheck)
- [ ] Commit message is clear

---

**Last Updated:** 2025-12-17
**Template Version:** 1.0.0
**BMAD Version:** 6.0.0-alpha.17
**Workflow:** AI-powered initialization + Story-driven development
**Init Workflow:** `/bmad:bmm:workflows:init-project` (AI analyzes docs)
