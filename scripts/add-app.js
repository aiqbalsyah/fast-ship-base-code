#!/usr/bin/env node

/**
 * Add App Script
 *
 * Creates a BMAD story for adding a new app to the monorepo.
 * The story is then filled and implemented by Claude Code using project context.
 *
 * Usage:
 *   Interactive: node scripts/add-app.js
 *   pnpm projects:add
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function banner(message) {
  console.log('');
  log('═'.repeat(60), 'cyan');
  log(`  ${message}`, 'bright');
  log('═'.repeat(60), 'cyan');
  console.log('');
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(`${colors.cyan}${prompt}${colors.reset} `, resolve);
  });
}

async function checkProjectContext() {
  const contextPath = path.join(projectRoot, 'docs', 'project-context.md');
  try {
    await fs.access(contextPath);
    return true;
  } catch {
    return false;
  }
}

async function getExistingApps() {
  const appsPath = path.join(projectRoot, 'apps');
  try {
    await fs.access(appsPath);
    const entries = await fs.readdir(appsPath, { withFileTypes: true });
    return entries.filter(e => e.isDirectory()).map(e => e.name);
  } catch {
    return [];
  }
}

function validateAppName(name) {
  const kebabCaseRegex = /^[a-z][a-z0-9-]*$/;
  if (!kebabCaseRegex.test(name)) {
    return {
      valid: false,
      error: 'App name must be kebab-case (lowercase, letters, numbers, hyphens)',
    };
  }
  return { valid: true };
}

async function main() {
  try {
    banner('📦 ADD NEW APP');

    // Check project context
    log('Checking project context...', 'cyan');
    const contextExists = await checkProjectContext();

    if (!contextExists) {
      log('', 'reset');
      log('⚠️  Project context not found!', 'yellow');
      log('', 'reset');
      log('Please run projects:init first:', 'reset');
      log('  pnpm projects:init', 'green');
      log('', 'reset');
      rl.close();
      process.exit(1);
    }

    log('✓ Project context found', 'green');
    log('', 'reset');

    // Get existing apps
    const existingApps = await getExistingApps();
    if (existingApps.length > 0) {
      log('Existing apps:', 'cyan');
      existingApps.forEach(app => log(`  - ${app}`, 'reset'));
      log('', 'reset');
    }

    // Prompt for app details
    log('📝 App Details', 'bright');
    log('', 'reset');

    // App type
    log('What type of app do you want to add?', 'cyan');
    log('', 'reset');
    log('1. Node.js API (Express, Fastify, or Hono)', 'reset');
    log('2. Python API (Flask or FastAPI)', 'reset');
    log('3. React Web (Vite, Next.js, or CRA)', 'reset');
    log('4. React Native Mobile (Bare, Expo, or Expo Router)', 'reset');
    log('5. Custom', 'reset');
    log('', 'reset');

    const appTypeChoice = await question('Enter your choice (1-5): ');
    const appTypeNum = parseInt(appTypeChoice.trim());

    const appTypes = {
      1: { type: 'nodejs', label: 'Node.js API' },
      2: { type: 'python', label: 'Python API' },
      3: { type: 'react-web', label: 'React Web' },
      4: { type: 'react-native', label: 'React Native Mobile' },
      5: { type: 'custom', label: 'Custom' },
    };

    if (!appTypes[appTypeNum]) {
      log('❌ Invalid choice', 'red');
      rl.close();
      process.exit(1);
    }

    const appType = appTypes[appTypeNum];
    log('', 'reset');

    // App name
    let appName;
    while (true) {
      appName = await question('App name (kebab-case): ');
      appName = appName.trim();

      const validation = validateAppName(appName);
      if (!validation.valid) {
        log(`❌ ${validation.error}`, 'red');
        continue;
      }

      if (existingApps.includes(appName)) {
        log(`❌ App already exists: ${appName}`, 'red');
        continue;
      }

      break;
    }

    log('', 'reset');

    // Framework/variant
    let framework = '';
    if (appType.type === 'nodejs') {
      framework = await question('Framework (express/fastify/hono) [express]: ');
      framework = framework.trim() || 'express';
    } else if (appType.type === 'python') {
      framework = await question('Framework (flask/fastapi) [flask]: ');
      framework = framework.trim() || 'flask';
    } else if (appType.type === 'react-web') {
      framework = await question('Framework (vite/nextjs/cra) [nextjs]: ');
      framework = framework.trim() || 'nextjs';
    } else if (appType.type === 'react-native') {
      log('Choose variant:', 'cyan');
      log('1. Bare React Native', 'reset');
      log('2. Expo (Managed)', 'reset');
      log('3. Expo Router', 'reset');
      const variantChoice = await question('Choice (1-3) [2]: ');
      const variants = { 1: 'bare', 2: 'expo', 3: 'expo-router' };
      framework = variants[parseInt(variantChoice.trim()) || 2];
    }

    log('', 'reset');

    // Port
    const port = await question('Port [auto]: ');
    const portNum = port.trim() || 'auto';

    log('', 'reset');

    // TypeScript
    let useTypescript = true;
    if (appType.type === 'nodejs' || appType.type === 'react-web') {
      const tsChoice = await question('Use TypeScript? (y/n) [y]: ');
      useTypescript = !tsChoice.trim() || tsChoice.toLowerCase() === 'y';
    }

    // Create story
    log('', 'reset');
    log('📝 Creating story file...', 'cyan');

    const storyId = `add-${appName}-app`;
    const storyDir = path.join(projectRoot, 'docs', 'stories');
    const storyPath = path.join(storyDir, `${storyId}.md`);

    await fs.mkdir(storyDir, { recursive: true });

    const storyContent = `---
id: ${storyId}
title: Add ${appName} ${appType.label}
app: ${appName}
status: draft
created: ${new Date().toISOString().split('T')[0]}
---

# Add ${appName} ${appType.label}

## Overview

Create a new ${appType.label} application called "${appName}" in the monorepo with proper modular architecture.

**Requirements:**
- **Type**: ${appType.label}
- **Framework**: ${framework}
- **Port**: ${portNum}
- **Language**: ${useTypescript ? 'TypeScript' : 'JavaScript'}

## User Story

As a developer,
I want to scaffold a new ${appType.label} app called "${appName}",
So that I can start building features following project conventions and using the latest stable framework versions.

## Acceptance Criteria

- [ ] App created in \`apps/${appName}/\` following project conventions from \`docs/project-context.md\`
- [ ] **CRITICAL**: Use latest stable versions (web search for "${framework} latest version 2025")
- [ ] Modular architecture implemented:
  ${appType.type === 'nodejs' || appType.type === 'python' ? `  - routes/ (API endpoint definitions)
  - controllers/ (request/response handling)
  - services/ (business logic)
  - models/ (data types)
  - middleware/ (auth, logging, etc.)
  - utils/ (helpers)
  - config/ (configuration)` : `  - components/ (UI components)
  - hooks/ (custom React hooks)
  - utils/ (helper functions)
  - pages/ or app/ (routing)`}
- [ ] Health check endpoint (for APIs) or welcome page (for frontends) working
- [ ] README.md with setup instructions
- [ ] package.json with all dependencies (LATEST versions)
- [ ] Root package.json updated with \`dev:${appName}\`, \`build:${appName}\`, \`test:${appName}\` scripts
- [ ] .gitignore configured
- [ ] TypeScript configured (tsconfig.json)${useTypescript ? ' ✓' : ' (skip)'}
- [ ] App starts without errors
- [ ] Follows kebab-case file naming convention
- [ ] All dependencies installed successfully

## Technical Design

**Claude Code will fill this section** after web searching for:
- "${framework} latest version 2025"
- "TypeScript latest version 2025"${appType.type === 'nodejs' ? '\n- "Node.js LTS 2025"' : ''}${appType.type === 'react-web' ? '\n- "React latest version 2025"' : ''}

### Structure
\`\`\`
apps/${appName}/
├── package.json
├── README.md
├── .gitignore
${useTypescript ? '├── tsconfig.json\n' : ''}├── src/
${appType.type === 'nodejs' || appType.type === 'python' ? `│   ├── index.${useTypescript ? 'ts' : 'js'}
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   └── config/` : `│   ├── app/
│   ├── components/
│   ├── hooks/
│   └── utils/`}
└── tests/
\`\`\`

## Tasks

**Phase 1: Web Search for Latest Versions**
- [ ] Search "${framework} latest version 2025"
- [ ] Search "TypeScript latest version 2025"
- [ ] Search for other dependency latest versions
- [ ] Document versions in Technical Design

**Phase 2: Create Structure**
- [ ] Create \`apps/${appName}/\` directory
- [ ] Create modular folder structure
- [ ] Create package.json with LATEST versions
- [ ] Create tsconfig.json (if TypeScript)
- [ ] Create .gitignore

**Phase 3: Implement**
- [ ] Create entry point (index.${useTypescript ? 'ts' : 'js'})
- [ ] Create ${appType.type === 'nodejs' || appType.type === 'python' ? 'health check endpoint' : 'welcome page'}
- [ ] Create example ${appType.type === 'nodejs' || appType.type === 'python' ? 'controller + service' : 'component + hook'}
- [ ] Create config files
- [ ] Create middleware/utils
- [ ] Create comprehensive README.md

**Phase 4: Integration**
- [ ] Update root package.json with app scripts
- [ ] Install dependencies: \`pnpm install\`
- [ ] Verify app starts: \`pnpm dev:${appName}\`

**Phase 5: Validation**
- [ ] Run typecheck (if applicable)
- [ ] Run lint (if configured)
- [ ] Test ${appType.type === 'nodejs' || appType.type === 'python' ? 'health endpoint' : 'welcome page'}
- [ ] Verify modular structure follows conventions

## Testing

- [ ] App starts without errors
- [ ] ${appType.type === 'nodejs' || appType.type === 'python' ? 'Health endpoint returns 200 OK' : 'Welcome page renders'}
- [ ] All dependencies installed
- [ ] TypeScript compiles (if applicable)
- [ ] Follows project coding conventions

## Notes

- **Always use LATEST stable versions** - web search required!
- Follow conventions from \`docs/project-context.md\`
- Use modular architecture for maintainability
- Include comprehensive README with setup instructions
`;

    await fs.writeFile(storyPath, storyContent, 'utf-8');

    log('✅ Story created successfully!', 'green');
    log('', 'reset');

    banner('🎯 NEXT STEPS');

    log('Story file created:', 'bright');
    log(`  ${storyPath}`, 'green');
    log('', 'reset');

    log('Now run these commands in order:', 'cyan');
    log('', 'reset');

    log('1️⃣  Fill the story with Claude Code:', 'bright');
    log(`   /fill-story ${storyPath}`, 'green');
    log('   (Claude will web search for latest versions and fill details)', 'reset');
    log('', 'reset');

    log('2️⃣  Review the filled story:', 'bright');
    log(`   Open: ${storyPath}`, 'reset');
    log('   (Verify latest versions and technical design)', 'reset');
    log('', 'reset');

    log('3️⃣  Implement with Claude Code:', 'bright');
    log(`   /bmad:bmm:workflows:dev-story ${storyPath}`, 'green');
    log('   (Claude will scaffold the app following the story)', 'reset');
    log('', 'reset');

    log('📚 Or simply type: "go" after reviewing the filled story!', 'cyan');
    log('', 'reset');

    rl.close();
  } catch (error) {
    log('', 'reset');
    log('❌ Error:', 'red');
    log(error.message, 'red');
    console.error(error);
    rl.close();
    process.exit(1);
  }
}

main();
