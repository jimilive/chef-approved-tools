'use client'

import { useEffect } from 'react'
import { trackProductView } from '@/lib/analytics'

interface ProductViewTrackerProps {
  productName: string
  category: string
}

export default function ProductViewTracker({ productName, category }: ProductViewTrackerProps) {
  useEffect(() => {
    trackProductView(productName, category)
  }, [productName, category])

  return null
}