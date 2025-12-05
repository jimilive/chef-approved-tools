import Link from 'next/link';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import { generateBlogMetadata } from '@/lib/metadata-helpers';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, Flame, AlertTriangle, CheckCircle2 } from 'lucide-react';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogHero from '@/components/blog/BlogHero';
import BlogEmailCapture from '@/components/blog/BlogEmailCapture';
import AuthorBio from '@/components/review/AuthorBio';

export const metadata = generateBlogMetadata('how-to-make-roux');

const articleSchema = generateArticleSchema({
  headline: "How to Make a Perfect Roux: The Foundation of Great Sauces",
  description: "Learn how to make a roux the right way and master the foundation of countless professional sauces.",
  datePublished: "2025-09-24",
  dateModified: "2025-10-24",
  authorName: "Scott Bradley",
  urlPrefix: 'blog',
  urlSuffix: 'how-to-make-roux'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "How to Make a Perfect Roux", url: "https://www.chefapprovedtools.com/blog/how-to-make-roux" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "Can I use something other than butter?",
    answer: "Absolutely. Common options include butter (classic French technique), clarified butter/ghee (higher smoke point), vegetable oil (neutral flavor, best for dark roux), bacon fat or sausage drippings (adds flavor), or olive oil (less common but works). Choose based on your dish's flavor profile and heat requirements."
  },
  {
    question: "Do I have to use all-purpose flour?",
    answer: "All-purpose flour is best for consistent, neutral results. Bread flour works but produces thicker texture. Cake flour works but has less thickening power. Don't use self-rising flour (leavening agents interfere) or whole wheat (too heavy, grainy)."
  },
  {
    question: "Why is my sauce lumpy even though I whisked?",
    answer: "Likely causes: Added hot liquid to hot roux too fast, didn't whisk constantly, used cold milk that curdled, or roux had burned bits. Fix for current batch: Push through fine-mesh strainer, reheat, continue whisking. Fix for next time: Temperature contrast + constant whisking + patience."
  },
  {
    question: "How do I know when my dark roux is done?",
    answer: "Color: Dark milk chocolate brown (Hershey bar color). Smell: Deep, toasted, nutty—almost like roasted coffee. Time: 30-40 minutes usually, but go by color and smell, not time. Warning sign: If it smells even slightly burnt or acrid, it's gone too far. Start over."
  }
]);

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export default function RouxPage() {
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

      <BlogLayout breadcrumbTitle="How to Make a Perfect Roux">
        <BlogHero
          title="How to Make a Perfect Roux: The Foundation of Great Sauces"
          introduction={["The single most important sauce technique you can learn—how to make a proper roux, why it matters, and how professionals use it to create everything from béchamel to gumbo."]}
          publishedDate="2025-09-24"
          lastUpdated="2025-10-24"
          readTime="10 min read"
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          <p>
            If there&apos;s one technique that separates cooks who make good sauces from cooks who make <strong>great</strong> sauces, it&apos;s knowing how to make a proper roux.
          </p>

          <p>
            A roux is absurdly simple—just flour and fat cooked together—but it&apos;s the foundation of countless classic dishes: béchamel, velouté, cheese sauce, gumbo, étouffée, sawmill gravy, and more. Master the roux, and you&apos;ve unlocked an entire category of cooking.
          </p>

          <p>
            But here&apos;s the thing: most home cooks either don&apos;t know how to make a roux at all, or they make it wrong—raw-tasting flour, lumpy sauce, burnt bits, grainy texture. In 24 years of professional cooking, I&apos;ve made thousands of gallons of roux-based sauces. Let me show you the right way—the professional way—so your sauces are always smooth, flavorful, and perfectly thickened.
          </p>

          <h2>What is a Roux?</h2>

          <p>
            <strong>A roux</strong> (pronounced &quot;roo&quot;) is equal parts fat and flour cooked together to create a thickening agent for sauces, soups, and stews. That&apos;s it. Two ingredients, one technique, infinite applications.
          </p>

          <p>
            <strong>The science:</strong> Flour contains starch granules. When you heat starch in fat, it gelatinizes—the granules swell and thicken liquid. But raw flour tastes terrible. By cooking the flour in fat first, you:
          </p>
          <ul>
            <li><strong>Eliminate the raw flour taste</strong> (that chalky, pasty flavor)</li>
            <li><strong>Develop nutty, toasted flavor</strong> (especially in darker roux)</li>
            <li><strong>Create a stable thickening base</strong> (smooth, not lumpy)</li>
          </ul>

          <p>
            <strong>The basic ratio:</strong> 1:1 by weight. Equal parts fat and flour. That&apos;s the classic French technique, and it works perfectly every time.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-600" />
              Restaurant Reality: The Line Cook&apos;s First Lesson
            </p>
            <p className="mb-0">
              At Purple Café, one of the first things you learned as a new line cook was <strong>how to make a proper blonde roux for béchamel</strong>. Not because it&apos;s difficult, but because it teaches you patience, attention, and heat control—the foundations of professional cooking. I watched new cooks rush it, burn it, or walk away and ruin an entire batch. The Chef would make them start over until they got it right. <strong>&quot;If you can&apos;t make a roux,&quot;</strong> he&apos;d say, <strong>&quot;you can&apos;t work my line.&quot;</strong> Why? Because a roux-based sauce is on almost every menu. Cheese sauce, cream sauce, gravy, soup bases—they all start with a roux. Get this right, and you&apos;ve got a fundamental building block for hundreds of dishes. <strong>The lesson:</strong> Mastery of fundamentals isn&apos;t optional. It&apos;s the foundation everything else is built on.
            </p>
          </div>

          <h2>The Three Types of Roux</h2>

          <p>
            Roux is classified by color and cooking time. Each has different uses and flavor profiles:
          </p>

          <h3 className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-amber-100 rounded-full"></span>
            1. White Roux (2-3 minutes)
          </h3>
          <ul>
            <li><strong>Color:</strong> Barely colored, pale ivory, almost white</li>
            <li><strong>Cooking time:</strong> 2-3 minutes (just until raw flour smell is gone)</li>
            <li><strong>Flavor:</strong> Neutral, mild, clean</li>
            <li><strong>Thickening power:</strong> Strongest (least flavor compounds, most starch available)</li>
            <li><strong>Uses:</strong> Béchamel, white sauces, cream soups, alfredo, mac and cheese</li>
          </ul>

          <h3 className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-amber-300 rounded-full"></span>
            2. Blonde Roux (5-7 minutes)
          </h3>
          <ul>
            <li><strong>Color:</strong> Light tan, golden, like wet sand</li>
            <li><strong>Cooking time:</strong> 5-7 minutes (stir constantly as it darkens)</li>
            <li><strong>Flavor:</strong> Mild nutty notes, slightly toasted</li>
            <li><strong>Thickening power:</strong> Medium (some starch broken down, still plenty of thickening)</li>
            <li><strong>Uses:</strong> Velouté, chicken gravy, lighter cream sauces, bisques</li>
          </ul>

          <h3 className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-amber-700 rounded-full"></span>
            3. Brown/Dark Roux (15-45 minutes)
          </h3>
          <ul>
            <li><strong>Color:</strong> Milk chocolate to dark chocolate brown</li>
            <li><strong>Cooking time:</strong> 15-45 minutes (patience required, constant stirring)</li>
            <li><strong>Flavor:</strong> Deeply nutty, toasted, complex, almost caramelized</li>
            <li><strong>Thickening power:</strong> Weakest (starch gelatinization reduced by prolonged cooking)</li>
            <li><strong>Uses:</strong> Gumbo, étouffée, brown gravy, Cajun/Creole sauces</li>
          </ul>

          <h2>How to Make a White Roux (Step-by-Step)</h2>

          <p>
            <strong>Equipment:</strong>
          </p>
          <ul>
            <li>Heavy-bottomed saucepan (even heat distribution)</li>
            <li>Whisk or wooden spoon</li>
            <li>Measuring cups</li>
          </ul>

          <p>
            <strong>Ingredients:</strong>
          </p>
          <ul>
            <li>4 tablespoons butter (or oil, if preferred)</li>
            <li>4 tablespoons all-purpose flour</li>
          </ul>

          <h3>Step 1: Melt the Fat</h3>
          <p>
            Heat your pan over medium heat. Add butter and let it melt completely. It should foam slightly but not brown. If using oil, just heat until shimmering.
          </p>

          <h3>Step 2: Add the Flour</h3>
          <p>
            When the fat is melted, add all the flour at once. Immediately start whisking to combine. The mixture will look like wet sand or paste—that&apos;s normal.
          </p>

          <h3>Step 3: Cook (2-3 Minutes)</h3>
          <p>
            Whisk constantly over medium heat. You&apos;re looking for:
          </p>
          <ul>
            <li>The raw flour smell to disappear (about 2 minutes)</li>
            <li>The mixture to become smooth and slightly bubbly</li>
            <li>No color change (it should stay pale)</li>
          </ul>

          <h3>Step 4: Use or Cool</h3>
          <p>
            Either use immediately (for hot sauces) or cool completely before storing (refrigerate up to a week, freeze up to 3 months).
          </p>

          <p>
            <strong>That&apos;s it.</strong> Two ingredients, 3 minutes, perfect foundation for béchamel or any white sauce.
          </p>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg">
            <h4 className="text-lg font-bold text-slate-900 mt-0">Pro Tip: The Ratio Rule</h4>
            <p className="mb-2">
              For a medium-thick sauce (like classic béchamel), use this ratio:
            </p>
            <p className="font-bold mb-2">
              3 tablespoons roux : 1 cup liquid
            </p>
            <p className="mb-0">
              That&apos;s about 1.5 tbsp butter + 1.5 tbsp flour per cup of milk. Want thicker? Use 4-5 tablespoons roux per cup. Want thinner? Use 2 tablespoons per cup. <strong>Why this matters:</strong> Most recipes don&apos;t tell you the ratio—they just give amounts. Understanding the ratio means you can scale any sauce up or down and adjust thickness to your preference.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <p className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-700" />
              Want My Complete Kitchen Setup Guide?
            </p>
            <p className="mb-4">
              Get my free &quot;11 Essential Tools I Use Most&quot; PDF—the exact equipment I rely on after 24 years in professional kitchens. No fluff, just the tools that actually matter.
            </p>
            <CTAVisibilityTracker
              ctaId="roux-newsletter-cta"
              position="mid_article"
              productSlug="how-to-make-roux"
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
            <AlertTriangle className="w-6 h-6 text-orange-700" />
            Common Roux Mistakes (And Fixes)
          </h2>

          <h3>Mistake #1: Lumpy Sauce</h3>
          <p>
            <strong>The cause:</strong> Hot roux + hot liquid added too fast, or not enough whisking.
          </p>
          <p>
            <strong>The fix:</strong>
          </p>
          <ul>
            <li><strong>Prevention:</strong> Temperature contrast (hot + cold) and constant whisking</li>
            <li><strong>Recovery:</strong> Push through a fine-mesh strainer, reheat, and continue whisking</li>
          </ul>

          <h3>Mistake #2: Raw Flour Taste</h3>
          <p>
            <strong>The cause:</strong> Didn&apos;t cook the roux long enough before adding liquid.
          </p>
          <p>
            <strong>The fix:</strong> Once sauce is made, simmer it longer (10-15 minutes) to cook out the raw flour taste. For next time, cook your roux 1-2 minutes longer.
          </p>

          <h3>Mistake #3: Burnt Roux</h3>
          <p>
            <strong>The cause:</strong> Heat too high, not stirring constantly, or walked away.
          </p>
          <p>
            <strong>The fix:</strong> There is no fix. Burnt roux tastes bitter and acrid. Throw it out and start over. <strong>Burnt roux ruins everything it touches.</strong>
          </p>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-600 p-6 my-8 rounded-r-lg">
            <h4 className="text-lg font-bold text-slate-900 mt-0 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Perfect Roux Checklist
            </h4>
            <p className="font-semibold mb-2">Before you start:</p>
            <ul className="space-y-1 mb-4">
              <li>☐ Heavy pan with even heat distribution</li>
              <li>☐ Whisk or wooden spoon ready</li>
              <li>☐ Fat and flour measured (equal parts by weight)</li>
              <li>☐ Liquid measured and temperature appropriate</li>
              <li>☐ Timer if making dark roux (20-40 minutes)</li>
              <li>☐ Nothing else competing for your attention</li>
            </ul>
            <p className="font-semibold mb-2">During cooking:</p>
            <ul className="space-y-1 mb-4">
              <li>☐ Constant stirring (especially for dark roux)</li>
              <li>☐ Watch for color changes</li>
              <li>☐ Smell for nuttiness (not burning)</li>
              <li>☐ Adjust heat as needed</li>
              <li>☐ Remove from heat when color is right</li>
            </ul>
            <p className="font-semibold mb-2">When making sauce:</p>
            <ul className="space-y-1">
              <li>☐ Use temperature contrast (hot/cold)</li>
              <li>☐ Whisk constantly while adding liquid</li>
              <li>☐ Bring to full simmer</li>
              <li>☐ Simmer 8-12 minutes minimum</li>
              <li>☐ Taste and adjust seasoning</li>
              <li>☐ Strain if lumpy (but shouldn&apos;t be)</li>
            </ul>
          </div>

          <h2>The Bottom Line: Master the Roux, Master Sauces</h2>

          <p>
            After 24 years in professional kitchens, I can tell you this: <strong>if you can make a proper roux, you can make almost any sauce</strong>.
          </p>

          <p>
            It&apos;s not complicated. It&apos;s not difficult. It just requires:
          </p>
          <ul>
            <li>Equal parts fat and flour</li>
            <li>Heat control</li>
            <li>Constant stirring</li>
            <li>Patience (especially for dark roux)</li>
            <li>Temperature contrast when adding liquid</li>
          </ul>

          <p>
            Get this right and you&apos;ve unlocked béchamel, cheese sauce, gravy, gumbo, cream soups, velouté, and dozens of other foundations. Every professional chef makes roux-based sauces weekly—many daily. It&apos;s that fundamental.
          </p>

          <p>
            The next time you make mac and cheese, skip the packet and make a real cheese sauce from a proper roux. Or make biscuits and gravy with a blonde roux and watch how much better it tastes than the jarred stuff. Or spend 40 minutes making a dark roux for authentic gumbo.
          </p>

          <p>
            Once you&apos;ve tasted the difference, you&apos;ll never go back to shortcuts.
          </p>

          <p>
            That&apos;s the power of mastering fundamentals. Welcome to better sauces.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/cheese-sauce-mac-and-cheese" className="text-orange-700 hover:text-orange-800 font-semibold">
              → How to Make Perfect Cheese Sauce for Mac and Cheese
            </Link>
            <Link href="/blog/what-is-braising" className="text-orange-700 hover:text-orange-800 font-semibold">
              → What is Braising and Why It&apos;s Amazing
            </Link>
            <Link href="/blog/caramelization-science" className="text-orange-700 hover:text-orange-800 font-semibold">
              → The Science of Caramelization
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
