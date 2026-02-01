# API Contract: localStorage Storage

**Date**: 2026-02-01
**Phase**: 1 - Design & Contracts
**Type**: Storage Interface Contract

## Overview

This document defines the contract for the localStorage storage layer. Since this is a client-side-only application with no backend API, the storage interface serves as the data contract between the application and browser storage.

## Storage Keys

| Key | Type | Format | Description |
|-----|------|--------|-------------|
| `focusflow-tasks` | array | `Task[]` (JSON string) | Array of all task objects |
| `focusflow-filter` | string | `"all" \| "active" \| "completed"` | Current filter state |
| `focusflow-theme` | string | `"light" \| "dark" \| "system"` | Current theme preference |

---

## Operations

### Get Tasks

**Description**: Retrieve all tasks from storage.

**Input**: None

**Output**:
```typescript
Task[] | null  // null if no data stored or error occurred
```

**Error Handling**:
- Returns `null` if localStorage is disabled
- Returns `null` if JSON parsing fails
- Logs error to console for debugging

**Example**:
```typescript
const tasks = storage.getTasks();
// Returns: [{ id: "...", text: "Buy groceries", isCompleted: false, priority: "high", createdAt: "..." }]
```

---

### Save Tasks

**Description**: Persist the tasks array to storage.

**Input**:
```typescript
tasks: Task[]  // Array to persist
```

**Output**:
```typescript
boolean  // true if successful, false if failed
```

**Error Handling**:
- Returns `false` if localStorage quota exceeded (~5MB limit)
- Returns `false` if localStorage is disabled
- Displays user-facing error message on failure
- Continues operating in-memory if storage fails

**Example**:
```typescript
const success = storage.saveTasks([...tasks]);
// Returns: true
```

---

### Get Filter

**Description**: Retrieve current filter state from storage.

**Input**: None

**Output**:
```typescript
TaskFilter | "all"  // Returns stored filter or default "all"
```

**Error Handling**:
- Returns `"all"` as default if no value stored
- Returns `"all"` if value is corrupted

**Example**:
```typescript
const filter = storage.getFilter();
// Returns: "active"
```

---

### Save Filter

**Description**: Persist the current filter state.

**Input**:
```typescript
filter: TaskFilter  // Filter value to persist
```

**Output**:
```typescript
boolean  // true if successful, false if failed
```

**Example**:
```typescript
const success = storage.saveFilter("completed");
// Returns: true
```

---

### Get Theme

**Description**: Retrieve current theme preference from storage.

**Input**: None

**Output**:
```typescript
Theme | "system"  // Returns stored theme or default "system"
```

**Error Handling**:
- Returns `"system"` as default if no value stored
- Returns `"system"` if value is corrupted

**Example**:
```typescript
const theme = storage.getTheme();
// Returns: "dark"
```

---

### Save Theme

**Description**: Persist the current theme preference.

**Input**:
```typescript
theme: Theme  // Theme value to persist
```

**Output**:
```typescript
boolean  // true if successful, false if failed
```

**Example**:
```typescript
const success = storage.saveTheme("light");
// Returns: true
```

---

### Clear All

**Description**: Remove all application data from storage. Used for testing or user-initiated data reset.

**Input**: None

**Output**:
```typescript
boolean  // true if successful, false if failed
```

**Example**:
```typescript
const success = storage.clearAll();
// Returns: true
```

---

## TypeScript Interface

```typescript
// src/lib/storage.ts

import type { Task, TaskFilter, Theme } from './types';

export interface StorageAPI {
  // Task operations
  getTasks(): Task[] | null;
  saveTasks(tasks: Task[]): boolean;

  // Filter operations
  getFilter(): TaskFilter;
  saveFilter(filter: TaskFilter): boolean;

  // Theme operations
  getTheme(): Theme;
  saveTheme(theme: Theme): boolean;

  // Utility
  clearAll(): boolean;
}

export const storage: StorageAPI = {
  // Implementation details...
};
```

---

## Storage Format Examples

### tasks storage

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "text": "Buy groceries",
    "isCompleted": false,
    "priority": "high",
    "createdAt": "2026-02-01T12:00:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "text": "Finish project report",
    "isCompleted": true,
    "priority": "medium",
    "createdAt": "2026-02-01T11:30:00.000Z"
  }
]
```

### filter storage

```
"active"
```

### theme storage

```
"dark"
```

---

## Error Scenarios

| Scenario | Detection | Response |
|----------|-----------|----------|
| localStorage disabled | `typeof localStorage === 'undefined'` or `window === null` | Return default values, operate in-memory |
| Quota exceeded | `QuotaExceededError` exception | Show error toast, continue in-memory |
| JSON parse error | `JSON.stringify()` throws | Return default values, log error |
| Privacy mode | Access throws `SecurityError` | Show warning toast, continue in-memory |

---

## Performance Considerations

- **Read operations**: Synchronous, typically < 1ms
- **Write operations**: Synchronous, typically < 5ms
- **Storage limit**: ~5MB (more than sufficient for todo items)
- **Recommended usage**: Auto-save on every state change (debounced if needed)

---

## Migration Strategy

Future versions may need to migrate stored data. Include version number in storage:

```typescript
const STORAGE_VERSION = 1;
const STORAGE_KEY_VERSION = 'focusflow-version';

// On load, check version and migrate if needed
const storedVersion = localStorage.getItem(STORAGE_KEY_VERSION);
if (storedVersion !== STORAGE_VERSION.toString()) {
  migrateData(storedVersion, STORAGE_VERSION);
}
```
