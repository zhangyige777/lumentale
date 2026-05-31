import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateSEOMetadata, generateBreadcrumbSchema, generateItemListSchema, generateFAQSchema } from '@/lib/seo'
import { getStarters, getSiteStats, getIndexedAnimon } from '@/data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Accordion } from '@/components/ui/Accordion'
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
            <p>Last verified: May 31, 2026 · Data status: Partial — Types and attributes confirmed for indexed Animon. Stats, moves, and locations pending.</p>
          </div>
        </section>
      </div>

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Animon Database', url: '/animon/' }])} />
      <JsonLd data={generateItemListSchema(startersSchema)} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </>
  )
}
