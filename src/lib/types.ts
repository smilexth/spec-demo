// Type definitions for FocusFlow Todo App

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
