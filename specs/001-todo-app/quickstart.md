# Quickstart Guide: FocusFlow Todo App

**Date**: 2026-02-01
**Phase**: 1 - Design & Contracts

## Overview

This guide helps developers get started with the FocusFlow Todo App codebase. It covers setup, development workflow, and key patterns.

## Prerequisites

- Node.js 18+ or 20+
- npm 10+ or pnpm 8+
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

## Project Setup

### Initial Installation

```bash
# Clone the repository (if not already done)
cd spec-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Development Workflow

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (if configured) |
| `npm run format` | Format code with Prettier (if configured) |

### File Structure

```
src/
├── components/           # React components
│   ├── App.tsx          # Root with theme provider
│   ├── TodoApp.tsx      # Main container
│   ├── TodoInput.tsx    # Task creation
│   ├── TodoList.tsx     # List wrapper
│   ├── TodoItem.tsx     # Individual task
│   ├── FilterTabs.tsx   # Filter buttons
│   ├── BulkActions.tsx  # Toggle all, clear completed
│   ├── PrioritySelector.tsx  # Priority dropdown
│   ├── ThemeToggle.tsx  # Dark/light switch
│   ├── EmptyState.tsx   # No tasks message
│   └── hooks/           # Custom React hooks
│       ├── useLocalStorage.ts  # localStorage sync
│       ├── useTodos.ts         # Todo state
│       └── useTheme.ts         # Theme state
├── lib/
│   ├── storage.ts       # localStorage wrapper
│   └── types.ts         # TypeScript definitions
└── main.tsx             # Entry point
```

---

## Key Patterns

### 1. Custom Hooks for State

State management is handled by custom hooks:

```typescript
// useTodos - manages task array
const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTodos();

// useLocalStorage - syncs state to localStorage
const [value, setValue] = useLocalStorage('focusflow-tasks', []);

// useTheme - manages dark/light mode
const { theme, toggleTheme, setTheme } = useTheme();
```

### 2. Component Props

Keep props minimal by passing callbacks:

```typescript
// TodoItem receives task + callbacks
<TodoItem
  task={task}
  onToggle={() => onToggle(task.id)}
  onDelete={() => onDelete(task.id)}
  onPriorityChange={(p) => onPriorityChange(task.id, p)}
/>
```

### 3. Tailwind Styling

Use utility classes for all styling:

```tsx
<div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-4">
  <input className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500" />
</div>
```

### 4. Dark Mode

Conditional classes for dark mode:

```tsx
className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800"
```

The `dark` class is added to `<html>` by the ThemeToggle component.

---

## Adding a New Feature

### Example: Adding Due Dates

1. **Update types** (`src/lib/types.ts`):
```typescript
export interface Task {
  // ...existing fields
  dueDate?: string;  // ISO 8601 date string
}
```

2. **Update storage** (`src/lib/storage.ts`):
```typescript
// No changes needed - stores entire Task object
```

3. **Update TodoItem** (`src/components/TodoItem.tsx`):
```tsx
{task.dueDate && (
  <span className="text-sm text-slate-500">
    {new Date(task.dueDate).toLocaleDateString()}
  </span>
)}
```

4. **Update useTodos** (`src/components/hooks/useTodos.ts`):
```typescript
const updateDueDate = (id: string, dueDate: string) => {
  setTasks(prev => prev.map(t =>
    t.id === id ? { ...t, dueDate } : t
  ));
};
```

---

## Testing Checklist

### Manual Testing Per User Story

**User Story 1: Create and Manage Tasks**
- [ ] Create task by typing and pressing Enter
- [ ] Mark task complete via checkbox
- [ ] Unmark task complete via checkbox
- [ ] Delete task via delete button
- [ ] Verify strike-through animation on complete

**User Story 2: Task Persistence**
- [ ] Create tasks, refresh page, verify they persist
- [ ] Complete tasks, refresh, verify state persists
- [ ] Close/reopen browser, verify data persists
- [ ] Clear localStorage, verify app starts empty

**User Story 3: Filter Task Views**
- [ ] Click "Active" filter, verify only incomplete shown
- [ ] Click "Completed" filter, verify only completed shown
- [ ] Click "All" filter, verify all shown
- [ ] Complete task while in "Active" view, verify it disappears

**User Story 4: Task Prioritization**
- [ ] Create task with High priority, verify red indicator
- [ ] Create task with Medium priority, verify yellow indicator
- [ ] Create task with Low priority, verify green indicator
- [ ] Change priority after creation, verify color updates

**User Story 5: Bulk Actions**
- [ ] Click "Toggle All", verify all tasks complete
- [ ] Uncheck one task, verify "Toggle All" unchecked
- [ ] Click "Clear Completed", verify completed tasks removed
- [ ] Verify button disabled when no completed tasks

**User Story 6: Dark Mode Toggle**
- [ ] First load, verify matches system preference
- [ ] Click theme toggle, verify theme switches
- [ ] Refresh page, verify theme preference persists
- [ ] Verify text readable in both modes

### Edge Cases

- [ ] Try creating empty task, verify prevented
- [ ] Type very long task text, verify wraps/truncates
- [ ] Fill localStorage to quota, verify error handled
- [ ] Create task then press Escape, verify input clears
- [ ] Use emoji/special chars in task text, verify displays
- [ ] Create 100+ tasks, verify no performance issues

---

## Troubleshooting

### localStorage Not Working

**Symptom**: Tasks don't persist after refresh

**Debug**:
```typescript
// Check if localStorage available
console.log('localStorage available:', typeof localStorage !== 'undefined');

// Check stored data
console.log('Stored tasks:', localStorage.getItem('focusflow-tasks'));
```

**Fixes**:
- Ensure browser allows localStorage (not in private/incognito mode)
- Check browser console for quota exceeded errors
- Check for browser extensions blocking localStorage

### Dark Mode Not Applying

**Symptom**: Dark mode toggle doesn't change colors

**Debug**:
```typescript
// Check if dark class on html
console.log('Has dark class:', document.documentElement.classList.contains('dark'));

// Check tailwind config
```

**Fixes**:
- Verify `darkMode: 'class'` in `tailwind.config.js`
- Ensure Tailwind CSS is loaded
- Check for conflicting CSS

### HMR Not Working

**Symptom**: Changes don't appear without full refresh

**Fixes**:
- Restart dev server: `npm run dev`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check firewall/antivirus blocking Vite

---

## Browser DevTools

### React DevTools

Install [React DevTools](https://react.dev/learn/react-developer-tools) to inspect component hierarchy and props.

### Storage Inspector

1. Open DevTools (F12)
2. Go to Application > Local Storage
3. Look for `focusflow-*` keys

### Console Logging

The app logs important events:
- Task created/deleted/updated
- Theme changed
- Filter changed
- Storage errors

---

## Production Build

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview

# Deploy the `dist/` folder to any static hosting:
# - Netlify: drag and drop `dist/`
# - Vercel: `vercel deploy`
# - GitHub Pages: push `dist/` to gh-pages branch
```

---

## Next Steps

After completing the implementation:

1. Run through the full testing checklist
2. Test on multiple browsers (Chrome, Firefox, Safari)
3. Test on mobile devices (responsive design)
4. Verify localStorage persistence across sessions
5. Test with 100+ tasks for performance

For implementation details, see:
- [Data Model](data-model.md) - Type definitions and state structure
- [localStorage Contract](contracts/local-storage-api.md) - Storage interface
- [Research](research.md) - Technology decisions and rationale
