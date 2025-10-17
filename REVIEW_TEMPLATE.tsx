// REVIEW TEMPLATE - Copy this file to app/reviews/[product-slug]/page.tsx
// Replace all [PLACEHOLDER] values with actual content
// Delete all comments before publishing

import { Tier2Badge } from '@/components/ReviewTierBadge'; // or Tier1Badge for 15+ years
import FTCDisclosure from '@/components/FTCDisclosure';
import AffiliateButton from '@/components/AffiliateButton';
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '[Product Name] Review: [X Years] of [Testing Context] (2025)',
  description: 'Professional chef reviews [Product Name] after [X years] of [daily/weekly] use. Complete [testing description] review with [unique selling point].',
  openGraph: {
    title: '[Product Name] Review: [X Years] of [Testing Context] (2025)',
    description: 'Professional chef reviews [Product Name] after [X years] of use.',
    type: 'article',
    url: 'https://www.chefapprovedtools.com/reviews/[product-slug]',
  },
};

const productData = {
  name: "[Full Product Name with Model]",
  slug: "[product-slug]", // must match directory name
  brand: "[Brand Name]",
  model: "[MODEL-NUMBER]",
  category: "[Category]", // e.g., "Chef Knives", "Stand Mixers", "Cookware"
  rating: 5.0, // 1.0-5.0
  reviewCount: 1,
  pros: [
    "[Specific pro #1 with measurable detail]",
    "[Specific pro #2 with measurable detail]",
    "[Specific pro #3 with measurable detail]",
    "[Specific pro #4 with measurable detail]",
    "[Specific pro #5 if applicable]"
  ],
  cons: [
    "[Specific con #1]",
    "[Specific con #2]",
    "[Specific con #3]",
    "[Specific con #4 if applicable]"
  ],
  affiliateLinks: [
    {
      retailer: "Amazon",
      url: "https://www.amazon.com/[product-url]?&linkCode=ll1&tag=chefapprovedt-20&linkId=[unique-id]"
    }
  ],
  expertRating: 5.0,
  expertOpinion: "[One powerful sentence summarizing your verdict after X years of testing. Highlight the key finding and establish authority.]",
  dateAdded: "2025-01-15", // date you create the review
  lastUpdated: new Date().toISOString().split('T')[0]
};

const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
];

