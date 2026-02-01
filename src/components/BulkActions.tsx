import { Trash2 } from 'lucide-react'

interface BulkActionsProps {
  activeCount: number
  completedCount: number
  allCompleted: boolean
  onToggleAll: () => void
  onClearCompleted: () => void
}

export default function BulkActions({
  activeCount,
  completedCount,
  allCompleted,
  onToggleAll,
  onClearCompleted,
}: BulkActionsProps) {
  const totalTasks = activeCount + completedCount

  if (totalTasks === 0) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={allCompleted}
          onChange={onToggleAll}
          className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          aria-label={allCompleted ? 'Mark all as incomplete' : 'Mark all as complete'}
        />
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {allCompleted ? 'Uncheck All' : 'Check All'}
        </span>
      </label>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`Clear ${completedCount} completed task${completedCount > 1 ? 's' : ''}`}
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Clear Completed</span>
          <span className="sm:hidden">Clear ({completedCount})</span>
        </button>
      )}
    </div>
  )
}
