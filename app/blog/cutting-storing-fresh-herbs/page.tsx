import Link from 'next/link';
import { Metadata } from 'next';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { Scissors, Leaf, Droplet, AlertTriangle, Lightbulb, Flame, Snowflake } from 'lucide-react';

export const metadata: Metadata = {
  title: "How To Cut & Store Fresh Herbs (Keep Them Fresh For Weeks)",
  description: "How to cut and store fresh herbs to keep them fresh for weeks. Professional techniques from 24 years in restaurant kitchens. Basil, cilantro, parsley tips.",
  keywords: ["cutting fresh herbs", "storing herbs", "herb storage", "fresh basil storage", "how to store cilantro", "keeping herbs fresh", "herb cutting techniques"],
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/blog/cutting-storing-fresh-herbs'
  }
};

const articleSchema = generateArticleSchema({
  headline: "Cutting and Storing Fresh Herbs: Professional Techniques for Maximum Flavor",
  description: "Master professional techniques for cutting, storing, and preserving fresh herbs. Learn why technique matters and how to keep herbs fresh for days.",
  datePublished: "2025-09-14",
  dateModified: "2025-10-24",
  authorName: "Scott Bradley",
  imageUrl: "https://www.chefapprovedtools.com/images/cutting-storing-fresh-herbs.jpg",
  urlPrefix: 'blog',
  urlSuffix: 'cutting-storing-fresh-herbs'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Cutting and Storing Fresh Herbs", url: "https://www.chefapprovedtools.com/blog/cutting-storing-fresh-herbs" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "How do I know if my herbs have gone bad?",
    answer: "Bad herbs show: slimy texture, dark brown/black color (not just on cut edges), moldy spots, or rotten smell. Slight wilting is okay (you can revive in cold water). But slime, mold, or bad smell = throw them out."
  },
  {
    question: "Can I store different herbs together?",
    answer: "Store similar herbs together (tender with tender, hardy with hardy), but keep strong-flavored herbs separate. Don't store basil with cilantro—flavors can transfer. Mint especially should be stored alone (it overpowers everything)."
  },
  {
    question: "Should I wash herbs before storing or before using?",
    answer: "Both methods work. Washing before storing means they're ready to use, but you MUST dry them completely (salad spinner). Washing just before using is safer if you're worried about moisture, but less convenient. Professional kitchens wash in the morning, dry completely, then store—ready when needed."
  },
  {
    question: "Why does my basil turn black in the refrigerator?",
    answer: "Basil is tropical and hates cold. Refrigeration causes cell damage (like frostbite), which leads to blackening. Store basil at room temperature (stems in water, loosely covered). It will last 3-5 days this way—longer than it would survive in the fridge."
  },
  {
    question: "Can I revive wilted herbs?",
    answer: "Yes, if they're just wilted (not slimy or brown). Trim stems, submerge entire herb in ice water for 10-15 minutes, then dry thoroughly and store properly. This rehydrates cells and perks them up. Works great for cilantro, parsley, and mint. Less effective for basil."
  },
  {
    question: "Are herb stems usable or should I throw them away?",
    answer: "Depends on the herb. Tender herb stems (cilantro, parsley) have great flavor—use in stocks, sauces, or chop finely with leaves. Basil stems are edible but texture is off—save for stocks. Woody stems (rosemary, thyme) are inedible—discard or save for smoking/grilling flavor."
  }
]);

