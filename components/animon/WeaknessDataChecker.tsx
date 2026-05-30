'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Animon } from '@/data/animon'
import type { TypeInfo } from '@/data/types'
import { TypeChip } from '@/components/ui/TypeChip'
import { capitalize } from '@/lib/utils'

interface WeaknessDataCheckerProps {
  types: TypeInfo[]
  animon: Animon[]
}

export default function WeaknessDataChecker({ types, animon }: WeaknessDataCheckerProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const typedAnimon = useMemo(
    () => animon.filter((entry) => entry.dataStatus !== 'placeholder' && entry.types.length > 0),
    [animon]
  )

  const matchingAnimon = useMemo(() => {
    if (selectedTypes.length === 0) return []
    return typedAnimon.filter((entry) => selectedTypes.every((type) => entry.types.includes(type)))
  }, [selectedTypes, typedAnimon])

  const attributeCounts = matchingAnimon.reduce<Record<string, number>>((counts, entry) => {
    counts[entry.attribute] = (counts[entry.attribute] ?? 0) + 1
    return counts
  }, {})

  function toggleType(slug: string) {
    setSelectedTypes((current) => {
      if (current.includes(slug)) return current.filter((type) => type !== slug)
      if (current.length >= 2) return [current[1], slug]
      return [...current, slug]
    })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Known Type Data Checker</h2>
          <p className="text-sm text-gray-500 mt-1">
            Select one or two types to see documented Animon and available attribute data.
          </p>
        </div>
        {selectedTypes.length > 0 && (
          <button type="button" onClick={() => setSelectedTypes([])} className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {types.map((type) => {
          const isSelected = selectedTypes.includes(type.slug)

          return (
            <button
              key={type.slug}
              type="button"
              onClick={() => toggleType(type.slug)}
              className={`rounded border p-0.5 transition ${isSelected ? 'border-gray-900 shadow-sm' : 'border-transparent hover:border-gray-200'}`}
            >
              <TypeChip type={type.slug} size="md" />
            </button>
          )
        })}
      </div>

      {selectedTypes.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-600">Pick a type above to view the current documented Animon pool.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h3 className="font-semibold text-amber-900 text-sm">Matchup status</h3>
            <p className="text-amber-800 text-sm mt-1">
              Official weakness and resistance multipliers are not published in the current dataset. The results below use real documented Animon types and attributes only.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Matching Animon</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{matchingAnimon.length}</div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Selected Types</div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedTypes.map((type) => <TypeChip key={type} type={type} size="sm" />)}
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Attribute Spread</div>
              <div className="text-sm text-gray-700 mt-2">
                {Object.keys(attributeCounts).length > 0
                  ? Object.entries(attributeCounts).map(([attribute, count]) => `${capitalize(attribute)} ${count}`).join(', ')
                  : 'No documented matches yet'}
              </div>
            </div>
          </div>

          {matchingAnimon.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {matchingAnimon.map((entry) => (
                <Link key={entry.slug} href={`/animon/${entry.slug}/`} className="rounded-lg border border-gray-200 p-3 hover:border-amber-200 hover:bg-amber-50/50 transition-colors">
                  <div className="font-semibold text-sm text-gray-900">{entry.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{capitalize(entry.attribute)}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {entry.types.map((type) => <TypeChip key={type} type={type} size="sm" />)}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm text-gray-600">No documented Animon currently match this exact type combination.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
