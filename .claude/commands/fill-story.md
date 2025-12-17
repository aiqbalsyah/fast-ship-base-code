# Fill Story Command

Fill in a story file with detailed content using AI-powered analysis of project documentation and intelligent content generation via BMAD agents.

**IMPORTANT:** When this command is invoked, immediately run:
```
/bmad:bmm:workflows:fill-story $ARGUMENTS
```

Do not process the instructions below - they are for user reference only. The workflow handles everything.

---

## Quick Usage

This command uses the BMAD fill-story workflow for intelligent story generation:

```bash
/fill-story [story-file-path]
```

Example:
```bash
/fill-story docs/stories/add-api-app.md
```

## What This Does

The BMAD workflow will:

1. **Analyze Project Context** - Uses BMAD analyst agent to deeply understand your project
   - Reads `docs/project-context.md`
   - Analyzes all documentation in `docs/project-materials/`
   - Understands domain, tech stack, and architecture patterns

2. **Web Search Latest Versions** - Finds current stable versions
   - Searches for latest framework versions (React, Next.js, Express, etc.)
   - Identifies best practices for 2025
   - Ensures story uses modern, up-to-date technologies

3. **Generate Comprehensive Content** - Uses BMAD master agent to create:
   - User Story (properly formatted with role/action/benefit)
   - Acceptance Criteria (5-8 specific, testable criteria)
   - Technical Design (architecture, file structure, API design)
   - Implementation Checklist (phased tasks with checkboxes)
   - Testing Strategy (unit, integration, manual tests)
   - Dependencies (with versions)
   - Dev Notes (considerations, edge cases, security)

4. **Update Story File** - Writes comprehensive content back to the file

## How to Use

Simply run this command with your story file path:

```bash
/fill-story docs/stories/your-story.md
```

The command will automatically invoke the BMAD workflow:

```bash
/bmad:bmm:workflows:fill-story docs/stories/your-story.md
```

## Benefits of BMAD Agent Analysis

**Vs. Simple Template Filling:**
- ✅ **Deep Understanding** - Analyzes project docs with AI comprehension
- ✅ **Context-Aware** - Understands your domain and architecture
- ✅ **Latest Versions** - Automatically searches for current stable versions
- ✅ **Best Practices** - Applies 2025 patterns and approaches
- ✅ **Comprehensive** - Generates all sections with rich detail
- ✅ **Intelligent** - Adapts to your specific tech stack and conventions

## What Gets Generated

The BMAD agents will create:

### User Story
- Properly formatted: "As a [role], I want to [action] so that [benefit]"
- Role derived from your project context

### Acceptance Criteria (5-8 criteria)
- Specific and testable
- Includes edge cases and error handling
- Follows your coding conventions
- Security and performance considerations

### Technical Design
- Architecture overview following your patterns
- Technology stack with latest versions
- File structure (following your conventions)
- API design (if applicable)
- Data models (if applicable)
- Component structure (if frontend/mobile)
- Integration points
- Error handling strategy
- Security considerations

### Implementation Checklist
- Phase 1: Setup & Configuration
- Phase 2: Core Implementation
- Phase 3: Integration
- Phase 4: Testing
- Phase 5: Quality & Review

### Testing Strategy
- Unit tests
- Integration tests
- Manual testing checklist
- Edge cases to test

### Dependencies
- Prerequisite stories
- Required packages with versions
- External services
- Environment variables

### Dev Notes
- Implementation considerations
- Edge cases
- Security notes
- Future enhancements

## After Filling

Once the story is filled, you can:

1. **Review** - Check the generated content
2. **Adjust** - Make any refinements needed
3. **Develop** - Run `/bmad:bmm:workflows:dev-story [story-file]` to implement

Or type **'go'** to start development immediately!

## Example

```bash
# Fill a story
/fill-story docs/stories/add-user-auth.md

# The workflow analyzes your project, searches for latest versions,
# and generates comprehensive story content

# Then develop it
/bmad:bmm:workflows:dev-story docs/stories/add-user-auth.md
```

---

**Pro Tip:** For best results, ensure you have:
- `docs/project-context.md` generated (run `/bmad:bmm:workflows:init-project`)
- Documentation in `docs/project-materials/`
- Clear story overview/brief in the story file
