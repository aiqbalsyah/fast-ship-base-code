# Init Project Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/.bmad/bmm/workflows/init-project/workflow.yaml</critical>
<critical>Communicate all responses in {communication_language} and tailor to {user_skill_level}</critical>
<critical>Generate all documents in {document_output_language}</critical>

<workflow>

<step n="1" goal="Validate project materials exist">
  <action>Check if directory exists: {project_materials}</action>

  <check if="project_materials directory does NOT exist">
    <output>❌ **Error: Project materials directory not found!**

Expected location: `docs/project-materials/`

Please create this directory and add your project documentation:
- `docs/project-materials/requirements/` - PRD, requirements, features
- `docs/project-materials/architecture/` - Tech stack, system design
- `docs/project-materials/design/` - UI/UX specifications (optional)
- `docs/project-materials/infrastructure/` - Deployment, hosting (optional)

See `docs/project-materials/README.md` for guidance.
    </output>
    <action>HALT - Cannot proceed without project materials</action>
  </check>

  <action>Search for all .md files in {project_materials} recursively</action>
  <action>Exclude files: README.md, EXAMPLE-*.md, .gitkeep</action>
  <action>Store list of found documentation files as {{doc_files}}</action>

  <check if="no documentation files found">
    <output>⚠️ **Warning: No documentation found in project materials!**

Found directory: `docs/project-materials/`
But no markdown files were found (excluding README and EXAMPLE files).

**Required (minimum):**
- At least one requirements document (PRD, user stories, features list)
- At least one architecture document (tech stack, system design)

**Recommendations:**
1. Add requirements to: `docs/project-materials/requirements/`
2. Add architecture decisions to: `docs/project-materials/architecture/`
3. Add design specifications to: `docs/project-materials/design/` (optional)
4. Add infrastructure plans to: `docs/project-materials/infrastructure/` (optional)

See the EXAMPLE files for guidance.
    </output>
    <action>HALT - Need documentation to proceed</action>
  </check>

  <output>✅ Found {{doc_files.length}} documentation file(s) to analyze</output>
</step>

<step n="2" goal="Read and categorize documentation">
  <action>For each file in {{doc_files}}, read the complete contents</action>
  <action>Categorize each file based on its path:
    - Files in `requirements/` → Requirements category
    - Files in `architecture/` → Architecture category
    - Files in `design/` → Design category
    - Files in `infrastructure/` → Infrastructure category
    - Files in other locations → General category
  </action>

  <action>Store categorized documentation as:
    - {{requirements_docs}} - list of {path, content} objects
    - {{architecture_docs}} - list of {path, content} objects
    - {{design_docs}} - list of {path, content} objects
    - {{infrastructure_docs}} - list of {path, content} objects
    - {{general_docs}} - list of {path, content} objects
  </action>

  <output>📊 **Documentation Analysis:**
- Requirements: {{requirements_docs.length}} file(s)
- Architecture: {{architecture_docs.length}} file(s)
- Design: {{design_docs.length}} file(s)
- Infrastructure: {{infrastructure_docs.length}} file(s)
- General: {{general_docs.length}} file(s)
  </output>
</step>

<step n="3" goal="Analyze requirements and extract domain">
  <critical>Use AI comprehension to deeply understand the project, don't just do keyword matching</critical>

  <action>Analyze all requirements documentation content</action>
  <action>Extract and identify:
    - **Project purpose**: What problem does this solve?
    - **Target users**: Who will use this?
    - **Core features**: What are the main capabilities?
    - **Domain/industry**: What industry or domain is this for?
    - **Business model**: How does this create value?
    - **Success metrics**: How will success be measured?
  </action>

  <action>Identify domain/industry from analysis:
    - Fintech/Finance (payments, banking, trading, etc.)
    - E-commerce (shopping, products, orders, etc.)
    - Healthcare (patients, medical records, appointments, etc.)
    - Education (courses, students, learning, etc.)
    - Social/Community (posts, followers, messaging, etc.)
    - IoT/Hardware (devices, sensors, telemetry, etc.)
    - SaaS/Business Tools (productivity, collaboration, etc.)
    - Media/Content (publishing, streaming, etc.)
    - Other (describe specifically)
  </action>

  <action>Store analysis as {{domain_analysis}}</action>

  <check if="requirements_docs.length == 0">
    <output>⚠️ No requirements documentation found. Domain analysis will be limited.</output>
    <action>Set {{domain_analysis}} to indicate incomplete requirements</action>
  </check>
