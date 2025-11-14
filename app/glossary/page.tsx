import { Metadata } from 'next'
import Link from 'next/link'
import { Book, Search, ChevronRight } from 'lucide-react'
import { getPageMetadata } from '@/data/metadata'

const pageMetadata = getPageMetadata('glossary')

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: {
    canonical: pageMetadata.canonical,
  },
  openGraph: {
    title: pageMetadata.title,
    description: pageMetadata.description,
    url: pageMetadata.canonical,
    siteName: 'Chef Approved Tools',
    images: pageMetadata.imageUrl ? [{
      url: pageMetadata.imageUrl,
      alt: pageMetadata.imageAlt || pageMetadata.title,
    }] : undefined,
    type: 'website',
  },
}

const knifeCuts = [
  {
    french: "Baton",
    american: "Large Stick",
    slang: "Thick Sticks",
    description: "Large stick cuts, 3/4\" x 3/4\" x 2.5\" long. Thicker than bâtonnet, used for vegetables that need longer cooking times.",
    technique: "Square off the vegetable, cut into 2-3\" planks, then cut planks into 3/4\" thick sticks.",
    uses: ["Thick-cut fries", "Roasted root vegetables", "Rustic preparations", "Longer braising dishes"]
  },
  {
    french: "Bâtonnet",
    american: "Stick Cut",
    slang: "Crudité",
    description: "1/4\" x 1/4\" x 2.5\" sticks. Slightly thicker than julienne, perfect for French fries and crudités.",
    technique: "Similar to julienne but with 1/4\" thickness instead of 1/8\".",
    uses: ["French fries", "Vegetable sticks", "Even roasting", "Crudité platters"]
  },
  {
    french: "Julienne",
    american: "Matchstick",
    slang: "Allumette",
    description: "Thin matchstick cuts, typically 1/8\" x 1/8\" x 2.5\" long. Used for vegetables like carrots, bell peppers, and potatoes.",
    technique: "Square off the vegetable, cut into 2-3\" planks, stack planks and cut into thin strips.",
    uses: ["Stir-fries", "Garnishes", "Salads", "Even cooking"]
  },
  {
    french: "Fine Julienne",
    american: "Fine Matchstick",
    slang: "Ultra-fine",
    description: "Ultra-thin matchstick cuts, 1/8\" x 1/8\" x 2.5\" long. More delicate than standard julienne.",
    technique: "Same as julienne but with more precise, thinner cuts requiring sharp knife and steady hand.",
    uses: ["Fine garnishes", "Delicate stir-fries", "Professional plating", "Quick-cooking applications"]
  },
  {
    french: "Carre",
    american: "Large Dice",
    slang: "Sugar Cube Size",
    description: "3/4\" x 3/4\" x 3/4\" cubes. Used when you want distinct vegetable pieces in the final dish.",
    technique: "Same technique as other dices, just larger spacing between cuts.",
    uses: ["Roasted vegetables", "Stews", "Rustic preparations"]
  },
  {
    french: "Parmentier",
    american: "Medium Dice",
    slang: "Small Marble Size",
    description: "1/2\" x 1/2\" x 1/2\" cubes. Good for heartier dishes with longer cooking times.",
    technique: "Same as small dice but with 1/2\" spacing between cuts.",
    uses: ["Roasting", "Braising", "Chunky soups", "Rustic dishes"]
  },
  {
    french: "Macedoine",
    american: "Small Dice",
    slang: "Pea-sized",
    description: "1/4\" x 1/4\" x 1/4\" cubes. Most common dice size for home cooking.",
    technique: "Make parallel cuts 1/4\" apart, turn 90°, repeat, then slice perpendicular.",
    uses: ["Soups", "Stews", "Sautéing", "Most recipe applications"]
  },
  {
    french: "Brunoise",
    american: "Fine Dice",
    slang: "Tiny Cubes",
    description: "Fine dice, 1/8\" x 1/8\" x 1/8\" cubes. The smallest standard dice cut used in professional kitchens.",
    technique: "Start with julienne cuts, then cut perpendicular to create tiny, uniform cubes.",
    uses: ["Mirepoix", "Garnishes", "Sauces", "Professional presentation"]
  },
  {
    french: "Fine brunoise",
    american: "Ultra-fine Dice",
    slang: "Microscopic",
    description: "Extremely fine dice, 1/16\" x 1/16\" x 1/16\" cubes. The finest precision cut in professional kitchens.",
    technique: "Start with fine julienne, then cut perpendicular with razor-sharp knife and extreme precision.",
    uses: ["Fine herb garnishes", "Sauce components", "High-end plating", "Delicate flavoring"]
  },
  {
    french: "Chiffonade",
    american: "Ribbon",
    slang: "Herb Confetti",
    description: "Thin ribbon cuts for leafy herbs and vegetables. Creates delicate strips perfect for garnishing.",
    technique: "Stack leaves, roll tightly like a cigar, then slice perpendicular to create ribbons.",
    uses: ["Basil garnish", "Lettuce for tacos or sandwiches", "Herb finishing", "Asian preparations"]
  },
  {
    french: "Lyonaisse",
    american: "Half-Moon",
    slang: "Onion Julienne",
    description: "Used mostly for caramelized or pickled onions. Some people refer to this cut of onions as julienne.",
    technique: "Cut onion in half from root to tip, then slice parallel to the cutting board to create half-moon shapes.",
    uses: ["Caramelized onions", "Pickled onions", "French onion soup", "Sautéed onion preparations"]
  },
  {
    french: "Slice",
    american: "Slice",
    slang: "Rings",
    description: "Somewhat vague but commonly used. For onions would be cutting into thin rings or half rings.",
    technique: "Cut straight down through the ingredient, creating thin, even pieces of desired thickness.",
    uses: ["Onion rings", "Tomato slices", "Sandwich preparations", "Layered dishes"]
  },
  {
    french: "Wedge Cut",
    american: "Wedge",
    slang: "Triangles",
    description: "Think wedged tomatoes for a salad, or wedged limes for tacos.",
    technique: "Cut ingredient into triangular pieces, usually by cutting in half, then cutting each half into 3-4 triangular pieces.",
    uses: ["Tomato wedges for salads", "Lime wedges for garnish", "Potato wedges", "Citrus garnishes"]
  },
  {
    french: "Mince",
    american: "Mince",
    slang: "Chopped Fine",
    description: "Generally used for garlic or onions. Technically a fine brunoise but hard to achieve perfect squares with certain ingredients.",
    technique: "Chop repeatedly with rocking motion until very fine, almost paste-like consistency.",
    uses: ["Garlic", "Ginger", "Herbs for maximum flavor release", "Aromatic base ingredients"]
  },
  {
    french: "Emincer",
    american: "Shave",
    slang: "Paper-thin",
    description: "Very thin cut for onions or shallots, think almost shaved.",
    technique: "Using very sharp knife, slice as thinly as possible, creating paper-thin slices.",
    uses: ["Shallots for vinaigrettes", "Raw onion preparations", "Delicate garnishes", "Quick-cooking applications"]
  },
  {
    french: "Rondelle",
    american: "Round",
    slang: "Coin",
    description: "Round slices of cylindrical vegetables. Thickness varies by cooking method and preference.",
    technique: "Slice straight down through round vegetables like carrots, cucumbers, or zucchini.",
    uses: ["Coins for sautéing", "Garnishes", "Layered dishes", "Quick cooking"]
  },
  {
    french: "Biais",
    american: "Bias",
    slang: "Diagonal",
    description: "Diagonal cuts that create oval-shaped pieces with more surface area for faster, even cooking.",
    technique: "Hold knife at 45° angle to the ingredient and slice through.",
    uses: ["Carrots", "Celery", "Asparagus", "Asian stir-fries"]
  },
  {
    french: "Oblique",
    american: "Roll",
    slang: "Turn",
    description: "Diagonal cut used to make evenly sized pieces out of uneven vegetables like carrots. Allows them to cook evenly.",
    technique: "Cut at an angle, then roll the vegetable 1/4 turn and cut again, creating triangular pieces of uniform size.",
    uses: ["Carrots for even cooking", "Root vegetables", "Asian preparations", "Braising vegetables"]
  },
  {
    french: "Tournee",
    american: "Turned",
    slang: "Football",
    description: "Seven-sided oblong shape. Traditional French cut creating football-shaped vegetables.",
    technique: "Using a turning knife, carefully carve seven equal sides around the vegetable to create uniform barrel shape.",
    uses: ["Potatoes (most common)", "Classical French preparations", "Fine dining presentation", "Garnishes"]
  },
  {
    french: "Paysanne",
    american: "Country-style",
    slang: "Rustic",
    description: "More rustic cut for round vegetables (basically a rondelle) and for other vegetables, think red pepper cut into thinner square pieces.",
    technique: "For round vegetables, cut into thick coins. For other vegetables, cut into roughly uniform 1/2\" squares or triangles.",
    uses: ["Rustic soups", "Country-style dishes", "Casual preparations", "Hearty stews"]
  },
  {
    french: "Rough Chop",
    american: "Concassé",
    slang: "Chunky Cut",
    description: "Informal, uneven cuts about 1/4\" to 3/4\" pieces. Used when appearance doesn't matter.",
    technique: "Quick, informal chopping without focus on uniformity.",
    uses: ["Stocks", "Braising vegetables", "Food processor prep", "Rustic dishes"]
  }
]

