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
    id: 'lumentale-memories-of-trey-update-1-out-now',
    title: 'LumenTale: Memories of Trey | Update 1 Out Now!',
    date: '2026-09-29',
    source: 'Steam Community',
    sourceUrl: 'https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1844751498234180',
    fixes: ['Update 1 also brings various Lost Animon into the game for all the Lost Hunters out there! Here is the list of new additions! Can you find them all?[*]Bonkey[/*][*]Skeletape[/*][*]Ghorious[/*][*]Puffella[/*][*]Lequilar[/*][*]Lobstrike (Mythos)[/*][*]Lobstrike (Logos)[/*][*]Flowende[/*][*]Flobesque[/*][*]Florenco[/*][*]Chagma[/*][*]Gongbog[/*][*]Natmiss[/*][*]Unidra[/*][*]Keratrys[/*][*]Emdraquin[/*]💬 LocalizationAdditional Localization[*]Additional localization has been implemented across the game.[/*][*]Previously untranslated text has been localized, including text associated with certain powerful boss moves.[/*][*]Various Japanese localization fixes and polishing[/*][*]Chinese and Japanese text readability has been improved.[/*][*]Several English terminology and item-name inconsistencies have been corrected.[/*]➕ Additional ImprovementsRanked Play[*]A Ranked Ruleset viewer has been added, allowing players to review the active format before queueing.[/*][*]Ranked entry requirements and restrictions have been finalized. These will be shared through a different communication.[/*][*]Banlist detection has been fixed.[/*][*]Match-result reporting has been improved.[/*]World & EventsVarious issues affecting exploration, events, teleportation, collisions, followers, weather effects, tutorials, and interactions have been fixed. (This includes fixes for areas where players could become stuck, incorrect teleport behaviour, environmental collisions, and event-related issues).UI & MenusSeveral UI and menu issues have been addressed, including:[*]Pause menu and Settings softlocks.[/*][*]Scrolling and interface display issues.[/*][*]Radial menu input behaviour.[/*][*]Quest and quest-tracker display issues.[/*][*]Map and minimap positioning.[/*][*]Shop purchasing and item management.[/*][*]Popup conflicts and item selection.[/*][*]Animon selection and information screens.[/*][*]AniWiki registration and completion tracking.[/*][*]Options and controller navigation.[/*][*]Menu interactions during tutorials.[/*][*]Affection and collection-related display issues.[/*]Online & SaveSeveral online and save-related issues have been fixed, including:[*]Steam connection session issues.[/*][*]Anispace visiting issues and related softlocks.[/*][*]Autosave behaviour after catching an Animon.[/*][*]Training completion and claiming issues.[/*][*]Tracker and save-data consistency.[/*]🛠️ Performance & Stability[*]Fixed the Japanese-language crash affecting Nintendo Switch.[*]While this fix was made to address primarily the crash affecting Japanese-language players, the nature of the issue was such that this fix can improve the gameplay experience of all players in multiple areas of the game.[/*][/*][*]Improved menu memory usage.[/*][*]Improved battle loading times.[/*][*]Reduced input lag on Nintendo Switch.[/*][*]Improved performance when jumping down or using the water bubble.[/*][*]Improved map loading and transitions.[/*][*]Improved Evolution scene performance and stability, fixed the broken animation.[/*][*]Various additional performance, memory, loading, and stability improvements have been implemented across the[/*][*]game.[/*][*]Several crashes and error-related issues have been fixed.[/*]Other Balance ChangesCor Leonis has been added to Primalong\'s moveset.[img src="{STEAM_CLAN_IMAGE}/43460207/8c791dc7667974770905ab68d0402a98650eeb7c.png"]'],
    additions: [],
    changes: [],
    dataStatus: 'confirmed',
  },
  {
    id: 'lumentale-memories-of-trey-hotfix-4',
    title: 'LumenTale: Memories of Trey - Hotfix 4',
    date: '2026-07-07',
    source: 'Steam Community',
    sourceUrl: 'https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1836506165578008',
    fixes: [],
    additions: [],
    changes: [],
    dataStatus: 'confirmed',
  },
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
