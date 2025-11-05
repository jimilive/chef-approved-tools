import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishDate: string
  readTime: string
  category: string
  featured: boolean
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'app', 'blog')
  const entries = fs.readdirSync(blogDir, { withFileTypes: true })

  const blogPosts: BlogPost[] = []

  for (const entry of entries) {
    // Skip non-directories and the main blog page.tsx
    if (!entry.isDirectory()) continue

    const slug = entry.name
    const pagePath = path.join(blogDir, slug, 'page.tsx')

    // Check if page.tsx exists
    if (!fs.existsSync(pagePath)) continue

    try {
      const content = fs.readFileSync(pagePath, 'utf-8')

      // Extract metadata from the Metadata export - handle both single and double quotes
      const titleMatch = content.match(/title:\s*["']((?:[^"'\\]|\\.)*?)["']/)
      const descriptionMatch = content.match(/description:\s*["']((?:[^"'\\]|\\.)*?)["']/)

      // Extract from articleSchema (used in newer blog posts)
      const datePublishedMatch = content.match(/datePublished:\s*["'](\d{4}-\d{2}-\d{2})["']/)

      // Estimate read time from content length
      const wordCount = content.split(/\s+/).length
      const readingSpeed = 200 // words per minute
      const estimatedMinutes = Math.ceil(wordCount / readingSpeed)
      const readTime = `${estimatedMinutes} min read`

      // Determine category from keywords or content
      let category = 'Cooking Techniques'
      if (content.includes('knife') || content.includes('knife')) {
        category = 'Knife Care'
      } else if (content.includes('coffee')) {
        category = 'Coffee'
      } else if (content.includes('ingredients') || content.includes('salt')) {
        category = 'Ingredients'
      } else if (content.includes('safety') || content.includes('gloves')) {
        category = 'Kitchen Safety'
      } else if (content.includes('buying guide') || content.includes('tools')) {
        category = 'Buying Guides'
      }

      // Clean up escaped characters
      const title = titleMatch ? titleMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : slug.replace(/-/g, ' ')
      const publishDate = datePublishedMatch ? datePublishedMatch[1] : '2024-01-01'
      const excerpt = descriptionMatch ? descriptionMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : ''

      // Featured posts
      const featured = slug === 'best-scrambled-eggs'

      blogPosts.push({
        slug,
        title,
        excerpt,
        publishDate,
        readTime,
        category,
        featured
      })
    } catch (error) {
      console.error(`Error reading blog post ${slug}:`, error)
    }
  }

  // Sort by publish date (newest first)
  blogPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

  return blogPosts
}
