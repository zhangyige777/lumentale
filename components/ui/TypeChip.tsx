import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getTypeBySlug } from '@/data/types'

interface TypeChipProps {
  type: string
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
}

export function TypeChip({ type, size = 'md', href, className }: TypeChipProps) {
  const typeInfo = getTypeBySlug(type)
  if (!typeInfo) return null

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }

  const chip = (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded text-white',
        typeInfo.colorClass,
        sizeClasses[size],
        href && 'hover:opacity-80 transition-opacity',
        className
      )}
    >
      {typeInfo.name}
    </span>
  )

  if (href) {
    return <Link href={href}>{chip}</Link>
  }

  return chip
}
