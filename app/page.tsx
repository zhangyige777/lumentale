import type { Metadata } from 'next'
import Link from 'next/link'
import { CardTitle, CardDescription } from '@/components/ui/Card'
import { TypeChip } from '@/components/ui/TypeChip'
import AnimonCard from '@/components/animon/AnimonCard'
import { Accordion } from '@/components/ui/Accordion'
import SearchBox from '@/components/ui/SearchBox'
import { getStarters, getAllAnimon, getSiteStats } from '@/data'
import { getAllTypes } from '@/data'

export const metadata: Metadata = {
  alternates: { canonical: 'https://lumentale.online/' },
}

export default function HomePage() {
  const starters = getStarters()
  const stats = getSiteStats()
  const allTypes = getAllTypes()
  const allAnimon = getAllAnimon()

  const tools = [
    {
      href: '/type-chart/',
      title: 'Type Chart',
      desc: 'Explore all 13 confirmed types. Matchup data is being verified.',
      emoji: '📊',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      cta: 'text-rose-600',
    },
    {
      href: '/weakness-calculator/',
      title: 'Weakness Calculator',
      desc: 'Select types and track verified weakness data as it is added.',
      emoji: '⚡',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      cta: 'text-amber-600',
    },
    {
      href: '/animon/',
      title: 'Animon Database',
      desc: 'Browse every documented Animon with types, attributes, and evolution info.',
      emoji: '🐾',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      cta: 'text-emerald-600',
    },
    {
      href: '/team-builder/',
      title: 'Team Builder',
      desc: 'Plan your team and check type coverage before your next big fight.',
      emoji: '🛡️',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      cta: 'text-sky-600',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <section className="text-center pt-14 pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          LumenTale: Memories of Trey
        </h1>
        <p className="mt-2 text-xl text-amber-500 font-semibold">
          Database &amp; Tools
        </p>
        <p className="mt-4 text-gray-500 max-w-lg mx-auto leading-relaxed">
          The unofficial companion for your journey through Talea. Look up Animon,
          compare starters, check types, and follow verified game data.
        </p>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            {stats.totalTypes} Types
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            {stats.totalAttributes} Attributes
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            {stats.speciesClaim}
          </span>
        </div>

        {/* Search */}
        <div className="mt-6">
          <SearchBox animon={allAnimon} />
        </div>
      </section>

      {/* Tool Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-10">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <div
              className={`rounded-2xl border ${tool.border} ${tool.bg} p-6 hover:shadow-md transition-all cursor-pointer h-full`}
            >
              <div className="text-3xl mb-3">{tool.emoji}</div>
              <CardTitle className="text-lg font-bold text-gray-900">{tool.title}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                {tool.desc}
              </CardDescription>
              <div className={`mt-3 text-sm font-semibold ${tool.cta}`}>Open →</div>
            </div>
          </Link>
        ))}
      </section>

      {/* Types */}
      <section className="py-8 border-t border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Elemental Types</h2>
        <div className="flex flex-wrap gap-2">
          {allTypes.map((type) => (
            <Link key={type.slug} href="/type-chart/">
              <TypeChip type={type.slug} size="sm" />
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Type matchups being verified. Full chart coming soon.
        </p>
      </section>

      {/* Starters */}
      <section className="py-8 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Starter Animon</h2>
          <Link href="/best-starter/" className="text-xs text-amber-600 hover:underline font-medium">
            Compare all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {starters.map((animon) => (
            <AnimonCard key={animon.id} animon={animon} />
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="py-8 border-t border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Getting Started</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/best-starter/', title: 'Best Starter', desc: 'Which one should you pick?' },
            { href: '/evolution-guide/', title: 'Evolution Guide', desc: 'How evolution works' },
            { href: '/sp-tp-explained/', title: 'SP & TP', desc: 'Resource systems' },
            { href: '/attributes/', title: 'Attributes', desc: 'All 5 explained' },
          ].map((g) => (
            <Link key={g.href} href={g.href}>
              <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-amber-200 transition-colors">
                <div className="font-semibold text-sm text-gray-900">{g.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{g.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 border-t border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">FAQ</h2>
        <Accordion
          items={[
            { question: 'What is LumenTale?', answer: 'LumenTale: Memories of Trey is a monster-taming RPG by Beehive Studios (Team17). Released May 26, 2026 on Steam and Nintendo Switch. Explore Talea, collect Animon, and battle in turn-based combat.' },
            { question: 'How many Animon are there?', answer: 'Official sources mention around 140 known species. Our database is growing as data is verified.' },
            { question: 'How many types are in LumenTale?', answer: '13 elemental types: Fire, Water, Grass, Electric, Ice, Geo, Aura, Chakra, Demon, Data, Virus, Ancient, and Anomalous.' },
            { question: 'What are attributes?', answer: 'Each Animon has one of five attributes — Felicis, Mestus, Furor, Horrens, or Sereum — providing an activatable ability that costs SP in battle.' },
            { question: 'Is this site official?', answer: 'No. This is a fan-made companion site, not affiliated with Beehive Studios or Team17.' },
          ]}
        />
      </section>
    </div>
  )
}
