import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { getAllAnimon, getIndexedAnimon } from '@/data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.baseUrl

  // Static pages — always indexed
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/type-chart/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/weakness-calculator/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/animon/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/evolution-guide/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/best-starter/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/team-builder/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/sp-tp-explained/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/attributes/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/walkthrough/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/locations/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/patch-notes/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/about/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/terms/`, lastModified: siteConfig.lastUpdated, changeFrequency: 'yearly', priority: 0.2 },
  ]

  // Animon entity pages — only indexed Animon (excludes community, placeholder, no-type)
  const animonPages: MetadataRoute.Sitemap = getIndexedAnimon()
    .map((animon) => ({
      url: `${baseUrl}/animon/${animon.slug}/`,
      lastModified: animon.verifiedAt,
      changeFrequency: 'weekly' as const,
      priority: animon.isStarter ? 0.8 : 0.6,
    }))

  const evolutionPages: MetadataRoute.Sitemap = getAllAnimon()
    .filter((animon) => {
      if (animon.dataStatus === 'placeholder' || animon.dataStatus === 'community') return false
      return animon.evolvesTo.length > 0 || animon.evolvesFrom !== null || Boolean(animon.evolutionMethod)
    })
    .map((animon) => ({
      url: `${baseUrl}/evolution/${animon.slug}/`,
      lastModified: animon.verifiedAt,
      changeFrequency: 'weekly' as const,
      priority: animon.isStarter ? 0.75 : 0.65,
    }))

  return [...staticPages, ...animonPages, ...evolutionPages]
}
