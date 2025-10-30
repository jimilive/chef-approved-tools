# Review Page Template Structure

**Based on:** `wusthof-classic-ikon-16-piece` (Best example - 48/50 points)

---

## File Structure

```tsx
// ============================================================================
// IMPORTS
// ============================================================================
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'  // Always use Next.js Image
import { Star, CheckCircle, XCircle } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateProductReviewSchema, generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import AuthorBio from '@/components/AuthorBio'
import { Tier1Badge } from '@/components/ReviewTierBadge'  // or Tier2Badge
import AffiliateButton from '@/components/AffiliateButton'
import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'

// ============================================================================
// PRODUCT DATA (Required for all pages)
// ============================================================================
const productData = {
  name: "Full Product Name",
  slug: "product-slug",
  brand: "Brand Name",
  model: "Model Number",
  sku: "SKU-12345",
  gtin13: "0123456789012",  // If available
  images: {
    primary: "/logo.png"  // TODO: Replace with actual product image
  },
  priceRange: {
    min: 100,
    max: 150,
    currency: "USD"
  },
  dealStatus: "normal" as const,  // or "deal" | "sale"
  category: "Product Category",
  pros: [
    "Key benefit 1",
    "Key benefit 2",
    "Key benefit 3"
  ],
  cons: [
    "Limitation 1",
    "Limitation 2"
  ],
  affiliateLinks: [
    {
      retailer: "Amazon",
      url: "https://www.amazon.com/dp/ASIN?tag=chefapprovedt-20"
    }
  ],
  inStock: true,
  expertRating: 4.8,
  expertOpinion: "One-line summary of expert opinion after testing.",
  dateAdded: "2025-01-15",
  lastUpdated: "2025-01-15"
}

// ============================================================================
// BREADCRUMBS
// ============================================================================
const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: "Category", url: "https://www.chefapprovedtools.com/reviews/category" },
  { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
]

// ============================================================================
// METADATA (SEO)
// ============================================================================
export const metadata: Metadata = {
  title: "Product Name Review: X Years Professional Testing (2025)",
  description: "Professional chef review after X years testing. Complete analysis, pros/cons, performance data.",
  keywords: ["product review", "professional testing", "chef approved"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `https://www.chefapprovedtools.com/reviews/${productData.slug}`,
  },
  openGraph: {
    title: "Product Name Review: Professional Testing (2025)",
    description: "Professional review after years of testing in restaurant kitchens",
    images: ['/logo.png'],
    url: `https://www.chefapprovedtools.com/reviews/${productData.slug}`,
    type: 'article',
    siteName: 'Chef Approved Tools',
  }
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function ProductReview() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Product View Tracker - REQUIRED */}
      <ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        image={productData.images.primary}
        price={productData.priceRange.min}
      />

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex space-x-2 text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.name} className="flex items-center">
                {index > 0 && <span className="mr-2">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.url} className="text-gray-600 hover:text-orange-800 transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Main Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Product Name Review: X Years of Professional Kitchen Testing (2025)
          </h1>

          <Tier1Badge showDescription={true} />

          {/* Quick Rating Box */}
          <div className="quick-stats" style={{
            background: '#f8f9fa',
            padding: '20px',
            margin: '20px 0',
            borderLeft: '4px solid #28a745',
            borderRadius: '4px'
          }}>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: '1.6' }}>
              <strong>⭐⭐⭐⭐⭐ {productData.expertRating}/5</strong> | Based on X years professional testing<br/>
              <strong>✓ Key Feature 1</strong> | <strong>✓ Key Feature 2</strong> | <strong>✓ Key Feature 3</strong>
            </p>
          </div>
        </header>

        {/* PRIMARY CTA - ABOVE THE FOLD */}
        <div className="primary-cta" style={{
          background: '#fff3cd',
          padding: '25px',
          margin: '25px 0',
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px solid #ffc107'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '24px' }}>Check Current Best Price:</h3>

          <AffiliateButton
            href={productData.affiliateLinks[0].url}
            merchant="amazon"
            product={productData.slug}
            position="above_fold"
            variant="primary"
          >
            View on Amazon →
          </AffiliateButton>

          <p style={{ fontSize: '14px', color: '#666', marginTop: '15px' }}>
            💡 Pricing updated daily. We earn commission at no extra cost to you.
          </p>
        </div>

        {/* VERDICT SECTION */}
        <div className="verdict-box" style={{
          background: '#f8f9fa',
          padding: '25px',
          margin: '25px 0',
          borderRadius: '8px',
          borderLeft: '4px solid #0066cc'
        }}>
          <h2>Professional Verdict</h2>

          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            <strong>{productData.expertOpinion}</strong>
          </p>

          <div style={{
            background: 'white',
            padding: '15px',
            marginTop: '20px',
            borderRadius: '4px'
          }}>
            <p style={{ margin: '10px 0' }}>
              <strong>✓ Perfect For:</strong> Target audience description
            </p>
            <p style={{ margin: '10px 0' }}>
              <strong>✗ Skip If:</strong> Who should avoid this product
            </p>
          </div>
        </div>

        {/* FTC Disclosure */}
        <FTCDisclosure />

        {/* Quick Navigation */}
        <nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#testimonials" className="text-orange-600 hover:text-orange-800">User Reviews</a>
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

        {/* Hero Features */}
        <h2>Why This Product Delivers Professional Performance</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          margin: '30px 0'
        }}>

          {/* Feature boxes */}
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>⚡</div>
            <h3 style={{ margin: '10px 0', fontSize: '20px' }}>Feature Title</h3>
            <p>Feature description with specifics and benefits.</p>
          </div>

          {/* Add 3-4 feature boxes */}

        </div>

        {/* Real-World Testing - WITH INTERNAL LINKS */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Professional Kitchen Testing</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <p className="text-slate-700 leading-relaxed mb-4">
              Testing details with internal links to related products:
              <Link href="/reviews/related-product-1" className="text-orange-600 hover:text-orange-800 font-medium">
                Related Product Name
              </Link>
            </p>

            {/* Add 3-5 internal links throughout content */}

            <h3 className="text-xl font-semibold text-slate-900 mb-4 mt-6">Testing Environment</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• <strong>Location:</strong> Professional kitchen operations</li>
              <li>• <strong>Duration:</strong> X years of testing</li>
              <li>• <strong>Usage:</strong> Daily professional use</li>
            </ul>
          </div>
        </section>

        {/* MID-ARTICLE CTA */}
        <div style={{
          background: '#e7f3ff',
          padding: '20px',
          margin: '25px 0',
          borderRadius: '6px',
          borderLeft: '4px solid #0066cc',
          textAlign: 'center'
        }}>
          <p style={{ margin: '10px 0', fontSize: '18px', fontWeight: 'bold' }}>
            Convinced this is right for your kitchen?
          </p>
          <AffiliateButton
            href={productData.affiliateLinks[0].url}
            merchant="amazon"
            product={productData.slug}
            position="mid_article"
            variant="secondary"
          >
            Check Current Price →
          </AffiliateButton>
        </div>

        {/* Pros & Cons */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pros & Cons Based on Professional Use</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="flex items-center font-semibold text-green-800 mb-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                What Impressed Me
              </h3>
              <ul className="space-y-2">
                {productData.pros.map((pro, index) => (
                  <li key={index} className="text-green-700 text-sm">• {pro}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="flex items-center font-semibold text-red-800 mb-4">
                <XCircle className="w-5 h-5 mr-2" />
                Limitations & Considerations
              </h3>
              <ul className="space-y-2">
                {productData.cons.map((con, index) => (
                  <li key={index} className="text-red-700 text-sm">• {con}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ SECTION WITH SCHEMA MARKUP */}
        <h2 id="faq">Frequently Asked Questions</h2>

        <div itemScope itemType="https://schema.org/FAQPage">

          {/* Add 8-10 FAQ items */}
          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{
            margin: '20px 0',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '6px'
          }}>
            <h3 itemProp="name">Question text?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <div itemProp="text">
                <p><strong>Answer:</strong> Detailed answer with specifics.</p>
              </div>
            </div>
          </div>

        </div>

        {/* WHERE TO BUY SECTION */}
        <h2>Where to Buy</h2>
        <div className="merchant-ctas" style={{
          background: '#f8f9fa',
          padding: '25px',
          margin: '25px 0',
          borderRadius: '8px'
        }}>
          <h3 style={{ marginTop: 0 }}>Compare Prices:</h3>

          {productData.affiliateLinks.map((link, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '20px',
              margin: '15px 0',
              borderRadius: '6px',
              border: index === 0 ? '2px solid #ff9900' : '1px solid #dee2e6'
            }}>
              <AffiliateButton
                href={link.url}
                merchant={link.retailer.toLowerCase()}
                product={productData.slug}
                position="where_to_buy"
                variant="secondary"
              >
                View on {link.retailer} →
              </AffiliateButton>
            </div>
          ))}
        </div>

        {/* FINAL VERDICT & STRONG CTA */}
        <h2>The Bottom Line: My Professional Verdict</h2>

        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '8px',
          margin: '30px 0'
        }}>

          <h3 style={{ color: 'white', marginTop: 0, fontSize: '24px' }}>
            After X Years of Professional Testing...
          </h3>

          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            Final verdict summary paragraph.
          </p>

          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '20px',
            margin: '20px 0',
            borderRadius: '6px'
          }}>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
              Final Rating: ⭐⭐⭐⭐⭐ {productData.expertRating}/5
            </p>
            <ul style={{ margin: '15px 0 0 20px', fontSize: '16px', lineHeight: '1.8' }}>
              <li>Category 1: X/5</li>
              <li>Category 2: X/5</li>
              <li>Overall: {productData.expertRating}/5</li>
            </ul>
          </div>
        </div>

        {/* STRONG FINAL CTA */}
        <div style={{
          background: '#fff3cd',
          padding: '30px',
          margin: '30px 0',
          borderRadius: '8px',
          textAlign: 'center',
          border: '3px solid #ffc107'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '28px' }}>
            Ready to Experience Professional Performance?
          </h3>

          <AffiliateButton
            href={productData.affiliateLinks[0].url}
            merchant="amazon"
            product={productData.slug}
            position="final_cta"
            variant="primary"
          >
            Check Current Price →
          </AffiliateButton>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        <h2>Complete Your Professional Kitchen Setup</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          margin: '30px 0'
        }}>

          {/* Add 3 related product cards with internal links */}
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h4 style={{ marginTop: 0 }}>Related Product Name</h4>
            <p>Brief description explaining relationship.</p>
            <Link
              href="/reviews/related-product"
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

        </div>

        {/* Footer Elements */}
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
            <strong>💬 Questions?</strong> <Link href="/contact" style={{ color: '#0066cc' }}>
            Contact me directly</Link> for personalized recommendations.
          </p>
        </div>

        {/* Author Bio */}
        <AuthorBio />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateProductReviewSchema(productData))
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
  )
}
```

---

## Key Accessibility Requirements

### Image Alt Text Rules:
```tsx
// GOOD - Descriptive
<Image src="/product.jpg" alt="WÜSTHOF Classic IKON chef's knife with ergonomic handle" width={500} height={300} />

