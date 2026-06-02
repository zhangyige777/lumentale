import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Accordion } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/seo/JsonLd'
import RelatedGuides from '@/components/ui/RelatedGuides'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getAllPatches, getLatestPatch, getPatchCount } from '@/data'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Patch Notes - Latest Hotfixes & Known Fixes',
  description: 'Track the latest LumenTale patch notes, hotfixes, known fixes, and update status for Memories of Trey.',
  keywords: ['LumenTale patch notes', 'LumenTale hotfix', 'LumenTale update', 'LumenTale known issues'],
  path: '/patch-notes/',
})

export default function PatchNotesPage() {
  const patches = getAllPatches()
  const latest = getLatestPatch()

  const faqItems = [
    {
      question: 'What is the latest LumenTale patch?',
      answer: latest
        ? `The latest tracked patch is "${latest.title}" dated ${new Date(latest.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. It addresses ${latest.fixes.length} known issue${latest.fixes.length !== 1 ? 's' : ''}.`
        : 'No patches have been tracked yet.',
    },
    {
      question: 'Does Hotfix 1 affect the LumenTale map?',
      answer: 'Yes. Hotfix 1 includes map-related fixes for interactables covered by quest area indicators and regional variants appearing in Local Animon sections where they cannot be obtained.',
    },
    {
      question: 'Is this patch page official?',
      answer: 'No. This is an unofficial tracker that summarizes official Steam/SteamDB-visible patch information and links back to source references.',
    },
    {
      question: 'How often are patch notes updated?',
      answer: 'Patch notes are checked daily from Steam Community announcements. New patches are added automatically when detected.',
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Patch Notes' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Patch Notes</h1>
        <p className="mt-2 text-gray-600">
          Latest tracked updates, hotfixes, and known fixes for LumenTale: Memories of Trey.
          {patches.length > 0 && ` ${patches.length} patch${patches.length !== 1 ? 'es' : ''} tracked.`}
        </p>
      </div>

      {/* Latest Patch */}
      {latest && (
        <Card variant="default" className="p-4 md:p-6 bg-amber-50/70 border-amber-200">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Latest tracked update: {latest.title}</h2>
            <Badge variant="warning" size="sm">
              {new Date(latest.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            {latest.fixes.length > 0 && `${latest.fixes.length} fix${latest.fixes.length !== 1 ? 'es' : ''} tracked.`}
            {latest.additions.length > 0 && ` ${latest.additions.length} addition${latest.additions.length !== 1 ? 's' : ''}.`}
            {latest.changes.length > 0 && ` ${latest.changes.length} change${latest.changes.length !== 1 ? 's' : ''}.`}
          </p>
          <p className="mt-3 text-sm">
            <a
              href={latest.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-700 hover:underline"
            >
              View source ({latest.source}) →
            </a>
          </p>
        </Card>
      )}

      {/* All Patches */}
      {patches.map((patch) => (
        <section key={patch.id}>
          <h2 className="text-xl font-bold text-gray-900 mb-3">{patch.title} — {new Date(patch.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>

          {patch.fixes.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Fixes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {patch.fixes.map((fix) => (
                  <Card key={fix} variant="default" className="p-4">
                    <div className="text-sm font-medium text-gray-900">{fix}</div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {patch.additions.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Additions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {patch.additions.map((addition) => (
                  <Card key={addition} variant="default" className="p-4">
                    <div className="text-sm font-medium text-gray-900">{addition}</div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {patch.changes.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Changes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {patch.changes.map((change) => (
                  <Card key={change} variant="default" className="p-4">
                    <div className="text-sm font-medium text-gray-900">{change}</div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-2">
            Source: <a href={patch.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">{patch.source}</a>
          </p>
        </section>
      ))}

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
