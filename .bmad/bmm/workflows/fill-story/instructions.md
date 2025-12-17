# Fill Story Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/.bmad/bmm/workflows/fill-story/workflow.yaml</critical>
<critical>Communicate all responses in {communication_language} and tailor to {user_skill_level}</critical>
<critical>Generate all documents in {document_output_language}</critical>

<workflow>

<step n="1" goal="Validate story file and extract context">
  <action>Check if story file path was provided as argument: {{story_file}}</action>

  <check if="story_file is NOT provided">
    <ask>Please provide the story file path to fill:

Example: docs/stories/add-api-app.md

Story file path:</ask>
    <action>Store user-provided path as {{story_file}}</action>
  </check>

  <action>Check if story file exists at: {{story_file}}</action>

  <check if="story file does NOT exist">
    <output>❌ **Error: Story file not found!**

Looked for: {{story_file}}

Please ensure:
1. The file path is correct
2. The story file exists
3. You're running this from the project root

To create a new story, run: `pnpm projects:add`
    </output>
    <action>HALT - Cannot proceed without story file</action>
  </check>

  <action>Read complete story file from: {{story_file}}</action>
  <action>Extract story metadata:
    - Story ID
    - Title
    - Overview/Brief description
    - Target app or package (if specified)
    - Any existing sections that are already filled
  </action>

  <output>✅ Found story file: {{story_file}}

**Story Details:**
- ID: {{story_id}}
- Title: {{story_title}}
- Overview: {{story_overview}}
- Target: {{story_target}}
  </output>
</step>

<step n="2" goal="Load project context and documentation">
  <critical>Use BMAD analyst agent to comprehensively analyze project documentation</critical>

  <action>Check if project-context.md exists at: {project_context}</action>

  <check if="project-context.md does NOT exist">
    <output>⚠️ **Warning: No project-context.md found!**

For best results, initialize your project first:
1. Add documentation to `docs/project-materials/`
2. Run: `/bmad:bmm:workflows:init-project`

Continuing with limited context...
    </output>
    <action>Set {{has_project_context}} = false</action>
  </check>

  <check if="project-context.md exists">
    <action>Read complete project-context.md file</action>
    <action>Extract key information:
      - Domain and industry
      - Technology stack (backend, frontend, mobile, database)
      - Architecture patterns
      - Coding conventions
      - Testing requirements
      - Development workflow
    </action>
    <action>Set {{has_project_context}} = true</action>
  </check>

  <action>Invoke analyst agent to analyze project materials:
    - Read all files in {project_materials}/requirements/
    - Read all files in {project_materials}/architecture/
    - Read all files in {project_materials}/design/
    - Read all files in {project_materials}/infrastructure/
    - Synthesize comprehensive understanding of project scope and goals
  </action>

  <action>Store analyst findings as:
    - {{project_requirements}} - What the project needs to achieve
    - {{project_architecture}} - How the project is structured
    - {{project_tech_stack}} - Technologies and versions being used
    - {{project_conventions}} - Coding standards and patterns
  </action>

  <output>📚 **Project Context Loaded**

- Domain: {{project_domain}}
- Primary Tech: {{primary_technologies}}
- Architecture: {{architecture_pattern}}
- Conventions: {{key_conventions}}
  </output>
</step>

<step n="3" goal="Determine story scope and type">
  <action>Analyze story file path and content to determine scope:
    - If path contains `apps/[app-name]/` → App-specific story
    - If path contains `packages/[package-name]/` → Shared package story
    - If path contains `docs/stories/` or `docs/todos/` → Project-level story
  </action>

  <action>Analyze story overview and title to determine type:
    - Contains "API", "endpoint", "route" → Backend/API story
    - Contains "component", "page", "UI", "interface" → Frontend story
    - Contains "screen", "navigation", "mobile" → Mobile story
    - Contains "database", "schema", "migration" → Database story
    - Contains "auth", "login", "register" → Authentication story
    - Contains "deployment", "CI/CD", "infrastructure" → DevOps story
    - Other keywords → Determine from context
  </action>

  <action>Store as:
    - {{story_scope}} - App-specific, package, or project-level
    - {{story_type}} - Backend, Frontend, Mobile, Database, etc.
  </action>

  <output>🎯 **Story Scope Determined**

- Scope: {{story_scope}}
- Type: {{story_type}}
- Focus: {{focus_area}}
  </output>
</step>

