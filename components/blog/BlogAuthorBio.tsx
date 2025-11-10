import AuthorBio from '@/components/AuthorBio'

interface BlogAuthorBioProps {
  variant?: 'full' | 'compact' | 'inline'
  showImage?: boolean
}

/**
 * BlogAuthorBio - Standardized author section for blog posts
 *
 * Single source of truth for author information across all blog posts.
 * Uses the base AuthorBio component with blog-specific defaults.
 *
 * @example
 * ```tsx
 * import BlogAuthorBio from '@/components/blog/BlogAuthorBio'
 *
 * // In your blog post page.tsx:
 * <BlogAuthorBio />
 * ```
 */
export default function BlogAuthorBio({ variant = 'full', showImage = true }: BlogAuthorBioProps) {
  return (
    <div className="mt-8">
      <AuthorBio variant={variant} showImage={showImage} />
    </div>
  )
}
