# Data Model: FocusFlow Todo App

**Date**: 2026-02-01
**Phase**: 1 - Design & Contracts
**Status**: Complete

## Overview

This document defines the data structures and entities used in the FocusFlow Todo App. All data is stored client-side in localStorage as JSON.

## Entity Definitions

### Task

Represents a single to-do item in the application.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | string (UUID v4) | Unique identifier for the task | Required, must be valid UUID |
| `text` | string | The task description | Required, non-empty, max 500 chars |
| `isCompleted` | boolean | Whether the task is completed | Required, default false |
| `priority` | TaskPriority | The importance level | Required, default 'medium' |
| `createdAt` | string (ISO 8601) | Creation timestamp | Required, auto-generated |

**Example**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "text": "Buy groceries",
  "isCompleted": false,
  "priority": "high",
  "createdAt": "2026-02-01T12:00:00Z"
}
```

**Validation Rules**:
- `text` cannot be empty or whitespace only (FR-025)
- `text` is trimmed of leading/trailing whitespace before storage
- `text` over 500 characters is truncated with ellipsis
- `id` is generated using `crypto.randomUUID()` (modern browsers) or a fallback

---

### TaskPriority

Enum representing the importance level of a task.

| Value | Description | Display Color |
|-------|-------------|---------------|
| `low` | Low priority task | Green/blue indicator |
| `medium` | Medium priority task | Yellow/orange indicator |
| `high` | High priority task | Red/high-contrast indicator |

**TypeScript Definition**:
```typescript
type TaskPriority = 'low' | 'medium' | 'high';
```

**Default**: `'medium'` when not specified

---

### TaskFilter

Enum representing the current view filter state.

| Value | Description |
|-------|-------------|
| `all` | Show all tasks (active and completed) |
| `active` | Show only incomplete tasks (isCompleted = false) |
| `completed` | Show only completed tasks (isCompleted = true) |

**TypeScript Definition**:
```typescript
type TaskFilter = 'all' | 'active' | 'completed';
```

**Default**: `'all'` when not specified

---

### Theme

Enum representing the visual appearance mode.

| Value | Description |
|-------|-------------|
| `light` | Light color scheme |
| `dark` | Dark color scheme |

**TypeScript Definition**:
```typescript
type Theme = 'light' | 'dark' | 'system';
```

**Default**: `'system'` (auto-detect from OS preference)

**Behavior**:
- When set to `'system'`, app listens to `prefers-color-scheme` media query
- When set to `'light'` or `'dark'`, app uses that theme and persists choice

---

### AppState

The root application state structure.

| Field | Type | Description |
|-------|------|-------------|
| `tasks` | Task[] | Array of all tasks |
| `filter` | TaskFilter | Current filter selection |
| `theme` | Theme | Current theme selection |

**Example**:
```json
{
  "tasks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "text": "Buy groceries",
      "isCompleted": false,
      "priority": "high",
      "createdAt": "2026-02-01T12:00:00Z"
    }
  ],
  "filter": "all",
  "theme": "system"
}
```

---

## Storage Schema

### localStorage Keys

| Key | Type | Description |
|-----|------|-------------|
| `focusflow-tasks` | string (JSON array) | Serialized array of Task objects |
| `focusflow-filter` | string | Serialized TaskFilter value |
| `focusflow-theme` | string | Serialized Theme value |

**Rationale**: Separate keys allow independent updates without re-serializing entire state.

---

## State Transitions

### Task Lifecycle

```
[Created] --> [Active] --> [Completed] --> [Deleted]
    |                                |
    +--------------------------------+
           (can toggle back to Active)
```

**Transitions**:
1. **Create**: New task with `isCompleted=false`, `priority='medium'`
2. **Complete**: Set `isCompleted=true` with strike-through animation
3. **Uncomplete**: Set `isCompleted=false` (toggle back)
4. **Delete**: Remove from tasks array permanently
5. **Update Priority**: Change `priority` value at any time
6. **Edit Text**: Modify `text` value at any time

### Filter Transitions

```
     +-------+
     |  all  |
     +-------+
   /         \
  v           v
+------+   +------+
|active|   |completed|
+------+   +------+
```

**Transitions**: User can switch between any filter at any time via FilterTabs component.

### Theme Transitions

```
+--------+
| system | --[manual toggle]--> [light|dark]
+--------+
                           |
                    [manual toggle]
                           v
                       +--------+
                       | system | --[override based on OS]
                       +--------+
```

**Transitions**:
1. **Initial load**: Use `'system'` theme, detect OS preference
2. **Manual toggle**: Switch to opposite theme, persist choice
3. **Subsequent loads**: Use persisted theme choice

---

## Derived State

### Filtered Tasks

Computed based on current `filter` value:

```typescript
const filteredTasks = tasks.filter(task => {
  if (filter === 'active') return !task.isCompleted;
  if (filter === 'completed') return task.isCompleted;
  return true; // 'all' shows everything
});
```

### Task Statistics

```typescript
const stats = {
  total: tasks.length,
  active: tasks.filter(t => !t.isCompleted).length,
  completed: tasks.filter(t => t.isCompleted).length
};
```

Used for:
- Empty state detection (total === 0)
- "Clear Completed" button visibility (completed > 0)
- "Toggle All" checkbox state (active === 0)

---

## Data Integrity

### Constraints

1. **No duplicate IDs**: Each task must have a unique identifier
2. **Non-empty text**: Task text cannot be empty after trimming
3. **Valid priorities**: Priority must be one of: 'low', 'medium', 'high'
4. **Valid filter**: Filter must be one of: 'all', 'active', 'completed'
5. **Valid theme**: Theme must be one of: 'light', 'dark', 'system'

### Error Handling

| Error Scenario | Handling |
|----------------|----------|
| localStorage quota exceeded | Display error message, operate in-memory only |
| localStorage disabled | Display warning, operate in-memory only |
| Corrupted JSON in storage | Clear and reinitialize with empty state |
| Invalid task data | Filter out invalid tasks during load |

---

## TypeScript Type Definitions

```typescript
// src/lib/types.ts

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskFilter = 'all' | 'active' | 'completed';
export type Theme = 'light' | 'dark' | 'system';

export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
  priority: TaskPriority;
  createdAt: string;
}

export interface AppState {
  tasks: Task[];
  filter: TaskFilter;
  theme: Theme;
}

export interface TaskStats {
  total: number;
  active: number;
  completed: number;
}
```
