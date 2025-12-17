# Monorepo Deployment Guide

> **Guide for deploying applications from this monorepo template**

This guide covers best practices and patterns for deploying applications from a PNPM monorepo structure.

---

## 🎯 Overview

Monorepo deployments require special consideration because:

- **Multiple apps** share the same repository
- **Shared packages** need to be built before apps
- **Workspace dependencies** must be resolved correctly
- **Build optimization** is critical for performance
- **Environment management** differs per app

---

## 📦 Monorepo Structure

```
fast-ship-base-code/
├── apps/
│   ├── api/              # Backend API
│   ├── web/              # Frontend web app
│   └── mobile/           # Mobile app
├── packages/
│   ├── shared/           # Shared utilities
│   ├── ui/               # Shared UI components
│   └── types/            # Shared TypeScript types
└── package.json          # Root workspace config
```

**Key Points:**
- Apps consume packages via workspace dependencies
- Packages must be built before apps that depend on them
- Each app can deploy independently

---

## 🔧 Core Deployment Patterns

### 1. Workspace Filtering

PNPM provides powerful filtering for building/deploying specific apps:

```bash
# Build only the API app and its dependencies
pnpm --filter api build

# Build only the web app and its dependencies
pnpm --filter web build

# Build all apps
pnpm -r build

# Install only production dependencies for API
pnpm --filter api --prod install
```

**Benefits:**
- ✅ Only build what's needed
- ✅ Faster build times
- ✅ Smaller deployments
- ✅ Independent app deployments

### 2. Build Order & Dependencies