</step>

<step n="4" goal="Analyze architecture and extract tech stack">
  <critical>Use AI to understand the full technology landscape, including implied choices</critical>

  <action>Analyze all architecture documentation content</action>
  <action>Extract and identify:
    - **Backend technologies**: Languages, frameworks, runtime
    - **Frontend technologies**: Frameworks, libraries, tooling
    - **Mobile technologies**: Native, cross-platform, frameworks
    - **Databases**: Type, specific database, data modeling approach
    - **Infrastructure**: Hosting, cloud provider, containerization
    - **Authentication**: Method, provider, security approach
    - **APIs**: REST, GraphQL, gRPC, etc.
    - **Real-time**: WebSockets, SSE, polling, etc.
    - **Testing**: Unit, integration, E2E frameworks
    - **CI/CD**: Automation, deployment strategy
    - **Monitoring**: Logging, analytics, error tracking
  </action>

  <action>Identify architectural patterns:
    - Monolith vs Microservices
    - Serverless vs Traditional hosting
    - Client-side vs Server-side rendering
    - Synchronous vs Asynchronous communication
    - Stateful vs Stateless design
  </action>

  <action>Store analysis as {{tech_stack_analysis}} and {{architecture_patterns}}</action>

  <check if="architecture_docs.length == 0">
    <output>⚠️ No architecture documentation found. Tech stack analysis will be limited.</output>
    <action>Set {{tech_stack_analysis}} to indicate incomplete architecture</action>
  </check>
</step>

<step n="5" goal="Analyze design specifications">
  <action>Analyze all design documentation content</action>
  <action>Extract and identify:
    - **Design system**: Component library, design tokens
    - **UI framework**: Material, Tailwind, custom, etc.
    - **Branding**: Colors, typography, visual identity
    - **Accessibility**: WCAG compliance, a11y approach
    - **Responsive design**: Mobile-first, breakpoints
    - **User flows**: Key interactions and journeys
  </action>

  <action>Store analysis as {{design_analysis}}</action>

  <check if="design_docs.length == 0">
    <output>ℹ️ No design documentation found. Design context will be minimal.</output>
    <action>Set {{design_analysis}} to indicate no design docs</action>
  </check>
</step>

<step n="6" goal="Analyze infrastructure and deployment">
  <action>Analyze all infrastructure documentation content</action>
  <action>Extract and identify:
    - **Hosting**: Cloud provider, platform
    - **Deployment**: Strategy, automation, environments
    - **Scaling**: Approach to handle growth
    - **Security**: Approach, compliance, certifications
    - **Monitoring**: Observability, alerting
    - **Backup/DR**: Data protection, disaster recovery
  </action>

  <action>Store analysis as {{infrastructure_analysis}}</action>

  <check if="infrastructure_docs.length == 0">
    <output>ℹ️ No infrastructure documentation found. Infrastructure context will be minimal.</output>
    <action>Set {{infrastructure_analysis}} to indicate no infra docs</action>
  </check>
</step>

<step n="7" goal="Generate comprehensive project-context.md">
  <critical>Generate a comprehensive, well-structured document that serves as the "bible" for all AI-assisted development</critical>

  <action>Create project-context.md with the following structure:

# Project Context

> **Generated:** {date}
> **Source:** User documentation in `docs/project-materials/`
> **Generator:** BMAD init-project workflow
> **Last Updated:** {date}

---

## Executive Summary

[2-3 paragraph summary of the project, its purpose, and key characteristics]

---

## Project Overview

### Purpose & Vision

[What problem does this solve? What is the vision?]

### Target Users

[Who are the primary users? What are their needs?]

### Core Value Proposition

[How does this create value? What makes it unique?]

### Success Metrics

[How will success be measured?]

