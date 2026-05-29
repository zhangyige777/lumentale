// Data source: lumentale-data-research.md
// Type names: confirmed from official site/Steam
// Effectiveness: ALL unknown until verified in-game

export type DataStatus = 'confirmed' | 'partial' | 'community' | 'placeholder'
export type EffectivenessValue = 2 | 1 | 0.5 | 0 | 'unknown'

export interface SourceRef {
  label: string
  url: string
  note: string
}

export interface TypeInfo {
  slug: string
  name: string
  colorClass: string      // Tailwind bg class
  textColorClass: string   // Tailwind text class
  borderColorClass: string // Tailwind border class
  description: string
  dataStatus: DataStatus
  sources: SourceRef[]
  verifiedAt: string
  notes: string
}

export const types: TypeInfo[] = [
  {
    slug: 'fire',
    name: 'Fire',
    colorClass: 'bg-red-500',
    textColorClass: 'text-red-500',
    borderColorClass: 'border-red-500',
    description: 'Fire-type Animon harness flame and heat in battle.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Fire listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'water',
    name: 'Water',
    colorClass: 'bg-blue-500',
    textColorClass: 'text-blue-500',
    borderColorClass: 'border-blue-500',
    description: 'Water-type Animon command currents, tides, and aquatic power.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Water listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'geo',
    name: 'Geo',
    colorClass: 'bg-amber-600',
    textColorClass: 'text-amber-600',
    borderColorClass: 'border-amber-600',
    description: 'Geo-type Animon draw strength from earth and stone.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Geo listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'grass',
    name: 'Grass',
    colorClass: 'bg-green-500',
    textColorClass: 'text-green-500',
    borderColorClass: 'border-green-500',
    description: 'Grass-type Animon wield plant and nature-based powers.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Grass listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'electric',
    name: 'Electric',
    colorClass: 'bg-yellow-500',
    textColorClass: 'text-yellow-500',
    borderColorClass: 'border-yellow-500',
    description: 'Electric-type Animon channel lightning and energy.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Electric listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'ice',
    name: 'Ice',
    colorClass: 'bg-cyan-500',
    textColorClass: 'text-cyan-500',
    borderColorClass: 'border-cyan-500',
    description: 'Ice-type Animon freeze opponents with cold and frost.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Ice listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'aura',
    name: 'Aura',
    colorClass: 'bg-purple-500',
    textColorClass: 'text-purple-500',
    borderColorClass: 'border-purple-500',
    description: 'Aura-type Animon manipulate spiritual energy and presence.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Aura listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'chakra',
    name: 'Chakra',
    colorClass: 'bg-pink-500',
    textColorClass: 'text-pink-500',
    borderColorClass: 'border-pink-500',
    description: 'Chakra-type Animon channel inner energy and balance.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Chakra listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'demon',
    name: 'Demon',
    colorClass: 'bg-red-900',
    textColorClass: 'text-red-900',
    borderColorClass: 'border-red-900',
    description: 'Demon-type Animon wield dark and formidable power.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Demon listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'data',
    name: 'Data',
    colorClass: 'bg-teal-500',
    textColorClass: 'text-teal-500',
    borderColorClass: 'border-teal-500',
    description: 'Data-type Animon embody digital and informational energy.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Data listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'virus',
    name: 'Virus',
    colorClass: 'bg-lime-500',
    textColorClass: 'text-lime-500',
    borderColorClass: 'border-lime-500',
    description: 'Virus-type Animon spread corruption and infect opponents.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Virus listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'ancient',
    name: 'Ancient',
    colorClass: 'bg-yellow-700',
    textColorClass: 'text-yellow-700',
    borderColorClass: 'border-yellow-700',
    description: 'Ancient-type Animon carry the power of forgotten ages.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Ancient listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
  {
    slug: 'anomalous',
    name: 'Anomalous',
    colorClass: 'bg-indigo-500',
    textColorClass: 'text-indigo-500',
    borderColorClass: 'border-indigo-500',
    description: 'Anomalous-type Animon defy normal classification.',
    dataStatus: 'confirmed',
    sources: [
      { label: 'Official site', url: 'https://www.beehivegamestudios.com/lumentale/', note: 'Anomalous listed as one of 13 elemental types.' },
    ],
    verifiedAt: '2026-05-29',
    notes: 'Type name confirmed. Effectiveness relationships unknown.',
  },
]

// All effectiveness values are unknown until verified in-game
const effectivenessMap: Record<string, Record<string, EffectivenessValue>> = {}

export function getEffectiveness(attackerSlug: string, defenderSlug: string): EffectivenessValue {
  return effectivenessMap[attackerSlug]?.[defenderSlug] ?? 'unknown'
}

export function getTypeBySlug(slug: string): TypeInfo | undefined {
  return types.find((t) => t.slug === slug)
}

export function getAllTypes(): TypeInfo[] {
  return types
}

export function getTypeColorClass(slug: string): string {
  return getTypeBySlug(slug)?.colorClass ?? 'bg-gray-400'
}

export function getTypeTextColorClass(slug: string): string {
  return getTypeBySlug(slug)?.textColorClass ?? 'text-gray-400'
}
