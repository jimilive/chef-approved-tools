import Link from 'next/link'
import { Calendar, Clock, User, Target, Check, AlertTriangle } from 'lucide-react'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import HowToSchema from '@/components/HowToSchema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import BlogLayout from '@/components/blog/BlogLayout'
import BlogHero from '@/components/blog/BlogHero'
import BlogEmailCapture from '@/components/blog/BlogEmailCapture'
import BlogNewsletterCTA from '@/components/blog/BlogNewsletterCTA'
import BlogFAQ from '@/components/blog/BlogFAQ'
import AuthorBio from '@/components/review/AuthorBio'
import { marinaraData } from './marinara-data'

export const metadata = generateBlogMetadata('how-to-make-marinara-sauce')

const articleSchema = generateArticleSchema({
  headline: "How to Make Marinara Sauce: Authentic Italian Technique",
  description: "Learn authentic Italian marinara sauce technique. Understand why 30-45 minutes is optimal, why quality tomatoes need no sugar, and the mistakes that ruin most homemade marinara.",
  datePublished: "2025-01-20",
  dateModified: "2025-01-20",
  authorName: "Scott Bradley",
  urlPrefix: 'blog',
  urlSuffix: 'how-to-make-marinara-sauce'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "How to Make Marinara Sauce", url: "https://www.chefapprovedtools.com/blog/how-to-make-marinara-sauce" }
]);

const faqSchema = generateFAQSchema(marinaraData.faq.questions);

// ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


