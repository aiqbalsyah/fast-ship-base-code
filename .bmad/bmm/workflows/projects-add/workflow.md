---
name: Add App to Monorepo
description: Intelligently scaffold new apps in the monorepo using context from project-context.md
version: 1.0.0
---

# Add App Workflow

**Goal:** Scaffold new applications in `apps/` folder with intelligent defaults based on project-context.md and user choices.

**Philosophy:** Context-aware scaffolding - read project context, follow established conventions, provide sensible defaults.

---

## Prerequisites

- ✅ `docs/project-context.md` exists (created by projects:init)
- ✅ User knows what type of app they want to add
- ✅ Monorepo structure is intact

---

## Workflow Steps

### Step 1: Read Project Context

**Action:** Load and parse `docs/project-context.md` to understand project conventions.

**Extract:**
- **Tech Stack:** What technologies are already in use?
- **Naming Conventions:** File naming patterns (should be kebab-case)
- **Code Style:** ESLint, Prettier configurations
- **Testing Requirements:** What testing approach is used?
- **Architecture Patterns:** API design, state management preferences

**Purpose:** Ensure new app follows existing project standards.

---

### Step 2: Determine App Type

**Action:** Ask user what type of app they want to add.

**Options:**
1. **Node.js API** - Express, Fastify, or Hono backend
2. **Python API** - Flask or FastAPI backend
3. **React Web** - Vite, Next.js, or CRA frontend
4. **React Native Mobile** - Bare RN, Expo, or Expo Router
5. **Custom** - User provides their own structure

**Validation:**
- Option must be 1-5
- If invalid, re-prompt

---

### Step 3: Gather App Details

**Action:** Collect necessary information for scaffolding.

**Required Information:**
- **App Name:** kebab-case (e.g., `my-api`, `mobile-app`)
- **App Description:** Brief description for package.json

**Type-Specific Questions:**

**For Node.js API:**
- Framework: Express, Fastify, or Hono?
- Port: Default 3000 or custom?
- TypeScript: Yes/No?

**For Python API:**
- Framework: Flask or FastAPI?
- Port: Default 8000 or custom?

**For React Web:**
- Framework: Vite, Next.js, or Create React App?
- Port: Default 3001 or custom?

**For React Native Mobile:**
- **CRITICAL:** Offer three distinct options:
  1. **Bare React Native** - Full control, native code access
  2. **Expo (Managed)** - Simplified development, managed workflow
  3. **Expo Router** - File-based routing with Expo

**For Custom:**
- User provides path to template or manual setup instructions

**Validation:**
- App name must be kebab-case
- App name must not conflict with existing apps/
- Ports must not conflict

---

### Step 4: Scaffold App Structure

**Action:** Create app folder and files based on type and choices.

**Common Structure:**
```
apps/{app-name}/
├── package.json
├── README.md
├── .gitignore
├── tsconfig.json (if TypeScript)
└── src/
```

**Type-Specific Scaffolding:**

#### Node.js API (Express Example)
```
apps/{app-name}/
├── package.json
├── README.md
├── .gitignore
├── tsconfig.json
└── src/
    ├── index.ts
    ├── routes/
    │   └── health.ts
    └── middleware/
```

**Key Files:**
- `src/index.ts`: Server setup with chosen framework
- `src/routes/health.ts`: Basic health check endpoint
- `package.json`: Dependencies for framework, scripts for dev/build/start

#### Python API (Flask Example)
```
apps/{app-name}/
├── requirements.txt
├── README.md
├── .gitignore
└── src/
    ├── app.py
    └── routes/
        └── health.py
```

**Key Files:**
- `src/app.py`: Flask/FastAPI app setup
- `requirements.txt`: Dependencies
- README with Python environment setup instructions

#### React Web (Vite Example)
```
apps/{app-name}/
├── package.json
├── README.md
├── .gitignore
├── tsconfig.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.tsx
    ├── app.tsx
    └── components/
```

**Key Files:**
- `src/main.tsx`: React entry point
- `src/app.tsx`: Root component
- `vite.config.ts`: Vite configuration
- `package.json`: React, Vite dependencies

#### React Native - Bare
```
apps/{app-name}/
├── package.json
├── README.md
├── app.json
├── metro.config.js
├── android/
├── ios/
└── src/
    ├── app.tsx
    └── components/
```

**Setup:**
- Run `npx react-native init {AppName}` workflow
- Restructure to monorepo conventions
- Add to PNPM workspace

#### React Native - Expo (Managed)
```
apps/{app-name}/
├── package.json
├── README.md
├── app.json
├── babel.config.js
└── src/
    ├── app.tsx
    └── components/
```

**Setup:**
- Run `npx create-expo-app {app-name}` workflow
- Configure for monorepo
- Add to PNPM workspace

#### React Native - Expo Router
```
apps/{app-name}/
├── package.json
├── README.md
├── app.json
├── babel.config.js
└── app/
    ├── _layout.tsx
    ├── index.tsx
    └── (tabs)/
```

**Setup:**
- Run `npx create-expo-app {app-name} --template tabs` workflow
- Configure file-based routing
- Add to PNPM workspace

---

### Step 5: Configure Package Integration

**Action:** Integrate new app into monorepo workspace.

**Tasks:**

