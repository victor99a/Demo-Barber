# Agent Guidelines for Demo-Barber Repository

## Table of Contents
1. [Quick Commands](#quick-commands)
2. [Development & Build](#development--build)
3. [GitFlow Branching Strategy](#gitflow-branching-strategy)
4. [Code Style Guidelines](#code-style-guidelines)
5. [CI/CD Automation](#cicd-automation)
6. [Project Structure](#project-structure)
7. [Key Dependencies](#key-dependencies)
8. [Checklist for PRs & Commits](#checklist-for-prs--commits)

---

## Quick Commands

### Development & Build
- **Start dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`
- **Type check:** `tsc` (runs automatically before build)

### Git Operations
- **Create feature branch:** `git checkout -b feature/[description]`
- **Create hotfix branch:** `git checkout -b hotfix/[description]`
- **Stage changes:** `git add .`
- **Commit (Conventional Commits):** `git commit -m "feat(scope): description"`
- **Push to remote:** `git push origin [branch-name]`

### Installation
- **Install dependencies:** `npm install`

### Testing
- **Run tests:** `npm test`
- **Watch mode:** `npm run test:watch` (for development)
- **Framework:** Vitest with React Testing Library

### Code Quality
- **Lint code:** `npm run lint`
- **Type check:** `tsc`

**Note:** Type checking runs automatically before build. Tests are required before merging.

---

## GitFlow Branching Strategy

### Branch Types

| Type | Format | Example | Purpose |
|------|--------|---------|---------|
| **Main** | `main` | `main` | Production code, tagged releases |
| **Develop** | `develop` | `develop` | Integration branch for features |
| **Feature** | `feature/[description]` | `feature/reservas-calendario` | New functionality |
| **Hotfix** | `hotfix/[description]` | `hotfix/arreglo-responsive` | Urgent bug fixes |
| **Release** | `release/v[semver]` | `release/v1.0.0` | Version preparation |

### Workflow

```
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/nueva-funcionalidad

# 3. Develop and commit
git add .
git commit -m "feat(scope): clear description"

# 4. Push and create PR
git push origin feature/nueva-funcionalidad
# Then create PR on GitHub to merge into develop

# 5. After PR approved, merge to develop
# 6. For production, merge develop to main
```

### Hotfix Workflow

```
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/urgent-fix

# 2. Fix and commit
git commit -m "fix(scope): urgent fix description"

# 3. Merge to both main and develop
# PR to main (for production)
# PR to develop (to keep histories aligned)
```

### Commit Message Format (Conventional Commits)

```
<type>(<scope>): <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code refactoring
- test: Tests
- chore: Maintenance
- perf: Performance
- ci: CI/CD
```

**Examples:**
```bash
feat(booking): agregar selector de fecha
fix(nav): corregir menú hamburguesa en móvil
docs(readme): actualizar instrucciones
chore(deps): actualizar react a v19.0.1
```

---

## Code Style Guidelines

### TypeScript & Type Safety
- **Strict mode enabled:** `"strict": true` in tsconfig.json
- Always provide explicit types; avoid `any` type
- Flag unused variables and parameters: `"noUnusedLocals": true`, `"noUnusedParameters": true`
- Exhaustive switch statements: `"noFallthroughCasesInSwitch": true`
- Use proper typing for React components and props

**Example:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
}

const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  // Implementation
};
```

### Imports & Module Resolution
- Use **ES modules** (`import`/`export` syntax)
- Utilize path alias `@/*` for src directory imports: `import { Button } from '@/components/Button'`
- Group imports logically: React/libraries first, then local imports
- Sort imports alphabetically within groups

**Example:**
```typescript
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Clock } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config';
```

### Formatting & Naming
- **File naming:** PascalCase for React components (`Button.tsx`, `CalendarPicker.tsx`), lowercase with hyphens for utilities
- **Variable naming:** camelCase for variables and functions, CONSTANT_CASE for constants
- **Component naming:** PascalCase for component names and exports
- **Indentation:** 2 spaces (consistent throughout)
- **Strings:** Use **single quotes** (e.g., `'primary'`, `'bg-white'`)

**Example:**
```typescript
const BUSINESS_CONFIG = { name: "Cris Barber", /* ... */ };
const getDaysInMonth = (year: number, month: number) => { /* ... */ };
const [selectedService, setSelectedService] = useState<number | null>(null);
```

### Error Handling
- Wrap async operations in try-catch blocks when appropriate
- Handle errors gracefully in UI (show user-friendly messages)
- Log errors to console for debugging during development
- Avoid silent failures; always inform the user of errors

**Example:**
```typescript
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.json();
} catch (error) {
  console.error('Failed to fetch:', error);
  showUserError('Failed to load data');
}
```

### React Component Patterns
- Use **functional components** with hooks
- Prefer `useMemo` for expensive computations
- Use `useState` for local component state
- Wrap conditional components in `<AnimatePresence>` when using Framer Motion animations
- Pass props explicitly; avoid destructuring in render if type safety is needed

**Example:**
```typescript
const TimeSlots = ({ selectedDate, onSelectSlot, selectedSlot }: Props) => {
  const slots = useMemo(() => { /* ... */ }, [selectedDate]);
  return <div>{/* JSX */}</div>;
};
```

### CSS & Tailwind
- Use **Tailwind utility classes** exclusively; no CSS files except `index.css`
- Color scheme: Use CSS variables or the Tailwind config (`gold: '#D4AF37'`, `dark: '#0a0a0a'`)
- Responsive design: Mobile-first with `md:` and `lg:` breakpoints
- Example dark theme colors: `bg-[#0a0a0a]`, `bg-[#171717]`, `text-[#D4AF37]` (gold accent)

**Example:**
```typescript
<div className="bg-[#171717] p-8 rounded-xl border border-white/5 hover:border-[#D4AF37]/50 transition-all">
  {/* Content */}
</div>
```

### Configuration & Constants
- Store configuration in a central `BUSINESS_CONFIG` object (see App.tsx for example)
- Include services, testimonials, gallery URLs, business hours, colors, etc.
- Use `.env.local` for API keys and secrets (never commit `.env.local`)
- Reference `.env.example` for required environment variables

---

## CI/CD Automation

### GitHub Actions Workflow

The repository includes automatic CI/CD with GitHub Actions:

**Workflow file:** `.github/workflows/deploy.yml`

**Pipeline Steps:**
1. **Trigger:** On push to `main` or `develop`, or on Pull Requests
2. **CI Job:** Runs `npm ci` and `npm run build` (includes TypeScript checking)
3. **Deploy Job:** (Only on main) Deploys to Netlify automatically

### Secrets Required

Configure in GitHub: Settings → Secrets and variables → Actions:

```bash
NETLIFY_AUTH_TOKEN=xxxxx_generated_in_netlify
NETLIFY_SITE_ID=xxxxx_site_id
```

### Deployment Flow

```
Push to develop → CI checks pass → No deployment
Push to main → CI checks pass → Auto-deploy to Netlify
Pull Request → CI checks pass → Preview deploy
```

---

## Project Structure

```
Demo-Barber/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Entry point, React root rendering
│   └── index.css              # Global styles
├── public/                     # Static assets
├── tailwind.config.js         # Tailwind customization
├── vite.config.ts             # Vite build configuration
├── tsconfig.json              # TypeScript compiler options
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

---

## Key Dependencies

| Category | Package | Version | Purpose |
|----------|---------|---------|---------|
| **Framework** | React | 19.0.0 | UI framework |
| **Language** | TypeScript | ~5.8 | Static typing |
| **Bundler** | Vite | ^6.2.0 | Build tool |
| **Styling** | Tailwind CSS | ^4.1 | Utility-first CSS |
| **Animation** | Framer Motion | ^12.35 | Animations |
| **Icons** | Lucide React | ^0.546 | Icon library |
| **Backend** | Express | ^4.21 | Server framework |
| **Database** | better-sqlite3 | ^12.4 | SQLite driver |

---

## Checklist for PRs & Commits

### Before Creating Commit:
- [ ] Code passes `npm run build` (includes `tsc` type check)
- [ ] No TypeScript errors or warnings
- [ ] No unused variables or imports (`noUnusedLocals` strict mode)
- [ ] Components are properly typed
- [ ] Imports use `@/` alias where applicable
- [ ] Tailwind classes used for all styling
- [ ] Mobile responsive (test with breakpoints)
- [ ] No hardcoded values; use `BUSINESS_CONFIG` or props
- [ ] Commit message follows Conventional Commits format

### Before Creating Pull Request:
- [ ] Branch name follows GitFlow format
- [ ] All tests pass in CI/CD
- [ ] Code reviewed by team member
- [ ] Description explains what and why
- [ ] No merge conflicts
- [ ] Documentation updated if needed

### Before Merging to Main:
- [ ] PR approved by at least one reviewer
- [ ] All CI checks pass
- [ ] Deployed successfully to Netlify
- [ ] Live site working as expected

---

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [GitHub Actions](https://docs.github.com/actions)
- [Netlify Docs](https://docs.netlify.com/)

---

## Team Members

- **Victor Barrera** - DevOps Engineer / Lead Developer
- **Eliezer Carrasco** - Frontend Developer

---

**Last Updated:** 2024
**Repository:** https://github.com/victor99a/Demo-Barber
**Production URL:** https://demo-barber.netlify.app