const glossaryTerms = [
  {
    term: "NSF Certified",
    definition: "Equipment approved by NSF International for commercial food service use. NSF certification means the item meets strict standards for durability, cleanability, and food safety required in professional kitchens.",
    whyItMatters: "NSF-certified equipment is built to withstand the abuse of commercial kitchens - if it can survive a restaurant, it&apos;ll last decades in your home.",
    examples: ["Cutting boards", "Mixers", "Food processors"]
  },
  {
    term: "Full Tang",
    definition: "A knife construction where the metal blade extends fully through the handle, providing maximum strength and balance. You can see the metal edges along the top and bottom of the handle.",
    whyItMatters: "Full tang knives are virtually indestructible and perfectly balanced. They won&apos;t break at the handle junction like cheaper knives.",
    examples: ["Wüsthof Classic series", "Professional chef knives"],
    linkText: "See our Wüsthof Classic IKON review",
    linkUrl: "/reviews/wusthof-classic-ikon-16-piece"
  },
  {
    term: "Forged vs Stamped",
    definition: "Forged knives are heated and hammered into shape, creating stronger, more durable blades. Stamped knives are cut from flat steel sheets like a cookie cutter.",
    whyItMatters: "Forged knives hold their edge longer, feel more substantial, and perform better under heavy use. Stamped knives are lighter but less durable.",
    examples: ["Forged: Wüsthof, Henckels", "Stamped: Most budget knives"]
  },
  {
    term: "Tri-Ply Construction",
    definition: "Cookware with three layers: aluminum core sandwiched between stainless steel. The aluminum conducts heat evenly while stainless steel provides durability and non-reactive cooking surface.",
    whyItMatters: "Eliminates hot spots that burn food. Heats evenly from edge to edge, just like professional restaurant cookware.",
    examples: ["All-Clad D3", "Cuisinart Multiclad Pro"]
  },
  {
    term: "Enameled Cast Iron",
    definition: "Cast iron cookware coated with a glass-like enamel surface. Combines cast iron&apos;s heat retention with a non-reactive, easy-to-clean surface that doesn&apos;t require seasoning.",
    whyItMatters: "Gets the benefits of cast iron (even heating, heat retention) without the maintenance. Perfect for acidic foods like tomato sauces.",
    examples: ["Le Creuset", "Staub Dutch ovens"],
    linkText: "Read our Le Creuset Dutch Oven review",
    linkUrl: "/reviews/le-creuset-signature-7-25-qt-dutch-oven"
  },
  {
    term: "HRC (Rockwell Hardness)",
    definition: "A scale measuring steel hardness. Kitchen knives typically range from 54-62 HRC. Higher numbers mean harder steel that holds a sharper edge longer but is more difficult to sharpen.",
    whyItMatters: "Helps you understand edge retention vs. ease of sharpening. German knives (~58 HRC) balance both, Japanese knives (~60-62 HRC) prioritize sharpness.",
    examples: ["German knives: 56-58 HRC", "Japanese knives: 60-62 HRC"]
  },
  {
    term: "Commercial-Grade",
    definition: "Equipment built to NSF standards for continuous restaurant use. Typically features heavier construction, more powerful motors, and materials that withstand constant cleaning.",
    whyItMatters: "Commercial-grade equipment lasts 3-5x longer than consumer versions. Worth the investment for serious home cooks.",
    examples: ["KitchenAid Commercial mixers", "Robot Coupe food processors"],
    linkText: "See our KitchenAid Commercial mixer review",
    linkUrl: "/reviews/kitchenaid-ksm8990wh"
  },
  {
    term: "Covers Per Night",
    definition: "Restaurant industry term for the number of meals served per evening. A busy restaurant might do 200+ covers per night, meaning equipment gets extreme use.",
    whyItMatters: "When I test equipment through 200+ covers nightly, it reveals durability issues that home use would never expose.",
    examples: ["High-volume: 200+ covers", "Medium: 100-200 covers"]
  },
  {
    term: "Seasoning (Cast Iron)",
    definition: "Creating a natural non-stick surface on cast iron by heating oil until it polymerizes into a hard coating. Requires multiple applications and ongoing maintenance.",
    whyItMatters: "Proper seasoning makes cast iron perform like non-stick while lasting generations. Enameled cast iron eliminates this requirement.",
    examples: ["Lodge cast iron skillets", "Carbon steel pans"],
    linkText: "See our Lodge Cast Iron bundle review",
    linkUrl: "/reviews/lodge-seasoned-cast-iron-3-skillet-bundle"
  },
  {
    term: "Fond",
    definition: "The browned bits that stick to the bottom of a pan when searing meat or vegetables. These concentrated flavors form the base of restaurant-quality sauces and gravies.",
    whyItMatters: "Good cookware develops fond without burning. Cheap pans create hot spots that burn rather than brown, ruining the fond.",
    examples: ["Stainless steel pans excel at fond development"]
  }
]

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-orange-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <Book className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Kitchen Glossary & Recipe Conversions
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Professional kitchen terms, recipe conversions, and knife techniques explained in plain English.
            Learn why pastry chefs use weight measurements and master the cuts that ensure even cooking.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="flex items-center gap-2 text-orange-400">
              <Search className="w-5 h-5" />
              <span className="text-sm">24 years of restaurant experience, translated for home cooks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Jump to Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="#equipment-terms"
              className="flex items-center justify-between bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg p-4 transition-all group"
            >
              <span className="font-semibold text-slate-900 group-hover:text-orange-800">
                Essential Equipment Terms
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-orange-800" />
            </a>
            <a
              href="#recipe-conversions"
              className="flex items-center justify-between bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg p-4 transition-all group"
            >
              <span className="font-semibold text-slate-900 group-hover:text-orange-800">
                Professional Recipe Conversions
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-orange-800" />
            </a>
            <a
              href="#knife-cuts"
              className="flex items-center justify-between bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg p-4 transition-all group"
            >
              <span className="font-semibold text-slate-900 group-hover:text-orange-800">
                Professional Knife Cuts
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-orange-800" />
            </a>
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section id="equipment-terms" className="py-16 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Essential Equipment Terms
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These are the terms that matter when buying professional-quality equipment for your home kitchen.
            </p>
          </div>

          <div className="space-y-8">
            {glossaryTerms.map((item, index) => (
              <article key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-4 text-orange-800">
                  {item.term}
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">What it means:</h4>
                    <p className="text-slate-700 leading-relaxed">
                      {item.definition}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Why it matters:</h4>
                    <p className="text-slate-700 leading-relaxed">
                      {item.whyItMatters}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Examples:</h4>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                      {item.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex}>{example}</li>
                      ))}
                    </ul>
                  </div>

                  {item.linkUrl && item.linkText && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link
                        href={item.linkUrl}
                        className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium"
                      >
                        {item.linkText} →
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Conversions Section */}
      <section id="recipe-conversions" className="py-16 bg-white scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Professional Recipe Conversions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Master the measurements and conversions that professional bakers and chefs use for consistent,
              reproducible results every time.
            </p>
          </div>

          {/* Lead Magnet Callout */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 mb-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Book className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  Want a Printable Version for Your Kitchen?
                </h3>
                <p className="text-blue-100 mb-4">
                  Get our free, one-page PDF with all professional recipe conversions and temperature charts.
                  Perfect for keeping next to your prep station!
                </p>
                <Link
                  href="/newsletter"
                  className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  Download Free Conversion Chart →
                </Link>
              </div>
            </div>
          </div>

          {/* Why Weight Matters */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">
              Why Professional Bakers Use Weight (Not Volume)
            </h3>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                <strong>In 24 years of restaurant work, I&apos;ve learned this fundamental truth:</strong> Weight is the only way to ensure
                consistent results in baking. Here&apos;s why professional kitchens always use scales:
              </p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li><strong>Flour varies dramatically:</strong> 1 cup can weigh anywhere from 120g to 150g depending on how it&apos;s measured</li>
                <li><strong>Humidity affects volume:</strong> Flour absorbs moisture, changing its density throughout the day</li>
                <li><strong>Packing matters:</strong> &quot;Packed&quot; vs &quot;unpacked&quot; can double the actual amount of ingredient</li>
                <li><strong>Consistency equals profit:</strong> Restaurants can&apos;t afford batch-to-batch variation</li>
              </ul>
              <div className="bg-white rounded-lg p-4 mt-6">
                <p className="font-semibold text-orange-800 mb-2">Professional Kitchen Reality:</p>
                <p className="text-sm">
                  When making 50 batches of pizza dough nightly, a 10% flour variation means some pizzas are dense, others are thin.
                  Weight eliminates this variable completely.
                </p>
              </div>
            </div>
          </div>

          {/* Common Conversions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Volume to Weight */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Volume to Weight Conversions</h3>
              <div className="space-y-3">
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">All-Purpose Flour</span>
                    <span className="text-sm text-slate-600">1 cup = 120g</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Bread Flour</span>
                    <span className="text-sm text-slate-600">1 cup = 125g</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Granulated Sugar</span>
                    <span className="text-sm text-slate-600">1 cup = 200g</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Brown Sugar (packed)</span>
                    <span className="text-sm text-slate-600">1 cup = 220g</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Butter</span>
                    <span className="text-sm text-slate-600">1 cup = 225g</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cocoa Powder</span>
                    <span className="text-sm text-slate-600">1 cup = 85g</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Powdered Sugar</span>
                    <span className="text-sm text-slate-600">1 cup = 120g</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Rolled Oats</span>
                    <span className="text-sm text-slate-600">1 cup = 90g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Temperature Conversions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Temperature Conversions</h3>
              <div className="space-y-3">
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Room Temperature</span>
                    <span className="text-sm text-slate-600">68-72°F (20-22°C)</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Warm Water (Yeast)</span>
                    <span className="text-sm text-slate-600">105-110°F (40-43°C)</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Soft Ball (Candy)</span>
                    <span className="text-sm text-slate-600">235-240°F (113-116°C)</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Hard Crack (Candy)</span>
                    <span className="text-sm text-slate-600">300-310°F (149-154°C)</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Deep Frying</span>
                    <span className="text-sm text-slate-600">350-375°F (175-190°C)</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Bread Baking</span>
                    <span className="text-sm text-slate-600">375-450°F (190-230°C)</span>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Pizza Oven</span>
                    <span className="text-sm text-slate-600">500-550°F (260-290°C)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Measuring Techniques */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-6">
              Professional Measuring Techniques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-blue-700 mb-3">Dry Ingredients (When You Must Use Volume)</h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li><strong>Flour:</strong> Spoon into cup, level with knife edge. Never scoop or pack.</li>
                  <li><strong>Brown Sugar:</strong> Pack firmly into cup unless recipe specifies otherwise.</li>
                  <li><strong>White Sugar:</strong> Pour and level - no packing needed.</li>
                  <li><strong>Cocoa/Spices:</strong> Spoon lightly, level off. Don&apos;t pack.</li>
                  <li><strong>Baking Powder/Soda:</strong> Level measurements are critical for leavening.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-blue-700 mb-3">Liquid Ingredients</h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li><strong>Water/Milk:</strong> Use clear measuring cup at eye level.</li>
                  <li><strong>Oil:</strong> Pour slowly, check at eye level for accuracy.</li>
                  <li><strong>Honey/Syrup:</strong> Spray cup with oil first for easy release.</li>
                  <li><strong>Vanilla:</strong> Measure in teaspoons/tablespoons, not estimating drops.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scaling Recipes */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Scaling Recipes Up or Down
            </h3>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                <strong>Restaurant Reality:</strong> We constantly scale recipes from 6 portions to 60. Here&apos;s how to do it safely:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-green-700 mb-2">Easy to Scale</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Main ingredients (flour, sugar, fats)</li>
                    <li>• Liquids (milk, water, oils)</li>
                    <li>• Most spices and seasonings</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-yellow-700 mb-2">Scale Carefully</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Leavening (baking powder/soda)</li>
                    <li>• Salt (can quickly become overpowering)</li>
                    <li>• Strong spices (cayenne, cloves)</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-red-700 mb-2">Don&apos;t Scale Linearly</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Cooking times (large batches cook slower)</li>
                    <li>• Pan sizes (affects cooking rate)</li>
                    <li>• Yeast (often needs less when scaling up)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knife Cuts Section */}
      <section id="knife-cuts" className="py-16 bg-gray-50 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Professional Knife Cuts
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Master these fundamental cuts to cook like a professional. Uniform cuts ensure even cooking
              and professional presentation.
            </p>
          </div>

          {/* Knife Guide CTA Callout */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-8 mb-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Book className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  Mastering These Cuts Starts with the Right Tool
                </h3>
                <p className="text-orange-100 mb-4">
                  A sharp, well-balanced knife is essential for safety and precision. These techniques become
                  effortless with professional-quality equipment.
                </p>
                <Link
                  href="/guides/best-chef-knives"
                  className="inline-block bg-white text-orange-800 hover:bg-orange-50 font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  See Our Guide to the Best Professional Chef Knives →
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {knifeCuts.map((cut, index) => (
              <article key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-orange-800 mb-2">
                    {cut.french}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      American: {cut.american}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      Slang: {cut.slang}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 text-sm">Description:</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {cut.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 text-sm">Technique:</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {cut.technique}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 text-sm">Best uses:</h4>
                    <div className="flex flex-wrap gap-1">
                      {cut.uses.map((use, useIndex) => (
                        <span key={useIndex} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="font-bold text-orange-800 mb-3">Pro Tip from 24 Years in Kitchens</h3>
            <p className="text-orange-800 text-sm leading-relaxed">
              Uniform cuts aren&apos;t just about looks - they ensure everything cooks at the same rate.
              A mix of large and small pieces means some will be overcooked while others are still raw.
              Take the extra time to make cuts consistent, especially for sautéing and roasting.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Buy Professional-Quality Equipment?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Now that you understand the terminology, check out our reviews of equipment
            that actually meets these professional standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reviews"
              className="bg-white text-orange-800 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Browse Reviews
            </Link>
            <Link
              href="/guides"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-800 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Read Buying Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
