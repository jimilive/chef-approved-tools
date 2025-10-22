import Link from 'next/link';
import { Metadata } from 'next';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, Thermometer, AlertTriangle, Clock, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: "Making Stock: Professional Chef Method – How to Build Flavor | Chef Scott Bradley",
  description: "Professional chef Scott Bradley explains the real restaurant method for making stock. Build deep flavor with bones, vegetables, and proper simmering technique.",
  keywords: ["how to make stock", "chicken stock recipe", "restaurant stock method", "stock vs broth", "building flavor in stock", "homemade stock"],
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/blog/making-stock-professional-chef-method'
  }
};

const articleSchema = generateArticleSchema({
  headline: "Making Stock: Professional Chef Method – How to Build Flavor",
  description: "Professional chef Scott Bradley explains the real restaurant method for making stock. Build deep flavor with bones, vegetables, and proper simmering technique.",
  datePublished: "2025-10-22",
  dateModified: "2025-10-22",
  authorName: "Scott Bradley",
  imageUrl: "https://www.chefapprovedtools.com/images/making-stock-og.jpg"
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Making Stock: Professional Chef Method", url: "https://www.chefapprovedtools.com/blog/making-stock-professional-chef-method" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "What's the difference between stock and broth?",
    answer: "Stock uses bones for collagen and body, creating a rich liquid that gels when chilled. Broth uses meat for flavor but lacks the body and gelatin that stock provides. Stock is the foundation for sauces and reductions; broth is more commonly used as a soup base or consumed on its own."
  },
  {
    question: "Can you reuse bones for a second batch of stock?",
    answer: "Yes, once. This second batch is called 'remouillage' in professional kitchens and yields a lighter stock perfect for soups or cooking grains. The bones won't have as much flavor or collagen left, but you're still extracting value. Don't attempt a third batch—there's nothing left at that point."
  },
  {
    question: "How long does homemade stock last?",
    answer: "Five days refrigerated in a sealed container, or six months frozen. For longer refrigerator storage, bring the stock to a boil every 3-4 days to kill bacteria, then cool and refrigerate again. Freeze in portion sizes you'll actually use—ice cube trays for small amounts, quart containers for soups and sauces."
  },
  {
    question: "Why does my stock gel solid in the refrigerator?",
    answer: "That's perfect—it means you extracted plenty of collagen from the bones, which converts to gelatin when cooled. This body and richness is exactly what you want. When reheated, it will return to liquid form. Gelatinous stock creates silky sauces and adds body to soups."
  },
  {
    question: "Should I roast bones before making stock?",
    answer: "For brown stocks (beef, lamb, veal), yes—roasting caramelizes proteins and creates deep, complex flavor through the Maillard reaction. For white stocks (chicken, turkey, fish), no—you want a lighter, cleaner flavor. Roast bones at 400°F for 45-60 minutes until deeply browned but not burnt."
  },
  {
    question: "Why shouldn't I add salt to stock while it's cooking?",
    answer: "Stock reduces as it simmers, concentrating flavors including salt. If you salt during cooking and later reduce the stock for a sauce, it can become inedibly salty. Always season stock when you use it, not when you make it. This gives you complete control over the final dish."
  },
  {
    question: "What bones make the best stock?",
    answer: "Joints and bones with connective tissue produce the most collagen: chicken backs, necks, and feet; beef knuckles and joints; pork trotters. Mix meaty bones with collagen-rich bones for both flavor and body. Avoid bones with too much marrow unless you want a very rich, fatty stock."
  },
  {
    question: "How do I clarify cloudy stock?",
    answer: "Use an egg white raft: whisk egg whites with cold stock, add to simmering cloudy stock, and let it form a floating 'raft' that captures impurities. After 20-30 minutes, carefully ladle stock from beneath the raft through cheesecloth. This professional technique creates crystal-clear consommé."
  }
]);

