#!/usr/bin/env node

/**
 * Add App Script
 *
 * Intelligently scaffolds new apps in the monorepo based on project-context.md
 * and user choices. Supports Node.js, Python, React, and React Native apps.
 *
 * Usage:
 *   Interactive: node scripts/add-app.js
 *   CLI Args: node scripts/add-app.js --type=nodejs --name=api --framework=express --port=3000 --typescript=yes
 *
 *   Arguments:
 *     --type=nodejs|python
 *     --name=app-name (kebab-case)
 *     --framework=express|fastify|hono|flask|fastapi
 *     --port=3000
 *     --typescript=yes|no
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Parse CLI arguments
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      args[key] = value;
    }
  });
  return args;
}

const cliArgs = parseArgs();

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

// Create readline interface for user input
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
    const content = await fs.readFile(contextPath, 'utf-8');
    return { exists: true, content };
  } catch (error) {
    return { exists: false, content: '' };
  }
}

async function getExistingApps() {
  const appsPath = path.join(projectRoot, 'apps');

  try {
    await fs.access(appsPath);
    const entries = await fs.readdir(appsPath, { withFileTypes: true });
    return entries.filter(e => e.isDirectory()).map(e => e.name);
  } catch (error) {
    return [];
  }
}

function validateAppName(name) {
  // Must be kebab-case: lowercase letters, numbers, hyphens
  // Must start with a letter
  const kebabCaseRegex = /^[a-z][a-z0-9-]*$/;

  if (!kebabCaseRegex.test(name)) {
    return {
      valid: false,
      error: 'App name must be kebab-case (lowercase, letters, numbers, hyphens)',
    };
  }

  return { valid: true };
}

async function promptAppType() {
  log('\n📦 What type of app do you want to add?', 'bright');
  log('', 'reset');
  log('1. Node.js API (Express, Fastify, or Hono)', 'reset');
  log('2. Python API (Flask or FastAPI)', 'reset');
  log('3. React Web (Vite, Next.js, or CRA)', 'reset');
  log('4. React Native Mobile (Bare, Expo, or Expo Router)', 'reset');
  log('5. Custom (manual setup)', 'reset');
  log('', 'reset');

  const answer = await question('Enter your choice (1-5): ');
  const choice = parseInt(answer.trim());

  if (choice < 1 || choice > 5 || isNaN(choice)) {
    log('Invalid choice. Please enter a number between 1-5.', 'red');
    return promptAppType();
  }

  return choice;
}

async function promptAppName(existingApps) {
  const name = await question('\n📝 Enter app name (kebab-case): ');
  const trimmedName = name.trim();

  const validation = validateAppName(trimmedName);
  if (!validation.valid) {
    log(`❌ ${validation.error}`, 'red');
    log('\nExamples:', 'yellow');
    log('  ✅ my-api', 'green');
    log('  ✅ mobile-app', 'green');
    log('  ✅ admin-dashboard', 'green');
    log('  ❌ MyAPI', 'red');
    log('  ❌ mobile_app', 'red');
    return promptAppName(existingApps);
  }

  if (existingApps.includes(trimmedName)) {
    log(`❌ App already exists: apps/${trimmedName}`, 'red');
    log('\nExisting apps:', 'yellow');
    existingApps.forEach(app => log(`  - ${app}`, 'reset'));
    return promptAppName(existingApps);
  }

  return trimmedName;
}

async function promptNodeJSDetails() {
  log('\n⚙️  Node.js API Configuration', 'bright');

  const framework = await question('Framework (express/fastify/hono) [express]: ');
  const port = await question('Port [3000]: ');
  const typescript = await question('Use TypeScript? (y/n) [y]: ');

  return {
    framework: framework.trim() || 'express',
    port: parseInt(port.trim()) || 3000,
    typescript: !typescript.trim() || typescript.toLowerCase() === 'y',
  };
}

async function promptPythonDetails() {
  log('\n⚙️  Python API Configuration', 'bright');

  const framework = await question('Framework (flask/fastapi) [flask]: ');
  const port = await question('Port [8000]: ');

  return {
    framework: framework.trim() || 'flask',
    port: parseInt(port.trim()) || 8000,
  };
}

async function promptReactWebDetails() {
  log('\n⚙️  React Web Configuration', 'bright');

  const framework = await question('Framework (vite/nextjs/cra) [vite]: ');
  const port = await question('Port [3001]: ');

  return {
    framework: framework.trim() || 'vite',
    port: parseInt(port.trim()) || 3001,
  };
}

async function promptReactNativeDetails() {
  log('\n⚙️  React Native Configuration', 'bright');
  log('', 'reset');
  log('1. Bare React Native (full control, native code access)', 'reset');
  log('2. Expo (managed workflow, simplified development)', 'reset');
  log('3. Expo Router (file-based routing with Expo)', 'reset');
  log('', 'reset');

  const variant = await question('Choose variant (1-3) [2]: ');
  const choice = parseInt(variant.trim()) || 2;

  const variants = {
    1: 'bare',
    2: 'expo',
    3: 'expo-router',
  };

  return {
    variant: variants[choice] || 'expo',
  };
}

async function scaffoldNodeAPI(appName, details) {
  const appPath = path.join(projectRoot, 'apps', appName);
  const ext = details.typescript ? 'ts' : 'js';

  // Create directory structure
  await fs.mkdir(path.join(appPath, 'src', 'routes'), { recursive: true });
  await fs.mkdir(path.join(appPath, 'src', 'middleware'), { recursive: true });

  // Create package.json
  const packageJson = {
    name: appName,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: details.typescript ? 'tsx src/index.ts' : 'node src/index.js',
      build: details.typescript ? 'tsc' : 'echo "No build needed for JavaScript"',
      start: details.typescript
        ? 'node dist/index.js'
        : 'node src/index.js',
      typecheck: details.typescript ? 'tsc --noEmit' : 'echo "No typecheck"',
      test: 'echo "Tests not yet implemented"',
    },
    dependencies: {},
    devDependencies: {},
  };

  // Add framework dependencies
  if (details.framework === 'express') {
    packageJson.dependencies.express = '^4.18.2';
    if (details.typescript) {
      packageJson.devDependencies['@types/express'] = '^4.17.21';
    }
  } else if (details.framework === 'fastify') {
    packageJson.dependencies.fastify = '^4.25.0';
  } else if (details.framework === 'hono') {
    packageJson.dependencies.hono = '^3.12.0';
    packageJson.dependencies['@hono/node-server'] = '^1.4.0';
  }

  if (details.typescript) {
    packageJson.devDependencies.typescript = '^5.3.0';
    packageJson.devDependencies.tsx = '^4.7.0';
    packageJson.devDependencies['@types/node'] = '^20.10.0';
  }

  await fs.writeFile(
    path.join(appPath, 'package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf-8'
  );

  // Create tsconfig.json if TypeScript
  if (details.typescript) {
    const tsconfig = {
      compilerOptions: {
        target: 'ES2022',
        module: 'ES2022',
        moduleResolution: 'bundler',
        lib: ['ES2022'],
        outDir: './dist',
        rootDir: './src',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist'],
    };

    await fs.writeFile(
      path.join(appPath, 'tsconfig.json'),
      JSON.stringify(tsconfig, null, 2),
      'utf-8'
    );
  }

  // Create index file
  let indexContent = '';
  if (details.framework === 'express') {
    indexContent = details.typescript
      ? `import express from 'express';
import healthRouter from './routes/health.js';

const app = express();
const PORT = ${details.port};

app.use(express.json());

// Routes
app.use('/health', healthRouter);

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
`
      : `import express from 'express';
import healthRouter from './routes/health.js';

const app = express();
const PORT = ${details.port};

app.use(express.json());

// Routes
app.use('/health', healthRouter);

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
`;
  }

  await fs.writeFile(
    path.join(appPath, 'src', `index.${ext}`),
    indexContent,
    'utf-8'
  );

  // Create health route
  const healthContent = details.typescript
    ? `import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
`
    : `import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
`;

  await fs.writeFile(
    path.join(appPath, 'src', 'routes', `health.${ext}`),
    healthContent,
    'utf-8'
  );

  // Create .gitignore
  const gitignore = `node_modules
dist
.env
.env.local
*.log
`;

  await fs.writeFile(path.join(appPath, '.gitignore'), gitignore, 'utf-8');

  // Create README
  const readme = `# ${appName}

${details.framework.charAt(0).toUpperCase() + details.framework.slice(1)} API

## Tech Stack

- **Framework:** ${details.framework}
- **Language:** ${details.typescript ? 'TypeScript' : 'JavaScript'}
- **Port:** ${details.port}

## Development

\`\`\`bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev:${appName}

# Build (TypeScript only)
pnpm build:${appName}

# Type check (TypeScript only)
pnpm typecheck:${appName}
\`\`\`

## API Endpoints

- \`GET /health\` - Health check endpoint

## Environment Variables

Create a \`.env\` file in this directory:

\`\`\`
PORT=${details.port}
NODE_ENV=development
\`\`\`

## Testing

\`\`\`bash
pnpm test:${appName}
\`\`\`

## Production

\`\`\`bash
pnpm build:${appName}
pnpm start:${appName}
\`\`\`
`;

  await fs.writeFile(path.join(appPath, 'README.md'), readme, 'utf-8');
}

async function scaffoldPythonAPI(appName, details) {
  const appPath = path.join(projectRoot, 'apps', appName);

  // Create directory structure
  await fs.mkdir(path.join(appPath, 'src', 'routes'), { recursive: true });

  // Create requirements.txt
  const requirements =
    details.framework === 'flask' ? 'Flask==3.0.0\nflask-cors==4.0.0\n' : 'fastapi==0.108.0\nuvicorn==0.25.0\n';

  await fs.writeFile(
    path.join(appPath, 'requirements.txt'),
    requirements,
    'utf-8'
  );

  // Create app.py
  const appContent =
    details.framework === 'flask'
      ? `from flask import Flask
from flask_cors import CORS
from src.routes.health import health_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(health_bp, url_prefix='/health')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=${details.port}, debug=True)
`
      : `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.health import router as health_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(health_router, prefix="/health", tags=["health"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=${details.port})
`;

  await fs.writeFile(path.join(appPath, 'src', 'app.py'), appContent, 'utf-8');

  // Create health route
  const healthContent =
    details.framework === 'flask'
      ? `from flask import Blueprint, jsonify
from datetime import datetime

health_bp = Blueprint('health', __name__)

@health_bp.route('/', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.utcnow().isoformat()
    })
`
      : `from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/")
async def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat()
    }
`;

  await fs.writeFile(
    path.join(appPath, 'src', 'routes', 'health.py'),
    healthContent,
    'utf-8'
  );

  // Create __init__.py files
  await fs.writeFile(path.join(appPath, 'src', '__init__.py'), '', 'utf-8');
  await fs.writeFile(
    path.join(appPath, 'src', 'routes', '__init__.py'),
    '',
    'utf-8'
  );

  // Create .gitignore
  const gitignore = `__pycache__
*.pyc
*.pyo
*.pyd
.Python
venv
.env
.env.local
*.log
`;

  await fs.writeFile(path.join(appPath, '.gitignore'), gitignore, 'utf-8');

  // Create package.json for monorepo integration
  const packageJson = {
    name: appName,
    version: '1.0.0',
    scripts: {
      dev: `python src/app.py`,
      test: 'echo "Tests not yet implemented"',
    },
  };

  await fs.writeFile(
    path.join(appPath, 'package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf-8'
  );

  // Create README
  const readme = `# ${appName}

${details.framework === 'flask' ? 'Flask' : 'FastAPI'} API

## Tech Stack

- **Framework:** ${details.framework === 'flask' ? 'Flask' : 'FastAPI'}
- **Language:** Python
- **Port:** ${details.port}

## Setup

\`\`\`bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt
\`\`\`

## Development

\`\`\`bash
# Start dev server
pnpm dev:${appName}

# Or directly with Python:
python src/app.py
\`\`\`

## API Endpoints

- \`GET /health\` - Health check endpoint

## Environment Variables

Create a \`.env\` file in this directory:

\`\`\`
PORT=${details.port}
DEBUG=True
\`\`\`

## Testing

\`\`\`bash
pytest
\`\`\`
`;

  await fs.writeFile(path.join(appPath, 'README.md'), readme, 'utf-8');
}

async function updateRootPackageJson(appName, appType) {
  const packagePath = path.join(projectRoot, 'package.json');
  const packageContent = await fs.readFile(packagePath, 'utf-8');
  const packageJson = JSON.parse(packageContent);

  // Add app-specific scripts
  packageJson.scripts[`dev:${appName}`] = `pnpm --filter ${appName} dev`;
  packageJson.scripts[`build:${appName}`] = `pnpm --filter ${appName} build`;
  packageJson.scripts[`test:${appName}`] = `pnpm --filter ${appName} test`;

  if (appType === 'nodejs' || appType === 'react-web') {
    packageJson.scripts[`typecheck:${appName}`] =
      `pnpm --filter ${appName} typecheck`;
  }

  await fs.writeFile(
    packagePath,
    JSON.stringify(packageJson, null, 2) + '\n',
    'utf-8'
  );
}

async function main() {
  try {
    banner('📦 ADD NEW APP');

    // Check project context
    log('Checking project context...', 'cyan');
    const { exists: contextExists } = await checkProjectContext();

    if (!contextExists) {
      log('', 'reset');
      log('⚠️  Project context not found!', 'yellow');
      log('', 'reset');
      log('Please run projects:init first:', 'reset');
      log('  pnpm projects:init', 'green');
      log('', 'reset');
      log(
        'This ensures new apps follow your project conventions.',
        'reset'
      );
      if (rl) rl.close();
      process.exit(1);
    }

    log('✓ Project context found', 'green');

    // Get existing apps
    const existingApps = await getExistingApps();

    // Check for CLI args mode
    const nonInteractive = cliArgs.type && cliArgs.name;
    let appType, appName, details = {}, typeLabel = '';

    if (nonInteractive) {
      // Non-interactive mode using CLI args
      log('Running in non-interactive mode', 'cyan');

      appName = cliArgs.name;

      // Validate app name
      const validation = validateAppName(appName);
      if (!validation.valid) {
        log(`❌ ${validation.error}`, 'red');
        process.exit(1);
      }

      if (existingApps.includes(appName)) {
        log(`❌ App already exists: apps/${appName}`, 'red');
        process.exit(1);
      }

      // Determine type and details from CLI args
      if (cliArgs.type === 'nodejs') {
        appType = 1;
        details = {
          framework: cliArgs.framework || 'express',
          port: parseInt(cliArgs.port) || 3000,
          typescript: cliArgs.typescript !== 'no',
        };
        typeLabel = `Node.js API (${details.framework})`;
      } else if (cliArgs.type === 'python') {
        appType = 2;
        details = {
          framework: cliArgs.framework || 'flask',
          port: parseInt(cliArgs.port) || 8000,
        };
        typeLabel = `Python API (${details.framework})`;
      } else {
        log(`❌ Unsupported type: ${cliArgs.type}`, 'red');
        log('Supported types: nodejs, python', 'yellow');
        process.exit(1);
      }
    } else {
      // Interactive mode
      appType = await promptAppType();
      appName = await promptAppName(existingApps);
    }

    // Get app-specific details and scaffold
    switch (appType) {
      case 1: // Node.js API
        if (!nonInteractive) details = await promptNodeJSDetails();
        log('\n🏗️  Scaffolding Node.js API...', 'cyan');
        await scaffoldNodeAPI(appName, details);
        await updateRootPackageJson(appName, 'nodejs');
        if (!nonInteractive) typeLabel = `Node.js API (${details.framework})`;
        break;

      case 2: // Python API
        if (!nonInteractive) details = await promptPythonDetails();
        log('\n🏗️  Scaffolding Python API...', 'cyan');
        await scaffoldPythonAPI(appName, details);
        await updateRootPackageJson(appName, 'python');
        if (!nonInteractive) typeLabel = `Python API (${details.framework})`;
        break;

      case 3: // React Web
        details = await promptReactWebDetails();
        log('\n🏗️  Scaffolding React Web app...', 'cyan');
        log('⚠️  React Web scaffolding not yet implemented', 'yellow');
        log('Please create manually in apps/' + appName, 'reset');
        rl.close();
        process.exit(0);
        break;

      case 4: // React Native
        details = await promptReactNativeDetails();
        log('\n🏗️  Scaffolding React Native app...', 'cyan');
        log('⚠️  React Native scaffolding not yet implemented', 'yellow');
        log('Please create manually in apps/' + appName, 'reset');
        rl.close();
        process.exit(0);
        break;

      case 5: // Custom
        log('\n📝 Custom app setup', 'cyan');
        log('Please create your app manually in apps/' + appName, 'reset');
        rl.close();
        process.exit(0);
        break;
    }

    // Install dependencies
    log('\n📦 Installing dependencies...', 'cyan');
    try {
      execSync('pnpm install', {
        cwd: projectRoot,
        stdio: 'inherit',
      });
      log('✓ Dependencies installed', 'green');
    } catch (error) {
      log('⚠️  Failed to install dependencies', 'yellow');
      log('Please run: pnpm install', 'reset');
    }

    // Success message
    banner('✅ APP ADDED SUCCESSFULLY!');

    log(`📦 Created: apps/${appName}`, 'bright');
    log('', 'reset');

    log('📊 App Details:', 'cyan');
    log(`  Type: ${typeLabel}`, 'reset');
    if (details.framework) {
      log(`  Framework: ${details.framework}`, 'reset');
    }
    if (details.port) {
      log(`  Port: ${details.port}`, 'reset');
    }
    if (details.typescript !== undefined) {
      log(
        `  Language: ${details.typescript ? 'TypeScript' : 'JavaScript'}`,
        'reset'
      );
    }
    log('', 'reset');

    log('🎯 Next Steps:', 'cyan');
    log('', 'reset');
    log('1. Review the app structure', 'bright');
    log(`   cd apps/${appName}`, 'green');
    log('', 'reset');
    log('2. Start development', 'bright');
    log(`   pnpm dev:${appName}`, 'green');
    log('', 'reset');
    log('3. Read the app README', 'bright');
    log(`   Open apps/${appName}/README.md for details`, 'reset');
    log('', 'reset');
    log('4. Create your first story', 'bright');
    log('   pnpm create:story', 'green');
    log(`   Select app: ${appName}`, 'reset');
    log('', 'reset');
    log('5. Develop with BMAD', 'bright');
    log('   /bmad:bmm:workflows:dev-story [story-file]', 'green');
    log('', 'reset');

    log('📚 Need help?', 'cyan');
    log('   - docs/project-guides/02-adding-apps.md', 'reset');
    log(`   - apps/${appName}/README.md`, 'reset');
    log('', 'reset');

    if (rl && !nonInteractive) rl.close();
  } catch (error) {
    log('', 'reset');
    log('❌ Error adding app:', 'red');
    log(error.message, 'red');
    log('', 'reset');
    log('Stack trace:', 'yellow');
    console.error(error);
    if (rl) rl.close();
    process.exit(1);
  }
}

main();
