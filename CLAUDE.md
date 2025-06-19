# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting with Prettier
- `npm run db:push` - Push database schema changes to Neon
- `npm run db:studio` - Open Drizzle Studio for database management

## Architecture Overview

This is a Next.js 15 application with authentication built using the App Router pattern. The stack includes:

**Frontend:**
- Next.js 15 with App Router
- React 19
- TailwindCSS 4 for styling
- Radix UI components with shadcn/ui
- TypeScript with strict mode

**Authentication:**
- Better-auth for authentication system
- Email/password and social authentication (GitHub, Google) enabled
- Auth routes at `/api/auth/[...all]`
- Protected auth layouts at `/(auth)/`

**Database:**
- PostgreSQL with Neon as provider
- Drizzle ORM for database operations
- Schema includes user, session, account, and verification tables
- Database adapter configured for better-auth

**Project Structure:**
- `src/app/` - Next.js App Router pages and API routes
- `src/components/ui/` - Reusable UI components (shadcn/ui)
- `src/db/` - Database configuration and schema
- `src/lib/` - Utility functions and configurations
- `src/modules/` - Feature-specific modules (auth views)
- `src/hooks/` - Custom React hooks

**Key Patterns:**
- Uses `@/` path alias for imports from `src/`
- Authentication views are modularized in `src/modules/auth/ui/views/`
- Database schema uses Drizzle with PostgreSQL adapter
- Environment variables required: `DATABASE_URL`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`