<step n="4" goal="Web search for latest versions and best practices">
  <critical>Use WebSearch to find latest stable versions of relevant technologies</critical>

  <action>Based on {{story_type}} and {{project_tech_stack}}, identify technologies that need version lookups</action>

  <action>For each relevant technology, perform web search:
    - Search query: "[Technology] latest stable version 2025"
    - Extract latest version number
    - Note any breaking changes or migration notes
    - Identify recommended best practices
  </action>

  <action>Common searches based on story type:

    **Backend/API:**
    - "Express latest version 2025" or "Fastify latest version 2025"
    - "TypeScript latest version 2025"
    - Framework-specific packages (e.g., "express-validator latest")

    **Frontend:**
    - "React latest stable version 2025"
    - "Next.js latest version 2025" or "Vite latest version 2025"
    - UI libraries (e.g., "Tailwind CSS latest version")

    **Mobile:**
    - "React Native latest version 2025"
    - "Expo latest version 2025"
    - "React Navigation latest version 2025"

    **Database:**
    - ORM/client libraries (e.g., "Prisma latest", "Mongoose latest")
    - Database drivers
  </action>

  <action>Store version information as {{latest_versions}} with:
    - Technology name
    - Latest stable version
    - Release date
    - Key features or changes
  </action>

  <output>🔍 **Latest Versions Identified**

