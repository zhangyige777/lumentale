import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import RelatedGuides from '@/components/ui/RelatedGuides'
import { TypeChip } from '@/components/ui/TypeChip'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getAllAnimon, getAllTypes } from '@/data'
import NextSteps from '@/components/ui/NextSteps'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Type Chart - All 13 Confirmed Types',
  description: 'Complete LumenTale type chart covering all 13 elemental types — Fire, Water, Grass, Electric, Ice, Geo, Aura, Chakra, Demon, Data, Virus, Ancient, Anomalous. See which Animon belong to each type and plan your team.',
  keywords: ['LumenTale type chart', 'LumenTale types', 'LumenTale weakness chart', 'LumenTale elements', 'LumenTale attributes', 'LumenTale type matchups'],
  path: '/type-chart/',
})

export default function TypeChartPage() {
  const allTypes = getAllTypes()
  const allAnimon = getAllAnimon().filter((animon) => animon.dataStatus !== 'placeholder' && animon.types.length > 0)
  const faqItems = [
    { question: 'How many types are in LumenTale?', answer: 'There are 13 elemental types in LumenTale: Fire, Water, Grass, Electric, Ice, Geo, Aura, Chakra, Demon, Data, Virus, Ancient, and Anomalous.' },
    { question: 'How does type effectiveness work?', answer: 'Type effectiveness determines how much damage a move deals based on the matchup between the attacking type and the defending type. The exact LumenTale matchup multipliers are still being verified.' },
    { question: 'Is the type effectiveness chart complete?', answer: 'Not yet. LumenTale launched on May 26, 2026, and the full type effectiveness data is still being verified. Type names are confirmed, but specific matchup multipliers will be added as they are confirmed through gameplay.' },
    { question: 'Where can I see type weaknesses?', answer: 'Use the Weakness Calculator to select a type and see the currently documented Animon for that type. Exact weakness and resistance results will be added after verification.' },
    { question: 'Where can I browse Animon by type?', answer: 'Visit the Animon Database to search and filter documented Animon by elemental type, attribute, and starter status.' },
    { question: 'Which type has the most Animon?', answer: 'The type distribution is still being documented as more Animon are discovered. Currently, types with starter Animon (Virus, Aura, Electric, Demon, Geo) tend to have more documented entries. Check the "Known Animon by Type" section above for the latest counts.' },
    { question: 'How do types interact with attributes?', answer: 'Types and attributes are independent systems. Types determine offensive and defensive matchups, while attributes (Felicis, Mestus, Furor, Horrens, Sereum) provide activatable abilities that cost SP. An Animon with a strong type matchup AND a well-timed attribute activation can be very effective.' },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Type Chart' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Type Chart</h1>
        <p className="mt-2 text-gray-600">
          All 13 elemental types in LumenTale, plus the documented Animon currently known for each type.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All 13 Types</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {allTypes.map((type) => (
            <div key={type.slug} className={`${type.colorClass} rounded-lg p-3 text-white`}>
              <div className="font-semibold text-sm">{type.name}</div>
              <div className="text-xs text-white/80 mt-1">{type.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 text-sm">Type Effectiveness Status</h3>
        <p className="text-blue-800 text-sm mt-1">
          The 13 type names are confirmed from official sources. Specific effectiveness matchups are not treated as real data yet, so this page focuses on confirmed type names and documented Animon by type.
        </p>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900">Quick Type Planning Guide</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="font-semibold text-gray-900">Use type variety</div>
            <p className="mt-1">Until exact weaknesses are verified, avoid building a team around only one or two types.</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="font-semibold text-gray-900">Pair type with attribute</div>
            <p className="mt-1">Attributes such as Felicis, Mestus, Furor, Horrens, and Sereum can change battle roles even when types overlap.</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="font-semibold text-gray-900">Check documented Animon</div>
            <p className="mt-1">Each type section below links to Animon pages with current evolution and verification notes.</p>
          </div>
        </div>
      </section>

      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Known Animon by Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {allTypes.map((type) => {
            const matches = allAnimon.filter((animon) => animon.types.includes(type.slug))

            return (
              <div key={type.slug} className="rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <TypeChip type={type.slug} size="sm" />
                  <span className="text-xs text-gray-400">{matches.length} documented</span>
                </div>
                {matches.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {matches.map((animon) => (
                      <Link key={animon.slug} href={`/animon/${animon.slug}/`} className="text-xs font-medium text-gray-700 hover:text-amber-700">
                        {animon.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-gray-400">No documented Animon yet.</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-semibold text-amber-800 text-sm">Matchup Multipliers Not Verified</h3>
        <p className="text-amber-700 text-sm mt-1">
          Strengths, weaknesses, and resistances will be added to this chart and the <Link href="/weakness-calculator/" className="text-amber-800 hover:underline font-medium">weakness calculator</Link> only after they are confirmed through reliable gameplay data.
        </p>
      </div>

      {/* Type Strategy */}
      <section className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Type Strategy for Team Building</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>With 13 elemental types, LumenTale rewards teams with diverse type coverage. A well-built team of four Animon should aim to cover at least 6–8 types offensively, so no single opponent type walls your entire team.</p>
          <p>Until exact matchup multipliers are verified, focus on <strong>type variety</strong>: avoid stacking multiple Animon of the same type, and pair types that cover each other&rsquo;s likely weaknesses.</p>
          <p>Don&rsquo;t forget <strong>attributes</strong> — two Animon with the same type but different attributes can serve very different roles in battle. For example, an Electric/Furor Animon (burst damage) plays differently from an Electric/Sereum Animon (crit resource loop).</p>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-emerald-50 rounded-lg p-3">
            <div className="font-semibold text-emerald-800">Aim for variety</div>
            <div className="text-emerald-700 text-xs mt-1">Cover 6–8 types across 4 Animon</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="font-semibold text-blue-800">Pair type + attribute</div>
            <div className="text-blue-700 text-xs mt-1">Same type, different role</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <div className="font-semibold text-amber-800">Use the Team Builder</div>
            <div className="text-amber-700 text-xs mt-1">Check your coverage before heading in</div>
          </div>
        </div>
      </section>

      <NextSteps
        title="Related tools and guides"
        description="Use these to turn type knowledge into a team strategy."
        items={[
          { href: '/weakness-calculator/', title: 'Weakness Calculator', description: 'Check type weaknesses as matchup data is verified.' },
          { href: '/team-builder/', title: 'Team Builder', description: 'Plan your 4-Animon team and check type coverage.' },
          { href: '/attributes/', title: 'Attributes Guide', description: 'Learn how attributes add a second strategic layer.' },
        ]}
      />

      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How Type Planning Works Right Now</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            In LumenTale, every documented Animon has one or two elemental types. Since the exact matchup multipliers are still being verified, current planning should focus on type variety and attribute roles.
          </p>
          <p>
            Use this page to find which Animon are associated with each confirmed type, then use the team builder to avoid stacking too many of the same type.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="font-semibold text-green-800">Confirmed</div>
              <div className="text-green-700 text-xs mt-1">13 type names</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="font-semibold text-blue-800">Documented</div>
              <div className="text-blue-700 text-xs mt-1">Known Animon by type</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3">
              <div className="font-semibold text-amber-800">Pending</div>
              <div className="text-amber-700 text-xs mt-1">Exact matchup multipliers</div>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900">Starter Types at a Glance</h2>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ['Mewaii', 'Virus', 'Felicis'],
            ['Vortail', 'Aura', 'Mestus'],
            ['Ozelash', 'Electric', 'Furor'],
            ['Salabel', 'Demon', 'Horrens'],
            ['Queccha', 'Geo', 'Sereum'],
          ].map(([name, type, attribute]) => (
            <Link key={name} href={`/animon/${name.toLowerCase()}/`} className="rounded-lg border border-gray-200 p-3 hover:border-amber-200 hover:bg-amber-50">
              <div className="font-semibold text-gray-900">{name}</div>
              <div className="mt-1 text-xs text-gray-500">{type} type / {attribute} attribute</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <RelatedGuides slugs={['weakness-calculator', 'team-builder', 'animon', 'attributes']} />

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Type Chart', url: '/type-chart/' }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
