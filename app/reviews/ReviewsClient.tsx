'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ProductCard from '@/components/ProductCard';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ProductImages } from '@/types/product';

const RecentlyViewed = dynamic(() => import('@/components/RecentlyViewed'), {
  ssr: false
});

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
  images?: ProductImages | null;
}

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
          24 years of professional kitchen experience.
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

        <p className="text-base text-gray-700 mb-8 leading-relaxed">
          These 6 products survived the most demanding commercial environments.
          Equipment failure in a restaurant means lost revenue—these tools never failed.
        </p>

        {/* Featured Grid - 2 columns */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-8">
          {featuredReviews.map((review, index) => (
            <ProductCard
              key={review.id}
              id={review.id}
              name={review.name}
              slug={review.slug}
              category={review.category}
              tier={review.tier}
              testingPeriod={review.testingPeriod || ''}
              rating={review.rating}
              hook={review.hook}
              position={index + 1}
              listName="reviews_landing_featured"
              featured={true}
              ctaPrefix="reviews-featured"
              images={review.images}
            />
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
            <ProductCard
              key={review.id}
              id={review.id}
              name={review.name}
              slug={review.slug}
              category={review.category}
              tier={review.tier}
              testingPeriod={review.testingPeriod || ''}
              rating={review.rating}
              hook={review.hook}
              position={index + 1}
              listName="reviews_landing_all"
              featured={false}
              ctaPrefix="reviews-all"
              images={review.images}
            />
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
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md no-underline font-bold text-base hover:bg-gray-100 transition-colors"
          >
            Contact Scott →
          </Link>
        </CTAVisibilityTracker>
      </div>

    </div>
  );
}
