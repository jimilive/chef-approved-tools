import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FTCDisclosure from '@/components/FTCDisclosure'
import CookieConsent from '@/components/CookieConsent'
import ExitIntentWrapper from '@/components/ExitIntentWrapper'
import Analytics from '@/components/Analytics'
import ScrollTracker from '@/components/ScrollTracker'
import MobileOptimizedLayout from '@/components/MobileOptimizedLayout'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import MobileOptimizationProvider from '@/components/MobileOptimizationProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.chefapprovedtools.com'),
  title: {
    default: 'Chef Approved Kitchen Tools | Tested by 15+ Year Restaurant Manager Scott Bradley',
    template: '%s | Chef Approved Tools - Professional Kitchen Equipment Reviews'
  },
  description: 'Professional kitchen equipment reviews by Scott Bradley, former Mellow Mushroom Kitchen Manager with 15+ years restaurant experience. 500+ tools tested in real commercial kitchens. Honest reviews of chef knives, cookware, and appliances for serious home cooks.',
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
    title: 'Chef Approved Kitchen Tools | Tested by 15+ Year Restaurant Manager',
    description: 'Professional kitchen equipment reviews by Scott Bradley, former Mellow Mushroom Kitchen Manager. 500+ tools tested in real restaurants. Honest reviews of chef knives, cookware, and appliances.',
    url: 'https://www.chefapprovedtools.com',
    siteName: 'Chef Approved Tools',
    images: [
      {
        url: 'https://www.chefapprovedtools.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Scott Bradley - Professional Chef reviewing kitchen equipment with 15+ years restaurant experience'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Approved Kitchen Tools | Restaurant Manager Tested',
    description: 'Professional kitchen equipment reviews by Scott Bradley. 15+ years restaurant experience, former Mellow Mushroom Kitchen Manager. Real reviews from real kitchens.',
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
  alternates: {
    canonical: 'https://www.chefapprovedtools.com',
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
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
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://m.media-amazon.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
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
        <MobileOptimizedLayout>
          <MobileOptimizationProvider>
            {/* Skip to main content for accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-600 text-white px-4 py-2 rounded-md z-50">
              Skip to main content
            </a>

            {/* Main Header */}
            <Header />

            {/* FTC Disclosure */}
            <FTCDisclosure />

            {/* Main Content */}
            <main id="main-content" className="min-h-screen mobile-scroll">
              {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Cookie Consent (GDPR/CCPA Compliance) */}
            <CookieConsent />

            {/* Exit Intent Modal */}
            <ExitIntentWrapper />

            {/* Analytics - Page views and scroll tracking */}
            <Analytics />
            <ScrollTracker />
          </MobileOptimizationProvider>
        </MobileOptimizedLayout>
        
        {/* Google Analytics 4 - Only loads after consent */}
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('consent', 'default', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied'
                  });
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                    send_page_view: false
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}