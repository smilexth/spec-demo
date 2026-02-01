# Research: FocusFlow Todo App

**Date**: 2026-02-01
**Phase**: 0 - Outline & Research
**Status**: Complete

## Overview

This document captures research findings and technical decisions for the FocusFlow Todo App implementation. Since the project constitution (v1.1.0) already mandates the technology stack, most decisions were pre-determined. This research validates those choices and documents implementation patterns.

## Technology Decisions

### Decision 1: Frontend Framework - React 18+

**Chosen**: React 18.2+ with hooks (useState, useReducer, useEffect, useContext)

**Rationale**:
- Constitution Principle I mandates React for component-first architecture
- React 18 includes Concurrent Mode for better UI performance
- Hooks provide simple state management without external libraries
- Large ecosystem for icon libraries (Lucide-React, Heroicons)
- Excellent TypeScript support for type safety

**Alternatives Considered**:
- Vue 3: Also has hooks-like Composition API, but constitution specifically names React
- Vanilla JS: Would require building state management from scratch, violates constitution's technology standards

**Implementation Pattern**: Functional components with hooks only. No class components unless required by third-party library.

---

### Decision 2: Styling - Tailwind CSS 3+

**Chosen**: Tailwind CSS 3.4+ with Vite plugin

**Rationale**:
- Constitution Principle II mandates utility-first styling
- Built-in responsive design (sm:, md:, lg: breakpoints)
- Dark mode support via `class` or `media` strategy
- No custom CSS needed except for specific animations (strike-through)
- JIT compiler in production generates only used utilities

**Alternatives Considered**:
- CSS Modules: Would require more custom CSS, violates utility-first principle
- Styled Components: CSS-in-JS, explicitly prohibited by constitution
- Plain CSS: Would create larger bundle and maintenance burden

**Implementation Pattern**:
- Use `class` strategy for dark mode (manual toggle)
- Color palette: `slate` for neutrals, semantic colors for priorities (red-500 for high, yellow-500 for medium, green-500 for low)
- Spacing: Tailwind's 4px base unit (p-4 = 16px, etc.)

---

### Decision 3: Build Tool - Vite 5+

**Chosen**: Vite 5.0+ for development and production builds

**Rationale**:
- Constitution Principle III mandates Vite for modern build standards
- Instant server start (ESM-based, no bundling in dev)
- Lightning-fast HMR for rapid iteration
- Optimized production builds via Rollup
- Built-in TypeScript support

**Alternatives Considered**:
- Next.js: Overkill for client-side-only app, adds server-side rendering complexity
- Webpack: Slower dev experience, more configuration needed
- Parcel: Good alternative but constitution specifically mandates Vite

**Implementation Pattern**:
- `npm run dev` for development with HMR
- `npm run build` for optimized production bundle
- `npm run preview` to test production build locally

---

### Decision 4: State Management - React Built-ins

**Chosen**: useState/useReducer with React Context for global state

**Rationale**:
- Constitution Principle V mandates simplicity (YAGNI)
- Todo app has simple state (array of tasks, filter, theme) - doesn't need Redux/Zustand
- Custom hooks (useTodos, useTheme) encapsulate state logic
- localStorage persistence handled by custom useLocalStorage hook

**Alternatives Considered**:
- Redux Toolkit: Overkill for this scope, adds boilerplate
- Zustand: Lighter than Redux but still an external dependency
- Jotai/Recoil: Atomic state is more complex than needed

**Implementation Pattern**:
```typescript
// useTodos hook manages task array with CRUD operations
// useTheme hook manages theme state with system preference detection
// useLocalStorage hook syncs any state to localStorage automatically
```

---

### Decision 5: Storage - localStorage API

**Chosen**: Browser localStorage API via custom wrapper

**Rationale**:
- Constitution specifies localStorage for client-side persistence
- No backend required (single-user app per spec assumptions)
- Synchronous API simplifies data flow
- ~5MB storage limit is sufficient for todo items