{{#each latest_versions}}
- {{technology}}: {{version}} (released {{date}})
{{/each}}
  </output>
</step>

<step n="5" goal="Invoke BMAD master agent to generate story content">
  <critical>Use bmad-master agent to synthesize all information and generate comprehensive story content</critical>

  <action>Invoke bmad-master agent with context:
    - Story metadata: {{story_id}}, {{story_title}}, {{story_overview}}
    - Story scope and type: {{story_scope}}, {{story_type}}
    - Project context: {{project_requirements}}, {{project_architecture}}, {{project_tech_stack}}
    - Coding conventions: {{project_conventions}}
    - Latest versions: {{latest_versions}}
  </action>

  <action>Instruct bmad-master to generate:

    ### User Story
    - Format: "As a [role], I want to [action] so that [benefit]"
    - Derive role from project context
    - Action should be specific and clear
    - Benefit should align with project goals

    ### Acceptance Criteria
    - Minimum 5-8 specific, testable criteria
    - Include success cases and edge cases
    - Reference project conventions and standards
    - Include validation requirements
    - Include error handling requirements
    - Follow coding conventions from project-context.md
    - Include performance considerations
    - Include security considerations (if applicable)

    ### Technical Design

    **Architecture Overview:**
    - High-level approach following project patterns
    - How this fits into existing architecture
    - Key components or modules to create

    **Technology Stack:**
    - Framework: [Name] version [X.Y.Z] (from web search)
    - Key libraries with versions
    - Rationale for technology choices

    **File Structure:**
    - List files to create with their purposes
    - Follow project conventions (kebab-case, etc.)
    - Follow architectural patterns (MVC, component-based, etc.)

    **API Design** (if applicable):
    - Endpoints with HTTP methods
    - Request/response schemas
    - Authentication requirements
    - Error responses

    **Data Models** (if applicable):
    - Database schema
    - Relationships
    - Validation rules

    **Component Structure** (if Frontend/Mobile):
    - Component hierarchy
    - Props and state
    - Hooks or composables

    **Integration Points:**
    - Dependencies on other modules
    - External API integrations
    - Shared utilities or packages

    **Error Handling:**
    - Error scenarios
    - Error messages
    - Recovery strategies

    **Security Considerations:**
    - Authentication/authorization
    - Input validation
    - Data sanitization
    - Security best practices

    ### Implementation Checklist

    Organize into phases with specific, actionable tasks:

    **Phase 1: Setup & Configuration**
    - [ ] Create project structure following conventions
    - [ ] Install dependencies (list with versions)
    - [ ] Configure environment variables
    - [ ] Set up necessary configuration files

    **Phase 2: Core Implementation**
    - [ ] Implement [specific component/module]
    - [ ] Implement [another component/module]
    - [ ] Add validation logic
    - [ ] Implement error handling
    - [ ] Add logging (if applicable)

    **Phase 3: Integration**
    - [ ] Integrate with [existing module/service]
    - [ ] Connect to database (if applicable)
    - [ ] Implement API calls (if applicable)
    - [ ] Add authentication checks (if applicable)

    **Phase 4: Testing**
    - [ ] Write unit tests
    - [ ] Write integration tests
    - [ ] Manual testing checklist
    - [ ] Test all acceptance criteria
    - [ ] Test edge cases and error scenarios

    **Phase 5: Quality & Review**
    - [ ] Run `pnpm typecheck`
    - [ ] Run `pnpm lint`
    - [ ] Review code follows conventions
    - [ ] Run `/bmad:bmm:workflows:code-review`
    - [ ] Address code review findings

    ### Dependencies
    - **Prerequisite Stories:** [List story IDs that must be completed first]
    - **Required Packages:** [List with versions from web search]
    - **External Services:** [List any external APIs or services]
    - **Environment Variables:** [List required env vars]

    ### Testing Strategy

    **Unit Tests:**
    - Test business logic functions
    - Test utility functions
    - Test data transformations
    - Mock external dependencies

    **Integration Tests:**
    - Test API endpoints end-to-end
    - Test database operations
    - Test authentication flows
    - Test error handling

    **Manual Testing:**
    - [ ] Checklist item 1
    - [ ] Checklist item 2
    - [ ] Test all acceptance criteria manually

    **Edge Cases to Test:**
    - Invalid input scenarios
    - Network failure scenarios
    - Authentication failures
    - Concurrent access scenarios

    ### Dev Notes

    **Implementation Considerations:**
    - Important patterns to follow
    - Common pitfalls to avoid
    - Performance optimization tips

    **Edge Cases:**
    - Special scenarios to handle
    - Boundary conditions
    - Race conditions (if applicable)

    **Security Notes:**
    - Security best practices to follow
    - Vulnerabilities to avoid
    - Compliance requirements (if any)

    **Future Enhancements:**
    - Ideas for future improvements
    - Scalability considerations
    - Technical debt to address later
  </action>

  <action>Store generated content as {{filled_story_content}}</action>
</step>

<step n="6" goal="Update story file with generated content">
  <action>Read current story file again to preserve any custom sections</action>

  <action>Merge generated content with existing story structure:
    - Preserve Story ID, Title, Overview
    - Replace or fill empty sections with generated content
    - Keep any manually written notes or comments
    - Ensure all sections are present and complete
  </action>

  <action>Write updated content back to {{story_file}}</action>

  <output>✅ **Story File Updated Successfully!**

**File:** {{story_file}}

**Generated Content:**
- User Story (for {{user_role}})
- {{ac_count}} Acceptance Criteria
- Technical Design ({{story_type}} scope)
- {{task_count}} Implementation Tasks
- Testing Strategy with edge cases
- Dependencies and environment requirements
- Dev Notes with considerations

**🔍 Latest Versions Used:**
{{#each latest_versions}}
- {{technology}}: {{version}}
{{/each}}

**📚 Context Sources:**
- docs/project-context.md
{{#if project_requirements}}
- Project requirements documentation
{{/if}}
{{#if project_architecture}}
- Architecture documentation
{{/if}}

**🎯 Story Status:** Ready for Development

---

## Next Steps

Choose one of the following:

1. **Review the story**
   - Open {{story_file}} to review the generated content
   - Make any adjustments or refinements needed
   - Ensure all sections align with your vision

2. **Start development immediately**
   - Run: `/bmad:bmm:workflows:dev-story {{story_file}}`
   - The dev workflow will implement the story step-by-step

3. **Ask questions**
   - Ask about any section of the story
   - Request clarifications on technical decisions
   - Discuss alternative approaches

Type your choice (1, 2, 3) or type 'go' to start development:
  </output>

  <check if="user types 'go' or '2'">
    <output>🚀 Starting development workflow...

Invoking: /bmad:bmm:workflows:dev-story {{story_file}}
    </output>
    <action>Invoke dev-story workflow with {{story_file}}</action>
  </check>

  <check if="user types '1'">
    <output>Great! Please review {{story_file}} and let me know if you need any changes or clarifications.</output>
  </check>

  <check if="user types '3' or asks questions">
    <output>I'm here to help! Ask me anything about the story content, technical decisions, or implementation approach.</output>
  </check>
</step>

<step n="7" goal="Completion and recommendations">
  <output>
💡 **Tips for Success:**

1. **Review Generated Content**
   - Ensure acceptance criteria cover all requirements
   - Verify technical design aligns with your architecture
   - Check that versions are appropriate for your project

2. **Customize as Needed**
   - Add project-specific requirements
   - Adjust implementation phases if needed
   - Add additional edge cases or considerations

3. **Keep Context Updated**
   - If you learn new patterns, update project-context.md
   - Document architectural decisions
   - Keep technology versions current

4. **Use BMAD Workflows**
   - `/bmad:bmm:workflows:dev-story` - Implement the story
   - `/bmad:bmm:workflows:code-review` - Review implementation
   - Other workflows as needed for your process

---

**Story filling complete!** 🎉
  </output>
</step>

</workflow>
