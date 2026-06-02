import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Accordion } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/seo/JsonLd'
import RelatedGuides from '@/components/ui/RelatedGuides'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Patch Notes - Latest Hotfixes & Known Fixes',
  description: 'Track the latest LumenTale patch notes, hotfixes, known fixes, and update status for Memories of Trey.',
  keywords: ['LumenTale patch notes', 'LumenTale hotfix', 'LumenTale update', 'LumenTale known issues'],
  path: '/patch-notes/',
})

export default function PatchNotesPage() {
  const fixes = [
    'Area 01 Lumen interaction issue',
    'Infinite loading after re-entering Area 01',
    'Map interactables blocked by quest area indicators',
    'Regional variants incorrectly shown in Local Animon map sections',
    'Piercing Squall behavior',
    'Quick Anispace Stat menu softlock',
  ]

  const faqItems = [
    {
      question: 'What is the latest LumenTale patch?',
      answer: 'The latest patch note currently tracked here is Hotfix 1, dated May 27, 2026. It addressed Area 01, map interactables, regional variant map display, Piercing Squall, and a Quick Anispace softlock.',
    },
    {
      question: 'Does Hotfix 1 affect the LumenTale map?',
      answer: 'Yes. Hotfix 1 includes map-related fixes for interactables covered by quest area indicators and regional variants appearing in Local Animon sections where they cannot be obtained.',
    },
    {
      question: 'Is this patch page official?',
      answer: 'No. This is an unofficial tracker that summarizes official Steam/SteamDB-visible patch information and links back to source references.',
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Patch Notes' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Patch Notes</h1>
        <p className="mt-2 text-gray-600">
          Latest tracked updates, hotfixes, and known fixes for LumenTale: Memories of Trey.
        </p>
      </div>

      <Card variant="default" className="p-4 md:p-6 bg-amber-50/70 border-amber-200">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Latest tracked update: Hotfix 1</h2>
          <Badge variant="warning" size="sm">May 27, 2026</Badge>
        </div>
        <p className="mt-2 text-sm text-gray-700">
          Hotfix 1 focuses on progression blockers, map interaction issues, regional variant display, Piercing Squall behavior, and a Quick Anispace softlock.
        </p>
        <p className="mt-3 text-sm">
          <a
            href="https://steamdb.info/patchnotes/23432645/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-amber-700 hover:underline"
          >
            View source on SteamDB
          </a>
        </p>
      </Card>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Hotfix 1 Fix List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fixes.map((fix) => (
            <Card key={fix} variant="default" className="p-4">
              <div className="text-sm font-medium text-gray-900">{fix}</div>
            </Card>
          ))}
        </div>
      </section>

      <Card variant="default" className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900">Why this matters for guides</h2>
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <p>
            The map and regional-variant fixes matter for location pages because pre-hotfix map behavior may show misleading Local Animon information.
          </p>
          <p>
            The Area 01 and Quick Anispace fixes matter for walkthrough users because they are progression and menu-lock issues, not normal gameplay requirements.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/locations/" className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-amber-200 hover:text-amber-700">
            Map & locations
          </Link>
          <Link href="/walkthrough/" className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-amber-200 hover:text-amber-700">
            Walkthrough hub
          </Link>
          <Link href="/animon/" className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-amber-200 hover:text-amber-700">
            Animon database
          </Link>
        </div>
      </Card>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Patch Notes FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <RelatedGuides slugs={['walkthrough', 'locations', 'animon']} />

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Patch Notes', url: '/patch-notes/' }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