**Alternatives Considered**:
- IndexedDB: Overkill for small JSON payload, adds complexity
- SessionStorage: Data lost on tab close, violates persistence requirement
- Backend API: Adds server dependency, beyond scope

**Implementation Pattern**:
- Custom `storage.ts` module with error handling for quota exceeded/disabled
- Auto-save on every state change via useLocalStorage hook
- Graceful fallback when localStorage unavailable (in-memory only)

---

### Decision 6: TypeScript vs JavaScript

**Chosen**: TypeScript 5.3+ (preferred per constitution)

**Rationale**:
- Constitution lists TypeScript as "preferred"
- Catches type errors at compile time (e.g., priority values, filter states)
- Better IDE support with autocomplete
- Self-documenting via type definitions
- Can always fall back to JavaScript ES2022+ if needed

**Alternatives Considered**:
- JavaScript with PropTypes: Runtime checks only, less developer experience
- JSDoc with TypeScript: Incomplete type coverage

**Implementation Pattern**:
- Define types in `src/lib/types.ts`
- Export Task, TaskPriority, TaskFilter, Theme interfaces
- Use strict mode in tsconfig.json

---

### Decision 7: Icons - Lucide React

**Chosen**: Lucide React for icon set

**Rationale**:
- Spec mentions Lucide-React or Heroicons as options
- Lucide has consistent stroke-width design (matches minimalist aesthetic)
- Tree-shakeable ES modules
- TypeScript types included
- Simple API: `<CheckSquare />, Trash2 />, Sun />, Moon />`

**Alternatives Considered**:
- Heroicons: Also excellent, requires more imports for different variants (outline vs solid)
- React Icons: Large bundle, includes multiple libraries

**Implementation Pattern**:
- Import specific icons: `import { Trash2, Check, Sun, Moon } from 'lucide-react'`
- Use consistent sizing with `size={20}` or Tailwind classes

---

### Decision 8: Testing Approach

**Chosen**: Manual testing (Vitest optional)

**Rationale**:
- Constitution states "Tests are OPTIONAL unless explicitly required"
- Spec does not require automated tests
- Manual testing sufficient for todo app's complexity
- Can add Vitest later if needed (same test runner as Vite uses)

**Alternatives Considered**:
- React Testing Library: Would add test maintenance burden
- Playwright/Cypress: E2E testing is overkill for this scope

**Implementation Pattern**:
- Manual testing checklist per user story
- Browser testing on Chrome, Firefox, Safari for compatibility
- Verify localStorage persistence, keyboard shortcuts, mobile responsiveness

---

## Best Practices Research

### React Patterns for Todo Apps

1. **Lift State Up**: Keep task array in parent (TodoApp), pass to TodoItem via props
2. **Controlled Components**: Input field value controlled by React state
3. **Key Prop**: Use task ID as key for efficient list reconciliation
4. **Memoization**: Use React.memo for TodoItem to prevent re-renders
5. **Custom Hooks**: Extract logic into useTodos, useLocalStorage, useTheme

### Tailwind Patterns for Dark Mode

1. **Class Strategy**: Add `dark` class to html element when dark mode active
2. **Conditional Classes**: `className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"`
3. **Tailwind Config**: Enable `darkMode: 'class'` in tailwind.config.js

### localStorage Error Handling

1. **Quota Exceeded**: Catch error and notify user storage is full
2. **Privacy Mode**: Detect when localStorage is disabled, fall back to in-memory
3. **JSON Parsing**: Wrap JSON.parse in try/catch for corrupted data
4. **Migration Strategy**: Include version number in stored data for future changes

## Summary

All technical decisions align with the TodoApp Constitution (v1.1.0). No violations or exceptions needed. The tech stack is straightforward:

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS 3+
- **Build**: Vite 5+
- **Storage**: localStorage API
- **State**: useState/useReducer with custom hooks

No NEEDS CLARIFICATION items remain. Ready for Phase 1: Design & Contracts.
