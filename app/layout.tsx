import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { lazy, Suspense } from 'react'

// Lazy load non-critical components for better performance
const CookieConsent = lazy(() => import('@/components/CookieConsent'))
const ExitIntentWrapper = lazy(() => import('@/components/ExitIntentWrapper'))
const Analytics = lazy(() => import('@/components/Analytics'))
const ScrollTracker = lazy(() => import('@/components/ScrollTracker'))
const ThirdPartyScripts = lazy(() => import('@/components/ThirdPartyScripts'))
import { organizationSchema, websiteSchema } from '@/lib/schema'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'], // Regular, Semibold, Bold
  preload: true,
  variable: '--font-inter',
  adjustFontFallback: true
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.chefapprovedtools.com'),
  title: 'Best Kitchen Tools | Chef-Approved Reviews 2025',
  description: 'Discover the best chef-approved kitchen tools, tested and reviewed for home cooks. 24 years of professional cooking. Shop smarter with expert recommendations on knives, cookware, and appliances.',
  keywords: [
    'professional kitchen tools',
    'restaurant equipment reviews',
    'chef knives tested',
    'commercial cookware reviews',
    'Scott Bradley chef reviews',
    'Mellow Mushroom kitchen manager',
    'restaurant quality tools',
    'professional chef equipment',
    'kitchen tools tested by chefs',
    'commercial grade cookware',
    'professional knife reviews',
    'restaurant equipment for home',
    'chef approved kitchen equipment',
    'professional grade kitchen tools'
  ],
  authors: [{
    name: 'Scott Bradley',
    url: 'https://www.chefapprovedtools.com/about'
  }],
  creator: 'Scott Bradley - Professional Chef & Kitchen Manager',
  publisher: 'Chef Approved Tools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Chef Approved Kitchen Tools | Tested by Restaurant Manager',
    description: 'Professional kitchen equipment reviews by Scott Bradley, former Mellow Mushroom Kitchen Manager. Tools tested in real restaurants. Honest reviews of chef knives, cookware, and appliances.',
    url: 'https://www.chefapprovedtools.com',
    siteName: 'Chef Approved Tools',
    images: [
      {
        url: 'https://www.chefapprovedtools.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Scott Bradley - Professional Chef reviewing kitchen equipment with 24 years restaurant experience'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Approved Kitchen Tools | Restaurant Manager Tested',
    description: 'Professional kitchen equipment reviews by Scott Bradley. 24 years restaurant experience, former Mellow Mushroom Kitchen Manager. Real reviews from real kitchens.',
    images: ['https://www.chefapprovedtools.com/twitter-image.jpg'],
    creator: '@chefapprovedtools',
    site: '@chefapprovedtools',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
  other: {
    'fo-verify': 'c706467f-f5b7-4096-abd7-5f5ee8472e09',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Mobile viewport meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />

        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="iiP_PrnJkCSzBq86Y_mZmohwChwU0I_FGzqVo3W9B6o" />

        {/* Pinterest domain verification */}
        <meta name="p:domain_verify" content="1c75361789f0b05c2c684f88ccfe1460" />

        {/* View Transitions API for smooth page navigation */}
        <meta name="view-transition" content="same-origin" />

        {/* Preload critical resources */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />

        {/* Preload LCP hero image for homepage - Scott's photo is the actual LCP element on mobile */}
        <link
          rel="preload"
          as="image"
          href="/images/scott-chef-coat-cropped.jpg"
          imageSrcSet="/_next/image?url=%2Fimages%2Fscott-chef-coat-cropped.jpg&w=384&q=75 384w, /_next/image?url=%2Fimages%2Fscott-chef-coat-cropped.jpg&w=640&q=75 640w, /_next/image?url=%2Fimages%2Fscott-chef-coat-cropped.jpg&w=750&q=75 750w"
          imageSizes="(max-width: 768px) 100vw, 300px"
          fetchPriority="high"
        />

        {/* Preload critical above-the-fold images */}
        <link rel="preload" href="/og-image.jpg" as="image" type="image/jpeg" />

        {/* Preload critical CSS - Note: CSS hash changes with each build */}
        {/* Run: npm run build && find .next/static/css -name "*.css" to get the latest filename */}
        {/* <link rel="preload" href="/_next/static/css/34ae4f707512af1f.css" as="style" /> */}

        {/* Resource hints for critical third-party domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Minimal critical CSS - just resets and hero background to prevent flash */}
        <style dangerouslySetInnerHTML={{
          __html: `*,::before,::after{box-sizing:border-box}html{line-height:1.5;font-family:system-ui,sans-serif}body{margin:0}.min-h-screen{min-height:100vh}.bg-gray-50{background:#f9fafb}.bg-gradient-to-br{background:linear-gradient(to bottom right,#1e293b,#334155,#c2410c)}.text-white{color:#fff}`
        }} />

        {/* Optimized font loading - self-hosted Inter for better performance */}
        <link rel="preload" href="/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-latin-600-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-latin-700-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* DNS prefetch for non-critical domains - lightweight hints */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />

        {/* Mobile-specific meta tags */}
        <meta name="mobile-web-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        {/* Structured Data - Organization & Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 antialiased">
        {/* Third-party scripts (GTM, GA4) - Deferred for performance */}
        <Suspense fallback={null}>
          <ThirdPartyScripts />
        </Suspense>

        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-700 text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>

        {/* Main Header */}
        <Header />

        {/* Main Content */}
        <main id="main-content" className="min-h-screen mobile-scroll">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Cookie Consent (GDPR/CCPA Compliance) - Lazy loaded */}
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>

        {/* Exit Intent Modal - Lazy loaded */}
        <Suspense fallback={null}>
          <ExitIntentWrapper />
        </Suspense>

        {/* Analytics - Page views and scroll tracking (lazy loaded) */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Suspense fallback={null}>
          <ScrollTracker />
        </Suspense>

        {/* Vercel Analytics */}
        <VercelAnalytics />
      </body>
    </html>
  )
}
