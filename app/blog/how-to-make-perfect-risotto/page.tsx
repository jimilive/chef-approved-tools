import Link from 'next/link';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import { generateBlogMetadata } from '@/lib/metadata-helpers';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, AlertTriangle, Lightbulb } from 'lucide-react';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogHero from '@/components/blog/BlogHero';
import BlogEmailCapture from '@/components/blog/BlogEmailCapture';
import AuthorBio from '@/components/review/AuthorBio';

export const metadata = generateBlogMetadata('how-to-make-perfect-risotto');

const articleMeta = {
  author: "Scott Bradley",
  publishDate: "2025-09-30",
  lastModified: "2025-10-24",
  category: "Cooking Techniques",
  readTime: "11 min read",
};

const articleSchema = generateArticleSchema({
  headline: "Perfect Risotto: Italian Restaurant Technique Explained",
  description: "Master risotto from a professional chef with 24 years of restaurant experience. Learn proper technique, timing, stock selection, and the science behind perfectly creamy rice without cream.",
  datePublished: articleMeta.publishDate,
  dateModified: articleMeta.lastModified,
  authorName: articleMeta.author,
  imageUrl: "https://www.chefapprovedtools.com/images/blog/perfect-risotto-guide.jpg",
  urlPrefix: 'blog',
  urlSuffix: 'how-to-make-perfect-risotto'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Perfect Risotto: Italian Restaurant Technique Explained", url: "https://www.chefapprovedtools.com/blog/how-to-make-perfect-risotto" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "Can I make risotto ahead of time?",
    answer: "Not really—risotto is best fresh. You can parcook it to 80% done, spread on a sheet pan, then finish later (restaurant technique). But it's never quite as good as fresh."
  },
  {
    question: "Do I really need to use hot stock?",
    answer: "Yes. Cold stock shocks the rice, stops the cooking process, and creates uneven texture. Keep stock at a steady simmer throughout cooking."
  },
  {
    question: "How do I know when risotto is done?",
    answer: "Taste it. Rice should have slight resistance when you bite (al dente), but not be crunchy. The texture should be creamy and flow slowly on the plate."
  }
]);

// CACHE-BUSTING: Prevent Next.js from serving stale HTML
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'


