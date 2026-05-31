import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { TypeChip } from '@/components/ui/TypeChip'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import RelatedGuides from '@/components/ui/RelatedGuides'
import { AdsterraNativeBanner } from '@/components/ui/AdsterraNativeBanner'
import { AdsterraMediumRectangle } from '@/components/ui/AdsterraMediumRectangle'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getStarters, getGuideBySlug } from '@/data'
import { capitalize } from '@/lib/utils'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Best Starter - Which Animon Should You Pick?',
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

      <Card variant="default" className="p-4 md:p-6 bg-amber-50/50 border-amber-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Recommendation</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-600">Best overall starter:</span><span className="font-semibold text-gray-900">Queccha</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Best beginner starter:</span><span className="font-semibold text-gray-900">Mewaii</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Best damage starter:</span><span className="font-semibold text-gray-900">Ozelash</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Best defensive starter:</span><span className="font-semibold text-gray-900">Vortail</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Best late-game starter:</span><span className="font-semibold text-gray-900">Salabel</span></div>
        </div>
        <p className="text-xs text-gray-500 mt-3">Current recommendation based on confirmed type, attribute, and evolution data.</p>
      </Card>

      {/* Starter Comparison Grid */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900">All 5 Starters Compared</h2>
          <Link href="/evolution-guide/" className="text-xs text-amber-600 hover:underline font-medium">
            See evolution chains →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {starters.map((starter) => (
            <Link key={starter.id} href={`/animon/${starter.slug}/`} className="block">
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
            </Link>
          ))}
        </div>
      </section>

      {/* Starter Comparison Table */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Starter Comparison Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Starter</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Type</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Attribute</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Early Game</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Evolution</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-3 py-2"><Link href="/animon/mewaii/" className="text-amber-600 hover:underline font-medium">Mewaii</Link></td>
                <td className="px-3 py-2">Virus</td>
                <td className="px-3 py-2">Felicis</td>
                <td className="px-3 py-2">Healing sustain</td>
                <td className="px-3 py-2"><Link href="/animon/maidelly/" className="text-amber-600 hover:underline">→ Maidelly</Link></td>
                <td className="px-3 py-2">Beginners, sustain</td>
              </tr>
              <tr>
                <td className="px-3 py-2"><Link href="/animon/vortail/" className="text-amber-600 hover:underline font-medium">Vortail</Link></td>
                <td className="px-3 py-2">Aura</td>
                <td className="px-3 py-2">Mestus</td>
                <td className="px-3 py-2">Bonus damage</td>
                <td className="px-3 py-2"><Link href="/animon/furtex/" className="text-amber-600 hover:underline">→ Furtex</Link></td>
                <td className="px-3 py-2">Defensive, bosses</td>
              </tr>
              <tr>
                <td className="px-3 py-2"><Link href="/animon/ozelash/" className="text-amber-600 hover:underline font-medium">Ozelash</Link></td>
                <td className="px-3 py-2">Electric</td>
                <td className="px-3 py-2">Furor</td>
                <td className="px-3 py-2">Damage boost</td>
                <td className="px-3 py-2"><Link href="/animon/kouzear/" className="text-amber-600 hover:underline">→ Kouzear</Link></td>
                <td className="px-3 py-2">Aggressive, burst</td>
              </tr>
              <tr>
                <td className="px-3 py-2"><Link href="/animon/salabel/" className="text-amber-600 hover:underline font-medium">Salabel</Link></td>
                <td className="px-3 py-2">Demon</td>
                <td className="px-3 py-2">Horrens</td>
                <td className="px-3 py-2">Bypass resistance</td>
                <td className="px-3 py-2"><Link href="/animon/vilender/" className="text-amber-600 hover:underline">→ Vilender</Link></td>
                <td className="px-3 py-2">Late-game, boss</td>
              </tr>
              <tr>
                <td className="px-3 py-2"><Link href="/animon/queccha/" className="text-amber-600 hover:underline font-medium">Queccha</Link></td>
                <td className="px-3 py-2">Geo</td>
                <td className="px-3 py-2">Sereum</td>
                <td className="px-3 py-2">Crit + TP gain</td>
                <td className="px-3 py-2"><Link href="/animon/quequator/" className="text-amber-600 hover:underline">→ Quequator</Link></td>
                <td className="px-3 py-2">Strategic, resource</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <AdsterraNativeBanner />

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

      <AdsterraMediumRectangle />

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

      <div className="text-xs text-gray-500 py-4 border-t border-gray-100">
        <p>Last verified: May 31, 2026 · Data status: Partial — Starter types and attributes confirmed. Final evolutions pending gameplay verification.</p>
      </div>

      <RelatedGuides slugs={['evolution-guide', 'attributes', 'team-builder']} />

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Best Starter', url: '/best-starter/' }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
