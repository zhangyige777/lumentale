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

function AdsterraScript() {
  return (
    <script
      async
      src="https://pl29585349.effectivecpmnetwork.com/d1/2f/e5/d12fe58eac7413d9adbfaf8f239bfd8c.js"
    />
  )
}

function GA4Script() {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-JY89EMDS8F"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JY89EMDS8F');
          `,
        }}
      />
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <AdSenseScript />
        <AdsterraScript />
        <GA4Script />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 font-sans antialiased">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
          {children}
        </main>
        <Footer />

        {/* Adsterra banner ad */}
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div id="container-1048191ffbacdd86b1de52d8da3df9cd" />
        </div>
        <script async data-cfasync="false" src="https://pl29585350.effectivecpmnetwork.com/1048191ffbacdd86b1de52d8da3df9cd/invoke.js" />
        <JsonLd data={generateVideoGameSchema()} />
      </body>
    </html>
  )
}