export default function HerbsPage() {
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
            <Leaf className="w-5 h-5" />
            <span className="text-sm font-medium">Cooking Techniques</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Cutting and Storing Fresh Herbs: Professional Techniques for Maximum Flavor
          </h1>
          <p className="text-xl text-slate-600">
            Master professional techniques for cutting, storing, and preserving fresh herbs. Learn why technique matters and how to keep herbs fresh for days.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
            <span>By Chef Scott Bradley</span>
            <span>•</span>
            <span>October 24, 2025</span>
            <span>•</span>
            <span>8 min read</span>
          </div>
        </header>

        <div className="prose prose-lg prose-slate max-w-none">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl my-8 border-l-4 border-orange-600">
            <h3 className="text-white text-xl font-bold mt-0 mb-3">Restaurant Reality: The $50 Basil Massacre</h3>
            <p className="text-white mb-0 leading-relaxed">
              At Il Pizzaiolo, a new prep cook chopped an entire case of fresh basil with a dull knife. Within 30 minutes, every leaf had turned black from bruising and oxidation. Fifty dollars of perfect basil, destroyed. The head chef made him watch as we composted it, then handed him a sharp knife: &quot;Herbs are delicate. You&apos;re not chopping onions. Treat them with respect or you&apos;re just making expensive garbage.&quot; I never forgot that lesson.
            </p>
          </div>

          <p>
            Fresh herbs transform cooking. The difference between dried and fresh basil isn&apos;t subtle—it&apos;s the difference between flat, one-dimensional flavor and bright, aromatic complexity.
          </p>

          <p>
            But most home cooks handle herbs wrong. They chop with dull knives (bruising the herbs), store them incorrectly (causing rapid decay), and add them at the wrong times (destroying their delicate flavors).
          </p>

          <p>
            <strong>Professional kitchens treat herbs like the valuable ingredients they are.</strong> They use sharp knives, proper techniques, and smart storage to maximize flavor and freshness.
          </p>

          <p>
            Let me show you how to cut and store herbs the way professionals do—techniques that preserve flavor, extend freshness, and elevate your cooking.
          </p>

          <h2 className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-orange-700" />
            Why Technique Matters for Herbs
          </h2>

          <h3>Herbs Are Delicate</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Cell Structure</h4>
            Unlike dense vegetables (carrots, onions), herbs have delicate cell walls filled with aromatic essential oils. Damaging cells releases these oils—which is good for flavor, but bad for storage.
          </p>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Oxidation Sensitivity</h4>
            Damaged herb cells oxidize rapidly when exposed to air, turning brown or black and losing flavor within hours (sometimes minutes).
          </p>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">The Balance</h4>
            You want to release oils when adding herbs to dishes (flavor), but minimize cell damage during prep and storage (longevity).
          </p>

          <h3>Knife Sharpness Is Critical</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Sharp Knife = Clean Cut</h4>
            A sharp knife slices cleanly through herb cells with minimal crushing. Less cell damage = slower oxidation = fresher herbs longer.
          </p>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Dull Knife = Bruising</h4>
            A dull knife crushes and tears cells rather than cutting them. This releases oils prematurely and accelerates oxidation. Your basil turns black because your knife is dull, not because basil is temperamental.
          </p>

          <p className="italic">
            At Purple Café, we sharpened knives daily. The salad station used herbs constantly, and dull knives meant black basil and brown parsley within an hour. Sharp knives kept herbs green for 4-6 hours of service.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Critical
            </p>
            <p className="mb-0 text-slate-700">
              If your herbs turn brown or black quickly after cutting, your knife is dull. This is the #1 cause of herb failure in home kitchens.
            </p>
          </div>

          <h2 className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-orange-700" />
            Herb Categories &amp; Characteristics
          </h2>

          <h3>Tender Herbs (Delicate)</h3>

          <p>
            <strong>Examples:</strong> Basil, cilantro, parsley (flat-leaf), dill, tarragon, chervil
          </p>

          <p>
            <strong>Characteristics:</strong>
          </p>
          <ul>
            <li>Soft leaves</li>
            <li>High water content</li>
            <li>Bruise easily</li>
            <li>Oxidize quickly</li>
            <li>Best added at end of cooking</li>
          </ul>

          <p>
            <strong>Cutting Method:</strong>
          </p>
          <ul>
            <li>Very sharp knife or scissors</li>
            <li>Gentle pressure</li>
            <li>Larger pieces (chiffonade for basil, rough chop for others)</li>
          </ul>

          <p>
            <strong>Storage:</strong>
          </p>
          <ul>
            <li>Like flowers: stems in water, covered loosely</li>
            <li>Or: wrapped in damp paper towel in container</li>
            <li>Use within 3-5 days</li>
          </ul>

          <h3>Hardy Herbs (Sturdy)</h3>

          <p>
            <strong>Examples:</strong> Rosemary, thyme, sage, oregano, marjoram
          </p>

          <p>
            <strong>Characteristics:</strong>
          </p>
          <ul>
            <li>Woody stems</li>
            <li>Lower water content</li>
            <li>More resistant to bruising</li>
            <li>Longer shelf life</li>
            <li>Can withstand longer cooking</li>
          </ul>

          <p>
            <strong>Cutting Method:</strong>
          </p>
          <ul>
            <li>Sharp knife still important but less critical</li>
            <li>Can chop finely</li>
            <li>Strip leaves from woody stems first</li>
          </ul>

          <p>
            <strong>Storage:</strong>
          </p>
          <ul>
            <li>Wrapped in damp paper towel in ziplock bag</li>
            <li>Or: bundled and hung to dry</li>
            <li>Lasts 1-2 weeks refrigerated</li>
          </ul>

          <h3>In-Between Herbs</h3>

          <p>
            <strong>Examples:</strong> Mint, parsley (curly), chives
          </p>

          <p>
            <strong>Characteristics:</strong>
          </p>
          <ul>
            <li>Sturdier than tender herbs</li>
            <li>More delicate than hardy herbs</li>
            <li>Moderate oxidation</li>
          </ul>

          <p>
            <strong>Cutting Method:</strong>
          </p>
          <ul>
            <li>Sharp knife recommended</li>
            <li>Can handle finer chopping than tender herbs</li>
          </ul>

          <p>
            <strong>Storage:</strong>
          </p>
          <ul>
            <li>Stems in water (mint, parsley)</li>
            <li>Or wrapped in damp paper towel</li>
            <li>Lasts 5-7 days</li>
          </ul>

          <h2>Cutting Techniques by Herb Type</h2>

          <h3>Basil (Chiffonade Method)</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why This Technique:</h4>
            Basil bruises easily and oxidizes almost instantly. Chiffonade minimizes cell damage by using very sharp knife and stacking leaves to cut through multiple layers at once with fewer strokes.
          </p>

          <p>
            <strong>How to Do It:</strong>
          </p>
          <ol>
            <li>Wash and thoroughly dry basil (water accelerates oxidation)</li>
            <li>Stack 5-6 leaves on top of each other</li>
            <li>Roll stack tightly like a cigar</li>
            <li>Using very sharp knife, slice across the roll in thin ribbons (1-2mm)</li>
            <li>Use immediately or toss with olive oil to slow oxidation</li>
          </ol>

          <p>
            <strong>Common Mistakes:</strong>
          </p>
          <ul>
            <li>Using dull knife (crushing instead of cutting)</li>
            <li>Cutting too early (basil oxidizes in 10-15 minutes)</li>
            <li>Washing but not drying completely</li>
          </ul>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Pro Tip:</h4>
            At Il Pizzaiolo, we cut basil to order during service. It took 30 seconds but kept basil bright green. Planning ahead meant cutting with acid (for marinara) or oil (for garnish).
          </p>

          <h3>Cilantro and Parsley (Bunch Method)</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why This Technique:</h4>
            Cilantro and parsley have tender leaves but sturdy stems. Grouping stems together allows efficient chopping while maintaining control.
          </p>

          <p>
            <strong>How to Do It:</strong>
          </p>
          <ol>
            <li>Wash and dry herbs</li>
            <li>Group stems together, leaves aligned</li>
            <li>Hold bundle at stem end</li>
            <li>Chop leaves with sharp knife using rocking motion</li>
            <li>Discard stems or save for stocks</li>
          </ol>

          <p>
            <strong>Options:</strong>
          </p>
          <ul>
            <li><strong>Rough chop:</strong> Larger pieces for garnish</li>
            <li><strong>Fine chop:</strong> Smaller pieces for mixing into dishes</li>
          </ul>

          <p>
            <strong>Common Mistakes:</strong>
          </p>
          <ul>
            <li>Including too much stem (bitter flavor)</li>
            <li>Chopping with wet leaves (bruising)</li>
            <li>Over-chopping (releases too much juice, becomes slimy)</li>
          </ul>

          <h3>Chives (Snip Method)</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why This Technique:</h4>
            Chives are hollow and delicate. Cutting with a knife crushes them; scissors provide cleaner cuts.
          </p>

          <p>
            <strong>How to Do It:</strong>
          </p>
          <ol>
            <li>Wash and dry chives</li>
            <li>Bundle 10-15 chives together</li>
            <li>Use sharp kitchen scissors to snip into small pieces (2-3mm)</li>
            <li>Cut directly over dish when possible</li>
          </ol>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Alternative:</h4>
            Very sharp knife can work, but scissors are faster and give cleaner cuts.
          </p>

          <h3>Hardy Herbs (Strip and Chop)</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why This Technique:</h4>
            Woody stems are inedible and must be removed before chopping leaves.
          </p>

          <p>
            <strong>How to Do It:</strong>
          </p>
          <ol>
            <li>Hold herb stem at top with one hand</li>
            <li>With other hand, pinch stem and pull downward, stripping leaves off</li>
            <li>Discard woody stems</li>
            <li>Pile leaves and chop finely or leave whole</li>
          </ol>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">For Rosemary:</h4>
            Rosemary leaves are tough. After stripping, mince very finely or use whole sprigs (remove before serving).
          </p>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">For Thyme:</h4>
            Thyme leaves are tiny. Strip from stems directly into dish, or strip onto cutting board and gather.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
            <p className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              Pro Tip
            </p>
            <p className="mb-0 text-slate-700">
              At Feierabend, we prepped hardy herbs (rosemary, thyme, sage) in the morning for all-day use. But tender herbs (basil, cilantro) were prepped to order. Know which herbs can handle prep ahead vs. which need last-minute cutting.
            </p>
          </div>

          <h2 className="flex items-center gap-2">
            <Droplet className="w-6 h-6 text-orange-700" />
            Storage Techniques That Actually Work
          </h2>

          <h3>Method #1: Stems in Water (Best for Cilantro, Parsley, Mint)</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why It Works:</h4>
            Treats herbs like flowers, keeping them hydrated through stems while protecting leaves.
          </p>

          <p>
            <strong>How to Do It:</strong>
          </p>
          <ol>
            <li>Trim 1/2 inch from stem bottoms (fresh cut absorbs water better)</li>
            <li>Place stems in glass or jar with 1-2 inches of water</li>
            <li>Cover loosely with plastic bag</li>
            <li>Refrigerate (except basil—store at room temperature)</li>
            <li>Change water every 2-3 days</li>
            <li>Lasts 1-2 weeks</li>
          </ol>

          <p>
            <strong>Best For:</strong>
          </p>
          <ul>
            <li>Cilantro (stays fresh 10-14 days)</li>
            <li>Parsley (stays fresh 1-2 weeks)</li>
            <li>Mint (stays fresh 1 week)</li>
          </ul>

          <p>
            <strong>Don&apos;t Use For:</strong>
          </p>
          <ul>
            <li>Basil (refrigeration causes blackening—store at room temp)</li>
          </ul>

          <h3>Method #2: Damp Paper Towel Wrap (Universal Method)</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why It Works:</h4>
            Maintains humidity without creating condensation that causes rot. The paper towel absorbs excess moisture while keeping herbs from drying out.
          </p>

          <p>
            <strong>How to Do It:</strong>
          </p>
          <ol>
            <li>Wash herbs and dry gently (important!)</li>
            <li>Lay herbs on damp (not wet) paper towel</li>
            <li>Roll loosely</li>
            <li>Place in plastic bag or container</li>
            <li>Refrigerate</li>
            <li>Lasts 5-7 days</li>
          </ol>

          <p>
            <strong>Best For:</strong>
          </p>
          <ul>
            <li>Rosemary, thyme, sage</li>
            <li>Basil (at room temperature)</li>
            <li>Oregano, marjoram</li>
          </ul>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Pro Tip:</h4>
            Check paper towel every 2-3 days. If it&apos;s too wet, replace with fresh damp towel. Too much moisture = slime and rot.
          </p>

          <h3>Method #3: Oil Preservation (Basil Specialty)</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why It Works:</h4>
            Oil blocks oxygen exposure, slowing oxidation dramatically. Also creates usable product (herb oil).
          </p>

          <p>
            <strong>How to Do It:</strong>
          </p>
          <ol>
            <li>Wash and dry basil completely</li>
            <li>Rough chop or leave leaves whole</li>
            <li>Place in container</li>
            <li>Cover completely with olive oil</li>
            <li>Refrigerate</li>
            <li>Lasts 1-2 weeks</li>
          </ol>

          <p>
            <strong>Uses:</strong>
          </p>
          <ul>
            <li>Basil oil for pasta, pizza, salads</li>
            <li>Remove leaves as needed for cooking</li>
            <li>Oil becomes infused (bonus!)</li>
          </ul>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Caution:</h4>
            Must be refrigerated. Herb + oil at room temperature can allow botulism growth.
          </p>

          <p className="italic">
            At Purple Café, we made herb oils daily: basil oil, parsley oil, cilantro oil. They lasted longer than fresh herbs and added flavor to finishing dishes.
          </p>

          <h3>Method #4: Freezing (Long-Term Storage)</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why It Works:</h4>
            Freezing stops oxidation and decay. While texture changes, flavor remains largely intact.
          </p>

          <p>
            <strong>Ice Cube Method:</strong>
          </p>
          <ol>
            <li>Chop herbs finely</li>
            <li>Place in ice cube tray</li>
            <li>Fill with water or olive oil</li>
            <li>Freeze</li>
            <li>Pop out cubes as needed for cooking</li>
            <li>Lasts 3-6 months</li>
          </ol>

          <p>
            <strong>Best For:</strong>
          </p>
          <ul>
            <li>Hardy herbs (rosemary, thyme, sage, oregano)</li>
            <li>Using in cooked dishes (soups, stews, sauces)</li>
          </ul>

          <p>
            <strong>Don&apos;t Use For:</strong>
          </p>
          <ul>
            <li>Fresh garnishes (texture is destroyed)</li>
            <li>Delicate herbs that need bright flavor (basil, cilantro)</li>
          </ul>

          <h3>Method #5: Drying (Preservation Method)</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why It Works:</h4>
            Removes moisture that causes decay. Changes flavor profile (concentrates some flavors, loses others).
          </p>

          <p>
            <strong>How to Do It:</strong>
          </p>
          <ol>
            <li>Wash and dry herbs completely</li>
            <li>Tie stems in small bundles</li>
            <li>Hang upside down in dark, warm, dry place</li>
            <li>Or: lay on screen in single layer</li>
            <li>Dry until crumbly (1-2 weeks)</li>
            <li>Store in airtight container away from light</li>
          </ol>

          <p>
            <strong>Best For:</strong>
          </p>
          <ul>
            <li>Rosemary, thyme, oregano, sage</li>
            <li>Bay leaves</li>
          </ul>

          <p>
            <strong>Terrible For:</strong>
          </p>
          <ul>
            <li>Basil (turns brown, loses flavor)</li>
            <li>Cilantro (loses all flavor)</li>
            <li>Parsley (becomes bland)</li>
          </ul>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-6 my-8 rounded-r-lg">
            <p className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-cyan-700" />
              Chef&apos;s Insight
            </p>
            <p className="mb-0 text-slate-700">
              At Mellow Mushroom, we grew our own basil and always had excess. Freezing in oil cubes worked perfectly for pizza sauce, but for fresh applications, nothing beats fresh basil. Know what you&apos;re using herbs for, then store accordingly.
            </p>
          </div>

          <h2>Washing and Drying Herbs</h2>

          <h3>Why It Matters</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Dirt and Debris</h4>
            Herbs (especially cilantro and parsley) often have dirt, sand, or debris hidden in leaves.
          </p>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">But Water = Oxidation</h4>
            Wet herbs oxidize faster and become slimy in storage. You must dry them thoroughly.
          </p>

          <h3>Proper Washing Technique</h3>

          <ol>
            <li>Fill large bowl with cold water</li>
            <li>Submerge herbs and agitate gently</li>
            <li>Lift herbs out (dirt sinks to bottom)</li>
            <li>Repeat if water is dirty</li>
            <li>Never run herbs under direct stream (damages leaves)</li>
          </ol>

          <h3>Drying Methods</h3>

          <p>
            <strong>Salad Spinner (Best Method):</strong>
          </p>
          <ol>
            <li>Place washed herbs in salad spinner</li>
            <li>Spin until no water droplets remain</li>
            <li>Most efficient method for large quantities</li>
          </ol>

          <p>
            <strong>Paper Towel Pat Dry:</strong>
          </p>
          <ol>
            <li>Lay herbs on clean kitchen towel or paper towels</li>
            <li>Pat gently (don&apos;t rub)</li>
            <li>Let air dry 5-10 minutes</li>
            <li>Good for small quantities</li>
          </ol>

          <p>
            <strong>Air Dry:</strong>
          </p>
          <ol>
            <li>Spread on clean towel in single layer</li>
            <li>Let air dry 20-30 minutes</li>
            <li>Only for herbs you&apos;ll use immediately</li>
          </ol>

          <p className="italic">
            At Paragary&apos;s, we washed all herbs in the morning, spun them completely dry, then stored using appropriate methods. Taking time to dry properly saved us from throwing out slimy herbs later.
          </p>

          <h2>When to Add Herbs to Dishes</h2>

          <h3>Tender Herbs: End of Cooking</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why:</h4>
            Heat destroys delicate flavors and aromas. Add at the very end (last 30 seconds to 2 minutes).
          </p>

          <p>
            <strong>Examples:</strong>
          </p>
          <ul>
            <li>Basil: Add seconds before serving</li>
            <li>Cilantro: Garnish after plating</li>
            <li>Parsley (flat-leaf): Finish dish just before serving</li>
            <li>Dill: Add at end</li>
          </ul>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Exception:</h4>
            Infusing tender herbs in warm (not hot) liquids for flavor extraction (like basil in tomato sauce that&apos;s been removed from heat).
          </p>

          <h3>Hardy Herbs: Beginning to Middle of Cooking</h3>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Why:</h4>
            Woody herbs can handle heat and actually benefit from cooking time to release flavors.
          </p>

          <p>
            <strong>Examples:</strong>
          </p>
          <ul>
            <li>Rosemary: Add early in braising or roasting</li>
            <li>Thyme: Add to soups and stews at beginning</li>
            <li>Bay leaves: Add early, remove before serving</li>
            <li>Sage: Can handle sautéing</li>
          </ul>

          <p>
            <h4 className="font-semibold text-slate-900 mb-2">Method:</h4>
            Tie hardy herbs in cheesecloth (&quot;bouquet garni&quot;) for easy removal later.
          </p>

          <h2>FAQ About Cutting and Storing Herbs</h2>

          <div itemScope itemType="https://schema.org/FAQPage">
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="mb-6">
              <h3 itemProp="name" className="font-bold text-slate-900">How do I know if my herbs have gone bad?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text">
                  <p>Bad herbs show: slimy texture, dark brown/black color (not just on cut edges), moldy spots, or rotten smell. Slight wilting is okay (you can revive in cold water). But slime, mold, or bad smell = throw them out.</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="mb-6">
              <h3 itemProp="name" className="font-bold text-slate-900">Can I store different herbs together?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text">
                  <p>Store similar herbs together (tender with tender, hardy with hardy), but keep strong-flavored herbs separate. Don&apos;t store basil with cilantro—flavors can transfer. Mint especially should be stored alone (it overpowers everything).</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="mb-6">
              <h3 itemProp="name" className="font-bold text-slate-900">Should I wash herbs before storing or before using?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text">
                  <p>Both methods work. Washing before storing means they&apos;re ready to use, but you MUST dry them completely (salad spinner). Washing just before using is safer if you&apos;re worried about moisture, but less convenient. Professional kitchens wash in the morning, dry completely, then store—ready when needed.</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="mb-6">
              <h3 itemProp="name" className="font-bold text-slate-900">Why does my basil turn black in the refrigerator?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text">
                  <p>Basil is tropical and hates cold. Refrigeration causes cell damage (like frostbite), which leads to blackening. Store basil at room temperature (stems in water, loosely covered). It will last 3-5 days this way—longer than it would survive in the fridge.</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="mb-6">
              <h3 itemProp="name" className="font-bold text-slate-900">Can I revive wilted herbs?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text">
                  <p>Yes, if they&apos;re just wilted (not slimy or brown). Trim stems, submerge entire herb in ice water for 10-15 minutes, then dry thoroughly and store properly. This rehydrates cells and perks them up. Works great for cilantro, parsley, and mint. Less effective for basil.</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="mb-6">
              <h3 itemProp="name" className="font-bold text-slate-900">Are herb stems usable or should I throw them away?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text">
                  <p>Depends on the herb. Tender herb stems (cilantro, parsley) have great flavor—use in stocks, sauces, or chop finely with leaves. Basil stems are edible but texture is off—save for stocks. Woody stems (rosemary, thyme) are inedible—discard or save for smoking/grilling flavor.</p>
                </div>
              </div>
            </div>
          </div>

          <h2>The Bottom Line on Herbs</h2>

          <p>
            Fresh herbs elevate cooking from good to great—but only if you handle them properly. The difference between professional results and disappointing herbs comes down to:
          </p>

          <ol>
            <li><strong>Sharp knife</strong> (clean cuts, minimal bruising)</li>
            <li><strong>Gentle handling</strong> (herbs are delicate)</li>
            <li><strong>Proper storage</strong> (stems in water or damp paper towel)</li>
            <li><strong>Timing</strong> (tender herbs at end, hardy herbs at beginning)</li>
            <li><strong>Complete drying after washing</strong> (moisture = oxidation and slime)</li>
          </ol>

          <p>
            Professional kitchens don&apos;t have secret herb magic. We just treat herbs with the respect they deserve: sharp tools, proper technique, and smart storage.
          </p>

          <p>
            The next time you buy fresh basil or cilantro, don&apos;t just throw it in the fridge and hope it survives. Trim the stems, put them in water, cover loosely, and use a sharp knife when you&apos;re ready to cut.
          </p>

          <p>
            Your herbs will last longer, taste better, and transform your cooking.
          </p>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
          <h3 className="text-white text-2xl font-bold mb-3">Want More Professional Cooking Techniques?</h3>
          <p className="text-white mb-6 leading-relaxed">
            Join 5,000+ home cooks getting my weekly email with professional techniques, ingredient handling tips, and equipment recommendations from 24 years in restaurant kitchens.
          </p>
          <CTAVisibilityTracker
            ctaId="cutting-storing-fresh-herbs-newsletter-cta"
            position="final_cta"
            productSlug="cutting-storing-fresh-herbs"
            merchant="internal"
          >
            <Link
              href="/newsletter"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
            >
              Get the Newsletter →
            </Link>
          </CTAVisibilityTracker>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/oxidization-effect-on-food" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Oxidization&apos;s Effect on Food
            </Link>
            <Link href="/blog/how-acid-helps-cooking" className="text-orange-700 hover:text-orange-800 font-semibold">
              → How Acid Helps in Cooking
            </Link>
            <Link href="/blog/mis-en-place" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Mis en Place Guide
            </Link>
            <Link href="/guides/best-chef-knives" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Best Chef Knives Guide
            </Link>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="text-xl font-bold text-slate-900 mb-2">About Scott Bradley</h4>
              <p className="text-slate-700 mb-3">
                Scott Bradley is a professional chef with 45 years of cooking experience, including 24 years in professional kitchens. He served as Kitchen Manager at Mellow Mushroom in Athens, GA, and held line positions at Purple Café, Feierabend, Il Pizzaiolo (Seattle), and Paragary&apos;s (Sacramento).
              </p>
              <p className="text-slate-700 mb-3">
                At Il Pizzaiolo, Scott learned proper herb handling was non-negotiable—black basil couldn&apos;t go on pizza, and wilted cilantro ruined presentations. He developed systems for herb prep and storage that kept ingredients fresh through long service periods.
              </p>
              <p className="text-slate-700 mb-3">
                He holds an A.A.S. in Culinary Arts from Seattle Central College and a B.S. in Business Administration from the University of Montana.
              </p>
              <p className="text-slate-700">
                Scott&apos;s approach to ingredients emphasizes respect for quality through proper technique—fresh herbs deserve sharp knives and correct storage to reach their full potential.
              </p>
              <p className="text-sm text-slate-500 italic mt-4">Last updated: October 24, 2025</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
