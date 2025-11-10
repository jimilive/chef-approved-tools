import { Metadata } from 'next'
import Link from 'next/link'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import BlogLayout from '@/components/blog/BlogLayout'
import BlogHero from '@/components/blog/BlogHero'
import AuthorBio from '@/components/review/AuthorBio'

export const metadata: Metadata = {
  title: 'How To Sharpen Knives With A Tri-Stone (Step-By-Step)',
  description: 'How to sharpen knives with a tri-stone sharpener. Step-by-step guide with angles and technique from 6 years sharpening at Purple Café. Professional method.',
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/blog/how-to-sharpen-with-tri-stone',
  },
  openGraph: {
    title: 'How to Sharpen with a Stone: Professional Chef\'s Technique (2025)',
    description: 'Professional chef shares technique perfected over 6 years in restaurant kitchen. Step-by-step guide: angles, pressure, three-stage progression, troubleshooting.',
    type: 'article',
    url: 'https://www.chefapprovedtools.com/blog/how-to-sharpen-with-tri-stone',
  },
};

const articleSchema = generateArticleSchema({
  headline: "How to Sharpen Knives with a Stone: Professional Chef's Technique",
  description: "Professional chef shares technique perfected over 6 years in restaurant kitchen. Step-by-step guide: angles, pressure, three-stage progression, troubleshooting.",
  datePublished: "2025-10-16",
  dateModified: "2025-10-16",
  authorName: "Scott Bradley",
  imageUrl: "https://www.chefapprovedtools.com/og-image.jpg",
  urlPrefix: 'blog',
  urlSuffix: 'how-to-sharpen-with-tri-stone'
});

export default function HowToSharpenWithTriStonePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: "https://www.chefapprovedtools.com" },
            { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
            { name: "How to Sharpen with a Stone", url: "https://www.chefapprovedtools.com/blog/how-to-sharpen-with-tri-stone" }
          ]))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema([
            {
              question: "What angle should I sharpen my kitchen knives?",
              answer: "Western knives sharpen at 20-22 degrees per side, Japanese knives at 10-15 degrees. After 6 years sharpening knives daily at Purple Café, I found most German chef knives (Wüsthof, Henckels) work best at 20 degrees, while Victorinox and Japanese knives prefer 15 degrees. Consistency matters more than the exact angle—maintain the same angle throughout the entire sharpening process."
            },
            {
              question: "How often should I sharpen my kitchen knives?",
              answer: "Sharpen every 3-6 months for home use, or every 2-4 weeks in professional kitchens. Frequency depends on usage—if you cook daily and hone regularly with a steel, sharpen every 3-4 months. Signs you need sharpening: honing no longer restores sharpness, knife crushes tomato skin instead of slicing, or requires excessive pressure. Professional kitchens sharpen weekly because of heavy use."
            },
            {
              question: "What's the difference between sharpening and honing?",
              answer: "Sharpening removes metal to create a new edge using whetstones or sharpeners, while honing realigns the existing edge using a steel rod. Think of honing as tune-up maintenance (do it every 2-3 uses) and sharpening as rebuilding (every 3-6 months). You can't hone away a truly dull edge—eventually you need to sharpen."
            },
            {
              question: "What is a burr and how do I know when I've formed one?",
              answer: "A burr is a thin metal curl that forms along the edge when you've sharpened all the way to the apex. Run your finger gently perpendicular to the edge (spine to edge, never along the edge)—you'll feel a slight catch or roughness. Once you feel a consistent burr along the entire edge, you've finished that side and can flip the knife. No burr means you haven't reached the edge yet."
            },
            {
              question: "Should I use water or oil on my Norton tri-stone sharpener?",
              answer: "Use oil—Norton tri-stone sharpeners are oil stones, not water stones. Norton recommends food-grade mineral oil or their own honing oil. Never use water on oil stones (it won't work), and don't use cooking oil or motor oil (they gum up the stone). At Purple Café, we kept a bottle of mineral oil next to the sharpening station and applied it liberally before every use."
            },
            {
              question: "What's the correct grit progression for sharpening?",
              answer: "Start with coarse grit (120-400) to establish the edge and form a burr, progress to medium (800-1000) to refine, then finish with fine (4000-8000) for polishing. The Norton IM313 tri-stone system includes coarse Crystolon, medium Crystolon, and fine India—perfect for kitchen knives. Only use coarse if the knife is very dull or damaged; otherwise start with medium."
            },
            {
              question: "Why isn't my knife getting sharp even after sharpening?",
              answer: "Common causes: not forming a burr (you haven't reached the edge), inconsistent angle (changes mid-stroke ruin the edge), starting with too fine a grit (switch to coarse), or not removing the burr at the end. If you've done 50+ strokes without feeling a burr, your grit is too fine. Drop down to coarse grit and apply more pressure."
            },
            {
              question: "How do I maintain a consistent angle while sharpening?",
              answer: "Use the coin trick—stack two quarters under the spine of an 8-inch chef's knife, which creates roughly 15 degrees. Feel this angle, then remove the coins and replicate it. Lock your wrists and move from the shoulders, not the wrists. After 6 years of daily sharpening at Purple Café, muscle memory takes over, but beginners benefit from angle guides or the coin method."
            },
            {
              question: "How do I remove the burr after sharpening?",
              answer: "The burr is removed by progressing through finer grits with lighter pressure—each finer stone creates a smaller burr until it's microscopic. On your finest stone, use very light strokes (just the weight of the knife), alternating sides after each stroke. Finish with 5-10 passes on a leather strop or the back of a leather belt. The burr should break off cleanly."
            },
            {
              question: "How do I test if my knife is sharp enough?",
              answer: "The tomato test: without holding the tomato, gently rest the knife on the skin and slice with no downward pressure—a sharp knife glides through. Or try the paper test: hold paper vertically and slice downward—sharp knives cut cleanly without tearing. At Purple Café, we used the arm-hair test (knife should shave arm hair), but tomato-slicing is safer and equally reliable."
            }
          ]))
        }}
      />

      <BlogLayout breadcrumbTitle="How to Sharpen with a Stone">
        <BlogHero
          title="How to Sharpen Knives with a Stone: Professional Chef's Technique"
          introduction={["For 6 years at Purple Café, I sharpened 8-12 professional knives weekly using the Norton IM200 Tri-Stone. In a 200+ cover restaurant where dull knives meant service delays, this three-stage system kept every blade razor-sharp through demanding dinner services. This isn't complicated—follow this exact technique and you'll achieve professional-quality results at home."]}
          publishedDate="2025-10-16"
          lastUpdated="2025-10-16"
          readTime="8 min read"
        />

        {/* Article Content */}
        <div className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-lg p-8 mb-8">

          {/* Early Link to Review */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>💡 Using the right sharpening system matters.</strong> The{' '}
              <CTAVisibilityTracker
                ctaId="blog-how-to-sharpen-with-tri-stone-review-link-1"
                position="above_fold"
                productSlug="how-to-sharpen-with-tri-stone"
                merchant="internal"
              >
                <Link href="/reviews/norton-im200-tri-stone-sharpener" className="text-blue-700 font-bold underline">
                  Norton IM200 Tri-Stone
                </Link>
              </CTAVisibilityTracker> survived 6 years of professional restaurant use and delivers
              exceptional results.{' '}
              <CTAVisibilityTracker
                ctaId="blog-how-to-sharpen-with-tri-stone-review-link-2"
                position="above_fold"
                productSlug="how-to-sharpen-with-tri-stone"
                merchant="internal"
              >
                <Link href="/reviews/norton-im200-tri-stone-sharpener" className="text-blue-700 underline">
                  Read my complete review →
                </Link>
              </CTAVisibilityTracker>
            </p>
          </div>

          <h2>What You&apos;ll Need</h2>

          <h3>Equipment</h3>
          <ul>
            <li>
              <strong>Norton IM200 Tri-Stone sharpening system</strong> -{' '}
              <CTAVisibilityTracker
                ctaId="blog-how-to-sharpen-with-tri-stone-review-link-3"
                position="mid_article"
                productSlug="how-to-sharpen-with-tri-stone"
                merchant="internal"
              >
                <Link href="/reviews/norton-im200-tri-stone-sharpener" className="text-blue-700 underline">
                  See my 6-year professional test →
                </Link>
              </CTAVisibilityTracker>
            </li>
            <li><strong>Light mineral oil</strong> (food-grade) or water</li>
            <li><strong>Paper towels</strong> for cleanup</li>
            <li><strong>Dull knife</strong> to practice on</li>
            <li><strong>Good lighting</strong> (essential for seeing edge development)</li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>⚠️ Safety Note:</strong> Sharp knives are safer than dull knives, but the sharpening
              process itself requires care. Work on stable surface, keep fingers behind the blade edge,
              and maintain focus throughout the process.
            </p>
          </div>

          <h2>Understanding the Norton Tri-Stone System</h2>

          <p>
            The Norton IM200 features three progressively finer stones mounted in one base:
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">

            <h3 className="mt-0">Stone 1: Coarse (120 Grit)</h3>
            <p><strong>Purpose:</strong> Repair damaged edges, remove chips, establish bevel</p>
            <p><strong>When to use:</strong> Very dull knives, damaged edges, establishing new angle</p>
            <p><strong>Passes needed:</strong> 5-10 per side</p>

            <h3 className="mt-6">Stone 2: Medium (280 Grit)</h3>
            <p><strong>Purpose:</strong> Refine edge, remove coarse scratches, develop working sharpness</p>
            <p><strong>When to use:</strong> After coarse stone, or for moderately dull knives</p>
            <p><strong>Passes needed:</strong> 8-12 per side</p>

            <h3 className="mt-6">Stone 3: Fine (320 Grit)</h3>
            <p><strong>Purpose:</strong> Polish edge to razor-sharp finish, remove medium stone scratches</p>
            <p><strong>When to use:</strong> Final step for all knives, or sole step for touch-ups</p>
            <p className="mb-0"><strong>Passes needed:</strong> 10-15 per side</p>

          </div>

          <p>
            <strong>Pro tip:</strong> Most kitchen knives need all three stones. Very dull knives start
            at coarse. Knives needing touch-ups can skip straight to fine.
          </p>

          <h2>Step-by-Step: Professional Sharpening Technique</h2>

          <h3>Step 1: Set Up Your Work Area</h3>
          <p>
            Place Norton Tri-Stone on stable, flat surface. The non-slip rubber base should grip
            securely. Position yourself comfortably—you&apos;ll maintain this position for 10-15 minutes.
          </p>
          <p>
            <strong>Lighting matters:</strong> Position light source above and slightly behind the
            stone so you can see the knife edge clearly as you work.
          </p>

          <h3>Step 2: Apply Light Mineral Oil</h3>
          <p>
            Apply thin film of mineral oil to coarse stone. You need just enough to create slick
            surface—2-3 drops spread across the stone. Excessive oil doesn&apos;t improve results.
          </p>
          <p className="text-sm text-slate-600">
            <strong>Alternative:</strong> Water works but mineral oil prevents rust on carbon steel
            knives and suspends metal particles better.
          </p>

          <h3>Step 3: Establish Your Angle (20 Degrees)</h3>
          <p>
            <strong>The single most important skill in sharpening is maintaining consistent angle.</strong>{' '}
            For kitchen knives, 20 degrees is ideal.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>20-Degree Angle Trick:</strong> Place knife flat on stone. Raise spine
              approximately height of two stacked quarters (about 3/8 inch for 8-inch blade). This
              creates roughly 20-degree angle. Burn this feeling into muscle memory.
            </p>
          </div>

          <h3>Step 4: Coarse Stone - First Side (5-10 Passes)</h3>
          <p>
            Hold knife at 20-degree angle. Start with heel of blade near your body. Draw blade
            across stone away from you in smooth, sweeping motion, maintaining angle throughout.
          </p>
          <p><strong>Key points:</strong></p>
          <ul>
            <li>Light to moderate pressure (let stone do the work)</li>
            <li>Full-length strokes from heel to tip</li>
            <li>Maintain consistent angle throughout stroke</li>
            <li>Count your passes (5-10 for very dull knife)</li>
          </ul>

          <h3>Step 5: Coarse Stone - Flip and Repeat</h3>
          <p>
            Flip knife over. Match the same number of passes on second side. Consistency between
            sides creates symmetrical edge.
          </p>
          <p>
            <strong>Check your progress:</strong> Run finger (carefully) along spine-side of edge.
            You should feel a consistent &quot;burr&quot; or wire edge along the entire length.
            This confirms you&apos;ve reached the edge on the coarse stone.
          </p>

          <h3>Step 6: Medium Stone - Refine (8-12 Passes Per Side)</h3>
          <p>
            Wipe knife clean. Apply fresh oil to medium stone. Repeat the same technique—same angle,
            same motion—but with more passes (8-12 per side).
          </p>
          <p>
            <strong>What&apos;s happening:</strong> The medium stone removes the coarse scratches and
            begins refining the edge. You&apos;re building on the work of the coarse stone, not starting
            over.
          </p>

          <h3>Step 7: Fine Stone - Polish to Razor-Sharp (10-15 Passes Per Side)</h3>
          <p>
            Final stage. Wipe knife clean. Fresh oil on fine stone. Same technique, but now with
            lighter pressure and more passes (10-15 per side).
          </p>
          <p>
            <strong>The finish line:</strong> The fine stone polishes the edge to final sharpness.
            After this stage, your knife should slice paper effortlessly and glide through tomato
            skin with zero pressure.
          </p>

          <h3>Step 8: Remove the Burr (Critical Final Step)</h3>
          <p>
            After fine stone, you&apos;ll have a micro-burr on the edge. Remove it with 3-5 very
            light trailing passes per side on fine stone—barely any pressure, just the weight of
            the knife.
          </p>
          <p>
            <strong>Alternative:</strong> Gently strop edge on leather belt or newspaper (5-10 passes
            per side). This removes burr and slightly polishes the edge.
          </p>

          <h3>Step 9: Test Your Edge</h3>
          <p>
            <strong>Paper test:</strong> Hold piece of paper vertically. Slice downward with knife.
            Properly sharpened knife slices cleanly with minimal pressure. If knife tears or won&apos;t
            bite, return to fine stone for more passes.
          </p>
          <p>
            <strong>Tomato test:</strong> The ultimate kitchen test. Place knife edge on tomato skin
            and draw across with zero downward pressure. Sharp knife glides through without crushing.
          </p>

          <h3>Step 10: Clean Up</h3>
          <p>
            Wipe stones clean with paper towels. Wash knife with soap and water. Dry thoroughly.
            Store Norton Tri-Stone in dry location.
          </p>

          <h2>Common Sharpening Mistakes (And How to Fix Them)</h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">

            <div className="mb-6">
              <h3 className="mt-0">❌ Mistake 1: Inconsistent Angle</h3>
              <p><strong>Result:</strong> Rounded edge that won&apos;t get sharp</p>
              <p><strong>Fix:</strong> Practice maintaining exact same angle throughout each stroke.
              Muscle memory develops with repetition. Focus on feeling the angle, not thinking about it.</p>
            </div>

            <div className="mb-6">
              <h3>❌ Mistake 2: Too Much Pressure</h3>
              <p><strong>Result:</strong> Doesn&apos;t actually sharpen faster, creates uneven edge</p>
              <p><strong>Fix:</strong> Use light to moderate pressure. The abrasive does the work, not
              your muscle. If you&apos;re exhausted after sharpening, you&apos;re pressing too hard.</p>
            </div>

            <div className="mb-6">
              <h3>❌ Mistake 3: Unequal Passes Per Side</h3>
              <p><strong>Result:</strong> Asymmetrical edge, knife pulls to one side when cutting</p>
              <p><strong>Fix:</strong> Count your passes. Same number each side, every stone. Consistency
              creates symmetry.</p>
            </div>

            <div className="mb-6">
              <h3>❌ Mistake 4: Skipping Stones</h3>
              <p><strong>Result:</strong> Can&apos;t achieve final sharpness if you skip medium grit</p>
              <p><strong>Fix:</strong> Use all three stones in progression for very dull knives. Only
              skip to fine stone for touch-ups on knives that are still fairly sharp.</p>
            </div>

            <div className="mb-0">
              <h3>❌ Mistake 5: Not Removing the Burr</h3>
              <p><strong>Result:</strong> Edge feels sharp but breaks off immediately during use</p>
              <p className="mb-0"><strong>Fix:</strong> Always finish with light trailing passes or stropping to remove
              the wire edge. This step transforms good edge into great edge.</p>
            </div>

          </div>

          <h2>Professional Sharpening Schedule</h2>

          <p>
            At Purple Café, I maintained this schedule for 8-12 knives:
          </p>

          <div className="overflow-x-auto my-6">
            <table>
              <thead>
                <tr>
                  <th>Knife Usage</th>
                  <th>Sharpening Frequency</th>
                  <th>Stone(s) Needed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Daily professional use</td>
                  <td>Weekly</td>
                  <td>Fine stone (touch-ups)</td>
                </tr>
                <tr>
                  <td>Daily home cooking</td>
                  <td>Every 2-4 weeks</td>
                  <td>Fine stone, occasionally medium</td>
                </tr>
                <tr>
                  <td>Weekly home cooking</td>
                  <td>Every 2-3 months</td>
                  <td>All three stones</td>
                </tr>
                <tr>
                  <td>Occasional use</td>
                  <td>2-3 times per year</td>
                  <td>All three stones</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>💡 Pro tip:</strong> Regular light sharpening beats infrequent heavy sharpening.
              Touch-ups on fine stone every few weeks remove less metal and extend knife lifespan compared
              to letting knife get very dull then using coarse stone.
            </p>
          </div>

          {/* Mid-Article CTA */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 my-8 text-center">
            <h3 className="mt-0 text-2xl font-bold mb-4">
              Ready for Professional-Quality Sharpening?
            </h3>
            <p className="mb-6">
              The Norton Tri-Stone I used for 6 years in a professional restaurant kitchen delivers
              exceptional results.
            </p>
            <CTAVisibilityTracker
              ctaId="blog-how-to-sharpen-with-tri-stone-review-cta-1"
              position="mid_article"
              productSlug="how-to-sharpen-with-tri-stone"
              merchant="internal"
            >
              <Link
                href="/reviews/norton-im200-tri-stone-sharpener"
                className="inline-block bg-orange-700 text-white hover:bg-orange-800 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
              >
                Read My Complete Norton Tri-Stone Review →
              </Link>
            </CTAVisibilityTracker>
          </div>

          <h2>Professional Sharpening Tips</h2>

          <ul>
            <li><strong>Master one knife first:</strong> Practice technique on single knife before
            attempting your entire collection. Muscle memory develops faster with focused repetition.</li>

            <li><strong>Mark your angle:</strong> Use permanent marker on knife bevel. Correct angle
            removes marker evenly. Uneven marker removal shows inconsistent angle.</li>

            <li><strong>Listen to the sound:</strong> Consistent sharpening creates consistent sound.
            Changes in sound indicate angle changes. Train your ear.</li>

            <li><strong>Feel the burr:</strong> Running finger along spine-side of edge (carefully)
            confirms you&apos;ve reached the edge. The burr is your progress indicator.</li>

            <li><strong>Start with cheap knife:</strong> Practice on inexpensive knife before risking
            expensive blades. Mistakes are part of learning.</li>

            <li><strong>Clean stones regularly:</strong> Metal particles load the stone surface and
            reduce cutting efficiency. Wipe clean after each knife.</li>

            <li><strong>Flatten stones as needed:</strong> Stones wear unevenly over time. Flatten on
            diamond plate or sandpaper on glass every few months.</li>

            <li><strong>Light final passes matter:</strong> The difference between good sharp and
            razor-sharp is those final ultra-light trailing passes on fine stone.</li>
          </ul>

          <h2>Master the Technique</h2>

          <p>
            After 6 years of sharpening 8-12 professional knives weekly at Purple Café using this exact
            technique, I can confirm the Norton Tri-Stone system delivers restaurant-quality results. The
            key is consistent angle, proper progression through the three stones, and patience to let the
            abrasive do its work.
          </p>

        </div>

        {/* FAQ Section */}
        <div className="border-t border-gray-200 pt-12 mt-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">What angle should I sharpen my kitchen knives?</h3>
              <p className="text-slate-700 leading-relaxed">
                Western knives sharpen at 20-22 degrees per side, Japanese knives at 10-15 degrees. After 6 years sharpening knives daily at Purple Café, I found most German chef knives (Wüsthof, Henckels) work best at 20 degrees, while Victorinox and Japanese knives prefer 15 degrees. Consistency matters more than the exact angle—maintain the same angle throughout the entire sharpening process.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">How often should I sharpen my kitchen knives?</h3>
              <p className="text-slate-700 leading-relaxed">
                Sharpen every 3-6 months for home use, or every 2-4 weeks in professional kitchens. Frequency depends on usage—if you cook daily and hone regularly with a steel, sharpen every 3-4 months. Signs you need sharpening: honing no longer restores sharpness, knife crushes tomato skin instead of slicing, or requires excessive pressure. Professional kitchens sharpen weekly because of heavy use.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">What&apos;s the difference between sharpening and honing?</h3>
              <p className="text-slate-700 leading-relaxed">
                Sharpening removes metal to create a new edge using whetstones or sharpeners, while honing realigns the existing edge using a steel rod. Think of honing as tune-up maintenance (do it every 2-3 uses) and sharpening as rebuilding (every 3-6 months). You can&apos;t hone away a truly dull edge—eventually you need to sharpen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">What is a burr and how do I know when I&apos;ve formed one?</h3>
              <p className="text-slate-700 leading-relaxed">
                A burr is a thin metal curl that forms along the edge when you&apos;ve sharpened all the way to the apex. Run your finger gently perpendicular to the edge (spine to edge, never along the edge)—you&apos;ll feel a slight catch or roughness. Once you feel a consistent burr along the entire edge, you&apos;ve finished that side and can flip the knife. No burr means you haven&apos;t reached the edge yet.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Should I use water or oil on my Norton tri-stone sharpener?</h3>
              <p className="text-slate-700 leading-relaxed">
                Use oil—Norton tri-stone sharpeners are oil stones, not water stones. Norton recommends food-grade mineral oil or their own honing oil. Never use water on oil stones (it won&apos;t work), and don&apos;t use cooking oil or motor oil (they gum up the stone). At Purple Café, we kept a bottle of mineral oil next to the sharpening station and applied it liberally before every use.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">What&apos;s the correct grit progression for sharpening?</h3>
              <p className="text-slate-700 leading-relaxed">
                Start with coarse grit (120-400) to establish the edge and form a burr, progress to medium (800-1000) to refine, then finish with fine (4000-8000) for polishing. The Norton IM313 tri-stone system includes coarse Crystolon, medium Crystolon, and fine India—perfect for kitchen knives. Only use coarse if the knife is very dull or damaged; otherwise start with medium.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Why isn&apos;t my knife getting sharp even after sharpening?</h3>
              <p className="text-slate-700 leading-relaxed">
                Common causes: not forming a burr (you haven&apos;t reached the edge), inconsistent angle (changes mid-stroke ruin the edge), starting with too fine a grit (switch to coarse), or not removing the burr at the end. If you&apos;ve done 50+ strokes without feeling a burr, your grit is too fine. Drop down to coarse grit and apply more pressure.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">How do I maintain a consistent angle while sharpening?</h3>
              <p className="text-slate-700 leading-relaxed">
                Use the coin trick—stack two quarters under the spine of an 8-inch chef&apos;s knife, which creates roughly 15 degrees. Feel this angle, then remove the coins and replicate it. Lock your wrists and move from the shoulders, not the wrists. After 6 years of daily sharpening at Purple Café, muscle memory takes over, but beginners benefit from angle guides or the coin method.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">How do I remove the burr after sharpening?</h3>
              <p className="text-slate-700 leading-relaxed">
                The burr is removed by progressing through finer grits with lighter pressure—each finer stone creates a smaller burr until it&apos;s microscopic. On your finest stone, use very light strokes (just the weight of the knife), alternating sides after each stroke. Finish with 5-10 passes on a leather strop or the back of a leather belt. The burr should break off cleanly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">How do I test if my knife is sharp enough?</h3>
              <p className="text-slate-700 leading-relaxed">
                The tomato test: without holding the tomato, gently rest the knife on the skin and slice with no downward pressure—a sharp knife glides through. Or try the paper test: hold paper vertically and slice downward—sharp knives cut cleanly without tearing. At Purple Café, we used the arm-hair test (knife should shave arm hair), but tomato-slicing is safer and equally reliable.
              </p>
            </div>
          </div>
        </div>

        {/* Related Content */}
        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CTAVisibilityTracker
              ctaId="blog-how-to-sharpen-with-tri-stone-related-1"
              position="final_cta"
              productSlug="how-to-sharpen-with-tri-stone"
              merchant="internal"
            >
              <Link href="/reviews/norton-im200-tri-stone-sharpener" className="block bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 mb-2">Norton IM200 Tri-Stone Review: 6-Year Professional Test</h4>
                <p className="text-slate-600 text-sm">
                  The sharpening system that survived 6 years of professional restaurant use—detailed review and techniques.
                </p>
              </Link>
            </CTAVisibilityTracker>
            <CTAVisibilityTracker
              ctaId="blog-how-to-sharpen-with-tri-stone-related-2"
              position="final_cta"
              productSlug="how-to-sharpen-with-tri-stone"
              merchant="internal"
            >
              <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="block bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 mb-2">Victorinox 8&quot; Chef Knife: Professional Quality</h4>
                <p className="text-slate-600 text-sm">
                  The professional chef&apos;s knife that responds beautifully to proper sharpening techniques.
                </p>
              </Link>
            </CTAVisibilityTracker>
            <CTAVisibilityTracker
              ctaId="blog-how-to-sharpen-with-tri-stone-related-3"
              position="final_cta"
              productSlug="how-to-sharpen-with-tri-stone"
              merchant="internal"
            >
              <Link href="/blog/how-to-steel-a-knife" className="block bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 mb-2">How to Steel a Knife: Proper Technique</h4>
                <p className="text-slate-600 text-sm">
                  Learn professional honing technique to maintain your sharp edge between sharpening sessions.
                </p>
              </Link>
            </CTAVisibilityTracker>
            <CTAVisibilityTracker
              ctaId="blog-how-to-sharpen-with-tri-stone-related-4"
              position="final_cta"
              productSlug="how-to-sharpen-with-tri-stone"
              merchant="internal"
            >
              <Link href="/kitchen-bundle" className="block bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 mb-2">Complete Professional Kitchen Starter Kit</h4>
                <p className="text-slate-600 text-sm">
                  Build your professional kitchen with chef-approved tools including knives and sharpening systems.
                </p>
              </Link>
            </CTAVisibilityTracker>
          </div>
        </div>

        <AuthorBio />
      </BlogLayout>
    </>
  );
}
