# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Young Professional Networking Group website/membership management platform rebuild project - a Next.js 15 application with Payload CMS 3.0. The project follows Feature-Sliced Design (FSD) architecture and uses modern web development practices.

## Development Commands

```bash
# Start development server
npm run dev

# Build and production
npm run build
npm run start

# Code quality
npm run lint           # Check linting
npm run lint:fix       # Fix linting issues

# Testing
npm run test           # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:ui        # Run tests with UI
npm run test:coverage  # Run tests with coverage
npm run test:shared    # Test shared layer only
npm run test:entities  # Test entities layer only
npm run test:features  # Test features layer only
npm run test:widgets   # Test widgets layer only
npm run test:views     # Test views layer only

# Images and assets
npm run optimize-images # Optimize images before build

# Payload CMS
npm run generate:types    # Generate TypeScript types from CMS schemas
npm run generate:graphql  # Generate GraphQL schema
npm run seed             # Seed database with initial data
npm run payload          # Access Payload CLI

# Git hooks
npm run prepare          # Initialize Husky git hooks
```

## Architecture: Feature-Sliced Design (FSD)

The project uses Feature-Sliced Design with this layer structure:

- **App** (`src/app/`): Application configuration, providers, global setup
- **Views** (`src/views/`): Page-level components (renamed from "pages" to avoid Next.js conflicts)
- **Widgets** (`src/widgets/`): Complex composite UI components (header, footer, hero sections)
- **Features** (`src/features/`): Business logic components (contact forms, filtering)
- **Entities** (`src/entities/`): Domain models and related UI (projects, users, media)
- **Shared** (`src/shared/`): Reusable UI components, utilities, types

### Path Aliases
Use these TypeScript path mappings:
- `@/*` - src directory
- `@/app/*` - src/app
- `@/views/*` - src/views
- `@/features/*` - src/features
- `@/entities/*` - src/entities
- `@/shared/*` - src/shared
- `@/widgets/*` - src/widgets
- `@payload-config` - payload.config.ts
- `@payload-types` - src/shared/types/payload/payload-types.ts

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode enabled)
- **CMS**: Payload CMS 3.0 with PostgreSQL
- **Styling**: Tailwind CSS 4.0 (CSS-only mode)
- **Animation**: Framer Motion (now "motion") + GSAP
- **Testing**: Vitest + React Testing Library + Playwright (E2E)
- **Database**: PostgreSQL via Neon
- **Deployment**: Vercel

## Content Management

### Payload CMS Collections
- **Users**: Authentication and admin access
- **Projects**: Construction project portfolio with categories (federal, state, municipal, restoration, environmental, infrastructure)
- **Media**: Image and asset management with optimized sizes

### Key Features
- Federal contracting focus with project categories
- Rich media support for before/after project showcases
- Auto-generated TypeScript types from CMS schemas
- cms interface at `/cms` route

## Code Quality Standards

### TypeScript Configuration
- Strict mode enabled with additional safety checks
- `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- Comprehensive path mapping for clean imports

### ESLint Rules
- Next.js and TypeScript best practices
- Import sorting and organization
- Prettier integration for consistent formatting
- Unused variables with underscore prefix allowed

### Testing Strategy
- **Shared layer**: 90%+ coverage (critical reusable components)
- **Entities layer**: 80%+ coverage (business logic)
- **Features layer**: 70%+ coverage (main user flows)
- **Widgets layer**: 60%+ coverage (composition testing)
- **Views layer**: E2E tests for critical paths

## Animation Guidelines

Use this hybrid approach:
- **Tailwind CSS**: Basic transitions and hover states
- **Framer Motion**: Component interactions, page transitions, layout animations
- **GSAP**: Complex scroll-triggered animations, timelines, professional motion graphics

Maintain 60fps performance by using only `transform` and `opacity` properties for animations.

## Development Workflow

1. **Type Generation**: Run `npm run generate:types` after modifying CMS schemas
2. **Pre-commit Hooks**: Husky runs linting and formatting automatically
3. **Testing**: Write tests colocated with components following FSD layer guidelines
4. **Performance**: Target <250KB initial JS bundle, <2.5s LCP, <200ms INP

## Federal Contracting Context

This website showcases Anderson Burton's:
- Woman-owned and employee-owned business certifications
- Federal, state, and municipal project experience
- Historical restoration and environmental remediation expertise
- $1-30M project portfolio

Focus on professional credibility, trust signals, and lead generation for government contracting opportunities.