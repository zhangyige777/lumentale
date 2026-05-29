// Data source: lumentale-data-research.md
// Attributes from official Steam news (partial)

import type { DataStatus, SourceRef } from './types'

export interface Attribute {
  slug: string
  name: string
  generalRole: string
  effectSummary: string
  dataStatus: DataStatus
  sources: SourceRef[]
  verifiedAt: string
  notes: string
}

const steamNewsSource: SourceRef = {
  label: 'Steam news',
  url: 'https://steamcommunity.com/app/2261430/allnews/',
  note: 'Richest attribute descriptions. Activation costs extra SP — verify exact rules in-game.',
}

export const attributes: Attribute[] = [
  {
    slug: 'felicis',
    name: 'Felicis',
    generalRole: 'Healing / team sustain',
    effectSummary: 'When activated, Felicis can restore a small amount of health to allies after an attack.',
    dataStatus: 'partial',
    sources: [steamNewsSource],
    verifiedAt: '2026-05-29',
    notes: 'Official Steam news provides the richest attribute descriptions. Exact SP cost and activation conditions unverified.',
  },
  {
    slug: 'mestus',
    name: 'Mestus',
    generalRole: 'Reliable bonus damage',
    effectSummary: 'When activated, Mestus can add damage based on the target\'s maximum HP.',
    dataStatus: 'partial',
    sources: [steamNewsSource],
    verifiedAt: '2026-05-29',
    notes: 'Bonus damage scales with target max HP. Exact multiplier unverified.',
  },
  {
    slug: 'furor',
    name: 'Furor',
    generalRole: 'Aggressive damage',
    effectSummary: 'When activated, Furor increases the damage of the move used.',
    dataStatus: 'partial',
    sources: [steamNewsSource],
    verifiedAt: '2026-05-29',
    notes: 'Boosts move damage on activation. Exact damage increase unverified.',
  },
  {
    slug: 'horrens',
    name: 'Horrens',
    generalRole: 'Resistance bypass / finisher',
    effectSummary: 'When activated, Horrens can bypass resistance in a finishing context.',
    dataStatus: 'partial',
    sources: [steamNewsSource],
    verifiedAt: '2026-05-29',
    notes: 'Useful for finishing off resistant opponents. Exact bypass mechanic unverified.',
  },
  {
    slug: 'sereum',
    name: 'Sereum',
    generalRole: 'Critical hits / TP gain',
    effectSummary: 'When activated, Sereum strongly increases critical chance, and critical hits can grant extra TP.',
    dataStatus: 'partial',
    sources: [steamNewsSource],
    verifiedAt: '2026-05-29',
    notes: 'Critical chance boost + TP gain on crits. Exact critical rate increase unverified.',
  },
]

export function getAttributeBySlug(slug: string): Attribute | undefined {
  return attributes.find((a) => a.slug === slug)
}

export function getAllAttributes(): Attribute[] {
  return attributes
}
