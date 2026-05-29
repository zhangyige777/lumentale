import { cn } from '@/lib/utils'
import type { DataStatus } from '@/data/types'

interface DataStatusBadgeProps {
  status: DataStatus
  className?: string
}

const statusConfig: Record<DataStatus, { label: string; colorClass: string; description: string }> = {
  confirmed: {
    label: 'Verified',
    colorClass: 'bg-green-50 text-green-700 border-green-200',
    description: 'Confirmed by official source or in-game evidence.',
  },
  partial: {
    label: 'Partial Data',
    colorClass: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Supported by official/community sources but not fully verified.',
  },
  community: {
    label: 'Community Data',
    colorClass: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'From community wiki or third-party guide. Verify before relying on it.',
  },
  placeholder: {
    label: 'Placeholder',
    colorClass: 'bg-gray-50 text-gray-600 border-gray-200',
    description: 'Development-only data. Do not index.',
  },
}

export function DataStatusBadge({ status, className }: DataStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border',
        config.colorClass,
        className
      )}
      title={config.description}
    >
      <span
        className={cn('w-1.5 h-1.5 rounded-full', {
          'bg-green-500': status === 'confirmed',
          'bg-amber-500': status === 'partial',
          'bg-blue-500': status === 'community',
          'bg-gray-400': status === 'placeholder',
        })}
      />
      {config.label}
    </span>
  )
}

export function DataStatusBanner({ status }: { status: DataStatus }) {
  if (status === 'confirmed') return null

  const config = statusConfig[status]

  return (
    <div className={cn('rounded-lg border p-3 text-sm', config.colorClass)}>
      <strong>{config.label}:</strong> {config.description}
    </div>
  )
}
