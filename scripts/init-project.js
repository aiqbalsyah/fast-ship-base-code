#!/usr/bin/env node

/**
 * Project Initialization Script
 *
 * Analyzes user documentation in docs/project-materials/ and generates
 * a comprehensive project-context.md file using BMAD workflows.
 *
 * Usage:
 *   node scripts/init-project.js
 *   pnpm projects:init
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ANSI colors for terminal output
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

async function checkDocumentation() {
  const materialsPath = path.join(projectRoot, 'docs', 'project-materials');

  try {
    // Check if project-materials exists
    await fs.access(materialsPath);

    // Find all markdown files (excluding README and EXAMPLE files)
    const files = await findMarkdownFiles(materialsPath);
    const userFiles = files.filter(
      f =>
        !f.includes('README.md') &&
        !f.includes('EXAMPLE-') &&
        !f.includes('.gitkeep')
    );

    return { exists: true, userFiles, allFiles: files };
  } catch (error) {
    return { exists: false, userFiles: [], allFiles: [] };
  }
}

async function findMarkdownFiles(dir) {
  const files = [];

  async function scan(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  await scan(dir);
  return files;
}

async function analyzeDocumentation(files) {
  const analysis = {
    requirements: [],
    architecture: [],
    design: [],
    infrastructure: [],
  };

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    const relativePath = path.relative(projectRoot, file);

    if (file.includes('/requirements/')) {
      analysis.requirements.push({ path: relativePath, content });
    } else if (file.includes('/architecture/')) {
      analysis.architecture.push({ path: relativePath, content });
    } else if (file.includes('/design/')) {
      analysis.design.push({ path: relativePath, content });
    } else if (file.includes('/infrastructure/')) {
      analysis.infrastructure.push({ path: relativePath, content });
    }
  }

  return analysis;
}

function extractDomain(analysis) {
  // Simple domain extraction from requirements
  const reqText = analysis.requirements
    .map(r => r.content.toLowerCase())
    .join(' ');

  const domains = {
    fintech: ['payment', 'banking', 'finance', 'transaction', 'wallet'],
    ecommerce: ['product', 'cart', 'checkout', 'order', 'shipping'],
    saas: ['subscription', 'tenant', 'workspace', 'dashboard'],
    healthcare: ['patient', 'doctor', 'medical', 'health', 'clinic'],
    education: ['student', 'course', 'learning', 'teacher', 'class'],
    iot: ['device', 'sensor', 'telemetry', 'gateway', 'mqtt'],
    social: ['user', 'post', 'comment', 'follow', 'feed'],
  };

  for (const [domain, keywords] of Object.entries(domains)) {
    const matches = keywords.filter(keyword => reqText.includes(keyword));
    if (matches.length >= 2) {
      return domain;
    }
  }

  return 'general';
}

function extractTechStack(analysis) {
  const archText = analysis.architecture
    .map(a => a.content.toLowerCase())
    .join(' ');

  const stack = {
    backend: [],
    frontend: [],
    mobile: [],
    database: [],
  };

  // Backend
  if (archText.includes('node') || archText.includes('express')) {
    stack.backend.push('Node.js');
  }
  if (archText.includes('python') || archText.includes('flask')) {
    stack.backend.push('Python');
  }
  if (archText.includes('go') || archText.includes('golang')) {
    stack.backend.push('Go');
  }

  // Frontend
  if (archText.includes('react')) stack.frontend.push('React');
  if (archText.includes('next')) stack.frontend.push('Next.js');
  if (archText.includes('vue')) stack.frontend.push('Vue');

  // Mobile
  if (archText.includes('react native')) stack.mobile.push('React Native');
  if (archText.includes('expo')) stack.mobile.push('Expo');
  if (archText.includes('flutter')) stack.mobile.push('Flutter');

  // Database
  if (archText.includes('postgres')) stack.database.push('PostgreSQL');
  if (archText.includes('mongodb') || archText.includes('mongo')) {
    stack.database.push('MongoDB');
  }
  if (archText.includes('firebase') || archText.includes('firestore')) {
    stack.database.push('Firebase/Firestore');
  }

  return stack;
}

async function generateProjectContext(analysis) {
  const domain = extractDomain(analysis);
  const techStack = extractTechStack(analysis);
  const timestamp = new Date().toISOString().split('T')[0];

  let context = `# Project Context

> Generated: ${timestamp}
> Source: User documentation in docs/project-materials/
> Generator: projects:init workflow

---

## Project Overview

`;

  // Requirements section
  if (analysis.requirements.length > 0) {
    context += `### Domain\n${domain.charAt(0).toUpperCase() + domain.slice(1)}\n\n`;
    context += `### Documentation Analyzed\n`;
    analysis.requirements.forEach(r => {
      context += `- ${r.path}\n`;
    });
    context += '\n';
  } else {
    context += `⚠️ **No requirements documentation provided**\n\n`;
  }

  context += `---

## Technology Stack

`;

  // Backend
  if (techStack.backend.length > 0) {
    context += `### Backend\n`;
    techStack.backend.forEach(tech => {
      context += `- ${tech}\n`;
    });
    context += '\n';
  }

  // Frontend
  if (techStack.frontend.length > 0) {
    context += `### Frontend\n`;
    techStack.frontend.forEach(tech => {
      context += `- ${tech}\n`;
    });
    context += '\n';
  }

  // Mobile
  if (techStack.mobile.length > 0) {
    context += `### Mobile\n`;
    techStack.mobile.forEach(tech => {
      context += `- ${tech}\n`;
    });
    context += '\n';
  }

  // Database
  if (techStack.database.length > 0) {
    context += `### Database\n`;
    techStack.database.forEach(tech => {
      context += `- ${tech}\n`;
    });
    context += '\n';
  }

  if (analysis.architecture.length === 0) {
    context += `⚠️ **No architecture documentation provided**\n\n`;
    context += `Please add technology decisions to:\n`;
    context += `docs/project-materials/architecture/tech-stack.md\n\n`;
  }

  context += `---

## Architecture Patterns

`;

  if (analysis.architecture.length > 0) {
    context += `Based on architecture documentation in:\n`;
    analysis.architecture.forEach(a => {
      context += `- ${a.path}\n`;
    });
    context += '\n';
  } else {
    context += `⚠️ **No architecture patterns documented**\n\n`;
  }

  context += `---

## Coding Conventions

### Naming Conventions
- **Files:** kebab-case (enforced by template)
- **Variables:** camelCase (JavaScript/TypeScript)
- **Constants:** UPPER_SNAKE_CASE
- **Components:** kebab-case

### File Structure
- Monorepo with PNPM workspaces
- Apps in \`apps/\` directory
- Shared packages in \`packages/\` directory

### Code Style
- ESLint configuration: See \`.eslintrc.json\`
- Prettier configuration: See \`.prettierrc\`

---

## Infrastructure & Deployment

`;

  if (analysis.infrastructure.length > 0) {
    context += `Infrastructure decisions documented in:\n`;
    analysis.infrastructure.forEach(i => {
      context += `- ${i.path}\n`;
    });
    context += '\n';
  } else {
    context += `⚠️ **No infrastructure documentation provided**\n\n`;
    context += `Consider adding:\n`;
    context += `- Database choice and rationale\n`;
    context += `- Hosting and deployment strategy\n`;
    context += `- CI/CD approach\n\n`;
  }

  context += `---

## Development Workflow

### Testing Requirements
- Unit tests for all business logic
- Integration tests for API endpoints
- E2E tests for critical user flows

### Code Review
- All changes via pull requests
- BMAD code-review workflow: \`/bmad:bmm:workflows:code-review\`

### Documentation
- Update docs/ as features are built
- Maintain README for each app/package

---

## Design System

`;

  if (analysis.design.length > 0) {
    context += `Design specifications documented in:\n`;
    analysis.design.forEach(d => {
      context += `- ${d.path}\n`;
    });
    context += '\n';
  } else {
    context += `⚠️ **No design documentation provided**\n\n`;
  }

  context += `---

## Notes

### Documentation Coverage
- Requirements: ${analysis.requirements.length} file(s)
- Architecture: ${analysis.architecture.length} file(s)
- Design: ${analysis.design.length} file(s)
- Infrastructure: ${analysis.infrastructure.length} file(s)

### Recommendations
1. Review this context file and add missing information
2. Update as project evolves by re-running \`pnpm projects:init\`
3. Use this as the "bible" for all BMAD workflows

### Conventions from Template
This template enforces:
- kebab-case file naming
- PNPM workspace monorepo
- Domain-agnostic structure

---

**This document guides all AI-assisted development work.**
**Update as your project evolves!**
`;

  return context;
}

async function main() {
  try {
    banner('🚀 PROJECT INITIALIZATION');

    log('Analyzing project documentation...', 'cyan');

    // Check for documentation
    const { exists, userFiles } = await checkDocumentation();

    if (!exists) {
      log('', 'reset');
      log('⚠️  Project materials directory not found!', 'yellow');
      log('', 'reset');
      log('Please ensure docs/project-materials/ exists.', 'reset');
      process.exit(1);
    }

    if (userFiles.length === 0) {
      log('', 'reset');
      log('⚠️  No project documentation found!', 'yellow');
      log('', 'reset');
      log('Please add your project documentation to docs/project-materials/:', 'reset');
      log('', 'reset');
      log('Required (at minimum):', 'bright');
      log('  docs/project-materials/requirements/', 'reset');
      log('    - Add your PRD, requirements, or feature list', 'reset');
      log('', 'reset');
      log('  docs/project-materials/architecture/', 'reset');
      log('    - Add your tech stack decisions', 'reset');
      log('', 'reset');
      log('Optional but recommended:', 'bright');
      log('  docs/project-materials/design/', 'reset');
      log('  docs/project-materials/infrastructure/', 'reset');
      log('', 'reset');
      log('See docs/project-materials/README.md for guidance.', 'cyan');
      log('', 'reset');
      log('After adding docs, run: pnpm projects:init', 'green');
      log('', 'reset');
      process.exit(1);
    }

    log(`Found ${userFiles.length} documentation file(s)`, 'green');
    log('', 'reset');

    // Analyze documentation
    log('📊 Analyzing documentation...', 'cyan');
    const analysis = await analyzeDocumentation(userFiles);

    log(`  ✓ Requirements: ${analysis.requirements.length} file(s)`, 'green');
    log(`  ✓ Architecture: ${analysis.architecture.length} file(s)`, 'green');
    log(`  ✓ Design: ${analysis.design.length} file(s)`, 'green');
    log(`  ✓ Infrastructure: ${analysis.infrastructure.length} file(s)`, 'green');
    log('', 'reset');

    // Generate project context
    log('✍️  Generating project-context.md...', 'cyan');
    const context = await generateProjectContext(analysis);

    // Write to file
    const contextPath = path.join(projectRoot, 'docs', 'project-context.md');
    await fs.writeFile(contextPath, context, 'utf-8');

    log('✅ Generated: docs/project-context.md', 'green');
    log('', 'reset');

    // Success message
    banner('✅ PROJECT INITIALIZED SUCCESSFULLY!');

    log('📄 Generated: docs/project-context.md', 'bright');
    log('', 'reset');

    log('🎯 Next Steps:', 'cyan');
    log('', 'reset');
    log('1. Review project-context.md', 'bright');
    log('   Open the file and verify the AI understood your project.', 'reset');
    log('', 'reset');
    log('2. Make adjustments if needed', 'bright');
    log('   Edit project-context.md to clarify or add information.', 'reset');
    log('', 'reset');
    log('3. Add your first app', 'bright');
    log('   Run: pnpm projects:add', 'green');
    log('', 'reset');
    log('4. Start building with BMAD', 'bright');
    log('   Create stories: pnpm create:story', 'green');
    log('   Develop stories: /bmad:bmm:workflows:dev-story [story-file]', 'green');
    log('', 'reset');

    log('📚 Need help?', 'cyan');
    log('   - docs/project-guides/00-getting-started.md', 'reset');
    log('   - docs/project-guides/03-bmad-workflows.md', 'reset');
    log('', 'reset');
  } catch (error) {
    log('', 'reset');
    log('❌ Error during initialization:', 'red');
    log(error.message, 'red');
    log('', 'reset');
    log('Stack trace:', 'yellow');
    console.error(error);
    process.exit(1);
  }
}

main();
