// useFilter hook - manages filter state
import { useState, useCallback } from 'react'
import type { TaskFilter } from '@/lib/types'

export function useFilter(initialFilter: TaskFilter = 'all') {
  const [filter, setFilter] = useState<TaskFilter>(initialFilter)

  const setFilterCallback = useCallback((newFilter: TaskFilter) => {
    setFilter(newFilter)
  }, [])

  return {
    filter,
    setFilter: setFilterCallback,
  }
}
