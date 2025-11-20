'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ProductImpressionTracker from '@/components/ProductImpressionTracker';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';

const RecentlyViewed = dynamic(() => import('@/components/RecentlyViewed'), {
  ssr: false
});

// Tier Badge Components
const Tier1Badge = () => (
  <div className="inline-flex items-center gap-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-md font-bold text-sm shadow-md shadow-yellow-400/30 mb-3">
    <span className="text-lg">🛡️</span>
    <span>TIER 1: Professional Kitchen Tested</span>
  </div>
);

const Tier2Badge: React.FC<{ testingPeriod: string }> = ({ testingPeriod }) => (
  <div className="inline-flex items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md font-bold text-sm shadow-md shadow-blue-500/30 mb-3">
    <span className="text-lg">🏠</span>
    <span>TIER 2: Home Tested ({testingPeriod})</span>
  </div>
);

const Tier3Badge = () => (
  <div className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white px-4 py-2 rounded-md font-bold text-sm shadow-md shadow-purple-500/30 mb-3">
    <span className="text-lg">🎓</span>
    <span>TIER 3: Expert Evaluation</span>
  </div>
);

// Types
export interface Review {
  id: number;
  tier: 1 | 2 | 3;
  testingPeriod?: string;
  name: string;
  slug: string;
  rating: number;
  hook: string;
  revenueScore: number;
  category: string;
}

