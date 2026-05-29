import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Locations — All Areas, Routes & Regions',
  description: 'Explore all known locations in LumenTale: Memories of Trey. Find Animon locations, items, quests, and points of interest across Talea.',
  keywords: ['LumenTale locations', 'Lumentale map', 'LumenTale areas', 'LumenTale Talea'],
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

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Locations' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Locations</h1>
        <p className="mt-2 text-gray-600">
          Explore the world of Talea and discover all regions, points of interest, and important locations.
        </p>
      </div>

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
        <strong>Location Data — In Progress:</strong> LumenTale launched May 26, 2026. Detailed location pages with Animon encounter tables, item locations, and quest information will be added as data is documented.
      </div>

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations/' }])} />
    </div>
  )
}
