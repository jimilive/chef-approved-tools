import { Metadata } from 'next'
import BlogClient from './BlogClient'
import { getAllBlogPosts } from '@/lib/blog-utils'
import { getPageMetadata } from '@/data/metadata'

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

  return <BlogClient posts={posts} />
}