// Hardcoded reviews moved to server component - this array is no longer used
const LEGACY_allReviews: Review[] = [
  // TIER 1 - Professional Kitchen Tested (16 reviews)
  {
    id: 1,
    tier: 1,
    name: 'KitchenAid Commercial Mixer',
    slug: 'kitchenaid-ksm8990wh',
    rating: 4.8,
    testingPeriod: '18 months at Purple Café',
    hook: 'Survived 200+ covers nightly. Genuine commercial-grade performance.',
    revenueScore: 95,
    category: 'Commercial Equipment'
  },
  {
    id: 2,
    tier: 1,
    name: 'Vitamix 5200 Blender',
    slug: 'vitamix-5200',
    rating: 4.9,
    testingPeriod: '6 years in restaurant operations',
    hook: 'Restaurant workhorse. 10-year warranty justified by performance.',
    revenueScore: 92,
    category: 'Blenders'
  },
  {
    id: 3,
    tier: 1,
    name: 'Robot Coupe R2 Dice Food Processor',
    slug: 'robot-coupe-r2-dice',
    rating: 4.7,
    testingPeriod: '5 years commercial use',
    hook: 'Commercial power. Prep time reduced by 60% vs manual.',
    revenueScore: 88,
    category: 'Food Processors'
  },
  {
    id: 4,
    tier: 1,
    name: 'Victorinox Fibrox 8" Chef Knife',
    slug: 'victorinox-fibrox-8-inch-chefs-knife',
    rating: 4.8,
    testingPeriod: '15 years professional use',
    hook: 'Professional quality at accessible price. My daily knife.',
    revenueScore: 85,
    category: 'Knives'
  },
  {
    id: 5,
    tier: 1,
    name: 'Wusthof Classic Ikon 16 Piece Set',
    slug: 'wusthof-classic-ikon-16-piece',
    rating: 4.7,
    testingPeriod: 'Years at Feierabend',
    hook: 'Premium German steel. Professional performance.',
    revenueScore: 83,
    category: 'Knife Sets'
  },
  {
    id: 6,
    tier: 1,
    name: 'Victorinox Fibrox 10" Chef Knife',
    slug: 'victorinox-fibrox-10-inch-chefs-knife',
    rating: 4.7,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Longer blade for high-volume prep. Restaurant standard.',
    revenueScore: 80,
    category: 'Knives'
  },
  {
    id: 7,
    tier: 1,
    name: 'Diamond Crystal Kosher Salt',
    slug: 'diamond-crystal-kosher-salt',
    rating: 4.9,
    testingPeriod: '18 years (6 Purple Café + home)',
    hook: 'Professional chef standard. Clean flavor, perfect texture.',
    revenueScore: 75,
    category: 'Ingredients'
  },
  {
    id: 8,
    tier: 1,
    name: 'Norton IM200 Tri-Stone Sharpener',
    slug: 'norton-im200-tri-stone-sharpener',
    rating: 4.6,
    testingPeriod: 'Years of professional use',
    hook: 'Professional sharpening system. Restaurant-grade edge.',
    revenueScore: 72,
    category: 'Knife Care'
  },
  {
    id: 9,
    tier: 1,
    name: 'Bodum Chambord French Press',
    slug: 'bodum-chambord-french-press',
    rating: 4.5,
    testingPeriod: 'Years at Purple Café',
    hook: 'Restaurant coffee standard. Simple, reliable design.',
    revenueScore: 68,
    category: 'Coffee'
  },
  {
    id: 10,
    tier: 1,
    name: 'Victorinox Offset Bread Knife',
    slug: 'victorinox-offset-bread-knife',
    rating: 4.6,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Offset design for clean slicing. Professional ergonomics.',
    revenueScore: 65,
    category: 'Knives'
  },
  {
    id: 11,
    tier: 1,
    name: 'Benriner Large Mandoline',
    slug: 'benriner-large-mandoline',
    rating: 4.5,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Japanese precision. Professional prep speed.',
    revenueScore: 62,
    category: 'Prep Tools'
  },
  {
    id: 12,
    tier: 1,
    name: 'OXO Good Grips Bench Scraper',
    slug: 'oxo-good-grips-bench-scraper',
    rating: 4.7,
    testingPeriod: 'Daily professional use',
    hook: 'Most-used tool. Dough handling essential.',
    revenueScore: 60,
    category: 'Baking Tools'
  },
  {
    id: 13,
    tier: 1,
    name: 'OXO Good Grips Swivel Peeler',
    slug: 'oxo-good-grips-swivel-peeler',
    rating: 4.6,
    testingPeriod: 'Years of professional prep',
    hook: 'Sharp blade. Comfortable grip. Prep station standard.',
    revenueScore: 58,
    category: 'Prep Tools'
  },
  {
    id: 14,
    tier: 1,
    name: 'Victorinox 4" Paring Knife',
    slug: 'victorinox-4-inch-paring-knife',
    rating: 4.6,
    testingPeriod: 'Professional kitchen tested',
    hook: 'Precision work. Professional quality at budget price.',
    revenueScore: 56,
    category: 'Knives'
  },
  {
    id: 15,
    tier: 1,
    name: 'Victorinox Granton Edge Boning Knife',
    slug: 'victorinox-granton-edge-boning-knife',
    rating: 4.5,
    testingPeriod: 'Professional butchering tested',
    hook: 'Granton edge reduces drag. Professional precision.',
    revenueScore: 54,
    category: 'Knives'
  },
  {
    id: 16,
    tier: 3,
    name: 'ZUPERIA Bar Mops',
    slug: 'zuperia-bar-mops',
    rating: 4.8,
    testingPeriod: '18 years home use',
    hook: 'Industry standard. 100% ring spun cotton. Restaurant grade.',
    revenueScore: 50,
    category: 'Kitchen Textiles'
  },
  {
    id: 28,
    tier: 1,
    name: "Rubbermaid Commercial Cook's Scraper",
    slug: 'rubbermaid-commercial-cooks-scraper',
    rating: 4.9,
    testingPeriod: '18 years (Purple Café + home)',
    hook: '$15 buy-it-for-life spatula. 500°F heat resistance. NSF certified.',
    revenueScore: 67,
    category: 'Utensils'
  },

  // TIER 2 - Home Tested (11 reviews)
  {
    id: 17,
    tier: 2,
    testingPeriod: '10 Years',
    name: 'Le Creuset 7.25-Qt Dutch Oven',
    slug: 'le-creuset-signature-7-25-qt-dutch-oven',
    rating: 4.9,
    hook: 'Buy-it-for-life cookware. Zero staining after a decade.',
    revenueScore: 90,
    category: 'Cookware'
  },
  {
    id: 18,
    tier: 2,
    testingPeriod: '18 Years',
    name: 'John Boos Platinum Cutting Board',
    slug: 'john-boos-platinum-commercial-cutting-board',
    rating: 4.8,
    hook: 'Commercial-grade maple. Used managing $80K+ operations.',
    revenueScore: 87,
    category: 'Cutting Boards'
  },
  {
    id: 19,
    tier: 2,
    testingPeriod: '12 Years',
    name: 'Lodge Cast Iron 3-Skillet Bundle',
    slug: 'lodge-seasoned-cast-iron-3-skillet-bundle',
    rating: 4.7,
    hook: 'Generational cookware at 1/5 Le Creuset price.',
    revenueScore: 78,
    category: 'Cookware'
  },
  {
    id: 20,
    tier: 2,
    testingPeriod: '8 Years',
    name: 'KitchenAid KP26M1XLC Professional 600',
    slug: 'kitchenaid-kp26m1xlc-professional-600',
    rating: 4.6,
    hook: 'Home baker favorite. Powerful 575-watt motor.',
    revenueScore: 76,
    category: 'Mixers'
  },
  {
    id: 21,
    tier: 2,
    testingPeriod: '9 Years',
    name: 'Nordic Ware Half Sheet Pan',
    slug: 'nordic-ware-half-sheet-pan',
    rating: 4.7,
    hook: 'Never warped. Even browning for 9 years straight.',
    revenueScore: 70,
    category: 'Bakeware'
  },
  {
    id: 22,
    tier: 2,
    testingPeriod: '7 Years',
    name: 'Cuisinart DLC-10C Classic Food Processor',
    slug: 'cuisinart-dlc-10c-classic-food-processor',
    rating: 4.5,
    hook: 'Home kitchen workhorse. Reliable performance.',
    revenueScore: 68,
    category: 'Food Processors'
  },
  {
    id: 23,
    tier: 2,
    testingPeriod: '5 Years',
    name: 'Black+Decker Toaster Oven',
    slug: 'black-decker-toaster-oven',
    rating: 4.4,
    hook: 'Lower cost. Reliable everyday performance.',
    revenueScore: 55,
    category: 'Small Appliances'
  },
  {
    id: 24,
    tier: 2,
    testingPeriod: '6 Years',
    name: 'Epicurean Kitchen Cutting Board',
    slug: 'epicurean-kitchen-cutting-board',
    rating: 4.5,
    hook: 'Composite material. Dishwasher-safe convenience.',
    revenueScore: 52,
    category: 'Cutting Boards'
  },
  {
    id: 25,
    tier: 2,
    testingPeriod: '8 Years',
    name: 'Winco Heavy Duty Tongs',
    slug: 'winco-heavy-duty-tongs',
    rating: 4.6,
    hook: 'Locking mechanism works. Durable stainless steel.',
    revenueScore: 48,
    category: 'Utensils'
  },
  {
    id: 26,
    tier: 2,
    testingPeriod: '6 Months',
    name: 'Cuisinart High Impact 8" Nonstick Pan',
    slug: 'cuisinart-8-inch-nonstick-pan',
    rating: 4.7,
    hook: 'Perfect for eggs. Even heat distribution. Ideal for single servings.',
    revenueScore: 74,
    category: 'Cookware'
  },
  {
    id: 27,
    tier: 2,
    testingPeriod: '5 Years',
    name: 'Method All-Purpose Cleaner',
    slug: 'method-all-purpose-cleaner',
    rating: 4.8,
    hook: 'The unicorn of cleaners. Powerful AND non-toxic. Cuts grease effortlessly.',
    revenueScore: 66,
    category: 'Cleaning'
  }
];

