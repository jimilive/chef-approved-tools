import Link from 'next/link'
import { ReactNode } from 'react'

interface BlogLayoutProps {
  children: ReactNode
  breadcrumbTitle: string
}

/**
 * BlogLayout - Consistent wrapper for all blog posts
 *
 * Provides the gray background, max-width container, breadcrumb navigation,
 * and automatic prose styling for all blog content.
 * All blog posts should use this layout for consistency.
 *
 * @example
 * ```tsx
 * import BlogLayout from '@/components/blog/BlogLayout'
 *
 * export default function BlogPost() {
 *   return (
 *     <BlogLayout breadcrumbTitle="Cast Iron vs Carbon Steel">
 *       {/* Your blog post content - prose styling applied automatically *\/}
 *     </BlogLayout>
 *   )
 * }
 * ```
 */
export default function BlogLayout({ children, breadcrumbTitle }: BlogLayoutProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[900px] mx-auto px-5">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:text-orange-700">Home</Link>
          {' / '}
          <Link href="/blog" className="hover:text-orange-700">Blog</Link>
          {' / '}
          <span>{breadcrumbTitle}</span>
        </div>

        {/* Blog post content with automatic prose styling */}
        <div className="prose prose-lg prose-slate max-w-3xl mx-auto
          prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mb-4
          prose-h2:text-3xl prose-h2:mt-8 prose-h3:text-xl prose-h3:mt-6
          prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-p:text-slate-700
          prose-ul:my-6 prose-ul:space-y-2 prose-li:leading-relaxed
          prose-strong:text-slate-900 prose-strong:font-semibold
          prose-a:text-orange-700 prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>
      </div>
    </div>
  )
}
