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
  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-black px-2 py-1 sm:px-4 sm:py-2 rounded-md font-bold text-[10px] sm:text-sm shadow-md shadow-yellow-400/30 mb-3">
    <span className="text-sm sm:text-lg">🛡️</span>
    <span className="hidden sm:block">TIER 1: Professional Kitchen Tested</span>
    <span className="block sm:hidden">Pro Kitchen Tested</span>
  </div>
);

const Tier2Badge: React.FC<{ testingPeriod: string }> = ({ testingPeriod }) => (
  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md font-bold text-[10px] sm:text-sm shadow-md shadow-blue-500/30 mb-3">
    <span className="text-sm sm:text-lg">🏠</span>
    <span className="hidden sm:block">TIER 2: Home Tested ({testingPeriod})</span>
    <span className="block sm:hidden">Home Tested</span>
  </div>
);

const Tier3Badge = () => (
  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md font-bold text-[10px] sm:text-sm shadow-md shadow-purple-500/30 mb-3">
    <span className="text-sm sm:text-lg">🎓</span>
    <span className="hidden sm:block">TIER 3: Expert Evaluation</span>
    <span className="block sm:hidden">Expert Evaluated</span>
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

// All review data now comes from Supabase via server component props

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
      <div className="review-card bg-white border border-gray-300 rounded-lg p-4 sm:p-6 shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col hover:shadow-xl overflow-hidden">

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
