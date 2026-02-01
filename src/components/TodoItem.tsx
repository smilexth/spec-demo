import { Trash2 } from 'lucide-react'
import type { Task } from '../lib/types'

interface TodoItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ task, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }

  return (
    <div className="group flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 w-6 h-6 rounded border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center transition-colors hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={task.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.isCompleted && (
          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className={`task-text text-sm sm:text-base ${task.isCompleted ? 'completed' : ''}`}>
          {task.text}
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 p-1 text-slate-400 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded opacity-0 group-hover:opacity-100"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}
