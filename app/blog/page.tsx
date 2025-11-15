import { Metadata } from 'next'
import BlogClient from './BlogClient'
import { getAllBlogPosts } from '@/lib/blog-utils'
import { getPageMetadata } from '@/data/metadata'
import { generateBreadcrumbSchema } from '@/lib/schema'

const pageMetadata = getPageMetadata('blog')

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: {
    canonical: pageMetadata.canonical,
  },
  openGraph: {
    title: pageMetadata.title,
    description: pageMetadata.description,
    url: pageMetadata.canonical,
    siteName: 'Chef Approved Tools',
    images: pageMetadata.imageUrl ? [{
      url: pageMetadata.imageUrl,
      alt: pageMetadata.imageAlt || pageMetadata.title,
    }] : undefined,
    type: 'website',
  },
}

export default async function BlogPage() {
  // Fetch posts server-side
  const posts = await getAllBlogPosts()

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' }
  ])

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Professional Chef Blog - Kitchen Tips & Techniques",
    "description": "Expert cooking techniques, kitchen tips, and professional insights from Chef Scott Bradley. Learn restaurant-level skills for your home kitchen.",
    "url": "https://www.chefapprovedtools.com/blog",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.chefapprovedtools.com/blog/${post.slug}`,
        "name": post.title,
        "description": post.excerpt
      }))
    },
    "author": {
      "@type": "Person",
      "@id": "https://www.chefapprovedtools.com/about#scott-bradley",
      "name": "Scott Bradley"
    },
    "publisher": {
      "@id": "https://www.chefapprovedtools.com/#organization"
    }
  }

  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <BlogClient posts={posts} />
    </>
  )
}
