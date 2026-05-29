import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getGuideBySlug } from '@/data'

export const metadata: Metadata = generateSEOMetadata({
  title: 'SP & TP in LumenTale — Skill Points and Technical Points Explained',
  description: 'Learn how SP (Skill Points) and TP (Technical Points) work in LumenTale. Understand resource management, attribute activation costs, and battle strategy.',
  keywords: ['LumenTale SP TP', 'LumenTale skill points', 'LumenTale technical points', 'LumenTale battle system'],
  path: '/sp-tp-explained/',
})

export default function SpTpPage() {
  const guide = getGuideBySlug('sp-tp-explained')
  const faqItems = guide?.faq ?? []

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'SP & TP Explained' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">SP & TP in LumenTale Explained</h1>
        <p className="mt-2 text-gray-600">
          Everything you need to know about Skill Points (SP) and Technical Points (TP) in LumenTale battles.
        </p>
      </div>

      {/* Sections */}
      {guide?.sections.map((section, i) => (
        <Card key={i} variant="default" className="p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h2>
          <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
            {section.content.map((para, j) => (
              <p key={j}>{para}</p>
            ))}
          </div>
        </Card>
      ))}

      {/* Tips */}
      {guide && guide.tips.length > 0 && (
        <Card variant="default" className="p-4 md:p-6 bg-amber-50/50">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">💡 Tips</h2>
          <ul className="space-y-2">
            {guide.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-amber-500 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Data Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
        <strong>Data Status:</strong> SP and TP mechanics are based on official Steam news descriptions. Exact SP costs, TP recovery rates, and specific numbers are still being verified through gameplay.
      </div>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
          <Accordion items={faqItems} />
        </section>
      )}

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'SP & TP Explained', url: '/sp-tp-explained/' }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
