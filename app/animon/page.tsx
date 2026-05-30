import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateSEOMetadata, generateBreadcrumbSchema, generateItemListSchema, generateFAQSchema } from '@/lib/seo'
import { getStarters, getSiteStats } from '@/data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Accordion } from '@/components/ui/Accordion'
import AnimonDatabaseClient from './AnimonDatabaseClient'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Animon Database — All Animon List',
  description: 'Browse the complete LumenTale Animon database. Search and filter by type, attribute, and evolution stage.',
  keywords: ['LumenTale animon list', 'LumenTale all animon', 'LumenTale animon database'],
  path: '/animon/',
})

export default function AnimonDatabasePage() {
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
      <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading Animon...</div>}>
        <AnimonDatabaseClient />
      </Suspense>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto pb-12">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">FAQ</h2>
          <Accordion items={faqItems} />
        </section>
      </div>

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Animon Database', url: '/animon/' }])} />
      <JsonLd data={generateItemListSchema(startersSchema)} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </>
  )
}
