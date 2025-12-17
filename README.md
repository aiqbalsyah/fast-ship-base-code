# Fast-Ship Base Code

> **Universal monorepo template with BMAD workflows for rapid AI-assisted development**

A clean, domain-agnostic monorepo starter that works for ANY type of project. No pre-built features, no assumptions—just intelligent structure and AI-powered automation.

---

## 🎯 What Is This?

A **universal monorepo template** designed for rapid development:

- **🌐 Domain-Agnostic** — Works for SaaS, e-commerce, fintech, IoT, gaming, internal tools—anything
- **🤖 AI-Native** — Leverages BMAD workflows and Claude Code for intelligent app creation
- **📝 Docs-First** — You provide requirements, AI generates context and implements features
- **🔧 Infrastructure Flexible** — Firebase, Docker, PostgreSQL, MongoDB, Kubernetes—you choose
- **🚀 Fast to Ship** — Story-driven development with latest versions automatically

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18.0.0
- **PNPM** ≥ 8.0.0
- **BMAD** installed and configured

### 1. Clone This Template

```bash
# Clone or copy this template
cp -r fast-ship-base-code my-new-project
cd my-new-project
```

### 2. Add YOUR Documentation

Populate `docs/project-materials/` with YOUR project docs:

```bash
docs/project-materials/
├── requirements/
│   └── your-prd.md              # Your requirements, user stories
├── architecture/
│   └── your-tech-stack.md       # Your technology decisions
├── design/
│   └── your-design-system.md    # Your UI/UX specifications
└── infrastructure/
    ├── your-database.md          # Your database choice
    └── your-deployment.md        # Your deployment strategy
```

**Examples are provided** - replace them with YOUR actual project documentation.

### 3. Initialize Project

```bash
pnpm install
pnpm projects:init
```

This validates your documentation exists, then directs you to run:

```bash
/bmad:bmm:workflows:init-project
```

The AI will:
- Read YOUR documentation with deep comprehension
- Analyze YOUR domain, tech stack, and architecture
- Generate comprehensive `docs/project-context.md` (the "bible" for all future AI work)
- Provide intelligent recommendations based on your requirements

### 4. Add Your First App

```bash
pnpm projects:add
```

Interactive prompts will guide you:
- App name (e.g., "api", "web", "mobile")
- App type (Node.js, Python, React, React Native, etc.)
- Framework choice (Express/Fastify, Flask/FastAPI, Vite/Next.js, Expo, etc.)

This creates a **story file** in `docs/stories/` with your app specifications.

### 5. Fill the Story with AI-Powered Analysis

In Claude Code, run:
```bash
/fill-story docs/stories/add-[app-name]-app.md
```

BMAD agents will:
- Analyze your project documentation with deep comprehension
- Understand your domain, tech stack, and conventions
- Web search for latest stable versions (e.g., Next.js 15.x, React 19.x)
- Generate comprehensive technical design with architecture patterns
- Create detailed acceptance criteria and phased implementation tasks
- Include testing strategy, dependencies, and dev notes

### 6. Implement the App

In Claude Code, run:
```bash
/bmad:bmm:workflows:dev-story docs/stories/add-[app-name]-app.md
```

Claude will:
- Actually create the app structure
- Install dependencies with latest versions
- Configure everything per your project conventions
- Follow the modular architecture from project-context.md

### 7. Start Building

```bash
pnpm dev          # Run all apps in development mode
pnpm typecheck    # Type check all apps
pnpm lint         # Lint all apps
pnpm build        # Build all apps for production
```

---

## 📁 Structure

```
fast-ship-base-code/
├── .bmad/                      # BMAD workflows and configuration
│   ├── bmm/workflows/
│   │   ├── projects-init/      # AI-driven project initialization
│   │   └── projects-add/       # Context-aware app scaffolding
│   └── _cfg/                   # Agent and workflow manifests
│
├── docs/                       # Documentation root
│   ├── project-guides/         # HOW-TO guides (provided by template)
│   ├── project-materials/      # YOUR project docs (YOU provide this)
│   ├── templates/              # Reusable templates
│   └── project-context.md      # AI-generated master context
│
├── apps/                       # Your applications (created by projects:add)
│   └── .gitkeep
│
├── packages/                   # Shared libraries (created as needed)
│   └── .gitkeep
│
├── scripts/                    # Automation scripts
│   ├── init-project.js         # Orchestrates projects:init
│   └── add-app.js              # Orchestrates projects:add
│
├── .gitignore
├── pnpm-workspace.yaml         # PNPM workspace configuration
├── package.json                # Root package with scripts
└── README.md                   # This file
```

---

## 🧠 How It Works

### 1. You Provide Context

Add your documentation to `docs/project-materials/`:

- **Requirements**: PRDs, user stories, features you need
- **Architecture**: Tech stack decisions, patterns, standards
- **Design**: UI/UX specs, design system, wireframes
- **Infrastructure**: Database choice, deployment strategy, hosting

### 2. AI Analyzes YOUR Domain

Run `pnpm projects:init`:

- AI reads YOUR docs
- Extracts project domain, tech stack, conventions
- Generates `project-context.md` - a comprehensive guide tailored to YOUR project

### 3. Story-Driven App Creation

Run `pnpm projects:add` to create a story, then use Claude Code workflows:

**Step 1 - Create Story**: `pnpm projects:add` generates a story file with your requirements

**Step 2 - Fill Story**: `/fill-story` command in Claude Code:
- Web searches for latest framework versions
- Fills story with technical design and tasks
- Adapts to YOUR project-context.md conventions

