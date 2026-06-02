// Extracts patch notes from Steam news API
// Run: node scripts/update-patch-notes.mjs
// Steam API docs: https://partner.steamgames.com/doc/webapi/ISteamNews

import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const patchNotesFile = path.join(root, 'data', 'patch-notes.ts')
const STEAM_APP_ID = '2261430'
const STEAM_NEWS_API = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${STEAM_APP_ID}&count=20&feeds=steam_community_announcements`

// Known patch note title patterns
const PATCH_PATTERNS = [
  /hotfix/i,
  /patch\s*notes/i,
  /update/i,
  /release\s*notes/i,
  /version/i,
  /fix/i,
  /changes?\s/i,
]

function isPatchNote(title) {
  return PATCH_PATTERNS.some((pattern) => pattern.test(title))
}

function extractDate(timestamp) {
  return new Date(timestamp * 1000).toISOString().slice(0, 10)
}

function extractFixes(content) {
  const fixes = []
  const lines = content.split(/\n|<br\/?>|\r/)
  for (const line of lines) {
    const cleaned = line
      .replace(/<[^>]+>/g, '')
      .replace(/\[\/?\w+\]/g, '')
      .trim()
    if (!cleaned || cleaned.length < 10) continue
    // Match lines that look like fix/change descriptions
    if (
      /^[-•*]\s/.test(cleaned) ||
      /^\d+\.\s/.test(cleaned) ||
      /^fixed?\s/i.test(cleaned) ||
      /^added?\s/i.test(cleaned) ||
      /^changed?\s/i.test(cleaned) ||
      /^updated?\s/i.test(cleaned) ||
      /^resolved?\s/i.test(cleaned) ||
      /^improved?\s/i.test(cleaned) ||
      /^addressed?\s/i.test(cleaned)
    ) {
      fixes.push(cleaned)
    }
  }
  return fixes
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

async function fetchSteamNews() {
  try {
    const response = await fetch(STEAM_NEWS_API, {
      headers: { 'user-agent': 'lumentale-patch-watch/1.0' },
      signal: AbortSignal.timeout(25000),
    })
    if (!response.ok) {
      console.warn(`Steam News API returned ${response.status}`)
      return []
    }
    const data = await response.json()
    return data.appnews?.newsitems ?? []
  } catch (error) {
    console.warn(`Failed to fetch Steam news: ${error.message}`)
    return []
  }
}

function toTs(patches) {
  const patchesStr = patches.map((p) => `  {
    id: '${p.id}',
    title: '${p.title.replace(/'/g, "\\'")}',
    date: '${p.date}',
    source: '${p.source}',
    sourceUrl: '${p.sourceUrl}',
    fixes: [${p.fixes.map((f) => `'${f.replace(/'/g, "\\'")}'`).join(', ')}],
    additions: [${p.additions.map((a) => `'${a.replace(/'/g, "\\'")}'`).join(', ')}],
    changes: [${p.changes.map((c) => `'${c.replace(/'/g, "\\'")}'`).join(', ')}],
    dataStatus: '${p.dataStatus}',
  }`).join(',\n')

  return `// Patch notes data for LumenTale
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
${patchesStr}
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
`
}

async function updatePatchNotes() {
  // Read existing patches
  let existingPatches = []
  try {
    const content = await fs.readFile(patchNotesFile, 'utf8')
    const matches = [...content.matchAll(/id: '([^']+)'/g)]
    existingPatches = matches.map((m) => m[1])
  } catch {
    // File doesn't exist yet
  }

  // Fetch Steam news
  const newsItems = await fetchSteamNews()
  if (newsItems.length === 0) {
    console.log('No Steam news items found. Skipping patch notes update.')
    return { newPatches: 0 }
  }

  // Filter for patch notes
  const patchNews = newsItems.filter(
    (item) => isPatchNote(item.title) && item.contents,
  )

  // Build new patches list (preserving existing manual entries, adding new ones from Steam)
  const knownIds = new Set(existingPatches)
  const newPatches = []

  for (const item of patchNews) {
    const id = slugify(item.title)
    if (knownIds.has(id)) continue

    const fixes = extractFixes(item.contents)
    newPatches.push({
      id,
      title: item.title.replace(/<[^>]+>/g, '').trim(),
      date: extractDate(item.date),
      source: 'Steam Community',
      sourceUrl: item.url,
      fixes,
      additions: [],
      changes: [],
      dataStatus: 'confirmed',
    })
  }

  // Also keep the hardcoded SteamDB entries
  const hardcodedPatches = [
    {
      id: 'hotfix-1',
      title: 'Hotfix 1',
      date: '2026-05-27',
      source: 'SteamDB + Steam Community',
      sourceUrl: 'https://steamdb.info/patchnotes/23432645/',
      fixes: [
        'Area 01 Lumen interaction issue',
        'Infinite loading after re-entering Area 01',
        'Map interactables blocked by quest area indicators',
        'Regional variants incorrectly shown in Local Animon map sections',
        'Piercing Squall behavior',
        'Quick Anispace Stat menu softlock',
      ],
      additions: [],
      changes: [],
      dataStatus: 'confirmed',
    },
  ]

  // Merge: hardcoded first, then new Steam patches by date (newest first)
  const allPatches = [...hardcodedPatches, ...newPatches]

  // Deduplicate by ID first
  const seenIds = new Set()
  const byId = allPatches.filter((p) => {
    if (seenIds.has(p.id)) return false
    seenIds.add(p.id)
    return true
  })

  // Then deduplicate by date — keep the entry with more fixes
  const byDate = new Map()
  for (const p of byId) {
    const existing = byDate.get(p.date)
    if (!existing || p.fixes.length > existing.fixes.length) {
      byDate.set(p.date, p)
    }
  }
  const deduped = [...byDate.values()]
  // Sort by date descending
  deduped.sort((a, b) => b.date.localeCompare(a.date))

  // Only write if there are new patches
  if (newPatches.length === 0) {
    console.log('No new patch notes found.')
    return { newPatches: 0 }
  }

  await fs.writeFile(patchNotesFile, toTs(deduped), 'utf8')
  console.log(`Added ${newPatches.length} new patch note(s):`)
  for (const p of newPatches) {
    console.log(`  - ${p.title} (${p.date})`)
  }

  return { newPatches: newPatches.length }
}

const result = await updatePatchNotes()
console.log(`Patch notes update complete: ${result.newPatches} new entries.`)
