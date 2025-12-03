import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

export async function getScraperComparison() {
  // Fetch all comparison products from Supabase
  const products = await getProductsBySlugs([
    'rubbermaid-commercial-cooks-scraper',
    'vollrath-high-temp-spatula',
    'gir-ultimate-silicone-spatula',
    'oxo-good-grips-silicone-spatula'
  ])

  // Helper to safely get affiliate link
  const getLink = (slug: string) => {
    const product = products.find(p => p.slug === slug)
    return product ? getPrimaryAffiliateLink(product) : '#'
  }

  return {
    title: 'Silicone Spatula Comparison',
    subtitle: 'Professional-grade scrapers compared: durability, heat resistance, and value',
    products: [
      {
        name: 'Rubbermaid Commercial',
        slug: 'rubbermaid-commercial-cooks-scraper',
        affiliateLink: getLink('rubbermaid-commercial-cooks-scraper'),
        material: 'Silicone/Nylon',
        heatResistance: '500°F',
        durability: '5-10+ years pro',
        nsfCertified: 'Yes',
        madeIn: 'USA',
        bestFor: 'Pro kitchens, value seekers',
        isHighlighted: true
      },
      {
        name: 'Vollrath 52010',
        slug: 'vollrath-high-temp-spatula',
        affiliateLink: getLink('vollrath-high-temp-spatula'),
        material: 'Silicone/Nylon',
        heatResistance: '500°F',
        durability: '5-10+ years pro',
        nsfCertified: 'Yes',
        madeIn: 'USA',
        bestFor: 'Commercial preference'
      },
      {
        name: 'GIR Ultimate',
        slug: 'gir-ultimate-silicone-spatula',
        affiliateLink: getLink('gir-ultimate-silicone-spatula'),
        material: 'Platinum Silicone',
        heatResistance: '550°F',
        durability: 'Lifetime guarantee',
        nsfCertified: 'No',
        madeIn: 'USA',
        bestFor: 'Premium home cooks'
      },
      {
        name: 'OXO Good Grips',
        slug: 'oxo-good-grips-silicone-spatula',
        affiliateLink: getLink('oxo-good-grips-silicone-spatula'),
        material: 'Silicone/Plastic',
        heatResistance: '600°F',
        durability: '3-5 years home',
        nsfCertified: 'No',
        madeIn: 'China',
        bestFor: 'Everyday home use'
      }
    ],
    comparisonRows: [
      { label: 'Material', field: 'material' as const },
      { label: 'Heat Resistance', field: 'heatResistance' as const },
      { label: 'Durability', field: 'durability' as const },
      { label: 'NSF Certified', field: 'nsfCertified' as const },
      { label: 'Made In', field: 'madeIn' as const },
      { label: 'Best For', field: 'bestFor' as const }
    ],
    highlightedProduct: 'rubbermaid-commercial-cooks-scraper'
  }
}
