import { Metadata } from 'next'
import NewsletterForm from './NewsletterForm'

export const metadata: Metadata = {
  title: "Equipment Newsletter: Chef's Tips & Honest Product Reviews",
  description: 'Get equipment insights and honest product recommendations from 24 years of restaurant experience. Join home chefs getting expert advice. Weekly emails.',
  keywords: 'kitchen tools guide, essential kitchen equipment, chef recommendations, professional kitchen tools, kitchen equipment list',
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/newsletter',
  },
}

export default function NewsletterPage() {

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-2">
        The 11 Tools I Use Most in My Home Kitchen
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        My daily workhorse tools after 45 years of cooking. Get the free guide plus equipment insights from 24 years of restaurant experience.
      </p>

      <NewsletterForm />

      <div className="max-w-2xl mx-auto py-8">
        <p className="text-sm text-slate-400 text-center leading-relaxed">
          Join 2,000+ home cooks getting weekly insights from 24 years of professional kitchen experience.
          Unsubscribe anytime. No spam, no sponsored content, no BS.
        </p>
      </div>

      <div className="text-left max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">What You&rsquo;ll Get:</h2>
        <ul className="list-none p-0">
          <li className="mb-3 flex items-center">
            <span className="text-orange-600 mr-2">✓</span>
            Weekly equipment recommendations from a certified chef
          </li>
          <li className="mb-3 flex items-center">
            <span className="text-orange-600 mr-2">✓</span>
            Exclusive deals on professional kitchen tools
          </li>
          <li className="mb-3 flex items-center">
            <span className="text-orange-600 mr-2">✓</span>
            Pro cooking tips from restaurant experience
          </li>
          <li className="mb-3 flex items-center">
            <span className="text-orange-600 mr-2">✓</span>
            Equipment maintenance guides
          </li>
        </ul>
      </div>
    </div>
  );
}