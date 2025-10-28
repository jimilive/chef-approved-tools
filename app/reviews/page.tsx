import { getAllProducts } from '@/lib/product-helpers'
import ReviewsClient from './ReviewsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'All Reviews: Chef-Tested Kitchen Equipment',
  description: 'Complete collection of professional kitchen equipment reviews tested in real restaurant environments and home kitchens.',
}

// Editorial metadata for each product (tier, testing period, hook, revenue score)
// This keeps editorial control separate from database product data
const EDITORIAL_METADATA: Record<string, {
  tier: 1 | 2 | 3
  testingPeriod: string
  hook: string
  revenueScore: number
}> = {
  'kitchenaid-ksm8990wh': {
    tier: 1,
    testingPeriod: '18 months at Purple Café',
    hook: 'Survived 200+ covers nightly. Genuine commercial-grade performance.',
    revenueScore: 95
  },
  'vitamix-5200': {
    tier: 1,
    testingPeriod: '6 years in restaurant operations',
    hook: 'Restaurant workhorse. 10-year warranty justified by performance.',
    revenueScore: 92
  },
  'robot-coupe-r2-dice': {
    tier: 1,
    testingPeriod: '5 years commercial use',
    hook: 'Commercial power. Prep time reduced by 60% vs manual.',
    revenueScore: 88
  },
  'victorinox-fibrox-8-inch-chefs-knife': {
    tier: 1,
    testingPeriod: '15 years professional use',
    hook: 'Professional quality at accessible price. My daily knife.',
    revenueScore: 85
  },
  'wusthof-classic-ikon-16-piece': {
    tier: 1,
    testingPeriod: 'Years at Purple Café',
    hook: 'Premium German steel. Professional performance.',
    revenueScore: 83
  },
  'victorinox-fibrox-10-inch-chefs-knife': {
    tier: 1,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Longer blade for high-volume prep. Restaurant standard.',
    revenueScore: 80
  },
  'diamond-crystal-kosher-salt': {
    tier: 1,
    testingPeriod: '24 years (6 Purple Café + 18 home)',
    hook: 'Professional chef standard. Clean flavor, perfect texture.',
    revenueScore: 75
  },
  'norton-im200-tri-stone-sharpener': {
    tier: 1,
    testingPeriod: 'Years of professional use',
    hook: 'Professional sharpening system. Restaurant-grade edge.',
    revenueScore: 72
  },
  'bodum-chambord-french-press': {
    tier: 1,
    testingPeriod: 'Years at Purple Café',
    hook: 'Restaurant coffee standard. Simple, reliable design.',
    revenueScore: 68
  },
  'rubbermaid-commercial-cooks-scraper': {
    tier: 1,
    testingPeriod: '18 years (9 Purple Café + Feireabend + 9 home)',
    hook: '$15 buy-it-for-life spatula. 500°F heat resistance. NSF certified.',
    revenueScore: 67
  },
  'victorinox-offset-bread-knife': {
    tier: 1,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Offset design for clean slicing. Professional ergonomics.',
    revenueScore: 65
  },
  'benriner-large-mandoline': {
    tier: 1,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Japanese precision. Professional prep speed.',
    revenueScore: 62
  },
  'oxo-good-grips-bench-scraper': {
    tier: 1,
    testingPeriod: 'Daily professional use',
    hook: 'Most-used tool. Dough handling essential.',
    revenueScore: 60
  },
  'oxo-good-grips-swivel-peeler': {
    tier: 1,
    testingPeriod: 'Years of professional prep',
    hook: 'Sharp blade. Comfortable grip. Prep station standard.',
    revenueScore: 58
  },
  'victorinox-4-inch-paring-knife': {
    tier: 1,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Precision work. Professional quality at budget price.',
    revenueScore: 56
  },
  'victorinox-granton-edge-boning-knife': {
    tier: 1,
    testingPeriod: 'Professional butchering tested',
    hook: 'Granton edge reduces drag. Professional precision.',
    revenueScore: 54
  },
  'zuperia-bar-mops': {
    tier: 3,
    testingPeriod: 'Years at Purple Café',
    hook: 'Industry standard. 100% ring spun cotton. Restaurant grade.',
    revenueScore: 50
  },
  'le-creuset-signature-7-25-qt-dutch-oven': {
    tier: 2,
    testingPeriod: '12 Years',
    hook: 'Buy-it-for-life cookware. Zero staining after a decade.',
    revenueScore: 90
  },
  'john-boos-platinum-commercial-cutting-board': {
    tier: 2,
    testingPeriod: '18 Years',
    hook: 'Commercial-grade maple. Used managing $80K+ operations.',
    revenueScore: 87
  },
  'lodge-seasoned-cast-iron-3-skillet-bundle': {
    tier: 2,
    testingPeriod: '12 Years',
    hook: 'Generational cookware at 1/5 Le Creuset price.',
    revenueScore: 78
  },
  'kitchenaid-kp26m1xlc-professional-600': {
    tier: 2,
    testingPeriod: '8 Years',
    hook: 'Home baker favorite. Powerful 575-watt motor.',
    revenueScore: 76
  },
  'cuisinart-8-inch-nonstick-pan': {
    tier: 2,
    testingPeriod: '6 Months',
    hook: 'Perfect for eggs. Even heat distribution. Ideal for single servings.',
    revenueScore: 74
  },
  'nordic-ware-half-sheet-pan': {
    tier: 2,
    testingPeriod: '9 Years',
    hook: 'Never warped. Even browning for 9 years straight.',
    revenueScore: 70
  },
  'cuisinart-dlc-10c-classic-food-processor': {
    tier: 2,
    testingPeriod: '7 Years',
    hook: 'Home kitchen workhorse. Reliable performance.',
    revenueScore: 68
  },
  'method-all-purpose-cleaner': {
    tier: 2,
    testingPeriod: '5 Years',
    hook: 'The unicorn of cleaners. Powerful AND non-toxic. Cuts grease effortlessly.',
    revenueScore: 66
  },
  'black-decker-toaster-oven': {
    tier: 2,
    testingPeriod: '5 Years',
    hook: 'Budget-friendly. Reliable everyday performance.',
    revenueScore: 55
  },
  'epicurean-kitchen-cutting-board': {
    tier: 2,
    testingPeriod: '6 Years',
    hook: 'Composite material. Dishwasher-safe convenience.',
    revenueScore: 52
  },
  'winco-heavy-duty-tongs': {
    tier: 3,
    testingPeriod: '8 Years',
    hook: 'Locking mechanism works. Durable stainless steel.',
    revenueScore: 48
  },
  'small-plastic-hotel-pans': {
    tier: 1,
    testingPeriod: '20 years',
    hook: 'The single best upgrade for kitchen organization',
    revenueScore: 46
  },
  'small-metal-hotel-pans': {
    tier: 1,
    testingPeriod: '20 years',
    hook: 'Versatile workhorses for hot holding, oven use, and family gatherings',
    revenueScore: 45
  },
  'large-plastic-hotel-pans': {
    tier: 1,
    testingPeriod: '24 years professional',
    hook: 'Commercial workhorses for catering and large-scale operations',
    revenueScore: 44
  },
  'large-metal-hotel-pans': {
    tier: 1,
    testingPeriod: '24 years professional',
    hook: 'Commercial workhorses for catering and large-scale hot food service',
    revenueScore: 43
  },
  'instant-pot-duo-plus-6qt': {
    tier: 3,
    testingPeriod: '90 days',
    hook: '70% of commercial pressure cooking performance at 5% of the cost',
    revenueScore: 35
  },
  'japanese-wooden-spoon-set': {
    tier: 2,
    testingPeriod: '3 years + 100 dishwasher cycles',
    hook: 'Genuinely dishwasher safe wooden spoons at exceptional value',
    revenueScore: 51
  },
  'ninja-air-fryer-af101': {
    tier: 3,
    testingPeriod: '90 days',
    hook: '85% of deep-fryer results with zero oil mess',
    revenueScore: 33
  },
  'ninja-bl660-professional-blender': {
    tier: 3,
    testingPeriod: '90 days',
    hook: 'Adequate budget blending with concerning quality control issues',
    revenueScore: 32
  }
}

// Map Product to Review interface with editorial fields
function mapProductToReview(product: any, index: number) {
  const editorial = EDITORIAL_METADATA[product.slug]

  return {
    id: index + 1,
    tier: editorial?.tier || 1,
    testingPeriod: editorial?.testingPeriod || product.description || 'Professional testing',
    name: product.name,
    slug: product.slug,
    rating: product.expertRating || product.reviews?.rating || 4.5,
    hook: editorial?.hook || product.expertOpinion || product.description || '',
    revenueScore: editorial?.revenueScore || 40,
    category: product.category
  }
}

export default async function ReviewsPage() {
  // Fetch all products from Supabase
  const products = await getAllProducts()

  // Map products to review format
  const reviews = products.map((product, index) => mapProductToReview(product, index))

  return <ReviewsClient reviews={reviews} />
}
