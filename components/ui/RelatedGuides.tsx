import Link from 'next/link'

interface RelatedGuide {
  slug: string
  title: string
  description: string
  href: string
  emoji: string
}

const guideMap: Record<string, RelatedGuide> = {
  'best-starter': { slug: 'best-starter', title: 'Best Starter', description: 'Compare all 5 starters and find your pick', href: '/best-starter/', emoji: '🎮' },
  'evolution-guide': { slug: 'evolution-guide', title: 'Evolution Guide', description: 'How to evolve every Animon', href: '/evolution-guide/', emoji: '🧬' },
  'type-chart': { slug: 'type-chart', title: 'Type Chart', description: 'All 13 elemental types and matchups', href: '/type-chart/', emoji: '📊' },
  'weakness-calculator': { slug: 'weakness-calculator', title: 'Weakness Calculator', description: 'Check type weaknesses for any Animon', href: '/weakness-calculator/', emoji: '⚡' },
  'animon': { slug: 'animon', title: 'Animon Database', description: 'Browse all documented Animon', href: '/animon/', emoji: '🐾' },
  'attributes': { slug: 'attributes', title: 'Attributes Guide', description: 'All 5 battle attributes explained', href: '/attributes/', emoji: '✨' },
  'sp-tp-explained': { slug: 'sp-tp-explained', title: 'SP & TP Explained', description: 'Skill Points and Technical Points', href: '/sp-tp-explained/', emoji: '💡' },
  'team-builder': { slug: 'team-builder', title: 'Team Builder', description: 'Plan your team composition', href: '/team-builder/', emoji: '🛡️' },
  'walkthrough': { slug: 'walkthrough', title: 'Walkthrough Hub', description: 'Guides, tips, and progression', href: '/walkthrough/', emoji: '📖' },
}

interface RelatedGuidesProps {
  slugs: string[]
}

export default function RelatedGuides({ slugs }: RelatedGuidesProps) {
  const guides = slugs
    .map((slug) => guideMap[slug])
    .filter(Boolean)

  if (guides.length === 0) return null

  return (
    <section>
      <h2 className="text-lg font-bold text-gray-900 mb-3">Related Guides</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {guides.map((guide) => (
          <Link key={guide.slug} href={guide.href}>
            <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-amber-200 hover:shadow-sm transition-all h-full">
              <div className="text-xl mb-1.5">{guide.emoji}</div>
              <div className="font-semibold text-sm text-gray-900">{guide.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{guide.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
