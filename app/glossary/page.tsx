import { Metadata } from 'next'
import Link from 'next/link'
import { Book, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kitchen Glossary, Recipe Conversions & Knife Cuts Guide | Chef Approved Tools',
  description: 'Professional kitchen equipment terms, baking conversions, and knife cuts explained by a restaurant manager. Learn weight vs volume measurements, NSF certification, julienne, brunoise, and more professional techniques.',
  keywords: ['kitchen equipment glossary', 'recipe conversions', 'baking by weight', 'professional measurements', 'knife cuts guide', 'NSF certification', 'full tang knife', 'julienne cut', 'brunoise', 'chiffonade', 'professional knife techniques', 'restaurant equipment terms', 'volume to weight conversions', 'professional baking techniques']
}

const knifeCuts = [
  {
    french: "Julienne",
    american: "Matchsticks",
    slang: "Shoe Strings",
    description: "Thin matchstick cuts, typically 1/8\" x 1/8\" x 2-3\" long. Used for vegetables like carrots, bell peppers, and potatoes.",
    technique: "Square off the vegetable, cut into 2-3\" planks, stack planks and cut into thin strips.",
    uses: ["Stir-fries", "Garnishes", "Salads", "Even cooking"]
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
    french: "Petite Dés",
    american: "Small Dice",
    slang: "Pea-sized",
    description: "1/4\" x 1/4\" x 1/4\" cubes. Most common dice size for home cooking.",
    technique: "Make parallel cuts 1/4\" apart, turn 90°, repeat, then slice perpendicular.",
    uses: ["Soups", "Stews", "Sautéing", "Most recipe applications"]
  },
  {
    french: "Moyen Dés",
    american: "Medium Dice",
    slang: "Corn Kernel Size",
    description: "1/2\" x 1/2\" x 1/2\" cubes. Good for heartier dishes with longer cooking times.",
    technique: "Same as small dice but with 1/2\" spacing between cuts.",
    uses: ["Roasting", "Braising", "Chunky soups", "Rustic dishes"]
  },
  {
    french: "Grand Dés",
    american: "Large Dice",
    slang: "Sugar Cube Size",
    description: "3/4\" x 3/4\" x 3/4\" cubes. Used when you want distinct vegetable pieces in the final dish.",
    technique: "Same technique as other dices, just larger spacing between cuts.",
    uses: ["Roasted vegetables", "Stews", "Rustic preparations"]
  },
  {
    french: "Chiffonade",
    american: "Ribbon Cut",
    slang: "Herb Confetti",
    description: "Thin ribbon cuts for leafy herbs and vegetables. Creates delicate strips perfect for garnishing.",
    technique: "Stack leaves, roll tightly like a cigar, then slice perpendicular to create ribbons.",
    uses: ["Basil garnish", "Lettuce for salads", "Herb finishing", "Asian preparations"]
  },
  {
    french: "Biais",
    american: "Bias Cut",
    slang: "Diagonal Slices",
    description: "Diagonal cuts that create oval-shaped pieces with more surface area for faster, even cooking.",
    technique: "Hold knife at 45° angle to the ingredient and slice through.",
    uses: ["Carrots", "Celery", "Asparagus", "Asian stir-fries"]
  },
  {
    french: "Bâtonnet",
    american: "Stick Cut",
    slang: "French Fry Cut",
    description: "1/4\" x 1/4\" x 2-3\" sticks. Slightly thicker than julienne, perfect for French fries and crudités.",
    technique: "Similar to julienne but with 1/4\" thickness instead of 1/8\".",
    uses: ["French fries", "Vegetable sticks", "Even roasting", "Crudité platters"]
  },
  {
    french: "Rondelle",
    american: "Rounds",
    slang: "Coins",
    description: "Round slices of cylindrical vegetables. Thickness varies by cooking method and preference.",
    technique: "Slice straight down through round vegetables like carrots, cucumbers, or zucchini.",
    uses: ["Coins for sautéing", "Garnishes", "Layered dishes", "Quick cooking"]
  },
  {
    french: "Concassé",
    american: "Rough Chop",
    slang: "Chunky Cut",
    description: "Informal, uneven cuts about 1/2\" to 1\" pieces. Used when appearance doesn&apos;t matter.",
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
    examples: ["Wüsthof Classic series", "Professional chef knives"]
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
    examples: ["Le Creuset", "Staub Dutch ovens"]
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
    examples: ["KitchenAid Commercial mixers", "Robot Coupe food processors"]
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
    examples: ["Lodge cast iron skillets", "Carbon steel pans"]
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
              <span className="text-sm">21+ years of restaurant experience, translated for home cooks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-16">
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
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-orange-700">
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Conversions Section */}
      <section className="py-16 bg-white">
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

          {/* Why Weight Matters */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">
              Why Professional Bakers Use Weight (Not Volume)
            </h3>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                <strong>In 21+ years of restaurant work, I&apos;ve learned this fundamental truth:</strong> Weight is the only way to ensure
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
      <section className="py-16 bg-gray-50">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {knifeCuts.map((cut, index) => (
              <article key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-orange-700 mb-2">
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
                        <span key={useIndex} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
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
            <h3 className="font-bold text-orange-800 mb-3">Pro Tip from 21+ Years in Kitchens</h3>
            <p className="text-orange-700 text-sm leading-relaxed">
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
              className="bg-white text-orange-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Browse Reviews
            </Link>
            <Link
              href="/guides"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-700 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Read Buying Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}