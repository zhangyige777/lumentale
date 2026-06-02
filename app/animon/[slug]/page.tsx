import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { TypeChip } from '@/components/ui/TypeChip'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { AdsterraNativeBanner } from '@/components/ui/AdsterraNativeBanner'
import { AdsterraMediumRectangle } from '@/components/ui/AdsterraMediumRectangle'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getAllAnimon, getAnimonBySlug, getEvolutionChain, getAnimonByType, getAnimonByAttribute } from '@/data'
import { capitalize } from '@/lib/utils'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllAnimon().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const animon = getAnimonBySlug(slug)
  if (!animon) return {}

  const typeNames = animon.types.map(capitalize).join(' / ')
  const hasEvolution = animon.evolvesTo.length > 0 || animon.evolvesFrom !== null
  const noIndex = animon.dataStatus === 'placeholder' || animon.dataStatus === 'community' || (animon.types.length === 0 && !hasEvolution)
  const titleSuffix = typeNames
    ? `${typeNames} Type Animon, Evolution & Guide`
    : 'Evolution, Attribute & Guide'
  const title = slug === 'ozelash'
    ? 'Ozelash LumenTale Guide - Type, Evolution, Starter Info & Best Use'
    : `${animon.name} LumenTale - ${titleSuffix}`
  const description = animon.quickAnswer
    || (typeNames
      ? `${animon.name} is a ${typeNames}-type Animon in LumenTale.${hasEvolution ? ` See evolution chain, type, and attribute details.` : ` Learn about its type and attribute.`}`
      : `${animon.name} is a documented Animon in LumenTale.${hasEvolution ? ` See evolution chain and attribute details.` : ` Learn about its current verification status.`}`)

  return generateSEOMetadata({
    title,
    description,
    keywords: [`${animon.name} LumenTale`, `${animon.name} evolution`, `${animon.name} type`, `${animon.name} guide`],
    path: `/animon/${animon.slug}/`,
    noIndex,
  })
}

