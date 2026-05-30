'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import AnimonCard from '@/components/animon/AnimonCard'
import { TypeChip } from '@/components/ui/TypeChip'
import { DataStatusBadge } from '@/components/ui/DataStatusBadge'
import { getAllAnimon, getAllTypes, getAllAttributes } from '@/data'
import { capitalize } from '@/lib/utils'

type FilterType = 'all' | 'starter' | 'verified'

export default function AnimonDatabaseClient() {
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') || ''

  const allAnimon = getAllAnimon()
  const allTypes = getAllTypes()
  const allAttributes = getAllAttributes()

  const [query, setQuery] = useState(urlQuery)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedAttribute, setSelectedAttribute] = useState<string>('all')
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = useMemo(() => {
    return allAnimon.filter((a) => {
      // Exclude placeholders
      if (a.dataStatus === 'placeholder') return false

      // Filter tabs
      if (filter === 'starter' && !a.isStarter) return false
      if (filter === 'verified' && a.dataStatus === 'community') return false

      // Type filter
      if (selectedType !== 'all' && !a.types.includes(selectedType)) return false

      // Attribute filter
      if (selectedAttribute !== 'all' && a.attribute !== selectedAttribute) return false

      // Text search
      if (query.trim()) {
        const q = query.toLowerCase()
        const matchesName = a.name.toLowerCase().includes(q)
        const matchesType = a.types.some((t) => t.toLowerCase().includes(q))
        const matchesAttr = a.attribute.toLowerCase().includes(q)
        if (!matchesName && !matchesType && !matchesAttr) return false
      }

      return true
    })
  }, [allAnimon, query, selectedType, selectedAttribute, filter])

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          LumenTale Animon Database
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          Browse all {allAnimon.length} documented Animon. Search by name, type, or attribute.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Animon by name, type, or attribute..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:border-amber-300 focus:ring-2 focus:ring-amber-50 outline-none transition-all"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'all' as FilterType, label: 'All' },
          { key: 'starter' as FilterType, label: 'Starters' },
          { key: 'verified' as FilterType, label: 'Verified' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              filter === tab.key
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Type + Attribute Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Type dropdown */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="text-xs px-3 py-1.5 border border-gray-200 rounded-full bg-white text-gray-700 focus:border-amber-300 outline-none"
        >
          <option value="all">All Types</option>
          {allTypes.map((t) => (
            <option key={t.slug} value={t.slug}>{t.name}</option>
          ))}
        </select>

        {/* Attribute dropdown */}
        <select
          value={selectedAttribute}
          onChange={(e) => setSelectedAttribute(e.target.value)}
          className="text-xs px-3 py-1.5 border border-gray-200 rounded-full bg-white text-gray-700 focus:border-amber-300 outline-none"
        >
          <option value="all">All Attributes</option>
          {allAttributes.map((a) => (
            <option key={a.slug} value={a.slug}>{a.name}</option>
          ))}
        </select>

        <span className="text-xs text-gray-400 self-center">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-12">
          {filtered.map((a) => (
            <AnimonCard key={a.id} animon={a} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-sm">
            No Animon found
            {query && (
              <>
                {' '}for &quot;<span className="text-gray-600 font-medium">{query}</span>&quot;
              </>
            )}
          </p>
          <button
            onClick={() => { setQuery(''); setSelectedType('all'); setSelectedAttribute('all'); setFilter('all'); }}
            className="mt-3 text-xs text-amber-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
