import Image from 'next/image'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
}

export default function ProductImage({
  src,
  alt,
  className = '',
  priority = false,
  fill = false,
  width,
  height,
  sizes
}: ProductImageProps) {
  // If no src provided or src is a placeholder, use logo
  const imageSrc = src && !src.includes('placeholder') && !src.includes('unsplash')
    ? src
    : '/logo.png'

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={`object-contain ${className}`}
        priority={priority}
        sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
        quality={75}
      />
    )
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 400}
      height={height || 400}
      className={`object-contain ${className}`}
      priority={priority}
      sizes={sizes}
      quality={75}
    />
  )
}
