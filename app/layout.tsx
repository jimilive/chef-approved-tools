import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FTCDisclosure from '@/components/FTCDisclosure'
import { lazy, Suspense } from 'react'

// Lazy load non-critical components
const CookieConsent = lazy(() => import('@/components/CookieConsent'))
const ExitIntentWrapper = lazy(() => import('@/components/ExitIntentWrapper'))
import Analytics from '@/components/Analytics'
import ScrollTracker from '@/components/ScrollTracker'
import MobileOptimizedLayout from '@/components/MobileOptimizedLayout'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import MobileOptimizationProvider from '@/components/MobileOptimizationProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.chefapprovedtools.com'),
  title: {
    default: 'Chef Approved Kitchen Tools | Tested by Kitchen Manager Scott Bradley',
    template: '%s | Chef Approved Tools - Professional Kitchen Equipment Reviews'
  },
  description: 'Professional kitchen equipment reviews by Scott Bradley, former Mellow Mushroom Kitchen Manager with 18+ years restaurant experience. Tools tested in real commercial kitchens. Honest reviews of chef knives, cookware, and appliances for serious home cooks.',
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
        alt: 'Scott Bradley - Professional Chef reviewing kitchen equipment with 18+ years restaurant experience'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Approved Kitchen Tools | Restaurant Manager Tested',
    description: 'Professional kitchen equipment reviews by Scott Bradley. 18+ years restaurant experience, former Mellow Mushroom Kitchen Manager. Real reviews from real kitchens.',
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
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />

        {/* Preload critical font for LCP optimization */}
        <link rel="preload" href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://m.media-amazon.com" />

        {/* DNS prefetch for analytics and less critical domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
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

            {/* Cookie Consent (GDPR/CCPA Compliance) - Lazy loaded */}
            <Suspense fallback={null}>
              <CookieConsent />
            </Suspense>

            {/* Exit Intent Modal - Lazy loaded */}
            <Suspense fallback={null}>
              <ExitIntentWrapper />
            </Suspense>

            {/* Analytics - Page views and scroll tracking */}
            <Analytics />
            <ScrollTracker />
          </MobileOptimizationProvider>
        </MobileOptimizedLayout>
        
        {/* Google Analytics 4 - Deferred loading for performance */}
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied'
                });

                // Defer GA loading until page is loaded to improve LCP
                function loadGA() {
                  const script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}';
                  document.head.appendChild(script);

                  script.onload = function() {
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                      send_page_view: false
                    });
                  };
                }

                // Load after page is fully loaded
                if (document.readyState === 'complete') {
                  setTimeout(loadGA, 1000);
                } else {
                  window.addEventListener('load', () => setTimeout(loadGA, 1000));
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}