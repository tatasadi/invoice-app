# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 invoice management application built for a Frontend Mentor challenge. It's a full-stack app with PostgreSQL database using Prisma ORM, featuring CRUD operations for invoices with draft/pending/paid status management.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (includes Prisma generate)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook on port 6006
- `npm run build-storybook` - Build Storybook

### Database Commands
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio database GUI
- `npx prisma db seed` - Run database seed script

## Architecture

### App Router Structure (Next.js 14)
- Uses App Router with parallel routes and intercepting routes
- `app/@modal/` - Parallel route for modal intercepting
- `app/[id]/` - Dynamic route for invoice details
- `app/edit/[id]/` - Edit invoice page
- `app/create/` - Create new invoice page
- Modal intercepting routes in `@modal/(.)create/` and `@modal/(.)edit/[id]/`

### Data Layer
- **Database**: PostgreSQL with Prisma ORM
- **Schema**: Located in `prisma/schema.prisma`
  - `Invoice` model with relations to `Address` (sender/client) and `Item[]`
  - Uses UUID/CUID for IDs
- **Data Access**: Centralized in `lib/data.ts` with typed functions
- **Database Client**: Singleton pattern in `lib/db.ts`

### Form Handling & Validation
- **Schema Validation**: Zod schemas in `app/schema.ts`
- **Form Management**: React Hook Form with Zod resolvers
- **Server Actions**: Located in `app/actions.ts` with proper validation
- Main form component: `components/sections/invoice-form.tsx`

### UI Components
- **Design System**: Tailwind CSS with custom design tokens
- **Component Library**: Radix UI primitives with custom styling
- **Theme**: Light/dark mode support via `next-themes`
- **Component Structure**:
  - `components/ui/` - Base UI components (buttons, inputs, etc.)
  - `components/sections/` - Page-specific components
  - `components/` - Shared business components

### State Management
- Server state via Next.js App Router and Server Actions
- Form state via React Hook Form
- Theme state via next-themes provider
- No additional state management library used

## Key Files

- `app/actions.ts` - Server actions for CRUD operations
- `app/schema.ts` - Zod validation schemas
- `lib/data.ts` - Database query functions with TypeScript types
- `components/sections/invoice-form.tsx` - Main form component
- `tailwind.config.ts` - Custom design system configuration

## Development Notes

- Uses TypeScript with strict configuration
- Prettier configured with Tailwind CSS plugin and semicolon-free style
- ESLint with Next.js configuration
- Storybook setup for component development
- Custom utilities in `lib/utils.ts` for common operations
- Environment variables configured in `.env` file

## Testing
No specific test framework is configured. Check package.json for any test scripts if added later.