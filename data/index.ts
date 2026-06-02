// Data layer index — central re-export + aggregate stats

export { types, getAllTypes, getTypeBySlug, getEffectiveness, getTypeColorClass, getTypeTextColorClass } from './types'
export type { TypeInfo, DataStatus, EffectivenessValue, SourceRef } from './types'

export { animon, getAllAnimon, getAnimonBySlug, getVerifiedAnimon, getIndexedAnimon, getStarters, getAnimonByType, getAnimonByAttribute, getEvolutionChain } from './animon'
export type { Animon, AnimonStats } from './animon'

export { attributes, getAllAttributes, getAttributeBySlug } from './attributes'
export type { Attribute } from './attributes'

export { guides, getAllGuides, getGuideBySlug } from './guides'
export type { Guide, GuideSection, GuideFAQ } from './guides'

export { sourceWatch, getLastSourceCheckDate } from './source-watch'
export { officialSourceMatches, contentUnlocks, getVerifiedGameDataDate } from './verified-game-data'
export { patchNotes, getLatestPatch, getAllPatches, getPatchCount } from './patch-notes'

import { getAllAnimon, getIndexedAnimon } from './animon'
import { getAllTypes } from './types'
import { getAllAttributes } from './attributes'

export function getSiteStats() {
  const all = getAllAnimon()
  return {
    totalAnimon: all.length,
    indexedAnimon: getIndexedAnimon().length,
    totalTypes: getAllTypes().length,
    totalAttributes: getAllAttributes().length,
    speciesClaim: 'Around 140 known species',
  }
}
