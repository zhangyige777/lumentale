import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateSEOMetadata, generateBreadcrumbSchema, generateWebApplicationSchema, generateFAQSchema } from '@/lib/seo'
import { getAllAnimon, getAllTypes } from '@/data'
import WeaknessDataChecker from '@/components/animon/WeaknessDataChecker'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Weakness Calculator & Type Data Checker',
  description: 'Select any LumenTale type to see documented Animon, attribute spread, and current type matchup verification status.',
  keywords: ['LumenTale weakness calculator', 'LumenTale type calculator', 'LumenTale counter'],
  path: '/weakness-calculator/',
})

export default function WeaknessCalculatorPage() {
  const allTypes = getAllTypes()
  const allAnimon = getAllAnimon()
  const faqItems = [
    { question: 'How do I use the weakness calculator?', answer: 'Select one or two types from the grid. The current version shows documented Animon, selected type coverage, and attribute spread using real database entries.' },
    { question: 'Why are exact weakness results not listed yet?', answer: 'Official type effectiveness multipliers are not verified in the current dataset. We show known type and Animon data now, then add weakness and resistance results once matchups are confirmed.' },
    { question: 'Can I select two types?', answer: 'Yes. Selecting two types filters to documented Animon that currently match both selected types.' },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Weakness Calculator' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Weakness Calculator</h1>
        <p className="mt-2 text-gray-600">
          Select one or two types to inspect documented Animon and current matchup verification status.
        </p>
      </div>

      <WeaknessDataChecker types={allTypes} animon={allAnimon} />

      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How to Use This Tool</h2>
        <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>Click on one type to see documented Animon with that type.</li>
          <li>Click a second type to filter documented dual-type Animon.</li>
          <li>Use the matching Animon and attribute spread to plan team composition with real available data.</li>
          <li>Exact weakness and resistance multipliers will appear after gameplay verification.</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a href="/type-chart/" className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-amber-200 transition-colors">
          <h3 className="font-semibold text-gray-900 text-sm">Type Chart</h3>
          <p className="text-xs text-gray-500 mt-1">View all 13 confirmed types and known Animon by type</p>
        </a>
        <a href="/team-builder/" className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-amber-200 transition-colors">
          <h3 className="font-semibold text-gray-900 text-sm">Team Builder</h3>
          <p className="text-xs text-gray-500 mt-1">Build and analyze your team composition</p>
        </a>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Weakness Calculator', url: '/weakness-calculator/' }])} />
      <JsonLd data={generateWebApplicationSchema('LumenTale Weakness Calculator', 'Select LumenTale types to inspect documented Animon and current matchup verification status.', '/weakness-calculator/')} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
