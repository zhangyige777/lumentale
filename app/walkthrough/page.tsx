import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { JsonLd } from '@/components/seo/JsonLd'
import RelatedGuides from '@/components/ui/RelatedGuides'
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Walkthrough - Beginner Guide, Map, Starters & Progression',
  description: 'LumenTale walkthrough hub with beginner tips, starter choices, evolution help, map and locations, combat systems, and progression links.',
  keywords: ['LumenTale walkthrough', 'LumenTale guide', 'LumenTale beginner guide', 'LumenTale progression', 'LumenTale map', 'LumenTale starter'],
  path: '/walkthrough/',
})

export default function WalkthroughPage() {
  const sections = [
    { title: 'Getting Started', desc: 'First steps in Talea — choosing your starter, understanding the battle system, and early exploration.', href: '/best-starter/', emoji: '🎮' },
    { title: 'SP & TP System', desc: 'Understand Skill Points and Technical Points — the key to mastering combat.', href: '/sp-tp-explained/', emoji: '⚡' },
    { title: 'Attributes Guide', desc: 'Learn how all 5 attributes work and which fits your playstyle.', href: '/attributes/', emoji: '✨' },
    { title: 'Type Chart', desc: 'All 13 elemental types and how they interact in battle.', href: '/type-chart/', emoji: '📊' },
    { title: 'Evolution Guide', desc: 'How to evolve your Animon, including path-dependent starter evolutions.', href: '/evolution-guide/', emoji: '🧬' },
    { title: 'Team Building', desc: 'Build an effective team with balanced type coverage and attribute synergy.', href: '/team-builder/', emoji: '🛡️' },
  ]

  const tips = [
    'LumenTale: Memories of Trey is a turn-based monster-taming RPG set in the world of Talea.',
    'The world is split between two hemispheres: Mythos and Logos. Your story path affects starter final evolutions.',
    'You play as Trey, a Lumen — someone connected to Animon and Talea\'s history.',
    'Animon are composed of Anivis energy. You capture them using a Holoken.',
    'Points of Interest give bonus experience to Animon when discovered.',
    'Boss fights have multiple health bars and battle phases — prepare accordingly.',
    'There are over 100 collectible cards across 3 sets.',
    'Lost Variant Animon are rare versions worth tracking down.',
    'The game supports 1v1 and 4v4 battles, plus multiplayer battles and Animon trading.',
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Walkthrough' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Walkthrough Hub</h1>
        <p className="mt-2 text-gray-600">
          Guides, tips, and progression help for LumenTale: Memories of Trey.
        </p>
      </div>

      <section className="rounded-lg border border-amber-200 bg-amber-50/70 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Start Here</h2>
        <p className="mt-1 text-sm text-gray-700">
          Most players arrive looking for a starter, evolution, map, or battle-system answer. These are the fastest routes.
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-2">
          <Link href="/best-starter/" className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50">
            Pick a starter
          </Link>
          <Link href="/evolution-guide/" className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50">
            Check evolutions
          </Link>
          <Link href="/locations/" className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50">
            View map notes
          </Link>
          <Link href="/type-chart/" className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50">
            Plan type coverage
          </Link>
        </div>
      </section>

      {/* Guide Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card variant="default" className="p-4 hover:shadow-md hover:border-amber-200 transition-all cursor-pointer h-full">
              <div className="text-2xl mb-2">{section.emoji}</div>
              <CardTitle className="text-sm">{section.title}</CardTitle>
              <CardDescription className="text-xs">{section.desc}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>

      {/* Game Tips */}
      <Card variant="default" className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Game Facts & Tips</h2>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-600">
              <span className="text-amber-500 font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Data Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
        <strong>Note:</strong> LumenTale launched on May 26, 2026. Chapter-by-chapter walkthrough content will be added as the game is documented. The guides above cover core systems that are already partially verified.
      </div>

      <RelatedGuides slugs={['evolution-guide', 'best-starter', 'patch-notes', 'attributes', 'sp-tp-explained']} />

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Walkthrough', url: '/walkthrough/' }])} />
    </div>
  )
}