1. **Update Root `package.json`:**
   Add scripts for the new app:
   ```json
   {
     "scripts": {
       "dev:{app-name}": "pnpm --filter {app-name} dev",
       "build:{app-name}": "pnpm --filter {app-name} build",
       "test:{app-name}": "pnpm --filter {app-name} test"
     }
   }
   ```

2. **Update `pnpm-workspace.yaml`:**
   Ensure apps/* is included:
   ```yaml
   packages:
     - 'apps/*'
     - 'packages/*'
   ```

3. **Add App README:**
   Create `apps/{app-name}/README.md` with:
   - App purpose and description
   - Development setup instructions
   - Available scripts
   - Technology stack
   - Links to relevant docs

---

### Step 6: Install Dependencies

**Action:** Run package installation for new app.

**Commands:**
```bash
# From project root
pnpm install
```

**Validation:**
- ✅ All dependencies installed
- ✅ No errors in installation
- ✅ New app appears in workspace

---

### Step 7: Verify Setup

**Action:** Test that the new app works.

**Verification Steps:**

**For APIs:**
```bash
pnpm dev:{app-name}
# Should start server without errors
# Health endpoint should respond
```

**For Web Apps:**
```bash
pnpm dev:{app-name}
# Should start dev server
# Should open in browser
```

**For Mobile Apps:**
```bash
cd apps/{app-name}
# For Bare RN:
npx react-native run-ios  # or run-android

# For Expo:
npx expo start
```

---

### Step 8: Display Success and Next Steps

**Action:** Confirm success and guide user on what to do next.

**Output:**

```
✅ App added successfully!

📦 Created: apps/{app-name}

📊 App Details:
- Type: {app-type}
- Framework: {framework}
- Port: {port}
- Language: {TypeScript/JavaScript/Python}

🎯 Next Steps:

1. Review the app structure
   cd apps/{app-name}

2. Start development
   pnpm dev:{app-name}

3. Read the app README
   Open apps/{app-name}/README.md for details

4. Create your first story
   pnpm create:story
   Select app: {app-name}

5. Develop with BMAD
   /bmad:bmm:workflows:dev-story [story-file]

📚 Need help?
- docs/project-guides/02-adding-apps.md
- apps/{app-name}/README.md
```

---

## Error Handling

### App Name Conflict

**If:** App with same name already exists in `apps/`

**Action:**
```
⚠️  App already exists: apps/{app-name}

Choose a different name or remove the existing app first.

Existing apps:
- {list of existing apps}
```

**Exit:** Don't overwrite existing apps

---

### No project-context.md Found

**If:** `docs/project-context.md` doesn't exist

**Action:**
```
⚠️  Project context not found!

Please run projects:init first to generate project-context.md:

  pnpm projects:init

This ensures new apps follow your project conventions.
```

**Exit:** Can't proceed without context

---

### Invalid App Name

**If:** App name doesn't follow kebab-case or contains invalid characters

**Action:**
```
❌ Invalid app name: {app-name}

App names must be:
- kebab-case (lowercase with hyphens)
- Start with a letter
- Contain only letters, numbers, hyphens

Examples:
✅ my-api
✅ mobile-app
✅ admin-dashboard
❌ MyAPI
❌ mobile_app
❌ 123-app
```

**Retry:** Prompt for valid name

---

### Port Conflict

**If:** Requested port is already in use by another app

**Action:**
```
⚠️  Port {port} is already used by apps/{other-app}

Please choose a different port:
```

**Retry:** Prompt for different port

---

### Installation Failure

**If:** `pnpm install` fails

**Action:**
```
❌ Failed to install dependencies

Error: {error-message}

Troubleshooting:
1. Check your internet connection
2. Verify pnpm version: pnpm --version
3. Try: pnpm install --force
4. Check package.json for syntax errors

Need help? See docs/project-guides/02-adding-apps.md
```

**Exit:** Manual intervention required

---

## Success Criteria

This workflow succeeds when:

1. ✅ New app created in `apps/{app-name}/`
2. ✅ App follows conventions from project-context.md
3. ✅ All dependencies installed successfully
4. ✅ App starts without errors
5. ✅ Root package.json updated with app scripts
6. ✅ App README created with setup instructions
7. ✅ User receives clear next steps

---

## Integration with Other Workflows

**This workflow requires:**
- `projects:init` - Must run first to create project-context.md

**This workflow enables:**
- `create-story` - Can now create stories for this app
- `dev-story` - Can develop features for this app
- All BMAD workflows - Can target this app

---

## Context Awareness

**Use project-context.md to:**
- Auto-detect preferred frameworks from existing apps
- Follow established naming conventions
- Use same code style (ESLint, Prettier)
- Match testing approach (Jest, Vitest, pytest)
- Apply same architecture patterns

**Example:**
If project-context.md shows:
```markdown
### Backend
- Node.js with Express
- TypeScript
- Port 3000
```

When adding a new API, suggest:
- Express (already used)
- TypeScript (already used)
- Port 3001 (next available)

---

## Notes

- This workflow is context-aware by design
- Reads project-context.md for intelligent defaults
- Supports multiple technologies flexibly
- Ensures consistency across monorepo
- Provides clear next steps for development

---

**Remember:** Every new app should feel like it belongs in the monorepo - consistent naming, structure, and conventions throughout!
