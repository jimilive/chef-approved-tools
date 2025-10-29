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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com https://region1.analytics.google.com https://analytics.google.com",
              "img-src 'self' data: https: http:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "frame-src 'self' https://www.googletagmanager.com",
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
    ]
  },
  

}

module.exports = nextConfig