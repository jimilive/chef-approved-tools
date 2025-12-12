'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface RelatedProduct {
  name: string
  description: string
  emoji: string
  href: string
}

interface RelatedProductsGridProps {
  title: string
  products: RelatedProduct[]
}

function ProductImage({ product }: { product: RelatedProduct }) {
  const [fallbackIndex, setFallbackIndex] = useState(0)

  // Extract slug from href (e.g., "/reviews/product-slug" -> "product-slug")
  const slug = product.href.replace('/reviews/', '').replace(/\/$/, '')

  // Try hero first, then -1.jpg, then -1.webp
  const imagePaths = [
    `/images/products/${slug}/${slug}-hero.jpg`,
    `/images/products/${slug}/${slug}-1.jpg`,
    `/images/products/${slug}/${slug}-1.webp`,
  ]

  const currentImagePath = imagePaths[fallbackIndex]

  if (fallbackIndex >= imagePaths.length) {
    // All fallbacks exhausted - show logo
    return (
      <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Chef Approved Tools"
          width={120}
          height={120}
          className="object-contain opacity-60"
        />
      </div>
    )
  }

  return (
    <div className="w-full aspect-[4/3] relative bg-white overflow-hidden">
      <Image
        src={currentImagePath}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        onError={() => setFallbackIndex(fallbackIndex + 1)}
      />
    </div>
  )
}

export default function RelatedProductsGrid({
  title,
  products
}: RelatedProductsGridProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 md:px-12 shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-[1.3]">
        {title}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product, index) => (
          <Link key={index} href={product.href} className="group no-underline">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <ProductImage product={product} />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-700 mb-3 flex-1">
                  {product.description}
                </p>
                <div className="text-orange-700 font-semibold text-sm">
                  Read Review →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
