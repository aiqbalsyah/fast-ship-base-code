# Fill Story Command

Fill in a story file with detailed content based on the overview/brief description and project documentation.

## Instructions

1. **Read the story file** at: $ARGUMENTS
2. **Extract story details** from the file header (ID, title, overview, app)
3. **Read project context** to understand project conventions and architecture:
   - `docs/project-context.md` - Project conventions, tech stack, coding standards

4. **Determine project scope** from the file path:
   - `apps/[app-name]/docs/todos/` → Specific app context
   - `packages/[package-name]/docs/todos/` → Shared package context
   - `docs/todos/` → Cross-project scope

5. **Read relevant documentation** (if available):
   - Project README files
   - App-specific documentation in `apps/[app-name]/docs/`
   - Package documentation in `packages/[package-name]/docs/`
   - Architecture documentation in `docs/project-materials/architecture/`
   - Requirements in `docs/project-materials/requirements/`
   - Design specs in `docs/project-materials/design/`

6. **Web search for latest versions** (REQUIRED):
   - Search for the latest stable version of frameworks/libraries mentioned
   - Example: "Next.js latest version 2025" → Use Next.js 15.x
   - Example: "React latest stable 2025" → Use React 19.x
   - Include version info in Technical Design section

7. **Generate complete content** for all sections:

   ### User Story
   - Format: "As a [user role], I want to [action] so that [benefit]"
   - Derive role from project context and requirements

   ### Acceptance Criteria
   - Specific, testable checkboxes
   - Include edge cases and error handling
   - Reference project conventions from project-context.md
   - API response validation
   - Follow coding conventions (kebab-case files, etc.)

   ### Technical Design

   **Follow modular architecture patterns:**

   **For API stories (Node.js/Python):**
   - Follow MVC pattern: routes/ → controllers/ → services/
   - API endpoints with clear naming
   - Request/response schemas with type safety
   - Database operations (follow project's DB choice)
   - Error handling patterns
   - Authentication/authorization approach
   - Use latest framework versions from web search

   **For Frontend stories (React/Next.js):**
   - Component structure (follow project conventions)
   - API integration patterns
   - State management (React hooks, Context, etc.)
   - Form validation with type safety
   - UI component libraries (if project uses them)
   - Responsive design considerations
   - Use latest framework versions from web search

   **For Mobile stories (React Native/Expo):**
   - Component organization
   - Navigation patterns
   - State management
   - API integration
   - Platform-specific considerations
   - Use latest framework versions from web search

   ### Implementation Checklist

   **Phase 1: Setup**
   - Create necessary files following project structure from project-context.md
   - Install required dependencies (use LATEST versions)
   - Set up configuration

   **Phase 2: Implementation**
   - Implement core functionality
   - Follow modular architecture:
     - Backend: controllers/ + services/ + routes/
     - Frontend: components/ + hooks/ + utils/
   - Use project's shared packages/utilities

   **Phase 3: Testing & Validation**
   - Run `pnpm typecheck` (if TypeScript project)
   - Run `pnpm lint` (if linting configured)
   - Manual testing checklist
   - Test all acceptance criteria

   **Phase 4: Code Review** (ALWAYS include)
   - Run `/bmad:bmm:workflows:code-review` workflow
   - Address any issues found
   - Re-run checks after fixes

   ### Dependencies
   - List prerequisite stories
   - List required packages (WITH LATEST VERSIONS)
   - List external services

   ### Testing
   - Unit tests (when applicable)
   - Integration tests
   - Manual testing checklist
   - Edge cases

   ### Notes
   - Edge cases to consider
   - Implementation considerations
   - Security considerations
   - Performance considerations
   - Future enhancements

8. **Update the story file** with generated content
9. **Remove placeholders** and ensure all sections are filled

## Key Guidelines

### Use Project Context
- Always reference `docs/project-context.md` for:
  - Coding conventions (kebab-case, camelCase, etc.)
  - Architecture patterns
  - Tech stack choices
  - Testing requirements

### Latest Versions (CRITICAL)
- **ALWAYS web search for latest stable versions**
- Include version numbers in dependencies
- Use 2025 in search queries for current info
- Examples:
  - "Next.js 15.0" (not 14.x)
  - "React 19" (not 18.x)
  - "TypeScript 5.3+" (latest)
  - "Express 4.18+" (latest)

### Modular Architecture
- **Backend pattern**: routes → controllers → services
  - Routes: Thin layer, just endpoint definitions
  - Controllers: Request/response handling, validation
  - Services: Business logic, reusable functions

- **Frontend pattern**: components → hooks → utils
  - Components: Presentation, composition
  - Hooks: Logic, state management
  - Utils: Helper functions

### File Naming
- Follow project conventions from project-context.md
- Default: kebab-case for all files
- Examples:
  - `user-controller.ts`
  - `auth-service.ts`
  - `user-profile.tsx`

## Output Format

After filling the story, provide a summary:

```
✅ Story filled successfully!

📋 Generated:
- User Story (for [role])
- [N] Acceptance Criteria
- Technical Design ([API/Frontend/Mobile] scope)
- [N] Implementation Tasks
- Testing Requirements
- Dependencies & Notes

🔍 Web Search Results:
- [Framework]: Latest version X.Y.Z
- [Library]: Latest version A.B.C

📚 References Used:
- docs/project-context.md
- [Other relevant docs]

🎯 Story ready for development!

Next steps:
1. Review the filled story
2. Make any adjustments if needed
3. Run `/bmad:bmm:workflows:dev-story [file]` to start implementation

Or type 'go' to start development immediately.
```

## Example Workflow

### Example: Filling an "Add App" Story

**Given story file**: `docs/todos/add-api-app.md`

**Workflow:**

1. **Read** the story file:
   - Title: "Create Express API App"
   - Overview: "Scaffold new Express API with TypeScript"
   - App: api

2. **Read project context**:
   - Tech stack: Node.js, Express, TypeScript
   - Conventions: kebab-case, MVC pattern
   - Port: 3000

3. **Web search**:
   - "Express latest version 2025" → 4.18.2
   - "TypeScript latest 2025" → 5.3.3
   - "Node.js LTS 2025" → 20.x

4. **Generate content**:
   - User Story: "As a developer, I want to scaffold an Express API..."
   - Acceptance Criteria:
     - Create modular structure (routes/, controllers/, services/)
     - Use Express 4.18+ and TypeScript 5.3+
     - Include health check endpoint
     - Follow project coding conventions
   - Technical Design:
     - Structure with MVC pattern
     - Latest versions: Express 4.18.2, TypeScript 5.3.3
     - Config, middleware, utils folders
   - Implementation: Step-by-step tasks
   - Testing: Verify server starts, health check works

5. **Write to file** and confirm ready for development

This ensures the story is filled with current best practices and latest stable versions.
