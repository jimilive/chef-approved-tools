/**
 * Commercial Mixer Comparison Data for KitchenAid KSM8990WH Review
 * Research completed: December 2025
 */

import { getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/product-helpers'

/**
 * Fetch commercial mixer comparison data from Supabase
 * Returns the comparison table structure with live affiliate links
 */
export async function getCommercialMixerComparison() {
  // Fetch all 4 commercial mixer products from database
  const products = await getProductsBySlugs([
    'kitchenaid-ksm8990wh',
    'globe-sp08-commercial-mixer',
    'hobart-n50-commercial-mixer',
    'waring-wsm7q-commercial-mixer'
  ])

  // Map database products to comparison table structure
  const comparisonProducts = [
    // KITCHENAID KSM8990WH - The Featured Product
    {
      name: 'KitchenAid KSM8990WH',
      brand: 'KitchenAid',
      affiliateLink: products.find(p => p.slug === 'kitchenaid-ksm8990wh')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'kitchenaid-ksm8990wh')!)
        : '#',
      capacity: '8 qt',
      motor: '1.3 HP DC (500W)',
      speeds: '10 variable',
      transmission: 'Direct drive',
      liftType: 'Bowl-lift',
      nsfCertified: '✅ Yes',
      warranty: '2 years commercial',
      weight: '30 lbs',
      attachments: '15+ KitchenAid compatible',
      madeIn: 'USA 🇺🇸',
      bestFor: 'Serious bakers, small bakeries',
    },

    // GLOBE SP08
    {
      name: 'Globe SP08',
      brand: 'Globe',
      affiliateLink: products.find(p => p.slug === 'globe-sp08-commercial-mixer')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'globe-sp08-commercial-mixer')!)
        : '#',
      capacity: '8 qt',
      motor: '1/4 HP Gear',
      speeds: '3 fixed',
      transmission: 'Gear-driven',
      liftType: 'Bowl-lift',
      nsfCertified: '✅ Yes',
      warranty: '2 years',
      weight: '62 lbs',
      attachments: 'Limited',
      madeIn: 'USA-based company',
      bestFor: 'Budget commercial ops',
    },

    // HOBART N50
    {
      name: 'Hobart N50',
      brand: 'Hobart',
      affiliateLink: products.find(p => p.slug === 'hobart-n50-commercial-mixer')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'hobart-n50-commercial-mixer')!)
        : '#',
      capacity: '5 qt',
      motor: '1/6 HP Gear',
      speeds: '3 fixed',
      transmission: 'Gear-driven',
      liftType: 'Bowl-lift',
      nsfCertified: '✅ Yes',
      warranty: '1 year',
      weight: '55 lbs',
      attachments: '#10 taper hub',
      madeIn: 'USA 🇺🇸',
      bestFor: '20+ year reliability',
    },

    // WARING WSM7Q
    {
      name: 'Waring WSM7Q',
      brand: 'Waring',
      affiliateLink: products.find(p => p.slug === 'waring-wsm7q-commercial-mixer')
        ? getPrimaryAffiliateLink(products.find(p => p.slug === 'waring-wsm7q-commercial-mixer')!)
        : '#',
      capacity: '7 qt',
      motor: '1+ HP (850W)',
      speeds: '12 variable',
      transmission: 'Gear-driven',
      liftType: 'Tilt-head',
      nsfCertified: '✅ Yes',
      warranty: '2 years',
      weight: '~35 lbs',
      attachments: 'Whisk, paddle, hook',
      madeIn: 'USA 🇺🇸',
      bestFor: 'Mid-range commercial',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'KitchenAid KSM8990WH',
    title: 'Compare Commercial Stand Mixers',
    subtitle: 'See how the KitchenAid Commercial stacks up against top competitors',
    comparisonRows: [
      { label: 'Capacity', field: 'capacity' },
      { label: 'Motor', field: 'motor' },
      { label: 'Speeds', field: 'speeds' },
      { label: 'Transmission', field: 'transmission' },
      { label: 'Lift Type', field: 'liftType' },
      { label: 'NSF Certified', field: 'nsfCertified' },
      { label: 'Warranty', field: 'warranty' },
      { label: 'Weight', field: 'weight' },
      { label: 'Attachments', field: 'attachments' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Best For', field: 'bestFor' },
    ],
  }
}

// Key differentiators (for reference)
export const keyDifferentiators = {
  globe: 'Budget commercial workhorse. Gear-driven transmission with high torque - handles 3 loaves of bread dough. Only 3 speeds but built for abuse. 15-minute digital timer built in.',
  hobart: 'The gold standard. Gear-driven transmission = 20+ year lifespan. Used in culinary schools and professional kitchens worldwide. Smaller capacity (5 qt) but legendary durability.',
  waring: '12-speed versatility with 1+ HP motor. Tilt-head design for easy access. Soft start feature. NSF certified. Good middle ground between KitchenAid\'s power and Hobart\'s commercial credibility.',
}
