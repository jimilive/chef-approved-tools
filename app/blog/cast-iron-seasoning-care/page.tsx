import Link from 'next/link';
import { Metadata } from 'next';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, Flame, Droplets, FlaskConical, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Cast Iron Seasoning & Care: The Complete Professional Guide | Chef Approved Tools",
  description: "Learn the chemistry of cast iron seasoning, proper care techniques, and restoration methods from a chef with 24 years of professional experience. Make your cast iron last forever.",
  keywords: ["cast iron seasoning", "cast iron care", "how to season cast iron", "cast iron maintenance", "polymerization", "cast iron restoration", "cast iron cleaning"],
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/blog/cast-iron-seasoning-care'
  }
};

const articleSchema = generateArticleSchema({
  headline: "Cast Iron Seasoning & Care: The Complete Professional Guide",
  description: "The chemistry of cast iron seasoning, proper care techniques, and restoration methods that make your cast iron last forever. From a chef with 24 years of professional experience.",
  datePublished: "2025-09-27",
  dateModified: "2025-10-24",
  authorName: "Scott Bradley",
  imageUrl: "https://www.chefapprovedtools.com/images/cast-iron-care-og.jpg"
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Cast Iron Seasoning & Care", url: "https://www.chefapprovedtools.com/blog/cast-iron-seasoning-care" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "What is cast iron seasoning?",
    answer: "Seasoning is a layer of polymerized oil bonded to the cast iron surface. When you heat oil past its smoke point, it undergoes a chemical reaction called polymerization, transforming from liquid fat into a hard, slick, protective coating. This layer prevents rust, creates a naturally non-stick surface, and improves with use over time."
  },
  {
    question: "Can I use soap on cast iron?",
    answer: "Yes. Modern dish soap won't damage properly seasoned cast iron. The myth that soap strips seasoning comes from old soaps that contained lye, which could break down the polymerized oil layer. Today's gentle dish soaps are fine. Just don't soak the pan or use abrasive scrubbers unless you're restoring it."
  },
  {
    question: "What oil is best for seasoning cast iron?",
    answer: "Flaxseed oil creates the hardest seasoning but can flake. Grapeseed oil is reliable and neutral. Crisco (vegetable shortening) is the professional standard—it's affordable, consistent, and creates durable seasoning. Avoid olive oil (low smoke point) and butter (contains milk solids that burn)."
  },
  {
    question: "How do I fix rust on cast iron?",
    answer: "Scrub the rust off with steel wool or a wire brush, wash thoroughly, dry completely, then re-season. For heavy rust, use a 50/50 vinegar and water soak for 30 minutes to 1 hour, scrub, rinse, dry immediately, and re-season. Rust is surface-level and doesn't ruin the pan permanently."
  }
]);

