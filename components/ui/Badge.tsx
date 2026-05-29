import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info'
  size?: 'sm' | 'md'
}

export function Badge({ className, variant = 'default', size = 'md', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-full',
        {
          'bg-gray-100 text-gray-700': variant === 'default',
          'bg-amber-50 text-amber-600': variant === 'primary',
          'bg-green-50 text-green-700': variant === 'success',
          'bg-amber-50 text-amber-700': variant === 'warning',
          'bg-blue-50 text-blue-700': variant === 'info',
        },
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-sm': size === 'md',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
