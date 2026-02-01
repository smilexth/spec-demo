import type { TaskFilter } from '@/lib/types'

interface FilterTabsProps {
  currentFilter: TaskFilter
  onFilterChange: (filter: TaskFilter) => void
}

const FILTERS: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

export default function FilterTabs({ currentFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex gap-2" role="tablist">
      {FILTERS.map((filter) => {
        const isActive = currentFilter === filter.value
        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            role="tab"
            aria-selected={isActive}
            aria-label={`Show ${filter.label.toLowerCase()} tasks`}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
