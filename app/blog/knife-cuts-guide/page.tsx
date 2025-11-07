import Link from 'next/link';
import { Metadata } from 'next';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/schema';
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker';
import { ChefHat, Target, Ruler, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: "Knife Cuts Guide: Julienne, Brunoise, Chiffonade",
  description: "Master classical knife cuts from a pro chef with 24 years restaurant experience. Learn julienne, brunoise, chiffonade, macedoine, paysanne with precision.",
  keywords: ["knife cuts", "julienne", "brunoise", "chiffonade", "knife skills", "knife techniques", "how to julienne", "how to brunoise", "classical knife cuts", "professional knife cuts"],
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/blog/knife-cuts-guide'
  }
};

const articleSchema = generateArticleSchema({
  headline: "Understanding Knife Cuts: Julienne, Brunoise, Chiffonade, and More",
  description: "Master classical knife cuts from a professional chef with 24 years of restaurant experience. Learn proper julienne, brunoise, chiffonade, and more—with techniques that actually work in real kitchens.",
  datePublished: "2025-10-17",
  dateModified: "2025-10-24",
  authorName: "Scott Bradley",
  imageUrl: "https://www.chefapprovedtools.com/images/knife-cuts-guide-og.jpg",
  urlPrefix: 'blog',
  urlSuffix: 'knife-cuts-guide'
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
  { name: "Understanding Knife Cuts", url: "https://www.chefapprovedtools.com/blog/knife-cuts-guide" }
]);

const faqSchema = generateFAQSchema([
  {
    question: "How long should it take to dice an onion?",
    answer: "Beginners: 5-8 minutes for medium dice. Intermediate: 2-3 minutes. Professional line cooks: 45-60 seconds. Speed comes from efficiency and muscle memory, not rushing."
  },
  {
    question: "Can I use a food processor instead of hand cutting?",
    answer: "For rough chop, yes. For precise cuts, no. Food processors create inconsistent pieces and turn some vegetables to mush. Hand cutting gives you control over size and texture."
  },
  {
    question: "What's the most important cut to master first?",
    answer: "Medium dice. It's the foundation for almost everything else, used constantly, and teaches all the basic principles. Once you can dice an onion properly, other cuts are just variations."
  }
]);

