'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { TypeChip } from '@/components/ui/TypeChip'
import type { Animon } from '@/data/animon'

interface SearchBoxProps {
  animon: Animon[]
  className?: string
}

export default function SearchBox({ animon, className }: SearchBoxProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return []
    const q = query.toLowerCase()
    return animon
      .filter(a => a.dataStatus !== 'placeholder')
      .filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.types.some(t => t.toLowerCase().includes(q)) ||
        a.attribute.toLowerCase().includes(q)
      )
      .slice(0, 6)
  }, [query, animon])

  const showDropdown = focused && query.length >= 2

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/animon/?q=${encodeURIComponent(query.trim())}`)
      setFocused(false)
    }
  }, [query, router])

  const handleClear = useCallback(() => {
    setQuery('')
    inputRef.current?.focus()
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative w-full max-w-md mx-auto', className)}
      action="/animon/"
      method="GET"
      role="search"
    >
      <div className={cn(
        'relative flex items-center bg-gray-50 border rounded-full transition-all',
        focused
          ? 'bg-white border-amber-300 ring-2 ring-amber-100 shadow-sm'
          : 'border-gray-200 hover:border-gray-300',
        showDropdown && 'rounded-b-none rounded-t-2xl border-b-0'
      )}>
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          name="q"
          placeholder="Search Animon by name, type, or attribute..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          autoComplete="off"
          className="w-full pl-10 pr-20 py-2.5 text-sm bg-transparent border-none outline-none placeholder:text-gray-400"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium bg-amber-500 text-white rounded-full hover:bg-amber-600 active:scale-95 transition-all"
        >
          Search
        </button>
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-gray-200 rounded-b-2xl shadow-lg z-50 overflow-hidden">
          {results.length > 0 ? (
            <div className="py-1">
              {results.map((a) => (
                <Link
                  key={a.id}
                  href={`/animon/${a.slug}/`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900">{a.name}</div>
                    <div className="flex gap-1 mt-0.5">
                      {a.types.map((type) => (
                        <TypeChip key={type} type={type} size="sm" />
                      ))}
                    </div>
                  </div>
                  {a.isStarter && (
                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">STARTER</span>
                  )}
                </Link>
              ))}
              {/* View all results link */}
              <Link
                href={`/animon/?q=${encodeURIComponent(query.trim())}`}
                className="block px-4 py-2.5 text-xs text-amber-600 font-medium border-t border-gray-100 hover:bg-amber-50"
              >
                View all results for &quot;{query}&quot; →
              </Link>
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-400">
              No Animon found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </form>
  )
}
