/**
 * METADATA HELPER FUNCTIONS
 * 
 * Created: November 12, 2025
 * Purpose: Helper functions for retrieving and using metadata in pages
 */

import { Metadata } from 'next';
import { 
  getPageMetadata, 
  getBlogMetadata, 
  getReviewMetadata,
  getGuideMetadata,
  PageMetadata,
  BlogMetadata,
  ReviewMetadata
} from '@/data/metadata';

const SITE_URL = 'https://www.chefapprovedtools.com';
const SITE_NAME = 'Chef Approved Tools';

/**
 * Generate Next.js Metadata object from PageMetadata
 */
function createMetadataObject(
  meta: PageMetadata | BlogMetadata | ReviewMetadata, 
  path: string
): Metadata {
  const canonical = meta.canonical || `${SITE_URL}${path}`;
  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description;
  
  const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
    },
  };
  
  // Add keywords if available (blog posts)
  if ('keywords' in meta && meta.keywords) {
    // Convert structured keywords to array for Next.js metadata
    const keywordArray = [
      meta.keywords.primary,
      ...meta.keywords.secondary
    ];
    metadata.keywords = keywordArray;
  }
  
  return metadata;
}

/**
 * For static pages (About, Terms, Privacy, etc.)
 * 
 * Usage in page.tsx:
 * import { generateStaticMetadata } from '@/lib/metadata-helpers';
 * export const metadata = generateStaticMetadata('about');
 */
export function generateStaticMetadata(slug: string): Metadata {
  const meta = getPageMetadata(slug);
  const path = slug === 'home' ? '' : `/${slug}`;
  return createMetadataObject(meta, path);
}

/**
 * For blog posts
 * 
 * Usage in page.tsx:
 * import { generateBlogMetadata } from '@/lib/metadata-helpers';
 * export const metadata = generateBlogMetadata('cast-iron-vs-carbon-steel-pan');
 */
export function generateBlogMetadata(slug: string): Metadata {
  const meta = getBlogMetadata(slug);
  const path = `/blog/${slug}`;
  const metadata = createMetadataObject(meta, path);

  // Override OpenGraph type for articles
  if (metadata.openGraph) {
    (metadata.openGraph as any).type = 'article';
  }

  return metadata;
}

/**
 * For review pages
 * 
 * Note: Review pages will keep their existing generateMetadata() function
 * This is here for consistency, but reviews use data files + Supabase
 * 
 * Usage would be:
 * export const metadata = generateReviewMetadata('vitamix-5200');
 */
export function generateReviewMetadata(slug: string): Metadata {
  const meta = getReviewMetadata(slug);
  const path = `/reviews/${slug}`;
  return createMetadataObject(meta, path);
}

/**
 * For category/guide pages
 * 
 * Usage in page.tsx:
 * import { generateGuideMetadata } from '@/lib/metadata-helpers';
 * export const metadata = generateGuideMetadata('kitchen-appliances');
 */
export function generateGuideMetadata(slug: string): Metadata {
  const meta = getGuideMetadata(slug);
  const path = `/guides/${slug}`;
  return createMetadataObject(meta, path);
}

/**
 * Validate that a slug exists in metadata
 * Useful for catching typos during development
 */
export function validateMetadataExists(
  slug: string, 
  type: 'pages' | 'blog' | 'reviews' | 'guides'
): boolean {
  try {
    switch (type) {
      case 'pages':
        getPageMetadata(slug);
        break;
      case 'blog':
        getBlogMetadata(slug);
        break;
      case 'reviews':
        getReviewMetadata(slug);
        break;
      case 'guides':
        getGuideMetadata(slug);
        break;
    }
    return true;
  } catch {
    return false;
  }
}
