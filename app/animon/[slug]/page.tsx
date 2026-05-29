import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { TypeChip } from '@/components/ui/TypeChip'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import { getAllAnimon, getAnimonBySlug, getEvolutionChain } from '@/data'
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
  const title = `${animon.name} LumenTale — ${typeNames} Type, Stats, Evolution & Location`
  const noIndex = animon.dataStatus === 'placeholder' || animon.dataStatus === 'community' || animon.types.length === 0

  return generateSEOMetadata({
    title,
    description: animon.quickAnswer || `${animon.name} is a ${typeNames} Animon in LumenTale. View stats, evolution, moves, and more.`,
    keywords: [`${animon.name} LumenTale`, `${animon.name} weakness`, `${animon.name} evolution`, `${animon.name} stats`],
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
  const noIndex = animon.dataStatus === 'placeholder' || animon.dataStatus === 'community' || animon.types.length === 0

  const faqItems = [
    { question: `What type is ${animon.name} in LumenTale?`, answer: `${animon.name} is a ${typeNames}-type Animon${animon.attribute ? ` with the ${capitalize(animon.attribute)} attribute` : ''}.` },
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

      {/* Description */}
      <Card variant="default" className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">About {animon.name}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{animon.description}</p>
      </Card>

      {/* Stats */}
      <Card variant="default" className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Base Stats</h2>
        {animon.stats.hp === null ? (
          <p className="text-sm text-gray-400 italic">Stats not yet verified.</p>
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

      {/* Evolution Chain */}
      {chain.length > 1 && (
        <Card variant="default" className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Evolution Chain</h2>
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
        </Card>
      )}

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
