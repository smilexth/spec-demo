import { useState, useEffect } from 'react'
import { useTodos } from './hooks/useTodos'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTheme } from './App'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import ErrorToast from './ErrorToast'
import { saveTasks } from '@/lib/storage'
import type { Task } from '@/lib/types'

type StorageError = { type: 'quota_exceeded' | 'disabled'; message: string } | null

const ERROR_MESSAGES = {
  quota_exceeded: 'Storage is full. Some old tasks may not be saved. Try clearing completed tasks.',
  disabled: 'Storage is disabled in your browser. Tasks will only be saved in memory.',
}

export default function TodoApp() {
  const [storageError, setStorageError] = useState<StorageError>(null)

  // Load tasks from localStorage on mount
  const storedTasks = useLocalStorage<Task[]>('focusflow-tasks', [])

  // Todo state management
  const { tasks, addTask, toggleTask, deleteTask } = useTodos(storedTasks[0])

  // Auto-save tasks to localStorage when they change
  const [, setStoredTasks] = useLocalStorage<Task[]>('focusflow-tasks', tasks)

  // Save tasks whenever they change using enhanced storage
  useEffect(() => {
    if (JSON.stringify(tasks) !== JSON.stringify(storedTasks[0])) {
      const result = saveTasks(tasks)
      if (!result.success && result.error) {
        setStorageError({ type: result.error, message: ERROR_MESSAGES[result.error] })
      }
      setStoredTasks(tasks)
    }
  }, [tasks, storedTasks, setStoredTasks])

  const handleAddTask = (text: string, priority?: Task['priority']) => {
    addTask(text, priority)
  }

  const handleDismissError = () => {
    setStorageError(null)
  }

  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <div className="space-y-6">
        {/* Header with theme toggle */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">FocusFlow Todo</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Task input */}
        <TodoInput onAddTask={handleAddTask} />

        {/* Task list */}
        <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />

        {/* Footer with stats */}
        {tasks.length > 0 && (
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            {tasks.filter((t) => !t.isCompleted).length} active, {tasks.filter((t) => t.isCompleted).length} completed
          </div>
        )}
      </div>

      {/* Error toast */}
      {storageError && (
        <ErrorToast message={storageError.message} onDismiss={handleDismissError} />
      )}
    </>
  )
}
