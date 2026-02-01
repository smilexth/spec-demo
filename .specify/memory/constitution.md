<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0 (MINOR - new principle added)
- Modified principles: None
- Added principles: VI. Atomic Commits
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (Constitution Check section aligns)
  - ✅ .specify/templates/spec-template.md (requirements structure compatible)
  - ✅ .specify/templates/tasks-template.md (task categorization compatible)
  - ✅ .specify/templates/agent-file-template.md (no agent-specific references)
  - ✅ .claude/commands/speckit.constitution.md (no agent-specific references)
- Follow-up TODOs: None
-->

# TodoApp Constitution

## Core Principles

### I. Component-First Architecture

Every feature MUST be implemented as reusable React components. Components MUST be self-contained with their own state, logic, and styling. Each component MUST have a single, clear responsibility and MUST be independently testable. Component composition is preferred over complex inheritance.

**Rationale**: React's component model enables code reuse, isolation of concerns, and easier testing. Single-responsibility components are simpler to understand, maintain, and debug.

### II. Utility-First Styling

All styling MUST use Tailwind CSS utility classes. Custom CSS MUST only be used for animations or highly specialized visual effects not achievable with Tailwind. Design tokens MUST align with Tailwind's configuration (spacing, colors, typography). All styles MUST be responsive by default.

**Rationale**: Tailwind promotes consistent design, reduces custom CSS bloat, and enables rapid prototyping. Utility classes create a visual design system that enforces consistency across the application.

### III. Modern Build Standards

All code MUST leverage Vite's build tooling for fast development and optimized production bundles. Build configurations MUST use environment variables for any environment-specific values. Hot Module Replacement (HMR) MUST be maintained for optimal developer experience. Production builds MUST be optimized for minimal bundle size and fast load times.

**Rationale**: Vite provides instant server start and lightning-fast HMR, enabling rapid iteration. Optimized production builds ensure the best possible user experience with minimal load times.

### IV. User Experience Excellence

The application MUST provide immediate visual feedback for all user interactions. All operations MUST handle loading states, error states, and empty states gracefully. Keyboard navigation MUST be fully supported. Data persistence MUST be transparent to users with automatic saving.

**Rationale**: A to-do app lives or dies by its responsiveness and clarity. Users expect instant feedback and must never wonder if their action was registered. Good UX reduces user frustration and increases trust.

### V. Simplicity & Maintainability

Features MUST be implemented using the simplest solution that meets requirements. YAGNI (You Aren't Gonna Need It) MUST be strictly enforced—no premature abstraction or features for hypothetical future needs. Code MUST be self-documenting with clear naming; comments MUST only explain "why," not "what."

**Rationale**: A to-do app should remain maintainable as it grows. Premature complexity creates technical debt that slows development. Simple code is easier to debug, modify, and extend.

### VI. Atomic Commits

All work MUST be committed before moving to edit another file or start a new task. Commits MUST be atomic—each commit represents a single, complete unit of work that can be understood and reverted independently. Staged changes MUST NOT remain uncommitted when context-switching to different files or tasks.

**Rationale**: Atomic commits create a clean, revertible history. They prevent lost work when context-switching and make debugging easier by isolating changes to single, meaningful units.

## Technology Standards

### Mandatory Technology Stack

- **Frontend Framework**: React 18+ with hooks
- **Styling**: Tailwind CSS 3+
- **Build Tool**: Vite 5+
- **Language**: TypeScript (preferred) or modern JavaScript (ES2022+)
- **State Management**: React Context API or useState/useReducer (no external state libraries unless justified)
- **Storage**: localStorage for client-side persistence (backend to be specified if needed)

### Technology Constraints

- No class components unless specifically required by a third-party library
- No CSS-in-JS libraries (use Tailwind utilities)
- No additional build plugins without justification
- No external component libraries unless specifically approved

## Development Workflow

### Code Quality Standards

- All components MUST have proper TypeScript types or PropTypes
- All user-facing features MUST be tested manually before commit
- Code MUST be formatted with Prettier (or equivalent)
- Linting MUST pass before commits

### Git & Version Control

- Feature branches MUST follow naming convention: `[###-feature-name]`
- Commits MUST be atomic and follow conventional commit format
- Pull requests MUST reference related issues or specifications
- **CRITICAL**: Work MUST be committed before editing a different file or starting a new task

### Testing Philosophy

Tests are OPTIONAL unless explicitly required by feature specification. When tests are required, they MUST follow React Testing Library patterns focusing on user behavior rather than implementation details.

## Governance

### Amendment Procedure

This constitution governs all development practices for the TodoApp project. It supersedes conflicting practices or conventions.

Amendments require:
1. Documented rationale for the change
2. Review against existing principles
3. Version bump according to semantic versioning
4. Update to all dependent templates to ensure consistency

### Compliance Review

All specifications, plans, and tasks MUST pass a constitution check before implementation begins. Any violation of core principles MUST be explicitly justified in the plan with a simpler alternative considered and rejected.

**Version**: 1.1.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01
