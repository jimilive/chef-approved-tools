import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { lazy, Suspense } from 'react'

// Lazy load non-critical components for better performance
const CookieConsent = lazy(() => import('@/components/CookieConsent'))
const ExitIntentWrapper = lazy(() => import('@/components/ExitIntentWrapper'))
const Analytics = lazy(() => import('@/components/Analytics'))
const ScrollTracker = lazy(() => import('@/components/ScrollTracker'))
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
  description: 'Professional kitchen equipment reviews by Scott Bradley, chef with 40 years experience since age 15. Former Kitchen Manager at Mellow Mushroom with 21+ years in professional kitchens. Tools tested in real commercial operations from fast food to fine dining.',
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
        alt: 'Scott Bradley - Professional Chef reviewing kitchen equipment with 21+ years restaurant experience'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Approved Kitchen Tools | Restaurant Manager Tested',
    description: 'Professional kitchen equipment reviews by Scott Bradley. 21+ years restaurant experience, former Mellow Mushroom Kitchen Manager. Real reviews from real kitchens.',
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

        {/* Preload critical above-the-fold images */}
        <link rel="preload" href="/og-image.jpg" as="image" type="image/jpeg" />

        {/* Mobile-optimized CSS loading strategy */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Aggressive CSS deferring for mobile performance
            (function() {
              // Intercept CSS loading during document parse
              const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.tagName === 'LINK' &&
                        node.rel === 'stylesheet' &&
                        node.href && node.href.includes('/_next/static/css/')) {
                      // Convert to preload immediately
                      node.rel = 'preload';
                      node.as = 'style';
                      node.onload = function() {
                        this.onload = null;
                        this.rel = 'stylesheet';
                      };
                    }
                  });
                });
              });
              observer.observe(document.head, { childList: true });

              // Also handle existing stylesheets
              setTimeout(function() {
                const links = document.querySelectorAll('link[rel="stylesheet"]');
                links.forEach(function(link) {
                  if (link.href && link.href.includes('/_next/static/css/')) {
                    link.rel = 'preload';
                    link.as = 'style';
                    link.onload = function() {
                      this.onload = null;
                      this.rel = 'stylesheet';
                    };
                  }
                });
                observer.disconnect();
              }, 0);
            })();
          `
        }} />

        {/* Resource hints for critical third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Critical CSS inline for immediate rendering - Above the fold only */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face{font-family:'Inter';src:url('/fonts/inter-latin-400-normal.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
            @font-face{font-family:'Inter';src:url('/fonts/inter-latin-600-normal.woff2') format('woff2');font-weight:600;font-style:normal;font-display:swap}
            @font-face{font-family:'Inter';src:url('/fonts/inter-latin-700-normal.woff2') format('woff2');font-weight:700;font-style:normal;font-display:swap}
            *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
            ::before,::after{--tw-content:''}
            html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}
            body{margin:0;line-height:inherit;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
            h1,h2,h3{font-size:inherit;font-weight:inherit;margin:0}
            p{margin:0}
            a{color:inherit;text-decoration:inherit}
            button{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0;background-color:transparent;background-image:none;border:0}
            .min-h-screen{min-height:100vh}
            .bg-gray-50{background-color:#f9fafb}
            .text-slate-900{color:#0f172a}
            .bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}
            .from-slate-800{--tw-gradient-from:#1e293b;--tw-gradient-to:rgb(30 41 59 / 0);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}
            .via-slate-700{--tw-gradient-to:rgb(51 65 85 / 0);--tw-gradient-stops:var(--tw-gradient-from),#334155,var(--tw-gradient-to)}
            .to-orange-600{--tw-gradient-to:#ea580c}
            .text-white{color:#fff}
            .px-4{padding-left:1rem;padding-right:1rem}
            .py-12{padding-top:3rem;padding-bottom:3rem}
            .text-center{text-align:center}
            .text-3xl{font-size:1.875rem;line-height:2.25rem}
            .font-bold{font-weight:700}
            .leading-tight{line-height:1.25}
            .mb-4{margin-bottom:1rem}
            .mb-6{margin-bottom:1.5rem}
            .text-lg{font-size:1.125rem;line-height:1.75rem}
            .text-slate-300{color:#cbd5e1}
            .max-w-3xl{max-width:48rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            .leading-relaxed{line-height:1.625}
            .bg-orange-500{background-color:#f97316}
            .border{border-width:1px}
            .border-orange-500{border-color:#f97316}
            .rounded-full{border-radius:9999px}
            .px-6{padding-left:1.5rem;padding-right:1.5rem}
            .py-3{padding-top:0.75rem;padding-bottom:0.75rem}
            .inline-block{display:inline-block}
            .text-orange-200{color:#fed7aa}
            .font-semibold{font-weight:600}
            .text-sm{font-size:0.875rem;line-height:1.25rem}
            .bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}
            .from-orange-400{--tw-gradient-from:#fb923c;--tw-gradient-to:rgb(251 146 60 / 0);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}
            .to-amber-500{--tw-gradient-to:#f59e0b}
            .bg-clip-text{background-clip:text}
            .text-transparent{color:transparent}
            .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}
            .focus\\:not-sr-only:focus{position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal}
            .focus\\:absolute:focus{position:absolute}
            .focus\\:top-4:focus{top:1rem}
            .focus\\:left-4:focus{left:1rem}
            .bg-orange-600{background-color:#ea580c}
            .rounded-md{border-radius:0.375rem}
            .z-50{z-index:50}
            .from-orange-600{--tw-gradient-from:#ea580c;--tw-gradient-to:rgb(234 88 12 / 0);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}
            .to-red-600{--tw-gradient-to:#dc2626}
            .hover\\:from-orange-700:hover{--tw-gradient-from:#c2410c}
            .hover\\:to-red-700:hover{--tw-gradient-to:#b91c1c}
            .transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
            .duration-200{transition-duration:200ms}
            .shadow-lg{box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)}
            .hover\\:shadow-xl:hover{box-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)}
            .transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}
            .active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95}
            .hover\\:scale-105:hover{--tw-scale-x:1.05;--tw-scale-y:1.05}
            .px-8{padding-left:2rem;padding-right:2rem}
            .py-4{padding-top:1rem;padding-bottom:1rem}
            .rounded-xl{border-radius:0.75rem}
            .flex{display:flex}
            .flex-col{flex-direction:column}
            .items-center{align-items:center}
            .justify-center{justify-content:center}
            .gap-4{gap:1rem}
            .max-w-md{max-width:28rem}
            .sm\\:max-w-none{max-width:none}
            .sm\\:flex-row{flex-direction:row}
            .border-2{border-width:2px}
            .border-slate-300{border-color:#cbd5e1}
            .text-slate-300{color:#cbd5e1}
            .hover\\:bg-slate-300:hover{background-color:#cbd5e1}
            .hover\\:text-slate-800:hover{color:#1e293b}
            .grid{display:grid}
            .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
            .sm\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
            .gap-6{gap:1.5rem}
            .sm\\:gap-8{gap:2rem}
            .pt-8{padding-top:2rem}
            .sm\\:pt-12{padding-top:3rem}
            .border-t{border-top-width:1px}
            .border-slate-600{border-color:#475569}
            .text-2xl{font-size:1.5rem;line-height:2rem}
            .sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}
            .text-orange-400{color:#fb923c}
            .mb-1{margin-bottom:0.25rem}
            .text-xs{font-size:0.75rem;line-height:1rem}
            .sm\\:text-sm{font-size:0.875rem;line-height:1.25rem}
            .text-slate-400{color:#94a3b8}
            .uppercase{text-transform:uppercase}
            .tracking-wide{letter-spacing:0.025em}
            .font-medium{font-weight:500}
            .mobile-scroll{overflow-x:hidden}
            #main-content{min-height:100vh;contain:layout}
            .header{position:relative;z-index:30}
            .nav-menu{position:relative;z-index:40}
            .main-navigation{display:flex;align-items:center;justify-content:space-between}
            .btn-primary{background:linear-gradient(to right,#ea580c,#dc2626);color:#fff;font-weight:600;padding:0.75rem 1.5rem;border-radius:0.75rem;transition:all 0.2s;text-decoration:none;display:inline-block}
            .btn-primary:hover{background:linear-gradient(to right,#c2410c,#b91c1c);transform:scale(1.02)}
            .card{background:#fff;border-radius:0.75rem;box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1);transition:box-shadow 0.2s}
            .card:hover{box-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1)}
            .container{max-width:72rem;margin:0 auto;padding:0 1rem}
            @media(min-width:640px){.container{padding:0 1.5rem}}
            @media(min-width:1024px){.container{padding:0 2rem}}
          `
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
        <MobileOptimizedLayout>
          <MobileOptimizationProvider>
            {/* Skip to main content for accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-600 text-white px-4 py-2 rounded-md z-50">
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
          </MobileOptimizationProvider>
        </MobileOptimizedLayout>

        {/* Load CSS properly without MIME type issues */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Load non-critical CSS after first paint to improve LCP
              (function() {
                if (typeof requestAnimationFrame !== 'undefined') {
                  requestAnimationFrame(function() {
                    // Let Next.js handle CSS loading naturally
                    console.log('CSS loading deferred for LCP optimization');
                  });
                }
              })();
            `
          }}
        />

        {/* Lightweight performance optimizations - avoid forced reflows */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Essential performance optimizations only - avoid DOM measurements
              (function() {
                // Use passive event listeners and defer heavy operations
                function deferredTasks() {
                  // Clean up service workers without measuring DOM
                  if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(registrations => {
                      registrations.forEach(registration => registration.unregister());
                    });
                  }
                }

                // Wait for idle time to avoid blocking main thread
                if ('requestIdleCallback' in window) {
                  requestIdleCallback(deferredTasks);
                } else {
                  setTimeout(deferredTasks, 1000);
                }
              })();
            `
          }}
        />

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

                // Load after page is fully loaded and user interaction
                let gaLoaded = false;
                function loadGAOnInteraction() {
                  if (!gaLoaded) {
                    gaLoaded = true;
                    setTimeout(loadGA, 100);
                  }
                }

                // Mobile-optimized loading: more aggressive deferring
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                const delay = isMobile ? 5000 : 3000; // 5 seconds on mobile vs 3 on desktop

                // Load on first user interaction or after delay
                ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
                  document.addEventListener(event, loadGAOnInteraction, { once: true, passive: true });
                });

                // Fallback: load after delay (longer on mobile)
                setTimeout(loadGAOnInteraction, delay);
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}