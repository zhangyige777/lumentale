import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { generateSEOMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = generateSEOMetadata({
  title: 'About This Site',
  description: 'About the unofficial LumenTale database and tools site. Learn about our data sources, verification process, and mission.',
  path: '/about/',
})

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: 'About' }]} />
      <h1 className="text-2xl font-bold text-gray-900">About This Site</h1>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>
          <strong>{siteConfig.siteName}</strong> is an unofficial, fan-made companion website for{' '}
          <a href={siteConfig.socials.steam} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
            {siteConfig.gameName}
          </a>
          {' '}by {siteConfig.developer}.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">Our Mission</h2>
        <p>
          We aim to be the most comprehensive and accurate unofficial database for LumenTale. Our tools — including the type chart, weakness calculator, Animon database, evolution guide, and team builder — are designed to help players get the most out of their adventure in Talea.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">Data Verification</h2>
        <p>Every piece of data on this site is labeled with a verification status:</p>
        <ul className="space-y-2 ml-4">
          <li><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" /><strong>Verified (green)</strong> — Confirmed by official source or in-game evidence.</li>
          <li><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2" /><strong>Partial (yellow)</strong> — Supported by official/community sources, but not fully complete.</li>
          <li><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2" /><strong>Community (blue)</strong> — From community wiki or third-party guide. Should be verified.</li>
          <li><span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-2" /><strong>Placeholder (gray)</strong> — Development-only. Not indexed by search engines.</li>
        </ul>
        <p>We only index pages in search engines when they contain verified or partially verified data. Placeholder and community-only pages are excluded from our sitemap.</p>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">Sources</h2>
        <ul className="space-y-1 ml-4">
          <li>• <a href={siteConfig.socials.official} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Official LumenTale site</a></li>
          <li>• <a href={siteConfig.socials.steam} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Steam store page</a></li>
          <li>• <a href="https://steamcommunity.com/app/2261430/allnews/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Steam news</a></li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900 pt-2">Disclaimer</h2>
        <p>
          This site is not affiliated with, endorsed by, or connected to {siteConfig.developer} or {siteConfig.publisher}.
          All game content and assets are the property of their respective owners. This site exists solely as a fan reference.
        </p>
      </div>
    </div>
  )
}
