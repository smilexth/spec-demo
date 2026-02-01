# Tasks: FocusFlow Todo App

**Input**: Design documents from `/specs/001-todo-app/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/local-storage-api.md

**Tests**: Tests are OPTIONAL per constitution. This feature specification does NOT require automated tests. Manual testing checklist is provided in quickstart.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, etc.)
- Include exact file paths in descriptions

## Path Conventions

- **Single project (SPA)**: `src/` at repository root
- Project structure defined in plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Vite + React + TypeScript project with npm create vite@latest
- [ ] T002 Install dependencies: react 18.2+, tailwindcss 3.4+, lucide-react
- [ ] T003 [P] Configure Tailwind CSS with dark mode class strategy in tailwind.config.js
- [ ] T004 [P] Create src directory structure: src/components/, src/components/hooks/, src/lib/
- [ ] T005 [P] Create index.html with root div and meta tags for mobile responsiveness

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 [P] Define TypeScript types in src/lib/types.ts (Task, TaskPriority, TaskFilter, Theme, AppState, TaskStats)
- [ ] T007 [P] Create localStorage wrapper in src/lib/storage.ts (getTasks, saveTasks, getFilter, saveFilter, getTheme, saveTheme, clearAll)
- [ ] T008 [P] Create useLocalStorage hook in src/components/hooks/useLocalStorage.ts for automatic state sync
- [ ] T009 Create main.tsx entry point with StrictMode and root render
- [ ] T010 Create App.tsx root component with ThemeContext provider

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create and Manage Tasks (Priority: P1) 🎯 MVP

**Goal**: Core CRUD operations - users can create, complete, uncomplete, and delete tasks

**Independent Test**: Create a task, mark it complete with strike-through animation, uncomplete it, and delete it. All actions work independently without any other features.

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create useTodos hook in src/components/hooks/useTodos.ts (addTask, toggleTask, deleteTask, updateTask)
- [ ] T012 [P] [US1] Create TodoItem component in src/components/TodoItem.tsx with checkbox, text display, delete button
- [ ] T013 [P] [US1] Create TodoList component in src/components/TodoList.tsx to render TodoItem array
- [ ] T014 [P] [US1] Create TodoInput component in src/components/TodoInput.tsx with controlled input and Enter key handler
- [ ] T015 [US1] Create TodoApp container component in src/components/TodoApp.tsx integrating TodoInput, TodoList, useTodos
- [ ] T016 [US1] Add strike-through animation in index.css (custom CSS for task completion)
- [ ] T017 [US1] Add empty task validation in TodoInput (prevent submit when text is empty/whitespace)
- [ ] T018 [US1] Add Escape key handler in TodoInput to clear input without creating task

**Checkpoint**: At this point, User Story 1 should be fully functional - users can create, complete, uncomplete, and delete tasks

---

## Phase 4: User Story 2 - Task Persistence (Priority: P1)

**Goal**: All tasks survive page refresh and browser restart

**Independent Test**: Create tasks, refresh page, verify all tasks persist with completion state intact. Close/reopen browser, verify data restored.

### Implementation for User Story 2

- [ ] T019 [US2] Integrate useLocalStorage hook with useTodos in src/components/hooks/useTodos.ts (auto-save on state change)
- [ ] T020 [US2] Add localStorage initialization in useTodos hook (load from storage on mount)
- [ ] T021 [US2] Add error handling in src/lib/storage.ts for quota exceeded and disabled localStorage
- [ ] T022 [US2] Add user-facing error toast/notification when storage unavailable
- [ ] T023 [US2] Add graceful fallback to in-memory storage when localStorage fails

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - tasks persist across sessions

---

## Phase 5: User Story 3 - Filter Task Views (Priority: P2)

**Goal**: Users can filter tasks by All/Active/Completed status

**Independent Test**: Create tasks with mixed completion states, click each filter tab, verify correct tasks appear. Complete task in Active view, verify it disappears.

### Implementation for User Story 3

- [ ] T024 [P] [US3] Create FilterTabs component in src/components/FilterTabs.tsx with All/Active/Completed buttons
- [ ] T025 [P] [US3] Create useFilter hook in src/components/hooks/useFilter.ts for filter state management
- [ ] T026 [US3] Add filteredTasks computed value in useTodos hook based on current filter
- [ ] T027 [US3] Integrate FilterTabs into TodoApp container with active state indication
- [ ] T028 [US3] Add localStorage sync for filter state via useLocalStorage hook

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work - filtering works correctly

---

## Phase 6: User Story 4 - Task Prioritization (Priority: P2)

**Goal**: Users can assign Low/Medium/High priority with color coding

**Independent Test**: Create tasks with different priorities, verify color indicators (red/yellow/green). Change priority after creation, verify color updates.

### Implementation for User Story 4

- [ ] T029 [P] [US4] Create PrioritySelector component in src/components/PrioritySelector.tsx with Low/Medium/High dropdown
- [ ] T030 [P] [US4] Add priority field to Task interface in src/lib/types.ts (already defined, ensure used)
- [ ] T031 [US4] Add updatePriority function to useTodos hook in src/components/hooks/useTodos.ts
- [ ] T032 [US4] Add priority color indicator to TodoItem component (red-500 for high, yellow-500 for medium, green-500 for low)
- [ ] T033 [US4] Integrate PrioritySelector into TodoItem for in-place priority editing
- [ ] T034 [US4] Add PrioritySelector to TodoInput for setting priority on creation
- [ ] T035 [US4] Add keyboard navigation for priority selection (arrow keys to select)

**Checkpoint**: At this point, User Stories 1-4 should all work - priorities display correctly with color coding

---

## Phase 7: User Story 5 - Bulk Actions (Priority: P3)

**Goal**: Users can Toggle All tasks and Clear Completed tasks

**Independent Test**: Create mixed tasks, click Toggle All, verify all complete. Uncheck one, verify Toggle All unchecked. Click Clear Completed, verify only completed removed.

### Implementation for User Story 5

- [ ] T036 [P] [US5] Create BulkActions component in src/components/BulkActions.tsx with Toggle All checkbox and Clear Completed button
- [ ] T037 [US5] Add toggleAll function to useTodos hook in src/components/hooks/useTodos.ts
- [ ] T038 [US5] Add clearCompleted function to useTodos hook in src/components/hooks/useTodos.ts
- [ ] T039 [US5] Add completedCount and allCompleted computed values to useTodos hook
- [ ] T040 [US5] Integrate BulkActions into TodoApp container
- [ ] T041 [US5] Disable Clear Completed button when completedCount === 0
- [ ] T042 [US5] Update Toggle All checkbox state when individual task is toggled

**Checkpoint**: At this point, User Stories 1-5 should all work - bulk actions function correctly

---

## Phase 8: User Story 6 - Dark Mode Toggle (Priority: P3)

**Goal**: Users can toggle light/dark theme, system preference auto-detected

**Independent Test**: First load matches system theme. Click toggle, theme switches. Refresh, preference persists. Text readable in both modes.

### Implementation for User Story 6

- [ ] T043 [P] [US6] Create ThemeToggle component in src/components/ThemeToggle.tsx with Sun/Moon icons
- [ ] T044 [P] [US6] Create useTheme hook in src/components/hooks/useTheme.ts with system preference detection
- [ ] T045 [US6] Add theme state management with localStorage persistence in useTheme hook
- [ ] T046 [US6] Add useEffect to listen for prefers-color-scheme media query changes
- [ ] T047 [US6] Add dark class to document.documentElement when theme is 'dark'
- [ ] T048 [US6] Integrate ThemeToggle into App.tsx or TodoApp container
- [ ] T049 [US6] Add Tailwind dark: classes to all components (TodoApp, TodoItem, TodoInput, FilterTabs, BulkActions, etc.)
- [ ] T050 [US6] Add smooth transition for theme toggle (< 200ms per SC-008)

**Checkpoint**: All user stories should now be independently functional - dark mode works

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T051 [P] Create EmptyState component in src/components/EmptyState.tsx with helpful message
- [ ] T052 [P] Integrate EmptyState into TodoApp (show when tasks.length === 0)
- [ ] T053 [P] Add hover states to all interactive elements (delete button, checkbox, filter tabs, priority selector)
- [ ] T054 [P] Add focus indicators for keyboard navigation (ring-2 ring-blue-500 on all inputs/buttons)
- [ ] T055 [P] Add responsive design for mobile (single column layout via Tailwind breakpoints)
- [ ] T056 [P] Add touch target sizing (min 44x44px per SC-007) for mobile
- [ ] T057 [P] Add long text wrapping/truncation in TodoItem (max 500 chars with ellipsis)
- [ ] T058 [P] Add emoji/special character support verification in TodoItem
- [ ] T059 Add performance testing (create 100+ tasks, verify no lag)
- [ ] T060 Run full manual testing checklist from quickstart.md
- [ ] T061 Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] T062 Test on mobile devices (responsive design verification)
- [ ] T063 Run production build with npm run build and verify bundle size
- [ ] T064 Deploy to preview and validate all user stories work end-to-end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-8)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Extends US1 with persistence
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1/US2 but independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Extends Task entity, integrates with existing components
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Uses existing task list
- **User Story 6 (P3)**: Can start after Foundational (Phase 2) - Independent UI theming, no task dependencies

### Within Each User Story

- Models/types before hooks
- Hooks before components
- Components before integration
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: T002, T003, T004, T005 can run in parallel (different concerns)
- **Phase 2**: T006, T007, T008 can run in parallel (different files)
- **Phase 3 (US1)**: T011, T012, T013, T014 can run in parallel (hooks and components independent)
- **Phase 6 (US4)**: T029, T030 can run in parallel
- **Phase 7 (US5)**: T036 can run independently
- **Phase 8 (US6)**: T043, T044 can run in parallel
- **Phase 9**: Most tasks can run in parallel (different files)

---

## Parallel Example: User Story 1

```bash
# Launch all hooks and components for User Story 1 together:
Task T011: "Create useTodos hook in src/components/hooks/useTodos.ts"
Task T012: "Create TodoItem component in src/components/TodoItem.tsx"
Task T013: "Create TodoList component in src/components/TodoList.tsx"
Task T014: "Create TodoInput component in src/components/TodoInput.tsx"

