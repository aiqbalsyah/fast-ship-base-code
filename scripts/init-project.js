#!/usr/bin/env node

/**
 * Project Initialization Script
 *
 * Validates that user documentation exists in docs/project-materials/
 * and directs users to run the BMAD init-project workflow for AI-powered analysis.
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

async function main() {
  try {
    banner('🚀 PROJECT INITIALIZATION');

    log('Validating project documentation...', 'cyan');
    log('', 'reset');

    // Check for documentation
    const { exists, userFiles } = await checkDocumentation();

    if (!exists) {
      log('⚠️  Project materials directory not found!', 'yellow');
      log('', 'reset');
      log('Please create: docs/project-materials/', 'reset');
      log('', 'reset');
      log('Then add your project documentation:', 'bright');
      log('  docs/project-materials/requirements/  - PRD, features, requirements', 'reset');
      log('  docs/project-materials/architecture/  - Tech stack, system design', 'reset');
      log('  docs/project-materials/design/        - UI/UX specs (optional)', 'reset');
      log('  docs/project-materials/infrastructure/ - Deployment, hosting (optional)', 'reset');
      log('', 'reset');
      log('See docs/project-materials/README.md for guidance.', 'cyan');
      log('', 'reset');
      process.exit(1);
    }

    if (userFiles.length === 0) {
      log('⚠️  No project documentation found!', 'yellow');
      log('', 'reset');
      log('Found directory: docs/project-materials/', 'reset');
      log('But no markdown files detected (excluding README and EXAMPLE files).', 'reset');
      log('', 'reset');
      log('Please add your project documentation:', 'bright');
      log('', 'reset');
      log('Required (minimum):', 'cyan');
      log('  docs/project-materials/requirements/', 'reset');
      log('    - PRD, user stories, feature specifications', 'reset');
      log('', 'reset');
      log('  docs/project-materials/architecture/', 'reset');
      log('    - Technology stack, system architecture', 'reset');
      log('', 'reset');
      log('Optional but recommended:', 'cyan');
      log('  docs/project-materials/design/', 'reset');
      log('    - UI/UX specifications, design system', 'reset');
      log('', 'reset');
      log('  docs/project-materials/infrastructure/', 'reset');
      log('    - Deployment, hosting, infrastructure', 'reset');
      log('', 'reset');
      log('See docs/project-materials/README.md and EXAMPLE files for guidance.', 'cyan');
      log('', 'reset');
      process.exit(1);
    }

    // Documentation found - direct to BMAD workflow
    log(`✅ Found ${userFiles.length} documentation file(s)`, 'green');
    log('', 'reset');

    banner('✨ READY FOR AI-POWERED ANALYSIS');

    log('Your documentation is ready for analysis!', 'bright');
    log('', 'reset');
    log('To generate your project-context.md with AI:', 'cyan');
    log('', 'reset');
    log('1. Open Claude Code (if not already open)', 'bright');
    log('', 'reset');
    log('2. Run the BMAD init-project workflow:', 'bright');
    log('', 'reset');
    log('   /bmad:bmm:workflows:init-project', 'green');
    log('', 'reset');
    log('This workflow will:', 'cyan');
    log('  ✓ Analyze your documentation using AI', 'reset');
    log('  ✓ Extract domain, tech stack, and architecture', 'reset');
    log('  ✓ Generate comprehensive project-context.md', 'reset');
    log('  ✓ Provide intelligent recommendations', 'reset');
    log('', 'reset');

    log('📚 Documentation to be analyzed:', 'cyan');
    const categories = {
      requirements: userFiles.filter(f => f.includes('/requirements/')).length,
      architecture: userFiles.filter(f => f.includes('/architecture/')).length,
      design: userFiles.filter(f => f.includes('/design/')).length,
      infrastructure: userFiles.filter(f => f.includes('/infrastructure/')).length,
    };

    log(`  Requirements: ${categories.requirements} file(s)`, 'reset');
    log(`  Architecture: ${categories.architecture} file(s)`, 'reset');
    log(`  Design: ${categories.design} file(s)`, 'reset');
    log(`  Infrastructure: ${categories.infrastructure} file(s)`, 'reset');
    log('', 'reset');

    if (categories.requirements === 0 || categories.architecture === 0) {
      log('⚠️  Recommendation:', 'yellow');
      log('', 'reset');
      if (categories.requirements === 0) {
        log('  Add requirements documentation for better analysis', 'reset');
      }
      if (categories.architecture === 0) {
        log('  Add architecture documentation for better tech recommendations', 'reset');
      }
      log('', 'reset');
    }

    log('💡 Tip:', 'cyan');
    log('   The AI will generate much better context than simple keyword matching!', 'reset');
    log('', 'reset');

  } catch (error) {
    log('', 'reset');
    log('❌ Error during validation:', 'red');
    log(error.message, 'red');
    log('', 'reset');
    log('Stack trace:', 'yellow');
    console.error(error);
    process.exit(1);
  }
}

main();
