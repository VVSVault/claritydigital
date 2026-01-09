import type { ProjectResult } from '@/types'

interface MetricsDisplayProps {
  metrics: ProjectResult[]
}

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl font-bold text-brand-500 md:text-5xl">
            {metric.value}
          </div>
          <div className="mt-2 font-medium text-neutral-900 dark:text-white">
            {metric.metric}
          </div>
          {metric.description && (
            <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {metric.description}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
