/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  
  // Experimental features for performance
  experimental: {
    scrollRestoration: true,
    optimizeCss: true, // Re-enable to help with CSS optimization and reduce render-blocking
    webVitalsAttribution: ['CLS', 'LCP'],
    esmExternals: true, // Use ES modules for better tree shaking
    optimizePackageImports: ['lucide-react', '@headlessui/react'], // Tree-shake these packages
    // ppr: true, // Requires Next.js canary - enable when upgrading to Next.js 15
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Target modern browsers to reduce bundle size and transpilation
  swcMinify: true,
  target: 'server',

  // Modern browser support to reduce polyfills
  transpilePackages: [],

  // Reduce transpilation for modern browsers
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: false,
  },

  // Enable source maps for better debugging and Lighthouse insights
  productionBrowserSourceMaps: true,

  // Exclude polyfills for modern browsers
  excludeDefaultMomentLocales: true,
  
  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'ws-na.amazon-adsystem.com',
      }
    ],
  },
  

  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Add ignore plugin to completely exclude polyfills
    const webpack = require('webpack');

    if (!dev && !isServer) {
      // Exclude ALL legacy polyfills for modern browsers (mobile optimization)
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /polyfill-module\.js$/,
        }),
        new webpack.NormalModuleReplacementPlugin(
          /next[\\/]dist[\\/]build[\\/]polyfills[\\/]polyfill-module/,
          require.resolve('./lib/empty-polyfill.js')
        ),
        new webpack.DefinePlugin({
          'process.env.__NEXT_DISABLE_POLYFILLS': JSON.stringify('true'),
        })
      );

      // Optimize bundle splitting for better caching and loading
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 100000,
        cacheGroups: {
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            chunks: 'all',
            priority: 30,
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
          default: {
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };

      // Optimize for modern browsers - exclude polyfills
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };

      // Better tree shaking and unused code elimination
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Aggressive polyfill exclusion for mobile performance
      config.resolve.alias = {
        ...config.resolve.alias,
        // Exclude all unnecessary polyfills for modern mobile browsers
        'core-js/modules/es.array.at': false,
        'core-js/modules/es.array.flat': false,
        'core-js/modules/es.array.flat-map': false,
        'core-js/modules/es.object.from-entries': false,
        'core-js/modules/es.object.has-own': false,
        'core-js/modules/es.string.trim-start': false,
        'core-js/modules/es.string.trim-end': false,
        // Target the specific polyfill module causing issues
        '@next/polyfill-module': false,
      };
    }

    return config;
  },
  
  // Compression
  compress: true,
  
  // Output configuration
  output: 'standalone',
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://s.pinimg.com https://www.clarity.ms https://ct.pinterest.com",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com https://region1.analytics.google.com https://analytics.google.com https://chefapprovedtools.activehosted.com https://www.clarity.ms",
              "img-src 'self' data: https: http:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "frame-src 'self' https://www.googletagmanager.com https://ct.pinterest.com",
            ].join('; ')
          }
        ]
      }
    ]
  },
  
  // Redirects for common patterns
  async redirects() {
    return [
      {
        source: '/products/:slug',
        destination: '/reviews/:slug',
        permanent: true,
      },

      // ===== GHOST PAGE CLEANUP - Methodology & Renamed Reviews =====
      {
        source: '/methodology',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/reviews/blenders',
        destination: '/appliances',
        permanent: true,
      },
      {
        source: '/reviews/wusthof-classic-ikon-15-piece',
        destination: '/reviews/wusthof-classic-ikon-16-piece',
        permanent: true,
      },
      {
        source: '/reviews/vitamix-5200',
        destination: '/reviews/vitamix-5200-professional-blender',
        permanent: true,
      },
      {
        source: '/reviews/gold-textiles-bar-mops',
        destination: '/reviews/zuperia-bar-mops',
        permanent: true,
      },
      {
        source: '/reviews/victorinox-fibrox-pro-knife-set',
        destination: '/reviews/victorinox-fibrox-8-inch-chefs-knife',
        permanent: true,
      },

      // ===== SPELLING FIX - Affect vs Effect =====
      {
        source: '/blog/oxidization-affect-on-food',
        destination: '/blog/oxidization-effect-on-food',
        permanent: true,
      },

      // ===== GUIDE REDIRECTS - Old URLs to /guides/ =====
      {
        source: '/best-budget-chef-knife',
        destination: '/guides/best-budget-chef-knife',
        permanent: true,
      },
      {
        source: '/best-knife-for-cutting-meat',
        destination: '/guides/best-knife-for-cutting-meat',
        permanent: true,
      },

      // ===== SEO CANNIBALIZATION FIXES - Merged Blog Posts =====
      {
        source: '/blog/cookware-materials-explained',
        destination: '/guides/cookware-materials',
        permanent: true,
      },
      {
        source: '/blog/cast-iron-mistakes-ruin-pan',
        destination: '/blog/cast-iron-seasoning-care',
        permanent: true,
      },
      {
        source: '/blog/deglazing-secret-to-restaurant-quality-flavor',
        destination: '/blog/deglazing-pan-sauces',
        permanent: true,
      },
      {
        source: '/blog/how-to-season-cast-iron-like-restaurant-chef',
        destination: '/blog/cast-iron-seasoning-care',
        permanent: true,
      },
      {
        source: '/blog/kitchen-thermometer-guide',
        destination: '/blog/kitchen-thermometers-guide',
        permanent: true,
      },
      {
        source: '/blog/knife-block-vs-magnetic-strip-vs-drawer-storage',
        destination: '/blog/knife-storage-protecting-blades-for-decades',
        permanent: true,
      },
      {
        source: '/blog/knife-cuts-guide',
        destination: '/blog/essential-knife-cuts-every-cook-should-master',
        permanent: true,
      },
      {
        source: '/blog/knife-mistakes-home-cooks-make',
        destination: '/blog/knife-safety-rules-professional-kitchens',
        permanent: true,
      },
      {
        source: '/blog/knife-safety-protect-fingers',
        destination: '/blog/knife-safety-rules-professional-kitchens',
        permanent: true,
      },
      {
        source: '/blog/professional-knife-grip-techniques',
        destination: '/blog/knife-skills-how-to-hold-chef-knife',
        permanent: true,
      },
      {
        source: '/blog/roasting-vegetables-restaurant-guide',
        destination: '/blog/vegetable-roasting-guide',
        permanent: true,
      },
      {
        source: '/blog/meat-cooking-temperatures-thermometers',
        destination: '/blog/kitchen-thermometers-guide',
        permanent: true,
      },

      // ===== BLOG LINK VARIATIONS - Common URL Patterns =====
      {
        source: '/reviews/victorinox-fibrox-8-inch-chef-knife',
        destination: '/reviews/victorinox-fibrox-8-inch-chefs-knife',
        permanent: true,
      },
      {
        source: '/reviews/victorinox-fibrox-8-inch-chef-knife-review',
        destination: '/reviews/victorinox-fibrox-8-inch-chefs-knife',
        permanent: true,
      },
      {
        source: '/reviews/victorinox-fibrox-chef-knife',
        destination: '/reviews/victorinox-fibrox-10-inch-chefs-knife',
        permanent: true,
      },
      {
        source: '/reviews/rubbermaid-commercial-cooks-scraper-review',
        destination: '/reviews/rubbermaid-commercial-cooks-scraper',
        permanent: true,
      },
      {
        source: '/reviews/lodge-cast-iron-skillet-bundle',
        destination: '/reviews/lodge-seasoned-cast-iron-3-skillet-bundle',
        permanent: true,
      },
      {
        source: '/reviews/lodge-cast-iron-skillet-review',
        destination: '/reviews/lodge-seasoned-cast-iron-3-skillet-bundle',
        permanent: true,
      },
      {
        source: '/reviews/lodge-cast-iron-skillet',
        destination: '/reviews/lodge-seasoned-cast-iron-3-skillet-bundle',
        permanent: true,
      },
      {
        source: '/reviews/john-boos-platinum-cutting-board',
        destination: '/reviews/john-boos-platinum-commercial-cutting-board',
        permanent: true,
      },
      {
        source: '/reviews/john-boos-reversible-maple-board-review',
        destination: '/reviews/john-boos-platinum-commercial-cutting-board',
        permanent: true,
      },
      {
        source: '/reviews/john-boos-maple-reversible-board-review',
        destination: '/reviews/john-boos-platinum-commercial-cutting-board',
        permanent: true,
      },
      {
        source: '/reviews/nordic-ware-half-sheet-pan-review',
        destination: '/reviews/nordic-ware-half-sheet-pan',
        permanent: true,
      },
      {
        source: '/reviews/nordic-ware-sheet-pan-review',
        destination: '/reviews/nordic-ware-half-sheet-pan',
        permanent: true,
      },
      {
        source: '/reviews/le-creuset-7-25-qt-dutch-oven',
        destination: '/reviews/le-creuset-signature-7-25-qt-dutch-oven',
        permanent: true,
      },
      {
        source: '/reviews/cuisinart-saute-pan',
        destination: '/reviews/cuisinart-8-inch-nonstick-pan',
        permanent: true,
      },

      // ===== COMPETITOR PRODUCT 404 FIXES =====
      // These competitor products were in comparison tables but never had review pages
      // Redirecting to similar reviewed products to fix Google 404 errors
      {
        source: '/reviews/henckels-classic-4-inch-paring-knife',
        destination: '/reviews/victorinox-4-inch-paring-knife',
        permanent: true,
      },
      {
        source: '/reviews/hobart-n50-commercial-mixer',
        destination: '/reviews/kitchenaid-ksm8990wh',
        permanent: true,
      },
      {
        source: '/reviews/idahone-ceramic-12-inch-honing-rod',
        destination: '/reviews/henckels-sharpening-steel',
        permanent: true,
      },
      {
        source: '/reviews/kitchenaid-kfp0718-food-processor',
        destination: '/reviews/cuisinart-dlc-10c-classic-food-processor',
        permanent: true,
      },
      {
        source: '/reviews/mercer-genesis-3-5-inch-paring-knife',
        destination: '/reviews/victorinox-4-inch-paring-knife',
        permanent: true,
      },
      {
        source: '/reviews/swissmar-y-peeler-stainless',
        destination: '/reviews/oxo-good-grips-swivel-peeler',
        permanent: true,
      },
      {
        source: '/reviews/wusthof-9-inch-honing-steel',
        destination: '/reviews/henckels-sharpening-steel',
        permanent: true,
      },
      {
        source: '/reviews/wusthof-classic-3-5-inch-paring-knife',
        destination: '/reviews/victorinox-4-inch-paring-knife',
        permanent: true,
      },
      {
        source: '/reviews/all-clad-d3-pro-8-inch-nonstick',
        destination: '/reviews/cuisinart-8-inch-nonstick-pan',
        permanent: true,
      },
      {
        source: '/reviews/bodum-columbia-french-press',
        destination: '/reviews/bodum-chambord-french-press',
        permanent: true,
      },
      {
        source: '/reviews/dexter-russell-1376pcp-boning-knife',
        destination: '/reviews/victorinox-granton-edge-boning-knife',
        permanent: true,
      },
      {
        source: '/reviews/dexter-russell-s116-6-sani-safe-boning-knife',
        destination: '/reviews/victorinox-granton-edge-boning-knife',
        permanent: true,
      },
      {
        source: '/reviews/edlund-4412hdl-heavy-duty-tongs',
        destination: '/reviews/winco-heavy-duty-tongs',
        permanent: true,
      },
      {
        source: '/reviews/espro-p3-french-press',
        destination: '/reviews/bodum-chambord-french-press',
        permanent: true,
      },
      {
        source: '/reviews/globe-sp08-commercial-mixer',
        destination: '/reviews/kitchenaid-ksm8990wh',
        permanent: true,
      },
      {
        source: '/reviews/hamilton-beach-70725a-food-processor',
        destination: '/reviews/cuisinart-dlc-10c-classic-food-processor',
        permanent: true,
      },
      {
        source: '/reviews/kitchenaid-12-inch-stainless-tongs',
        destination: '/reviews/winco-heavy-duty-tongs',
        permanent: true,
      },
      {
        source: '/reviews/kuhn-rikon-swiss-peeler',
        destination: '/reviews/oxo-good-grips-swivel-peeler',
        permanent: true,
      },
      {
        source: '/reviews/mercer-genesis-m20106-stiff-boning-knife',
        destination: '/reviews/victorinox-granton-edge-boning-knife',
        permanent: true,
      },
      {
        source: '/reviews/ninja-bn601-food-processor',
        destination: '/reviews/cuisinart-dlc-10c-classic-food-processor',
        permanent: true,
      },
      {
        source: '/reviews/oxo-good-grips-12-inch-tongs',
        destination: '/reviews/winco-heavy-duty-tongs',
        permanent: true,
      },
      {
        source: '/reviews/spring-chef-premium-swivel-peeler',
        destination: '/reviews/oxo-good-grips-swivel-peeler',
        permanent: true,
      },
      {
        source: '/reviews/stanley-stay-hot-french-press',
        destination: '/reviews/bodum-chambord-french-press',
        permanent: true,
      },
      {
        source: '/reviews/t-fal-experience-8-inch-nonstick',
        destination: '/reviews/cuisinart-8-inch-nonstick-pan',
        permanent: true,
      },
      {
        source: '/reviews/tramontina-tri-ply-base-8-inch-nonstick',
        destination: '/reviews/cuisinart-8-inch-nonstick-pan',
        permanent: true,
      },
      {
        source: '/reviews/waring-wsm7q-commercial-mixer',
        destination: '/reviews/kitchenaid-ksm8990wh',
        permanent: true,
      },
      {
        source: '/reviews/zwilling-9-inch-sharpening-steel',
        destination: '/reviews/henckels-sharpening-steel',
        permanent: true,
      },

      // ===== BING 404 FIXES - January 2026 =====
      // Old category URL variations that never existed
      {
        source: '/moving-and-stirring-tools',
        destination: '/moving-stirring',
        permanent: true,
      },
      {
        source: '/cleaning-and-maintenance',
        destination: '/cleaning-maintenance',
        permanent: true,
      },
      {
        source: '/knives-and-cutting-tools',
        destination: '/knives',
        permanent: true,
      },
      {
        source: '/cookware-and-bakeware',
        destination: '/cookware',
        permanent: true,
      },
      // Blog URL variations
      {
        source: '/blog/food-processor-vs-blender-professional-uses',
        destination: '/blog/food-processor-vs-blender',
        permanent: true,
      },
      {
        source: '/blog/immersion-blender-restaurant-workhorse',
        destination: '/blog/immersion-blender-vs-countertop-blender',
        permanent: true,
      },
      // Review URL that never existed
      {
        source: '/reviews/wusthof-classic-4-inch-paring-knife',
        destination: '/reviews/victorinox-4-inch-paring-knife',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig