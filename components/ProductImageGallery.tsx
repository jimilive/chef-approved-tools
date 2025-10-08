'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  productSlug: string
  productName: string
  imageCount: number
}

export default function ProductImageGallery({ productSlug, productName, imageCount }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(1)

  const images = Array.from({ length: imageCount }, (_, i) => i + 1)

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={`/images/products/${productSlug}/${productSlug}-${selectedImage}.webp`}
          alt={`${productName} - Image ${selectedImage}`}
          fill
          className="object-contain p-8"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          priority={selectedImage === 1}
        />
      </div>

      {/* Thumbnail Gallery */}
      {imageCount > 1 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-2 overflow-x-auto">
            {images.map((num) => (
              <button
                key={num}
                onClick={() => setSelectedImage(num)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === num
                    ? 'border-orange-600 ring-2 ring-orange-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Image
                  src={`/images/products/${productSlug}/${productSlug}-${num}.webp`}
                  alt={`${productName} thumbnail ${num}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
