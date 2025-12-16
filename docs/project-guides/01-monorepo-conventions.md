# Monorepo Conventions

This guide explains the naming conventions, folder structure standards, and best practices for organizing your monorepo.

---

## Naming Conventions

### Package Names

Use scoped packages with consistent naming:

```
@{scope}/app-{name}      # For applications
@{scope}/{package-name}   # For shared packages
```

**Examples:**
```json
{
  "name": "@mycompany/app-api",
  "name": "@mycompany/app-web",
  "name": "@mycompany/app-mobile",
  "name": "@mycompany/shared-types",
  "name": "@mycompany/ui-components"
}
```

**Your scope** is typically:
- Your company name (e.g., `@acme`)
- Your project name (e.g., `@myproject`)
- Your product name (e.g., `@myapp`)

Choose one scope and use it consistently across all packages.

### Directory Names

- **apps/** - Use kebab-case: `api`, `web`, `mobile`, `admin-panel`
- **packages/** - Use kebab-case: `shared-types`, `ui-components`, `utils`

### File Names

Follow these conventions based on technology:

**TypeScript/JavaScript:**
- Components: `kebab-case.tsx` (e.g., `user-profile.tsx`, `nav-bar.tsx`)
- Utilities: `kebab-case.ts`
- Configs: `kebab-case.config.ts`

**Python:**
- Modules: `snake_case.py`
- Classes: defined in PascalCase within files

---

## Folder Structure

### Root Structure

```
monorepo-root/
├── .bmad/                    # BMAD workflows (don't modify casually)
├── apps/                     # Your applications
├── packages/                 # Shared libraries
├── docs/                     # Documentation
├── scripts/                  # Automation scripts
├── .gitignore
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

### Application Structure (apps/)

Each app is self-contained:

```
apps/api/
├── src/
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utilities
│   └── index.ts             # Entry point
├── tests/
├── package.json
├── tsconfig.json            # If using TypeScript
└── README.md
```

**Flexibility**: Your app structure adapts to YOUR conventions from project-context.md

### Package Structure (packages/)

Shared packages should be small and focused:

```
packages/shared-types/
├── src/
│   ├── user.ts
│   ├── product.ts
│   └── index.ts             # Export everything
├── package.json
├── tsconfig.json
└── README.md
```

---

## Workspace Configuration

### pnpm-workspace.yaml

This file defines what's included in your workspace:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

**Don't modify** unless you're adding new top-level directories.

### Package Dependencies

Reference workspace packages using `workspace:*`:

```json
{
  "dependencies": {
    "@myproject/shared-types": "workspace:*",
    "@myproject/ui-components": "workspace:*"
  }
}
```

This ensures PNPM links local packages instead of looking for published versions.

---

## Import/Export Patterns

### Shared Packages - Clean Exports

Always export through an index file:

```typescript
// packages/shared-types/src/user.ts
export interface User {
  id: string;
  name: string;
}

// packages/shared-types/src/index.ts
export * from './user';
export * from './product';
```

### Apps - Import from Packages

```typescript
// apps/api/src/routes/users.ts
import { User } from '@myproject/shared-types';
```

### Circular Dependencies

❌ **Avoid**:
```
app-api depends on shared-types
shared-types depends on app-api
```

✅ **Instead**:
- Keep shared packages independent
- Apps can depend on packages
- Packages should NOT depend on apps

---

## Technology-Specific Conventions

### TypeScript Projects

**tsconfig.json** (root):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**App/Package tsconfig** extends root:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Python Projects

```
apps/api/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── routes/
│   └── services/
├── tests/
├── requirements.txt
└── setup.py
```

### React Native with Expo

```
apps/mobile/
├── src/
│   ├── screens/
│   ├── components/
│   ├── navigation/
│   └── App.tsx
├── app.json
├── package.json
└── tsconfig.json
```

---

## Scripts and Commands

### Root package.json Scripts

These run across ALL packages:

```json
{
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r build",
    "typecheck": "pnpm -r typecheck",
    "lint": "pnpm -r lint",
    "test": "pnpm -r test"
  }
}
```

**-r** = recursive (all workspace packages)
**--parallel** = run simultaneously

### App-Specific Scripts

Each app defines its own scripts:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src"
  }
}
```

### Running Commands

```bash
# All apps
pnpm dev                      # Run all apps in parallel
pnpm build                    # Build everything

# Specific app
pnpm --filter @myproject/app-api dev
cd apps/api && pnpm dev

# Specific package
pnpm --filter @myproject/shared-types build
```

---

## Version Management

### Unified Versioning

Keep all workspace packages at the same version:

```json
{
  "version": "1.0.0"
}
```

Update all packages together when releasing.

### Independent Versioning

Or version packages independently:

```
@myproject/app-api@1.2.0
@myproject/app-web@1.1.5
@myproject/shared-types@2.0.1
```

Choose based on your release strategy.

---

## Best Practices

### 1. Keep Apps Independent

Apps should be runnable in isolation:

```bash
cd apps/api
pnpm install
pnpm dev
```

### 2. Shared Code in Packages

If code is used by 2+ apps, move it to a shared package.

### 3. Document Dependencies

Each package should have a clear README:

```markdown
# @myproject/shared-types

Shared TypeScript types for all apps.

## Installation

\`\`\`json
{
  "dependencies": {
    "@myproject/shared-types": "workspace:*"
  }
}
\`\`\`

## Usage

\`\`\`typescript
import { User } from '@myproject/shared-types';
\`\`\`
```

### 4. Use Path Aliases Sparingly

Prefer explicit imports:

✅ Good:
```typescript
import { User } from '@myproject/shared-types';
```

❌ Avoid:
```typescript
import { User } from '@/types';  // Magic path alias
```

### 5. Consistent Code Style

Use shared configs:

```
packages/eslint-config/
packages/typescript-config/
packages/prettier-config/
```

Apps extend these:

```json
{
  "extends": ["@myproject/eslint-config"]
}
```

---

## Monorepo Benefits

### Code Sharing

Share types, utilities, UI components across apps without publishing to npm.

### Atomic Changes

Update multiple apps in a single commit/PR:

```bash
git commit -m "feat: add user type to shared-types and use in api & web"
```

### Consistent Tooling

All apps use the same TypeScript version, ESLint config, testing framework.

### Simplified Testing

Test interactions between apps without integration headaches.

---

## Monorepo Challenges

### Build Times

Large monorepos can have slow build times. Use:
- Turborepo or Nx for caching
- Selective builds (`pnpm --filter`)

### Dependency Hell

Keep dependencies consistent. Use `pnpm why` to debug.

### Learning Curve

Team members need to understand workspace linking.

---

## Customizing Conventions

These are RECOMMENDED conventions. Your project may have different needs!

**To customize:**

1. Update `docs/project-materials/architecture/` with YOUR conventions
2. Re-run `pnpm projects:init` to regenerate project-context.md
3. Future `pnpm projects:add` commands will use YOUR conventions

**Example custom convention:**

```markdown
# docs/project-materials/architecture/naming-conventions.md

## Our Naming Standard

- Apps: PascalCase (`Api`, `WebDashboard`)
- Packages: camelCase (`sharedTypes`, `uiComponents`)
- Files: PascalCase for all files
```

The AI will learn and apply YOUR conventions!

---

## Summary

✅ **Use scoped packages**: `@scope/app-name`, `@scope/package-name`
✅ **Keep apps independent**: Each app should run standalone
✅ **Share via packages**: Don't duplicate code across apps
✅ **Consistent scripts**: Use same script names (dev, build, test)
✅ **Document everything**: Each app/package needs a README
✅ **Customize freely**: Update docs, re-run init, conventions adapt

---

**Next**: Read `02-adding-apps.md` to learn about app scaffolding in detail.