export default function KnifeCutsGuidePage() {
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
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Knife Skills</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Understanding Knife Cuts: Julienne, Brunoise, Chiffonade, and More
          </h1>
          <p className="text-xl text-slate-600">
            Master classical knife cuts—julienne, brunoise, chiffonade, and more. Professional techniques that actually work in real kitchens.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
            <span>By Chef Scott Bradley</span>
            <span>•</span>
            <span>October 24, 2025</span>
            <span>•</span>
            <span>12 min read</span>
          </div>
        </header>

        <div className="prose prose-lg prose-slate max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Restaurant Reality
            </p>
            <p className="mb-0">
              During my first week on the line at Purple Cafe, the chef handed me a bag of carrots and said &quot;I need a brunoise.&quot; I had no idea what that meant—at home we just called everything &quot;chopped.&quot; Within 10 minutes I learned that restaurant kitchens have precise vocabulary for knife cuts, and there are actual reasons why. Different cuts cook at different rates, look different on the plate, and affect texture. Today I&apos;m going to teach you the essential classical cuts that professional kitchens use, why they matter, and how to execute them efficiently.
            </p>
          </div>

          <p>
            Classical knife cuts seem pretentious to a lot of home cooks—like culinary school gatekeeping that doesn&apos;t matter in real life. Why can&apos;t you just call everything &quot;chopped&quot; or &quot;diced&quot;?
          </p>

          <p>
            The reality is that these standardized cuts exist for practical reasons: <strong>uniform pieces cook evenly, specific sizes create specific textures, and precise cutting makes food look professional.</strong> Once you understand the basic cuts, you&apos;ll cook better and faster because you&apos;ll stop having carrots that are burnt on the outside and raw in the middle.
          </p>

          <p>
            You don&apos;t need to be perfect. But knowing the vocabulary and the basic technique will improve your cooking immediately.
          </p>

          <h2>Why Standardized Cuts Matter</h2>

          <h3>1. Even Cooking</h3>

          <p>
            <strong>The problem:</strong> A carrot sliced in random sizes will have thin pieces that are mushy and thick pieces that are crunchy—all in the same dish.
          </p>

          <p>
            <strong>The solution:</strong> Uniform cuts cook at the same rate, finishing together. No more sorting through your food to find the properly cooked pieces.
          </p>

          <h3>2. Professional Appearance</h3>

          <p>
            Restaurant food looks better partly because of proper knife work. A salad with precise julienned vegetables looks intentional and elegant. A salad with random chunks looks sloppy.
          </p>

          <p>
            This matters even at home—we eat with our eyes first.
          </p>

          <h3>3. Predictable Cooking Times</h3>

          <p>
            When a recipe says &quot;dice the potatoes&quot; and you cut them into 2-inch chunks while the recipe assumes 1/2-inch dice, your timing will be completely wrong.
          </p>

          <p>
            Standardized cuts let recipes communicate accurately.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Important Reality Check
            </p>
            <p className="mb-0">
              Perfect knife cuts take practice. Your first attempts will be slower and less uniform than you&apos;d like. That&apos;s completely normal. I&apos;ve watched culinary students practice brunoise for weeks before getting consistent results. Focus on safety first, uniformity second, speed last.
            </p>
          </div>

          <h2 className="flex items-center gap-2">
            <Ruler className="w-6 h-6 text-orange-700" />
            The Essential Knife Cuts (with Actual Measurements)
          </h2>

          <h3>1. Julienne (&quot;Matchsticks&quot;)</h3>

          <p>
            <strong>Specifications:</strong> 1/8&quot; × 1/8&quot; × 2-2.5&quot; long
          </p>

          <p>
            <strong>Best for:</strong> Carrots in stir-fries, potatoes for pommes frites, bell peppers in salads, ginger and garlic (fine julienne)
          </p>

          <p>
            <strong>Why it matters:</strong> Thin cuts mean fast, even cooking. Perfect for high-heat, quick applications.
          </p>

          <h3>2. Brunoise (&quot;Tiny Dice&quot;)</h3>

          <p>
            <strong>Specifications:</strong> 1/8&quot; × 1/8&quot; × 1/8&quot; cubes
          </p>

          <p>
            <strong>Best for:</strong> Mirepoix in sauces, shallots in vinaigrettes, garnishes for soups, any application where vegetables should &quot;disappear&quot; into the dish
          </p>

          <p>
            <strong>Technical note:</strong> Brunoise starts as julienne, then you dice the julienne into cubes. It&apos;s a two-step process.
          </p>

          <h3>3. Chiffonade (&quot;Ribbons&quot;)</h3>

          <p>
            <strong>Specifications:</strong> Very thin ribbons/strips, typically 1/16&quot; to 1/8&quot; wide
          </p>

          <p>
            <strong>Best for:</strong> Fresh basil, spinach, lettuce, any leafy herb or green
          </p>

          <p>
            <strong>Technique:</strong> Stack leaves, roll tightly like a cigar, slice thin perpendicular to the roll.
          </p>

          <h3>4. Small Dice</h3>

          <p>
            <strong>Specifications:</strong> 1/4&quot; × 1/4&quot; × 1/4&quot; cubes
          </p>

          <p>
            <strong>Best for:</strong> Potatoes for hash, onions for salsas, vegetables for soups, standard &quot;diced&quot; preparations
          </p>

          <h3>5. Medium Dice</h3>

          <p>
            <strong>Specifications:</strong> 1/2&quot; × 1/2&quot; × 1/2&quot; cubes
          </p>

          <p>
            <strong>Best for:</strong> Roasted vegetables, stews and braises, hearty soups, general &quot;chopped&quot; applications
          </p>

          <h3>6. Large Dice</h3>

          <p>
            <strong>Specifications:</strong> 3/4&quot; × 3/4&quot; × 3/4&quot; cubes
          </p>

          <p>
            <strong>Best for:</strong> Long-cooking stews, roasted root vegetables, stocks (where pieces will be strained out), rustic preparations
          </p>

          <div className="bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-700" />
              Want My Complete Kitchen Setup Guide?
            </h3>
            <p className="mb-4">
              Get my free &quot;11 Essential Tools I Use Most&quot; PDF—the exact equipment I rely on after 24 years in professional kitchens, including the knives that make precise cuts effortless. No fluff, just the tools that actually matter.
            </p>
            <CTAVisibilityTracker
              ctaId="knife-cuts-newsletter-cta"
              position="mid_article"
              productSlug="knife-cuts-guide"
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

          <h2>Step-by-Step: How to Cut Julienne</h2>

          <p>
            <strong>Starting with a carrot</strong> (the classic learning vegetable):
          </p>

          <h3>Step 1: Create a Flat Side</h3>
          <ul>
            <li>Cut a thin slice lengthwise off one side of the carrot</li>
            <li>This creates a stable base so the carrot won&apos;t roll</li>
          </ul>

          <h3>Step 2: Square Off the Carrot</h3>
          <ul>
            <li>Cut the carrot into 2-2.5&quot; segments</li>
            <li>Slice thin layers off all four sides to create a rectangle</li>
            <li>Save the rounded trimmings for stock or soup</li>
          </ul>

          <h3>Step 3: Create Planks</h3>
          <ul>
            <li>Stand rectangle on end</li>
            <li>Slice downward into 1/8&quot; thick planks</li>
            <li>Stack planks on top of each other</li>
          </ul>

          <h3>Step 4: Create Matchsticks</h3>
          <ul>
            <li>Slice planks lengthwise into 1/8&quot; sticks</li>
            <li>You now have julienne</li>
          </ul>

          <p>
            <strong>Time investment:</strong> 5-8 minutes for one carrot when learning. With practice, 2-3 minutes.
          </p>

          <h2>Step-by-Step: How to Cut Brunoise</h2>

          <p>
            <strong>Starting with an onion:</strong>
          </p>

          <h3>Step 1: Halve and Peel</h3>
          <ul>
            <li>Cut onion in half through root end</li>
            <li>Peel off papery outer layers</li>
            <li>Leave root end intact (holds onion together)</li>
          </ul>

          <h3>Step 2: Make Horizontal Cuts</h3>
          <ul>
            <li>With onion flat side down, make horizontal cuts parallel to cutting board</li>
            <li>Cut from stem end toward (but not through) root end</li>
            <li>Make cuts 1/8&quot; apart</li>
            <li>Keep root end intact</li>
          </ul>

          <h3>Step 3: Make Vertical Cuts</h3>
          <ul>
            <li>Make vertical cuts perpendicular to board</li>
            <li>Again, 1/8&quot; apart</li>
            <li>Cut toward but not through root end</li>
            <li>Onion layers should still be connected at root</li>
          </ul>

          <h3>Step 4: Dice</h3>
          <ul>
            <li>Cut perpendicular to previous cuts (horizontally across the onion)</li>
            <li>1/8&quot; slices</li>
            <li>Results in 1/8&quot; × 1/8&quot; × 1/8&quot; cubes</li>
          </ul>

          <p>
            <strong>Time investment:</strong> 3-5 minutes for one onion when learning. With practice, 1-2 minutes.
          </p>

          <h2>Common Knife Mistakes and How to Fix Them</h2>

          <h3>Mistake #1: Dull Knife</h3>

          <p>
            <strong>Problem:</strong> Tearing instead of clean cuts, crushing vegetables, dangerous slipping
          </p>

          <p>
            <strong>Fix:</strong> Sharpen your knife regularly. A properly sharp knife is safer and more precise than a dull one.
          </p>

          <h3>Mistake #2: Wrong Grip</h3>

          <p>
            <strong>Problem:</strong> Poor control, tired hands, imprecise cuts
          </p>

          <p>
            <strong>Fix:</strong> Use proper <Link href="/blog/knife-skills-how-to-hold-chef-knife" className="text-orange-700 hover:text-orange-800">pinch grip</Link>—thumb and forefinger on blade, not handle. Gives maximum control.
          </p>

          <h3>Mistake #3: Unstable Cutting Board</h3>

          <p>
            <strong>Problem:</strong> Board slides around, dangerous, imprecise cuts
          </p>

          <p>
            <strong>Fix:</strong> Put damp towel under cutting board. Should never move.
          </p>

          <h3>Mistake #4: Going Too Fast</h3>

          <p>
            <strong>Problem:</strong> Inconsistent cuts, dangerous
          </p>

          <p>
            <strong>Fix:</strong> Slow down. Speed comes from efficiency of motion, not frantic chopping. Smooth, controlled cuts become fast naturally with practice.
          </p>

          <h2>When Precision Actually Matters (and When It Doesn&apos;t)</h2>

          <h3>Precision MATTERS for:</h3>

          <ul>
            <li><strong>Stir-fries:</strong> Uneven pieces = some burned, some raw</li>
            <li><strong>Gratins and layered dishes:</strong> Even slices = even cooking</li>
            <li><strong>Garnishes:</strong> Appearance is the entire point</li>
            <li><strong>Quick-cooking methods:</strong> Fast cooking exposes size inconsistencies</li>
            <li><strong>Professional presentation:</strong> When looks matter</li>
          </ul>

          <h3>Precision DOESN&apos;T matter for:</h3>

          <ul>
            <li><strong>Stocks and broths:</strong> Everything gets strained out</li>
            <li><strong>Pureed soups:</strong> Everything gets blended</li>
            <li><strong>Long braises:</strong> Hours of cooking makes size differences irrelevant</li>
            <li><strong>Food processor prep:</strong> Machine homogenizes everything</li>
            <li><strong>Rustic, home-style cooking:</strong> Where rough-hewn is the aesthetic</li>
          </ul>

          <p>
            <strong>The rule:</strong> Match your effort level to the application. Don&apos;t brunoise onions for a 6-hour beef stew—it&apos;s wasted precision.
          </p>

          <h2>Practice Exercises That Actually Work</h2>

          <h3>Exercise 1: The Onion Challenge</h3>

          <p>
            <strong>Goal:</strong> Consistent medium dice in under 3 minutes
          </p>

          <p>
            <strong>Method:</strong>
          </p>
          <ul>
            <li>Buy 5 onions</li>
            <li>Dice all 5 using proper technique</li>
            <li>Focus on uniformity first, speed second</li>
            <li>Freeze diced onions for later use (nothing wasted)</li>
          </ul>

          <h3>Exercise 2: Carrot Julienne</h3>

          <p>
            <strong>Goal:</strong> 1/8&quot; × 1/8&quot; matchsticks
          </p>

          <p>
            <strong>Method:</strong>
          </p>
          <ul>
            <li>Square off 3 carrots</li>
            <li>Create julienne from all 3</li>
            <li>Compare results—consistency improves with practice</li>
            <li>Use in stir-fry (practical application)</li>
          </ul>

          <h2 className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-orange-700" />
            The Bottom Line: Precision Where It Matters
          </h2>

          <p>
            After 24 years of professional cooking and thousands of hours of knife work, here&apos;s what I want home cooks to understand:
          </p>

          <p>
            <strong>Good knife skills aren&apos;t about perfection—they&apos;re about control and consistency.</strong>
          </p>

          <p>
            You don&apos;t need culinary school precision to cook great food at home. But understanding the basic cuts and knowing when to use them will make you a significantly better cook. Your vegetables will cook evenly. Your food will look intentional. Your recipes will work as written.
          </p>

          <p>
            <strong>The key lessons:</strong>
          </p>
          <ul>
            <li><strong>Start with medium dice</strong> – Foundation for everything else</li>
            <li><strong>Uniform cuts cook evenly</strong> – No more burnt and raw in same dish</li>
            <li><strong>Practice with cheap vegetables</strong> – Onions, carrots, potatoes</li>
            <li><strong>Focus on safety first</strong> – Speed comes naturally with practice</li>
            <li><strong>Know when to take shortcuts</strong> – Food processor for stocks, hand-cut for presentation</li>
          </ul>

          <p>
            Master medium dice. Everything else is just variations. Practice deliberately. Speed will come.
          </p>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Related Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/knife-skills-how-to-hold-chef-knife" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Knife Skills: How to Hold and Use a Chef&apos;s Knife
            </Link>
            <Link href="/blog/knife-safety-professional-kitchen" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Knife Safety in a Professional Kitchen
            </Link>
            <Link href="/blog/onions-cooking-guide" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Complete Guide to Cooking Onions
            </Link>
            <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-orange-700 hover:text-orange-800 font-semibold">
              → Victorinox Fibrox 8&quot; Chef&apos;s Knife Review
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
