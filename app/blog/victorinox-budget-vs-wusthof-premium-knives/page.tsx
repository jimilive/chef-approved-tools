import Link from 'next/link';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogHero from '@/components/blog/BlogHero';
import BlogQuickAnswer from '@/components/blog/BlogQuickAnswer';
import BlogComparisonTable from '@/components/blog/BlogComparisonTable';
import BlogEmailCapture from '@/components/blog/BlogEmailCapture';
import BlogFAQ from '@/components/blog/BlogFAQ';
import BlogNewsletterCTA from '@/components/blog/BlogNewsletterCTA';
import AuthorBio from '@/components/review/AuthorBio';
import { generateBlogMetadata } from '@/lib/metadata-helpers';
import { getBlogMetadata } from '@/data/metadata'
import { comparisonData } from './victorinox-wusthof-data';

export const metadata = generateBlogMetadata('victorinox-budget-vs-wusthof-premium-knives');

const blogMeta = getBlogMetadata('victorinox-budget-vs-wusthof-premium-knives')

const articleSchema = generateArticleSchema({
  headline: comparisonData.hero.title,
  description: blogMeta.description,
  datePublished: blogMeta.publishedDate,
  dateModified: blogMeta.lastUpdated,
  authorName: "Scott Bradley",
  urlPrefix: 'blog',
  urlSuffix: 'victorinox-budget-vs-wusthof-premium-knives'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: comparisonData.breadcrumb.title, url: "https://www.chefapprovedtools.com/blog/victorinox-budget-vs-wusthof-premium-knives" }
]);

const faqSchema = generateFAQSchema(comparisonData.faq.questions);

export const revalidate = 3600;

export default function VictorinoxVsWusthofPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BlogLayout breadcrumbTitle={comparisonData.breadcrumb.title}>
        <BlogHero
          title={comparisonData.hero.title}
          introduction={comparisonData.hero.introduction}
          publishedDate={blogMeta.publishedDate}
          lastUpdated={blogMeta.lastUpdated}
        />

        {/* Quick Answer Section */}
        <BlogQuickAnswer
          optionA={{
            title: comparisonData.quickAnswer.victorinoxChoice.title,
            points: comparisonData.quickAnswer.victorinoxChoice.points
          }}
          optionB={{
            title: comparisonData.quickAnswer.wusthofChoice.title,
            points: comparisonData.quickAnswer.wusthofChoice.points
          }}
        />

        {/* Comparison Table */}
        <BlogComparisonTable
          title={comparisonData.comparisonTable.title}
          columnA="Victorinox Fibrox 8&quot;"
          columnB="Wüsthof Classic 8&quot;"
          features={comparisonData.comparisonTable.features}
        />

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Compare CTAs */}
          <div className="bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <p className="text-xl font-bold text-slate-900 mt-0 mb-4">
              Compare the Options
            </p>
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-semibold">{comparisonData.productRecommendations.victorinox.title}</p>
                <p className="text-sm text-slate-600 mb-2">{comparisonData.productRecommendations.victorinox.description}</p>
                <CTAVisibilityTracker
                  ctaId="victorinox-top-cta"
                  position="above_fold"
                  productSlug={comparisonData.productRecommendations.victorinox.slug}
                  merchant="amazon"
                >
                  <Link
                    href={comparisonData.productRecommendations.victorinox.affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="inline-block bg-orange-900 hover:bg-orange-950 !text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Check Price on Amazon
                  </Link>
                </CTAVisibilityTracker>
              </div>
              <div>
                <p className="mb-2 font-semibold">{comparisonData.productRecommendations.wusthof.title}</p>
                <p className="text-sm text-slate-600 mb-2">{comparisonData.productRecommendations.wusthof.description}</p>
                <CTAVisibilityTracker
                  ctaId="wusthof-top-cta"
                  position="above_fold"
                  productSlug={comparisonData.productRecommendations.wusthof.slug}
                  merchant="amazon"
                >
                  <Link
                    href={comparisonData.productRecommendations.wusthof.affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="inline-block bg-orange-900 hover:bg-orange-950 !text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Check Price on Amazon
                  </Link>
                </CTAVisibilityTracker>
              </div>
            </div>
          </div>

          {/* Detailed Sections */}
          {comparisonData.detailedSections.map((section) => (
            <div key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              {section.subsections.map((subsection, subIndex) => (
                <div key={subIndex}>
                  <h3>{subsection.title}</h3>
                  {subsection.content.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              ))}

              {/* Mid-article CTAs after specific sections */}
              {section.id === 'where-victorinox-wins' && (
                <CTAVisibilityTracker
                  ctaId="victorinox-mid-cta"
                  position="mid_article"
                  productSlug={comparisonData.productRecommendations.victorinox.slug}
                  merchant="amazon"
                >
                  <Link
                    href={comparisonData.productRecommendations.victorinox.affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="inline-block bg-orange-900 hover:bg-orange-950 !text-white font-bold py-3 px-6 rounded-lg transition-colors my-4"
                  >
                    Check Victorinox Price on Amazon
                  </Link>
                </CTAVisibilityTracker>
              )}

              {section.id === 'where-wusthof-wins' && (
                <CTAVisibilityTracker
                  ctaId="wusthof-mid-cta"
                  position="mid_article"
                  productSlug={comparisonData.productRecommendations.wusthof.slug}
                  merchant="amazon"
                >
                  <Link
                    href={comparisonData.productRecommendations.wusthof.affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="inline-block bg-orange-900 hover:bg-orange-950 !text-white font-bold py-3 px-6 rounded-lg transition-colors my-4"
                  >
                    Check Wüsthof Price on Amazon
                  </Link>
                </CTAVisibilityTracker>
              )}
            </div>
          ))}

          <BlogNewsletterCTA slug="victorinox-budget-vs-wusthof-premium-knives" />

          {/* Final CTAs */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
            <h3 className="font-bold text-slate-900 mb-4">Ready to Choose?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold mb-2">Best for Most Cooks:</p>
                <CTAVisibilityTracker
                  ctaId="victorinox-final-cta"
                  position="final_cta"
                  productSlug={comparisonData.productRecommendations.victorinox.slug}
                  merchant="amazon"
                >
                  <Link
                    href={comparisonData.productRecommendations.victorinox.affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="inline-block bg-orange-900 hover:bg-orange-950 !text-white font-bold py-3 px-6 rounded-lg transition-colors w-full text-center"
                  >
                    Victorinox on Amazon
                  </Link>
                </CTAVisibilityTracker>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Premium Choice:</p>
                <CTAVisibilityTracker
                  ctaId="wusthof-final-cta"
                  position="final_cta"
                  productSlug={comparisonData.productRecommendations.wusthof.slug}
                  merchant="amazon"
                >
                  <Link
                    href={comparisonData.productRecommendations.wusthof.affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="inline-block bg-orange-900 hover:bg-orange-950 !text-white font-bold py-3 px-6 rounded-lg transition-colors w-full text-center"
                  >
                    Wüsthof on Amazon
                  </Link>
                </CTAVisibilityTracker>
              </div>
            </div>
          </div>
        </div>

        <BlogFAQ questions={comparisonData.faq.questions} />

        {/* Related Guides */}
        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2>More Kitchen Knife Guides</h2>
          <div className="space-y-3 my-6">
            {comparisonData.relatedLinks.map((link, index) => (
              <CTAVisibilityTracker
                key={index}
                ctaId={`related-link-${index}`}
                position="related_products"
                productSlug={link.href.split('/').pop() || ''}
                merchant="internal"
              >
                <Link
                  href={link.href}
                  className="block text-orange-700 hover:text-orange-800 font-medium"
                >
                  → {link.title}
                </Link>
              </CTAVisibilityTracker>
            ))}
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  );
}
