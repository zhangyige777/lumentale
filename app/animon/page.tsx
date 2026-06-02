import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateSEOMetadata, generateBreadcrumbSchema, generateItemListSchema, generateFAQSchema } from '@/lib/seo'
import { getStarters, getSiteStats, getIndexedAnimon, getAllAnimon, getAllTypes, getAllAttributes } from '@/data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Accordion } from '@/components/ui/Accordion'
import { TypeChip } from '@/components/ui/TypeChip'
import { Badge } from '@/components/ui/Badge'
import RelatedGuides from '@/components/ui/RelatedGuides'
import NextSteps from '@/components/ui/NextSteps'
import AnimonDatabaseClient from './AnimonDatabaseClient'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Animon List - All Animon, Types, Evolutions & Locations',
  description: 'Browse the complete LumenTale Animon database. Search and filter by type, attribute, and evolution stage.',
  keywords: ['LumenTale animon list', 'LumenTale all animon', 'LumenTale animon database'],
  path: '/animon/',
})

export default function AnimonDatabasePage() {
  const indexedAnimon = getIndexedAnimon()
  const starters = getStarters()
  const stats = getSiteStats()
  const allAnimon = getAllAnimon()
  const allTypes = getAllTypes()
  const allAttributes = getAllAttributes()

  // Lookup map: slug -> Animon for resolving evolution names
  const animonBySlug = new Map(allAnimon.map(a => [a.slug, a]))

  const startersSchema = starters.map((a, i) => ({
    name: a.name,
    url: `/animon/${a.slug}/`,
    position: i + 1,
  }))

  // Popular Animon slugs for the popular section
  const popularSlugs = ['mewaii', 'vortail', 'ozelash', 'salabel', 'queccha', 'boobat', 'mushwick', 'owaxle', 'vilender']
  const popularAnimon = popularSlugs
    .map(slug => animonBySlug.get(slug))
    .filter((a): a is NonNullable<typeof a> => a != null)

  const faqItems = [
    { question: 'How many Animon are in LumenTale?', answer: `Official sources mention around 140 known species. Our database currently tracks ${stats.totalAnimon} documented Animon, with more being added as data is verified through gameplay.` },
    { question: 'What are the starter Animon in LumenTale?', answer: 'The five starter Animon are Mewaii (Virus/Felicis), Vortail (Aura/Mestus), Ozelash (Electric/Furor), Salabel (Demon/Horrens), and Queccha (Geo/Sereum). Each has a unique type and attribute combination.' },
    { question: 'How do I find a specific Animon?', answer: 'Use the search bar above to search by name, or filter by type and attribute using the dropdown menus. You can also browse by category using the All, Starters, and Verified tabs.' },
  ]

  return (
    <>
      <Suspense fallback={<div className="py-8 text-center text-gray-500">Loading search and filters...</div>}>
        <AnimonDatabaseClient />
      </Suspense>

      <div className="max-w-4xl mx-auto">
        <section className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-xl font-bold text-gray-900">LumenTale Animon List</h2>
          <p className="mt-2 text-sm text-gray-600">
            Browse documented LumenTale Animon by name, type, attribute, starter status, and evolution chain. Official sources mention around 140 known species; this database separates verified data from partial leads.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <a href="/evolution-guide/" className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100">Evolution guide</a>
            <a href="/type-chart/" className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-800 hover:bg-blue-100">Type chart</a>
            <a href="/best-starter/" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100">Best starter</a>
          </div>
        </section>

        {/* Starter Animon Section */}
        <section className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Starter Animon</h2>
          <p className="text-sm text-gray-600 mb-4">Choose your first companion from five unique starters, each with a different type and attribute.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {starters.map((s) => {
              const evoNames = s.evolvesTo
                .map(slug => animonBySlug.get(slug)?.name)
                .filter(Boolean)
              return (
                <a
                  key={s.id}
                  href={'/animon/' + s.slug + '/'}
                  className="block rounded-lg border border-gray-200 p-3 hover:border-amber-300 hover:bg-amber-50/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-gray-900">{s.name}</span>
                    <Badge variant="primary" size="sm">{s.attribute.charAt(0).toUpperCase() + s.attribute.slice(1)}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {s.types.map(t => (
                      <TypeChip key={t} type={t} size="sm" />
                    ))}
                  </div>
                  {evoNames.length > 0 && (
                    <p className="text-xs text-gray-500">Evolves into {evoNames.join(', ')}</p>
                  )}
                  <p className="text-xs text-gray-600 mt-1">{s.quickAnswer || s.description}</p>
                </a>
              )
            })}
          </div>
        </section>

        {/* Popular Animon Section */}
        <section className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Popular Animon</h2>
          <p className="text-sm text-gray-600 mb-3">Frequently looked-up Animon across guides and evolution chains.</p>
          <div className="flex flex-wrap gap-2">
            {popularAnimon.map((a) => (
              <a
                key={a.id}
                href={'/animon/' + a.slug + '/'}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 transition-colors"
              >
                {a.name}
                {a.types.length > 0 && (
                  <span className="text-xs text-gray-400">({a.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join('/')})</span>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* Browse by Type Section */}
        <section className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Browse by Type</h2>
          <p className="text-sm text-gray-600 mb-3">All {allTypes.length} confirmed LumenTale types. Click to see the full type chart.</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {allTypes.map((t) => (
              <a
                key={t.slug}
                href="/type-chart/"
                className={'flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85 ' + t.colorClass}
              >
                {t.name}
              </a>
            ))}
          </div>
        </section>

        {/* Browse by Attribute Section */}
        <section className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Browse by Attribute</h2>
          <p className="text-sm text-gray-600 mb-3">Each Animon carries one of five attributes that activate special effects in battle.</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {allAttributes.map((attr) => (
              <div
                key={attr.slug}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-3"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{attr.name}</p>
                  <p className="text-xs text-gray-500">{attr.generalRole}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <NextSteps
          title="After you find an Animon"
          description="Use these next pages to turn a lookup into a team or progression decision."
          items={[
            { href: '/evolution-guide/', title: 'Check Evolutions', description: 'See chains, methods, and missing verification notes.' },
            { href: '/type-chart/', title: 'Compare Types', description: 'Review all 13 confirmed types and known Animon by type.' },
            { href: '/team-builder/', title: 'Plan a Team', description: 'Balance your starter, types, and attributes.' },
          ]}
        />
        <p className="text-sm text-gray-600 py-3">
          Browse the LumenTale Animon list with type, attribute, evolution chain, location status, and verification notes.
        </p>
        <section className="py-4">
          <h2 className="sr-only">Complete Animon List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Attribute</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Evolution</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Location</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {indexedAnimon.map((a) => (
                  <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3"><a href={'/animon/' + a.slug + '/'} className="text-amber-600 hover:underline font-medium">{a.name}</a></td>
                    <td className="py-2 px-3 text-gray-600">{a.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ') || '—'}</td>
                    <td className="py-2 px-3 text-gray-600">{a.attribute ? a.attribute.charAt(0).toUpperCase() + a.attribute.slice(1) : '—'}</td>
                    <td className="py-2 px-3 text-gray-600">{a.evolvesTo.length > 0 ? '→ ' + a.evolvesTo.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(', ') : '—'}</td>
                    <td className="py-2 px-3 text-gray-500">Pending</td>
                    <td className="py-2 px-3"><span className={'text-xs px-2 py-0.5 rounded-full ' + (a.dataStatus === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700')}>{a.dataStatus === 'confirmed' ? 'Verified' : 'Partial'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto pb-12">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">FAQ</h2>
          <Accordion items={faqItems} />
          <div className="text-xs text-gray-500 py-2 border-t border-gray-100">
            <p>Last verified: June 2, 2026 · Data status: Partial — Types, attributes, and selected evolution leads are updated as source quality allows. Stats, moves, and locations pending.</p>
          </div>
        </section>
        <RelatedGuides slugs={['evolution-guide', 'type-chart', 'best-starter']} />
      </div>

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Animon Database', url: '/animon/' }])} />
      <JsonLd data={generateItemListSchema(startersSchema)} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </>
  )
}
