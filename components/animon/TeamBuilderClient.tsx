'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Animon } from '@/data/animon'
import type { Attribute } from '@/data/attributes'
import { TypeChip } from '@/components/ui/TypeChip'
import { capitalize } from '@/lib/utils'

interface TeamBuilderClientProps {
  animon: Animon[]
  attributes: Attribute[]
}

const MAX_TEAM_SIZE = 4

export default function TeamBuilderClient({ animon, attributes }: TeamBuilderClientProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const selectableAnimon = useMemo(
    () => animon.filter((entry) => entry.dataStatus !== 'placeholder' && entry.types.length > 0),
    [animon]
  )

  const selectedAnimon = useMemo(
    () => selectedSlugs
      .map((slug) => selectableAnimon.find((entry) => entry.slug === slug))
      .filter((entry): entry is Animon => Boolean(entry)),
    [selectableAnimon, selectedSlugs]
  )

  const filteredAnimon = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return selectableAnimon

    return selectableAnimon.filter((entry) => (
      entry.name.toLowerCase().includes(normalizedQuery) ||
      entry.types.some((type) => type.includes(normalizedQuery)) ||
      entry.attribute.includes(normalizedQuery)
    ))
  }, [query, selectableAnimon])

  const typeCounts = selectedAnimon.reduce<Record<string, number>>((counts, entry) => {
    entry.types.forEach((type) => {
      counts[type] = (counts[type] ?? 0) + 1
    })
    return counts
  }, {})

  const attributeCounts = selectedAnimon.reduce<Record<string, number>>((counts, entry) => {
    counts[entry.attribute] = (counts[entry.attribute] ?? 0) + 1
    return counts
  }, {})

  const suggestions = getSuggestions(selectedAnimon, typeCounts, attributeCounts)

  function addAnimon(slug: string) {
    if (selectedSlugs.includes(slug) || selectedSlugs.length >= MAX_TEAM_SIZE) return
    setSelectedSlugs((current) => [...current, slug])
  }

  function removeAnimon(slug: string) {
    setSelectedSlugs((current) => current.filter((selectedSlug) => selectedSlug !== slug))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Team</h2>
            <p className="text-sm text-gray-500">4v4 battle team planning using documented Animon data.</p>
          </div>
          {selectedSlugs.length > 0 && (
            <button type="button" onClick={() => setSelectedSlugs([])} className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: MAX_TEAM_SIZE }).map((_, index) => {
            const entry = selectedAnimon[index]

            if (!entry) {
              return (
                <div key={`slot-${index}`} className="border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[132px] flex flex-col items-center justify-center text-center">
                  <div className="text-2xl text-gray-300">+</div>
                  <div className="text-sm font-medium text-gray-400">Slot {index + 1}</div>
                  <div className="text-xs text-gray-300 mt-1">Pick an Animon below</div>
                </div>
              )
            }

            return (
              <div key={entry.slug} className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 min-h-[132px]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/animon/${entry.slug}/`} className="font-semibold text-gray-900 hover:text-amber-700">
                      {entry.name}
                    </Link>
                    <div className="text-xs text-gray-500 mt-0.5">{capitalize(entry.attribute)}</div>
                  </div>
                  <button type="button" onClick={() => removeAnimon(entry.slug)} className="text-xs font-semibold text-gray-400 hover:text-red-500" aria-label={`Remove ${entry.name}`}>
                    Remove
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {entry.types.map((type) => (
                    <TypeChip key={type} type={type} size="sm" />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Known Coverage</h2>
          {selectedAnimon.length === 0 ? (
            <p className="text-sm text-gray-500">Add Animon to see type coverage and attribute roles.</p>
          ) : (
            <div className="space-y-5">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Types covered</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(typeCounts).map(([type, count]) => (
                    <div key={type} className="inline-flex items-center gap-1.5">
                      <TypeChip type={type} size="sm" />
                      {count > 1 && <span className="text-xs text-gray-400">x{count}</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Attribute roles</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {attributes.map((attribute) => (
                    <div key={attribute.slug} className={`rounded-lg border p-3 ${attributeCounts[attribute.slug] ? 'border-amber-200 bg-amber-50/50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-900">{attribute.name}</span>
                        <span className="text-xs text-gray-500">{attributeCounts[attribute.slug] ?? 0}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{attribute.generalRole}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <div className="text-sm font-semibold text-blue-900">Verified-data note</div>
                <p className="text-sm text-blue-800 mt-1">
                  This tool analyzes confirmed type names, documented Animon types, and official attribute roles. Full weakness multipliers will be added after matchup data is verified.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Suggestions</h2>
          <ul className="space-y-2">
            {suggestions.map((suggestion) => (
              <li key={suggestion} className="text-sm text-gray-600 flex gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Add Animon</h2>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, type, or attribute"
            className="w-full sm:w-80 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {filteredAnimon.map((entry) => {
            const isSelected = selectedSlugs.includes(entry.slug)
            const isDisabled = !isSelected && selectedSlugs.length >= MAX_TEAM_SIZE

            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => addAnimon(entry.slug)}
                disabled={isSelected || isDisabled}
                className="p-3 border border-gray-200 rounded-lg text-left hover:border-amber-200 hover:bg-amber-50/50 transition-colors disabled:opacity-50 disabled:hover:bg-white disabled:hover:border-gray-200"
              >
                <div className="font-medium text-sm text-gray-900">{entry.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{capitalize(entry.attribute)}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {entry.types.map((type) => (
                    <TypeChip key={type} type={type} size="sm" />
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function getSuggestions(selectedAnimon: Animon[], typeCounts: Record<string, number>, attributeCounts: Record<string, number>): string[] {
  if (selectedAnimon.length === 0) {
    return ['Start with one favorite starter, then add different types around it.']
  }

  const suggestions: string[] = []
  const coveredTypes = Object.keys(typeCounts).length
  const duplicatedTypes = Object.entries(typeCounts).filter(([, count]) => count > 1)

  if (selectedAnimon.length < MAX_TEAM_SIZE) {
    suggestions.push(`Add ${MAX_TEAM_SIZE - selectedAnimon.length} more Animon to complete a 4v4 team.`)
  }

  if (coveredTypes < Math.min(selectedAnimon.length, 4)) {
    suggestions.push('Add more type variety so the team is less dependent on one matchup.')
  }

  if (duplicatedTypes.length > 0) {
    suggestions.push(`You have duplicate ${duplicatedTypes.map(([type]) => capitalize(type)).join(', ')} coverage. That can be fine, but watch for shared matchup risk.`)
  }

  if (!attributeCounts.felicis) {
    suggestions.push('Consider a Felicis Animon for healing and longer fights.')
  }

  if (!attributeCounts.sereum) {
    suggestions.push('Consider a Sereum Animon if you want critical-hit pressure and TP gain.')
  }

  if (!attributeCounts.furor && !attributeCounts.mestus) {
    suggestions.push('Add Furor or Mestus if the team needs more direct damage.')
  }

  if (suggestions.length === 0) {
    suggestions.push('This team has solid type variety and a useful spread of attribute roles.')
  }

  return suggestions
}
