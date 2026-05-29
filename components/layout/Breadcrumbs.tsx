import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center mb-4', className)}>
      <ol className="flex items-center gap-1 text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-amber-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast ? 'text-gray-900 font-medium' : 'text-gray-500')}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