export default function PerfectRisottoPage() {
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

      <BlogLayout breadcrumbTitle="Perfect Risotto: Italian Restaurant Technique Explained">
        <BlogHero
          title="Perfect Risotto: Italian Restaurant Technique Explained"
          introduction={["Master risotto from a professional chef with 24 years of restaurant experience. Learn proper technique, timing, stock selection, and the science behind perfectly creamy rice without cream."]}
          publishedDate="2025-09-30"
          lastUpdated="2025-10-24"
          readTime="11 min read"
        />

        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6 rounded-xl border-l-4 border-blue-500 my-8 shadow-lg">
            <p className="font-bold text-lg mb-3 flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              Restaurant Reality
            </p>
            <p className="leading-relaxed mb-0">
              At Feierabend in Seattle, we had mushroom risotto on the menu nightly. I&apos;d watch new cooks try to rush it, adding all the stock at once or stirring frantically like their life depended on it. The result? Gummy, sticky rice that looked like porridge. Risotto isn&apos;t difficult, but it requires understanding what&apos;s happening at a chemical level and respecting the timing. The secret to creamy risotto isn&apos;t cream—it&apos;s starch release controlled through gradual hydration and gentle agitation. Today I&apos;m going to show you the exact technique that creates restaurant-quality risotto every single time.
            </p>
          </div>
          <p>
            Risotto intimidates home cooks more than it should. There&apos;s this mythology around it—constant stirring for 45 minutes, mysterious techniques, special skills only Italian grandmothers possess. Food TV hasn&apos;t helped, making it seem like you need to stir non-stop or the rice police will arrest you.
          </p>

          <p>
            <strong>Here&apos;s the truth: Risotto is rice cooked in a specific way to maximize starch release.</strong> That&apos;s it. You&apos;re not performing surgery. You&apos;re extracting starch from rice grains through controlled hydration, then using that starch to create creaminess. Once you understand the science, risotto becomes straightforward and predictable.
          </p>

          <h2>What Makes Risotto Different from Regular Rice</h2>

          <h3>The Rice: High-Amylopectin Starches</h3>

          <p><strong>Risotto rice</strong> (Arborio, Carnaroli, Vialone Nano):</p>
          <ul>
            <li>High amylopectin starch content</li>
            <li>Large, round grains</li>
            <li>Firm outer layer</li>
            <li>Releases starch gradually when stirred</li>
          </ul>

          <p><strong>Regular rice</strong> (long-grain, jasmine, basmati):</p>
          <ul>
            <li>Higher amylose content</li>
            <li>Stays separated and fluffy</li>
            <li>Doesn&apos;t release starch the same way</li>
            <li><strong>Cannot make proper risotto</strong></li>
          </ul>

          <p><strong>Why it matters</strong>: Amylopectin creates the creamy texture. When rice grains are agitated in liquid, the outer layers break down and release starch into the cooking liquid. This starch suspension is what makes risotto creamy without adding cream.</p>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Common Misconception
            </p>
            <p className="mb-0 text-amber-900">
              You don&apos;t need to stir risotto constantly for 30 minutes straight. That&apos;s exhausting and unnecessary. You need to stir frequently enough to release starch and prevent sticking—about every 30-45 seconds. Save your arm and your sanity.
            </p>
          </div>

          <h2>The Four Essential Components</h2>

          <h3>1. The Right Rice</h3>

          <p><strong>Best choice: Carnaroli</strong></p>
          <ul>
            <li>Highest starch content</li>
            <li>Most forgiving (harder to overcook)</li>
            <li>Best texture</li>
            <li>More expensive but worth it</li>
          </ul>

          <p><strong>Good choice: Arborio</strong></p>
          <ul>
            <li>Widely available</li>
            <li>High starch content</li>
            <li>Slightly easier to overcook than Carnaroli</li>
            <li>More affordable</li>
            <li><strong>This is what most restaurants use</strong></li>
          </ul>

          <p><strong>How much</strong>: 1/3 to 1/2 cup uncooked rice per person (as a main course)</p>

          <h3>2. Proper Stock</h3>

          <p><strong>Stock quality matters</strong> because rice absorbs 2-3 times its volume in liquid. Bad stock = bad risotto.</p>

          <p><strong>Best</strong>: Homemade stock with good body (gelatin creates extra creaminess)</p>

          <p><strong>Good</strong>: High-quality boxed stock (Pacific, Imagine brands)</p>

          <p><strong>How much</strong>: 6-7 cups stock for 2 cups rice (keep extra hot on the stove)</p>

          <p><strong>Critical</strong>: Stock must be HOT when added. Cold stock shocks the rice and stops cooking, creating uneven texture.</p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-600" />
              Scott&apos;s Professional Tip
            </p>
            <p className="mb-0 text-emerald-900">
              In restaurants, we&apos;d have stock simmering on the back burner specifically for risotto. At home, I heat my stock in the microwave in a large measuring cup, then transfer to a saucepan on low heat. Much faster than heating it on the stove from scratch, and you can see how much stock you&apos;ve used.
            </p>
          </div>

          <h2>The Step-by-Step Method (Master Recipe)</h2>

          <p><strong>Yield</strong>: 4 servings as main course, 6-8 as side<br />
          <strong>Time</strong>: 30-35 minutes active cooking</p>

          <h3>Ingredients:</h3>
          <ul>
            <li>2 cups Arborio or Carnaroli rice</li>
            <li>6-7 cups chicken or vegetable stock (hot)</li>
            <li>1 medium onion or 2 shallots, finely diced</li>
            <li>4 tablespoons butter, divided (2 for cooking, 2 for finishing)</li>
            <li>2 tablespoons olive oil</li>
            <li>1/2 cup dry white wine (optional but recommended)</li>
            <li>1 cup Parmigiano-Reggiano, freshly grated</li>
            <li>Salt and black pepper to taste</li>
          </ul>

          <h3>Step 1: Heat Stock (5 Minutes)</h3>

          <p>Bring stock to a simmer in a saucepan and <strong>keep it hot</strong> throughout cooking. This is critical—cold stock stops the cooking process.</p>

          <h3>Step 2: Soffritto (5 Minutes)</h3>

          <ol>
            <li>Heat 2 tbsp butter and 2 tbsp olive oil in wide, heavy-bottomed pan over medium heat</li>
            <li>Add diced onion/shallot</li>
            <li>Cook until translucent and soft (5 minutes)</li>
            <li><strong>Do not brown</strong>—browned onions create wrong flavor profile</li>
            <li>Season lightly with salt</li>
          </ol>

          <p><strong>Pan choice matters</strong>: Wide pan (12&quot; sauté pan or similar) provides surface area for even cooking and easier stirring. Too small = cramped and uneven.</p>

          <h3>Step 3: Toast Rice (2-3 Minutes)</h3>

          <ol>
            <li>Add rice to soffritto</li>
            <li>Stir to coat every grain with fat</li>
            <li>Cook 2-3 minutes, stirring constantly</li>
            <li>Rice should turn slightly translucent at edges (called &quot;pearling&quot;)</li>
            <li><strong>Do not let rice brown</strong>—just coat and heat through</li>
          </ol>

          <p><strong>Why this matters</strong>: Toasting creates a barrier that helps rice cook evenly and maintain texture. Skipping this step creates mushy risotto.</p>

          <h3>Step 5: First Stock Addition (3-4 Minutes)</h3>

          <ol>
            <li>Add 1 cup hot stock</li>
            <li>Stir frequently (every 30-45 seconds)</li>
            <li>Keep at steady simmer—not rolling boil, not barely bubbling</li>
            <li>When stock is mostly absorbed (pan looks almost dry), add next addition</li>
          </ol>

          <p><strong>The absorption test</strong>: Drag wooden spoon across pan bottom. If pan bottom stays visible for 1-2 seconds, ready for next addition.</p>

          <h3>Step 6: Continue Adding Stock (12-15 Minutes)</h3>

          <ol>
            <li>Add stock 1/2 to 1 cup at a time</li>
            <li>Stir every 30-45 seconds (not constant, but frequent)</li>
            <li>Wait until mostly absorbed before next addition</li>
            <li>After 15 minutes, start tasting rice</li>
            <li>Goal: Al dente (slight resistance in center) with loose, creamy texture</li>
          </ol>

          <p><strong>The timing</strong>: You&apos;ll probably add 5-6 ladles of stock total. The process takes 18-22 minutes from first stock to done.</p>

          <h3>Step 7: Final Enrichment - Mantecatura (2 Minutes)</h3>

          <p>When rice is just al dente and mixture is slightly loose:</p>

          <ol>
            <li><strong>Remove from heat</strong></li>
            <li>Add 2 tbsp cold butter (cubed)</li>
            <li>Add 1 cup Parmigiano-Reggiano</li>
            <li><strong>Beat vigorously</strong> with wooden spoon for 30-60 seconds</li>
            <li>Mixture should become creamy and glossy</li>
            <li>Taste and adjust salt/pepper</li>
          </ol>

          <p><strong>This step is critical</strong>: The vigorous stirring emulsifies butter and cheese into the starch, creating final creaminess. Don&apos;t be gentle—beat it like you mean it.</p>

          <p><strong>Texture check</strong>: Risotto should flow slowly when you tilt the pan. &quot;All&apos;onda&quot; (wave-like) is the Italian term. If too thick, add splash more stock.</p>

          <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 rounded-xl text-center my-8">
            <h3 className="text-2xl font-bold mb-4 text-white">Want My Complete Italian Cooking Master Class?</h3>
            <p className="text-blue-100 mb-6 text-lg">
              Join 15,000+ home cooks getting my free weekly newsletter with professional techniques, equipment recommendations, and exclusive recipes you won&apos;t find on the blog.
            </p>
            <CTAVisibilityTracker
              ctaId="risotto-newsletter-cta"
              position="mid_article"
              productSlug="how-to-make-perfect-risotto"
              merchant="internal"
            >
              <Link
                href="/newsletter"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-lg"
              >
                Get the Free Guide
              </Link>
            </CTAVisibilityTracker>
            <p className="text-blue-200 text-sm mt-4 mb-0">
              Includes: Risotto timing chart, stock preparation guide, and my restaurant mushroom risotto recipe
            </p>
          </div>

          <h2>Common Risotto Mistakes and Fixes</h2>

          <h3>Mistake #1: Not Enough Stock</h3>

          <p><strong>Problem</strong>: Rice is still hard but all stock is gone</p>

          <p><strong>Fix</strong>:</p>
          <ul>
            <li>Heat more stock immediately</li>
            <li>Continue adding and stirring</li>
            <li>Next time, keep extra stock hot just in case</li>
          </ul>

          <h3>Mistake #2: Overcooking (Mushy Rice)</h3>

          <p><strong>Problem</strong>: Rice grains have no structure, texture is like pudding</p>

          <p><strong>Fix</strong>: Can&apos;t fix overcooked rice, but you can repurpose—make arancini (fried rice balls)</p>

          <p><strong>Prevention</strong>: Start tasting at 15 minutes, pull off heat while rice still has slight resistance</p>

          <h3>Mistake #3: Cold Stock</h3>

          <p><strong>Problem</strong>: Rice stops cooking between additions, creates uneven texture</p>

          <p><strong>Fix</strong>: Heat remaining stock before adding</p>

          <p><strong>Prevention</strong>: Keep stock at steady simmer throughout entire cooking process</p>

          <h2>Frequently Asked Questions</h2>

          <div className="bg-slate-50 p-6 rounded-lg my-8">
            <h4 className="font-bold text-lg mb-3">Q: Can I make risotto ahead of time?</h4>
            <p className="mb-6">A: Not really—risotto is best fresh. You can parcook it to 80% done, spread on a sheet pan to stop cooking, then finish later (restaurant technique). Add stock and reheat over medium heat, finish with butter and cheese. But it&apos;s never quite as good as fresh.</p>

            <h4 className="font-bold text-lg mb-3">Q: Do I really need to use hot stock?</h4>
            <p className="mb-6">A: Yes. Cold stock shocks the rice, stops the cooking process, and creates uneven texture. Keep stock at a steady simmer throughout.</p>

            <h4 className="font-bold text-lg mb-3">Q: Can I use brown rice or wild rice?</h4>
            <p className="mb-6">A: No. Brown rice and wild rice don&apos;t have the right starch content and won&apos;t create creamy texture. Stick with Arborio or Carnaroli.</p>

            <h4 className="font-bold text-lg mb-3">Q: Why did my risotto turn out gluey?</h4>
            <p className="mb-6">A: Over-stirring breaks rice grains and releases too much starch. Stir frequently but not constantly—every 30-45 seconds is sufficient.</p>

            <h4 className="font-bold text-lg mb-3">Q: How do I know when risotto is done?</h4>
            <p className="mb-0">A: Taste it. Rice should have slight resistance when you bite (al dente), but not be crunchy or hard. The texture should be creamy and flow slowly on the plate.</p>
          </div>

          <h2>The Bottom Line: Technique Over Mystique</h2>

          <p>
            After making thousands of portions of risotto in restaurants, here&apos;s what I want home cooks to understand:
          </p>

          <p>
            <strong>Risotto isn&apos;t mysterious—it&apos;s a straightforward technique that requires attention and proper timing.</strong>
          </p>

          <p>
            The mythology around risotto intimidates people unnecessarily. Yes, you need to stir frequently. Yes, you need to add stock gradually. Yes, timing matters. But these aren&apos;t arcane secrets—they&apos;re basic cooking technique that anyone can learn.
          </p>

          <p>The keys to perfect risotto:</p>

          <ol>
            <li><strong>Use proper rice</strong> (Arborio or Carnaroli)</li>
            <li><strong>Keep stock hot</strong> (critical for even cooking)</li>
            <li><strong>Add liquid gradually</strong> (controls starch concentration)</li>
            <li><strong>Stir frequently, not constantly</strong> (release starch without breaking grains)</li>
            <li><strong>Finish with butter and cheese</strong> (mantecatura creates final creaminess)</li>
            <li><strong>Serve immediately</strong> (risotto waits for no one)</li>
          </ol>

          <p>
            Master basic risotto, then experiment with variations. Once you understand the technique, you can make risotto with anything—vegetables, seafood, mushrooms, whatever sounds good.
          </p>

          <p>
            Stop being intimidated and start making risotto. It&apos;s easier than you think and infinitely better than you imagine.
          </p>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/stock-vs-broth-vs-bouillon" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Stock vs Broth vs Bouillon: What&apos;s the Difference?
            </Link>
            <Link href="/blog/understanding-acids-cooking" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Understanding Acids in Cooking
            </Link>
            <Link href="/blog/fat-is-flavor" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Fat is Flavor: The Science Behind Richness
            </Link>
            <Link href="/reviews/cuisinart-8-inch-nonstick-pan" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Cuisinart 12&quot; Stainless Steel Sauté Pan Review
            </Link>
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  );
}