**Always build in this order:**
1. **Shared packages** (packages/*)
2. **Applications** (apps/*)

```bash
# Build shared packages first
pnpm --filter "./packages/**" build

# Then build specific app
pnpm --filter api build
```

**Why?** Apps import from packages, so packages must be compiled first.

### 3. Environment Variables

**Per-App Environment Management:**

```
apps/
├── api/
│   └── .env              # API-specific env vars
├── web/
│   └── .env              # Web-specific env vars
└── mobile/
    └── .env              # Mobile-specific env vars
```

**Best Practices:**
- Each app manages its own environment variables
- Use `.env.example` files to document required vars
- Never commit actual `.env` files (add to `.gitignore`)
- Use deployment platform's env var management

---

## 🚀 Deployment Strategies

### Strategy 1: Platform-Native Monorepo Support

**Platforms with native monorepo support:**
- **Vercel** - Supports PNPM workspaces, automatic detection
- **Netlify** - Supports monorepos with base directory config
- **Render** - Supports monorepos with build commands
- **Railway** - Supports monorepos with custom build configs

**Example: Vercel Deployment**

Create `vercel.json` in app directory:

```json
{
  "buildCommand": "cd ../.. && pnpm --filter web build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "framework": "vite"
}
```

**Configuration:**
- Root Directory: `apps/web`
- Build Command: Uses workspace filtering
- Install Command: Runs at monorepo root

### Strategy 2: Docker Multi-Stage Builds

**Best for:**
- Backend APIs (Node.js, Python)
- Custom hosting (AWS, GCP, Azure)
- Container-based platforms

**Example Dockerfile for API:**

```dockerfile
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Build packages
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate
WORKDIR /app

# Copy dependencies and source
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps ./apps
COPY --from=deps /app/packages ./packages
COPY . .

# Build shared packages first
RUN pnpm --filter "./packages/**" build

# Build API
RUN pnpm --filter api build

# Stage 3: Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built artifacts
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

**Key Techniques:**
- Multi-stage builds for smaller images
- Workspace filtering for targeted builds
- Build packages before apps
- Production-only dependencies in final stage

### Strategy 3: CI/CD with Path Filtering

**Optimize CI/CD to only deploy changed apps:**

**GitHub Actions Example:**

```yaml
name: Deploy API

on:
  push:
    branches: [main]
    paths:
      - 'apps/api/**'
      - 'packages/**'
      - 'pnpm-lock.yaml'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build packages
        run: pnpm --filter "./packages/**" build

      - name: Build API
        run: pnpm --filter api build

      - name: Deploy to production
        run: |
          # Your deployment command here
```

**Path Filtering:**
- Only triggers when API or packages change
- Saves CI/CD time and resources
- Each app can have its own workflow

---

## 🏗️ Platform-Specific Guides

### Firebase Hosting (Web Apps)

```json
// firebase.json
{
  "hosting": {
    "public": "apps/web/dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Build Command:**
```bash
pnpm --filter web build
```

### Firebase App Hosting (Node.js APIs)

```yaml
# apphosting.yaml
runConfig:
  runtime: nodejs20

env:
  - variable: NODE_ENV
    value: production

build:
  rootDirectory: /
  buildCommand: |
    pnpm install --frozen-lockfile
    pnpm --filter "./packages/**" build
    pnpm --filter api build
```

### Vercel (Next.js/React/Vite)

**Project Settings:**
- Root Directory: `apps/web`
- Build Command: `cd ../.. && pnpm --filter web build`
- Output Directory: `dist` (or `.next` for Next.js)
- Install Command: `pnpm install`

### Render (Node.js/Docker)

**render.yaml:**
```yaml
services:
  - type: web
    name: api
    env: node
    buildCommand: |
      pnpm install --frozen-lockfile
      pnpm --filter "./packages/**" build
      pnpm --filter api build
    startCommand: node apps/api/dist/index.js
    envVars:
      - key: NODE_ENV
        value: production
```

### AWS (Docker/ECS/Lambda)

**Use Docker multi-stage builds** (see Strategy 2 above)

**For Lambda:**
- Build with esbuild or webpack
- Bundle dependencies
- Use layers for shared packages

### Railway

**Railway.toml:**
```toml
[build]
builder = "nixpacks"
buildCommand = "pnpm install && pnpm --filter api build"

[deploy]
startCommand = "node apps/api/dist/index.js"
```

---

## ✅ Deployment Checklist

Before deploying any app from the monorepo:

### Pre-Deployment
- [ ] All tests passing (`pnpm test`)
- [ ] Type checking passing (`pnpm typecheck`)
- [ ] Linting passing (`pnpm lint`)
- [ ] Environment variables documented
- [ ] Shared packages built successfully
- [ ] App builds successfully locally

### Configuration
- [ ] Platform configured for monorepo (root directory, build command)
- [ ] Workspace filtering configured correctly
- [ ] Environment variables set on platform
- [ ] Build order ensures packages → app
- [ ] Production dependencies only (if applicable)

### Post-Deployment
- [ ] Health check endpoint responding
- [ ] App functionality verified
- [ ] Logs checked for errors
- [ ] Performance metrics reviewed
- [ ] Environment variables applied correctly

---

## 🔍 Troubleshooting

### Issue: "Cannot find module '@workspace/shared'"

**Cause:** Shared package not built before app

**Solution:**
```bash
# Build packages first
pnpm --filter "./packages/**" build

# Then build app
pnpm --filter api build
```

### Issue: Docker build fails with "pnpm: command not found"

**Cause:** PNPM not installed in Docker image

**Solution:**
```dockerfile
FROM node:20-alpine
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate
```

### Issue: Deployment builds everything unnecessarily

**Cause:** Not using workspace filtering

**Solution:**
```bash
# Instead of:
pnpm build  # Builds everything

# Use:
pnpm --filter api build  # Builds only API and its deps
```

### Issue: Environment variables not working

**Cause:** App reading from wrong .env location

**Solution:**
- Ensure each app loads its own `.env` file
- Use platform's environment variable management
- Check env var loading in app startup code

---

## 📚 Additional Resources

### Official Documentation
- [PNPM Workspaces](https://pnpm.io/workspaces)
- [PNPM Filtering](https://pnpm.io/filtering)
- [Monorepo Tools](https://monorepo.tools/)

### Deployment Platforms
- [Vercel Monorepo Guide](https://vercel.com/docs/monorepos)
- [Render Monorepo Guide](https://render.com/docs/monorepo-support)
- [Railway Monorepo Guide](https://docs.railway.app/deploy/monorepo)

### Tools & Optimizations
- [Turborepo](https://turbo.build/repo) - Build system for monorepos
- [Nx](https://nx.dev/) - Smart monorepo toolkit
- [Docker Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/)

---

## 💡 Best Practices Summary

1. **Always use workspace filtering** for targeted builds
2. **Build packages before apps** that depend on them
3. **Use platform-native monorepo support** when available
4. **Implement CI/CD path filtering** to only deploy changed apps
5. **Docker multi-stage builds** for optimized images
6. **Separate environment variables** per app
7. **Document deployment process** for each app
8. **Test deployment locally** before pushing
9. **Monitor build times** and optimize as needed
10. **Keep dependencies up to date** for security and performance

---

## 🚀 Quick Reference

### Common Commands

```bash
# Install dependencies (root)
pnpm install

# Build specific app
pnpm --filter [app-name] build

# Build all packages
pnpm --filter "./packages/**" build

# Build everything
pnpm -r build

# Run specific app
pnpm --filter [app-name] dev

# Deploy specific app (example)
pnpm --filter [app-name] deploy
```

### Deployment Template

```bash
# 1. Install dependencies
pnpm install --frozen-lockfile

# 2. Build shared packages
pnpm --filter "./packages/**" build

# 3. Build target app
pnpm --filter [app-name] build

# 4. Deploy (platform-specific)
# ... deployment command ...
```

---

**Remember:** Each deployment platform may have unique requirements. Always refer to the platform's official monorepo documentation and test thoroughly before production deployment.

**Last Updated:** 2025-12-17
