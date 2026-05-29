import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateSEOMetadata, generateBreadcrumbSchema, generateWebApplicationSchema, generateFAQSchema } from '@/lib/seo'
import { getAllAnimon, getAllTypes } from '@/data'
import { TypeChip } from '@/components/ui/TypeChip'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Team Builder — Build & Analyze Your Team',
  description: 'Build your LumenTale team and analyze type coverage, shared weaknesses, and missing offensive options. Free team building tool.',
  keywords: ['LumenTale team builder', 'LumenTale best team', 'LumenTale team comp', 'LumenTale team analysis'],
  path: '/team-builder/',
})

export default function TeamBuilderPage() {
  const allTypes = getAllTypes()
  const allAnimon = getAllAnimon()

  const faqItems = [
    { question: 'How many Animon can be on a team?', answer: 'LumenTale supports 4v4 team battles, so your active team has 4 Animon. You can carry more in your roster for switching.' },
    { question: 'What makes a good team in LumenTale?', answer: 'A good team has balanced type coverage (able to hit many types super effectively), no shared weaknesses, and complementary attributes for different battle situations.' },
    { question: 'Does this team builder work with current data?', answer: 'The team builder shell is ready. Full type coverage analysis will be available once type effectiveness matchups are verified. You can currently browse Animon and build your team visually.' },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Team Builder' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Team Builder</h1>
        <p className="mt-2 text-gray-600">
          Build your team and analyze type coverage, shared weaknesses, and strategy.
        </p>
      </div>

      {/* Team Slots */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Team (4 Slots)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((slot) => (
            <div
              key={slot}
              className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center text-gray-400 text-sm min-h-[120px] flex flex-col items-center justify-center"
            >
              <div className="text-2xl mb-1">+</div>
              <div>Slot {slot}</div>
              <div className="text-xs text-gray-300 mt-1">Add Animon</div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
          <p className="text-amber-700 text-sm">
            <strong>Coming Soon:</strong> Interactive team building with type coverage analysis will be available once type effectiveness data is verified.
          </p>
        </div>
      </div>

      {/* Available Animon */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Animon</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {allAnimon.filter(a => a.dataStatus !== 'placeholder').map((animon) => (
            <a
              key={animon.id}
              href={`/animon/${animon.slug}/`}
              className="p-2 border border-gray-200 rounded-lg text-center hover:border-amber-200 hover:bg-amber-50/50 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900">{animon.name}</div>
              <div className="flex justify-center gap-1 mt-1">
                {animon.types.map((type) => (
                  <TypeChip key={type} type={type} size="sm" />
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Team Building Tips */}
      <Card variant="default" className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Team Building Tips</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2"><span className="text-amber-500 font-bold">•</span><span>Aim for type diversity — don&apos;t stack multiple Animon of the same type.</span></li>
          <li className="flex gap-2"><span className="text-amber-500 font-bold">•</span><span>Consider attribute synergy — Sereum Animon can generate TP for the whole team through crits.</span></li>
          <li className="flex gap-2"><span className="text-amber-500 font-bold">•</span><span>Bring a Felicis-attribute Animon for healing sustain in longer fights.</span></li>
          <li className="flex gap-2"><span className="text-amber-500 font-bold">•</span><span>Remember that boss fights have multiple health bars and phases — plan for endurance.</span></li>
          <li className="flex gap-2"><span className="text-amber-500 font-bold">•</span><span>Lost Variant Animon exist and are rare — worth tracking down for your team.</span></li>
        </ul>
      </Card>

      {/* FAQ */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Team Builder', url: '/team-builder/' }])} />
      <JsonLd data={generateWebApplicationSchema('LumenTale Team Builder', 'Build your LumenTale team and analyze type coverage, shared weaknesses, and strategy.', '/team-builder/')} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