export default function CastIronCarePage() {
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
            <Flame className="w-5 h-5" />
            <span className="text-sm font-medium">Equipment Care</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Cast Iron Seasoning &amp; Care: The Complete Professional Guide
          </h1>
          <p className="text-xl text-slate-600">
            The chemistry of cast iron seasoning, proper care techniques, and restoration methods that make your cast iron last forever.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
            <span>By Chef Scott Bradley</span>
            <span>•</span>
            <span>October 24, 2025</span>
            <span>•</span>
            <span>10 min read</span>
          </div>
        </header>

        <div className="prose prose-lg prose-slate max-w-none">
          <p>
            Cast iron is one of the most durable, versatile, and misunderstood pieces of cookware in the kitchen. People either love it or avoid it entirely, and most of the fear comes from confusion about seasoning and care.
          </p>

          <p>
            <strong>Here&apos;s the truth:</strong> Cast iron is nearly indestructible. You can burn it, rust it, drop it, and leave it outside for a decade—and it can still be restored to perfect condition. But you need to understand <em>how seasoning works</em> and <em>how to maintain it properly</em>.
          </p>

          <p>
            I&apos;ve used cast iron in professional kitchens for 24 years. I&apos;ve seen beautiful vintage pans, abused restaurant pans, and rusted yard-sale finds brought back to life. Cast iron isn&apos;t fragile. It doesn&apos;t require obsessive care. But it <em>does</em> require understanding.
          </p>

          <p>
            In this guide, I&apos;m breaking down the science of cast iron seasoning, the proper care routine, common mistakes, and how to restore damaged pans. This is everything you need to know to make your cast iron last forever.
          </p>

          <h2 className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-orange-600" />
            What is Seasoning? The Chemistry
          </h2>

          <p>
            <strong>Seasoning is not oil sitting on the surface of the pan.</strong> It&apos;s a layer of <strong>polymerized oil</strong>—oil that has been chemically transformed into a hard, slick, protective coating bonded to the iron.
          </p>

          <h3>The Polymerization Process</h3>

          <p>
            When you heat oil past its smoke point in the presence of iron, the fat molecules break down and reorganize into a polymer—a plastic-like substance that bonds to the metal surface. This polymer layer:
          </p>

          <ul>
            <li>Prevents rust by sealing the iron from moisture and oxygen</li>
            <li>Creates a naturally non-stick surface</li>
            <li>Improves with repeated use and proper care</li>
            <li>Gets harder and more durable over time</li>
          </ul>

          <p>
            <strong>Key point:</strong> Seasoning is <em>not</em> a coating you apply once. It&apos;s a <em>built-up layer</em> that develops with use. Every time you cook with fat, you reinforce the seasoning. Every time you overheat without fat or cook acidic foods for long periods, you degrade it slightly.
          </p>

          <h3>Why Some Oils Work Better Than Others</h3>

          <p>
            The best oils for seasoning have:
          </p>
          <ul>
            <li><strong>High smoke point</strong> – Allows polymerization without burning</li>
            <li><strong>High percentage of unsaturated fats</strong> – Forms stronger polymer bonds</li>
            <li><strong>Neutral flavor</strong> – Won&apos;t impart off-flavors over time</li>
          </ul>

          <p>
            <strong>Best oils for seasoning:</strong>
          </p>
          <ul>
            <li><strong>Grapeseed oil</strong> – High smoke point, neutral, reliable</li>
            <li><strong>Flaxseed oil</strong> – Creates the hardest seasoning, but can flake if applied too thick</li>
            <li><strong>Crisco (vegetable shortening)</strong> – Professional standard, affordable, consistent</li>
            <li><strong>Canola oil</strong> – Works well, widely available</li>
          </ul>

          <p>
            <strong>Avoid:</strong>
          </p>
          <ul>
            <li><strong>Olive oil</strong> – Low smoke point, can turn sticky</li>
            <li><strong>Butter</strong> – Contains milk solids that burn</li>
            <li><strong>Lard or bacon grease</strong> – Can go rancid over time (fine for cooking, not long-term seasoning)</li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Restaurant Reality: The Cast Iron Skillet Rule
            </p>
            <p className="mb-0">
              At Mellow Mushroom, we had a 12-inch Lodge cast iron skillet that was older than most of the staff. It had been seasoned, used, and re-seasoned thousands of times. The surface was jet black, glass-smooth, and more non-stick than any Teflon pan in the building. <strong>The secret?</strong> It was used every single day. We cooked pizzas, cornbread, roasted vegetables, and seared steaks in it. After each use, we wiped it out, rinsed it if needed, dried it on the stove, and rubbed a thin layer of oil on it before putting it away. That&apos;s it. No obsessive scrubbing. No fancy oils. Just <strong>consistent use and simple care.</strong> The lesson: cast iron gets better with use. Don&apos;t baby it. Use it.
            </p>
          </div>

          <h2 className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-600" />
            How to Season Cast Iron: Step-by-Step
          </h2>

          <p>
            Whether you&apos;re seasoning a new pan or restoring an old one, the process is the same.
          </p>

          <h3>Method 1: Oven Seasoning (Best for New or Fully Stripped Pans)</h3>

          <ol>
            <li><strong>Wash and dry the pan completely</strong> – Use hot soapy water and a stiff brush. Dry thoroughly (put it on the stove over low heat for 5 minutes to ensure all moisture is gone).</li>
            <li><strong>Apply a thin layer of oil</strong> – Use grapeseed oil, Crisco, or canola oil. Rub it all over the pan (inside, outside, handle). Then <strong>wipe off as much as you can</strong> with a paper towel. The layer should be so thin it looks almost dry.</li>
            <li><strong>Bake upside-down at 450-500°F for 1 hour</strong> – Place the pan upside-down on the middle oven rack. Put a sheet of foil on the bottom rack to catch drips. Bake for 1 hour.</li>
            <li><strong>Let it cool in the oven</strong> – Turn off the oven and let the pan cool completely inside (this slow cooling helps the polymer bond fully).</li>
            <li><strong>Repeat 3-5 times</strong> – One layer of seasoning isn&apos;t enough. Repeat the process 3-5 times for a durable, buildable base layer.</li>
          </ol>

          <p>
            <strong>Critical detail:</strong> The oil layer must be <em>thin</em>. If you apply too much, it will pool, turn sticky, and create uneven seasoning.
          </p>

          <h3>Method 2: Stovetop Seasoning (For Maintenance and Touch-Ups)</h3>

          <ol>
            <li><strong>After cooking, wipe out the pan while it&apos;s still warm</strong></li>
            <li><strong>Rinse with hot water if needed</strong> (soap is fine for stuck-on food)</li>
            <li><strong>Dry completely on the stove over low heat</strong></li>
            <li><strong>While still warm, rub a very thin layer of oil all over the pan</strong></li>
            <li><strong>Heat over medium heat until the oil smokes slightly</strong> (1-2 minutes)</li>
            <li><strong>Let cool and store</strong></li>
          </ol>

          <p>
            This quick stovetop method adds a micro-layer of seasoning after every use and keeps the pan in great condition.
          </p>

          <div className="bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-600" />
              Want My Complete Kitchen Setup Guide?
            </h3>
            <p className="mb-4">
              Get my free &quot;11 Essential Tools I Use Most&quot; PDF—the exact equipment I rely on after 24 years in professional kitchens, including my favorite cast iron pieces. No fluff, just the tools that actually matter.
            </p>
            <CTAVisibilityTracker
              ctaId="cast-iron-newsletter-cta"
              position="mid_article"
              productSlug="cast-iron-seasoning-care"
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
            <Droplets className="w-6 h-6 text-orange-600" />
            Daily Care: How to Clean and Maintain Cast Iron
          </h2>

          <p>
            Proper daily care keeps your seasoning intact and your pan performing well.
          </p>

          <h3>After Cooking: The Simple Routine</h3>

          <ol>
            <li><strong>Let the pan cool slightly</strong> (don&apos;t rinse a screaming-hot pan—it can crack)</li>
            <li><strong>Wipe out food residue with a paper towel</strong></li>
            <li><strong>If needed, rinse with hot water and use a stiff brush or scraper</strong> (soap is fine)</li>
            <li><strong>Dry completely on the stove over low heat</strong> (water is the enemy of cast iron)</li>
            <li><strong>While warm, rub a thin layer of oil on the surface</strong></li>
            <li><strong>Store in a dry place</strong></li>
          </ol>

          <h3>Can You Use Soap on Cast Iron?</h3>

          <p>
            <strong>Yes.</strong> Modern dish soap is fine. The myth that soap strips seasoning comes from old soaps that contained lye, which <em>could</em> break down the polymer layer. Today&apos;s gentle dish soaps won&apos;t damage properly seasoned cast iron.
          </p>

          <p>
            <strong>What to avoid:</strong>
          </p>
          <ul>
            <li><strong>Soaking the pan in water</strong> – Promotes rust</li>
            <li><strong>Dishwasher</strong> – Strips seasoning and causes rust</li>
            <li><strong>Abrasive scrubbers (like steel wool)</strong> – Unless you&apos;re restoring the pan</li>
          </ul>

          <h3>What to Do if Food Sticks</h3>

          <p>
            If food sticks, it usually means one of three things:
          </p>
          <ol>
            <li><strong>The pan wasn&apos;t hot enough</strong> – Preheat properly before adding food</li>
            <li><strong>You didn&apos;t use enough fat</strong> – Cast iron isn&apos;t Teflon; you need oil or butter</li>
            <li><strong>The seasoning needs rebuilding</strong> – Do a few rounds of oven seasoning</li>
          </ol>

          <p>
            <strong>To remove stuck-on food:</strong> Add water to the pan, bring it to a simmer, and scrape with a wooden spoon or metal spatula. The stuck bits will release. Then wash, dry, and re-oil.
          </p>

          <h2>How to Restore Rusty or Damaged Cast Iron</h2>

          <p>
            Cast iron can be brought back from almost any condition. Rust, caked-on grime, and flaking seasoning are all fixable.
          </p>

          <h3>Light Rust: Quick Fix</h3>

          <ol>
            <li><strong>Scrub the rust off with steel wool or a stiff brush</strong></li>
            <li><strong>Wash with soap and water</strong></li>
            <li><strong>Dry completely on the stove</strong></li>
            <li><strong>Re-season using the oven method (3-5 coats)</strong></li>
          </ol>

          <h3>Heavy Rust: Full Restoration</h3>

          <ol>
            <li><strong>Soak in a 50/50 vinegar and water solution for 30 minutes to 1 hour</strong> (check frequently—don&apos;t leave it longer than necessary or the vinegar can damage the iron)</li>
            <li><strong>Scrub with steel wool or a wire brush</strong> until all rust is gone</li>
            <li><strong>Rinse thoroughly and dry immediately on the stove</strong></li>
            <li><strong>Season from scratch using the oven method (5-6 coats)</strong></li>
          </ol>

          <h3>Flaking or Uneven Seasoning</h3>

          <p>
            If your seasoning is flaking or sticky:
          </p>
          <ol>
            <li><strong>Scrub off the damaged areas with steel wool</strong></li>
            <li><strong>Wash and dry completely</strong></li>
            <li><strong>Re-season the entire pan (3-5 coats)</strong></li>
          </ol>

          <p>
            <strong>Cause of flaking:</strong> Usually from applying oil too thick or using an oil that doesn&apos;t polymerize well (like olive oil).
          </p>

          <h2>Common Cast Iron Mistakes (And How to Fix Them)</h2>

          <h3>Mistake #1: Applying Too Much Oil When Seasoning</h3>

          <p>
            <strong>Problem:</strong> Creates sticky, uneven coating<br />
            <strong>Fix:</strong> Apply oil, then wipe off as much as possible—the layer should look almost dry
          </p>

          <h3>Mistake #2: Storing Cast Iron While Still Damp</h3>

          <p>
            <strong>Problem:</strong> Causes rust<br />
            <strong>Fix:</strong> Always dry completely on the stove before storing
          </p>

          <h3>Mistake #3: Cooking Acidic Foods for Long Periods</h3>

          <p>
            <strong>Problem:</strong> Tomatoes, vinegar, and wine can break down seasoning if simmered for hours<br />
            <strong>Fix:</strong> Use cast iron for acidic foods occasionally, but not for long braises. Re-season if needed.
          </p>

          <h3>Mistake #4: Never Using the Pan</h3>

          <p>
            <strong>Problem:</strong> Seasoning degrades without use<br />
            <strong>Fix:</strong> Use your cast iron regularly—it gets better with use
          </p>

          <h3>Mistake #5: Babying the Pan</h3>

          <p>
            <strong>Problem:</strong> Treating cast iron like it&apos;s fragile<br />
            <strong>Fix:</strong> Cast iron is tough. Use it for high-heat searing, baking, frying—everything. It&apos;s nearly indestructible.
          </p>

          <h2>The Bottom Line: Cast Iron Lasts Forever</h2>

          <p>
            Cast iron is one of the best investments you can make in your kitchen. It&apos;s durable, versatile, affordable, and improves with age. Once you understand how seasoning works and develop a simple care routine, cast iron becomes one of the easiest and most reliable pieces of cookware you own.
          </p>

          <p>
            <strong>The key lessons:</strong>
          </p>
          <ul>
            <li><strong>Seasoning is polymerized oil</strong> – Not grease sitting on the surface</li>
            <li><strong>Use thin layers of oil when seasoning</strong> – Thick layers turn sticky</li>
            <li><strong>Dry completely after every wash</strong> – Water causes rust</li>
            <li><strong>Soap is fine</strong> – Modern dish soap won&apos;t hurt seasoning</li>
            <li><strong>Use your cast iron regularly</strong> – It gets better with use</li>
            <li><strong>Rust is fixable</strong> – Cast iron can be restored from almost any condition</li>
          </ul>

          <p>
            Treat cast iron with basic respect, and it will outlive you. This is cookware you can pass down to the next generation.
          </p>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/why-cooking-science-matters" className="text-orange-600 hover:text-orange-800 font-semibold">
              → Why Cooking Science Matters
            </Link>
            <Link href="/blog/guide-cooking-oils-smoke-points" className="text-orange-600 hover:text-orange-800 font-semibold">
              → Guide to Cooking Oils &amp; Smoke Points
            </Link>
            <Link href="/blog/fat-is-flavor" className="text-orange-600 hover:text-orange-800 font-semibold">
              → Why Fat is Flavor (And How to Use It)
            </Link>
            <Link href="/blog/knife-safety-professional-kitchen" className="text-orange-600 hover:text-orange-800 font-semibold">
              → Knife Safety in a Professional Kitchen
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
