// Test script to verify blog post discovery
import { getAllBlogPosts } from '../lib/blog-utils'

async function main() {
  const blogPosts = await getAllBlogPosts()

  console.log(`✅ Found ${blogPosts.length} blog posts\n`)

  // Show first 5 and last 5
  console.log('First 5 (newest):')
  blogPosts.slice(0, 5).forEach((post, i) => {
    console.log(`  ${i + 1}. ${post.title} (${post.publishDate})`)
  })

  console.log('\nLast 5 (oldest):')
  blogPosts.slice(-5).forEach((post, i) => {
    console.log(`  ${blogPosts.length - 4 + i}. ${post.title} (${post.publishDate})`)
  })

  // Count by category
  const categories = blogPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log('\nPosts by category:')
  Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`)
    })
}

main()
