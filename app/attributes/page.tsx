import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { TypeChip } from '@/components/ui/TypeChip'
import RelatedGuides from '@/components/ui/RelatedGuides'
import NextSteps from '@/components/ui/NextSteps'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getAllAttributes, getAllAnimon, getAnimonByAttribute, getGuideBySlug } from '@/data'
import { getStarters } from '@/data'
import { capitalize } from '@/lib/utils'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Attributes — Felicis, Mestus, Furor, Horrens & Sereum',
  description: 'Complete guide to all 5 LumenTale attributes — Felicis (healing), Mestus (HP-based damage), Furor (damage boost), Horrens (resistance bypass), and Sereum (critical hits + TP). See which Animon have each attribute and how to use them in battle.',
  keywords: ['LumenTale attributes', 'LumenTale Felicis', 'LumenTale Furor', 'LumenTale attribute explained', 'LumenTale Mestus', 'LumenTale Horrens', 'LumenTale Sereum'],
  path: '/attributes/',
})

export default function AttributesPage() {
  const attributes = getAllAttributes()
  const starters = getStarters()
  const allAnimon = getAllAnimon()
  const guide = getGuideBySlug('attributes')

  const faqItems = guide?.faq ?? [
    { question: 'What are the 5 attributes in LumenTale?', answer: 'The five attributes are: Felicis (healing/sustain), Mestus (HP-based bonus damage), Furor (move damage boost), Horrens (resistance bypass), and Sereum (critical hits + TP gain).' },
    { question: 'How do attributes activate in battle?', answer: 'You spend SP (Skill Points) to activate your Animon\'s attribute ability during battle. This adds a strategic layer beyond type matchups and move selection.' },
    { question: 'Can an Animon change its attribute?', answer: 'No confirmed mechanic for changing attributes has been documented. Each Animon has a fixed attribute.' },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Attributes' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Attributes Explained</h1>
        <p className="mt-2 text-gray-600">
          Every Animon has an attribute that provides an activatable ability in battle. Learn how each attribute works and which Animon carry them.
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

      {/* Detailed attribute sections from guides.ts */}
      {guide && guide.sections.length > 0 && (
        <>
          {guide.sections.map((section, i) => (
            <Card key={i} variant="default" className="p-4 md:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h2>
              <div className="space-y-2 text-sm text-gray-600">
                {section.content.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </Card>
          ))}
        </>
      )}

      {/* Tips */}
      {guide && guide.tips.length > 0 && (
        <Card variant="default" className="p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Attribute Tips</h2>
          <ul className="space-y-2">
            {guide.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-amber-500 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Animon by Attribute — internal linking section */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Animon by Attribute</h2>
        <p className="text-sm text-gray-600 mb-4">
          Which Animon carry each attribute. Use this to plan your team around specific attribute strategies.
        </p>
        <div className="space-y-4">
          {attributes.map((attr) => {
            const attrAnimon = getAnimonByAttribute(attr.slug)
              .filter(a => a.dataStatus !== 'placeholder' && a.dataStatus !== 'community')

            return (
              <Card key={attr.slug} variant="default" className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-base font-semibold text-gray-900">{attr.name}</h3>
                  <span className="text-xs text-gray-400">{attrAnimon.length} Animon</span>
                </div>
                {attrAnimon.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {attrAnimon.map((a) => (
                      <Link
                        key={a.id}
                        href={`/animon/${a.slug}/`}
                        className="rounded-lg border border-gray-200 p-2.5 hover:border-amber-200 hover:bg-amber-50 transition-colors"
                      >
                        <div className="text-sm font-medium text-gray-900">{a.name}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {a.types.map(t => (
                            <TypeChip key={t} type={t} size="sm" />
                          ))}
                        </div>
                        {a.isStarter && (
                          <Badge variant="primary" size="sm" className="mt-1">Starter</Badge>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No documented Animon with this attribute yet.</p>
                )}
              </Card>
            )
          })}
        </div>
      </section>

      <NextSteps
        title="After learning about attributes"
        description="These guides help you apply attribute knowledge to your playthrough."
        items={[
          { href: '/sp-tp-explained/', title: 'SP & TP Explained', description: 'Learn how SP and TP fuel attribute activations.' },
          { href: '/best-starter/', title: 'Best Starter', description: 'Compare starters by their attributes and playstyles.' },
          { href: '/evolution-guide/', title: 'Evolution Guide', description: 'See how each starter evolves and plan ahead.' },
        ]}
      />

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
