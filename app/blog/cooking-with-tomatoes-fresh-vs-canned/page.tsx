import Link from 'next/link';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import { generateBlogMetadata } from '@/lib/metadata-helpers';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, Flame, Lightbulb, Apple } from 'lucide-react';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogHero from '@/components/blog/BlogHero';
import BlogQuickAnswer from '@/components/blog/BlogQuickAnswer';
import BlogComparisonTable from '@/components/blog/BlogComparisonTable';
import BlogEmailCapture from '@/components/blog/BlogEmailCapture';
import BlogNewsletterCTA from '@/components/blog/BlogNewsletterCTA';
import BlogFAQ from '@/components/blog/BlogFAQ';
import AuthorBio from '@/components/review/AuthorBio';
import { tomatoesData } from './tomatoes-data';

export const metadata = generateBlogMetadata('cooking-with-tomatoes-fresh-vs-canned');

const articleSchema = generateArticleSchema({
  headline: "Cooking with Tomatoes: Fresh vs Canned",
  description: "Understanding when to use fresh tomatoes versus canned tomatoes, and how to get the best results from each in your cooking.",
  datePublished: "2025-10-08",
  dateModified: "2025-10-24",
  authorName: "Scott Bradley",
  urlPrefix: 'blog',
  urlSuffix: 'cooking-with-tomatoes-fresh-vs-canned'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Cooking with Tomatoes: Fresh vs Canned", url: "https://www.chefapprovedtools.com/blog/cooking-with-tomatoes-fresh-vs-canned" }
]);

