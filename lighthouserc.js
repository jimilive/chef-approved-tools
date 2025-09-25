module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/knives',
        'http://localhost:3000/cookware',
        'http://localhost:3000/appliances',
        'http://localhost:3000/about'
      ],
      startServerCommand: 'npm run build && npm start',
      startServerReadyPattern: 'ready on',
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': ['warn', { minScore: 0.8 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        
        // Performance metrics
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'interactive': ['error', { maxNumericValue: 5000 }],
        
        // Best practices
        'uses-https': 'error',
        'is-crawlable': 'error',
        'robots-txt': 'error',
        'canonical': 'error',
        'meta-description': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        
        // Images
        'modern-image-formats': 'warn',
        'uses-optimized-images': 'warn',
        'uses-responsive-images': 'warn',
        'image-alt': 'error',
        
        // Resources
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn',
        'render-blocking-resources': 'warn',
        'unminified-css': 'error',
        'unminified-javascript': 'error',
        
        // Accessibility
        'color-contrast': 'error',
        'link-name': 'error',
        'button-name': 'error',
        'image-alt': 'error',
        'label': 'error',
        'heading-order': 'error'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    },
    server: {
      port: 9001,
      storage: './lighthouse-results'
    }
  }
}