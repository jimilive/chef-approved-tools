import { Metadata } from 'next'
import BlogClient from './BlogClient'
import { getAllBlogPosts } from '@/lib/blog-utils'

export const metadata: Metadata = {
  title: 'Restaurant Techniques That Actually Work at Home',
  description: '24 years of professional cooking methods translated for home kitchens. Learn what actually matters vs. what\'s just chef theater.',
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
