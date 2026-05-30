import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import RelatedGuides from '@/components/ui/RelatedGuides'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getAllAttributes, getGuideBySlug } from '@/data'
import { getStarters } from '@/data'
import { capitalize } from '@/lib/utils'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Attributes — Felicis, Mestus, Furor, Horrens & Sereum',
  description: 'Understand all 5 LumenTale attributes: Felicis (healing), Mestus (bonus damage), Furor (aggressive), Horrens (finisher), and Sereum (crits/TP). Learn how attributes affect battle.',
  keywords: ['LumenTale attributes', 'LumenTale Felicis', 'LumenTale Furor', 'LumenTale attribute explained'],
  path: '/attributes/',
})

export default function AttributesPage() {
  const attributes = getAllAttributes()
  const starters = getStarters()
  const guide = getGuideBySlug('attributes')
  const faqItems = guide?.faq ?? [
    { question: 'What are the 5 attributes in LumenTale?', answer: 'The five attributes are: Felicis (healing/sustain), Mestus (HP-based bonus damage), Furor (move damage boost), Horrens (resistance bypass), and Sereum (critical hits + TP gain).' },
    { question: 'How do attributes activate in battle?', answer: 'You spend SP (Skill Points) to activate your Animon\'s attribute ability during battle. This adds a strategic layer beyond type matchups and move selection.' },
    { question: 'Can an Animon change its attribute?', answer: 'No confirmed mechanic for changing attributes has been documented. Each Animon has a fixed attribute.' },
  ]
  const guide2 = { faq: faqItems }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Attributes' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Attributes Explained</h1>
        <p className="mt-2 text-gray-600">
          Every Animon has an attribute that provides an activatable ability in battle. Learn how each attribute works.
        </p>
      </div>

      {/* Attribute Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {attributes.map((attr) => {
          const starter = starters.find(s => s.attribute === attr.slug)
          return (
            <Card key={attr.slug} variant="default" className="p-4 md:p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900">{attr.name}</h2>
                <Badge variant={attr.dataStatus === 'confirmed' ? 'success' : 'warning'} size="sm">
                  {attr.dataStatus === 'confirmed' ? 'Verified' : 'Partial'}
                </Badge>
              </div>
              <div className="text-xs text-gray-500 font-medium mb-2">{attr.generalRole}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{attr.effectSummary}</p>
              {starter && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Starter: </span>
                  <Link href={`/animon/${starter.slug}/`} className="text-xs text-amber-600 hover:underline font-medium">
                    {starter.name}
                  </Link>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* How Attributes Work */}
      <Card variant="default" className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How Attributes Work in Battle</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>Attributes are separate from elemental types. While types determine offensive and defensive matchups, attributes provide an <strong>active ability</strong> that you can trigger during battle by spending SP.</p>
          <p>This creates a two-layer strategic system:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Type matchups</strong> — which moves are super effective or resisted</li>
            <li><strong>Attribute activation</strong> — when to spend SP for a powerful attribute effect</li>
          </ul>
        </div>
      </Card>

      {/* FAQ */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <RelatedGuides slugs={guide?.related ?? ['sp-tp-explained', 'best-starter', 'type-chart']} />

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Attributes', url: '/attributes/' }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