export default function ProductReview() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <article>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '20px', fontSize: '14px' }}>
          <a href="/" style={{ color: '#0066cc', textDecoration: 'none' }}>Home</a>
          {' > '}
          <a href="/reviews" style={{ color: '#0066cc', textDecoration: 'none' }}>Reviews</a>
          {' > '}
          <span style={{ color: '#666' }}>{productData.name}</span>
        </nav>

        {/* H1 Title */}
        <h1 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          marginBottom: '20px',
          lineHeight: '1.2',
          color: '#1a1a1a'
        }}>
          [Product Name] Review: [X Years] of [Testing Context]
        </h1>

        {/* Author Byline */}
        <div style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <strong>By Scott Bradley</strong> | Professional Chef | 40 Years Experience
        </div>

        {/* Tier Badge */}
        <Tier2Badge testingPeriod="[X Years in Professional/Home Kitchens]" showDescription={true} />

        {/* Quick Stats Box */}
        <div className="quick-stats" style={{
          background: '#f8f9fa',
          padding: '20px',
          margin: '20px 0',
          borderLeft: '4px solid #28a745',
          borderRadius: '4px'
        }}>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: '1.6' }}>
            <strong>⭐⭐⭐⭐⭐ 5/5</strong> | Based on [X years] of [daily/weekly] use<br/>
            <strong>💰 Current Price:</strong> Check price below<br/>
            <strong>✓ [Key Feature 1]</strong> | <strong>✓ [Key Feature 2]</strong> | <strong>✓ [Key Feature 3]</strong>
          </p>
        </div>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Quick Navigation */}
        <nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200" role="navigation" aria-label="Quick page navigation">
          <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#testimonials" className="text-orange-600 hover:text-orange-800">User Reviews</a>
            <span className="text-slate-400">|</span>
            <a href="#cost-analysis" className="text-orange-600 hover:text-orange-800">Cost Analysis</a>
            <span className="text-slate-400">|</span>
            <a href="#performance" className="text-orange-600 hover:text-orange-800">Performance</a>
            <span className="text-slate-400">|</span>
            <a href="#comparison" className="text-orange-600 hover:text-orange-800">vs. Competitors</a>
            <span className="text-slate-400">|</span>
            <a href="#specs" className="text-orange-600 hover:text-orange-800">Specifications</a>
            <span className="text-slate-400">|</span>
            <a href="#faq" className="text-orange-600 hover:text-orange-800">FAQ</a>
          </div>
        </nav>

        {/* Primary CTA Above the Fold */}
        <div style={{
          background: '#fff3cd',
          padding: '25px',
          margin: '25px 0',
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px solid #ffc107'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '24px' }}>Current Best Price:</h3>

          <AffiliateButton
            href={productData.affiliateLinks[0].url}
            merchant="amazon"
            product={productData.slug}
            position="above_fold"
            variant="primary"
          >
            Check Amazon Price →
          </AffiliateButton>

          <p style={{ fontSize: '14px', color: '#666', marginTop: '15px' }}>
            💡 Price updated daily. We earn commission at no extra cost to you.
          </p>
        </div>

        {/* Professional Verdict */}
        <div className="verdict-box" style={{
          background: '#f8f9fa',
          padding: '25px',
          margin: '25px 0',
          borderRadius: '8px',
          borderLeft: '4px solid #0066cc'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#1a1a1a' }}>
            Professional Verdict: [Compelling Headline]
          </h2>

          <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
            <strong>I&apos;ve used [product] for [X years] in [context].</strong> [2-3 sentences
            establishing your testing period and key finding. Lead with the most compelling fact.]
          </p>

          <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
            [Second paragraph expanding on why this matters and what you discovered through
            long-term testing. Include specific evidence.]
          </p>

          <div style={{
            background: 'white',
            padding: '15px',
            marginTop: '20px',
            borderRadius: '4px'
          }}>
            <p style={{ margin: '10px 0' }}>
              <strong>✓ Perfect For:</strong> [Specific user types who should buy this]
            </p>
            <p style={{ margin: '10px 0' }}>
              <strong>✗ Consider Alternatives If:</strong> [Specific scenarios where this isn&apos;t the best choice]
            </p>
          </div>
        </div>

        {/* Hero Features Grid - 4 Boxes */}
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px', color: '#1a1a1a' }}>
          Why I Recommend [Product Name]
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          margin: '30px 0'
        }}>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎯</div>
            <h3 style={{ margin: '10px 0', fontSize: '20px' }}>[Feature 1 Headline]</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              [2-3 sentences explaining this benefit with specific evidence from your testing]
            </p>
          </div>

          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>💰</div>
            <h3 style={{ margin: '10px 0', fontSize: '20px' }}>[Feature 2 Headline]</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              [2-3 sentences explaining value or cost-effectiveness]
            </p>
          </div>

          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🔧</div>
            <h3 style={{ margin: '10px 0', fontSize: '20px' }}>[Feature 3 Headline]</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              [2-3 sentences about build quality or reliability]
            </p>
          </div>

          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📏</div>
            <h3 style={{ margin: '10px 0', fontSize: '20px' }}>[Feature 4 Headline]</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              [2-3 sentences about design or usability benefit]
            </p>
          </div>
        </div>

        {/* Main Review Content - Testing History */}
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px', color: '#1a1a1a' }}>
          [Testing Timeline / How I&apos;ve Used It]
        </h2>

        <div style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '30px' }}>
          <p>
            [Opening paragraph establishing context. Link to related products you&apos;ve reviewed.]
            Over [X years], [product] has [proven/demonstrated/shown] [key finding]. This isn&apos;t
            equipment I tested briefly—this is [X years] of [daily/weekly/professional] use.
          </p>

          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#1a1a1a' }}>
            [Period 1 / Context 1]
          </h3>
          <p>
            [Describe initial acquisition, first impressions, early use. Be specific about dates,
            context, and what you used it for.]
          </p>

          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px', color: '#1a1a1a' }}>
            [Period 2 / Context 2]
          </h3>
          <p>
            [Describe continued use, what changed, how performance held up over time.]
          </p>

          {/* Add more subsections as needed for your testing history */}
        </div>

        {/* Customer Testimonials */}
        <section className="mb-12" id="testimonials">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What Real Users Are Saying</h2>
          <p className="text-sm text-slate-600 mb-4 italic">
            Customer reviews curated from Amazon verified purchasers. These represent selected
            experiences—see complete review history at source links.
          </p>

          <div className="space-y-4">
            {/* Testimonial 1 */}
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;[Customer quote about their experience with the product. Focus on longevity,
                reliability, or value. 1-2 sentences.]&quot;
              </p>
              <p className="text-sm text-slate-500">— Amazon verified purchaser (J.D., December 2024)</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <p className="text-slate-700 mb-2">
                &quot;[Second customer quote]&quot;
              </p>
              <p className="text-sm text-slate-500">— Amazon verified purchaser (M.K., November 2024)</p>
            </div>

            {/* Add 4-6 more testimonials - total of 6-8 */}
            {/* Copy the div structure above and update quotes and attribution */}
          </div>
        </section>

        {/* Cost-Per-Use Analysis */}
        <section className="mb-12" id="cost-analysis">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Cost-Per-Use Analysis</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-slate-700 mb-4">
              Let&apos;s break down the actual cost of ownership based on [X years] of use:
            </p>

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-4">
              <h3 className="font-bold text-slate-900 mb-3">Real-World Value Calculation</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Initial cost:</strong> ~$[XXX] ([year purchased])</li>
                <li>• <strong>Years of use:</strong> [X] years (and counting/total)</li>
                <li>• <strong>Estimated uses:</strong> [XXX+] uses</li>
                <li>• <strong>Cost per use:</strong> $[X.XX] per use</li>
                <li>• <strong>Annual cost:</strong> $[X.XX] per year</li>
              </ul>
            </div>

            <p className="text-slate-700 mb-4">
              <strong>Value comparison:</strong> [Compare to alternatives&apos; cost over the same period.
              Show total cost of ownership.]
            </p>

            <div className="bg-green-50 p-5 rounded-lg border border-green-200">
              <h3 className="font-bold text-slate-900 mb-3">What This Investment Delivered</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>[Benefit 1]:</strong> [Specific result]</li>
                <li>• <strong>[Benefit 2]:</strong> [Specific result]</li>
                <li>• <strong>[Benefit 3]:</strong> [Specific result]</li>
                <li>• <strong>[Benefit 4]:</strong> [Specific result]</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="mb-12" id="performance">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Measured Performance Data</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <h3 className="text-xl font-semibold text-slate-900 mb-3">[Performance Category 1]</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-slate-900 mb-2">[Metric Type]</p>
                <p className="text-slate-700 text-sm">
                  <strong>[Measurement 1]:</strong> [Value]<br/>
                  <strong>[Measurement 2]:</strong> [Value]<br/>
                  <strong>[Measurement 3]:</strong> [Value]
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-slate-900 mb-2">[Second Metric Type]</p>
                <p className="text-slate-700 text-sm">
                  <strong>[Measurement 1]:</strong> [Value]<br/>
                  <strong>[Measurement 2]:</strong> [Value]<br/>
                  <strong>[Measurement 3]:</strong> [Value]
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Reliability Metrics</h3>
            <div className="space-y-3 text-slate-700">
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <div>
                  <p className="font-semibold">[Reliability Factor 1]</p>
                  <p className="text-sm">[Specific data about reliability]</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <div>
                  <p className="font-semibold">[Reliability Factor 2]</p>
                  <p className="text-sm">[Specific data]</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <div>
                  <p className="font-semibold">[Reliability Factor 3]</p>
                  <p className="text-sm">[Specific data]</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-Article CTA */}
        <div style={{
          background: '#e7f3ff',
          padding: '25px',
          margin: '25px 0',
          borderRadius: '8px',
          textAlign: 'center',
          borderLeft: '4px solid #0066cc'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '20px' }}>
            Experience [Key Benefit] Yourself
          </h3>

          <p style={{ fontSize: '16px', margin: '15px 0' }}>
            [One sentence CTA mentioning key finding]
          </p>

          <AffiliateButton
            href={productData.affiliateLinks[0].url}
            merchant="amazon"
            product={productData.slug}
            position="mid_article"
            variant="secondary"
          >
            Check Amazon Price →
          </AffiliateButton>
        </div>

        {/* Additional Content Sections */}
        {/* Add: Practical Uses, Value Proposition, What It Does Well/Doesn't sections */}

        {/* Specifications Table */}
        <section className="mb-12" id="specs">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Complete Specifications & Dimensions</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Technical Specifications</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <dt className="text-slate-600">[Spec Name]:</dt>
                    <dd className="font-semibold">[Value]</dd>
                  </div>
                  {/* Add 6-8 technical specs */}
                </dl>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Physical Dimensions</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <dt className="text-slate-600">Width:</dt>
                    <dd className="font-semibold">[Value]</dd>
                  </div>
                  {/* Add dimensions, weight, finish, etc. */}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Competitor Comparison Table */}
        <section className="mb-12" id="comparison">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            {productData.name} vs. Competing {productData.category}
          </h2>

          <div style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Feature</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>{productData.brand}</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>[Competitor 1]</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>[Competitor 2]</th>
                </tr>
              </thead>
              <tbody>
                {/* Add 6-8 comparison rows - focus on features, not pricing */}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <h2 id="faq" style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px', color: '#1a1a1a' }}>
          Frequently Asked Questions About {productData.name}
        </h2>

        <div itemScope itemType="https://schema.org/FAQPage">
          {/* FAQ Item 1 */}
          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
               style={{ margin: '20px 0', padding: '20px', background: '#f8f9fa', borderRadius: '6px' }}>
            <h3 itemProp="name" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
              [Question 1]?
            </h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <div itemProp="text">
                <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  <strong>Answer:</strong> [Comprehensive answer referencing your specific testing experience]
                </p>
              </div>
            </div>
          </div>

          {/* Add 7-9 more FAQ items - total of 8-10 */}
        </div>

        {/* Related Products */}
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px', color: '#1a1a1a' }}>
          Complete Your [Context] Setup
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          margin: '30px 0'
        }}>
          {/* Related Product 1 */}
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <h4 style={{ marginTop: 0 }}>[Related Product 1 Name]</h4>
            <p>[Why it complements this product. 2-3 sentences.]</p>
            <p style={{ fontSize: '14px', color: '#666' }}>
              <strong>[Key stat]:</strong> [Value]
            </p>
            <Link
              href="/reviews/[related-product-slug]"
              style={{
                display: 'inline-block',
                background: '#28a745',
                color: 'white',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '4px',
                marginTop: '10px',
                fontWeight: 'bold'
              }}
            >
              Read Full Review →
            </Link>
          </div>

          {/* Add 2 more related products */}
        </div>

        {/* Final CTA */}
        <div style={{
          background: '#fff3cd',
          padding: '30px',
          margin: '30px 0',
          borderRadius: '8px',
          textAlign: 'center',
          border: '3px solid #ffc107'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '28px' }}>
            Ready to Experience [Key Benefit]?
          </h3>

          <p style={{ fontSize: '18px', margin: '20px 0' }}>
            Get the [product type] I&apos;ve trusted for [X years]:
          </p>

          <AffiliateButton
            href={productData.affiliateLinks[0].url}
            merchant="amazon"
            product={productData.slug}
            position="final_cta"
            variant="primary"
          >
            Check Amazon Price →
          </AffiliateButton>
        </div>

        {/* Footer */}
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          margin: '30px 0',
          borderRadius: '6px',
          borderLeft: '4px solid #6c757d'
        }}>
          <p style={{ margin: '10px 0' }}>
            <strong>📅 Last Updated:</strong> {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p style={{ margin: '10px 0' }}>
            <strong>🔧 Questions about [product category]?</strong>{' '}
            <a href="/contact" style={{ color: '#0066cc' }}>Contact me directly</a> and
            I&apos;ll help you choose the right equipment for your needs.
          </p>
        </div>

        {/* Author Bio */}
        <div style={{
          background: 'white',
          padding: '25px',
          margin: '30px 0',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          display: 'grid',
          gridTemplateColumns: '100px 1fr',
          gap: '20px',
          alignItems: 'start'
        }}>
          <img
            src="/images/team/head-shot-1.jpg"
            alt="Scott Bradley, Professional Chef"
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <h3 style={{ margin: '0 0 10px 0' }}>About Scott Bradley</h3>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
              Professional Chef • 40 Years Experience Since Age 15
            </p>
            <p style={{ margin: '10px 0', fontSize: '14px', lineHeight: '1.6' }}>
              [Customize this paragraph to mention specific experience relevant to THIS product.
              For example: &quot;Former Kitchen Manager at Mellow Mushroom with 23+ years of restaurant experience.
              [X] years of [product] use in [context] proves [key finding]—not just manufacturer claims.&quot;]
            </p>
            <a href="/about" style={{ color: '#0066cc', fontWeight: 'bold', textDecoration: 'none' }}>
              Read more about my testing methodology →
            </a>
          </div>
        </div>

        {/* Structured Data Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateProductSchema(productData))
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
          }}
        />

      </article>
    </div>
  );
}
