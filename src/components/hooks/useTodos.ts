// useTodos hook - manages task state with CRUD operations
import { useState, useCallback } from 'react'
import type { Task } from '../lib/types'

interface UseTodosReturn {
  tasks: Task[]
  addTask: (text: string, priority?: Task['priority']) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  completedCount: number
  activeCount: number
}

export function useTodos(initialTasks: Task[] = []): UseTodosReturn {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

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

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    completedCount,
    activeCount,
  }
}
