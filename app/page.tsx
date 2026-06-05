import type { Metadata } from 'next'
import Link from 'next/link'
import { TypeChip } from '@/components/ui/TypeChip'
import AnimonCard from '@/components/animon/AnimonCard'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateFAQSchema, generateItemListSchema } from '@/lib/seo'
import SearchBox from '@/components/ui/SearchBox'
import { AdsterraNativeBanner } from '@/components/ui/AdsterraNativeBanner'
import { AdsterraDesktopBanner } from '@/components/ui/AdsterraDesktopBanner'
import { AdsterraMobileBanner } from '@/components/ui/AdsterraMobileBanner'
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

  const faqItems = [
    { question: 'What is LumenTale?', answer: 'LumenTale: Memories of Trey is a monster-taming RPG by Beehive Studios (Team17). Released May 26, 2026 on Steam and Nintendo Switch. Explore Talea, collect Animon, and battle in turn-based combat.' },
    { question: 'How many Animon are there?', answer: 'Official sources mention around 140 known species. Our database is growing as data is verified.' },
    { question: 'How many types are in LumenTale?', answer: '13 elemental types: Fire, Water, Grass, Electric, Ice, Geo, Aura, Chakra, Demon, Data, Virus, Ancient, and Anomalous.' },
    { question: 'What are attributes?', answer: 'Each Animon has one of five attributes — Felicis, Mestus, Furor, Horrens, or Sereum — providing an activatable ability that costs SP in battle.' },
    { question: 'Is this site official?', answer: 'No. This is a fan-made companion site, not affiliated with Beehive Studios or Team17.' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <section className="text-center pt-14 pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          LumenTale Database
        </h1>
        <p className="mt-2 text-xl text-amber-600 font-semibold">
          Memories of Trey — Type Chart, Animon &amp; Tools
        </p>
        <p className="mt-4 text-gray-600 max-w-lg mx-auto leading-relaxed">
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

      {/* Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-4">
        <Link href="/evolution-guide/" className="group">
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 hover:border-amber-300 hover:shadow-md transition-all text-center">
            <div className="text-2xl mb-1">🧬</div>
            <div className="font-bold text-gray-900">Evolution Guide</div>
            <div className="text-xs text-gray-600 mt-1">How to evolve every Animon</div>
          </div>
        </Link>
        <Link href="/animon/" className="group">
          <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 hover:border-emerald-300 hover:shadow-md transition-all text-center">
            <div className="text-2xl mb-1">🐾</div>
            <div className="font-bold text-gray-900">Animon List</div>
            <div className="text-xs text-gray-600 mt-1">Browse all documented Animon</div>
          </div>
        </Link>
        <Link href="/best-starter/" className="group">
          <div className="rounded-xl border-2 border-rose-200 bg-rose-50 p-4 hover:border-rose-300 hover:shadow-md transition-all text-center">
            <div className="text-2xl mb-1">🎮</div>
            <div className="font-bold text-gray-900">Best Starter</div>
            <div className="text-xs text-gray-600 mt-1">Which starter should you pick?</div>
          </div>
        </Link>
      </div>

      <AdsterraDesktopBanner />
      <AdsterraMobileBanner />

      {/* Popular Guides — consolidated hub module */}
      <section className="py-6 border-t border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Guides</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: '/evolution-guide/', title: 'Evolution Guide', desc: 'How to evolve every Animon — levels, methods, and chains', emoji: '🧬' },
            { href: '/best-starter/', title: 'Best Starter', desc: 'Compare Mewaii, Vortail, Ozelash, Salabel, and Queccha', emoji: '🎮' },
            { href: '/type-chart/', title: 'Type Chart', desc: 'All 13 elemental types and known Animon by type', emoji: '📊' },
            { href: '/attributes/', title: 'Attributes Guide', desc: 'Felicis, Mestus, Furor, Horrens, Sereum explained', emoji: '✨' },
            { href: '/animon/', title: 'Animon Database', desc: 'Browse all documented Animon with types and attributes', emoji: '🐾' },
            { href: '/locations/', title: 'Map & Locations', desc: 'Regions, Mythos vs Logos, and world systems', emoji: '🗺️' },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="h-full rounded-xl border border-gray-200 bg-white p-4 hover:border-amber-200 hover:bg-amber-50 transition-colors">
                <div className="text-xl mb-1.5">{item.emoji}</div>
                <div className="font-semibold text-sm text-gray-900">{item.title}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Tools strip */}
      <section className="py-3 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tools:</span>
          {[
            { href: '/weakness-calculator/', title: 'Weakness Calculator', emoji: '⚡' },
            { href: '/team-builder/', title: 'Team Builder', emoji: '🛡️' },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-amber-200 hover:bg-amber-50 transition-colors">
              <span>{tool.emoji}</span>
              {tool.title}
            </Link>
          ))}
        </div>
      </section>

      <AdsterraNativeBanner />

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
        <p className="text-xs text-gray-500 mt-2">
          Type names confirmed. Matchup data is tracked as it is verified.
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

      {/* FAQ */}
      <section className="py-8 border-t border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">FAQ</h2>
        <Accordion
          items={faqItems}
        />
        <JsonLd data={generateFAQSchema(faqItems)} />
        <JsonLd data={generateItemListSchema([
          { name: 'Evolution Guide', url: '/evolution-guide/', position: 1 },
          { name: 'Best Starter', url: '/best-starter/', position: 2 },
          { name: 'Type Chart', url: '/type-chart/', position: 3 },
          { name: 'Attributes Guide', url: '/attributes/', position: 4 },
          { name: 'Animon Database', url: '/animon/', position: 5 },
          { name: 'Map & Locations', url: '/locations/', position: 6 },
        ])} />
      </section>
    </div>
  )
}