// Review Card Component
const ReviewCard: React.FC<{ review: Review; featured?: boolean; position?: number }> = ({ review, featured = false, position = 0 }) => {
  return (
    <ProductImpressionTracker
      productName={review.name}
      productSlug={review.slug}
      category={review.category}
      brand={review.name.split(' ')[0]}
      price={0}
      position={position}
      listName={featured ? "reviews_landing_featured" : "reviews_landing_all"}
    >
      <div className="review-card bg-white border border-gray-300 rounded-lg p-6 shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col hover:shadow-xl">

        {/* Tier Badge */}
        {review.tier === 1 ? (
          <Tier1Badge />
        ) : review.tier === 2 ? (
          <Tier2Badge testingPeriod={review.testingPeriod || ''} />
        ) : (
          <Tier3Badge />
        )}

        {/* Category Tag */}
        <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-semibold">
          {review.category}
        </div>

        {/* Product Name */}
        <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold m-0 mb-3 leading-snug text-gray-900`}>
          {review.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="text-amber-700 text-lg" aria-label={`Rating: ${review.rating} out of 5 stars`}>
            {'★'.repeat(Math.floor(review.rating))}
            {review.rating % 1 !== 0 && '½'}
            {'☆'.repeat(5 - Math.ceil(review.rating))}
          </div>
          <span className="text-sm font-bold text-gray-800">
            {review.rating}/5
          </span>
        </div>

        {/* Testing Period */}
        <div className="bg-gray-100 px-3 py-2 rounded text-xs text-gray-700 mb-3 italic">
          📊 Tested: {review.testingPeriod}
        </div>

        {/* Hook */}
        <p className="text-sm leading-relaxed text-gray-700 m-0 mb-5 flex-1">
          {review.hook}
        </p>

        {/* CTA Button */}
        <CTAVisibilityTracker ctaId={`reviews-landing-${featured ? 'featured' : 'all'}-review-${review.id}`}
          merchant="internal"
          position="mid_article">
          <Link
            href={`/reviews/${review.slug}`}
            className="block bg-green-600 text-white px-6 py-3 text-center rounded-md no-underline font-bold text-sm transition-colors duration-200 hover:bg-green-700"
          >
            Read Full Review →
          </Link>
        </CTAVisibilityTracker>
      </div>
    </ProductImpressionTracker>
  );
};

// Main Component

interface ReviewsClientProps {
  reviews: Review[]
}

export default function ReviewsClient({ reviews }: ReviewsClientProps) {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'tier1' | 'tier2' | 'tier3'>('all');

  // Sort by revenue score
  const sortedReviews = [...reviews].sort((a, b) => b.revenueScore - a.revenueScore);

  // Get featured (top 6 Tier 1 by revenue)
  const featuredReviews = sortedReviews.filter(r => r.tier === 1).slice(0, 6);

  // Filter reviews based on active filter
  const filteredReviews = activeFilter === 'all'
    ? sortedReviews
    : sortedReviews.filter(r => r.tier === (activeFilter === 'tier1' ? 1 : activeFilter === 'tier2' ? 2 : 3));

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* Header */}
      <div className="mb-16">
        <h1 className="text-5xl font-extrabold m-0 mb-4 text-gray-900">
          Professional Kitchen Equipment Reviews
        </h1>
        <p className="text-xl leading-relaxed text-gray-700 m-0">
          45 years of cooking experience. 24 years restaurant management.
          Real testing in professional kitchens where equipment failure means lost revenue.
        </p>
      </div>
      
      {/* Featured Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold m-0 text-gray-900">
            🔥 Featured: Professional Kitchen Tested
          </h2>
        </div>

        <p className="text-base text-gray-600 mb-8 leading-relaxed">
          These 6 products survived the most demanding commercial environments.
          Equipment failure in a restaurant means lost revenue—these tools never failed.
        </p>

        {/* Featured Grid - 2 columns */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-8">
          {featuredReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} featured={true} position={index + 1} />
          ))}
        </div>
      </section>
      
      {/* All Reviews Section */}
      <section>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-5">
          <h2 className="text-3xl font-bold m-0 text-gray-900">
            All Reviews ({filteredReviews.length})
          </h2>

          {/* Filter Pills */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} border-none rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 hover:opacity-90`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setActiveFilter('tier1')}
              className={`px-4 py-2 ${activeFilter === 'tier1' ? 'bg-yellow-500 text-black' : 'bg-gray-200 text-gray-800'} border-none rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 hover:opacity-90`}
            >
              🛡️ Tier 1: Professional
            </button>
            <button
              onClick={() => setActiveFilter('tier2')}
              className={`px-4 py-2 ${activeFilter === 'tier2' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} border-none rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 hover:opacity-90`}
            >
              🏠 Tier 2: Home Tested
            </button>
            <button
              onClick={() => setActiveFilter('tier3')}
              className={`px-4 py-2 ${activeFilter === 'tier3' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'} border-none rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 hover:opacity-90`}
            >
              🎓 Tier 3: Expert
            </button>
          </div>
        </div>

        {/* All Reviews Grid - 3 columns */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
          {filteredReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} position={index + 1} />
          ))}
        </div>
      </section>

      {/* Recently Viewed Products */}
      <RecentlyViewed />

      {/* Call to Action Footer */}
      <div className="mt-20 p-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-center text-white">
        <h3 className="text-3xl font-bold m-0 mb-4">
          Can&apos;t Find What You&apos;re Looking For?
        </h3>
        <p className="text-lg m-0 mb-6 leading-relaxed">
          Get personalized equipment recommendations based on your specific needs and budget.
        </p>
        <CTAVisibilityTracker ctaId="reviews-landing-contact-cta"
          merchant="internal"
         position="mid_article">
          <Link
            href="/contact"
            className="inline-block bg-white text-indigo-500 px-8 py-3 rounded-md no-underline font-bold text-base hover:bg-gray-100 transition-colors"
          >
            Contact Scott →
          </Link>
        </CTAVisibilityTracker>
      </div>

    </div>
  );
}
