import Link from 'next/link';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, Utensils, Info, Clock } from 'lucide-react';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogHero from '@/components/blog/BlogHero';
import BlogEmailCapture from '@/components/blog/BlogEmailCapture';
import AuthorBio from '@/components/review/AuthorBio';
import { generateBlogMetadata } from '@/lib/metadata-helpers';

export const metadata = generateBlogMetadata('onions-cooking-guide');

const articleSchema = generateArticleSchema({
  headline: "The Complete Guide to Cooking Onions",
  description: "Everything you need to know about onion varieties, cutting techniques, cooking methods, and professional tips for perfect flavor every time.",
  datePublished: "2025-09-03",
  dateModified: "2025-10-24",
  authorName: "Scott Bradley",
  imageUrl: "https://www.chefapprovedtools.com/images/onions-guide-og.jpg",
  urlPrefix: 'blog',
  urlSuffix: 'onions-cooking-guide'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Complete Guide to Cooking Onions", url: "https://www.chefapprovedtools.com/blog/onions-cooking-guide" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "How do I cut onions without crying?",
    answer: "Several methods work: Use a sharp knife (less cell damage = less irritant release), chill onions for 30 minutes before cutting (slows enzyme reactions), cut near running water or a fan (disperses irritants), or wear safety goggles. The most effective? A truly sharp knife and good ventilation."
  },
  {
    question: "Can I substitute red onions for yellow onions?",
    answer: "It depends. For cooked dishes, yes—they'll taste similar, though red onions are slightly milder and lose their color. For raw applications, red onions are milder and sweeter, so the substitution works well. For caramelizing, yellow onions are better due to higher sugar content."
  },
  {
    question: "Why do my caramelized onions take so long?",
    answer: "Because proper caramelization takes 45-60 minutes. You need to evaporate water (90% of onion weight), concentrate sugars, and allow the Maillard reaction and caramelization to happen. Those '10-minute caramelized onions' recipes are just browned onions, not truly caramelized."
  }
]);

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export default function OnionsGuidePage() {
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

      <BlogLayout breadcrumbTitle="Complete Guide to Cooking Onions">
        <BlogHero
          title="The Complete Guide to Cooking Onions"
          introduction={["Everything you need to know about onion varieties, cutting techniques, cooking methods, and professional tips for perfect flavor every time."]}
          publishedDate="2025-09-03"
          lastUpdated="2025-10-24"
          readTime="7 min read"
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          <p>
            Onions are the foundation of flavor in almost every savory dish you&apos;ll ever cook. French cuisine calls them part of &quot;mirepoix.&quot; Italian cooking uses &quot;soffritto.&quot; Cajun food relies on the &quot;holy trinity.&quot; Different names, same principle: onions build depth, sweetness, and complexity that nothing else can replicate.
          </p>

          <p>
            But here&apos;s what most home cooks don&apos;t understand: <strong>not all onions are the same, and how you cook them completely changes what they contribute to a dish</strong>. Raw onions are sharp and pungent. Sautéed onions are soft and sweet. <Link href="/blog/caramelization-science" className="text-orange-700 hover:text-orange-800 underline">Caramelized onions</Link> are deeply savory and almost candy-like. The same ingredient, three completely different flavors.
          </p>

          <p>
            I learned this on my first day at Purple Café in Seattle. The chef handed me a case of yellow onions and said, &quot;Slice thin. Cook slow. You&apos;ll know they&apos;re done when they&apos;re mahogany brown and smell like the best thing you&apos;ve ever made.&quot; It took me 90 minutes to properly caramelize five pounds of onions, and at the time, I thought it was ridiculous. But when I tasted the finished product—deep, sweet, complex, with no sharpness or bitterness—I understood. <strong>Time transforms onions from harsh to magical</strong>.
          </p>

          <h2 className="flex items-center gap-2">
            <Info className="w-6 h-6 text-orange-700" />
            Understanding Onion Varieties
          </h2>

          <p>
            Not all onions are interchangeable. Each variety has a different flavor profile, water content, and ideal use case.
          </p>

          <h3>Yellow Onions (All-Purpose)</h3>
          <p>
            <strong>Flavor:</strong> Balanced—sharp when raw, sweet when cooked<br />
            <strong>Water content:</strong> Moderate<br />
            <strong>Best for:</strong> Sautéing, caramelizing, soups, stews, general cooking
          </p>

          <p>
            <strong>Why chefs use them:</strong> Yellow onions are the workhorse of the kitchen. They have enough sharpness to add bite when raw, enough sugar to caramelize beautifully, and enough structure to hold up to long cooking. At Mellow Mushroom, we went through cases of yellow onions every week for everything from pizza sauce to soup bases.
          </p>

          <p>
            <strong>When to use them:</strong> Anytime a recipe just says &quot;onion&quot; without specifying, use yellow. They&apos;re the default for a reason.
          </p>

          <h3>White Onions</h3>
          <p>
            <strong>Flavor:</strong> Sharper and more pungent than yellow onions, less sweet<br />
            <strong>Water content:</strong> High<br />
            <strong>Best for:</strong> Mexican and Latin American dishes, fresh salsas, raw applications
          </p>

          <p>
            <strong>Why chefs use them:</strong> White onions have a cleaner, crisper bite that works beautifully in raw applications like pico de gallo, ceviche, and fresh salsas. They&apos;re less sweet than yellow onions, so they don&apos;t compete with other flavors—they just add onion-forward sharpness.
          </p>

          <h3>Red Onions (Purple Onions)</h3>
          <p>
            <strong>Flavor:</strong> Mild, slightly sweet, less sharp than yellow or white<br />
            <strong>Water content:</strong> Moderate to high<br />
            <strong>Best for:</strong> Raw applications (salads, sandwiches, burgers), pickling, grilling
          </p>

          <p>
            <strong>Why chefs use them:</strong> Red onions are beautiful—deep purple layers that add visual appeal. They&apos;re also milder than yellow or white onions, making them perfect for raw applications where you want onion flavor without overwhelming sharpness. They lose their color when cooked, so they&apos;re not ideal for cooked dishes unless aesthetics don&apos;t matter.
          </p>

          <h3>Shallots</h3>
          <p>
            <strong>Flavor:</strong> Delicate, sweet, hint of garlic<br />
            <strong>Water content:</strong> Moderate<br />
            <strong>Best for:</strong> Vinaigrettes, sauces, French cooking, anywhere you want subtle onion flavor
          </p>

          <p>
            <strong>Why chefs use them:</strong> Shallots are smaller, milder, and more refined than regular onions. They add complexity without dominating. At Purple Café, we used shallots in vinaigrettes, pan sauces, and anywhere we needed onion flavor that wouldn&apos;t overpower delicate proteins like fish.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-600" />
              Restaurant Reality: The 45-Minute Onion Rule
            </p>
            <p className="mb-0">
              At Purple Café, we had one ironclad rule for caramelized onions: <strong>45 minutes minimum, no exceptions</strong>. New cooks would try to rush it—crank the heat, get some color in 15 minutes, and call it done. The Chef would taste it once and send them back to start over. &quot;That&apos;s browned onions, not caramelized onions,&quot; he&apos;d say. <strong>&quot;Taste the difference.&quot;</strong> Rushed onions were sharp, one-dimensional, and sometimes bitter. Properly caramelized onions were sweet, complex, jammy, with no harsh bite. That 30 extra minutes of patience was the difference between okay food and restaurant-quality food. <strong>The lesson:</strong> Real <Link href="/blog/caramelization-science" className="text-orange-700 hover:text-orange-800 underline">caramelization</Link> can&apos;t be rushed. Chemistry takes time.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <p className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-700" />
              Want My Complete Kitchen Setup Guide?
            </p>
            <p className="mb-4">
              Get my free &quot;11 Essential Tools I Use Most&quot; PDF—the exact equipment I rely on after 24 years in professional kitchens, including the knives that make onion prep effortless. No fluff, just the tools that actually matter.
            </p>
            <CTAVisibilityTracker
              ctaId="onions-newsletter-cta"
              position="mid_article"
              productSlug="onions-cooking-guide"
              merchant="internal"
            >
              <Link
                href="/newsletter"
                className="inline-block bg-orange-800 text-white px-6 py-3 rounded font-bold hover:bg-orange-800 transition-colors"
              >
                Get the Free Guide →
              </Link>
            </CTAVisibilityTracker>
            <p className="text-sm text-slate-700 mt-3 mb-0">
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          <h2 className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-700" />
            Cooking Methods for Onions
          </h2>

          <h3>1. Sautéing (Quick Cooking)</h3>
          <p>
            <strong>Time:</strong> 5-8 minutes<br />
            <strong>Result:</strong> Soft, translucent, sweet but still with some bite<br />
            <strong>Best for:</strong> Building flavor bases for soups, sauces, stir-fries
          </p>

          <h3>2. Caramelizing (Low and Slow)</h3>
          <p>
            <strong>Time:</strong> 45-60 minutes<br />
            <strong>Result:</strong> Deep golden brown, jammy, sweet, complex<br />
            <strong>Best for:</strong> French onion soup, burger toppings, flatbreads, anywhere you want deep onion flavor
          </p>

          <p>
            For the complete technique, see <Link href="/blog/caramelization-science" className="text-orange-700 hover:text-orange-800 underline">The Science of Caramelization</Link>.
          </p>

          <h3>3. Roasting</h3>
          <p>
            <strong>Time:</strong> 25-35 minutes at 400-425°F<br />
            <strong>Result:</strong> Caramelized edges, soft centers, concentrated sweetness<br />
            <strong>Best for:</strong> Side dishes, salads, grain bowls
          </p>

          <h2>The Bottom Line: Onions Build Flavor</h2>

          <p>
            After 24 years of cooking professionally, I can tell you this: <strong>Onions are the foundation of almost every great savory dish</strong>.
          </p>

          <p>
            Choose the right variety:
          </p>
          <ul>
            <li><strong>Yellow</strong> - All-purpose, caramelizing, cooking</li>
            <li><strong>White</strong> - Mexican food, fresh salsas, raw applications</li>
            <li><strong>Red</strong> - Salads, burgers, sandwiches, mild flavor</li>
            <li><strong>Shallots</strong> - Sauces, vinaigrettes, refined dishes</li>
          </ul>

          <p>
            Cook them properly (patience for <Link href="/blog/caramelization-science" className="text-orange-700 hover:text-orange-800 underline">caramelization</Link>, gentle heat for sautéing), and onions will transform your cooking.
          </p>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/caramelization-science" className="text-orange-700 hover:text-orange-800 font-semibold">
              → The Science of Caramelization
            </Link>
            <Link href="/blog/potatoes-cooking-guide" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Complete Guide to Cooking Potatoes
            </Link>
            <Link href="/blog/knife-safety-protect-fingers" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Knife Safety: How to Protect Your Fingers
            </Link>
            <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Victorinox Fibrox 8&quot; Chef&apos;s Knife Review
            </Link>
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  );
}
