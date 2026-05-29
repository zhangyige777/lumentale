export const siteConfig = {
  siteName: 'LumenTale Database',
  siteTagline: 'Unofficial LumenTale: Memories of Trey Wiki & Tools',
  baseUrl: 'https://lumentale.online',
  gameName: 'LumenTale: Memories of Trey',
  developer: 'Beehive Studios',
  publisher: 'Team17',
  releaseDate: '2026-05-26',
  platforms: ['PC (Steam)', 'Nintendo Switch'],
  version: 'Launch',
  lastUpdated: '2026-05-29',
  themeColor: '#ea580c',
  speciesCount: 'Around 140 known species',
  typeCount: 13,
  attributeCount: 5,
  socials: {
    steam: 'https://store.steampowered.com/app/2261430/LumenTale_Memories_of_Trey/',
    official: 'https://www.beehivegamestudios.com/lumentale/',
    reddit: 'https://www.reddit.com/r/LumenTale/',
    youtube: 'https://www.youtube.com/@lumentale',
    fandom: 'https://lumentale.fandom.com/wiki/LumenTale:_Memories_of_Trey',
    game8: 'https://game8.co/games/LumenTale-Memories-of-Trey',
  },
  seo: {
    titleTemplate: '%s | LumenTale Database & Tools',
    defaultDescription:
      'Complete unofficial LumenTale database with type chart, Animon list, evolution guide, starter comparison, and team-building tools.',
    primaryKeywords: [
      'LumenTale',
      'LumenTale database',
      'LumenTale type chart',
      'LumenTale animon',
      'LumenTale weakness',
    ],
    secondaryKeywords: [
      'LumenTale evolution',
      'LumenTale starter',
      'LumenTale team builder',
      'Memories of Trey',
      'LumenTale guide',
    ],
  },
  nav: [
    { label: 'Type Chart', href: '/type-chart/' },
    { label: 'Weakness Calc', href: '/weakness-calculator/' },
    { label: 'Animon', href: '/animon/' },
    { label: 'Evolution', href: '/evolution-guide/' },
    { label: 'Best Starter', href: '/best-starter/' },
    { label: 'Team Builder', href: '/team-builder/' },
    { label: 'Guides', href: '/walkthrough/' },
    { label: 'Locations', href: '/locations/' },
  ],
} as const

export const SOURCES = {
  officialSite: {
    label: 'Official LumenTale site',
    url: 'https://www.beehivegamestudios.com/lumentale/',
    note: 'Release date, developer, publisher, platforms, world, type names, attribute names.',
  },
  steamStore: {
    label: 'Steam store page',
    url: 'https://store.steampowered.com/app/2261430/LumenTale_Memories_of_Trey/',
    note: 'Game description, ~2427 concurrent players, 73% positive reviews, 169 Animon forms, 13 elemental types.',
  },
  steamNews: {
    label: 'Steam news',
    url: 'https://steamcommunity.com/app/2261430/allnews/',
    note: 'Starter evolutions, attributes, card collecting, boss battles, points of interest, Lost Variant notes.',
  },
  gamesWiki: {
    label: 'The Games Wiki - Getting Started',
    url: 'https://thegameswiki.com/lumentale/wiki/getting-started',
    note: 'Community starter table and early-game terms. Verify before treating as confirmed.',
  },
  walkthroughForge: {
    label: 'Walkthrough Forge - Type Chart',
    url: 'https://walkthroughforge.com/lumentale-memories-of-trey/type-chart-and-weaknesses/',
    note: 'Third-party type chart reference. Do not copy directly; use only as a verification lead.',
  },
} as const
