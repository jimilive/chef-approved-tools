import Link from 'next/link'
import { Metadata } from 'next'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import ProductImpressionTracker from '@/components/ProductImpressionTracker'

export const metadata: Metadata = {
  title: 'Best Cookware 2024 - Restaurant-Grade Pans for Home Kitchens',
  description: 'Professional cookware recommendations from 23+ years of restaurant experience. Find pans that survive commercial use.',
  alternates: {
    canonical: '/guides/best-cookware',
  },
}

export default function BestCookwarePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Best Cookware 2024: Restaurant-Grade Pans for Home Use
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Professional cookware that can handle the heat of commercial kitchens
            and still perform perfectly in your home kitchen.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Cookware Recommendations</h2>

          <div className="space-y-8">
            <ProductImpressionTracker
              productName="All-Clad D3 Tri-Ply Stainless Steel"
              productSlug="all-clad-d3-tri-ply-stainless-steel"
              category="Cookware"
              brand="All-Clad"
              position={1}
              listName="guide_featured_products"
            >
              <article className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. All-Clad D3 Tri-Ply Stainless Steel</h3>
                <p className="text-slate-600 mb-4">
                  The gold standard for professional kitchens. Even heat distribution,
                  durable construction, and works on all cooktops including induction.
                </p>
                <div className="text-slate-500">
                  Full review coming soon
                </div>
              </article>
            </ProductImpressionTracker>

            <ProductImpressionTracker
              productName="Lodge Cast Iron Skillet"
              productSlug="lodge-seasoned-cast-iron-3-skillet-bundle"
              category="Cookware"
              brand="Lodge"
              position={2}
              listName="guide_featured_products"
            >
              <article className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Lodge Cast Iron Skillet</h3>
                <p className="text-slate-600 mb-4">
                  American-made cast iron that improves with age. Perfect for searing,
                  baking, and building flavor. Used these for 10+ years.
                </p>
                <CTAVisibilityTracker
                  ctaId="guide-best-cookware-review-link-1"
                  ctaType="internal_link"
                  merchant="internal"
                  productId="lodge-seasoned-cast-iron-3-skillet-bundle"
                  location="product_card"
                >
                  <Link
                    href="/reviews/lodge-seasoned-cast-iron-3-skillet-bundle"
                    className="text-orange-600 hover:text-orange-800 font-semibold"
                  >
                    Read full review →
                  </Link>
                </CTAVisibilityTracker>
              </article>
            </ProductImpressionTracker>

            <ProductImpressionTracker
              productName="Le Creuset Dutch Oven"
              productSlug="le-creuset-signature-7-25-qt-dutch-oven"
              category="Cookware"
              brand="Le Creuset"
              position={3}
              listName="guide_featured_products"
            >
              <article className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Le Creuset Dutch Oven</h3>
                <p className="text-slate-600 mb-4">
                  French craftsmanship that lasts generations. Perfect for braises,
                  stews, and bread baking. Investment piece worth every penny.
                </p>
                <CTAVisibilityTracker
                  ctaId="guide-best-cookware-review-link-2"
                  ctaType="internal_link"
                  merchant="internal"
                  productId="le-creuset-signature-7-25-qt-dutch-oven"
                  location="product_card"
                >
                  <Link
                    href="/reviews/le-creuset-signature-7-25-qt-dutch-oven"
                    className="text-orange-600 hover:text-orange-800 font-semibold"
                  >
                    Read full review →
                  </Link>
                </CTAVisibilityTracker>
              </article>
            </ProductImpressionTracker>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Cookware Materials Guide</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Stainless Steel</h4>
                <p>Durable, non-reactive, dishwasher safe. Best for searing and sauces.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Cast Iron</h4>
                <p>Excellent heat retention, naturally non-stick when seasoned. Perfect for high-heat cooking.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Enameled Cast Iron</h4>
                <p>No seasoning required, great for acidic foods. Ideal for braising and stewing.</p>
              </div>
            </div>
          </div>
        </section>

        <nav className="mt-12 pt-8 border-t border-gray-200">
          <CTAVisibilityTracker
            ctaId="guide-best-cookware-back-to-guides"
            position="final_cta"
            productSlug="guides"
            merchant="internal"
          >
            <Link
              href="/guides"
              className="text-orange-600 hover:text-orange-800 font-semibold"
            >
              ← Back to All Guides
            </Link>
          </CTAVisibilityTracker>
        </nav>
      </div>
    </main>
  )
}