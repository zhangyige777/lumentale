import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import RelatedGuides from '@/components/ui/RelatedGuides'
import NextSteps from '@/components/ui/NextSteps'
import { AdsterraNativeBanner } from '@/components/ui/AdsterraNativeBanner'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Map & Locations — Areas, Routes & Regions',
  description: 'Explore the LumenTale map and known locations in Memories of Trey. Track regions, points of interest, Animon locations, items, and quest data as it is verified.',
  keywords: ['LumenTale locations', 'Lumentale map', 'LumenTale map', 'LumenTale areas', 'LumenTale Talea'],
  path: '/locations/',
})

export default function LocationsPage() {
  const regions = [
    { name: 'Talea', description: 'The main world/region of LumenTale. Split between Mythos and Logos hemispheres with cultural and political tension.', status: 'confirmed' },
    { name: 'Mythos', description: 'One of the two main hemispheres. Your choice between Mythos and Logos affects starter final evolutions.', status: 'confirmed' },
    { name: 'Logos', description: 'One of the two main hemispheres. Each path offers different story beats and evolution outcomes.', status: 'confirmed' },
  ]

  const systems = [
    { name: 'Points of Interest', description: 'Discovering them gives bonus experience to Animon. Found throughout the world.', status: 'confirmed' },
    { name: 'Fountains', description: 'Community wiki says players can craft items and cook food at fountains found in the world.', status: 'community' },
    { name: 'Anispace', description: 'A personal/home base system for Animon management and customization.', status: 'confirmed' },
  ]

  const faqItems = [
    {
      question: 'Is there a complete LumenTale map?',
      answer: 'A complete interactive map has not been verified yet. This page tracks confirmed regions, world systems, and location notes until reliable map and encounter data is available.',
    },
    {
      question: 'Where does LumenTale take place?',
      answer: 'LumenTale takes place in Talea, a world split between the Mythos and Logos hemispheres.',
    },
    {
      question: 'Are Animon encounter locations verified?',
      answer: 'Not yet. Encounter tables, item locations, and quest details are intentionally marked as pending until they can be verified through reliable gameplay data.',
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Locations' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Map & Locations</h1>
        <p className="mt-2 text-gray-600">
          Explore the world of Talea and discover all regions, points of interest, and important locations.
        </p>
      </div>

      <Card variant="default" className="p-4 md:p-6 bg-amber-50/60 border-amber-200">
        <h2 className="text-lg font-semibold text-gray-900">Map Status</h2>
        <p className="mt-2 text-sm text-gray-700">
          A full interactive map is not verified yet. This page currently tracks confirmed regions, world systems, and location-related notes without guessing encounter tables.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Link href="/walkthrough/" className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50">
            Walkthrough hub
          </Link>
          <Link href="/animon/" className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50">
            Animon database
          </Link>
          <Link href="/evolution-guide/" className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50">
            Evolution guide
          </Link>
        </div>
      </Card>

      <NextSteps
        title="Looking for something on the map?"
        description="These pages answer the most common location-related searches while encounter tables are being verified."
        items={[
          { href: '/animon/', title: 'Find Animon', description: 'Search documented Animon by name, type, or attribute.' },
          { href: '/walkthrough/', title: 'Progression Help', description: 'Use the walkthrough hub for beginner and route planning links.' },
          { href: '/evolution-guide/', title: 'Evolution Routes', description: 'Check chains before deciding which Animon to train.' },
        ]}
      />

      <AdsterraNativeBanner />

      {/* Regions */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Known Regions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {regions.map((region) => (
            <Card key={region.name} variant="default" className="p-4">
              <h3 className="font-semibold text-gray-900">{region.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{region.description}</p>
              <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                region.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {region.status === 'confirmed' ? 'Verified' : 'Partial'}
              </span>
            </Card>
          ))}
        </div>
      </section>

      {/* World Systems */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">World Systems & Points of Interest</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {systems.map((system) => (
            <Card key={system.name} variant="default" className="p-4">
              <h3 className="font-semibold text-gray-900">{system.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{system.description}</p>
              <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                system.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
              }`}>
                {system.status === 'confirmed' ? 'Verified' : 'Community'}
              </span>
            </Card>
          ))}
        </div>
      </section>

      {/* Data Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
        <strong>Encounter Tables Not Verified:</strong> LumenTale launched May 26, 2026. This page only lists documented regions and world systems; Animon encounter tables, item locations, and quest details will be added when reliable data exists.
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Locations FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <RelatedGuides slugs={['walkthrough', 'patch-notes', 'animon', 'evolution-guide']} />

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations/' }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