# Then integrate (T015 depends on T011-T014 completing):
Task T015: "Create TodoApp container component in src/components/TodoApp.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T010) - CRITICAL
3. Complete Phase 3: User Story 1 (T011-T018)
4. Complete Phase 4: User Story 2 (T019-T023)
5. **STOP and VALIDATE**: Test core create/complete/delete workflow with persistence
6. Deploy/demo if ready - this is a working MVP!

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 + 2 → Test independently → Deploy/Demo (MVP with persistence!)
3. Add User Story 3 → Test independently → Deploy/Demo (filtering added)
4. Add User Story 4 → Test independently → Deploy/Demo (priorities added)
5. Add User Story 5 → Test independently → Deploy/Demo (bulk actions added)
6. Add User Story 6 → Test independently → Deploy/Demo (dark mode added)
7. Complete Polish phase → Final production release
8. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup (T001-T005) + Foundational (T006-T010) together
2. Once Foundational is done:
   - Developer A: User Story 1 (T011-T018)
   - Developer B: User Story 2 (T019-T023) - waits for A's useTodos hook
   - Developer C: User Story 6 (T043-T050) - completely independent
3. After P1 stories complete:
   - Developer A: User Story 3 (T024-T028)
   - Developer B: User Story 4 (T029-T035)
   - Developer C: User Story 5 (T036-T042)
4. All converge for Polish phase (T051-T064)

---

## Summary

| Metric | Count |
|--------|-------|
| **Total Tasks** | 64 |
| **Setup Phase** | 5 tasks |
| **Foundational Phase** | 5 tasks |
| **User Story 1 (P1)** | 8 tasks |
| **User Story 2 (P1)** | 5 tasks |
| **User Story 3 (P2)** | 5 tasks |
| **User Story 4 (P2)** | 7 tasks |
| **User Story 5 (P3)** | 7 tasks |
| **User Story 6 (P3)** | 8 tasks |
| **Polish Phase** | 14 tasks |
| **Parallel Opportunities** | ~25 tasks marked [P] |

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group (per Principle VI: Atomic Commits)
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Tests are manual - use quickstart.md testing checklist for validation
