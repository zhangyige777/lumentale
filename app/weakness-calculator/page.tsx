import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateSEOMetadata, generateBreadcrumbSchema, generateWebApplicationSchema, generateFAQSchema } from '@/lib/seo'
import { getAllTypes } from '@/data'
import { TypeChip } from '@/components/ui/TypeChip'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Weakness Calculator — Find Type Counters',
  description: 'Select any LumenTale type to see its weaknesses, resistances, and best counters. Free tool for planning your team strategy.',
  keywords: ['LumenTale weakness calculator', 'LumenTale type calculator', 'LumenTale counter'],
  path: '/weakness-calculator/',
})

export default function WeaknessCalculatorPage() {
  const allTypes = getAllTypes()
  const faqItems = [
    { question: 'How do I use the weakness calculator?', answer: 'Select one or two types from the grid below to see what they are weak against, what they resist, and what types are neutral. This helps you plan your battle strategy.' },
    { question: 'Why are matchup results not showing?', answer: 'Type effectiveness data is still being verified. Once matchups are confirmed through gameplay, this calculator will show full weakness and resistance information.' },
    { question: 'Can I select two types?', answer: 'Yes! Many Animon have dual types. Selecting two types will calculate the combined defensive profile, showing shared weaknesses and resistances.' },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Weakness Calculator' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Weakness Calculator</h1>
        <p className="mt-2 text-gray-600">
          Select one or two types to see weaknesses, resistances, and recommended counters.
        </p>
      </div>

      {/* Calculator Shell */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Type(s)</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {allTypes.map((type) => (
            <TypeChip key={type.slug} type={type.slug} size="md" />
          ))}
        </div>

        {/* Results placeholder */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-semibold text-amber-800 text-sm">Type Matchups — Coming Soon</h3>
          <p className="text-amber-700 text-sm mt-1">
            Type effectiveness data is being verified. Once matchups are confirmed, this tool will show full weakness and resistance analysis for any type combination.
          </p>
        </div>
      </div>

      {/* How To Use */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How to Use This Tool</h2>
        <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>Click on one type to see its defensive profile (weaknesses, resistances, neutral matchups).</li>
          <li>Click a second type to calculate combined dual-type matchups.</li>
          <li>Results will show super effective moves, resisted moves, and neutral options against your selected type(s).</li>
          <li>Use this information to plan your team composition and counter specific opponents.</li>
        </ol>
      </div>

      {/* Related Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a href="/type-chart/" className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-amber-200 transition-colors">
          <h3 className="font-semibold text-gray-900 text-sm">📊 Type Chart</h3>
          <p className="text-xs text-gray-500 mt-1">View all 13 type matchups in a grid</p>
        </a>
        <a href="/team-builder/" className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-amber-200 transition-colors">
          <h3 className="font-semibold text-gray-900 text-sm">🛡️ Team Builder</h3>
          <p className="text-xs text-gray-500 mt-1">Build and analyze your team composition</p>
        </a>
      </div>

      {/* FAQ */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Weakness Calculator', url: '/weakness-calculator/' }])} />
      <JsonLd data={generateWebApplicationSchema('LumenTale Weakness Calculator', 'Select LumenTale types to see weaknesses, resistances, and recommended counters.', '/weakness-calculator/')} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