export default function MarinaraSaucePage() {
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
      <HowToSchema
        name="How to Make Marinara Sauce: Authentic Italian Technique"
        description="Learn authentic Italian marinara sauce technique. Five ingredients, 30-45 minutes, professional results."
        datePublished="2025-01-20"
        totalTime="PT45M"
        tools={["12-inch sauté pan or skillet", "Sharp knife", "Wooden spoon", "Bowl for crushing tomatoes"]}
        steps={[
          { name: "Prepare the Tomatoes", text: "Open can of whole tomatoes, pour into bowl, and hand-crush each tomato into roughly 1-inch pieces. Reserve the juice." },
          { name: "Toast the Garlic", text: "Heat 3 tablespoons olive oil in a wide pan over medium heat. Add thinly sliced garlic and cook 2-3 minutes until fragrant and light golden." },
          { name: "Add Tomatoes and Salt", text: "Add crushed tomatoes and reserved juice immediately when garlic is ready. Add 1 teaspoon kosher salt and stir to combine." },
          { name: "Simmer and Reduce", text: "Bring to a simmer, reduce heat to medium-low, and cook uncovered for 30-40 minutes, stirring every 5-7 minutes until thickened." },
          { name: "Add Basil and Finish", text: "Turn off heat, tear 8-10 fresh basil leaves into sauce, stir, and let sit 2-3 minutes. Taste and adjust salt as needed." }
        ]}
      />

      <BlogLayout breadcrumbTitle="How to Make Marinara Sauce">
        <BlogHero
          title="How to Make Marinara Sauce: Authentic Italian Technique"
          introduction={[
            "Authentic Italian marinara sauce uses five ingredients and 30-45 minutes—not hours of simmering. The difference between bright, fresh marinara and dull, overcooked sauce comes down to timing and quality ingredients.",
            "Understanding why less cooking produces better results transforms this simple sauce from good to exceptional."
          ]}
          publishedDate="2025-01-20"
          lastUpdated="2025-01-20"
          readTime="10 min read"
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">

          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h2 className="font-bold text-blue-800 mb-3">In This Guide:</h2>
            <ul className="text-blue-700 space-y-1 text-sm mb-0">
              <li>• <a href="#ingredients" className="text-blue-700 underline">The Five Essential Ingredients</a></li>
              <li>• <a href="#timing" className="text-blue-700 underline">Why 30-45 Minutes is Optimal</a></li>
              <li>• <a href="#method" className="text-blue-700 underline">Step-by-Step Professional Method</a></li>
              <li>• <a href="#mistakes" className="text-blue-700 underline">Common Mistakes to Avoid</a></li>
              <li>• <a href="#equipment" className="text-blue-700 underline">The Equipment That Matters</a></li>
              <li>• <a href="#faq" className="text-blue-700 underline">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <p>
            Marinara sauce proves that simplicity beats complexity when executed correctly. Five ingredients, proper technique, and the discipline to stop cooking at 35 minutes instead of letting it simmer for &quot;just another hour&quot; separate authentic Italian marinara from American adaptations.
          </p>

          <h2 id="ingredients">The Five Essential Ingredients (And Why Each Matters)</h2>

          <div className="bg-orange-50 border-l-4 border-orange-700 p-6 my-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Authentic Marinara Formula</h3>
            <ul className="space-y-2">
              <li><strong>1 (28-ounce) can whole peeled tomatoes</strong> - San Marzano DOP preferred</li>
              <li><strong>3 tablespoons extra-virgin olive oil</strong> - Must be extra-virgin for proper flavor</li>
              <li><strong>4 cloves garlic, thinly sliced</strong> - Fresh only, never jarred or powdered</li>
              <li><strong>1 teaspoon kosher salt</strong> - Diamond Crystal preferred, adjust to taste</li>
              <li><strong>8-10 fresh basil leaves</strong> - Torn by hand, added at the end</li>
            </ul>
            <p className="mt-4 text-sm text-slate-700">
              Optional: ¼ teaspoon red pepper flakes for heat. <strong>NO</strong> sugar, onions, carrots, or celery in authentic marinara.
            </p>
          </div>

          <h3>Whole Peeled Tomatoes: The Only Choice</h3>

          <p>
            Whole peeled San Marzano tomatoes are the highest quality canned product. The best tomatoes are canned whole because appearance matters—damaged or inferior tomatoes go into crushed or diced products.
          </p>

          <p>
            San Marzano tomatoes from Italy&apos;s Campania region have naturally balanced sweetness (pH 4.0-4.5), thick flesh, fewer seeds, and lower moisture content. Look for &quot;Pomodoro San Marzano dell&apos;Agro Sarnese-Nocerino DOP&quot; certification.
          </p>

          <p>
            Avoid diced tomatoes—they contain calcium chloride as a firming agent that prevents the tomatoes from breaking down properly during cooking. Crushed tomatoes include skins and seeds that add bitterness.
          </p>

          <h3>Extra-Virgin Olive Oil: Not Negotiable</h3>

          <p>
            Extra-virgin olive oil has the flavor compounds and fruitiness that regular olive oil lacks. The peppery, fruity backbone is essential to marinara&apos;s character. Regular olive oil adds fat without flavor.
          </p>

          <h3>Fresh Garlic, Thinly Sliced</h3>

          <p>
            Sliced garlic (not minced) infuses the oil with flavor without burning. Slice to ⅛-inch thickness—thin enough to soften quickly, thick enough to avoid burning. Minced garlic burns in 30 seconds over medium heat. Sliced garlic toasts gently for 2-3 minutes before browning.
          </p>

          <h3>Kosher Salt</h3>

          <p>
            Kosher salt dissolves evenly and seasons predictably. Table salt is twice as concentrated by volume because the crystals pack tighter. If you substitute table salt without adjusting, you&apos;ll over-salt the sauce.
          </p>

          <h3>Fresh Basil, Added at the End</h3>

          <p>
            Fresh basil loses its aromatic compounds when cooked longer than 2-3 minutes. Add torn basil leaves during the final 3-4 minutes of cooking—just long enough to wilt and release fragrance, not long enough to turn black and bitter. Dried basil tastes like hay, not basil.
          </p>

          <h2 id="timing">Why 30-45 Minutes Is Optimal (Not 2-3 Hours)</h2>

          <p>
            The most common marinara mistake is overcooking. Extended simmering (2-3 hours) transforms marinara into a fundamentally different sauce.
          </p>

          <h3>The Science of Short Cooking</h3>

          <p>
            Volatile flavor compounds that make tomatoes taste like tomatoes—hexanal, hexenal, and 3-methylbutanal—evaporate during extended cooking. What remains after 2-3 hours is dull, flat sauce that tastes overcooked rather than fresh.
          </p>

          <p>
            Professional Italian chefs specify 20-30 minutes as optimal: &quot;You want just enough time for everything to get acquainted without losing that &apos;hey, I&apos;m actually a tomato&apos; personality.&quot; Anything beyond 45 minutes eliminates the fresh, bright character that defines authentic marinara.
          </p>

          <h3>Long Simmering Creates Different Sauce</h3>

          <p>
            Cooking tomato sauce for 2-3 hours creates Sunday gravy or ragù—sauces with deep, caramelized, complex flavors. These are excellent sauces for specific applications. They are not marinara.
          </p>

          <p>
            Natural sugars caramelize extensively during long cooking. Acids break down (after 2 hours, acidity is almost imperceptible). The result is concentrated, rich, cooked tomato flavor—the opposite of fresh marinara&apos;s bright, tomato-forward character.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
            <p className="text-yellow-800 mb-0">
              <strong>Critical distinction:</strong> Marinara = fresh, bright, quick (30-45 min). Long-cooked sauce = deep, caramelized, complex (2-3 hours). Different sauces with different purposes. Don&apos;t confuse them.
            </p>
          </div>

          <h2 id="method">Step-by-Step Professional Method</h2>

          <h3>Step 1: Prepare the Tomatoes (2 Minutes)</h3>

          <p>
            Open the can of whole tomatoes. Pour tomatoes into a bowl—reserve the juice. Using your hands, crush each tomato gently—break them into roughly 1-inch pieces. Don&apos;t purée, don&apos;t blend. The goal is chunky texture with some liquid, not smooth paste.
          </p>

          <p>
            Hand-crushing preserves texture better than food mills and takes 90 seconds. You control the final consistency completely.
          </p>

          <h3>Step 2: Toast the Garlic (2-3 Minutes)</h3>

          <p>
            Heat a wide, heavy-bottomed pan (12-inch sauté pan or skillet) over medium heat. Wide surface area means faster evaporation and better reduction—a narrow pot takes 60+ minutes to reduce properly; a wide pan takes 30-40 minutes.
          </p>

          <p>
            Add 3 tablespoons extra-virgin olive oil. Wait 30 seconds for the oil to shimmer—you want hot but not smoking. Add sliced garlic. Stir constantly. The garlic should sizzle gently and turn light golden around the edges—not brown, not crispy, just barely colored.
          </p>

          <p>
            This step takes 2-3 minutes total. If garlic browns in under 2 minutes, your heat is too high. If it hasn&apos;t colored after 4 minutes, your heat is too low. The smell tells you when it&apos;s ready—when the raw garlic smell turns sweet and nutty, move immediately to the next step.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-6">
            <p className="text-red-800 mb-0 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <strong>Critical:</strong> If garlic burns, the entire sauce becomes bitter. Start over. Burnt garlic cannot be fixed.
            </p>
          </div>

          <h3>Step 3: Add Tomatoes and Salt (30 Seconds)</h3>

          <p>
            Add the crushed tomatoes and reserved juice all at once. The cold tomatoes will drop the pan temperature immediately—this is intentional and prevents garlic from burning. Add 1 teaspoon kosher salt. Stir to combine.
          </p>

          <p>
            The sauce will look watery and pale. This is correct. Add tomatoes quickly after garlic reaches the right color. Hesitate for 30 seconds and the garlic burns.
          </p>

          <h3>Step 4: Simmer and Reduce (30-40 Minutes)</h3>

          <p>
            Increase heat to medium-high. Bring the sauce to a strong simmer—you want bubbles breaking the surface consistently but not a rolling boil. Once simmering, reduce heat to medium-low. The sauce should maintain a gentle simmer with occasional bubbles.
          </p>

          <p>
            Simmer uncovered for 30-40 minutes, stirring every 5-7 minutes. The sauce will gradually thicken as water evaporates. You&apos;ll see the color deepen from pale orange-red to deep red. The texture will change from watery to coating-consistency.
          </p>

          <p>
            Professional standard: 35 minutes. The sauce should be thick enough to coat a spoon but still pourable—not pasty, not watery. If your sauce is too thick at 35 minutes, your heat was too high. If it&apos;s still watery, your heat was too low or your pan was too narrow.
          </p>

          <BlogNewsletterCTA slug="how-to-make-marinara-sauce" />

          <h3>Step 5: Add Basil and Finish (3-4 Minutes)</h3>

          <p>
            After 30-40 minutes, turn off the heat. Tear 8-10 fresh basil leaves by hand directly into the sauce. Don&apos;t chop them with a knife—tearing releases aromatics better and doesn&apos;t bruise the leaves the way cutting does.
          </p>

          <p>
            Stir the basil into the sauce. Let it sit for 2-3 minutes off heat. The residual heat wilts the basil and releases its fragrance without cooking it to bitterness.
          </p>

          <p>
            Taste the sauce. Adjust salt if needed—start with ¼ teaspoon additions, stir, taste again. The sauce is finished. Use immediately over pasta, on pizza, or as a base for other dishes. Or cool completely and refrigerate for up to 5 days. Flavor actually improves after 24 hours as the garlic mellows and tomato flavor deepens.
          </p>

          <h2 id="mistakes">Common Mistakes to Avoid</h2>

          <h3>Cooking the Sauce Too Long</h3>

          <p>
            <strong>The problem:</strong> Simmering for 2-3 hours thinking &quot;longer = better.&quot; Overcooking kills the bright tomato flavor, leaving dull, flat sauce.
          </p>

          <p>
            <strong>Why it happens:</strong> Many recipes use fresh tomatoes that need long cooking to break down. Canned tomatoes are already cooked during canning—they need 30-45 minutes to marry with aromatics, not 3 hours.
          </p>

          <p>
            <strong>The fix:</strong> Set a timer. 35 minutes from the moment the sauce starts simmering. When the timer goes off, turn off the heat. The sauce is done even if your instinct says it needs more time.
          </p>

          <h3>Adding Sugar</h3>

          <p>
            <strong>The problem:</strong> Adding sugar to &quot;balance acidity.&quot; Italian chefs never add sugar to authentic marinara.
          </p>

          <p>
            <strong>Why it&apos;s wrong:</strong> Quality San Marzano tomatoes have natural sweetness. If your sauce tastes too acidic, you&apos;re using inferior tomatoes. Sugar masks problems instead of solving them, creating one-dimensional sweetness that covers harsh acidity.
          </p>

          <p>
            <strong>The fix:</strong> Buy better tomatoes. San Marzano DOP tomatoes from Italy are naturally sweet with low acidity. Domestic alternatives like Cento or Muir Glen also work. Avoid generic store-brand tomatoes—they&apos;re picked under-ripe and taste harsh no matter how much you cook them.
          </p>

          <h3>Burning the Garlic</h3>

          <p>
            <strong>The problem:</strong> Garlic turns dark brown before tomatoes are added, creating acrid, bitter taste that permeates the entire sauce.
          </p>

          <p>
            <strong>Why it happens:</strong> Heat too high, distraction, or delayed tomato addition.
          </p>

          <p>
            <strong>The fix:</strong> Use medium-low heat. Watch the garlic constantly. Add tomatoes the moment garlic becomes aromatic and light golden. If garlic burns, discard everything and start over—burnt garlic cannot be fixed.
          </p>

          <h3>Blending the Sauce Until Smooth</h3>

          <p>
            <strong>The problem:</strong> Smooth marinara looks refined but tastes flat and has pasty consistency.
          </p>

          <p>
            <strong>Why texture matters:</strong> Authentic marinara is chunky. You see and taste individual pieces of tomato. The texture variation adds interest—thick parts, thin parts, pieces of softened garlic, torn basil leaves.
          </p>

          <p>
            <strong>What blending does:</strong> Homogenizes texture and releases pectin from tomato cells, creating thick, pasty consistency. The sauce becomes harder to portion and doesn&apos;t cling to pasta as well.
          </p>

          <p>
            <strong>The fix:</strong> Leave the sauce chunky. If you must have smoother texture, use a potato masher or the back of a wooden spoon to break down some tomato pieces while leaving others intact. Never use a blender or immersion blender.
          </p>

          <h2 id="equipment">The Equipment That Actually Matters</h2>

          <h3>A Wide, Heavy-Bottomed Pan</h3>

          <p>
            Use a 10-12 inch sauté pan or straight-sided skillet. Wide surface area maximizes evaporation—more surface area means faster reduction. A narrow 3-quart saucepan would take 60+ minutes to reduce properly. A 12-inch pan takes 35 minutes.
          </p>

          <p>
            Heavy bottom distributes heat evenly. Thin pans create hot spots where tomatoes scorch before the rest of the sauce reduces. Stainless steel or enameled cast iron provides better temperature control than plain cast iron (which retains too much heat).
          </p>

          <h3>A Sharp Knife for Garlic Slicing</h3>

          <p>
            Garlic sliced with a dull knife crushes the cloves, releasing harsh compounds that taste bitter. Garlic sliced with a sharp knife makes clean cuts that preserve milder flavor. Professional kitchens sharpen station knives regularly because dull knives ruin prep ingredients.
          </p>

          <h3>A Wooden Spoon for Stirring</h3>

          <p>
            Metal spoons scrape and scratch pan surfaces, damaging non-stick coatings and seasoned cast iron. Wooden spoons are gentle on all pan surfaces and don&apos;t conduct heat—you can leave them in the sauce while it cooks without burning your hand when you grab the handle.
          </p>

          <h2>Why This Recipe Works Consistently</h2>

          <p>
            Consistent results come from consistent methods. This marinara recipe works because:
          </p>

          <p>
            <strong>The ingredient list is minimal.</strong> Five ingredients mean five chances for error, not twenty. Each ingredient has a specific job—tomatoes provide flavor and body, olive oil carries aromatics, garlic adds savory depth, salt enhances everything, basil adds brightness. Remove any ingredient and the sauce suffers.
          </p>

          <p>
            <strong>The timing is precise.</strong> Thirty-five minutes of simmering isn&apos;t arbitrary—it&apos;s the point where water evaporates sufficiently without over-cooking the tomatoes. Go shorter and the sauce is watery. Go longer and the fresh tomato flavor fades.
          </p>

          <p>
            <strong>The technique is simple.</strong> Toast garlic, add tomatoes, simmer, add basil. No complex reduction schedules, no multiple additions, no finicky temperature adjustments. The simplicity means the method works whether you&apos;re making marinara for the first time or the thousandth time.
          </p>

          <p>
            Professional kitchens rely on marinara because it doesn&apos;t require constant attention—just the right ingredients, the right pan, and the discipline to stop at 35 minutes instead of continuing for &quot;just 10 more minutes.&quot; That consistency is what separates restaurant marinara from home marinara: following the method exactly, trusting the timing, and resisting the urge to add sugar or cook longer or blend until smooth.
          </p>

        </div>

        <div id="faq">
          <BlogFAQ questions={marinaraData.faq.questions} />
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CTAVisibilityTracker
              ctaId="marinara-related-mirepoix"
              position="final_cta"
              productSlug="how-to-make-marinara-sauce"
              merchant="internal"
            >
              <Link href="/blog/what-is-mirepoix" className="text-orange-700 hover:text-orange-800 font-semibold">
                → What is Mirepoix and Why Chefs Use It
              </Link>
            </CTAVisibilityTracker>
            <CTAVisibilityTracker
              ctaId="marinara-related-stock"
              position="final_cta"
              productSlug="how-to-make-marinara-sauce"
              merchant="internal"
            >
              <Link href="/blog/making-stock-professional-chef-method" className="text-orange-700 hover:text-orange-800 font-semibold">
                → Making Stock: The Professional Method
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
