---
name: Project Initialization
description: Analyze user documentation and generate project-context.md for AI-assisted development
version: 1.0.0
---

# Project Initialization Workflow

**Goal:** Analyze user-provided documentation to generate a comprehensive project-context.md that guides all future AI-assisted development.

**Philosophy:** Domain-agnostic analysis - learn from USER's docs, make NO assumptions.

---

## Prerequisites

User has populated `docs/project-materials/` with:
- Requirements documentation (PRDs, user stories, features)
- Architecture decisions (tech stack, patterns, standards)
- Design specifications (UI/UX, design system) - optional
- Infrastructure decisions (database, hosting, deployment) - optional

---

## Workflow Steps

### Step 1: Discover Documentation

**Action:** Scan `docs/project-materials/` to find all user-provided documentation.

```bash
# Find all markdown files
find docs/project-materials -name "*.md" -type f
```

**Output:** List of documentation files to analyze.

**Validation:**
- ✅ At least one file found in `requirements/` or `architecture/`
- ⚠️ If no files: Warn user and exit with instructions

---

### Step 2: Analyze Requirements

**Action:** Read and analyze all files in `docs/project-materials/requirements/`

**Extract:**
- **Project Domain:** What industry/domain? (e.g., fintech, e-commerce, SaaS, IoT)
- **Business Goals:** What problems being solved?
- **Target Users:** Who will use this?
- **Core Features:** What functionality is needed?
- **MVP Scope:** What's in/out of scope?
- **Success Metrics:** How is success measured?

**Approach:**
- Read each file thoroughly
- Identify patterns and themes
- Infer domain from context
- Note any ambiguities for clarification

---

### Step 3: Analyze Architecture

**Action:** Read and analyze all files in `docs/project-materials/architecture/`

**Extract:**
- **Technology Stack:**
  - Backend: Languages, frameworks, runtimes
  - Frontend: Frameworks, libraries, build tools
  - Mobile: Native vs cross-platform, frameworks
- **Architecture Patterns:**
  - Microservices vs monolith
  - REST vs GraphQL
  - Event-driven patterns
- **Coding Conventions:**
  - Naming conventions
  - File structure preferences
  - Code style rules
- **Development Standards:**
  - Testing requirements
  - Documentation standards
  - Code review process

**Approach:**
- Extract explicit decisions
- Infer implicit conventions
- Note technology versions where specified

---

### Step 4: Analyze Design (Optional)

**Action:** Read and analyze all files in `docs/project-materials/design/` if present

**Extract:**
- **Design System:**
  - Colors, typography, spacing
  - Component library choices
  - UI framework preferences
- **UX Patterns:**
  - Navigation structure
  - User flows
  - Accessibility requirements
- **Responsive Strategy:**
  - Breakpoints
  - Mobile-first vs desktop-first

**Approach:**
- Only include if design docs exist
- Extract concrete specifications
- Note design tool choices (Figma, Sketch, etc.)

---

### Step 5: Analyze Infrastructure (Optional)

**Action:** Read and analyze all files in `docs/project-materials/infrastructure/` if present

**Extract:**
- **Database Decisions:**
  - Type (SQL, NoSQL, Graph, etc.)
  - Specific choice (PostgreSQL, MongoDB, Firebase, etc.)
  - Rationale for choice
- **Deployment Strategy:**
  - Hosting choices (Firebase, AWS, Vercel, Docker, VPS)
  - CI/CD approach
  - Environment management
- **Infrastructure Patterns:**
  - Containerization (Docker, Kubernetes)
  - Serverless vs traditional
  - Caching strategy

**Approach:**
- Extract infrastructure decisions
- Note rationale where provided
- Identify deployment targets

---

### Step 6: Synthesize Project Context

**Action:** Combine all analysis into comprehensive project-context.md

**Structure:**

```markdown
# Project Context

> Generated: [DATE]
> Source: User documentation in docs/project-materials/

---

## Project Overview

[Summary of project domain, goals, and scope]

### Domain
[Industry/domain identified from requirements]

### Business Goals
- Goal 1
- Goal 2
- ...

### Target Users
- User persona 1
- User persona 2
- ...

---

## Technology Stack

### Backend
- **Language:** [Language from architecture docs]
- **Framework:** [Framework from architecture docs]
- **Runtime:** [Runtime/version from architecture docs]

### Frontend
[If applicable, from architecture docs]

### Mobile
[If applicable, from architecture docs]

### Database
[From infrastructure docs, if provided]

---

## Architecture Patterns

[Patterns identified from architecture docs]

### Code Organization
[Folder structure, module patterns]

### API Design
[REST/GraphQL, endpoint patterns]

### State Management
[If frontend, state management approach]

---

## Coding Conventions

### Naming Conventions
- **Files:** [e.g., kebab-case]
- **Variables:** [e.g., camelCase]
- **Constants:** [e.g., UPPER_SNAKE_CASE]
- **Components:** [e.g., PascalCase or kebab-case]

### File Structure
[Preferred folder organization]

### Code Style
- [ESLint config if specified]
- [Prettier config if specified]
- [Language-specific standards]

---

## Infrastructure & Deployment

[If infrastructure docs provided]

### Database
- **Type:** [Database type]
- **Choice:** [Specific database]
- **Rationale:** [Why chosen]

### Hosting
- [Hosting strategy]

### Deployment
- [Deployment approach]

---

## Development Workflow

### Testing Requirements
[Testing approach from architecture or requirements]

### Code Review
[Code review process if specified]

### Documentation
[Documentation standards if specified]

---

## Design System

[If design docs provided]

### Colors
[Color palette]

### Typography
[Font choices]

### Components
[Component library or patterns]

---

## Notes

### Assumptions Made
[Any assumptions made due to missing info]

### Areas Needing Clarification
[Ambiguities or gaps in documentation]

### Recommendations
[Suggested best practices based on domain]

---

**This document is the "bible" for all AI-assisted development work.**
```

