import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/config'
import { generateVideoGameSchema } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.siteName} — Type Chart, Animon Database & Tools`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: [...siteConfig.seo.primaryKeywords, ...siteConfig.seo.secondaryKeywords],
  authors: [{ name: siteConfig.siteName }],
  creator: siteConfig.siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.baseUrl,
    title: `${siteConfig.siteName} — Type Chart, Animon Database & Tools`,
    description: siteConfig.seo.defaultDescription,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.siteName} — Type Chart, Animon Database & Tools`,
    description: siteConfig.seo.defaultDescription,
  },
}

function AdSenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  if (!clientId) return null
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <AdSenseScript />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 font-sans antialiased">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
          {children}
        </main>
        <Footer />
        <JsonLd data={generateVideoGameSchema()} />
      </body>
    </html>
  )
}
