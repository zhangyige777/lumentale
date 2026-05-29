import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { TypeChip } from '@/components/ui/TypeChip'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getStarters, getGuideBySlug } from '@/data'
import { capitalize } from '@/lib/utils'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Best Starter in LumenTale — Which Animon Should You Pick?',
  description: 'Compare all 5 LumenTale starters — Mewaii, Vortail, Ozelash, Salabel, and Queccha. Find the best starter for your playstyle with our detailed comparison.',
  keywords: ['LumenTale best starter', 'LumenTale starter', 'LumenTale which starter', 'Mewaii vs Vortail vs Ozelash'],
  path: '/best-starter/',
})

export default function BestStarterPage() {
  const starters = getStarters()
  const guide = getGuideBySlug('best-starter')
  const faqItems = guide?.faq ?? []

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Best Starter' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Best Starter in LumenTale</h1>
        <p className="mt-2 text-gray-600">
          Compare all five starter Animon and find the best pick for your playstyle.
        </p>
      </div>

      {/* Starter Comparison Grid */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">All 5 Starters Compared</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {starters.map((starter) => (
            <a key={starter.id} href={`/animon/${starter.slug}/`} className="block">
              <Card variant="default" className="p-4 hover:shadow-md hover:border-amber-200 transition-all h-full">
                <h3 className="font-bold text-gray-900">{starter.name}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {starter.types.map((type) => (
                    <TypeChip key={type} type={type} size="sm" />
                  ))}
                </div>
                <div className="mt-2">
                  <Badge variant="info" size="sm">{capitalize(starter.attribute)}</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {starter.evolvesTo.length > 0 && <>Evolves into {starter.evolvesTo.map(capitalize).join(', ')}</>}
                </p>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      {guide && guide.sections.map((section, i) => (
        <Card key={i} variant="default" className="p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h2>
          <div className="space-y-2 text-sm text-gray-600">
            {section.content.map((para, j) => (
              <p key={j}>{para}</p>
            ))}
          </div>
        </Card>
      ))}

      {/* Tips */}
      {guide && guide.tips.length > 0 && (
        <Card variant="default" className="p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Tips</h2>
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

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
          <Accordion items={faqItems} />
        </section>
      )}

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Best Starter', url: '/best-starter/' }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
