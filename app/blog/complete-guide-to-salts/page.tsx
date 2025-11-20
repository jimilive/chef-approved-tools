import Link from 'next/link';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import { generateBlogMetadata } from '@/lib/metadata-helpers';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, Sparkles, Flame, Lightbulb } from 'lucide-react';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogHero from '@/components/blog/BlogHero';
import BlogEmailCapture from '@/components/blog/BlogEmailCapture';
import AuthorBio from '@/components/review/AuthorBio';

export const metadata = generateBlogMetadata('complete-guide-to-salts');

const articleSchema = generateArticleSchema({
  headline: "Cooking Salts Guide: Kosher vs Sea Salt vs Fleur de Sel",
  description: "Understanding different types of salt, their uses in cooking, and why choosing the right salt actually matters for your food.",
  datePublished: "2025-10-05",
  dateModified: "2025-10-24",
  authorName: "Scott Bradley",
  imageUrl: "https://www.chefapprovedtools.com/images/salts-guide-og.jpg",
  urlPrefix: 'blog',
  urlSuffix: 'complete-guide-to-salts'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Cooking Salts Guide: Kosher vs Sea Salt vs Fleur de Sel", url: "https://www.chefapprovedtools.com/blog/complete-guide-to-salts" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "Is kosher salt healthier than table salt?",
    answer: "No. Both are sodium chloride. Kosher salt just has no additives. If you need iodine, table salt or iodized sea salt is better."
  },
  {
    question: "What's the best salt for everyday cooking?",
    answer: "Diamond Crystal kosher salt. It's what professional kitchens use. It's cheap, consistent, and easy to control."
  },
  {
    question: "Can you over-salt food?",
    answer: "Yes, but it's hard to fix. Add slowly, taste constantly. If you do over-salt, add acid (lemon juice, vinegar), fat (butter, cream), or dilute (more liquid or ingredients)."
  }
]);

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export default function SaltsGuidePage() {
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

      <BlogLayout breadcrumbTitle="Cooking Salts Guide: Kosher vs Sea Salt vs Fleur de Sel">
        <BlogHero
          title="Cooking Salts Guide: Kosher vs Sea Salt vs Fleur de Sel"
          introduction={["Understanding different types of salt, their uses in cooking, and why choosing the right salt actually matters for your food."]}
          publishedDate="2025-10-05"
          lastUpdated="2025-10-24"
          readTime="7 min read"
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <h2 className="mt-0 text-amber-900 font-bold">Restaurant Reality</h2>
            <p>
              <strong>First week on the line,</strong> I grabbed the salt closest to me and started seasoning vegetables for service. The sous chef stopped me immediately.
            </p>
            <p>
              &quot;What salt are you using?&quot;
            </p>
            <p>
              &quot;Uh... this one?&quot; I held up the container.
            </p>
            <p className="mb-0">
              &quot;That&apos;s table salt. You&apos;ll over-season everything. Use this.&quot; He handed me Diamond Crystal kosher salt. &quot;Same volume, half the sodium. You can actually taste as you go without destroying the dish.&quot; That lesson changed everything. Salt isn&apos;t just salt. The type you use changes how you cook, how food tastes, and whether you can season accurately. <strong>Professional kitchens don&apos;t use random salt. They use specific salts for specific purposes.</strong>
            </p>
          </div>

          <p>
            After 24 years in professional kitchens, I can tell you: most home cooks use the wrong salt, in the wrong amount, at the wrong time.
          </p>

          <p>
            Here&apos;s everything you need to know about salt to cook like a professional.
          </p>

          <h2>Why Salt Type Actually Matters</h2>

          <p>
            Salt is sodium chloride. Chemically, all salt is the same.
          </p>

          <p>
            But physically? Completely different.
          </p>

          <p>
            <strong>What changes:</strong>
          </p>
          <ul>
            <li><strong>Crystal size</strong> - Fine vs coarse vs flaky</li>
            <li><strong>Density</strong> - How much fits in a teaspoon</li>
            <li><strong>Dissolving speed</strong> - Fast vs slow</li>
            <li><strong>Texture</strong> - Crunchy vs melting</li>
            <li><strong>Mineral content</strong> - Pure vs trace minerals</li>
          </ul>

          <p>
            These differences change how you measure, how you season, and how food tastes.
          </p>

          <p>
            <strong>Example:</strong> 1 teaspoon of Diamond Crystal kosher salt = 1.5 teaspoons of Morton kosher salt = 2 teaspoons of fine sea salt by weight.
          </p>

          <h2 className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-700" />
            The Four Essential Salts
          </h2>

          <h3>1. Kosher Salt (Diamond Crystal)</h3>

          <p>
            <strong>What it is:</strong> Large, flaky crystals with hollow pyramid shapes. Very low density.
          </p>

          <p>
            <strong>Why professionals use it:</strong>
          </p>
          <ul>
            <li>Easy to pinch and control</li>
            <li>Dissolves quickly on food</li>
            <li>Difficult to over-salt (large crystals, low density)</li>
            <li>Clean, pure flavor</li>
            <li>No additives</li>
          </ul>

          <p>
            <strong>Best for:</strong>
          </p>
          <ul>
            <li>All-purpose cooking</li>
            <li>Seasoning meat, vegetables, pasta water</li>
            <li>Salting in layers as you cook</li>
            <li>Any situation where you&apos;re tasting and adjusting</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              Pro Tip: Diamond Crystal vs Morton
            </p>
            <p className="mb-2">
              <strong>These are NOT interchangeable!</strong>
            </p>
            <ul className="mb-0">
              <li><strong>Diamond Crystal:</strong> Hollow crystals, low density, 1:1 in recipes</li>
              <li><strong>Morton Kosher:</strong> Dense crystals, higher sodium by volume</li>
            </ul>
          </div>

          <h3>2. Fine Sea Salt</h3>

          <p>
            <strong>What it is:</strong> Evaporated seawater, ground to fine powder. Slightly more mineral content than table salt.
          </p>

          <p>
            <strong>Best for:</strong>
          </p>
          <ul>
            <li>Baking (precise measurements matter)</li>
            <li>Dry rubs and spice blends</li>
            <li>Situations where you can&apos;t taste and adjust</li>
            <li>Seasoning at the table</li>
          </ul>

          <h3>3. Table Salt</h3>

          <p>
            <strong>What it is:</strong> Highly refined sodium chloride, very fine crystals, usually with iodine and anti-caking agents added.
          </p>

          <p>
            <strong>Why I don&apos;t use it:</strong>
          </p>
          <ul>
            <li>Hard to control (fine crystals, easy to over-salt)</li>
            <li>Chemical taste from additives</li>
            <li>Doesn&apos;t dissolve as evenly as kosher salt</li>
            <li>Professional kitchens don&apos;t use it</li>
          </ul>

          <h3>4. Finishing Salt (Flaky Salt)</h3>

          <p>
            <strong>What it is:</strong> Large, irregular, crunchy flakes. Examples: Maldon, Fleur de Sel, Jacobsen.
          </p>

          <p>
            <strong>Why it&apos;s special:</strong>
          </p>
          <ul>
            <li>Crunchy texture adds interest</li>
            <li>Bright, clean salt flavor</li>
            <li>Melts slowly on the tongue</li>
            <li>Adds visual appeal</li>
          </ul>

          <p>
            <strong>Best for:</strong>
          </p>
          <ul>
            <li>Finishing grilled meats</li>
            <li>Topping fresh tomatoes, avocado</li>
            <li>Chocolate and caramel desserts</li>
            <li>Fresh bread with butter</li>
            <li>Anything where salt texture matters</li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-700" />
              Want My Complete Kitchen Setup Guide?
            </h3>
            <p className="mb-4">
              Get my free &quot;11 Essential Tools I Use Most&quot; PDF—the exact equipment I rely on after 24 years in professional kitchens. No fluff, just the tools that actually matter.
            </p>
            <CTAVisibilityTracker
              ctaId="salts-newsletter-cta"
              position="mid_article"
              productSlug="complete-guide-to-salts"
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

          <h2 className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-700" />
            How to Season Food at Different Stages
          </h2>

          <p>
            Professional cooking isn&apos;t about adding salt at the end. It&apos;s about seasoning in layers throughout the cooking process.
          </p>

          <h3>Stage 1: Season Raw Ingredients</h3>

          <p>
            <strong>When:</strong> Before cooking starts
          </p>

          <p>
            <strong>Why:</strong> Salt penetrates and seasons from within. It also helps proteins retain moisture and vegetables stay crisp.
          </p>

          <p>
            <strong>How:</strong>
          </p>
          <ul>
            <li>Salt meat 30-60 minutes before cooking (or overnight for roasts)</li>
            <li>Salt vegetables right before cooking (or they&apos;ll release water)</li>
            <li>Salt pasta water heavily (it should taste like the ocean)</li>
          </ul>

          <h3>Stage 2: Season As You Cook</h3>

          <p>
            <strong>When:</strong> While building a dish
          </p>

          <p>
            <strong>Why:</strong> Each ingredient needs its own seasoning. If you only salt at the end, the dish tastes flat.
          </p>

          <p>
            <strong>Example:</strong> When making a soup, salt the <Link href="/blog/onions-cooking-guide" className="text-orange-700 hover:text-orange-800 underline">onions</Link> as you sauté them, salt the stock when you add it, salt the vegetables as they cook, taste and adjust at the end. This builds depth.
          </p>

          <h3>Stage 3: Season At The Finish</h3>

          <p>
            <strong>When:</strong> Right before serving
          </p>

          <p>
            <strong>Why:</strong> This is your final adjustment. It adds brightness and brings all the flavors forward.
          </p>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-cyan-700" />
              Chef&apos;s Technique: Tasting As You Go
            </p>
            <p className="mb-0">
              <strong>Professional cooks taste constantly.</strong> Not at the end—throughout. After every addition, every stage, every adjustment: taste. This is how you develop instincts for seasoning. You learn what &quot;not enough&quot; tastes like, what &quot;just right&quot; tastes like, and what &quot;too much&quot; tastes like. If you&apos;re not tasting as you cook, you&apos;re guessing. And guessing doesn&apos;t work.
            </p>
          </div>

          <h2>Common Salt Mistakes (And How to Fix Them)</h2>

          <h3>Mistake #1: Using Measurements Instead of Tasting</h3>

          <p>
            <strong>The problem:</strong> Recipes say &quot;1 teaspoon salt&quot; but your salt, your ingredients, and your taste are different from the recipe writer&apos;s.
          </p>

          <p>
            <strong>The fix:</strong> Use recipes as a starting point. Season conservatively, taste, and adjust. Your palate is the final judge.
          </p>

          <h3>Mistake #2: Only Salting At The End</h3>

          <p>
            <strong>The problem:</strong> Food tastes flat and one-dimensional.
          </p>

          <p>
            <strong>The fix:</strong> Season in layers. Salt the onions, salt the meat, salt the sauce. Each ingredient needs its own seasoning.
          </p>

          <h3>Mistake #3: Using Morton When The Recipe Calls for Kosher Salt</h3>

          <p>
            <strong>The problem:</strong> Your food is way too salty.
          </p>

          <p>
            <strong>The fix:</strong> If you only have Morton, use 2/3 the amount the recipe calls for. Or switch to Diamond Crystal and follow recipes as written.
          </p>

          <h2>The Takeaway: Salt Smart, Not Hard</h2>

          <p>
            Salt is the most important ingredient in your kitchen. But it&apos;s not about expensive specialty salts or complicated techniques.
          </p>

          <p>
            <strong>It&apos;s about:</strong>
          </p>
          <ul>
            <li>Using the right salt for the job (kosher for cooking, finishing for texture)</li>
            <li>Seasoning in layers (not just at the end)</li>
            <li>Tasting constantly (your palate is the judge)</li>
            <li>Building instincts through practice</li>
          </ul>

          <p>
            <strong>Quick reference:</strong>
          </p>

          <ul>
            <li><strong>Diamond Crystal Kosher Salt:</strong> All-purpose cooking, seasoning in layers, everyday use</li>
            <li><strong>Fine Sea Salt:</strong> Baking, dry rubs, table salt substitute</li>
            <li><strong>Finishing Salt (Maldon, Fleur de Sel):</strong> Garnish, texture, special occasions</li>
            <li><strong>Table Salt:</strong> Baking (if recipe specifies), iodine needs</li>
          </ul>

          <p>
            Master salt and everything you cook tastes better. It&apos;s the foundation of good cooking. Not fancy techniques, not expensive equipment—salt.
          </p>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/understanding-acids-cooking" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Understanding Acids in Cooking
            </Link>
            <Link href="/blog/fat-is-flavor" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Why Fat is Flavor (And How to Use It)
            </Link>
            <Link href="/blog/onions-cooking-guide" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Complete Guide to Cooking Onions
            </Link>
            <Link href="/blog/potatoes-cooking-guide" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Complete Guide to Cooking Potatoes
            </Link>
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  );
}