**Guidelines:**
- Use ONLY information from user docs
- Clearly mark assumptions vs facts
- Note what's missing or ambiguous
- Keep it concise but comprehensive
- Use active voice, clear language

---

### Step 7: Write project-context.md

**Action:** Write the synthesized content to `docs/project-context.md`

**Location:** `{project-root}/docs/project-context.md`

**Validation:**
- ✅ File created successfully
- ✅ All sections present (even if marked "Not provided")
- ✅ No placeholder text left unfilled

---

### Step 8: Confirm and Guide

**Action:** Display success message and next steps

**Output:**

```
✅ Project initialized successfully!

📄 Generated: docs/project-context.md

📊 Analysis Summary:
- Domain: [Identified domain]
- Tech Stack: [Key technologies]
- Apps Needed: [Suggested based on requirements]

🎯 Next Steps:

1. Review project-context.md
   Open the file and verify the AI understood your project correctly.

2. Make adjustments if needed
   Edit project-context.md to clarify or add missing information.

3. Add your first app
   Run: pnpm projects:add
   Suggested apps based on your requirements:
   - [Suggested app 1]
   - [Suggested app 2]

4. Start building with BMAD
   Create stories: pnpm create:story
   Develop stories: /bmad:bmm:workflows:dev-story [story-file]

📚 Need help?
- docs/project-guides/00-getting-started.md
- docs/project-guides/03-bmad-workflows.md
```

---

## Error Handling

### No Documentation Found

**If:** `docs/project-materials/` is empty or only has EXAMPLE files

**Action:**
```
⚠️  No project documentation found!

Please add your project documentation to docs/project-materials/:

Required (at minimum):
  docs/project-materials/requirements/
    - Add your PRD, requirements, or feature list

  docs/project-materials/architecture/
    - Add your tech stack decisions

Optional but recommended:
  docs/project-materials/design/
  docs/project-materials/infrastructure/

See docs/project-materials/README.md for guidance.

After adding docs, run: pnpm projects:init
```

**Exit:** Don't generate empty project-context.md

---

### Insufficient Information

**If:** Documentation is too sparse to generate meaningful context

**Action:**
- Generate project-context.md anyway
- Clearly mark missing sections
- Provide guidance on what to add

**Example:**
```markdown
## Technology Stack

⚠️ **No architecture documentation provided**

Please add technology decisions to:
docs/project-materials/architecture/tech-stack.md

Include:
- Backend language and framework
- Frontend framework (if applicable)
- Database choice
- Key libraries and tools
```

---

### Ambiguities Found

**If:** Conflicting or unclear information in docs

**Action:**
- Note in project-context.md
- Ask user for clarification

**Example:**
```markdown
## Notes

### Areas Needing Clarification

1. **API Design:**
   Requirements mention REST API but architecture doc mentions GraphQL.
   Please clarify which approach to use.

2. **Database:**
   No database choice specified. Please add to infrastructure docs.
```

---

## Success Criteria

This workflow succeeds when:

1. ✅ All user documentation analyzed
2. ✅ project-context.md generated with comprehensive information
3. ✅ No placeholder text left in output
4. ✅ User receives clear next steps
5. ✅ Any ambiguities clearly noted

---

## Integration with Other Workflows

**This workflow enables:**
- `projects:add` - Uses project-context.md for intelligent scaffolding
- `create-story` - References project-context.md for conventions
- `dev-story` - Follows conventions from project-context.md
- All BMAD workflows - Use project-context.md as "bible"

**Must run before:**
- projects:add (requires project-context.md)

**Can re-run:**
- Yes! When user updates documentation
- Overwrites existing project-context.md
- Safe to run multiple times

---

## Notes

- This workflow is domain-agnostic by design
- Makes NO assumptions about features or tech choices
- Learns entirely from user-provided documentation
- Generated context adapts to ANY project type

---

**Remember:** The quality of project-context.md depends on the quality of user documentation. Encourage users to be detailed and specific in their docs/project-materials/!
