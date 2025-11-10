import EmailCaptureSection from '@/components/home/EmailCaptureSection'

/**
 * BlogEmailCapture - Standardized email capture section for blog posts
 *
 * Wrapper around the EmailCaptureSection component specifically for blog posts.
 * Provides consistent email capture across all blog content with appropriate spacing.
 *
 * @example
 * ```tsx
 * import BlogEmailCapture from '@/components/blog/BlogEmailCapture'
 *
 * // In your blog post page.tsx:
 * <BlogEmailCapture />
 * ```
 */
export default function BlogEmailCapture() {
  return (
    <div className="my-8 -mx-5">
      <EmailCaptureSection />
    </div>
  )
}
