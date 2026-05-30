import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import RelatedGuides from '@/components/ui/RelatedGuides'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getAllTypes } from '@/data'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Type Chart — All 13 Elemental Type Matchups',
  description: 'Complete LumenTale type chart with all 13 types. See strengths, weaknesses, and matchups for Fire, Water, Grass, Electric, and more.',
  keywords: ['LumenTale type chart', 'LumenTale weakness chart', 'LumenTale elements', 'LumenTale attributes'],
  path: '/type-chart/',
})

export default function TypeChartPage() {
  const allTypes = getAllTypes()
  const faqItems = [
    { question: 'How many types are in LumenTale?', answer: 'There are 13 elemental types in LumenTale: Fire, Water, Grass, Electric, Ice, Geo, Aura, Chakra, Demon, Data, Virus, Ancient, and Anomalous.' },
    { question: 'How does type effectiveness work?', answer: 'Type effectiveness determines how much damage a move deals based on the matchup between the attacking type and the defending type. Some types are strong against others (dealing more damage) while some are resisted (dealing less).' },
    { question: 'Is the type effectiveness chart complete?', answer: 'Not yet. LumenTale launched on May 26, 2026, and the full type effectiveness data is still being verified. Type names are confirmed, but specific matchup multipliers will be added as they are confirmed through gameplay.' },
    { question: 'Where can I see type weaknesses?', answer: 'Use our Weakness Calculator tool to select a type and see what it is weak to, strong against, and resistant to. As data is verified, the calculator will be updated.' },
    { question: 'Where can I browse Animon by type?', answer: 'Visit the Animon Database to search and filter all Animon by their elemental type, attribute, and evolution stage.' },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Type Chart' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Type Chart</h1>
        <p className="mt-2 text-gray-600">
          All 13 elemental types in LumenTale. Type effectiveness data is being verified — matchup cells will be populated as data is confirmed.
        </p>
      </div>

      {/* Type Grid */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All 13 Types</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {allTypes.map((type) => (
            <div
              key={type.slug}
              className={`${type.colorClass} rounded-lg p-3 text-white`}
            >
              <div className="font-semibold text-sm">{type.name}</div>
              <div className="text-xs text-white/80 mt-1">{type.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Effectiveness Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-semibold text-amber-800 text-sm">Type Effectiveness Data — In Progress</h3>
        <p className="text-amber-700 text-sm mt-1">
          The 13 type names are confirmed from official sources. Specific effectiveness matchups (strong against, weak against, resistant to) are being verified through gameplay and will be added to this chart and the <Link href="/weakness-calculator/" className="text-amber-800 hover:underline font-medium">weakness calculator</Link> as they are confirmed.
        </p>
      </div>

      {/* Explanation */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How Type Effectiveness Works</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            In LumenTale, every Animon has one or two elemental types that determine its strengths and weaknesses in battle.
            When an Animon uses a move of a type that is strong against the opponent, it deals increased damage.
          </p>
          <p>
            LumenTale features 13 unique elemental types, creating a rich and diverse battle system.
            Understanding type matchups is essential for building effective teams and winning difficult battles.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="font-semibold text-green-800">Super Effective</div>
              <div className="text-green-700 text-xs mt-1">Deals increased damage (2×)</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-semibold text-gray-800">Neutral</div>
              <div className="text-gray-600 text-xs mt-1">Normal damage (1×)</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <div className="font-semibold text-red-800">Not Very Effective</div>
              <div className="text-red-700 text-xs mt-1">Reduced damage (0.5×)</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <RelatedGuides slugs={['weakness-calculator', 'team-builder', 'animon']} />

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Type Chart', url: '/type-chart/' }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
