import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { getProductsByCategory } from '@/lib/product-helpers'
import { getEditorialMetadataWithDefaults } from '@/lib/editorial-metadata'
import { getCategoryConfig } from '@/lib/category-config'
import ProductCard from '@/components/ProductCard'
import BreadcrumbSchema, { categoryBreadcrumbs } from '@/components/BreadcrumbSchema'

// ISR: Revalidate every 24 hours instead of force-dynamic
export const revalidate = 86400

// Get category configuration
const categoryConfig = getCategoryConfig('cleaning-maintenance')

// Metadata
export const metadata: Metadata = {
  title: categoryConfig.metaTitle,
  description: categoryConfig.metaDescription,
  alternates: {
    canonical: categoryConfig.canonicalUrl,
  },
  openGraph: {
    title: categoryConfig.metaTitle,
    description: categoryConfig.metaDescription,
    url: categoryConfig.canonicalUrl,
    siteName: 'Chef Approved Tools',
    type: 'website',
  },
}

export default async function CleaningMaintenancePage() {
  // Fetch products from Supabase
  const supabaseProducts = await getProductsByCategory(categoryConfig.supabaseCategory)

  // Map products to format expected by ProductCard
  const products = supabaseProducts.map((p, index) => {
    const editorial = getEditorialMetadataWithDefaults(p.slug)

    return {
      id: p.slug,
      name: p.name,
      slug: p.slug,
      category: categoryConfig.displayName,
      tier: editorial.tier,
      testingPeriod: editorial.testingPeriod,
      rating: p.expertRating || 4.5,
      hook: editorial.hook,
      position: index + 1,
      listName: categoryConfig.listName,
      images: p.images || null
    }
  })

  // FAQPage schema with unique FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categoryConfig.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      {/* Schema Markup - FAQs only */}
      <Script
        id="cleaning-maintenance-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={categoryBreadcrumbs['cleaning-maintenance']} />

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Hero Section */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {categoryConfig.h1}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700 mb-4">
                {categoryConfig.introParagraph1}
              </p>
              <p className="text-lg text-slate-700">
                {categoryConfig.introParagraph2}
              </p>
            </div>
          </section>

          {/* Products Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  ctaPrefix="cleaning-maintenance-category"
                />
              ))}
            </div>
          </section>

          {/* Related Guides Section */}
          {categoryConfig.relatedGuides.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Essential Maintenance Guides
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {categoryConfig.relatedGuides.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="block p-6 bg-white border-2 border-slate-200 rounded-lg hover:border-orange-600 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-slate-700">
                      {guide.description}
                    </p>
                    <span className="inline-flex items-center mt-4 text-orange-700 font-semibold">
                      Read Guide
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Blog Posts Section */}
          {categoryConfig.relatedBlogs.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Cleaning & Care Techniques
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryConfig.relatedBlogs.map((blog) => (
                  <Link
                    key={blog.href}
                    href={blog.href}
                    className="block p-5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-slate-700 mb-3">
                      {blog.description}
                    </p>
                    <span className="inline-flex items-center text-sm text-orange-700 font-semibold">
                      Read More
                      <svg
                        className="ml-1 w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {categoryConfig.faqs.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {categoryConfig.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 p-6 rounded-lg"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-slate-700">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Final CTA */}
          <section className="text-center py-12 bg-slate-50 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Questions About Kitchen Maintenance?
            </h2>
            <p className="text-lg text-slate-700 mb-6 max-w-2xl mx-auto">
              Get expert advice from a professional chef with 24 years of restaurant experience.
              I respond to every question personally.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-orange-800 text-white font-semibold rounded-lg hover:bg-orange-800 transition-colors"
            >
              Contact Me
            </Link>
          </section>

        </div>
      </main>
    </>
  )
}
