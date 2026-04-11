# AGENTS.md - Developer Guidelines

This document provides guidelines for AI agents working on this codebase.

## Project Overview

- **Tech Stack**: React 19, TypeScript 5.8, Vite 6, Tailwind CSS 4, Express, SQLite
- **Target**: Barber shop landing page with booking functionality
- **Entry Point**: src/main.tsx
- **Backend**: Express server with better-sqlite3 (runs alongside frontend)

## Commands

### Development
```bash
npm run dev              # Start Vite dev server at localhost:5173
npm run server           # Start Express server (separate terminal)
```

### Build
```bash
npm run build            # Run TypeScript check then build
npm run preview          # Preview production build
```

### Type Checking
```bash
npx tsc --noEmit         # TypeScript compiler check (strict mode enabled)
```

### Testing
```bash
npm run test              # Run tests in watch mode
npm run test:run         # Run tests once (CI)
npm run test:coverage    # Run tests with coverage report

# Single test file
npx vitest run src/calendar.test.ts

# Single test
npx vitest run -t "returns 31 for January"
```

### Linting
```bash
# No ESLint currently configured
# Recommended setup: npm init @eslint/config
# Run: npx eslint src/
```

## Code Style Guidelines

### TypeScript
- **Strict mode enabled** - all compiler checks active
- Use explicit types for props and function signatures
- Avoid `any`; use `unknown` when type is uncertain
- Use `interface` for object shapes, `type` for unions/aliases
- Enable `noUncheckedIndexedAccess` for array access safety

### React Patterns
- Use functional components with arrow functions or `function` keyword
- Prefer `useState` with explicit type annotation for union types
- Use `useMemo`/`useCallback` for expensive computations
- Extract reusable components to separate files
- Use `React.lazy()` for code splitting large components

### Imports
```typescript
// Order: React → External libs → Internal components → Assets
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';
import './styles.css';
```
- Use path alias `@/*` for src relative imports
- Group imports by type with blank lines between groups
- Prefer named exports for utilities, default for components

### Naming Conventions
- **Components**: PascalCase (e.g., `CalendarPicker`, `Button`)
- **Functions**: camelCase (e.g., `handleBook`, `getDaysInMonth`)
- **Hooks**: camelCase with `use` prefix (e.g., `useBooking`)
- **Props interfaces**: `{ComponentName}Props` (e.g., `CalendarPickerProps`)
- **Constants**: SCREAMING_SNAKE_CASE for config objects
- **Types**: PascalCase (e.g., `BookingStatus`, `TimeSlot`)
- **CSS classes**: Tailwind utility classes, kebab-case for custom

### File Organization
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.types.ts
│   └── ...
├── hooks/
├── lib/
│   └── utils.ts        # cn() utility, helpers
├── server/             # Express backend
│   └── index.ts
├── pages/
├── types/
└── App.tsx
```

### Tailwind CSS
- Use arbitrary values sparingly: `bg-[#D4AF37]`
- Use CSS variables for repeated colors in BUSINESS_CONFIG
- Prefer semantic class names for custom styles
- Use `clsx` and `tailwind-merge` (`cn` utility) for conditional classes
- Keep custom styles in index.css using CSS variables

### Error Handling
- Use TypeScript discriminated unions for error states
- Display user-friendly error messages in UI
- Log errors appropriately (no secrets in logs)
- For async operations: handle loading, success, and error states

### Form Validation
- Validate on blur for touch interaction
- Validate on submit before API calls
- Show inline error messages below fields
- Use controlled inputs with proper type constraints

### State Management
- Local state with `useState` for component-specific state
- Extract shared state to custom hooks
- Use context for cross-cutting concerns (theme, auth)
- Keep server state separate from UI state

### Backend (Express + SQLite)
- API routes in `src/server/`
- Use parameterized queries to prevent SQL injection
- Handle errors with proper HTTP status codes
- Validate all incoming request data
- Close database connections properly

### Accessibility
- Use semantic HTML elements (header, main, nav, footer)
- Include alt text for images
- Ensure keyboard navigation works
- Use ARIA labels where appropriate
- Focus management for modals/dialogs

### Performance
- Lazy load components with `React.lazy()`
- Optimize images with proper sizing
- Use React DevTools Profiler for debugging
- Avoid unnecessary re-renders
- Debounce search inputs

## Business Configuration

All business data (services, hours, testimonials, colors) is stored in `BUSINESS_CONFIG` constant at the top of `App.tsx`. Modify this object to update business information.

## Path Aliases

The codebase uses `@/*` to reference `src/*`:
```typescript
import Button from '@/components/Button';
```

## Environment Variables

- Copy `.env.example` to `.env` for local development
- Never commit secrets to version control
- Backend uses `dotenv` for configuration
