import Link from 'next/link';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import { generateBlogMetadata } from '@/lib/metadata-helpers';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, Flame, Droplets, Lightbulb } from 'lucide-react';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogHero from '@/components/blog/BlogHero';
import BlogEmailCapture from '@/components/blog/BlogEmailCapture';
import AuthorBio from '@/components/review/AuthorBio';

export const metadata = generateBlogMetadata('guide-cooking-oils-smoke-points');

const articleSchema = generateArticleSchema({
  headline: "Guide to Cooking Oils & Smoke Points",
  description: "Understanding different cooking oils, their smoke points, flavor profiles, and which oils work best for different cooking methods.",
  datePublished: "2025-10-02",
  dateModified: "2025-10-24",
  authorName: "Scott Bradley",
  urlPrefix: 'blog',
  urlSuffix: 'guide-cooking-oils-smoke-points'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Guide to Cooking Oils & Smoke Points", url: "https://www.chefapprovedtools.com/blog/guide-cooking-oils-smoke-points" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "What's the healthiest cooking oil?",
    answer: "For high-heat: Avocado oil or refined canola (stable at high temps). For medium-heat/finishing: Extra virgin olive oil (high in monounsaturated fats, antioxidants). For omega-3s: Flaxseed oil (no heat), walnut oil (finishing only). 'Healthiest' depends on use. All oils are calorie-dense. Focus on using the right oil for the job and not overusing any oil."
  },
  {
    question: "Can I mix different oils?",
    answer: "Yes! Mixing oils combines benefits. Examples: Olive oil + canola = flavor + higher smoke point. Butter + canola = flavor + prevents burning. Professional kitchens do this all the time."
  },
  {
    question: "What oil do restaurants use?",
    answer: "Most use canola or blended vegetable oil for 90% of cooking (cheap, neutral, high smoke point). They save olive oil, butter, and specialty oils for finishing or flavor."
  }
]);

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export default function CookingOilsGuidePage() {
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

      <BlogLayout breadcrumbTitle="Guide to Cooking Oils & Smoke Points">
        <BlogHero
          title="Guide to Cooking Oils & Smoke Points: Which Oil for Which Job"
          introduction={["Understanding different cooking oils, their smoke points, flavor profiles, and which oils work best for different cooking methods."]}
          publishedDate="2025-10-02"
          lastUpdated="2025-10-24"
          readTime="8 min read"
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <h2 className="mt-0 text-amber-900 font-bold">Restaurant Reality</h2>
            <p>
              <strong>Working the sauté station,</strong> a new line cook grabbed the olive oil for searing steaks. I stopped him before he hit the heat.
            </p>
            <p>
              &quot;Use this.&quot; I handed him the canola oil. &quot;Olive oil will smoke before the steak gets a crust. You&apos;ll fill the kitchen with smoke and the steak will taste burnt.&quot;
            </p>
            <p>
              &quot;But isn&apos;t olive oil healthier?&quot;
            </p>
            <p className="mb-0">
              &quot;Not when it&apos;s smoking. Different oils for different jobs. High heat needs high smoke point. Olive oil is for finishing or moderate heat.&quot; <strong>Every oil has a purpose. Use the wrong one and you&apos;re fighting your ingredients.</strong>
            </p>
          </div>

          <p>
            After 24 years in professional kitchens, I&apos;ve learned: the oil matters as much as the technique. Use the right oil and cooking becomes effortless. Use the wrong one and you&apos;ll fight smoke, burnt flavors, and poor results.
          </p>

          <p>
            Here&apos;s everything you need to know about cooking oils.
          </p>

          <h2 className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-700" />
            What is a Smoke Point (And Why It Matters)
          </h2>

          <p>
            <strong>Smoke point:</strong> The temperature where oil starts to break down and smoke.
          </p>

          <p>
            <strong>Why it matters:</strong>
          </p>
          <ul>
            <li>Smoking oil tastes burnt and bitter</li>
            <li>Smoking oil fills your kitchen with smoke (and triggers smoke alarms)</li>
            <li>Past smoke point, oil breaks down into harmful compounds</li>
            <li>High-heat cooking needs high smoke point oils</li>
          </ul>

          <p>
            <strong>The rule:</strong> Match the oil&apos;s smoke point to your cooking temperature.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              Smoke Point Quick Reference
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-300">
                    <th className="px-4 py-3 text-left font-bold text-slate-900">Oil</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-900">Smoke Point</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-900">Best Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3"><strong>Avocado Oil</strong></td>
                    <td className="px-4 py-3">520°F</td>
                    <td className="px-4 py-3">Searing, high-heat cooking</td>
                  </tr>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td className="px-4 py-3"><strong>Refined Canola</strong></td>
                    <td className="px-4 py-3">400°F</td>
                    <td className="px-4 py-3">All-purpose, frying, searing</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3"><strong>Grapeseed Oil</strong></td>
                    <td className="px-4 py-3">420°F</td>
                    <td className="px-4 py-3">High-heat sautéing, searing</td>
                  </tr>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td className="px-4 py-3"><strong>Peanut Oil</strong></td>
                    <td className="px-4 py-3">450°F</td>
                    <td className="px-4 py-3">Deep frying, stir-frying</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3"><strong>Extra Virgin Olive</strong></td>
                    <td className="px-4 py-3">375°F</td>
                    <td className="px-4 py-3">Medium heat, finishing</td>
                  </tr>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td className="px-4 py-3"><strong>Butter</strong></td>
                    <td className="px-4 py-3">350°F</td>
                    <td className="px-4 py-3">Medium heat, finishing</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3"><strong>Toasted Sesame</strong></td>
                    <td className="px-4 py-3">350°F</td>
                    <td className="px-4 py-3">Finishing only (burns easily)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2>The Essential Oils for Your Kitchen</h2>

          <h3>1. Neutral Oil (Canola, Vegetable, or Grapeseed)</h3>

          <p>
            <strong>Smoke point:</strong> 400-420°F
          </p>

          <p>
            <strong>Flavor:</strong> Neutral (doesn&apos;t affect food taste)
          </p>

          <p>
            <strong>Best for:</strong>
          </p>
          <ul>
            <li>High-heat searing (steaks, chops, chicken)</li>
            <li>Stir-frying</li>
            <li>Deep frying</li>
            <li>Any time you don&apos;t want oil flavor</li>
          </ul>

          <p>
            <strong>Professional standard:</strong> Most restaurant kitchens use canola or blended vegetable oil for 90% of cooking. It&apos;s cheap, consistent, and handles high heat.
          </p>

          <h3>2. Extra Virgin Olive Oil</h3>

          <p>
            <strong>Smoke point:</strong> 375°F
          </p>

          <p>
            <strong>Flavor:</strong> Fruity, peppery, grassy (varies by brand/region)
          </p>

          <p>
            <strong>Best for:</strong>
          </p>
          <ul>
            <li>Medium-heat sautéing</li>
            <li>Roasting vegetables (under 400°F)</li>
            <li>Finishing dishes</li>
            <li>Salad dressings and vinaigrettes</li>
            <li>Dipping bread</li>
          </ul>

          <p>
            <strong>Pro tip:</strong> Don&apos;t waste expensive olive oil on high-heat cooking. The flavor compounds break down above 375°F. Save good olive oil for finishing or drizzling.
          </p>

          <h3>3. Butter</h3>

          <p>
            <strong>Smoke point:</strong> 350°F
          </p>

          <p>
            <strong>Flavor:</strong> Rich, creamy, slightly nutty
          </p>

          <p>
            <strong>Best for:</strong>
          </p>
          <ul>
            <li>Medium-heat sautéing</li>
            <li>Finishing sauces</li>
            <li>Basting meat (butter-basting a steak)</li>
            <li>Cooking eggs</li>
            <li>Flavor boost at the end of dishes</li>
          </ul>

          <p>
            <strong>Why it&apos;s essential:</strong> Butter adds <Link href="/blog/fat-is-flavor" className="text-orange-700 hover:text-orange-800 underline">flavor</Link> that no oil can match. It makes food taste rich and satisfying.
          </p>

          <h3>4. Toasted Sesame Oil</h3>

          <p>
            <strong>Smoke point:</strong> 350°F
          </p>

          <p>
            <strong>Flavor:</strong> Intensely nutty, toasted, aromatic
          </p>

          <p>
            <strong>Best for:</strong>
          </p>
          <ul>
            <li>Finishing Asian dishes (stir-fries, noodles, rice)</li>
            <li>Drizzling over vegetables</li>
            <li>Adding to marinades and dressings</li>
            <li>A few drops for huge flavor impact</li>
          </ul>

          <p>
            <strong>How to use it:</strong>
          </p>
          <ul>
            <li><strong>Never cook with it at high heat</strong> (burns easily, tastes bitter)</li>
            <li>Add 1-2 teaspoons at the very end of stir-fries</li>
            <li>Mix into sauces and dressings for depth</li>
          </ul>

          <div className="not-prose bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <p className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-700" />
              Want My Complete Kitchen Setup Guide?
            </p>
            <p className="mb-4">
              Get my free &quot;11 Essential Tools I Use Most&quot; PDF—the exact equipment I rely on after 24 years in professional kitchens. No fluff, just the tools that actually matter.
            </p>
            <CTAVisibilityTracker
              ctaId="cooking-oils-newsletter-cta"
              position="mid_article"
              productSlug="guide-cooking-oils-smoke-points"
              merchant="internal"
            >
              <Link
                href="/newsletter"
                className="inline-block bg-orange-900 text-white px-6 py-3 rounded font-bold hover:bg-orange-800 transition-colors"
              >
                Get the Free Guide →
              </Link>
            </CTAVisibilityTracker>
            <p className="text-sm text-slate-700 mt-3 mb-0">
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          <h2>How to Use Oils for Different Cooking Methods</h2>

          <h3>High-Heat Searing (450°F+)</h3>

          <p>
            <strong>Goal:</strong> Get a hard crust on meat or fish
          </p>

          <p>
            <strong>Best oils:</strong>
          </p>
          <ul>
            <li>Avocado oil (520°F smoke point)</li>
            <li>Canola oil (400°F smoke point)</li>
            <li>Grapeseed oil (420°F smoke point)</li>
            <li>Refined peanut oil (450°F smoke point)</li>
          </ul>

          <p>
            <strong>Don&apos;t use:</strong> Butter (burns), extra virgin olive oil (smokes), unrefined oils (smoke and burn)
          </p>

          <h3>Medium-Heat Sautéing (325-375°F)</h3>

          <p>
            <strong>Best oils:</strong>
          </p>
          <ul>
            <li>Extra virgin olive oil (adds flavor)</li>
            <li>Butter (adds richness)</li>
            <li>Canola oil (neutral)</li>
          </ul>

          <p>
            <strong>Pro tip:</strong> Start with neutral oil, finish with butter. This gives you higher heat tolerance plus butter flavor at the end.
          </p>

          <h3>Deep Frying (350-375°F)</h3>

          <p>
            <strong>Best oils:</strong>
          </p>
          <ul>
            <li>Peanut oil (best flavor, highest smoke point)</li>
            <li>Canola oil (cheap, neutral, works great)</li>
            <li>Vegetable oil (cheap alternative)</li>
          </ul>

          <p>
            <strong>Don&apos;t use:</strong> Olive oil (too expensive, smokes), butter (burns instantly), specialty oils (waste of money)
          </p>

          <h3>Finishing (No Heat)</h3>

          <p>
            <strong>Best oils:</strong>
          </p>
          <ul>
            <li>Extra virgin olive oil (fruity, peppery)</li>
            <li>Toasted sesame oil (nutty, aromatic)</li>
            <li>Nut oils (walnut, hazelnut, pistachio)</li>
            <li>Infused oils (chili oil, garlic oil, herb oil)</li>
          </ul>

          <p>
            <strong>Examples:</strong> Drizzle olive oil over grilled steak, sesame oil over stir-fried noodles, walnut oil over roasted beets.
          </p>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-cyan-700" />
              Chef&apos;s Technique: Layering Fats
            </p>
            <p className="mb-2">
              <strong>Professional kitchens layer fats for maximum flavor:</strong>
            </p>
            <ol className="mb-0">
              <li><strong>Start with neutral oil</strong> for high-heat searing or sautéing</li>
              <li><strong>Add butter mid-cook</strong> for basting or deglazing</li>
              <li><strong>Finish with good olive oil</strong> for brightness and complexity</li>
            </ol>
          </div>

          <h2>Common Oil Mistakes (And How to Fix Them)</h2>

          <h3>Mistake #1: Using Extra Virgin Olive Oil for High-Heat Searing</h3>

          <p>
            <strong>The problem:</strong> Kitchen fills with smoke, oil tastes burnt, food has bitter flavor.
          </p>

          <p>
            <strong>The fix:</strong> Use neutral oil (canola, grapeseed) for searing. Save olive oil for finishing or medium heat.
          </p>

          <h3>Mistake #2: Not Heating the Pan Before Adding Oil</h3>

          <p>
            <strong>The problem:</strong> Food sticks, steams instead of sears, absorbs too much oil.
          </p>

          <p>
            <strong>The fix:</strong> Preheat the pan first, THEN add oil. This prevents sticking and gives better <Link href="/blog/maillard-reaction-browning-flavor" className="text-orange-700 hover:text-orange-800 underline">browning</Link>.
          </p>

          <h3>Mistake #3: Using Too Much Oil</h3>

          <p>
            <strong>The problem:</strong> Food tastes greasy, heavy, or oily.
          </p>

          <p>
            <strong>The fix:</strong> Use just enough to coat the pan or ingredients. A thin film is plenty. More oil doesn&apos;t mean better cooking—it just means greasy food.
          </p>

          <h2>The Takeaway: Match the Oil to the Job</h2>

          <p>
            Cooking oils aren&apos;t interchangeable. Each has a purpose. Use the right one and cooking becomes effortless.
          </p>

          <p>
            <strong>Quick reference:</strong>
          </p>

          <ul>
            <li><strong>High-Heat Searing/Frying:</strong> Canola, avocado, peanut, grapeseed (neutral, high smoke point)</li>
            <li><strong>Medium-Heat Sautéing:</strong> Olive oil, butter, canola (adds flavor, moderate heat)</li>
            <li><strong>Finishing/Drizzling:</strong> Extra virgin olive oil, sesame oil, nut oils (flavor without heat)</li>
            <li><strong>All-Purpose Cooking:</strong> Canola or vegetable oil (cheap, neutral, versatile)</li>
          </ul>

          <p>
            <strong>The professional approach:</strong> Keep two oils in your kitchen: neutral oil (canola) for high heat, and good olive oil for finishing. That covers 95% of home cooking. Add specialty oils (sesame, avocado, butter) as needed.
          </p>

          <p>
            Master oils and everything you cook tastes better. Not fancy techniques. Not expensive equipment. Just using the right fat for the job.
          </p>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/fat-is-flavor" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Why Fat is Flavor (And How to Use It)
            </Link>
            <Link href="/blog/maillard-reaction-browning-flavor" className="text-orange-700 hover:text-orange-800 font-semibold">
              → The Maillard Reaction: Why Browning = Flavor
            </Link>
            <Link href="/blog/complete-guide-to-salts" className="text-orange-700 hover:text-orange-800 font-semibold">
              → The Complete Guide to Salts
            </Link>
            <Link href="/reviews/lodge-seasoned-cast-iron-3-skillet-bundle" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Lodge Cast Iron Skillet Bundle Review
            </Link>
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  );
}
