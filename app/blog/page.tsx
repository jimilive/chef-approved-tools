import { Metadata } from 'next'
import BlogClient from './BlogClient'
import { getAllBlogPosts } from '@/lib/blog-utils'

export const metadata: Metadata = {
  title: 'Pro Cooking Techniques | Restaurant Methods',
  description: 'Professional cooking techniques from 24 years restaurant experience. Master methods that separate restaurant-quality from home cooking. Chef secrets revealed.',
  keywords: ['professional cooking techniques', 'restaurant cooking methods', 'chef techniques', 'kitchen manager tips', 'restaurant quality cooking', 'professional chef blog'],
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/blog',
  },
}

export default async function BlogPage() {
  // Fetch posts server-side
  const posts = await getAllBlogPosts()

  return <BlogClient posts={posts} />
}