export default async function AnimonPage({ params }: PageProps) {
  const { slug } = await params
  const animon = getAnimonBySlug(slug)
  if (!animon) notFound()

  const chain = getEvolutionChain(slug)
  const typeNames = animon.types.map(capitalize).join(' / ')
  const hasEvolution = animon.evolvesTo.length > 0 || animon.evolvesFrom !== null
  const noIndex = animon.dataStatus === 'placeholder' || animon.dataStatus === 'community' || (animon.types.length === 0 && !hasEvolution)

  // Get same-type Animon (excluding current)
  const sameTypeAnimon = animon.types.length > 0
    ? getAnimonByType(animon.types[0])
        .filter((a) => a.slug !== slug && a.dataStatus !== 'placeholder' && a.dataStatus !== 'community' && a.types.length > 0)
        .slice(0, 6)
    : []

  const faqItems = [
    {
      question: `What type is ${animon.name} in LumenTale?`,
      answer: typeNames
        ? `${animon.name} is a ${typeNames}-type Animon${animon.attribute ? ` with the ${capitalize(animon.attribute)} attribute` : ''}.`
        : `${animon.name}'s type is not verified yet${animon.attribute ? `, but its ${capitalize(animon.attribute)} attribute is documented` : ''}.`,
    },
    { question: `How do I evolve ${animon.name}?`, answer: animon.evolvesTo.length > 0 ? `${animon.name} evolves into ${animon.evolvesTo.map(capitalize).join(', ')}. The exact evolution method is still being verified.` : `Evolution data for ${animon.name} is not yet available.` },
    { question: `Is ${animon.name} a starter?`, answer: animon.isStarter ? `Yes, ${animon.name} is one of the five starter Animon you can choose at the beginning of LumenTale.` : `No, ${animon.name} is not a starter Animon.` },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Animon', href: '/animon/' }, { label: animon.name }]} />

      {/* Data Status Banner */}
      {noIndex && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-600">
          This page is not yet indexed because data needs further verification.
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{animon.name}</h1>
            {animon.isStarter && <Badge variant="primary" size="sm">Starter</Badge>}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {animon.types.map((type) => (
              <TypeChip key={type} type={type} size="md" href="/type-chart/" />
            ))}
            {animon.attribute && (
              <Badge variant="default" size="md">{capitalize(animon.attribute)} Attribute</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Quick Answer */}
      {animon.quickAnswer && (
        <Card variant="default" className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Quick Answer</h2>
          <p className="text-gray-900">{animon.quickAnswer}</p>
        </Card>
      )}

      {/* Ozelash Special Sections */}
      {slug === 'ozelash' && (
        <div className="space-y-6">
          <Card variant="default" className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">How to Evolve Ozelash</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Ozelash evolves into Kouzear. The exact evolution level and method are still being verified through gameplay.</p>
              <p>As a starter Animon, Ozelash also has a path-dependent final evolution that changes based on whether you follow the Mythos or Logos story path.</p>
              <p><Link href="/evolution/ozelash/" className="text-amber-600 hover:underline">View full Ozelash evolution details →</Link></p>
            </div>
          </Card>
          <Card variant="default" className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Is Ozelash a Good Starter?</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Ozelash is the best pick for players who prefer aggressive, damage-focused gameplay. Its Furor attribute directly boosts move damage, making it effective from early battles through late-game encounters.</p>
              <p><strong>Pros:</strong> High damage output, straightforward playstyle, Electric-type moves are strong.</p>
              <p><strong>Cons:</strong> Less sustain than Mewaii, no defensive tools like Vortail.</p>
              <p><Link href="/best-starter/" className="text-amber-600 hover:underline">Compare all 5 starters →</Link></p>
            </div>
          </Card>
          <Card variant="default" className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Ozelash Type and Attribute</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Electric type:</strong> Electric-type Animon have type-based strengths and weaknesses that are still being mapped. Check the <Link href="/type-chart/" className="text-amber-600 hover:underline">type chart</Link> for the latest matchups.</p>
              <p><strong>Furor attribute:</strong> Furor increases the damage of the move used when activated. This makes Ozelash ideal for burst damage strategies and aggressive playstyles. Activation costs SP.</p>
              <p><Link href="/attributes/" className="text-amber-600 hover:underline">Learn about all 5 attributes →</Link></p>
            </div>
          </Card>
        </div>
      )}

      <AdsterraNativeBanner />

      {/* Description */}
      <Card variant="default" className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">About {animon.name}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{animon.description}</p>
      </Card>

      {/* Stats */}
      <Card variant="default" className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Base Stats</h2>
        {animon.stats.hp === null ? (
          <div>
            <p className="text-sm text-gray-500">Base stats for {animon.name} have not been verified yet.</p>
            <p className="text-xs text-gray-400 mt-1">Stats (HP, Attack, Defense, Sp. Attack, Sp. Defense, Speed) will be added once confirmed through gameplay data.</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'].map((stat) => (
                <div key={stat} className="bg-gray-50 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-400">{stat}</div>
                  <div className="text-sm text-gray-300 font-medium">&mdash;</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {[
              { label: 'HP', value: animon.stats.hp },
              { label: 'Attack', value: animon.stats.attack },
              { label: 'Defense', value: animon.stats.defense },
              { label: 'Sp. Attack', value: animon.stats.spAttack },
              { label: 'Sp. Defense', value: animon.stats.spDefense },
              { label: 'Speed', value: animon.stats.speed },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-20">{stat.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-amber-500 rounded-full h-2"
                    style={{ width: stat.value ? `${Math.min((stat.value / 200) * 100, 100)}%` : '0%' }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 w-8 text-right">{stat.value ?? '?'}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <AdsterraMediumRectangle />

      {/* Evolution Chain */}
      {chain.length > 1 && (
        <Card variant="default" className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{slug === 'ozelash' ? 'Ozelash Evolution Chain' : 'Evolution Chain'}</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {chain.map((stage, i) => (
              <div key={stage.slug} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-400">→</span>}
                <Link
                  href={`/animon/${stage.slug}/`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    stage.slug === slug
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {stage.name}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Starter final evolutions depend on the Mythos or Logos path chosen in the story.
          </p>
          {animon.evolutionMethod && (
            <p className="text-xs text-gray-500 mt-2">
              Evolution method: {capitalize(animon.evolutionMethod.replace(/-/g, ' '))}
              {animon.evolutionLevel && ` at level ${animon.evolutionLevel}`}
            </p>
          )}
        </Card>
      )}

      {/* Location */}
      <Card variant="default" className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</h2>
        <p className="text-sm text-gray-500">Location encounter data for {animon.name} is pending verification.</p>
        <Link href="/locations/" className="text-xs text-amber-600 hover:underline mt-1 inline-block">
          View all locations &rarr;
        </Link>
      </Card>

      {/* Source Info */}
      <Card variant="default" className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Data Sources</h2>
        <ul className="space-y-1">
          {animon.sources.map((source, i) => (
            <li key={i} className="text-xs text-gray-500">
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
                {source.label}
              </a>
              {source.note && <span className="text-gray-400"> — {source.note}</span>}
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-400 mt-2">Last verified: {animon.verifiedAt}</p>
        {animon.notes && <p className="text-xs text-gray-400">{animon.notes}</p>}
      </Card>

      {/* FAQ */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      {/* Same Type Animon */}
      {sameTypeAnimon.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Other {typeNames}-type Animon
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {sameTypeAnimon.map((a) => (
              <Link key={a.id} href={`/animon/${a.slug}/`}>
                <div className="rounded-xl border border-gray-200 bg-white p-3 hover:border-amber-200 hover:shadow-sm transition-all">
                  <div className="font-semibold text-sm text-gray-900">{a.name}</div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {a.types.map((type) => (
                      <TypeChip key={type} type={type} size="sm" />
                    ))}
                  </div>
                  {a.attribute && (
                    <span className="text-xs text-gray-400 mt-1 inline-block">{capitalize(a.attribute)}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Same Attribute Animon (for untyped) */}
      {animon.types.length === 0 && animon.attribute && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Other {capitalize(animon.attribute)}-attribute Animon
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {getAnimonByAttribute(animon.attribute)
              .filter((a) => a.slug !== slug && a.dataStatus !== 'placeholder' && a.dataStatus !== 'community')
              .slice(0, 6)
              .map((a) => (
                <Link key={a.id} href={`/animon/${a.slug}/`}>
                  <div className="rounded-xl border border-gray-200 bg-white p-3 hover:border-amber-200 hover:shadow-sm transition-all">
                    <div className="font-semibold text-sm text-gray-900">{a.name}</div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {a.types.map((type) => (
                        <TypeChip key={type} type={type} size="sm" />
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* Back to Database */}
      <div className="pt-4">
        <Link href="/animon/" className="text-amber-600 hover:underline text-sm">
          ← Back to Animon Database
        </Link>
      </div>

      <JsonLd data={generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Animon Database', url: '/animon/' },
        { name: animon.name, url: `/animon/${animon.slug}/` },
      ])} />
      {!noIndex && <JsonLd data={generateFAQSchema(faqItems)} />}
    </div>
  )
}
