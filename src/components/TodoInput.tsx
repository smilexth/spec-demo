import { useState, useCallback, KeyboardEvent } from 'react'
import type { TaskPriority } from '@/lib/types'
import { Check } from 'lucide-react'

interface TodoInputProps {
  onAddTask: (text: string, priority?: TaskPriority) => void
}

const PRIORITIES: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export default function TodoInput({ onAddTask }: TodoInputProps) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const trimmedText = text.trim()
      if (trimmedText) {
        onAddTask(trimmedText, priority)
        setText('')
        setPriority('medium')
      }
    },
    [text, onAddTask, priority]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setText('')
        setPriority('medium')
        e.preventDefault()
      }
    },
    []
  )

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
        >
          <Check size={18} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </form>
  )
}