export default function MakingStockPage() {
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
            <ChefHat className="w-5 h-5" />
            <span className="text-sm font-medium">Cooking Techniques</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Making Stock: Professional Chef Method – How to Build Flavor
          </h1>
          <p className="text-xl text-slate-600">
            Professional chef Scott Bradley explains the real restaurant method for making stock. Build deep flavor with bones, vegetables, and proper simmering technique.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
            <span>By Chef Scott Bradley</span>
            <span>•</span>
            <span>October 22, 2025</span>
            <span>•</span>
            <span>10 min read</span>
          </div>
        </header>

        <div className="prose prose-lg prose-slate max-w-none">
          <p>
            I learned to make stock in culinary school long before I learned to make money. We&apos;d start each morning with bones, vegetables, and 20-gallon steam kettles that simmered all day. That aroma of roasted bones and bay leaf—it&apos;s the foundation of every great kitchen.
          </p>

          <p>
            At Mellow Mushroom, I reduced gallons of stock every week into sauces, soups, and risottos. Stock is flavor currency. If your food tastes flat, it&apos;s usually because your base is weak.
          </p>

          <p>
            By the end of this guide, you&apos;ll know the exact restaurant process for rich, clear stock you can build any dish on.
          </p>

          <h2 className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            The Problem: Why Home Stocks Fall Flat
          </h2>

          <p>
            Most home cooks boil instead of simmer. Boiling emulsifies fat and proteins into the liquid, creating a cloudy, greasy result. The goal isn&apos;t speed—it&apos;s extraction.
          </p>

          <p>
            Great stock takes time. Proteins, collagen, and aromatics need slow heat to release flavor without agitation. Rush the process and you get murky liquid that tastes more like dishwater than the foundation of French cuisine.
          </p>

          <p>
            Walk into any professional kitchen during prep and you&apos;ll see stockpots barely bubbling on back burners. They&apos;re not forgotten—they&apos;re being treated with the respect they deserve. Low, slow, steady heat extracts maximum flavor while maintaining clarity.
          </p>

          <p>
            Professionals treat stock like an investment—one pot yields dozens of meals. Once you&apos;ve made your own, you&apos;ll never touch boxed broth again. The difference isn&apos;t subtle. It&apos;s the difference between a sauce that coats the spoon and one that slides off like water.
          </p>

          <h2>Why Stock Matters More Than You Think</h2>

          <p>
            Stock is invisible in the final dish, but it&apos;s doing most of the work. A risotto made with good stock needs minimal seasoning. Soup built on weak stock requires excessive salt and herbs to compensate for missing depth.
          </p>

          <p>
            The collagen extracted from bones creates body—that silky mouthfeel in a pan sauce or the way soup coats your spoon. You can&apos;t fake this with cornstarch or butter. It comes from time and bones, period.
          </p>

          <p>
            In culinary school, we were taught that stock is one of the fundamental building blocks of cooking. Mess up your stock and everything built on it suffers. Master your stock and suddenly your food has that intangible &quot;restaurant quality&quot; people can taste but can&apos;t identify.
          </p>

          <h2 className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-600" />
            The Professional Method: Step-by-Step
          </h2>

          <h3>1. Start with Cold Water</h3>

          <p>
            Add bones to a stockpot and cover with cold water by about 2 inches. Heat gently over medium-low—cold water extracts albumin (blood proteins) as it slowly warms, and these proteins rise as foam you can skim off.
          </p>

          <p>
            If you start with hot water, proteins coagulate immediately and cloud the stock before you can remove them. Cold water gives you control over clarity from the beginning.
          </p>

          <p>
            Use filtered water if your tap water has strong mineral flavors or chlorine—these will carry through to the finished stock. Quality matters at every step.
          </p>

          <h3>2. Skim Religiously</h3>

          <p>
            As foam forms during the first 30-45 minutes, skim with a ladle every few minutes. Clean stock equals clean flavor. This gray-brown foam is coagulated proteins and impurities from the bones—you don&apos;t want them dissolved back into your stock.
          </p>

          <p>
            Keep a small bowl next to the pot for discarding foam. In professional kitchens, skimming is a repetitive task that separates beginners from cooks who understand technique. It&apos;s not glamorous, but it&apos;s essential.
          </p>

          <p>
            Once the foam stops forming and the surface looks relatively clear, you can reduce skimming frequency. But check periodically throughout the simmer—small amounts of foam may continue to appear.
          </p>

          <h3>3. Add Mirepoix at the Right Time</h3>

          <p>
            Onions, carrots, and celery go in once the stock is hot and skimmed—not from the start. Early addition gives bitterness as vegetables break down too much during the long simmer.
          </p>

          <p>
            <strong>Classic ratio: 2 parts onion, 1 part carrot, 1 part celery.</strong>
          </p>

          <p>
            For chicken stock, add mirepoix after 2-3 hours. For beef stock, add after 4-5 hours. This timing extracts vegetable flavor without bitterness or cloudiness from disintegrating vegetables.
          </p>

          <p>
            Don&apos;t bother peeling vegetables for stock—just wash them thoroughly. The peels add color and flavor. Cut into large chunks (2-3 inches)—they&apos;ll simmer for hours and small pieces turn to mush.
          </p>

          <p>
            Add aromatics in the last hour: bay leaves, black peppercorns, fresh thyme or parsley stems. These delicate flavors turn bitter with prolonged cooking, so timing matters.
          </p>

          <h3>4. Simmer Gently</h3>

          <p>
            Maintain barely a tremble—tiny bubbles every few seconds, not a rolling boil. The French call this <em>frémir</em> (to tremble). It&apos;s the perfect temperature for extraction without emulsification.
          </p>

          <p>
            <strong>Professional timing guidelines:</strong>
          </p>

          <ul>
            <li><strong>Chicken stock:</strong> 4–6 hours</li>
            <li><strong>Beef stock:</strong> 8–12 hours (sometimes 24 for demi-glace base)</li>
            <li><strong>Fish stock:</strong> 45 minutes to 1 hour maximum (longer turns bitter)</li>
            <li><strong>Vegetable stock:</strong> 1 hour tops (delicate flavors extract quickly)</li>
          </ul>

          <p>
            Longer isn&apos;t always better—fish and vegetable stocks turn bitter with extended cooking. Chicken and beef stocks, however, benefit from extended gentle extraction as collagen slowly converts to gelatin.
          </p>

          <p>
            Don&apos;t stir the stock once it&apos;s simmering. Agitation emulsifies fat into the liquid and disturbs the natural settlement of impurities. Let it sit undisturbed except for occasional skimming.
          </p>

          <h3>5. Strain and Chill Fast</h3>

          <p>
            Pour through a fine-mesh strainer lined with cheesecloth. Don&apos;t press the solids—let gravity do the work. Pressing forces cloudy particles through the filter and ruins clarity you worked hours to achieve.
          </p>

          <p>
            Cool quickly over an ice bath to drop temperature below 70°F within 2 hours (the USDA danger zone rule). Place your stock container in a larger vessel filled with ice water and stir occasionally to speed cooling.
          </p>

          <p>
            Once cooled, refrigerate immediately. Fat will solidify on top—skim this off before using the stock. That fat layer also acts as a seal, helping preserve the stock underneath.
          </p>

          <p>
            <strong>Pro tip:</strong> Never salt stock during cooking. Season when you use it, not before. Stock reduces in sauces, and pre-salted stock becomes inedibly salty when concentrated. This is one of the most important rules in professional kitchens.
          </p>

          <div className="bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-600" />
              Free Kitchen Foundations Guide
            </h3>
            <p className="mb-4">
              Get my &quot;Essential Flavor Bases&quot; PDF—stocks, sauces, and reductions straight from 24 years in professional kitchens.
            </p>
            <CTAVisibilityTracker
              ctaId="stock-newsletter-cta"
              position="mid_article"
              productSlug="making-stock-professional-chef-method"
              merchant="internal"
            >
              <Link
                href="/newsletter"
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded font-bold hover:bg-orange-700 transition-colors"
              >
                Get the Free Guide →
              </Link>
            </CTAVisibilityTracker>
          </div>

          <h2>Brown Stock vs White Stock</h2>

          <p>
            <strong>Brown stock</strong> starts with roasted bones and vegetables. Roasting at 400°F for 45-60 minutes caramelizes proteins and sugars through the Maillard reaction, creating deep, complex flavor and rich brown color. Use brown stock for beef dishes, demi-glace, and rich sauces.
          </p>

          <p>
            <strong>White stock</strong> uses raw bones and vegetables, producing lighter flavor and color. This is standard for chicken stock, fish stock, and dishes where you want clean, neutral base flavor without the roasted notes.
          </p>

          <p>
            The choice depends on your end use. Beef stew benefits from brown stock&apos;s depth. Chicken soup works better with white stock&apos;s cleaner taste. There&apos;s no right or wrong—just different tools for different applications.
          </p>

          <h2 className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            Common Mistakes (And How to Avoid Them)
          </h2>

          <h3>Mistake #1: Boiling Instead of Simmering</h3>

          <p>
            Boil = cloudy stock every time. Vigorous bubbling emulsifies fat into the liquid and breaks down solids into particles too small to strain out. Keep it to a gentle simmer—patience creates clarity.
          </p>

          <p>
            If you accidentally let it boil, don&apos;t panic. Reduce heat immediately and skim any foam that appears. The stock may be slightly cloudier than ideal, but it&apos;s not ruined. You can still clarify it later with egg whites if appearance matters for the dish.
          </p>

          <h3>Mistake #2: Overcrowding the Pot</h3>

          <p>
            Too many bones mean poor water circulation and uneven extraction. Bones should be covered by water but have room to release flavor. A good rule: fill the pot no more than two-thirds full with bones, then add water to cover.
          </p>

          <p>
            Better to make two batches than to crowd one pot. Professional kitchens run multiple stockpots simultaneously because we understand that proper bone-to-water ratio is non-negotiable.
          </p>

          <h3>Mistake #3: Skipping Roasting (for Brown Stocks)</h3>

          <p>
            Roasting bones and vegetables caramelizes sugars—your flavor foundation for brown stocks. Don&apos;t skip this step when making beef, lamb, or veal stock. The difference between roasted and raw bones is dramatic.
          </p>

          {/* <CTAVisibilityTracker
            ctaId="maillard-reaction-link"
            position="inline"
            productSlug="maillard-reaction-guide"
            merchant="internal"
          >
            <Link href="/blog/maillard-reaction-explained" className="text-orange-600 hover:text-orange-700 font-medium">
              Learn more about the Maillard reaction →
            </Link>
          </CTAVisibilityTracker> */}

          <p>
            Roast until deeply browned but not burnt—burnt bones create bitter stock. You want mahogany color with caramelized bits stuck to the roasting pan (deglaze that pan and add the liquid to your stock for extra flavor).
          </p>

          <h3>Mistake #4: Ignoring Cooling Safety</h3>

          <p>
            Warm stock sitting at room temperature is bacteria heaven. The USDA rule: cool to 70°F within 2 hours, then to 40°F within 4 additional hours. Use ice baths to speed cooling—don&apos;t just set the pot on the counter overnight.
          </p>

          <p>
            In professional kitchens, we use blast chillers or ice paddle wands to drop stock temperature quickly. At home, transfer hot stock to shallow containers (faster cooling) and nest them in ice water. Stir occasionally to distribute heat.
          </p>

          <h3>Mistake #5: Adding Starchy Vegetables</h3>

          <p>
            Potatoes, sweet potatoes, and other starchy vegetables cloud stock and add unwanted starch that changes texture. Stick to the classic mirepoix: onions, carrots, celery. These three vegetables are traditional for a reason—they build flavor without causing problems.
          </p>

          <h3>Mistake #6: Using Only One Type of Bone</h3>

          <p>
            Mix meaty bones (flavor) with collagen-rich bones (body). For chicken stock, use backs, necks, and a few feet. For beef stock, combine knuckles and joints with shanks. The combination creates both flavor and the gelatin that makes great stock distinctive.
          </p>

          <h2 className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-600" />
            Troubleshooting Guide
          </h2>

          <div className="bg-slate-50 p-6 rounded-lg my-6">
            <h3 className="mt-0">If stock is cloudy:</h3>
            <p className="mb-4">
              Heat was too high, you stirred too much, or you didn&apos;t skim enough. Strain through cheesecloth to improve clarity. For crystal-clear stock, clarify with egg whites: whisk egg whites with cold stock, add to simmering cloudy stock, and let the egg white &quot;raft&quot; capture impurities. After 20-30 minutes, carefully ladle stock from beneath the raft through cheesecloth.
            </p>

            <h3>If flavor is weak:</h3>
            <p className="mb-4">
              Not enough bones, too much water, or insufficient simmer time. The ratio should be roughly 50-60% bones by volume. If the stock tastes thin, return it to the stove and reduce by 30-50% to concentrate flavors. This is how professionals create demi-glace from basic stock.
            </p>

            <h3>If it gels solid in the fridge:</h3>
            <p className="mb-4">
              Perfect—that&apos;s collagen doing its job. This gelatin creates body and silky texture in sauces. When reheated, it will return to liquid form. This is actually the sign of excellent stock with proper collagen extraction. Commercial broths rarely gel because they lack sufficient bone content.
            </p>

            <h3>If stock tastes bitter:</h3>
            <p className="mb-4">
              Vegetables cooked too long, aromatics added too early, or (in fish stock) the stock simmered past 45-60 minutes. Fish and vegetable stocks turn bitter with extended cooking. Next time, reduce simmer time and add delicate aromatics in the final hour only.
            </p>

            <h3>If stock is too fatty:</h3>
            <p className="mb-0">
              Refrigerate and skim the solid fat layer before using. For immediate use, drag a paper towel across the surface to absorb fat. You can also strain warm (not hot) stock through cheesecloth—some fat will be trapped in the cloth fibers.
            </p>
          </div>

          <h2>Equipment That Helps</h2>

          <p>You don&apos;t need fancy equipment, but these tools make the process easier:</p>

          <ul>
            <li><strong>Large Stockpot (16+ quarts):</strong> Heavy base prevents scorching during long simmers. Stainless steel or enameled cast iron work best—no aluminum, which can react with acids and affect flavor.</li>
            <li><strong>Fine Mesh Strainer:</strong> Catches small particles that cheesecloth alone misses. Professional kitchens use china caps (conical strainers) for this purpose.</li>
            <li><strong>Ladle &amp; Skimmer:</strong> Essential for clarity. A wide, shallow skimmer removes foam efficiently. A ladle with a pouring spout helps transfer stock without disturbing sediment.</li>
            <li><strong>Cheesecloth:</strong> Multiple layers create ultra-fine filtration. Buy it in bulk—you&apos;ll go through it quickly once you start making stock regularly.</li>
            <li><strong>Container Set:</strong> Label and freeze portions in sizes you&apos;ll actually use. Ice cube trays for small amounts (2 tablespoons each), quart containers for soups, gallon bags for large batches.</li>
          </ul>

          <h2>How to Store Stock Like a Professional</h2>

          <p>
            <strong>Refrigerator:</strong> 5 days in sealed containers. The fat cap helps preserve the stock underneath—skim it only when you&apos;re ready to use the stock.
          </p>

          <p>
            <strong>Freezer:</strong> 6 months in freezer-safe containers or bags. Remove as much air as possible to prevent freezer burn. Freeze flat in gallon bags for efficient storage and quick thawing.
          </p>

          <p>
            <strong>Ice cube portions:</strong> Freeze stock in ice cube trays, then transfer cubes to freezer bags. Each cube is roughly 2 tablespoons—perfect for adding to pan sauces or deglazing without thawing an entire quart.
          </p>

          <p>
            <strong>Reduction:</strong> Professional kitchens often reduce stock by 50-75% before freezing to save space. This creates glace de viande (meat glaze) that&apos;s intensely concentrated. Reconstitute with water when needed, or use small amounts for incredible flavor boosts.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>What&apos;s the difference between stock and broth?</h3>
          <p>
            Stock uses bones for collagen and body, creating a rich liquid that gels when chilled. Broth uses meat for flavor but lacks the body and gelatin that stock provides. Stock is the foundation for sauces and reductions; broth is more commonly used as a soup base or consumed on its own.
          </p>

          <h3>Can you reuse bones for a second batch of stock?</h3>
          <p>
            Yes, once. This second batch is called &quot;remouillage&quot; in professional kitchens and yields a lighter stock perfect for soups or cooking grains. The bones won&apos;t have as much flavor or collagen left, but you&apos;re still extracting value. Don&apos;t attempt a third batch—there&apos;s nothing left at that point.
          </p>

          <h3>How long does homemade stock last?</h3>
          <p>
            Five days refrigerated in a sealed container, or six months frozen. For longer refrigerator storage, bring the stock to a boil every 3-4 days to kill bacteria, then cool and refrigerate again. Freeze in portion sizes you&apos;ll actually use—ice cube trays for small amounts, quart containers for soups and sauces.
          </p>

          <h3>Why does my stock gel solid in the refrigerator?</h3>
          <p>
            That&apos;s perfect—it means you extracted plenty of collagen from the bones, which converts to gelatin when cooled. This body and richness is exactly what you want. When reheated, it will return to liquid form. Gelatinous stock creates silky sauces and adds body to soups.
          </p>

          <h3>Should I roast bones before making stock?</h3>
          <p>
            For brown stocks (beef, lamb, veal), yes—roasting caramelizes proteins and creates deep, complex flavor through the Maillard reaction. For white stocks (chicken, turkey, fish), no—you want a lighter, cleaner flavor. Roast bones at 400°F for 45-60 minutes until deeply browned but not burnt.
          </p>

          <h3>Why shouldn&apos;t I add salt to stock while it&apos;s cooking?</h3>
          <p>
            Stock reduces as it simmers, concentrating flavors including salt. If you salt during cooking and later reduce the stock for a sauce, it can become inedibly salty. Always season stock when you use it, not when you make it. This gives you complete control over the final dish.
          </p>

          <h3>What bones make the best stock?</h3>
          <p>
            Joints and bones with connective tissue produce the most collagen: chicken backs, necks, and feet; beef knuckles and joints; pork trotters. Mix meaty bones with collagen-rich bones for both flavor and body. Avoid bones with too much marrow unless you want a very rich, fatty stock.
          </p>

          <h3>How do I clarify cloudy stock?</h3>
          <p>
            Use an egg white raft: whisk egg whites with cold stock, add to simmering cloudy stock, and let it form a floating &quot;raft&quot; that captures impurities. After 20-30 minutes, carefully ladle stock from beneath the raft through cheesecloth. This professional technique creates crystal-clear consommé.
          </p>

          <h2>Keep Learning: Related Guides</h2>

          <h3>Technique Guides:</h3>
          <ul>
            {/* <li>
              <CTAVisibilityTracker
                ctaId="season-soups-link"
                position="inline"
                productSlug="season-soups-guide"
                merchant="internal"
              >
                <Link href="/blog/how-to-season-soups-and-stews" className="text-orange-600 hover:text-orange-700 font-medium">
                  How to Season Soups and Stews Like a Chef
                </Link>
              </CTAVisibilityTracker>
            </li> */}
            <li>How to Season Soups and Stews Like a Chef</li>
            <li>
              <CTAVisibilityTracker
                ctaId="blanching-vegetables-link"
                position="inline"
                productSlug="blanching-vegetables"
                merchant="internal"
              >
                <Link href="/blog/blanching-vegetables-why-restaurants-do-it" className="text-orange-600 hover:text-orange-700 font-medium">
                  Blanching Vegetables: Why Restaurants Do It
                </Link>
              </CTAVisibilityTracker>
            </li>
            <li>
              <CTAVisibilityTracker
                ctaId="reducing-sauces-link"
                position="inline"
                productSlug="reducing-sauces"
                merchant="internal"
              >
                <Link href="/blog/reducing-sauces-restaurant-technique" className="text-orange-600 hover:text-orange-700 font-medium">
                  Reducing Sauces: The Technique Restaurants Use Daily
                </Link>
              </CTAVisibilityTracker>
            </li>
            <li>
              <CTAVisibilityTracker
                ctaId="deglazing-link"
                position="inline"
                productSlug="deglazing"
                merchant="internal"
              >
                <Link href="/blog/deglazing-secret-to-restaurant-quality-flavor" className="text-orange-600 hover:text-orange-700 font-medium">
                  Deglazing: The Secret to Restaurant-Quality Flavor
                </Link>
              </CTAVisibilityTracker>
            </li>
          </ul>

          <h3>Equipment Reviews:</h3>
          <ul>
            {/* <li>
              <CTAVisibilityTracker
                ctaId="stockpots-review-link"
                position="inline"
                productSlug="stockpots-review"
                merchant="internal"
              >
                <Link href="/reviews/best-stockpots" className="text-orange-600 hover:text-orange-700 font-medium">
                  Best Stockpots for Home Cooks
                </Link>
              </CTAVisibilityTracker>
            </li> */}
            <li>Best Stockpots for Home Cooks</li>
            {/* <li>
              <CTAVisibilityTracker
                ctaId="kosher-salt-review-link"
                position="inline"
                productSlug="kosher-salt-review"
                merchant="internal"
              >
                <Link href="/reviews/diamond-crystal-kosher-salt" className="text-orange-600 hover:text-orange-700 font-medium">
                  Diamond Crystal Kosher Salt Review
                </Link>
              </CTAVisibilityTracker>
            </li> */}
            <li>Diamond Crystal Kosher Salt Review</li>
          </ul>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">About Scott Bradley</h2>
          <p className="text-slate-700 mb-2">
            <strong>Professional Chef • 45 Years Cooking Experience • 24 Years Professional Kitchens</strong>
          </p>
          <p className="text-slate-600 mb-4">
            Former Kitchen Manager at Mellow Mushroom. A.A.S. Culinary Arts (Seattle Central College), B.S. Business Administration (University of Montana). Thousands of gallons of stock made, strained, and reduced over decades.
          </p>
          <CTAVisibilityTracker
            ctaId="about-scott-footer-link"
            position="article_footer"
            productSlug="making-stock-professional-chef-method"
            merchant="internal"
          >
            <Link href="/about" className="text-orange-600 hover:text-orange-700 font-medium">
              About Scott →
            </Link>
          </CTAVisibilityTracker>
        </footer>
      </article>
    </>
  );
}