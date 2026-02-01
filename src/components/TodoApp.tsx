import { useState, useEffect } from 'react'
import { useTodos } from './hooks/useTodos'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTheme } from './App'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import FilterTabs from './FilterTabs'
import ErrorToast from './ErrorToast'
import { saveTasks, getFilter, saveFilter } from '@/lib/storage'
import type { Task, TaskFilter } from '@/lib/types'

type StorageError = { type: 'quota_exceeded' | 'disabled'; message: string } | null

const ERROR_MESSAGES = {
  quota_exceeded: 'Storage is full. Some old tasks may not be saved. Try clearing completed tasks.',
  disabled: 'Storage is disabled in your browser. Tasks will only be saved in memory.',
}

export default function TodoApp() {
  const [storageError, setStorageError] = useState<StorageError>(null)

  // Load tasks from localStorage on mount
  const storedTasks = useLocalStorage<Task[]>('focusflow-tasks', [])

  // Load filter from localStorage on mount
  const initialFilter = getFilter()
  const storedFilter = useLocalStorage<TaskFilter>('focusflow-filter', initialFilter)

  // Todo state management
  const { filteredTasks, filter, setFilter, addTask, toggleTask, deleteTask, updatePriority, activeCount, completedCount } = useTodos(
    storedTasks[0],
    storedFilter[0]
  )

  // Auto-save tasks to localStorage when they change
  const [, setStoredTasks] = useLocalStorage<Task[]>('focusflow-tasks', filteredTasks)
  const [, setStoredFilter] = useLocalStorage<TaskFilter>('focusflow-filter', filter)

  // Save tasks whenever they change using enhanced storage
  useEffect(() => {
    const allTasks = storedTasks[0]
    if (JSON.stringify(allTasks) !== JSON.stringify(filteredTasks)) {
      const result = saveTasks(allTasks)
      if (!result.success && result.error) {
        setStorageError({ type: result.error, message: ERROR_MESSAGES[result.error] })
      }
      setStoredTasks(allTasks)
    }
  }, [filteredTasks, storedTasks, setStoredTasks])

  // Save filter whenever it changes
  useEffect(() => {
    saveFilter(filter)
    setStoredFilter(filter)
  }, [filter, setStoredFilter])

  const handleAddTask = (text: string, priority?: Task['priority']) => {
    addTask(text, priority)
  }

  const handleFilterChange = (newFilter: TaskFilter) => {
    setFilter(newFilter)
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

        {/* Filter tabs */}
        <FilterTabs currentFilter={filter} onFilterChange={handleFilterChange} />

        {/* Task input */}
        <TodoInput onAddTask={handleAddTask} />

        {/* Task list */}
        <TodoList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdatePriority={updatePriority}
        />

        {/* Footer with stats */}
        {activeCount + completedCount > 0 && (
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            {activeCount} active, {completedCount} completed
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
