import Link from 'next/link';
import { Metadata } from 'next';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, Flame, Lightbulb, Apple } from 'lucide-react';

export const metadata: Metadata = {
  title: "Cooking with Tomatoes: Fresh vs Canned & When to Use",
  description: "Learn when to use fresh tomatoes vs canned tomatoes in cooking. Professional insights from 24 years in restaurant kitchens on choosing the right tomatoes for every dish.",
  keywords: ["fresh vs canned tomatoes", "cooking with tomatoes", "when to use canned tomatoes", "best tomatoes for sauce", "San Marzano tomatoes", "professional tomato techniques"],
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/blog/cooking-with-tomatoes-fresh-vs-canned'
  }
};

const articleSchema = generateArticleSchema({
  headline: "Cooking with Tomatoes: Fresh vs Canned",
  description: "Understanding when to use fresh tomatoes versus canned tomatoes, and how to get the best results from each in your cooking.",
  datePublished: "2025-10-08",
  dateModified: "2025-10-24",
  authorName: "Scott Bradley",
  imageUrl: "https://www.chefapprovedtools.com/images/tomatoes-guide-og.jpg",
  urlPrefix: 'blog',
  urlSuffix: 'cooking-with-tomatoes-fresh-vs-canned'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Cooking with Tomatoes: Fresh vs Canned", url: "https://www.chefapprovedtools.com/blog/cooking-with-tomatoes-fresh-vs-canned" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "Should I use whole, crushed, or diced canned tomatoes?",
    answer: "Whole peeled gives you the most control—crush them by hand for your desired texture. Crushed is convenient for smooth sauces (marinara, pizza sauce). Diced works for chunky sauces, soups, and chilis. All three are just tomatoes processed differently. Start with whole peeled and you can make the others yourself."
  },
  {
    question: "Can I substitute fresh for canned in recipes?",
    answer: "Yes, but you'll need more fresh tomatoes (they're watery). Use 2 pounds of fresh tomatoes for every 28oz can. Roast or cook them down first to concentrate flavor. Otherwise your sauce will be thin and bland."
  },
  {
    question: "What's the best brand of canned tomatoes?",
    answer: "For special dishes: San Marzano DOP (Cento, La Valle). For everyday cooking: Muir Glen Organic, Bianco DiNapoli. For budget cooking: Hunt's or any domestic brand (not generic store brand—those are too watery)."
  }
]);

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

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-orange-700 mb-4">
            <Apple className="w-5 h-5" />
            <span className="text-sm font-medium">Ingredient Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Cooking with Tomatoes: Fresh vs Canned (And When to Use Each)
          </h1>
          <p className="text-xl text-slate-600">
            Understanding when to use fresh tomatoes versus canned tomatoes, and how to get the best results from each in your cooking.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
            <span>By Chef Scott Bradley</span>
            <span>•</span>
            <span>October 24, 2025</span>
            <span>•</span>
            <span>7 min read</span>
          </div>
        </header>

        <div className="prose prose-lg prose-slate max-w-none">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <h3 className="mt-0 text-amber-900 font-bold">Restaurant Reality</h3>
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

          <div className="bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-700" />
              Want My Complete Kitchen Setup Guide?
            </h3>
            <p className="mb-4">
              Get my free &quot;11 Essential Tools I Use Most&quot; PDF—the exact equipment I rely on after 24 years in professional kitchens. No fluff, just the tools that actually matter.
            </p>
            <CTAVisibilityTracker
              ctaId="tomatoes-newsletter-cta"
              position="mid_article"
              productSlug="cooking-with-tomatoes-fresh-vs-canned"
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
