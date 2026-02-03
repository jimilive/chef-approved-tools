import Link from 'next/link'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import HowToSchema from '@/components/HowToSchema'
import { generateBlogMetadata } from '@/lib/metadata-helpers'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
import BlogLayout from '@/components/blog/BlogLayout'
import BlogHero from '@/components/blog/BlogHero'
import BlogEmailCapture from '@/components/blog/BlogEmailCapture'
import BlogFAQ from '@/components/blog/BlogFAQ'
import AuthorBio from '@/components/review/AuthorBio'
import { tristoneData } from './tristone-data'

export const metadata = generateBlogMetadata('how-to-sharpen-with-tri-stone')

const articleSchema = generateArticleSchema({
  headline: "How to Sharpen with a Stone: Professional Technique", description: "Professional chef shares technique perfected over 6 years in restaurant kitchen. Step-by-step guide: angles, pressure, three-stage progression, troubleshooting.", datePublished: "2025-10-16", dateModified: "2025-10-16", authorName: "Scott Bradley", urlPrefix: 'blog', urlSuffix: 'how-to-sharpen-with-tri-stone'
}); // ISR: Regenerate page every hour for fresh content while allowing search engine caching
export const revalidate = 3600 // 1 hour


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
            { name: "Home", url: "https://www.chefapprovedtools.com" }, { name: "Blog", url: "https://www.chefapprovedtools.com/blog" }, { name: "How to Sharpen with a Stone", url: "https://www.chefapprovedtools.com/blog/how-to-sharpen-with-tri-stone" }
          ]))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(tristoneData.faq.questions)) }}
      />
      <HowToSchema
        name="How to Sharpen a Knife with a Whetstone"
        description="Professional chef technique for sharpening kitchen knives using a tri-stone system. Learn angle control, burr formation, and grit progression."
        datePublished="2025-10-16"
        totalTime="PT20M"
        tools={["Tri-stone sharpening system (Norton IM200 or similar)", "Honing oil", "Towel", "Kitchen knife"]}
        steps={[
          { name: "Set Up the Stone", text: "Place the tri-stone on a stable surface with a towel underneath. Apply honing oil liberally to the coarse stone. Oil prevents metal particles from clogging the stone." }, { name: "Establish the Angle", text: "Position knife at 15-20 degrees (use coin trick: stack two quarters under spine of 8-inch knife). Lock wrists and maintain this angle throughout." }, { name: "Form the Burr on Coarse Stone", text: "Draw knife across coarse stone from heel to tip with moderate pressure. Repeat 20-30 strokes until you feel a burr along the entire edge. Flip and repeat on other side." }, { name: "Refine on Medium Stone", text: "Switch to medium stone. Apply fresh oil. Use lighter pressure and 15-20 strokes per side. The burr becomes smaller and more refined." }, { name: "Polish on Fine Stone", text: "Switch to fine stone with fresh oil. Use very light pressure, just the weight of the knife. Alternate sides after each stroke for 10-15 passes." }, { name: "Remove the Burr", text: "On the fine stone, make 5-10 alternating passes with minimal pressure to break off the remaining burr cleanly." }, { name: "Test Sharpness", text: "Test with paper test (slice vertically) or tomato test (slice without downward pressure). A properly sharpened knife glides through effortlessly." }
        ]}
      />

      <BlogLayout breadcrumbTitle="How to Sharpen with a Stone: Professional Technique">
        <BlogHero
          title="How to Sharpen with a Stone: Professional Technique"
          introduction={["For 6 years at Purple Café, I sharpened 8-12 professional knives weekly using the Norton IM200 Tri-Stone. In a 200+ cover restaurant where dull knives meant service delays, this three-stage system kept every blade razor-sharp through demanding dinner services. This isn't complicated, follow this exact technique and you'll achieve professional-quality results at home."]}
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
              process itself requires care. Work on stable surface, keep fingers behind the blade edge, and maintain focus throughout the process. </p>
          </div>

          <h2>Understanding the Norton Tri-Stone System</h2>

          <p>
            The Norton IM200 features three progressively finer stones mounted in one base: </p>

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
            at coarse. Knives needing touch-ups can skip straight to fine. </p>

          <h2>Step-by-Step: Professional Sharpening Technique</h2>

          <h3>Step 1: Set Up Your Work Area</h3>
          <p>
            Place Norton Tri-Stone on stable, flat surface. The non-slip rubber base should grip
            securely. Position yourself comfortably. You&apos;ll maintain this position for 10-15 minutes. </p>
          <p>
            <strong>Lighting matters:</strong> Position light source above and slightly behind the
            stone so you can see the knife edge clearly as you work. </p>

          <h3>Step 2: Apply Light Mineral Oil</h3>
          <p>
            Apply thin film of mineral oil to coarse stone. You need just enough to create slick
            surface, 2-3 drops spread across the stone. Excessive oil doesn&apos;t improve results. </p>
          <p className="text-sm text-slate-700">
            <strong>Alternative:</strong> Water works but mineral oil prevents rust on carbon steel
            knives and suspends metal particles better. </p>

          <h3>Step 3: Establish Your Angle (20 Degrees)</h3>
          <p>
            <strong>The single most important skill in sharpening is maintaining consistent angle.</strong>{' '}
            For kitchen knives, 20 degrees is ideal. </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <p className="mb-0">
              <strong>20-Degree Angle Trick:</strong> Place knife flat on stone. Raise spine
              approximately height of two stacked quarters (about 3/8 inch for 8-inch blade). This
              creates roughly 20-degree angle. Burn this feeling into muscle memory. </p>
          </div>

          <h3>Step 4: Coarse Stone - First Side (5-10 Passes)</h3>
          <p>
            Hold knife at 20-degree angle. Start with heel of blade near your body. Draw blade
            across stone away from you in smooth, sweeping motion, maintaining angle throughout. </p>
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
            sides creates symmetrical edge. </p>
          <p>
            <strong>Check your progress:</strong> Run finger (carefully) along spine-side of edge. You should feel a consistent &quot;burr&quot; or wire edge along the entire length. This confirms you&apos;ve reached the edge on the coarse stone. </p>

          <h3>Step 6: Medium Stone - Refine (8-12 Passes Per Side)</h3>
          <p>
            Wipe knife clean. Apply fresh oil to medium stone. Repeat the same technique, same angle, same motion, but with more passes (8-12 per side). </p>
          <p>
            <strong>What&apos;s happening:</strong> The medium stone removes the coarse scratches and
            begins refining the edge. You&apos;re building on the work of the coarse stone, not starting
            over. </p>

          <h3>Step 7: Fine Stone - Polish to Razor-Sharp (10-15 Passes Per Side)</h3>
          <p>
            Final stage. Wipe knife clean. Fresh oil on fine stone. Same technique, but now with
            lighter pressure and more passes (10-15 per side). </p>
          <p>
            <strong>The finish line:</strong> The fine stone polishes the edge to final sharpness. After this stage, your knife should slice paper effortlessly and glide through tomato
            skin with zero pressure. </p>

          <h3>Step 8: Remove the Burr (Critical Final Step)</h3>
          <p>
            After fine stone, you&apos;ll have a micro-burr on the edge. Remove it with 3-5 very
            light trailing passes per side on fine stone, barely any pressure, just the weight of
            the knife. </p>
          <p>
            <strong>Alternative:</strong> Gently strop edge on leather belt or newspaper (5-10 passes
            per side). This removes burr and slightly polishes the edge. </p>

          <h3>Step 9: Test Your Edge</h3>
          <p>
            <strong>Paper test:</strong> Hold piece of paper vertically. Slice downward with knife. Properly sharpened knife slices cleanly with minimal pressure. If knife tears or won&apos;t
            bite, return to fine stone for more passes. </p>
          <p>
            <strong>Tomato test:</strong> The ultimate kitchen test. Place knife edge on tomato skin
            and draw across with zero downward pressure. Sharp knife glides through without crushing. </p>

          <h3>Step 10: Clean Up</h3>
          <p>
            Wipe stones clean with paper towels. Wash knife with soap and water. Dry thoroughly. Store Norton Tri-Stone in dry location. </p>

          <h2>Common Sharpening Mistakes (And How to Fix Them)</h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">

            <div className="mb-6">
              <h3 className="mt-0">❌ Mistake 1: Inconsistent Angle</h3>
              <p><strong>Result:</strong> Rounded edge that won&apos;t get sharp</p>
              <p><strong>Fix:</strong> Practice maintaining exact same angle throughout each stroke. Muscle memory develops with repetition. Focus on feeling the angle, not thinking about it.</p>
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
            At Purple Café, I maintained this schedule for 8-12 knives: </p>

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
              <strong>💡 Pro tip:</strong> Regular light sharpening beats infrequent heavy sharpening. Touch-ups on fine stone every few weeks remove less metal and extend knife lifespan compared
              to letting knife get very dull then using coarse stone. </p>
          </div>

          {/* Mid-Article CTA */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 my-8 text-center">
            <h3 className="mt-0 text-2xl font-bold mb-4">
              Ready for Professional-Quality Sharpening? </h3>
            <p className="mb-6">
              The Norton Tri-Stone I used for 6 years in a professional restaurant kitchen delivers
              exceptional results. </p>
            <CTAVisibilityTracker
              ctaId="blog-how-to-sharpen-with-tri-stone-review-cta-1"
              position="mid_article"
              productSlug="how-to-sharpen-with-tri-stone"
              merchant="internal"
            >
              <Link
                href="/reviews/norton-im200-tri-stone-sharpener"
                className="inline-block bg-orange-900 !text-white hover:bg-orange-800 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
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

            <li><strong>Listen to the sound:</strong> Consistent sharpening creates consistent sound. Changes in sound indicate angle changes. Train your ear.</li>

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
            abrasive do its work. </p>

        </div>

        <BlogFAQ questions={tristoneData.faq.questions} />

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
                <p className="text-slate-700 text-sm">
                  The sharpening system that survived 6 years of professional restaurant use, detailed review and techniques. </p>
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
                <p className="text-slate-700 text-sm">
                  The professional chef&apos;s knife that responds beautifully to proper sharpening techniques. </p>
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
                <p className="text-slate-700 text-sm">
                  Learn professional honing technique to maintain your sharp edge between sharpening sessions. </p>
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
                <p className="text-slate-700 text-sm">
                  Build your professional kitchen with chef-approved tools including knives and sharpening systems. </p>
              </Link>
            </CTAVisibilityTracker>
          </div>
        </div>

        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  );
}
