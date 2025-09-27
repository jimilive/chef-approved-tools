// Advanced image optimization utilities

export interface BlurPlaceholder {
  blurDataURL: string;
  width: number;
  height: number;
}

// Generate blur placeholder from image dimensions
export function generateBlurPlaceholder(width: number, height: number, color = '#f3f4f6'): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// Optimized image loading configurations
export const imageConfigs = {
  hero: {
    priority: true,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality: 85
  },
  product: {
    priority: false,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality: 80,
    loading: 'lazy' as const
  },
  thumbnail: {
    priority: false,
    sizes: '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw',
    quality: 75,
    loading: 'lazy' as const
  },
  logo: {
    priority: true,
    sizes: '48px',
    quality: 90
  }
};

// Common image blur placeholders
export const commonBlurPlaceholders = {
  product: generateBlurPlaceholder(400, 300, '#f3f4f6'),
  logo: generateBlurPlaceholder(48, 48, '#ea580c'),
  hero: generateBlurPlaceholder(1200, 600, '#1e293b'),
  thumbnail: generateBlurPlaceholder(200, 150, '#f8fafc')
};

// Image optimization middleware
export function optimizeImageProps(
  src: string,
  alt: string,
  type: keyof typeof imageConfigs = 'product',
  customBlur?: string
) {
  const config = imageConfigs[type];
  const blurDataURL = customBlur || commonBlurPlaceholders[type] || commonBlurPlaceholders.product;

  return {
    src,
    alt,
    placeholder: 'blur' as const,
    blurDataURL,
    ...config
  };
}

// Lazy loading intersection observer setup
export function setupLazyLoading() {
  if (typeof window === 'undefined') return;

  // Only set up if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;

          // Load high-quality version
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }

          // Remove observer
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// WebP/AVIF detection and fallback
export function getOptimalImageFormat(): 'avif' | 'webp' | 'jpg' {
  if (typeof window === 'undefined') return 'jpg';

  // Check AVIF support
  const avifSupport = 'createImageBitmap' in window;
  if (avifSupport) return 'avif';

  // Check WebP support
  const canvas = document.createElement('canvas');
  const webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  if (webpSupport) return 'webp';

  return 'jpg';
}