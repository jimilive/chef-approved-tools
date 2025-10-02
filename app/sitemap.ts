import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.chefapprovedtools.com'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/knives`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cookware`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/appliances`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/disclosure`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Actual product review pages
  const productReviews = [
    // Daily toolkit - 11 tools (HIGH PRIORITY)
    'victorinox-fibrox-10-inch-chefs-knife',
    'victorinox-fibrox-8-inch-chefs-knife',
    'victorinox-4-inch-paring-knife',
    'victorinox-granton-edge-boning-knife',
    'victorinox-offset-bread-knife',
    'victorinox-fibrox-pro-knife-set', // Buying guide for 4 essential Victorinox knives
    'oxo-good-grips-swivel-peeler',
    'oxo-good-grips-bench-scraper',
    'winco-heavy-duty-tongs',
    'benriner-large-mandoline',
    'gold-textiles-bar-mops',
    'epicurean-kitchen-cutting-board',
    // Other reviews
    'kitchenaid-ksm8990wh',
    'robot-coupe-r2-dice',
    'vitamix-5200',
    'wusthof-classic-ikon-15-piece',
    'le-creuset-signature-7-25-qt-dutch-oven',
    'john-boos-platinum-commercial-cutting-board',
    'lodge-seasoned-cast-iron-3-skillet-bundle'
  ]

  const productPages = productReviews.map(review => ({
    url: `${baseUrl}/reviews/${review}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Main review category page
  const reviewCategoryPages = [
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  ]

  // SEO landing pages - HIGH PRIORITY
  const seoLandingPages = [
    {
      url: `${baseUrl}/best-budget-chef-knife`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-knife-for-cutting-meat`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/kitchen-bundle`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Blog pages
  const blogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-sear-steaks-like-restaurant-chef`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Guide pages
  const guidePages = [
    {
      url: `${baseUrl}/guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/best-chef-knives`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/guides/best-cookware`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/guides/kitchen-appliances`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/cookware-materials`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/knife-care`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  return [...staticPages, ...seoLandingPages, ...reviewCategoryPages, ...productPages, ...blogPages, ...guidePages]
}