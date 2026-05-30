import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Card } from '@/components/ui/Card'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateSEOMetadata, generateBreadcrumbSchema, generateWebApplicationSchema, generateFAQSchema } from '@/lib/seo'
import { getAllAnimon, getAllAttributes } from '@/data'
import TeamBuilderClient from '@/components/animon/TeamBuilderClient'

export const metadata: Metadata = generateSEOMetadata({
  title: 'LumenTale Team Builder - Build & Analyze Your Team',
  description: 'Build your LumenTale team and analyze documented type coverage, attribute roles, and team balance with real available data.',
  keywords: ['LumenTale team builder', 'LumenTale best team', 'LumenTale team comp', 'LumenTale team analysis'],
  path: '/team-builder/',
})

export default function TeamBuilderPage() {
  const allAnimon = getAllAnimon()
  const allAttributes = getAllAttributes()

  const faqItems = [
    { question: 'How many Animon can be on a team?', answer: 'LumenTale supports 4v4 team battles, so your active team has 4 Animon. You can carry more in your roster for switching.' },
    { question: 'What makes a good team in LumenTale?', answer: 'A good team starts with type variety and complementary attributes: Felicis for sustain, Sereum for critical-hit TP gain, Furor or Mestus for damage, and Horrens for finishing pressure.' },
    { question: 'Does this team builder work with current data?', answer: 'Yes. The current version uses documented Animon types and official attribute role data. Full weakness and resistance analysis will be added only after type effectiveness matchups are verified.' },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Team Builder' }]} />

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">LumenTale Team Builder</h1>
        <p className="mt-2 text-gray-600">
          Build a 4v4 team using documented Animon types and official attribute roles.
        </p>
      </div>

      <TeamBuilderClient animon={allAnimon} attributes={allAttributes} />

      <Card variant="default" className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Team Building Tips</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2"><span className="text-amber-500 font-bold">•</span><span>Aim for type diversity so one unknown matchup does not define the whole team.</span></li>
          <li className="flex gap-2"><span className="text-amber-500 font-bold">•</span><span>Consider attribute synergy: Sereum can support critical-hit pressure and TP gain.</span></li>
          <li className="flex gap-2"><span className="text-amber-500 font-bold">•</span><span>Bring a Felicis Animon for healing sustain in longer fights.</span></li>
          <li className="flex gap-2"><span className="text-amber-500 font-bold">•</span><span>Use Furor or Mestus if your team needs more direct damage.</span></li>
          <li className="flex gap-2"><span className="text-amber-500 font-bold">•</span><span>Exact weakness multipliers are intentionally excluded until verified.</span></li>
        </ul>
      </Card>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <JsonLd data={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Team Builder', url: '/team-builder/' }])} />
      <JsonLd data={generateWebApplicationSchema('LumenTale Team Builder', 'Build your LumenTale team and analyze documented type coverage, attribute roles, and team balance.', '/team-builder/')} />
      <JsonLd data={generateFAQSchema(faqItems)} />
    </div>
  )
}
