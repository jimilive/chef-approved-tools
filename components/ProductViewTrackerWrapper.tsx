'use client'

import { useTrackProductView } from './RecentlyViewed'

interface ProductViewTrackerProps {
  slug: string
  name: string
  image: string
  price?: number
}

/**
 * Client wrapper for tracking product views
 * Use this in server components to track product views
 */
export default function ProductViewTrackerWrapper({
  slug,
  name,
  image,
  price
}: ProductViewTrackerProps) {
  useTrackProductView({ slug, name, image, price })
  return null
}