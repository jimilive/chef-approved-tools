import Link from 'next/link';
import { Metadata } from 'next';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, Flame, Thermometer, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Vegetable Roasting Guide: Times and Temperatures | Chef Approved Tools",
  description: "Master vegetable roasting from a professional chef with 24 years of restaurant experience. Learn exact times, temperatures, and techniques for perfectly roasted vegetables every time.",
  keywords: ["roasting vegetables", "how to roast vegetables", "roasted vegetables temperature", "vegetable roasting times", "how long to roast vegetables", "perfect roasted vegetables"],
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/blog/vegetable-roasting-guide'
  }
};

const articleSchema = generateArticleSchema({
  headline: "Vegetable Roasting Guide: Times and Temperatures for Perfect Results",
  description: "Master vegetable roasting from a professional chef with 24 years of restaurant experience. Learn exact times, temperatures, and techniques for perfectly roasted vegetables every time.",
  datePublished: "2025-10-15",
  dateModified: "2025-10-24",
  authorName: "Scott Bradley",
  imageUrl: "https://www.chefapprovedtools.com/images/blog/vegetable-roasting-guide.jpg",
  urlPrefix: 'blog',
  urlSuffix: 'vegetable-roasting-guide'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Vegetable Roasting Guide", url: "https://www.chefapprovedtools.com/blog/vegetable-roasting-guide" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "Can I roast frozen vegetables?",
    answer: "Yes, but results are inferior to fresh. Pat dry to remove ice crystals, increase roasting time by 10 minutes, and expect less crispy texture due to higher water content."
  },
  {
    question: "Why do my vegetables burn on the outside but stay raw inside?",
    answer: "Cut size too large for temperature/time, or oven running too hot. Either cut smaller or lower temp to 400°F."
  },
  {
    question: "How do I make vegetables extra crispy?",
    answer: "Higher heat (450°F), less crowding, thorough drying before roasting, and don't stir too often. These four factors create maximum crispiness."
  }
]);

