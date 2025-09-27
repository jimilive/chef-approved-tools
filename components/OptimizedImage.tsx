'use client'
import { useState, useRef, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { optimizeImageProps, generateBlurPlaceholder } from '@/lib/image-optimization'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: string
  loading?: 'lazy' | 'eager'
  quality?: number
  imageType?: 'hero' | 'product' | 'thumbnail' | 'logo'
  customBlur?: string
}

export default function OptimizedImage({
  src,
  alt,
  fallback = '/images/placeholder.jpg',
  loading = 'lazy',
  quality = 85,
  imageType = 'product',
  customBlur,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  // Get optimized image properties
  const optimizedProps = optimizeImageProps(src as string, alt, imageType, customBlur)

  // Intersection Observer for progressive loading
  useEffect(() => {
    if (loading === 'eager' || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageLoading(false)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.1,
      }
    )

    const currentRef = imageRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [loading])

  const handleImageError = () => {
    setImageError(true)
    setImageSrc(fallback)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <div
      ref={imageRef}
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{ minHeight: props.height || '200px' }}
    >
      {/* Loading skeleton */}
      {imageLoading && loading === 'lazy' && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Actual image */}
      {(loading === 'eager' || !imageLoading) && (
        <Image
          {...props}
          {...optimizedProps}
          src={imageSrc}
          quality={quality || optimizedProps.quality}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        />
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}
    </div>
  )
}