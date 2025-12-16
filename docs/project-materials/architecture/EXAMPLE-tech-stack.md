# EXAMPLE Technology Stack

⚠️ **This is a PLACEHOLDER file. Delete it and define YOUR tech stack!**

---

## Overview

This document defines the technology choices for [Your Project Name].

---

## Backend

### Language & Runtime
- **Language:** TypeScript
- **Runtime:** Node.js 20 LTS
- **Why:** Type safety, large ecosystem, team expertise

### Framework
- **Framework:** Fastify
- **Version:** 4.x
- **Why:** High performance, modern async/await, TypeScript support

### Database
- **Primary Database:** PostgreSQL 15
- **Why:** ACID compliance, complex queries, JSON support, battle-tested

- **Caching:** Redis 7
- **Why:** Fast in-memory cache, pub/sub for real-time features

### ORM/Query Builder
- **Tool:** Prisma
- **Why:** Type-safe queries, migrations, great DX

### Authentication
- **Strategy:** JWT tokens
- **Library:** jsonwebtoken
- **Why:** Stateless, scalable, standard

---

## Frontend

### Web Application

- **Framework:** Next.js 14
- **Router:** App Router
- **Why:** SSR for SEO, React ecosystem, Vercel deployment

- **Styling:** Tailwind CSS
- **Why:** Utility-first, fast development, small bundle

- **UI Components:** shadcn/ui
- **Why:** Accessible, customizable, copy-paste

- **State Management:** Zustand
- **Why:** Simple, performant, minimal boilerplate

- **Data Fetching:** TanStack Query (React Query)
- **Why:** Caching, refetching, optimistic updates

### Mobile Application

- **Framework:** React Native
- **Variant:** Expo (managed workflow)
- **Why:** Faster development, OTA updates, managed builds

- **Navigation:** Expo Router
- **Why:** File-based routing, type-safe

---

## Shared

### Language
- **TypeScript 5.x** across all projects
- **Strict mode enabled**
- **Why:** Type safety prevents bugs, better IDE support

### Package Manager
- **pnpm 8.x**
- **Why:** Fast, efficient, monorepo support

### Monorepo Tool
- **Native PNPM workspaces**
- **Why:** Simple, no extra complexity

---

## DevOps & Infrastructure

### Hosting

- **API:** AWS ECS (Docker containers)
- **Web:** Vercel
- **Mobile:** Expo EAS + App Stores

### CI/CD
- **Platform:** GitHub Actions
- **Pipeline:**
  1. Lint & type check
  2. Run tests
  3. Build
  4. Deploy (automatic on main)

### Monitoring
- **Errors:** Sentry
- **Metrics:** DataDog
- **Logs:** CloudWatch

### Infrastructure as Code
- **Tool:** Terraform
- **Why:** Reproducible, version-controlled infrastructure

---

## Testing

### Unit Testing
- **Framework:** Vitest
- **Why:** Fast, Vite-native, Jest-compatible API

### Integration Testing
- **Tool:** Supertest (API)
- **Why:** Simple HTTP testing

### E2E Testing
- **Framework:** Playwright
- **Why:** Cross-browser, reliable, fast

---

## Code Quality

### Linting
- **ESLint** with Airbnb config
- **Prettier** for formatting

### Git Hooks
- **Husky** for pre-commit hooks
- **lint-staged** for staged files only

### Type Checking
- TypeScript strict mode
- Pre-commit type checks

---

## Third-Party Services

### Email
- **Service:** SendGrid
- **Why:** Reliable, good API, templates

### File Storage
- **Service:** AWS S3
- **Why:** Scalable, cheap, CDN integration

### Payment Processing
- **Service:** Stripe
- **Why:** Best DX, global support, webhooks

### Analytics
- **Service:** PostHog
- **Why:** Self-hostable, privacy-friendly, feature flags

---

## Development Tools

### IDE
- VS Code recommended
- Shared settings in `.vscode/`

### API Testing
- Thunder Client or Postman

### Database Client
- TablePlus or DBeaver

---

## Version Requirements

```json
{
  "node": ">=20.0.0",
  "pnpm": ">=8.0.0",
  "typescript": "^5.3.0"
}
```

---

## Migration Path

If changing technologies, document here:

### From X to Y
- **Reason:** Why we're changing
- **Timeline:** When migration happens
- **Strategy:** How we'll migrate

---

**Replace this file with YOUR actual tech stack decisions!**