export default function VegetableRoastingGuidePage() {
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

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-orange-600 mb-4">
            <Flame className="w-5 h-5" />
            <span className="text-sm font-medium">Cooking Techniques</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Vegetable Roasting Guide: Times and Temperatures for Perfect Results
          </h1>
          <p className="text-xl text-slate-600">
            Master vegetable roasting from a professional chef with 24 years of restaurant experience. Learn exact times, temperatures, and techniques for perfectly roasted vegetables every time.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
            <span>By Chef Scott Bradley</span>
            <span>•</span>
            <span>October 24, 2025</span>
            <span>•</span>
            <span>11 min read</span>
          </div>
        </header>

        <div className="prose prose-lg prose-slate max-w-none">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-6 rounded-xl border-l-6 border-blue-600 my-8 shadow-lg">
            <p className="text-white font-semibold mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Restaurant Reality
            </p>
            <p className="text-blue-100 mb-0 leading-relaxed">
              At Feierabend in Seattle, we roasted vegetables for every service—Brussels sprouts, carrots, cauliflower, butternut squash. Every single day. New cooks would throw all the vegetables on one sheet pan at 425°F and wonder why some were burnt while others were raw. Different vegetables have different densities, water contents, and sugar levels—they require different treatment. Learning proper roasting times and temperatures turned vegetables from sad side dishes into menu highlights that people ordered specifically. Today I&apos;m giving you the exact times, temps, and techniques that create perfect roasted vegetables every time.
            </p>
          </div>

          <p>
            Roasted vegetables shouldn&apos;t be difficult—throw them in the oven with oil and heat, right? Yet home cooks consistently end up with vegetables that are either mushy and greasy, or burnt on the outside and raw inside, or just bland and disappointing.
          </p>

          <p>
            <strong>The problem isn&apos;t your vegetables or your oven.</strong> It&apos;s not understanding that <strong>different vegetables need different temperatures, different cut sizes, and different cooking times.</strong> Treating all vegetables the same guarantees inconsistent results.
          </p>

          <p>
            Once you understand the principles and know the right numbers, roasted vegetables become effortlessly delicious every single time.
          </p>

          <h2 className="flex items-center gap-2">
            <Thermometer className="w-6 h-6 text-orange-600" />
            Why Roasting Works: The Science
          </h2>

          <h3>Caramelization and Browning</h3>

          <p>
            <strong>What happens:</strong> Sugars in vegetables caramelize at high heat (320°F+), creating complex flavors and browning
          </p>

          <p>
            <strong>Why it matters:</strong> Raw broccoli is bitter. Roasted broccoli is sweet and nutty. The difference is caramelization.
          </p>

          <p>
            <strong>The Maillard reaction:</strong> Amino acids and sugars react at high heat, creating hundreds of flavor compounds that don&apos;t exist in raw vegetables.
          </p>

          <h3>Moisture Evaporation</h3>

          <p>
            <strong>What happens:</strong> High heat evaporates surface moisture quickly, allowing browning instead of steaming
          </p>

          <p>
            <strong>Why it matters:</strong> Wet surfaces steam, dry surfaces brown. Roasting concentrates flavors by removing water.
          </p>

          <p>
            <strong>The result:</strong> Vegetables shrink (water loss) but become more intensely flavored.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Common Misconception
            </p>
            <p className="mb-0">
              You can&apos;t roast vegetables at 350°F. That&apos;s baking, not roasting. True roasting requires 400°F minimum—preferably 425-450°F. Lower temperatures steam vegetables instead of caramelizing them. Use high heat or don&apos;t bother.
            </p>
          </div>

          <h2>The Universal Roasting Rules</h2>

          <h3>Rule #1: High Heat (400-450°F)</h3>

          <p>
            <strong>Why:</strong> Caramelization happens at 320°F+. Higher heat = faster browning, less time for vegetables to become mushy.
          </p>

          <p>
            <strong>Standard temp:</strong> 425°F is the sweet spot for most vegetables
          </p>

          <p>
            <strong>Exceptions:</strong> Delicate vegetables (tomatoes, asparagus) can go slightly lower (375-400°F)
          </p>

          <h3>Rule #2: Single Layer, No Overcrowding</h3>

          <p>
            <strong>Why:</strong> Crowded vegetables steam each other instead of roasting
          </p>

          <p>
            <strong>The test:</strong> Every vegetable piece should have space around it. If pan looks packed, use two pans.
          </p>

          <h3>Rule #3: Consistent Size</h3>

          <p>
            <strong>Why:</strong> Different sizes cook at different rates. 1/2&quot; cubes will be done while 2&quot; chunks are raw.
          </p>

          <p>
            <strong>The standard:</strong> Cut to similar sizes within 1/4&quot; of each other
          </p>

          <div className="bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-600" />
              Want My Complete Kitchen Setup Guide?
            </h3>
            <p className="mb-4">
              Get my free &quot;11 Essential Tools I Use Most&quot; PDF—the exact equipment I rely on after 24 years in professional kitchens, including sheet pans that create perfect roasted vegetables. No fluff, just the tools that actually matter.
            </p>
            <CTAVisibilityTracker
              ctaId="vegetable-roasting-guide-newsletter-cta"
              position="mid_article"
              productSlug="vegetable-roasting-guide"
              merchant="internal"
            >
              <Link
                href="/newsletter"
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded font-bold hover:bg-orange-700 transition-colors"
              >
                Get the Free Guide →
              </Link>
            </CTAVisibilityTracker>
            <p className="text-sm text-slate-600 mt-3 mb-0">
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          <h2>Complete Vegetable Roasting Chart</h2>

          <h3>Root Vegetables (Dense, Low Water Content)</h3>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-2 text-left">Vegetable</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Temperature</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Cut Size</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Time</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-4 py-2"><strong>Potatoes</strong></td>
                  <td className="border border-slate-300 px-4 py-2">425°F</td>
                  <td className="border border-slate-300 px-4 py-2">1&quot; cubes or wedges</td>
                  <td className="border border-slate-300 px-4 py-2">30-40 min</td>
                  <td className="border border-slate-300 px-4 py-2">Starchy, need space to crisp</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2"><strong>Sweet Potatoes</strong></td>
                  <td className="border border-slate-300 px-4 py-2">425°F</td>
                  <td className="border border-slate-300 px-4 py-2">1&quot; cubes</td>
                  <td className="border border-slate-300 px-4 py-2">25-35 min</td>
                  <td className="border border-slate-300 px-4 py-2">Higher sugar, brown faster</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2"><strong>Carrots</strong></td>
                  <td className="border border-slate-300 px-4 py-2">425°F</td>
                  <td className="border border-slate-300 px-4 py-2">1/2&quot; thick rounds</td>
                  <td className="border border-slate-300 px-4 py-2">25-30 min</td>
                  <td className="border border-slate-300 px-4 py-2">Toss halfway through</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Cruciferous Vegetables (Medium Density)</h3>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-2 text-left">Vegetable</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Temperature</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Cut Size</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Time</th>
                  <th className="border border-slate-300 px-4 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-4 py-2"><strong>Brussels Sprouts</strong></td>
                  <td className="border border-slate-300 px-4 py-2">425°F</td>
                  <td className="border border-slate-300 px-4 py-2">Halved</td>
                  <td className="border border-slate-300 px-4 py-2">20-25 min</td>
                  <td className="border border-slate-300 px-4 py-2">Cut side down for browning</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2"><strong>Broccoli</strong></td>
                  <td className="border border-slate-300 px-4 py-2">425°F</td>
                  <td className="border border-slate-300 px-4 py-2">2&quot; florets</td>
                  <td className="border border-slate-300 px-4 py-2">20-25 min</td>
                  <td className="border border-slate-300 px-4 py-2">High heat makes it crispy</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>The Bottom Line: Stop Guessing, Start Measuring</h2>

          <p>
            After roasting vegetables daily for 24 years in professional kitchens, here&apos;s what I want home cooks to understand:
          </p>

          <p>
            <strong>Perfectly roasted vegetables aren&apos;t a matter of luck or skill—they&apos;re a matter of following correct times and temperatures.</strong>
          </p>

          <p>
            Most home cooks roast vegetables at random temps for random times and hope for the best. Stop guessing. Use this chart. Follow the numbers. Match cut sizes to listed specifications. Your vegetables will be perfect every single time.
          </p>

          <p>
            The universal rules:
          </p>
          <ol>
            <li><strong>High heat</strong> (425°F for most vegetables)</li>
            <li><strong>Single layer</strong> (don&apos;t overcrowd)</li>
            <li><strong>Uniform sizes</strong> (consistent cooking)</li>
            <li><strong>Adequate fat</strong> (1-2 tbsp per pound)</li>
            <li><strong>Minimal stirring</strong> (once maximum)</li>
          </ol>

          <p>
            Follow those five rules and reference the timing chart, and you&apos;ll never serve sad, pale, steamed vegetables again.
          </p>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/benefits-cooking-with-garlic" className="text-orange-600 hover:text-orange-800 font-semibold">
              → Benefits of Cooking with Garlic
            </Link>
            <Link href="/blog/fat-is-flavor" className="text-orange-600 hover:text-orange-800 font-semibold">
              → Why Fat is Flavor
            </Link>
            <Link href="/blog/understanding-acids-cooking" className="text-orange-600 hover:text-orange-800 font-semibold">
              → Understanding Acids in Cooking
            </Link>
            <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-orange-600 hover:text-orange-800 font-semibold">
              → Victorinox Fibrox 8&quot; Chef&apos;s Knife Review
            </Link>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="text-xl font-bold text-slate-900 mb-2">About Scott Bradley</h4>
              <p className="text-slate-700 mb-3">
                Scott Bradley is a professional chef with 45 years of cooking experience, including 24 years in professional kitchens. He served as Kitchen Manager at Mellow Mushroom in Athens, GA, and held line positions at Purple Café, Feierabend, Il Pizzaiolo, and Paragary&apos;s. Scott holds an A.A.S. in Culinary Arts from Seattle Central College and a B.S. in Business Administration from the University of Montana.
              </p>
              <p className="text-slate-700">
                At Chef Approved Tools, Scott combines decades of professional experience with hands-on equipment testing to recommend the best kitchen tools for home cooks who want professional results without professional prices.
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
