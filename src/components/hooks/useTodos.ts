// useTodos hook - manages task state with CRUD operations
import { useState, useCallback, useMemo } from 'react'
import type { Task, TaskFilter } from '@/lib/types'

interface UseTodosReturn {
  tasks: Task[]
  filteredTasks: Task[]
  filter: TaskFilter
  setFilter: (filter: TaskFilter) => void
  addTask: (text: string, priority?: Task['priority']) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  completedCount: number
  activeCount: number
}

export function useTodos(initialTasks: Task[] = [], initialFilter: TaskFilter = 'all'): UseTodosReturn {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<TaskFilter>(initialFilter)

  const addTask = useCallback((text: string, priority: Task['priority'] = 'medium') => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      isCompleted: false,
      priority,
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    )
  }, [])

  const completedCount = tasks.filter((t) => t.isCompleted).length
  const activeCount = tasks.filter((t) => !t.isCompleted).length

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.isCompleted)
      case 'completed':
        return tasks.filter((t) => t.isCompleted)
      default:
        return tasks
    }
  }, [tasks, filter])

  return {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    completedCount,
    activeCount,
  }
}
