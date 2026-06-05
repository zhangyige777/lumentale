import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { Accordion } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { JsonLd } from '@/components/seo/JsonLd'
import RelatedGuides from '@/components/ui/RelatedGuides'
import NextSteps from '@/components/ui/NextSteps'
import { AdsterraNativeBanner } from '@/components/ui/AdsterraNativeBanner'
import { AdsterraMediumRectangle } from '@/components/ui/AdsterraMediumRectangle'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getStarters, getAllAnimon, getEvolutionChain } from '@/data'
import { capitalize } from '@/lib/utils'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Evolution Guide — How to Evolve Every Animon',
  description: 'Complete LumenTale evolution guide with every evolution chain, level requirements, methods, and path-dependent starter evolutions. Covers Mewaii, Vortail, Ozelash, Salabel, Queccha and wild Animon.',
  keywords: ['LumenTale evolution guide', 'LumenTale how to evolve', 'LumenTale starter evolutions', 'LumenTale evolution', 'LumenTale evolution levels', 'how to evolve Mewaii', 'how to evolve Ozelash'],
  path: '/evolution-guide/',
})

export default function EvolutionGuidePage() {
  const starters = getStarters()
  const allAnimon = getAllAnimon()
  const popularEvolutionSlugs = ['salabel', 'boobat', 'owaxle', 'mollupom', 'vortail', 'mewaii', 'ozelash']
  const popularEvolutions = popularEvolutionSlugs
    .map((slug) => allAnimon.find((animon) => animon.slug === slug))
    .filter(Boolean)

  const faqItems = [
    { question: 'How does evolution work in LumenTale?', answer: 'Animon evolve through various methods including leveling up. Starter Animon have path-dependent final evolutions that differ based on whether you choose the Mythos or Logos story path.' },
    { question: 'Do starter evolutions depend on story choices?', answer: 'Yes! Official sources confirm that starter final evolutions differ based on the Mythos or Logos path you follow in the story.' },
    { question: 'What are the starter second-stage evolutions?', answer: 'Mewaii → Maidelly, Vortail → Furtex, Ozelash → Kouzear, Salabel → Vilender, Queccha → Quequator. These are confirmed via Steam news.' },
    { question: 'How many evolution stages are there?', answer: 'Starters have at least 3 stages (base, second stage, and a path-dependent final stage). Exact evolution methods and additional stages for wild Animon are still being documented.' },
    { question: 'Do hidden types matter for evolution?', answer: 'Yes. Developer AMA/community leads indicate that some Animon can require a hidden type to evolve. Mollupom into Obsidedge is currently tracked as a partial hidden-type evolution lead, while exact level requirements remain unverified.' },
    { question: 'What is a hidden type evolution?', answer: 'Some Animon have a hidden type that is not immediately visible. When certain conditions involving this hidden type are met, the Animon can evolve into a different form. Developer AMA leads indicate Prismatype can help reveal or grant hidden types.' },
    { question: 'Does attribute affect evolution?', answer: 'The direct link between attributes and evolution is not confirmed. However, attributes determine battle role and resource mechanics (SP/TP), which may indirectly influence when and how efficiently you can level an Animon.' },
    { question: 'What level does Mewaii evolve?', answer: 'Mewaii evolves into Maidelly. The exact level is still being verified through gameplay. As a starter, Mewaii also has a path-dependent final evolution that changes based on the Mythos or Logos story path.' },
    { question: 'How to evolve Mushwick into Owaxle?', answer: 'Mushwick evolves into Owaxle. The specific evolution method and level requirement are still being documented. Check the evolution data table above for the latest verification status.' },
    { question: 'What are the starter second-stage evolutions?', answer: 'All five starter second-stage evolutions are confirmed: Mewaii → Maidelly, Vortail → Furtex, Ozelash → Kouzear, Salabel → Vilender, and Queccha → Quequator. Each starter also has a path-dependent final evolution.' },
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

      {/* Quick Answer */}
      <Card variant="default" className="p-4 md:p-6 bg-amber-50 border-amber-200">
        <p className="text-sm text-gray-700">
          In LumenTale, Animon can evolve by level, story path, hidden type, items, or special conditions. This page tracks every verified evolution method, level, and requirement.
        </p>
      </Card>

      {/* Table of Contents */}
      <nav className="rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">On this page</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            { href: '#verified-snapshot', label: 'Verified Snapshot' },
            { href: '#popular-evolutions', label: 'Popular Evolutions' },
            { href: '#evolution-levels', label: 'Evolution Levels' },
            { href: '#how-evolution-works', label: 'How Evolution Works' },
            { href: '#how-to-evolve', label: 'How to Evolve Animon' },
            { href: '#evolution-chains', label: 'Evolution Chains' },
            { href: '#evolution-data', label: 'Evolution Data Table' },
            { href: '#wild-animon', label: 'Wild Animon Evolutions' },
            { href: '#starter-evolutions', label: 'Starter Final Evolutions' },
            { href: '#hidden-types', label: 'Hidden Type Evolutions' },
            { href: '#faq', label: 'FAQ' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="verified-snapshot" className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <h2 className="text-lg font-semibold text-emerald-950">Verified Evolution Snapshot</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-emerald-900 md:grid-cols-3">
          <div>
            <div className="font-semibold">Starter second stages</div>
            <p className="mt-1">Mewaii, Vortail, Ozelash, Salabel, and Queccha each have a documented second-stage evolution.</p>
          </div>
          <div>
            <div className="font-semibold">Final starter forms</div>
            <p className="mt-1">Official information confirms final starter evolutions depend on the Mythos or Logos story path.</p>
          </div>
          <div>
            <div className="font-semibold">Wild Animon chains</div>
            <p className="mt-1">Chains such as Mushwick to Owaxle and Flowende to Flobesque are tracked separately from unverified level data.</p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="popular-evolutions" className="text-lg font-semibold text-gray-900">Popular Evolution Searches</h2>
            <p className="text-sm text-gray-500">Jump straight to the evolution pages players are searching for today.</p>
          </div>
          <Link href="/animon/" className="text-sm font-medium text-amber-700 hover:underline">
            Browse all Animon
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {popularEvolutions.map((animon) => (
            <Link
              key={animon!.slug}
              href={`/evolution/${animon!.slug}/`}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-800"
            >
              {animon!.name} evolution
            </Link>
          ))}
        </div>
      </section>

      <NextSteps
        title="Most Useful Evolution Follow-ups"
        description="Keep these open while comparing evolution chains and starter choices."
        items={[
          { href: '/best-starter/', title: 'Starter Final Evolutions', description: 'Compare all starters before choosing your path.' },
          { href: '/animon/', title: 'All Animon List', description: 'Look up types, attributes, and documented chains.' },
          { href: '/team-builder/', title: 'Build Around Evolutions', description: 'Plan type coverage around your evolving team.' },
        ]}
      />

      {/* Evolution Levels */}
      <Card variant="default" className="p-4 md:p-6">
        <h2 id="evolution-levels" className="text-lg font-semibold text-gray-900 mb-3">LumenTale Evolution Levels</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>Evolution levels for each Animon are listed in the table below. Most exact levels are still being verified through gameplay. As more data is confirmed, this table will be updated.</p>
          <p>This guide separates confirmed evolution chains from unverified levels so players can still plan teams without treating guesses as real data.</p>
        </div>
      </Card>

      {/* Evolution Mechanics */}
      <Card variant="default" className="p-4 md:p-6">
        <h2 id="how-evolution-works" className="text-lg font-semibold text-gray-900 mb-3">How Evolution Works</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>Animon in LumenTale can evolve through several distinct methods. Understanding which method applies to your Animon is key to planning your team.</p>
          <p><strong>Level-Up:</strong> The most common evolution method. Most Animon evolve simply by gaining battle experience and reaching a specific level. Battle wild Animon and trainers to earn XP, and use Discovery bonuses at Points of Interest to speed up the process.</p>
          <p><strong>Story Path:</strong> Official Steam news confirms that starter final evolutions depend on whether you follow the Mythos or Logos story path. This means your starter&apos;s ultimate form is influenced by story choices, not just leveling. Each starter has at least two possible final forms.</p>
          <p><strong>Hidden Type:</strong> Some Animon require a hidden type to evolve. Developer AMA leads indicate that Prismatype can help reveal or grant hidden types. For example, Mollupom evolves into Obsidedge through a hidden type condition. Hidden types are not immediately visible on an Animon&apos;s profile.</p>
          <p><strong>Attribute Influence:</strong> The attribute system (Felicis, Mestus, Furor, Horrens, Sereum) determines battle role and resource mechanics like SP and TP. While a direct link between attributes and evolution is not confirmed, attributes may indirectly influence when and how efficiently you can level an Animon toward its evolution threshold.</p>
          <p><strong>Discovery Bonuses:</strong> Discovering Points of Interest gives bonus experience to Animon, which can speed up evolution through any of the above methods.</p>
        </div>
      </Card>

      <AdsterraNativeBanner />

      {/* How to Evolve Animon */}
      <Card variant="default" className="p-4 md:p-6">
        <h2 id="how-to-evolve" className="text-lg font-semibold text-gray-900 mb-3">How to Evolve Animon</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>To evolve an Animon in LumenTale, you typically need to level it up through battles. Some Animon have specific evolution requirements beyond just reaching a certain level.</p>
          <p><strong>Leveling Up:</strong> The primary method. Battle wild Animon and trainers to earn experience points. Some evolutions may require reaching a specific level.</p>
          <p><strong>Story Path:</strong> Starter Animon have final evolutions that change based on whether you follow the Mythos or Logos path in the story.</p>
          <p><strong>Other Methods:</strong> Some Animon may have special evolution conditions. These are still being documented as the game is explored.</p>
        </div>
      </Card>

      <AdsterraMediumRectangle />

      {/* Complete Evolution Chain Table */}
      <section>
        <h2 id="evolution-chains" className="text-xl font-bold text-gray-900 mb-3">Complete Evolution Chain Table</h2>
        <p className="text-sm text-gray-600 mb-4">
          Every documented evolution chain in LumenTale. Starter chains are listed first, followed by wild Animon chains. Each name links to its full Animon page.
        </p>
        {(() => {
          // Collect all base Animon (those with no evolvesFrom) that have evolution chains
          const allChains: { base: typeof allAnimon[0]; chain: typeof allAnimon }[] = []
          const seen = new Set<string>()

          // Starter chains first
          starters.forEach((starter) => {
            const chain = getEvolutionChain(starter.slug)
            if (chain.length >= 2) {
              allChains.push({ base: starter, chain })
              chain.forEach((a) => seen.add(a.slug))
            }
          })

          // Wild chains
          allAnimon
            .filter((a) =>
              !a.isStarter &&
              a.dataStatus !== 'placeholder' &&
              a.dataStatus !== 'community' &&
              a.evolvesTo.length > 0 &&
              !seen.has(a.slug)
            )
            .forEach((animon) => {
              const chain = getEvolutionChain(animon.slug)
              if (chain.length >= 2 && !seen.has(chain[0].slug)) {
                allChains.push({ base: chain[0], chain })
                chain.forEach((a) => seen.add(a.slug))
              }
            })

          if (allChains.length === 0) return null

          return (
            <div className="space-y-3">
              {allChains.map(({ base, chain }) => (
                <div
                  key={base.slug}
                  className="flex items-center gap-2 flex-wrap rounded-lg border border-gray-200 bg-white px-4 py-3"
                >
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-16 shrink-0">
                    {base.isStarter ? 'Starter' : 'Wild'}
                  </span>
                  {chain.map((animon, i) => (
                    <span key={animon.slug} className="flex items-center gap-2">
                      {i > 0 && <span className="text-gray-300">→</span>}
                      <Link
                        href={`/animon/${animon.slug}/`}
                        className={`px-2.5 py-1 rounded text-sm font-medium ${
                          i === 0
                            ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                            : i === chain.length - 1
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                        }`}
                      >
                        {animon.name}
                      </Link>
                      {animon.evolutionMethod === 'hidden_type' && (
                        <span className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">hidden type</span>
                      )}
                    </span>
                  ))}
                  {base.isStarter && chain.length >= 2 && (
                    <span className="text-xs text-gray-500 italic ml-1">
                      (Mythos / Logos final form)
                    </span>
                  )}
                </div>
              ))}
            </div>
          )
        })()}
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Detailed Evolution Pages</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {allAnimon
            .filter((animon) => {
              if (animon.dataStatus === 'placeholder' || animon.dataStatus === 'community') return false
              return animon.evolvesTo.length > 0 || animon.evolvesFrom !== null || Boolean(animon.evolutionMethod)
            })
            .map((animon) => (
              <Link
                key={animon.slug}
                href={`/evolution/${animon.slug}/`}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-amber-200 hover:text-amber-700"
              >
                {animon.name}
              </Link>
            ))}
        </div>
      </section>

      {/* Evolution Table */}
      <section>
        <h2 id="evolution-data" className="text-xl font-bold text-gray-900 mb-3">Evolution Data Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="px-3 py-2.5 border-b">Animon</th>
                <th className="px-3 py-2.5 border-b">Evolves Into</th>
                <th className="px-3 py-2.5 border-b">Level</th>
                <th className="px-3 py-2.5 border-b">Method</th>
                <th className="px-3 py-2.5 border-b">Requirement</th>
                <th className="px-3 py-2.5 border-b">Status</th>
                <th className="px-3 py-2.5 border-b">Last Verified</th>
              </tr>
            </thead>
            <tbody>
              {allAnimon
                .filter((animon) => {
                  if (animon.dataStatus === 'placeholder' || animon.dataStatus === 'community') return false
                  return animon.evolvesTo.length > 0 || animon.evolvesFrom !== null || Boolean(animon.evolutionMethod)
                })
                .map((animon) => (
                  <tr key={animon.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-3 py-2.5 font-medium">
                      <Link href={`/animon/${animon.slug}/`} className="text-amber-700 hover:underline">
                        {animon.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5">
                      {animon.evolvesTo.length > 0
                        ? animon.evolvesTo.map((slug, i) => {
                            const evolved = allAnimon.find(a => a.slug === slug)
                            return (
                              <span key={slug}>
                                {i > 0 && ', '}
                                <Link href={`/animon/${slug}/`} className="text-amber-700 hover:underline">
                                  {evolved?.name || slug}
                                </Link>
                              </span>
                            )
                          })
                        : '—'}
                    </td>
                    <td className="px-3 py-2.5">{animon.evolutionLevel != null ? animon.evolutionLevel : 'Not verified yet'}</td>
                    <td className="px-3 py-2.5">{animon.evolutionMethod ? capitalize(animon.evolutionMethod) : (animon.isStarter ? 'Story path' : 'Level-up likely')}</td>
                    <td className="px-3 py-2.5">{animon.isStarter ? 'Story path choice' : (animon.evolvesTo.length > 0 ? 'Confirmed second stage' : 'Being verified')}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant={animon.dataStatus === 'confirmed' ? 'success' : 'warning'} size="sm">
                        {capitalize(animon.dataStatus)}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-gray-500">{animon.verifiedAt}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

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
            <h2 id="wild-animon" className="text-xl font-bold text-gray-900 mb-3">Wild Animon Evolutions</h2>
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

      {/* Starter Final Evolutions */}
      <section>
        <h2 id="starter-evolutions" className="text-xl font-bold text-gray-900 mb-3">Starter Final Evolutions</h2>
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

      {/* Hidden Type Evolution Requirements */}
      <Card variant="default" className="p-4 md:p-6">
        <h2 id="hidden-types" className="text-lg font-semibold text-gray-900 mb-3">Hidden Type Evolution Requirements</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>Some Animon may require specific hidden type conditions or special items to evolve. Developer AMA/community leads say Prismatype can help an Animon gain a hidden type.</p>
          <p><strong>Mollupom → Obsidedge:</strong> currently tracked as a partial hidden-type evolution lead. The exact level is not treated as verified yet.</p>
          <p>As the community explores LumenTale, verified requirements will be added to the evolution table above.</p>
        </div>
      </Card>

      {/* Data Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-semibold text-amber-800 text-sm">Evolution Method Status</h3>
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

      {/* Cross-links before FAQ */}
      <NextSteps
        title="Related Guides"
        description="These pages pair well with the evolution guide."
        items={[
          { href: '/type-chart/', title: 'Type Chart', description: 'All 13 elemental types and known Animon by type.' },
          { href: '/best-starter/', title: 'Best Starter', description: 'Compare all 5 starters and their evolution paths.' },
          { href: '/attributes/', title: 'Attributes Guide', description: 'Learn how attributes affect battle and leveling.' },
        ]}
      />

      {/* FAQ */}
      <section>
        <h2 id="faq" className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <div className="text-xs text-gray-500 py-4 border-t border-gray-100">
        <p>Last verified: June 2, 2026 · Data status: Partial — Evolution levels and methods are being documented as gameplay data is confirmed.</p>
      </div>

      <RelatedGuides slugs={['best-starter', 'type-chart', 'animon', 'attributes']} />

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Evolution Guide', url: '/evolution-guide/' }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
