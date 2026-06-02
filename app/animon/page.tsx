import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateSEOMetadata, generateBreadcrumbSchema, generateItemListSchema, generateFAQSchema } from '@/lib/seo'
import { getStarters, getSiteStats, getIndexedAnimon } from '@/data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Accordion } from '@/components/ui/Accordion'
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
  const startersSchema = starters.map((a, i) => ({
    name: a.name,
    url: `/animon/${a.slug}/`,
    position: i + 1,
  }))

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
