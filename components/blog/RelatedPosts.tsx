import Link from 'next/link'

interface RelatedPost {
  title: string
  slug: string
  excerpt: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

/**
 * RelatedPosts - Display related blog posts at the end of an article
 *
 * @param posts - Array of related posts with title, slug, and excerpt
 */
export default function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="bg-slate-50 rounded-xl p-8 mb-8">
      <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="text-orange-700 hover:text-orange-800 font-semibold"
          >
            → {post.title}
            {post.excerpt && (
              <p className="text-sm text-slate-600 font-normal mt-1">{post.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
