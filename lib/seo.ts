import type { Metadata } from 'next'
import { siteConfig } from './config'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  path: string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
}

export function generateSEOMetadata(props: SEOProps): Metadata {
  const {
    title,
    description,
    keywords,
    path,
    ogImage = '/og-default.png',
    type = 'website',
    publishedTime,
    modifiedTime,
    noIndex = false,
  } = props

  const url = `${siteConfig.baseUrl}${path}`
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteConfig.baseUrl}${ogImage}`

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url.endsWith('/') ? url : `${url}/`,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteName,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
  }
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.baseUrl}${item.url}`,
    })),
  }
}

export function generateFAQSchema(
  questions: { question: string; answer: string }[]
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}

export function generateItemListSchema(
  items: { name: string; url: string; position: number }[]
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: `${siteConfig.baseUrl}${item.url}`,
    })),
  }
}

export function generateVideoGameSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: siteConfig.gameName,
    description: siteConfig.seo.defaultDescription,
    genre: 'Monster-taming RPG',
    gamePlatform: siteConfig.platforms,
    datePublished: siteConfig.releaseDate,
    url: siteConfig.socials.steam,
    author: {
      '@type': 'Organization',
      name: siteConfig.developer,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.publisher,
    },
  }
}

export function generateWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.baseUrl,
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.baseUrl}/animon/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateWebApplicationSchema(
  name: string,
  description: string,
  url: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${siteConfig.baseUrl}${url}`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function getCurrentDateString(): string {
  return 'May 2026'
}
