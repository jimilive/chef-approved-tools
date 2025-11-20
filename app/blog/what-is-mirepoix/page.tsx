import Link from 'next/link'
import { Calendar, Clock, User, Target, Check } from 'lucide-react'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import BlogLayout from '@/components/blog/BlogLayout'
import BlogHero from '@/components/blog/BlogHero'
import BlogEmailCapture from '@/components/blog/BlogEmailCapture'
import AuthorBio from '@/components/review/AuthorBio'

export const metadata = generateBlogMetadata('what-is-mirepoix')

const articleSchema = generateArticleSchema({
  headline: "What is Mirepoix and Why Professional Chefs Use It",
  description: "Learn the French aromatic base that appears in professional kitchens worldwide. Understand the 2:1:1 ratio, dice sizes, cooking methods, and global variations.",
  datePublished: "2025-01-20",
  dateModified: "2025-01-20",
  authorName: "Scott Bradley",
  imageUrl: "https://www.chefapprovedtools.com/og-image.jpg",
  urlPrefix: 'blog',
  urlSuffix: 'what-is-mirepoix'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "What is Mirepoix", url: "https://www.chefapprovedtools.com/blog/what-is-mirepoix" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "What is the correct mirepoix ratio?",
    answer: "The classic French ratio is 2 parts onion, 1 part carrot, 1 part celery by weight. For example: 1 pound onions (2 large), 8 ounces carrots (3 medium), 8 ounces celery (4 stalks). This produces approximately 6 cups diced mirepoix."
  },
  {
    question: "Why do professional kitchens use mirepoix?",
    answer: "Mirepoix builds foundational flavor depth without adding identifiable taste. It provides aromatic complexity in one step instead of measuring multiple seasonings. It's essential for stock extraction—helping pull flavor compounds and gelatin from bones. Professional kitchens value the efficiency and consistency."
  },
  {
    question: "What dice size should I use for mirepoix?",
    answer: "Small dice (¼ inch) for quick-cooking dishes and sauces. Medium dice (½ inch) for most applications—the standard. Large dice (¾-1 inch) for long-cooking stocks and braises. Consistent dice size within each batch ensures even cooking."
  },
  {
    question: "What's the difference between sweating, sautéing, and caramelizing mirepoix?",
    answer: "Sweating (low heat, covered) softens vegetables without browning for light-colored sauces. Sautéing (medium-high heat) adds mild caramel notes for tomato sauces and braises. Caramelizing (high heat, stirring frequently) creates deep brown color and rich flavor for brown stocks and gravies."
  },
  {
    question: "What is the Holy Trinity and how is it different from mirepoix?",
    answer: "Holy Trinity is the Cajun/Creole aromatic base: onion, celery, and green bell pepper (replacing carrots). Same 2:1:1 ratio. The bell pepper adds vegetal, slightly bitter notes essential for authentic gumbo, jambalaya, and étouffée. It's the Louisiana version of French mirepoix."
  },
  {
    question: "Should I peel vegetables for mirepoix?",
    answer: "For stocks: don't peel, just wash thoroughly. The peels add color and flavor. For sauces where vegetables will be left in: peel carrots, trim celery ends, peel onions as usual. The goal is clean flavor without bitterness."
  },
  {
    question: "Why does my mirepoix burn before softening?",
    answer: "Heat is too high. Mirepoix needs steady, moderate heat (medium or medium-low) to release flavors without burning. Cook for 10-15 minutes—there's no shortcut. High heat creates burnt aromatics and harsh, bitter flavors."
  },
  {
    question: "What's the difference between soffritto and sofrito?",
    answer: "Soffritto (Italian) is mirepoix plus garlic and sometimes tomato paste/pancetta, sautéed in olive oil. Sofrito (Spanish/Latin) uses onion, garlic, tomatoes, and peppers (no carrots or celery), cooked until tomatoes break down. Different aromatic bases for different cuisines."
  }
]);

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export default function WhatIsMirepoixPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
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

      <BlogLayout breadcrumbTitle="What is Mirepoix">
        <BlogHero
          title="What is Mirepoix and Why Professional Chefs Use It"
          introduction={[
            "Mirepoix—the three-vegetable foundation of French cooking—appears in professional kitchens worldwide because it builds flavor depth that you can't taste directly but would notice immediately if it was missing.",
            "Understanding this aromatic base transforms dozens of recipes from good to professional-quality."
          ]}
          publishedDate="2025-01-20"
          lastUpdated="2025-01-20"
          readTime="11 min read"
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">

          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h2 className="font-bold text-blue-800 mb-3">In This Guide:</h2>
            <ul className="text-blue-700 space-y-1 text-sm mb-0">
              <li>• <a href="#definition" className="text-blue-700 underline">What Mirepoix Is (The Simple Definition)</a></li>
              <li>• <a href="#why-use" className="text-blue-700 underline">Why Professional Kitchens Use Mirepoix</a></li>
              <li>• <a href="#variables" className="text-blue-700 underline">Dice Size, Cooking Method, Fat Choice</a></li>
              <li>• <a href="#variations" className="text-blue-700 underline">Global Variations Across Cuisines</a></li>
              <li>• <a href="#technique" className="text-blue-700 underline">How to Prep Mirepoix Efficiently</a></li>
              <li>• <a href="#mistakes" className="text-blue-700 underline">Common Mistakes to Avoid</a></li>
              <li>• <a href="#faq" className="text-blue-700 underline">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <h2 id="definition">What Mirepoix Is (The Simple Definition)</h2>

          <p>
            Mirepoix is a combination of diced onions, carrots, and celery cooked in fat until softened. That's it. The ratio matters, the size of the dice matters, and the cooking method matters—but the concept is straightforward.
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-700 p-6 my-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Classic Mirepoix Ratio</h4>
            <ul className="space-y-2">
              <li><strong>2 parts onion</strong> (50% of total volume)</li>
              <li><strong>1 part carrot</strong> (25% of total volume)</li>
              <li><strong>1 part celery</strong> (25% of total volume)</li>
            </ul>
            <p className="mt-4 text-sm text-gray-700">
              <strong>By weight:</strong> 1 pound onions (roughly 2 large onions), 8 ounces carrots (roughly 3 medium carrots), 8 ounces celery (roughly 4 stalks with leaves removed) = 6 cups diced mirepoix
            </p>
          </div>

          <h3>History and Etymology</h3>

          <p>
            The name comes from Charles-Pierre-Gaston François de Lévis, Duke of Mirepoix, an 18th-century French marshal whose chef popularized the mixture. But the technique predates the name by centuries—aromatic vegetables cooked in fat as a flavor base appear in medieval European cooking, Middle Eastern cooking, and Asian cooking under different names.
          </p>

          <h2 id="why-use">Why Professional Kitchens Use Mirepoix</h2>

          <h3>It Builds Foundational Flavor</h3>

          <p>
            Mirepoix doesn't add a specific taste you can identify—it adds depth. The science: onions contain sulfur compounds that become sweet when cooked slowly. Carrots add natural sugars that caramelize. Celery contributes savory, slightly bitter notes that balance the sweetness. Combined, they create a flavor base that makes everything layered on top taste more complete.
          </p>

          <h3>It Replaces Multiple Ingredients</h3>

          <p>
            Professional kitchens value efficiency. Mirepoix provides what would otherwise require five or six separate aromatics. One prep step (dice mirepoix) replaces multiple steps (peel and dice onions, peel and dice carrots, wash and dice celery, measure garlic, measure herbs, measure spices).
          </p>

          <p>
            During high-volume service, nobody has time to measure individual aromatics for each pan. Mirepoix is pre-portioned, ready to go, consistent.
          </p>

          <h3>It Improves Stock Extraction</h3>

          <p>
            The most important use of mirepoix is in stocks. The vegetables serve as an extraction vehicle: as they cook, their cell walls break down and release enzymes that help pull flavor compounds and gelatin from bones into the liquid.
          </p>

          <p>
            Stock made with mirepoix has more body, richer flavor, and better gelatin content than stock made with bones and water alone. The vegetables themselves get discarded, but the extraction they enable is what makes professional stock different from basic stock.
          </p>

          <h2 id="variables">The Three Variables That Actually Matter</h2>

          <h3>Dice Size Determines Cooking Time and Flavor Extraction</h3>

          <p>
            Professional kitchens use three different dice sizes depending on the application:
          </p>

          <p>
            <strong>Small dice (¼ inch):</strong> For quick-cooking dishes like pan sauces, quick braises, or sautés. Softens in 5-8 minutes, releases flavor fast, integrates into the final dish. Use when the vegetables need to disappear—nobody wants to bite into a chunk of carrot in a refined pan sauce.
          </p>

          <p>
            <strong>Medium dice (½ inch):</strong> The standard for most applications. Takes 10-15 minutes to soften, provides steady flavor release throughout cooking, maintains some texture if you want visible vegetables. Efficient prep time, versatile application.
          </p>

          <p>
            <strong>Large dice (¾-1 inch):</strong> For long-cooking stocks and braises. Won't break down during 6-8 hour simmers, releases flavor gradually over extended cooking, easier to strain out at the end. Use for stocks that simmer all day.
          </p>

          <h3>Cooking Method Changes the Flavor Profile</h3>

          <p>
            Mirepoix isn't always cooked the same way. The method you choose determines the final flavor:
          </p>

          <p>
            <strong>Sweating (low heat, covered):</strong> Softens vegetables without browning. Preserves fresh, bright flavors. Use for white stocks, delicate fish sauces, light-colored soups. Professional kitchens sweat mirepoix for cream-based soups when they want vegetable flavor without any caramelization that would darken the soup.
          </p>

          <p>
            <strong>Sautéing (medium-high heat, uncovered):</strong> Softens vegetables with light browning. Adds mild caramel notes without overpowering. Use for tomato sauces, braises, most stocks. The standard method—enough caramelization to add depth, not so much that it dominates.
          </p>

          <p>
            <strong>Caramelizing (high heat, stirring frequently):</strong> Browns vegetables deeply for maximum flavor. Adds rich, sweet, complex notes. Use for brown stocks, rich gravies, deeply-flavored braises. The dark brown vegetables give finished stock its deep mahogany color.
          </p>

          <div className="bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-700" />
              Master More Foundational Techniques
            </h3>
            <p className="mb-4">
              Get my &quot;French Cooking Fundamentals&quot; guide—stocks, sauces, and classical techniques from 24 years in professional kitchens.
            </p>
            <CTAVisibilityTracker
              ctaId="mirepoix-newsletter-cta"
              position="mid_article"
              productSlug="what-is-mirepoix"
              merchant="internal"
            >
              <Link
                href="/newsletter"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Download Free Guide →
              </Link>
            </CTAVisibilityTracker>
          </div>

          <h3>Fat Choice Affects the Base Flavor</h3>

          <p>
            Mirepoix is always cooked in fat—the fat carries and amplifies the aromatic compounds released by the vegetables. The fat you choose matters:
          </p>

          <p>
            <strong>Butter:</strong> Traditional French choice. Adds richness and mild dairy notes. Use for refined sauces, cream-based soups, French-style braises. Professional kitchens use clarified butter (to prevent burning) for mirepoix in pan sauces.
          </p>

          <p>
            <strong>Olive oil:</strong> Mediterranean choice. Adds fruity, slightly peppery notes. Use for Italian sauces, Mediterranean braises, rustic soups. Standard for marinara and tomato-based sauces.
          </p>

          <p>
            <strong>Rendered animal fat:</strong> Traditional for stocks. Adds deep, meaty flavor. Use bacon fat for pork stocks, chicken fat for chicken stocks, beef fat for beef stocks. This amplifies the protein flavor beyond what olive oil or butter can provide.
          </p>

          <h2 id="variations">Global Variations Across Cuisines</h2>

          <p>
            The concept of aromatic vegetables cooked in fat as a flavor base appears in nearly every cuisine. The specific vegetables change, but the technique remains:
          </p>

          <h3>The Holy Trinity (Cajun/Creole Cooking)</h3>

          <p>
            Replace carrots with green bell peppers. Same ratio: 2 parts onion, 1 part celery, 1 part green bell pepper. The bell pepper adds a vegetal, slightly bitter note that carrots don't provide—it's essential for authentic Cajun flavor in gumbo, jambalaya, and étouffée.
          </p>

          <h3>Soffritto (Italian Cooking)</h3>

          <p>
            Add garlic, tomato paste, and sometimes pancetta to the base mirepoix. Onion, carrot, celery, and garlic sautéed in olive oil until soft, then tomato paste added and cooked until it darkens. The garlic and tomato paste intensify the base beyond what plain mirepoix provides. Used for Bolognese and many Italian braises.
          </p>

          <h3>Sofrito (Spanish/Latin American Cooking)</h3>

          <p>
            Onion, garlic, tomatoes, and peppers—no carrots or celery. Cooked in olive oil until the tomatoes break down into a thick paste. The result is brighter, more acidic, and tomato-forward compared to French mirepoix. Used as the base for paella and many Spanish dishes.
          </p>

          <h2 id="technique">How to Prep Mirepoix Efficiently</h2>

          <h3>The Professional Method</h3>

          <p>
            Professional kitchens prep mirepoix in large batches during morning prep—enough for the entire day's service. Home cooks can replicate this efficiency:
          </p>

          <p>
            <strong>Step 1: Prep vegetables separately, then combine.</strong> Dice all onions first, all carrots second, all celery third. Don't alternate between vegetables—every time you switch, you lose efficiency picking up a different vegetable, washing a different cutting board, resetting your knife rhythm.
          </p>

          <p>
            <strong>Step 2: Use the correct ratio by weight, not volume.</strong> Volume measurements are inconsistent because onions compress more than carrots. Professional kitchens weigh everything. Home cooks should do the same for consistency.
          </p>

          <p>
            <strong>Step 3: Store in airtight containers with damp paper towels on top.</strong> Mirepoix oxidizes quickly—onions brown, carrots dry out, celery wilts. Cover prepped mirepoix with a damp paper towel, seal the container, refrigerate. It stays fresh for 48 hours.
          </p>

          <h3>The Tool That Matters Most</h3>

          <p>
            A sharp chef's knife with good balance makes mirepoix prep faster and produces better results. Sharp knives make clean cuts that preserve cell structure—the vegetables release less moisture during storage, staying firmer longer. Dull knives crush cells, releasing enzymes that cause browning and off-flavors.
          </p>

          <p>
            Mirepoix prepped with a dull knife turns brown and slimy within 12 hours. Mirepoix prepped with a sharp knife stays fresh for 48+ hours refrigerated.
          </p>

          <h2 id="mistakes">Common Mistakes to Avoid</h2>

          <h3>Uneven Dice Sizes</h3>

          <p>
            <strong>The problem:</strong> ¼-inch pieces next to ¾-inch pieces. Small pieces burn while large pieces stay raw. Uneven cooking means uneven flavor extraction.
          </p>

          <p>
            <strong>The fix:</strong> Take an extra 60 seconds to dice consistently. All pieces should be roughly the same size within ⅛ inch. It's fine if onions are slightly larger than carrots (onions soften faster), but within each vegetable, consistency matters.
          </p>

          <h3>Cooking Over High Heat</h3>

          <p>
            <strong>The problem:</strong> Using high heat to "save time." The onions burn around the edges before the carrots soften, and the final stock tastes bitter.
          </p>

          <p>
            <strong>The fix:</strong> Medium heat, patience. Mirepoix takes 10-15 minutes to soften properly—there's no shortcut. If you try to rush it with high heat, you'll get burnt aromatics and harsh flavors.
          </p>

          <h3>Forgetting Salt</h3>

          <p>
            <strong>The problem:</strong> Mirepoix cooked without salt doesn't release moisture properly and stays drier than it should.
          </p>

          <p>
            <strong>Why it matters:</strong> Vegetables need salt to release their moisture and flavors. Salt draws out water, which prevents steaming and enables proper sautéing. Professional kitchens salt mirepoix as soon as it hits the pan—a three-finger pinch of kosher salt per 4 cups of vegetables.
          </p>

          <p>
            <strong>The fix:</strong> Salt isn't optional—it's a chemical catalyst that makes the entire process work. Always add salt when you add mirepoix to the pan.
          </p>

          <h2>Putting It All Together</h2>

          <p>
            Mirepoix isn't flashy. It doesn't have visual drama or technical complexity. But professional kitchens worldwide use some form of aromatic vegetable base in nearly every refined savory dish.
          </p>

          <p>
            The reason: it's reliable. Dice it consistently, cook it properly, let it do its job, and the results are predictable. That matters in professional kitchens where the same dish needs to taste identical whether it's cooked on Tuesday or Saturday.
          </p>

          <p>
            Home cooks benefit from the same reliability. Master mirepoix—the ratio, the dice, the cooking method—and dozens of recipes suddenly become easier to execute. Stocks gain body, braises gain depth, sauces gain complexity. The vegetables themselves disappear, but their impact persists in every bite.
          </p>

        </div>

        {/* FAQ Section */}
        <div className="border-t border-gray-200 pt-12 mt-12" id="faq">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">What is the correct mirepoix ratio?</h3>
              <p className="text-slate-700 leading-relaxed">
                The classic French ratio is 2 parts onion, 1 part carrot, 1 part celery by weight. For example: 1 pound onions (2 large), 8 ounces carrots (3 medium), 8 ounces celery (4 stalks). This produces approximately 6 cups diced mirepoix.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Why do professional kitchens use mirepoix?</h3>
              <p className="text-slate-700 leading-relaxed">
                Mirepoix builds foundational flavor depth without adding identifiable taste. It provides aromatic complexity in one step instead of measuring multiple seasonings. It&apos;s essential for stock extraction—helping pull flavor compounds and gelatin from bones. Professional kitchens value the efficiency and consistency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">What dice size should I use for mirepoix?</h3>
              <p className="text-slate-700 leading-relaxed">
                Small dice (¼ inch) for quick-cooking dishes and sauces. Medium dice (½ inch) for most applications—the standard. Large dice (¾-1 inch) for long-cooking stocks and braises. Consistent dice size within each batch ensures even cooking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">What&apos;s the difference between sweating, sautéing, and caramelizing mirepoix?</h3>
              <p className="text-slate-700 leading-relaxed">
                Sweating (low heat, covered) softens vegetables without browning for light-colored sauces. Sautéing (medium-high heat) adds mild caramel notes for tomato sauces and braises. Caramelizing (high heat, stirring frequently) creates deep brown color and rich flavor for brown stocks and gravies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">What is the Holy Trinity and how is it different from mirepoix?</h3>
              <p className="text-slate-700 leading-relaxed">
                Holy Trinity is the Cajun/Creole aromatic base: onion, celery, and green bell pepper (replacing carrots). Same 2:1:1 ratio. The bell pepper adds vegetal, slightly bitter notes essential for authentic gumbo, jambalaya, and étouffée. It&apos;s the Louisiana version of French mirepoix.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Should I peel vegetables for mirepoix?</h3>
              <p className="text-slate-700 leading-relaxed">
                For stocks: don&apos;t peel, just wash thoroughly. The peels add color and flavor. For sauces where vegetables will be left in: peel carrots, trim celery ends, peel onions as usual. The goal is clean flavor without bitterness.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Why does my mirepoix burn before softening?</h3>
              <p className="text-slate-700 leading-relaxed">
                Heat is too high. Mirepoix needs steady, moderate heat (medium or medium-low) to release flavors without burning. Cook for 10-15 minutes—there&apos;s no shortcut. High heat creates burnt aromatics and harsh, bitter flavors.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">What&apos;s the difference between soffritto and sofrito?</h3>
              <p className="text-slate-700 leading-relaxed">
                Soffritto (Italian) is mirepoix plus garlic and sometimes tomato paste/pancetta, sautéed in olive oil. Sofrito (Spanish/Latin) uses onion, garlic, tomatoes, and peppers (no carrots or celery), cooked until tomatoes break down. Different aromatic bases for different cuisines.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CTAVisibilityTracker
              ctaId="mirepoix-related-stock"
              position="final_cta"
              productSlug="what-is-mirepoix"
              merchant="internal"
            >
              <Link href="/blog/making-stock-professional-chef-method" className="text-orange-700 hover:text-orange-800 font-semibold">
                → Making Stock: The Professional Method
              </Link>
            </CTAVisibilityTracker>
            <CTAVisibilityTracker
              ctaId="mirepoix-related-knife-skills"
              position="final_cta"
              productSlug="what-is-mirepoix"
              merchant="internal"
            >
              <Link href="/blog/knife-skills-how-to-hold-chef-knife" className="text-orange-700 hover:text-orange-800 font-semibold">
                → Master Knife Skills for Efficient Prep
              </Link>
            </CTAVisibilityTracker>
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