**Step 3 - Implement**: `/dev-story` workflow in Claude Code:
- Actually creates the app following the story
- Uses YOUR naming conventions and patterns
- Includes YOUR preferred configs from project-context.md
- Installs latest stable dependencies

---

## 🎨 What This Template Provides

### Structure & Automation

✅ Clean monorepo folder structure
✅ PNPM workspace configuration
✅ `pnpm projects:init` - AI-driven project initialization
✅ `pnpm projects:add` - Context-aware app scaffolding
✅ BMAD workflow integration
✅ Documentation templates and guides

---

## ❌ What This Template Does NOT Provide

This template is a **clean slate**—it does NOT include:

- Pre-built features (authentication, payments, products, etc.)
- Domain-specific business logic
- Opinionated architecture patterns
- Technology stack mandates
- Database schemas or migrations
- API endpoints or routes

**You bring**: Your requirements, your domain, your tech choices
**Template provides**: Structure, automation, AI-driven scaffolding

---

## 🛠️ Supported Technologies

### Languages & Frameworks

- **Backend**: Node.js (Express, Fastify, Hono), Python (Flask, FastAPI)
- **Web**: React (Vite, CRA), Next.js (App Router, Pages Router)
- **Mobile**: React Native (Bare, Expo, Expo Router)
- **Custom**: Define your own structure

### Databases

- Firebase/Firestore
- PostgreSQL
- MongoDB
- MySQL
- Redis
- _Any database—you choose!_

### Infrastructure & Deployment

- **Firebase**: Hosting, Functions, Firestore, Storage
- **Docker**: Containerized deployment
- **Vercel**: Serverless web apps
- **Traditional VPS**: Self-hosted with SSH
- **Kubernetes**: Cloud-native orchestration
- **Cloud Providers**: AWS, GCP, Azure

The AI adapts to YOUR choices!

---

## 📚 Documentation

### Project Guides (Provided)

- `docs/project-guides/00-getting-started.md` - Setup and quick start
- `docs/project-guides/01-monorepo-conventions.md` - Naming and structure standards
- `docs/project-guides/02-adding-apps.md` - How to use `projects:add`
- `docs/project-guides/03-bmad-workflows.md` - Working with BMAD

### Project Materials (YOU Provide)

- `docs/project-materials/requirements/` - Your PRDs, user stories
- `docs/project-materials/architecture/` - Your tech decisions
- `docs/project-materials/design/` - Your UI/UX specs
- `docs/project-materials/infrastructure/` - Your database & deployment choices

**Start by replacing the EXAMPLE files with YOUR actual project documentation!**

---

## 🔧 Available Commands

### Project Management

```bash
pnpm projects:init     # Initialize project with AI analysis
pnpm projects:add      # Add new app with intelligent scaffolding
pnpm create:story      # Create new BMAD story for development tasks
```

### Development

```bash
pnpm install:all       # Install all dependencies
pnpm dev               # Run all apps in development mode
pnpm build             # Build all apps for production
pnpm typecheck         # Type check all apps
pnpm lint              # Lint all apps
pnpm test              # Run tests in all apps
pnpm clean             # Clean all build outputs and dependencies
```

---

## 🎯 Use Cases

This template works for ANY type of project:

### SaaS Applications

- Multi-tenant platforms
- API + web dashboard + mobile app
- Subscription-based services

### E-Commerce

- Online stores with admin panels
- Inventory management systems
- Marketplace platforms

### Fintech

- Payment processing systems
- Banking applications
- Cryptocurrency platforms

### Internal Tools

- Admin dashboards
- Data visualization tools
- Automation platforms

### IoT & Hardware

- Device management platforms
- Data collection and analytics
- Real-time monitoring systems

### Gaming

- Game servers
- Player management systems
- Analytics dashboards

_...and anything else you can imagine!_

---

## 🚦 Next Steps

1. **Read the guides**: Start with `docs/project-guides/00-getting-started.md`
2. **Replace examples**: Delete EXAMPLE files in `project-materials/` and add YOUR docs
3. **Run init**: Execute `pnpm projects:init` to generate your project context
4. **Create app story**: Use `pnpm projects:add` to create a story file
5. **Fill story**: Run `/fill-story docs/stories/[story-file].md` in Claude Code
6. **Implement app**: Run `/bmad:bmm:workflows:dev-story docs/stories/[story-file].md` in Claude Code
7. **Start building**: Follow BMAD workflows to develop features

---

## 🤝 Philosophy

### Domain-Agnostic by Design

No assumptions about your industry, features, or business logic. The template learns YOUR domain from YOUR documentation.

### Docs-First Development

Documentation drives code generation. Write clear requirements, architecture decisions, and design specs—let AI handle the scaffolding.

### AI-Native Workflows

Leverage BMAD's intelligent workflows to analyze context, scaffold apps, and maintain consistency across your monorepo.

### Technology Flexible

Support for multiple languages, frameworks, databases, and deployment strategies. You choose, the template adapts.

---

## 📄 License

MIT

---

## 🙏 Credits

Built with:
- **[BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)** - The official BMAD (Build, Measure, Manage) methodology for AI-assisted development
- **[Claude Code](https://claude.ai/claude-code)** - Anthropic's AI-native development environment

This template follows the BMAD methodology for story-driven development and AI-assisted workflows.

---

**Ready to ship fast?**

1. Add YOUR documentation to `docs/project-materials/`
2. Run `pnpm projects:init`
3. Run `pnpm projects:add` to create your first app story
4. Use Claude Code to fill and implement: `/fill-story` → `/dev-story`
5. Ship! 🚀