---

## Domain & Industry

**Domain:** [Identified domain from analysis]

**Industry Context:**
[Industry-specific considerations, regulations, standards]

**Competitive Landscape:**
[If mentioned in docs, note key competitors or alternatives]

---

## Requirements Summary

### Functional Requirements

[Key features and capabilities organized by priority/category]

### Non-Functional Requirements

[Performance, security, scalability, usability requirements]

### Constraints & Dependencies

[Technical, business, or regulatory constraints]

---

## Technology Stack

### Backend
- [Technologies with rationale if provided]

### Frontend
- [Technologies with rationale if provided]

### Mobile
- [Technologies with rationale if provided]

### Database & Data Layer
- [Database choice, data modeling approach]

### Infrastructure & Hosting
- [Cloud provider, hosting approach, infrastructure as code]

### Authentication & Authorization
- [Auth method, provider, security approach]

### APIs & Integration
- [API design, external integrations]

### Testing & Quality
- [Testing frameworks, quality assurance approach]

### CI/CD & Deployment
- [Automation, deployment pipeline]

### Monitoring & Observability
- [Logging, metrics, error tracking]

---

## Architecture Patterns

### System Architecture
[High-level architecture: monolith, microservices, serverless, etc.]

### Data Architecture
[Data flow, storage strategy, caching approach]

### Communication Patterns
[Synchronous/async, event-driven, message queues]

### Security Architecture
[Security layers, authentication flow, data protection]

---

## Design System

### UI Framework & Components
[Component library, design system approach]

### Visual Design
[Colors, typography, spacing, branding]

### Accessibility
[A11y standards, WCAG compliance]

### Responsive Design
[Mobile-first, breakpoints, device support]

---

## Development Standards

### Coding Conventions
- **File naming:** kebab-case (enforced by template)
- **Variables:** camelCase (JavaScript/TypeScript)
- **Constants:** UPPER_SNAKE_CASE
- **Components:** PascalCase (React) or kebab-case (files)
- **Functions:** camelCase, descriptive names
- **Classes:** PascalCase

### Code Organization
- **Monorepo structure:** PNPM workspaces
- **Apps:** `apps/` directory
- **Shared code:** `packages/` directory
- **Documentation:** `docs/` directory

### Code Quality
- **Linting:** ESLint (see `.eslintrc.json`)
- **Formatting:** Prettier (see `.prettierrc`)
- **Type Safety:** TypeScript (strict mode)
- **Testing:** [Testing approach from analysis]

### Git Workflow
- **Branching:** [Branching strategy if mentioned]
- **Commits:** Conventional commits
- **Pull Requests:** Required for all changes
- **Code Review:** BMAD code-review workflow

---

## Infrastructure & Deployment

### Hosting & Cloud
[Cloud provider, hosting approach, infrastructure setup]

### Environments
[Dev, staging, production environments]

### Deployment Strategy
[Deployment approach, rollback strategy]

### Scaling Approach
[Horizontal/vertical scaling, auto-scaling]

### Security & Compliance
[Security measures, compliance requirements]

### Backup & Disaster Recovery
[Data backup, disaster recovery plan]

---

## Development Workflow

### Testing Requirements
- **Unit Tests:** All business logic, utilities, helpers
- **Integration Tests:** API endpoints, database interactions
- **E2E Tests:** Critical user flows, payment flows, etc.
- **Test Coverage:** [Target percentage if specified]

### Documentation Requirements
- **Code Documentation:** JSDoc/TSDoc for public APIs
- **README files:** For each app and package
- **API Documentation:** OpenAPI/Swagger specs
- **User Documentation:** User guides, tutorials

### Quality Gates
- All tests passing
- Linting and formatting checks pass
- Type checking passes
- Code review approved
- [Any other quality requirements]

---

## Project Structure

```
fast-ship-base-code/
├── apps/                 # Applications (to be added)
├── packages/             # Shared packages (to be added)
├── docs/                 # Documentation
│   ├── project-materials/  # Source documentation
│   ├── project-guides/     # Template guides
│   └── project-context.md  # This file
├── .bmad/               # BMAD workflows and agents
├── .claude/             # Claude Code configuration
└── scripts/             # Automation scripts
```

