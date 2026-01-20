import fs from 'fs'
import path from 'path'
import { getBlogMetadata } from '@/data/metadata'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishDate: string
  formattedDate: string
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
      // Get title and description from centralized metadata
      const metadata = getBlogMetadata(slug)
      const title = metadata.title
      const excerpt = metadata.description

      const content = fs.readFileSync(pagePath, 'utf-8')

      // Try to extract publish date from page content
      let datePublishedMatch = content.match(/datePublished:\s*["'](\d{4}-\d{2}-\d{2})["']/)

      // Check for data file pattern if date not found
      if (!datePublishedMatch) {
        const dataFileMatch = content.match(/from\s+['"]\.\/(.*?-data(?:\.ts)?)['"]/i)
        if (dataFileMatch) {
          const dataFilePath = path.join(blogDir, slug, dataFileMatch[1].endsWith('.ts') ? dataFileMatch[1] : `${dataFileMatch[1]}.ts`)
          if (fs.existsSync(dataFilePath)) {
            const dataContent = fs.readFileSync(dataFilePath, 'utf-8')
            datePublishedMatch = dataContent.match(/publishedDate:\s*["'](\d{4}-\d{2}-\d{2})["']/)
          }
        }
      }

      // Estimate read time from content length
      const wordCount = content.split(/\s+/).length
      const readingSpeed = 200 // words per minute
      const estimatedMinutes = Math.ceil(wordCount / readingSpeed)
      const readTime = `${estimatedMinutes} min read`

      // Determine category - check slug and title first for most accurate categorization
      const titleLower = title.toLowerCase()
      const slugLower = slug.toLowerCase()

      let category = 'Cooking Techniques' // default

      // Comparisons - any post with "vs" in the slug
      if (slugLower.includes('-vs-')) {
        category = 'Comparisons'
      }
      // Knife Care - ONLY maintenance, storage, sharpening, rust removal, and buying guides
      else if (
        slugLower.includes('sharpen') ||
        slugLower.includes('steel-a-knife') ||
        slugLower.includes('tri-stone') ||
        slugLower.includes('knife-storage') ||
        slugLower.includes('knife-block') ||
        slugLower.includes('choose-first-chef-knife') ||
        slugLower.includes('rust-off-knife') ||
        titleLower.includes('sharpen') ||
        titleLower.includes('knife storage') ||
        titleLower.includes('knife block') ||
        (titleLower.includes('rust') && titleLower.includes('knife'))
      ) {
        category = 'Knife Care'
      }
      // Kitchen Safety
      else if (
        slugLower.includes('safety') ||
        slugLower.includes('gloves') ||
        titleLower.includes('safety')
      ) {
        category = 'Kitchen Safety'
      }
      // Ingredients - specific ingredient-focused posts
      else if (
        slugLower.includes('salt') ||
        slugLower.includes('garlic') ||
        slugLower.includes('onions') ||
        slugLower.includes('broccoli') ||
        slugLower.includes('tomatoes') ||
        slugLower.includes('potatoes') ||
        slugLower.includes('acids') ||
        slugLower.includes('oils') ||
        slugLower.includes('fats') ||
        slugLower.includes('herbs') ||
        titleLower.match(/^(understanding|guide to|complete guide).*(salt|garlic|onion|acid|oil|fat|herb)/i)
      ) {
        category = 'Ingredients'
      }
      // Buying Guides
      else if (
        slugLower.includes('buying-guide') ||
        slugLower.includes('starter-kit') ||
        slugLower.includes('tools-wasting') ||
        titleLower.includes('buying guide') ||
        titleLower.includes('which to buy') ||
        titleLower.includes('tools wasting')
      ) {
        category = 'Buying Guides'
      }
      // Everything else defaults to Cooking Techniques

      // Clean up date
      const publishDate = datePublishedMatch ? datePublishedMatch[1] : '2024-01-01'

      // Featured posts
      const featured = slug === 'best-scrambled-eggs'

      // Format date on server to prevent hydration mismatch
      const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })

      blogPosts.push({
        slug,
        title,
        excerpt,
        publishDate,
        formattedDate,
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
