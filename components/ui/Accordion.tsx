'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, i) => (
        <AccordionRow key={i} item={item} />
      ))}
    </div>
  )
}

function AccordionRow({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <svg
          className={cn('w-4 h-4 text-gray-500 transition-transform', open && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  )
}