---

## Key Considerations & Constraints

[List important constraints, limitations, or special considerations from the documentation]

---

## Documentation Sources

### Requirements Documentation
[List all requirements documents analyzed]

### Architecture Documentation
[List all architecture documents analyzed]

### Design Documentation
[List all design documents analyzed]

### Infrastructure Documentation
[List all infrastructure documents analyzed]

---

## Recommendations

### Immediate Next Steps
1. Review this project-context.md and verify accuracy
2. Add missing information or clarify ambiguities
3. Run `pnpm projects:add` to create your first app
4. Use BMAD workflows for development: `/bmad:bmm:workflows:dev-story`

### Documentation Gaps
[Note any missing or incomplete documentation that should be added]

### Architecture Decisions Needed
[List any technical decisions that need to be made]

---

## Maintenance

### Updating This Document
- Re-run `pnpm projects:init` or `/bmad:bmm:workflows:init-project` when documentation changes
- Manually update sections as project evolves
- Keep this as the single source of truth for project context

### Review Schedule
- Review before each major milestone
- Update when architecture changes
- Revise when new technologies are adopted

---

**This document serves as the authoritative context for all AI-assisted development.**
**All BMAD workflows, agents, and development work should reference this document.**
  </action>

  <action>Write the generated content to: {output_file}</action>

  <output>✅ Generated comprehensive project-context.md at: docs/project-context.md</output>
</step>

<step n="8" goal="Validation and completion">
  <action>Verify that {output_file} was created successfully</action>
  <action>Check file size and ensure content was written</action>

  <output>
✅ **Project Initialization Complete, {user_name}!**

**Generated Documentation:**
- **File:** `docs/project-context.md`
- **Source:** {{doc_files.length}} documentation files analyzed
- **Categories:**
  - Requirements: {{requirements_docs.length}} file(s)
  - Architecture: {{architecture_docs.length}} file(s)
  - Design: {{design_docs.length}} file(s)
  - Infrastructure: {{infrastructure_docs.length}} file(s)

**Project Analysis:**
- **Domain:** {{domain_analysis.domain}}
- **Primary Technologies:** {{tech_stack_analysis.primary_stack}}
- **Architecture Pattern:** {{architecture_patterns.main_pattern}}

---

## 🎯 Next Steps

1. **Review project-context.md**
   - Open `docs/project-context.md`
   - Verify the AI understood your project correctly
   - Add any missing information or clarifications

2. **Update as needed**
   - Edit `docs/project-context.md` directly to refine
   - Or update `docs/project-materials/` and re-run this workflow

3. **Add your first app**
   - Run: `pnpm projects:add`
   - This will guide you through adding your first application

4. **Start building with BMAD**
   - Create stories: `pnpm create:story`
   - Fill stories: `/fill-story [story-file]`
   - Develop stories: `/bmad:bmm:workflows:dev-story [story-file]`

---

## 📚 Resources

- **Getting Started:** `docs/project-guides/00-getting-started.md`
- **Adding Apps:** `docs/project-guides/02-adding-apps.md`
- **BMAD Workflows:** `docs/project-guides/03-bmad-workflows.md`

---

**Pro Tip:** The project-context.md file is your "bible" for AI-assisted development.
Keep it updated as your project evolves!
  </output>

  <check if="requirements_docs.length == 0 OR architecture_docs.length == 0">
    <output>
⚠️ **Important Recommendations:**

Your project documentation is incomplete. For best results:

{{#if requirements_docs.length == 0}}
- **Add requirements documentation** to `docs/project-materials/requirements/`
  - PRD, user stories, feature specifications
  - This helps AI understand what to build
{{/if}}

{{#if architecture_docs.length == 0}}
- **Add architecture documentation** to `docs/project-materials/architecture/`
  - Technology stack decisions
  - System architecture and design patterns
  - This helps AI make consistent technical choices
{{/if}}

After adding documentation, re-run: `/bmad:bmm:workflows:init-project`
    </output>
  </check>
</step>

</workflow>
