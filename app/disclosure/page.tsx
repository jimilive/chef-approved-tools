// app/disclosure/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | How We Earn Commissions',
  description: 'Full disclosure of affiliate relationships. How Chef Approved Tools earns commissions from Amazon and other retailers through product recommendations.',
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/disclosure',
  },
}

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Affiliate Disclosure
          </h1>
          <p className="text-sm text-gray-700 italic">
            Last updated: December 2024
          </p>
        </div>

        {/* FTC Required Statement - Must be prominent */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
          <p className="font-semibold text-gray-900 mb-2">
            FTC Disclosure Compliance Statement
          </p>
          <p className="text-gray-800">
            Some of the links on Chef Approved Tools are affiliate links, which means we earn a commission if you click through and make a purchase, at no additional cost to you. 
            All opinions remain our own. As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Make Money
            </h2>
            <p className="mb-4">
              Chef Approved Tools is a free resource supported through affiliate partnerships. When you click on certain product links on our site and make a purchase, we may receive a commission from the retailer. This is at <strong>no extra cost to you</strong> – you pay the same price whether you use our link or go directly to the vendor&apos;s website.
            </p>
            <p>
              We primarily participate in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Review Process
            </h2>
            <p className="mb-4">
              Our recommendations are based on:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>24 years professional kitchen experience, including 7 years as Kitchen Manager</li>
              <li>Hands-on testing for a minimum of 6 months</li>
              <li>Comparison with similar products in the category</li>
              <li>Real-world performance in high-pressure environments</li>
              <li>Value for money considerations</li>
            </ul>
            <p>
              <strong>We never accept payment for positive reviews.</strong> Products are purchased with our own funds or tested in professional kitchen settings where we work.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Disclose Affiliate Links
            </h2>
            <p className="mb-4">
              We believe in complete transparency:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Individual product reviews include disclosure at the top of each post</li>
              <li>Affiliate links are marked with an asterisk (*) or &quot;(affiliate link)&quot; notation</li>
              <li>Our site header includes a banner noting our affiliate relationships</li>
              <li>Product comparison tables include affiliate disclosure</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Editorial Independence
            </h2>
            <p className="mb-4">
              Our editorial content is independent of our affiliate relationships:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>We recommend products we genuinely believe will benefit our readers</li>
              <li>We clearly identify product drawbacks and limitations</li>
              <li>We include non-affiliate alternatives when appropriate</li>
              <li>Negative aspects of products are always disclosed, regardless of commission potential</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Privacy
            </h2>
            <p className="mb-4">
              When you click on our affiliate links:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Cookies may be placed on your device by the merchant</li>
              <li>Your purchase behavior may be tracked by the merchant</li>
              <li>We do not have access to your personal payment information</li>
              <li>We only see aggregate, anonymized purchase data</li>
            </ul>
            <p>
              For more information, see our <Link href="/privacy-policy" className="text-orange-700 hover:text-orange-800 underline">Privacy Policy</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Questions or Concerns?
            </h2>
            <p className="mb-4">
              We value your trust above all else. If you have questions about our affiliate relationships or review process, please contact us:
            </p>
            <ul className="list-none space-y-2">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:hello@chefapprovedtools.com" className="text-orange-700 hover:text-orange-800 underline">
                  hello@chefapprovedtools.com
                </a>
              </li>
              <li>
                <strong>Response time:</strong> Within 48 hours
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Legal Compliance
            </h2>
            <p>
              This disclosure is provided in accordance with the Federal Trade Commission&apos;s 16 CFR Part 255: &quot;Guides Concerning the Use of Endorsements and Testimonials in Advertising&quot; and the Amazon Associates Program Operating Agreement.
            </p>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-700 mb-4">
            Thank you for supporting Chef Approved Tools through your purchases!
          </p>
          <Link 
            href="/"
            className="inline-block bg-orange-800 hover:bg-orange-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}