const faqSchema = generateFAQSchema(tomatoesData.faq.questions);

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export default function TomatoesGuidePage() {
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

      <BlogLayout breadcrumbTitle="Cooking with Tomatoes: Fresh vs Canned">
        <BlogHero
          title="Cooking with Tomatoes: Fresh vs Canned (And When to Use Each)"
          introduction={["Understanding when to use fresh tomatoes versus canned tomatoes, and how to get the best results from each in your cooking."]}
          publishedDate="2025-10-08"
          lastUpdated="2025-10-24"
          readTime="7 min read"
        />

        <BlogQuickAnswer
          optionA={{
            title: "Use Fresh Tomatoes When:",
            points: [
              "Raw applications (salads, salsas, sandwiches)",
              "Quick-cooked dishes under 15 minutes",
              "Peak summer season (July-September)",
              "Buying from farmers markets or local growers"
            ]
          }}
          optionB={{
            title: "Use Canned Tomatoes When:",
            points: [
              "Long-cooked sauces (marinara, bolognese, pizza sauce)",
              "Soups, stews, and braises",
              "Off-season cooking (November-June)",
              "You need consistent, concentrated tomato flavor"
            ]
          }}
        />

        <BlogComparisonTable
          title="Fresh vs Canned Tomatoes: At a Glance"
          columnA="Fresh Tomatoes"
          columnB="Canned Tomatoes"
          features={[
            {
              feature: "Flavor (Peak Season)",
              columnA: { rating: "Excellent", description: "Unbeatable when vine-ripened and local" },
              columnB: { rating: "Very Good", description: "Consistent quality year-round" }
            },
            {
              feature: "Flavor (Off-Season)",
              columnA: { rating: "Poor", description: "Picked green, gassed, bland" },
              columnB: { rating: "Excellent", description: "Vine-ripened at peak, packed fresh" }
            },
            {
              feature: "Raw Applications",
              columnA: { rating: "Excellent", description: "Essential for salads, salsas, sandwiches" },
              columnB: { rating: "Poor", description: "Wrong texture and flavor" }
            },
            {
              feature: "Long-Cooked Sauces",
              columnA: { rating: "Limited", description: "Too watery, need 2x quantity" },
              columnB: { rating: "Excellent", description: "Already concentrated, consistent" }
            },
            {
              feature: "Convenience",
              columnA: { rating: "Limited", description: "Peeling, seeding, chopping required" },
              columnB: { rating: "Excellent", description: "Ready to use, no prep" }
            },
            {
              feature: "Consistency",
              columnA: { rating: "Limited", description: "Varies by season and source" },
              columnB: { rating: "Excellent", description: "Same quality every time" }
            },
            {
              feature: "Cost",
              columnA: { rating: "Limited", description: "$3-6/lb, seasonal availability" },
              columnB: { rating: "Very Good", description: "$2-4 per 28oz can" }
            },
            {
              feature: "Shelf Life",
              columnA: { rating: "Poor", description: "Days at room temp, week refrigerated" },
              columnB: { rating: "Excellent", description: "Years in pantry" }
            }
          ]}
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <h2 className="mt-0 text-amber-900 font-bold">Restaurant Reality</h2>
            <p>
              <strong>Working the pizza station,</strong> I&apos;d watch home cooks come in and ask why our marinara tasted so much better than theirs. The answer was simple: we used canned tomatoes. Not fresh. Canned.
            </p>
            <p>
              They&apos;d look confused. &quot;But fresh is always better, right?&quot;
            </p>
            <p className="mb-0">
              Not with tomatoes. Not for sauce. I&apos;d explain that those perfectly red tomatoes at the grocery store in February? They were picked green, gassed to turn red, and shipped 2,000 miles. Meanwhile, our canned San Marzanos were vine-ripened at peak flavor, crushed within hours, and packed at their absolute best. <strong>Fresh isn&apos;t always better. It&apos;s about using the right tomato for the job.</strong>
            </p>
          </div>

          <p>
            That lesson changed how I cooked at home. Once you understand when to use fresh tomatoes versus canned, your cooking gets dramatically better—and easier.
          </p>

          <p>
            Here&apos;s everything I learned in 24 years of professional kitchens about cooking with tomatoes.
          </p>

          <h2>The Truth About Fresh Tomatoes</h2>

          <p>
            Fresh tomatoes are incredible. When they&apos;re good.
          </p>

          <p>
            The problem? Most fresh tomatoes at the grocery store aren&apos;t good. They&apos;re bred for shipping, not flavor. They&apos;re picked underripe so they survive the journey from California or Mexico to your store.
          </p>

          <p>
            <strong>What makes a tomato taste good:</strong>
          </p>
          <ul>
            <li>Vine-ripened (not picked green and gassed)</li>
            <li>Grown for flavor (heirloom varieties, not shipping varieties)</li>
            <li>Peak season (July-September in most of the US)</li>
            <li>Local or regional (less shipping time = more ripeness at harvest)</li>
          </ul>

          <p>
            <strong>When fresh tomatoes are worth it:</strong>
          </p>
          <ul>
            <li>Peak summer season (July-September)</li>
            <li>Buying from farmers markets or local growers</li>
            <li>Heirloom or specialty varieties</li>
            <li>Raw applications (salads, sandwiches, salsas)</li>
            <li>Quick-cooked dishes (shakshuka, quick sauces)</li>
          </ul>

          <h2>The Truth About Canned Tomatoes</h2>

          <p>
            Canned tomatoes get a bad reputation. People assume &quot;processed&quot; means &quot;inferior.&quot;
          </p>

          <p>
            It doesn&apos;t. Not with tomatoes.
          </p>

          <p>
            <strong>Here&apos;s what actually happens:</strong>
          </p>

          <p>
            Canning tomatoes are grown specifically for flavor. They&apos;re vine-ripened to full maturity. They&apos;re harvested at peak ripeness and processed within 4-8 hours of being picked.
          </p>

          <p>
            Compare that to fresh tomatoes: picked green or barely red, gassed with ethylene to turn them red during shipping, sitting in storage and on shelves for days or weeks.
          </p>

          <p>
            <strong>Which one actually tastes more like a tomato?</strong>
          </p>

          <p>
            The canned one. Every time. (Except peak summer from a good local source.)
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              Pro Tip: Quality Matters
            </p>
            <p className="mb-2">Not all canned tomatoes are equal. Look for:</p>
            <ul className="mb-0">
              <li><strong>San Marzano DOP</strong> (premium, sweet, low acid)</li>
              <li><strong>Cento Certified San Marzano</strong> (excellent quality)</li>
              <li><strong>Muir Glen Organic</strong> (best domestic brand)</li>
              <li><strong>Bianco DiNapoli</strong> (California, restaurant quality)</li>
            </ul>
          </div>

          <h2>When to Use Fresh Tomatoes</h2>

          <h3>1. Raw Applications</h3>

          <p>
            <strong>Salads, sandwiches, bruschetta, pico de gallo, caprese</strong>
          </p>

          <p>
            Fresh tomatoes are essential here. You&apos;re not cooking them, so their texture and fresh flavor matter.
          </p>

          <p>
            <strong>Pro tip:</strong> Salt your tomatoes 10-15 minutes before serving. This draws out moisture and concentrates flavor. It&apos;s the single best thing you can do to make mediocre fresh tomatoes taste better.
          </p>

          <h3>2. Quick-Cooked Dishes</h3>

          <p>
            <strong>Shakshuka, quick pasta sauces, stir-fries, pan con tomate</strong>
          </p>

          <p>
            When you&apos;re cooking tomatoes for less than 15 minutes, fresh works well—especially in summer when they&apos;re good.
          </p>

          <BlogNewsletterCTA slug="cooking-with-tomatoes-fresh-vs-canned" />

          <h2>When to Use Canned Tomatoes</h2>

          <h3>1. Long-Cooked Sauces</h3>

          <p>
            <strong>Marinara, Bolognese, pizza sauce, Sunday gravy, ragu</strong>
          </p>

          <p>
            This is where canned tomatoes shine. You&apos;re cooking them for 30 minutes to 3 hours. You need concentrated tomato flavor. You don&apos;t need fresh tomato texture.
          </p>

          <p>
            <strong>Why canned is better:</strong>
          </p>
          <ul>
            <li>Already concentrated (less water than fresh)</li>
            <li>Consistent flavor year-round</li>
            <li>Vine-ripened at peak (unlike off-season fresh)</li>
            <li>Less prep work (no peeling, no seeding)</li>
          </ul>

          <h3>2. Soups and Stews</h3>

          <p>
            <strong>Tomato soup, minestrone, chili, chicken cacciatore, braised dishes</strong>
          </p>

          <p>
            Canned tomatoes work perfectly in soups and stews because they break down into the liquid. You&apos;re not eating them as distinct chunks—they&apos;re becoming part of the base.
          </p>

          <h2>How to Doctor Canned Tomatoes</h2>

          <p>
            Even quality canned tomatoes benefit from these adjustments:
          </p>

          <h3>1. Add Sugar (Seriously)</h3>

          <p>
            Canned tomatoes are acidic. A pinch of sugar (1/4 to 1/2 teaspoon per 28oz can) balances that acidity without making the sauce sweet.
          </p>

          <p>
            <strong>Why it works:</strong> Sugar doesn&apos;t make things sweet at low amounts. It rounds out harsh acidity and makes tomato flavor more prominent.
          </p>

          <h3>2. Add Fat</h3>

          <p>
            Tomato flavor is fat-soluble. Adding butter, olive oil, or even a parmesan rind makes tomatoes taste richer and more complex.
          </p>

          <p>
            <strong>Method:</strong> Finish your sauce with 1-2 tablespoons of butter or good olive oil. Stir it in at the end. The difference is dramatic.
          </p>

          <h3>3. Cook Them Long Enough</h3>

          <p>
            Canned tomatoes need at least 20-30 minutes of simmering to develop flavor. The longer they cook, the sweeter and more concentrated they become.
          </p>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-cyan-700" />
              Chef&apos;s Technique: Building Tomato Flavor
            </p>
            <p className="mb-2">
              <strong>Professional kitchens layer tomato products for depth:</strong>
            </p>
            <ul className="mb-0">
              <li>Start with tomato paste (sauté it to caramelize)</li>
              <li>Add crushed canned tomatoes (body and texture)</li>
              <li>Finish with fresh tomatoes or tomato puree (brightness)</li>
            </ul>
          </div>

          <h2>The Takeaway: Match the Tomato to the Dish</h2>

          <p>
            Tomatoes are essential, but fresh and canned serve different purposes. Use the wrong one and you&apos;ll fight your ingredients. Use the right one and cooking becomes effortless.
          </p>

          <p>
            <strong>Quick reference:</strong>
          </p>

          <p>
            <strong>Use Fresh Tomatoes For:</strong>
          </p>
          <ul>
            <li>Raw applications (salads, salsas, sandwiches)</li>
            <li>Quick-cooked dishes (shakshuka, stir-fries)</li>
            <li>Roasting and grilling</li>
            <li>Summer peak season dishes</li>
          </ul>

          <p>
            <strong>Use Canned Tomatoes For:</strong>
          </p>
          <ul>
            <li>Long-cooked sauces (marinara, bolognese, pizza sauce)</li>
            <li>Soups and stews</li>
            <li>Braises</li>
            <li>Any dish that needs concentrated tomato flavor</li>
            <li>Off-season cooking (November-June)</li>
          </ul>

          <p>
            <strong>The professional standard:</strong> Buy quality canned tomatoes (San Marzano DOP for special dishes, good domestic brands for everyday), doctor them with sugar and <Link href="/blog/fat-is-flavor" className="text-orange-700 hover:text-orange-800 underline">fat</Link>, and save fresh tomatoes for raw or lightly cooked applications.
          </p>

          <p>
            Master this framework and tomatoes become effortless. You&apos;ll know exactly which type to reach for, how to prep it, and how to make it taste incredible. This is the knowledge that separates home cooks from professionals.
          </p>

          <BlogFAQ questions={tomatoesData.faq.questions} />
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/understanding-acids-cooking" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Understanding Acids in Cooking
            </Link>
            <Link href="/blog/onions-cooking-guide" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Complete Guide to Cooking Onions
            </Link>
            <Link href="/blog/benefits-cooking-with-garlic" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Benefits of Cooking with Garlic
            </Link>
            <Link href="/blog/fat-is-flavor" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Why Fat is Flavor
            </Link>
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  );
}
