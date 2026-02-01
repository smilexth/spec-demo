// localStorage wrapper for FocusFlow Todo App
import type { Task, TaskFilter, Theme } from './types';

const STORAGE_KEYS = {
  TASKS: 'focusflow-tasks',
  FILTER: 'focusflow-filter',
  THEME: 'focusflow-theme',
} as const;

// Check if localStorage is available
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

// Task operations
export function getTasks(): Task[] | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveTasks(tasks: Task[]): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Failed to save tasks:', error);
    return false;
  }
}

// Filter operations
export function getFilter(): TaskFilter {
  if (!isLocalStorageAvailable()) {
    return 'all';
  }

  try {
    const data = localStorage.getItem(STORAGE_KEYS.FILTER);
    return data && (data === 'all' || data === 'active' || data === 'completed') ? data : 'all';
  } catch {
    return 'all';
  }
}

export function saveFilter(filter: TaskFilter): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.FILTER, filter);
    return true;
  } catch {
    return false;
  }
}

// Theme operations
export function getTheme(): Theme {
  if (!isLocalStorageAvailable()) {
    return 'system';
  }

  try {
    const data = localStorage.getItem(STORAGE_KEYS.THEME);
    return data && (data === 'light' || data === 'dark' || data === 'system') ? data : 'system';
  } catch {
    return 'system';
  }
}

export function saveTheme(theme: Theme): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    return true;
  } catch {
    return false;
  }
}

// Utility
export function clearAll(): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.FILTER);
    localStorage.removeItem(STORAGE_KEYS.THEME);
    return true;
  } catch {
    return false;
  }
}
