// Patch notes data for LumenTale
// Updated by scripts/update-patch-notes.mjs
// Source: Steam news + SteamDB

export interface PatchNote {
  id: string
  title: string
  date: string
  source: string
  sourceUrl: string
  fixes: string[]
  additions: string[]
  changes: string[]
  dataStatus: 'confirmed' | 'partial'
}

export const patchNotes: PatchNote[] = [
  {
    id: 'hotfix-1',
    title: 'Hotfix 1',
    date: '2026-05-27',
    source: 'SteamDB + Steam Community',
    sourceUrl: 'https://steamdb.info/patchnotes/23432645/',
    fixes: ['Area 01 Lumen interaction issue', 'Infinite loading after re-entering Area 01', 'Map interactables blocked by quest area indicators', 'Regional variants incorrectly shown in Local Animon map sections', 'Piercing Squall behavior', 'Quick Anispace Stat menu softlock'],
    additions: [],
    changes: [],
    dataStatus: 'confirmed',
  }
]

export function getLatestPatch(): PatchNote | undefined {
  return patchNotes[0]
}

export function getAllPatches(): PatchNote[] {
  return patchNotes
}

export function getPatchCount(): number {
  return patchNotes.length
}
