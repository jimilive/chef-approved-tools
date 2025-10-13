'use client'

import { useTrackProductView } from './RecentlyViewed'

interface ProductViewTrackerProps {
  slug: string
  name: string
  tier: 1 | 2
  testingPeriod: string
  rating: number
  hook: string
  category: string
}

/**
 * Client wrapper for tracking product views
 * Use this in server components to track product views
 */
export default function ProductViewTrackerWrapper({
  slug,
  name,
  tier,
  testingPeriod,
  rating,
  hook,
  category
}: ProductViewTrackerProps) {
  useTrackProductView({ slug, name, tier, testingPeriod, rating, hook, category })
  return null
}