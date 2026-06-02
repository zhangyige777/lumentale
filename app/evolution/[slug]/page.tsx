import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { TypeChip } from '@/components/ui/TypeChip'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getAllAnimon, getAnimonBySlug, getEvolutionChain } from '@/data'
import { capitalize } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

function getEvolutionPageEntries() {
  return getAllAnimon().filter((animon) => {
    if (animon.dataStatus === 'placeholder' || animon.dataStatus === 'community') return false
    return animon.evolvesTo.length > 0 || animon.evolvesFrom !== null || Boolean(animon.evolutionMethod)
  })
}

export async function generateStaticParams() {
  return getEvolutionPageEntries().map((animon) => ({ slug: animon.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const animon = getAnimonBySlug(slug)
  if (!animon) return {}

  const noIndex = animon.dataStatus === 'placeholder' || animon.dataStatus === 'community'
  const target = animon.evolvesTo.length > 0 ? getAnimonBySlug(animon.evolvesTo[0]) : null
  const description = target
    ? `${animon.name} evolves into ${target.name} in LumenTale. See the known evolution chain, type, attribute, and current method verification status.`
    : `See the known evolution data for ${animon.name} in LumenTale, including type, attribute, and current method verification status.`

  return generateSEOMetadata({
    title: `${animon.name} Evolution in LumenTale - Chain, Method & Details`,
    description,
    keywords: [`${animon.name} evolution`, `${animon.name} LumenTale evolution`, `how to evolve ${animon.name}`, 'LumenTale evolution'],
    path: `/evolution/${animon.slug}/`,
    noIndex,
  })
}

export default async function EvolutionDetailPage({ params }: PageProps) {
  const { slug } = await params
  const animon = getAnimonBySlug(slug)
  if (!animon) notFound()

  const chain = getEvolutionChain(slug)
  const pageEntries = getEvolutionPageEntries()
  const target = animon.evolvesTo.length > 0 ? getAnimonBySlug(animon.evolvesTo[0]) : null
  const previous = animon.evolvesFrom ? getAnimonBySlug(animon.evolvesFrom) : null
  const methodLabel = animon.evolutionMethod ? capitalize(animon.evolutionMethod.replace('-', ' ')) : 'Not verified yet'
  const levelLabel = animon.evolutionLevel ? `Level ${animon.evolutionLevel}` : 'Not verified yet'

  const faqItems = [
    {
      question: `What does ${animon.name} evolve into?`,
      answer: target ? `${animon.name} evolves into ${target.name}.` : `${animon.name} does not have a verified next evolution in the current dataset.`,
    },
    {
      question: `How do I evolve ${animon.name}?`,
      answer: animon.evolutionMethod ? `${animon.name}'s documented evolution method is ${methodLabel}. The exact level or special condition may still need verification.` : `The exact evolution method for ${animon.name} is not verified yet.`,
    },
    {
      question: `Is ${animon.name}'s evolution data complete?`,
      answer: 'No. This page only uses documented data. Missing levels, final forms, and special conditions are labeled as not verified instead of being guessed.',
    },
    {
      question: `What level does ${animon.name} evolve?`,
      answer: levelLabel !== 'Not verified yet' ? `${animon.name} evolves at level ${animon.evolutionLevel}.` : `The exact evolution level for ${animon.name} has not been confirmed yet. This page will be updated when reliable data is available.`,
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Evolution Guide', href: '/evolution-guide/' }, { label: `${animon.name} Evolution` }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{animon.name} Evolution</h1>
        <p className="mt-2 text-gray-600">
          Known evolution chain, method status, type, and attribute data for {animon.name} in LumenTale.
        </p>
      </div>

      <Card variant="default" className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Answer</h2>
        <p className="text-sm text-gray-600">
          {target
            ? `${animon.name} evolves into ${target.name}.`
            : previous
              ? `${animon.name} evolves from ${previous.name}.`
              : `${animon.name} has evolution-related data, but no verified next form is listed yet.`}
          {' '}Exact evolution level and special conditions are shown only when verified.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/animon/${animon.slug}/`} className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-amber-200 hover:text-amber-700">
            View {animon.name} details
          </Link>
          {target && (
            <Link href={`/animon/${target.slug}/`} className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-amber-200 hover:text-amber-700">
              View {target.name} details
            </Link>
          )}
          <Link href="/evolution-guide/" className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-amber-200 hover:text-amber-700">
            All evolution pages
          </Link>
        </div>
      </Card>

      <Link href="/evolution-guide/" className="text-sm text-amber-600 hover:underline font-medium">
        View the full LumenTale evolution guide for all evolution levels and requirements.
      </Link>

      <Card variant="default" className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Evolution Chain</h2>
        {chain.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3">
            {chain.map((entry, index) => (
              <div key={entry.slug} className="flex items-center gap-3">
                {index > 0 && <span className="text-gray-300">-&gt;</span>}
                <Link href={`/animon/${entry.slug}/`} className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${entry.slug === animon.slug ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-gray-200 bg-white text-gray-700 hover:border-amber-200'}`}>
                  {entry.name}
                </Link>
              </div>
            ))}
            {animon.isStarter && (
              <>
                <span className="text-gray-300">-&gt;</span>
                <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
                  Mythos / Logos final form
                </span>
              </>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No verified chain is available yet.</p>
        )}
      </Card>

      {animon.isStarter && (
        <Card variant="default" className="p-4 bg-amber-50 border-amber-200">
          <h3 className="text-sm font-semibold text-amber-900 mb-2">Path-Dependent Final Evolution</h3>
          <p className="text-sm text-amber-800">
            {animon.name} is a starter Animon. Its final evolution depends on whether you choose the Mythos or Logos story path.
            The second-stage evolution ({animon.evolvesTo.length > 0 ? getAnimonBySlug(animon.evolvesTo[0])?.name || 'its next form' : 'its next form'}) is confirmed, but the ultimate form has not been documented yet.
          </p>
          <div className="mt-2 flex gap-2">
            <Link href="/best-starter/" className="text-xs text-amber-700 hover:underline">Compare all starters</Link>
            <Link href="/evolution-guide/" className="text-xs text-amber-700 hover:underline">Full evolution guide</Link>
          </div>
        </Card>
      )}

      {animon.evolutionMethod === 'hidden-type' && (
        <Card variant="default" className="p-4 bg-purple-50 border-purple-200">
          <h3 className="text-sm font-semibold text-purple-900 mb-2">Hidden Type Evolution</h3>
          <p className="text-sm text-purple-800">
            {animon.name} requires a hidden type to evolve. Developer AMA leads suggest Prismatype can help an Animon gain a hidden type. The exact requirements are still being verified.
          </p>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card variant="default" className="p-4">
          <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Method</div>
          <div className="text-sm font-semibold text-gray-900 mt-1">{methodLabel}</div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Level</div>
          <div className="text-sm font-semibold text-gray-900 mt-1">{levelLabel}</div>
        </Card>
        <Card variant="default" className="p-4">
          <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Data Status</div>
          <Badge variant={animon.dataStatus === 'confirmed' ? 'success' : 'warning'} className="mt-2">
            {capitalize(animon.dataStatus)}
          </Badge>
        </Card>
      </div>

      <Card variant="default" className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{animon.name} Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-700 mb-2">Type</div>
            <div className="flex flex-wrap gap-1.5">
              {animon.types.length > 0 ? animon.types.map((type) => <TypeChip key={type} type={type} size="sm" />) : <span className="text-gray-400">Not verified yet</span>}
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-2">Attribute</div>
            <div className="text-gray-600">{capitalize(animon.attribute)}</div>
          </div>
        </div>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="font-semibold text-blue-900 text-sm">Verified-data note</h2>
        <p className="text-blue-800 text-sm mt-1">
          This page is generated from the current LumenTale database. It is useful for searchers asking about evolution, while unknown levels, final forms, and conditions remain clearly labeled.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">More Evolution Pages</h2>
        {(() => {
          const others = pageEntries.filter((entry) => entry.slug !== animon.slug)
          const starters = others.filter((entry) => entry.isStarter)
          const wild = others.filter((entry) => !entry.isStarter)
          return (
            <>
              {starters.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Starter Evolutions</h3>
                  <div className="flex flex-wrap gap-2">
                    {starters.map((entry) => (
                      <Link key={entry.slug} href={`/evolution/${entry.slug}/`} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-amber-200 hover:text-amber-700">
                        {entry.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {wild.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Wild Animon Evolutions</h3>
                  <div className="flex flex-wrap gap-2">
                    {wild.map((entry) => (
                      <Link key={entry.slug} href={`/evolution/${entry.slug}/`} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-amber-200 hover:text-amber-700">
                        {entry.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )
        })()}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Evolution Guide', url: '/evolution-guide/' }, { name: `${animon.name} Evolution`, url: `/evolution/${animon.slug}/` }])} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
