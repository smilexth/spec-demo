import type { Task, TaskPriority } from '@/lib/types'
import TodoItem from './TodoItem'

interface TodoListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdatePriority: (id: string, priority: TaskPriority) => void
}

export default function TodoList({ tasks, onToggle, onDelete, onUpdatePriority }: TodoListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">No tasks yet. Add one above to get started!</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <TodoItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdatePriority={onUpdatePriority}
          />
        </li>
      ))}
    </ul>
  )
}
