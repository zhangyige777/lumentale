import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import RelatedGuides from '@/components/ui/RelatedGuides'
import { AdsterraNativeBanner } from '@/components/ui/AdsterraNativeBanner'
import { AdsterraMediumRectangle } from '@/components/ui/AdsterraMediumRectangle'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getStarters, getAllAnimon } from '@/data'
import { capitalize } from '@/lib/utils'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Evolution Guide — How to Evolve Every Animon',
  description: 'Complete evolution guide for LumenTale. Learn how to evolve all starter Animon and discover evolution methods, levels, and path-dependent evolutions.',
  keywords: ['LumenTale evolution guide', 'LumenTale how to evolve', 'LumenTale starter evolutions', 'LumenTale evolution'],
  path: '/evolution-guide/',
})

export default function EvolutionGuidePage() {
  const starters = getStarters()
  const allAnimon = getAllAnimon()

  const faqItems = [
    { question: 'How does evolution work in LumenTale?', answer: 'Animon evolve through various methods including leveling up. Starter Animon have path-dependent final evolutions that differ based on whether you choose the Mythos or Logos story path.' },
    { question: 'Do starter evolutions depend on story choices?', answer: 'Yes! Official sources confirm that starter final evolutions differ based on the Mythos or Logos path you follow in the story.' },
    { question: 'What are the starter second-stage evolutions?', answer: 'Mewaii → Maidelly, Vortail → Furtex, Ozelash → Kouzear, Salabel → Vilender, Queccha → Quequator. These are confirmed via Steam news.' },
    { question: 'How many evolution stages are there?', answer: 'Starters have at least 3 stages (base, second stage, and a path-dependent final stage). Exact evolution methods and additional stages for wild Animon are still being documented.' },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Evolution Guide' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Evolution Guide</h1>
        <p className="mt-2 text-gray-600">
          Learn how to evolve every Animon in LumenTale. Evolution methods, stages, and path-dependent evolutions explained.
        </p>
      </div>

      {/* Evolution Mechanics */}
      <Card variant="default" className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How Evolution Works</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>Animon in LumenTale can evolve through various methods. The most common is leveling up through battle experience.</p>
          <p><strong>Path-Dependent Evolutions:</strong> Official Steam news confirms that starter final evolutions depend on whether you follow the Mythos or Logos story path. This means your starter&apos;s ultimate form is influenced by story choices, not just leveling.</p>
          <p><strong>Discovery Bonuses:</strong> Discovering Points of Interest gives bonus experience to Animon, which can speed up evolution.</p>
        </div>
      </Card>

      <AdsterraNativeBanner />

      {/* How to Evolve Animon */}
      <Card variant="default" className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How to Evolve Animon</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>To evolve an Animon in LumenTale, you typically need to level it up through battles. Some Animon have specific evolution requirements beyond just reaching a certain level.</p>
          <p><strong>Leveling Up:</strong> The primary method. Battle wild Animon and trainers to earn experience points. Some evolutions may require reaching a specific level.</p>
          <p><strong>Story Path:</strong> Starter Animon have final evolutions that change based on whether you follow the Mythos or Logos path in the story.</p>
          <p><strong>Other Methods:</strong> Some Animon may have special evolution conditions. These are still being documented as the game is explored.</p>
        </div>
      </Card>

      <AdsterraMediumRectangle />

      {/* Wild Animon Evolutions */}
      {(() => {
        const wildChains = allAnimon.filter(a =>
          !a.isStarter &&
          a.evolvesTo.length > 0 &&
          a.dataStatus !== 'placeholder' &&
          a.dataStatus !== 'community' &&
          a.types.length > 0
        )
        if (wildChains.length === 0) return null
        return (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Wild Animon Evolutions</h2>
            <div className="space-y-4">
              {wildChains.map((animon) => {
                const evolved = animon.evolvesTo[0]
                  ? allAnimon.find(a => a.slug === animon.evolvesTo[0])
                  : null
                if (!evolved) return null
                return (
                  <Card key={animon.id} variant="default" className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      {animon.name} → {evolved.name} Evolution
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Link href={`/animon/${animon.slug}/`} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                        {animon.name}
                      </Link>
                      <span className="text-gray-400">→</span>
                      <Link href={`/animon/${evolved.slug}/`} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100">
                        {evolved.name}
                      </Link>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {capitalize(animon.types[0])}-type → {capitalize(evolved.types[0] || animon.types[0])}-type
                      {animon.evolutionMethod && ` · Method: ${capitalize(animon.evolutionMethod)}`}
                    </p>
                  </Card>
                )
              })}
            </div>
          </section>
        )
      })()}

      {/* Starter Evolution Chains */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Starter Evolution Chains</h2>
        <div className="space-y-4">
          {starters.map((starter) => {
            const evolved = starter.evolvesTo[0]
              ? allAnimon.find(a => a.slug === starter.evolvesTo[0])
              : null

            return (
              <Card key={starter.id} variant="default" className="p-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Link href={`/animon/${starter.slug}/`} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100">
                    {starter.name}
                  </Link>
                  <span className="text-gray-400">→</span>
                  {evolved ? (
                    <Link href={`/animon/${evolved.slug}/`} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100">
                      {evolved.name}
                    </Link>
                  ) : (
                    <span className="px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg text-sm">???</span>
                  )}
                  <span className="text-gray-400">→</span>
                  <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium">
                    Path-dependent (Mythos / Logos)
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {starter.name} ({capitalize(starter.types[0])}/{capitalize(starter.attribute)})
                  → {evolved?.name || '???'} — Final evolution depends on your story path.
                </p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Data Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-semibold text-amber-800 text-sm">Evolution Data — In Progress</h3>
        <p className="text-amber-700 text-sm mt-1">
          Starter second-stage evolutions are confirmed. Final evolutions, exact evolution levels, and evolution methods for wild Animon are still being documented. This guide will be updated as data is verified.
        </p>
      </div>

      {/* Cross-link to best-starter */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
        <span className="text-xl">🎮</span>
        <div>
          <p className="text-sm text-blue-800">Not sure which starter to pick?</p>
          <Link href="/best-starter/" className="text-sm text-blue-600 hover:underline font-medium">
            Compare all 5 starters →
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <RelatedGuides slugs={['best-starter', 'type-chart', 'animon', 'attributes']} />

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Evolution Guide', url: '/evolution-guide/' }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
