import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

export async function getBenchScraperComparison() {
  // Fetch all comparison products from Supabase
  const products = await getProductsBySlugs([
    'oxo-good-grips-bench-scraper',
    'dexter-russell-sani-safe-bench-scraper',
    'norpro-grip-ez-scraper',
    'kitchenaid-bench-scraper'
  ])

  // Helper to safely get affiliate link
  const getLink = (slug: string) => {
    const product = products.find(p => p.slug === slug)
    return product ? getPrimaryAffiliateLink(product) : '#'
  }

  return {
    title: 'Bench Scraper Comparison',
    subtitle: 'Dough cutters and scrapers: ergonomics, sharpness, and versatility',
    products: [
      {
        name: 'OXO Good Grips',
        slug: 'oxo-good-grips-bench-scraper',
        affiliateLink: getLink('oxo-good-grips-bench-scraper'),
        material: 'Stainless Steel',
        handleComfort: 'Excellent (elevated)',
        bladeSharpness: 'Medium-High',
        measurements: 'Yes (detailed)',
        warranty: 'Lifetime',
        bestFor: 'Versatile home cooks',
        isHighlighted: true
      },
      {
        name: 'Dexter-Russell Sani-Safe',
        slug: 'dexter-russell-sani-safe-bench-scraper',
        affiliateLink: getLink('dexter-russell-sani-safe-bench-scraper'),
        material: 'Stainless Steel',
        handleComfort: 'Very Good (textured)',
        bladeSharpness: 'Very Sharp (pro)',
        measurements: 'No',
        warranty: 'Lifetime',
        bestFor: 'Professional bakers'
      },
      {
        name: 'Norpro Grip-EZ',
        slug: 'norpro-grip-ez-scraper',
        affiliateLink: getLink('norpro-grip-ez-scraper'),
        material: 'Stainless Steel',
        handleComfort: 'Excellent (Grip-EZ)',
        bladeSharpness: 'Medium',
        measurements: 'Yes (dual units)',
        warranty: 'Standard',
        bestFor: 'Budget-conscious'
      },
      {
        name: 'KitchenAid',
        slug: 'kitchenaid-bench-scraper',
        affiliateLink: getLink('kitchenaid-bench-scraper'),
        material: 'Stainless Steel',
        handleComfort: 'Good',
        bladeSharpness: 'Medium',
        measurements: 'Yes',
        warranty: '1 year + lifetime ltd',
        bestFor: 'Brand matchers'
      }
    ],
    comparisonRows: [
      { label: 'Material', field: 'material' as const },
      { label: 'Handle Comfort', field: 'handleComfort' as const },
      { label: 'Blade Sharpness', field: 'bladeSharpness' as const },
      { label: 'Measurements', field: 'measurements' as const },
      { label: 'Warranty', field: 'warranty' as const },
      { label: 'Best For', field: 'bestFor' as const }
    ],
    highlightedProduct: 'oxo-good-grips-bench-scraper'
  }
}
