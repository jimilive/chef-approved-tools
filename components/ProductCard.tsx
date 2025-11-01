'use client';

import React from 'react';
import Link from 'next/link';
import ProductImpressionTracker from '@/components/ProductImpressionTracker';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';

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

export interface ProductCardProps {
  id: string | number;
  name: string;
  slug: string;
  category: string;
  tier: 1 | 2 | 3;
  testingPeriod: string;
  rating: number;
  hook: string;
  position: number;
  listName: string;
  featured?: boolean;
  ctaPrefix?: string;
}

export default function ProductCard({
  id,
  name,
  slug,
  category,
  tier,
  testingPeriod,
  rating,
  hook,
  position,
  listName,
  featured = false,
  ctaPrefix = 'product-card'
}: ProductCardProps) {
  const brand = name.split(' ')[0];

  return (
    <ProductImpressionTracker
      productName={name}
      productSlug={slug}
      category={category}
      brand={brand}
      price={0}
      position={position}
      listName={listName}
    >
      <div className="review-card bg-white border border-gray-300 rounded-lg p-6 shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col hover:shadow-xl">

        {/* Tier Badge */}
        {tier === 1 ? (
          <Tier1Badge />
        ) : tier === 2 ? (
          <Tier2Badge testingPeriod={testingPeriod} />
        ) : (
          <Tier3Badge />
        )}

        {/* Category Tag */}
        <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-semibold">
          {category}
        </div>

        {/* Product Name */}
        <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold m-0 mb-3 leading-snug text-gray-900`}>
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="text-yellow-400 text-lg">
            {'★'.repeat(Math.floor(rating))}
            {rating % 1 !== 0 && '½'}
            {'☆'.repeat(5 - Math.ceil(rating))}
          </div>
          <span className="text-sm font-bold text-gray-800">
            {rating}/5
          </span>
        </div>

        {/* Testing Period */}
        <div className="bg-gray-100 px-3 py-2 rounded text-xs text-gray-700 mb-3 italic">
          📊 Tested: {testingPeriod}
        </div>

        {/* Hook */}
        <p className="text-sm leading-relaxed text-gray-700 m-0 mb-5 flex-1">
          {hook}
        </p>

        {/* CTA Button */}
        <CTAVisibilityTracker
          ctaId={`${ctaPrefix}-${id}`}
          position={`card_${position}`}
          productSlug={slug}
          merchant="internal"
        >
          <Link
            href={`/reviews/${slug}`}
            className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-center px-6 py-3 rounded-lg no-underline font-bold text-sm transition-all hover:shadow-md"
          >
            Read Full Review →
          </Link>
        </CTAVisibilityTracker>
      </div>
    </ProductImpressionTracker>
  );
}
