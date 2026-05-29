import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateSEOMetadata, generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo'
import { getStarters } from '@/data'
import { JsonLd } from '@/components/seo/JsonLd'
import AnimonDatabaseClient from './AnimonDatabaseClient'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Animon Database — All Animon List',
  description: 'Browse the complete LumenTale Animon database. Search and filter by type, attribute, and evolution stage.',
  keywords: ['LumenTale animon list', 'LumenTale all animon', 'LumenTale animon database'],
  path: '/animon/',
})

export default function AnimonDatabasePage() {
  const starters = getStarters()
  const startersSchema = starters.map((a, i) => ({
    name: a.name,
    url: `/animon/${a.slug}/`,
    position: i + 1,
  }))

  return (
    <>
      <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading Animon...</div>}>
        <AnimonDatabaseClient />
      </Suspense>
      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Animon Database', url: '/animon/' }])} />
      <JsonLd data={generateItemListSchema(startersSchema)} />
    </>
  )
}
