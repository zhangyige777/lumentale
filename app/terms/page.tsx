import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { generateSEOMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Terms of Service',
  description: 'Terms of service for the unofficial LumenTale database and tools site.',
  path: '/terms/',
})

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: 'Terms' }]} />
      <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p><strong>Last updated:</strong> {siteConfig.lastUpdated}</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">1. Acceptance of Terms</h2>
        <p>By accessing and using {siteConfig.siteName} ({siteConfig.baseUrl}), you accept and agree to be bound by these terms.</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">2. Nature of Service</h2>
        <p>This is an unofficial, fan-made companion website for {siteConfig.gameName}. It is not affiliated with, endorsed by, or connected to {siteConfig.developer}, {siteConfig.publisher}, or any other official entity.</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">3. Content Accuracy</h2>
        <p>We strive to provide accurate information about the game. However, game data may be incomplete or contain errors. Each piece of data is labeled with a verification status (confirmed, partial, community, or placeholder). We recommend verifying critical information through official sources.</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">4. Intellectual Property</h2>
        <p>{siteConfig.gameName} and all related names, imagery, and content are the property of {siteConfig.developer} and {siteConfig.publisher}. This site uses game information under fair use for the purpose of creating a fan reference guide.</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">5. Advertisements</h2>
        <p>This site may display advertisements through third-party ad networks. These ads help support the cost of running the site.</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">6. Changes</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
      </div>
    </div>
  )
}
