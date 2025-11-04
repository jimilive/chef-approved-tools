'use client'

import { useEffect } from 'react'
import { trackProductView } from '@/lib/tracking'

interface ProductViewTrackerProps {
  productName: string
  category: string
  price?: number
  brand?: string
}

export default function ProductViewTracker({ productName, category, price = 0, brand = 'Unknown' }: ProductViewTrackerProps) {
  useEffect(() => {
    trackProductView(productName, category, price, brand)
  }, [productName, category, price, brand])

  return null
}