// GOOD - Decorative/redundant
<Image src="/icon.svg" alt="" role="presentation" />

// BAD - Generic
<Image src="/product.jpg" alt="product" />
```

### Heading Hierarchy:
- Single `<h1>` per page (product name)
- `<h2>` for major sections
- `<h3>` for subsections
- No skipping levels

### Semantic HTML:
- Use `<nav>` for breadcrumbs and navigation
- Use `<article>` for main content
- Use `<section>` for distinct content areas
- Use `<header>` and `<footer>` appropriately

---

## Internal Linking Strategy

Aim for 5-7 contextual internal links per page:

1. **Complementary products** (knife → cutting board)
2. **Category pages** (→ all chef knives)
3. **Comparison reviews** (8" vs 10")
4. **Related guides** (→ knife skills guide)
5. **Product bundles** (→ kitchen starter kit)

---

## Checklist for New Review Pages

- [ ] ProductViewTrackerWrapper imported and used
- [ ] productData structure complete
- [ ] All images use Next.js Image component
- [ ] All images have descriptive alt text
- [ ] Proper heading hierarchy (single h1)
- [ ] AuthorBio component included
- [ ] TestimonialsSection or placeholder
- [ ] 5+ internal links to related reviews
- [ ] FAQ section with schema markup
- [ ] Pros/cons section present
- [ ] Multiple CTAs (above fold, mid-article, final)
- [ ] Schema.org structured data
- [ ] Breadcrumbs with proper links
- [ ] FTC disclosure present
