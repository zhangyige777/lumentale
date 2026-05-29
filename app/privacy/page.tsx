import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { generateSEOMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for the unofficial LumenTale database and tools site.',
  path: '/privacy/',
})

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p><strong>Last updated:</strong> {siteConfig.lastUpdated}</p>
        <p>{siteConfig.siteName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website at {siteConfig.baseUrl}. This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Service.</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">Information We Collect</h2>
        <p>We do not collect personal information directly. We may use third-party services (such as Google Analytics or Google AdSense) that collect information about your use of our site. These services may use cookies and similar technologies to analyze traffic and serve ads.</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">Cookies</h2>
        <p>We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">Third-Party Services</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Google Analytics</strong> — for traffic analysis</li>
          <li><strong>Google AdSense</strong> — for serving advertisements</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">Disclaimer</h2>
        <p>This is an unofficial fan-made site. We are not affiliated with, endorsed by, or connected to {siteConfig.developer} or {siteConfig.publisher}. All game content, names, and imagery are property of their respective owners.</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">Contact</h2>
        <p>If you have any questions about this Privacy Policy, please contact us through the site.</p>
      </div>
    </div>
  )
}
