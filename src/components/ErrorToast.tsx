import { X } from 'lucide-react'

interface ErrorToastProps {
  message: string
  onDismiss: () => void
}

export default function ErrorToast({ message, onDismiss }: ErrorToastProps) {
  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            Storage Error
          </p>
          <p className="text-sm text-red-600 dark:text-red-300 mt-1">
            {message}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
          aria-label="Dismiss error"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
