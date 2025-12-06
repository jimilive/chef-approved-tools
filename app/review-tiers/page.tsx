import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Clock, Award, CheckCircle } from 'lucide-react';
import ReviewTierBadge, { Tier1Badge, Tier2Badge, Tier3Badge } from '@/components/ReviewTierBadge';

export const metadata: Metadata = {
  title: 'How We Test: 3-Tier Kitchen Equipment Review System',
  description: 'How Chef Approved Tools tests kitchen equipment: 3 tiers of transparency from restaurant testing to long-term home use. Professional review methodology.',
  openGraph: {
    title: 'Our Three-Tier Review System | Chef Approved Tools',
    description: 'Transparent, honest kitchen equipment reviews based on real testing and 45 years of cooking experience.',
  },
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/review-tiers',
  },
};

export default function ReviewTiersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Three-Tier Review System
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Radical transparency about what I&apos;ve personally tested, what I&apos;m currently testing,
            and what I recommend based on professional experience.
          </p>
        </header>

        {/* Why We Have Tiers */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Three Tiers?</h2>
          <p className="text-slate-700 mb-4 leading-relaxed">
            After 45 years of cooking and 24 years in professional kitchens, I&apos;ve learned one thing:
            <strong> honesty builds trust</strong>. Not every product on this site has survived 18 months
            in a 200-cover restaurant kitchen. Some are currently on my home counter being tested daily.
            Others I recommend based on professional knowledge and experience with similar equipment.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Rather than pretend everything has been exhaustively tested, I&apos;m transparent about
            exactly what kind of experience backs each recommendation. That&apos;s why every review
            displays one of three tier badges.
          </p>
        </section>

        {/* Tier 1 */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-8 shadow-md border-2 border-amber-400">
            <div className="mb-6">
              <Tier1Badge showDescription={false} />
            </div>

            <h2 className="text-3xl font-bold text-amber-900 mb-4 flex items-center gap-3">
              <Shield className="w-8 h-8" />
              Tier 1: Professional Kitchen Proven
            </h2>

            <div className="space-y-4 text-slate-800">
              <p className="text-lg font-semibold">
                Tested 18+ months in commercial restaurant environments
              </p>

              <div className="bg-white/60 rounded-lg p-5">
                <h3 className="font-bold text-amber-900 mb-3">What This Means:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Tested for 18+ months in real restaurant kitchens serving 200+ covers nightly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Survived daily commercial abuse from multiple kitchen staff across different shifts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Every performance claim backed by documented restaurant experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>I know exactly how it performs when equipment failure means lost revenue</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-100/60 rounded-lg p-5">
                <h3 className="font-bold text-amber-900 mb-3">Examples of Tier 1 Products:</h3>
                <ul className="space-y-2">
                  <li>• <Link href="/reviews/kitchenaid-ksm8990wh" className="text-orange-700 hover:text-orange-800 underline font-semibold">KitchenAid Commercial Mixer</Link> - 18 months at Purple Cafe</li>
                  <li>• <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-orange-700 hover:text-orange-800 underline font-semibold">Victorinox 8&quot; Chef&apos;s Knife</Link> - 20 years of daily use</li>
                  <li>• <Link href="/reviews/le-creuset-signature-7-25-qt-dutch-oven" className="text-orange-700 hover:text-orange-800 underline font-semibold">Le Creuset Dutch Oven</Link> - 10 years home use</li>
                </ul>
              </div>

              <p className="text-sm text-slate-700 italic">
                This is the tier that separates marketing claims from reality. When a product earns
                Tier 1 status, it has proven itself where failure isn&apos;t an option.
              </p>
            </div>
          </div>
        </section>

        {/* Tier 2 */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-md border-2 border-blue-400">
            <div className="mb-6">
              <Tier2Badge showDescription={false} />
            </div>

            <h2 className="text-3xl font-bold text-blue-900 mb-4 flex items-center gap-3">
              <Clock className="w-8 h-8" />
              Tier 2: Long-Term Home Tested
            </h2>

            <div className="space-y-4 text-slate-800">
              <p className="text-lg font-semibold">
                6+ months of daily home kitchen use
              </p>

              <div className="bg-white/60 rounded-lg p-5">
                <h3 className="font-bold text-blue-900 mb-3">What This Means:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>6+ months of daily use in my home kitchen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Long-term durability and performance validated through extended use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Real-world testing in a home environment, not just initial impressions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Compared against restaurant equipment I&apos;ve used professionally</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-100/60 rounded-lg p-5">
                <h3 className="font-bold text-blue-900 mb-3">Why Tier 2 Matters:</h3>
                <p className="mb-3">
                  Not everything can be tested in a restaurant environment. Home appliances like blenders,
                  Instant Pots, and air fryers need to be evaluated in home kitchens. Tier 2 reviews provide
                  valuable insights during the testing period, with clear disclosure that the review is evolving.
                </p>
                <p className="text-sm font-semibold text-blue-900">
                  Tier 2 reviews are updated regularly with new findings. Check the &quot;Last Updated&quot;
                  date to see the most recent insights.
                </p>
              </div>

              <div className="bg-blue-100/60 rounded-lg p-5">
                <h3 className="font-bold text-blue-900 mb-3">Examples of Tier 2 Products:</h3>
                <ul className="space-y-2">
                  <li>• Ninja blender - Currently 45 days into home testing</li>
                  <li>• Instant Pot Ultra - Active testing for meal prep workflows</li>
                  <li>• New knife sets being evaluated for home cook recommendations</li>
                </ul>
              </div>

              <p className="text-sm text-slate-700 italic">
                Tier 2 gives you the benefit of my professional perspective during the testing period,
                with honesty about what I haven&apos;t yet learned. As products graduate to longer testing
                periods, they may move to Tier 1.
              </p>
            </div>
          </div>
        </section>

        {/* Tier 3 */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-8 shadow-md border-2 border-slate-400">
            <div className="mb-6">
              <Tier3Badge showDescription={false} />
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Award className="w-8 h-8" />
              Tier 3: Expert Evaluation
            </h2>

            <div className="space-y-4 text-slate-800">
              <p className="text-lg font-semibold">
                Professional assessment based on 24 years of kitchen experience
              </p>

              <div className="bg-white/60 rounded-lg p-5">
                <h3 className="font-bold text-slate-900 mb-3">What This Means:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Not personally tested long-term, but recommended based on professional knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Understanding of what makes equipment work comes from decades in kitchens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Clear disclosure that this is experience-based opinion, not long-term personal testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Often based on similarity to equipment I have used professionally</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-100/60 rounded-lg p-5">
                <h3 className="font-bold text-slate-900 mb-3">When Tier 3 Is Valuable:</h3>
                <p className="mb-3">
                  After 45 years of cooking (starting at age 15) and 24 years in professional kitchens,
                  I&apos;ve used hundreds of tools and appliances. I understand what separates good equipment
                  from marketing hype. While I haven&apos;t personally tested every product for 18+ months,
                  my professional experience allows me to identify quality and performance indicators.
                </p>
                <p className="font-semibold text-slate-900">
                  Tier 3 recommendations are honest about what they are: informed professional opinions,
                  not exhaustive personal testing. If you want products I&apos;ve tested extensively,
                  look for Tier 1 or Tier 2 badges.
                </p>
              </div>

              <div className="bg-slate-100/60 rounded-lg p-5">
                <h3 className="font-bold text-slate-900 mb-3">Examples of Tier 3 Products:</h3>
                <ul className="space-y-2">
                  <li>• Commercial ranges (understanding specs from restaurant equipment experience)</li>
                  <li>• Specialty tools (based on similar tools used professionally)</li>
                  <li>• Budget alternatives (understanding what compromises are acceptable)</li>
                </ul>
              </div>

              <p className="text-sm text-slate-700 italic">
                Tier 3 exists because honesty matters. Rather than pretend I&apos;ve personally tested
                everything for years, I&apos;m transparent about which recommendations come from experience
                and professional knowledge rather than hands-on long-term testing.
              </p>
            </div>
          </div>
        </section>

        {/* Author Credentials */}
        <section className="mb-12 bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who&apos;s Behind These Reviews?</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Scott Bradley</h3>
              <p className="text-slate-700 mb-3">Professional Chef • 45 Years Cooking Experience</p>

              <ul className="space-y-2 text-slate-700">
                <li>• <strong>45 years cooking experience</strong> (started at age 15)</li>
                <li>• <strong>24 years in professional kitchens</strong></li>
                <li>• <strong>7 years kitchen management</strong> (Mellow Mushroom, Purple Cafe)</li>
                <li>• <strong>Managed $80K+ monthly revenue</strong> operations</li>
                <li>• <strong>A.A.S. Culinary Arts</strong> - Seattle Central College</li>
                <li>• <strong>B.S. Business Administration</strong> - University of Montana</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 mb-3">Why This Experience Matters:</h3>
              <p className="text-slate-700 mb-3">
                Managing kitchens serving 200+ covers nightly means understanding what equipment
                performs when failure costs money. I&apos;ve seen what breaks under pressure, what
                lasts through years of abuse, and what&apos;s worth the investment.
              </p>
              <p className="text-slate-700">
                Every recommendation on this site is filtered through the lens of someone who&apos;s
                relied on equipment professionally, managed kitchen budgets, and understands the
                difference between marketing claims and real performance.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use This System */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 shadow-sm border-2 border-orange-300">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Use the Tier System</h2>

          <div className="space-y-4 text-slate-800">
            <div>
              <h3 className="font-semibold text-lg mb-2">Looking for battle-tested equipment?</h3>
              <p>Focus on <strong>Tier 1 reviews</strong> - these products have survived the ultimate test:
              18+ months in professional kitchens where equipment failure means lost revenue.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Want insights on newer products?</h3>
              <p>Check <strong>Tier 2 reviews</strong> - these provide real-time updates as products
              are actively tested. The reviews evolve as I learn more about strengths and weaknesses.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Need professional guidance on unfamiliar categories?</h3>
              <p><strong>Tier 3 reviews</strong> leverage 45 years of cooking experience to provide
              informed recommendations, even for products I haven&apos;t personally tested long-term.</p>
            </div>
          </div>
        </section>

        {/* Disclosure */}
        <section className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h2 className="text-xl font-bold text-yellow-900 mb-3">Our Commitment to Transparency</h2>
          <p className="text-yellow-900 mb-3">
            Every review on this site displays one of the three tier badges. We will never hide
            what kind of experience backs a recommendation. This tier system exists to build trust
            through radical honesty.
          </p>
          <p className="text-yellow-900 text-sm">
            <strong>Affiliate Disclosure:</strong> This site contains affiliate links. When you purchase
            through these links, we may earn a commission at no cost to you. However, tier assignments
            and honest assessments are never influenced by affiliate revenue. A Tier 3 product that
            pays high commissions remains Tier 3. A Tier 1 product with low commissions remains Tier 1.
            Honesty over revenue, always.
          </p>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-orange-900 hover:bg-orange-950 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg"
          >
            Browse All Reviews →
          </Link>
        </div>

      </article>
    </div>
  );
}
