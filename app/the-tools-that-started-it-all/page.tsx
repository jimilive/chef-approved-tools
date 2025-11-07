import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import FAQSchema from '@/components/FAQSchema'

export const metadata: Metadata = {
  title: 'Tools That Started It All: My Culinary School Essentials',
  description: 'The 11 essential kitchen tools I packed for culinary school in 2005 that I still use 20 years later. Professional-grade equipment that survived decades of restaurant abuse.',
  keywords: 'culinary school tools, professional kitchen equipment, Victorinox knives, essential kitchen tools, chef knife bag, restaurant kitchen tools',
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/the-tools-that-started-it-all',
  },
}

const faqs = [
  {
    question: "Why Victorinox Instead of Higher-End Knives?",
    answer: "Victorinox Fibrox knives are the America's Test Kitchen winner for a reason. They hold an edge, survive heavy use, and cost a fraction of premium brands. After twenty years, I still haven't found a reason to replace them with something more expensive."
  },
  {
    question: "Do You Still Use All These Tools?",
    answer: "Most of them. The six Victorinox knives are still in my bag. The OXO peeler and bench scraper see daily use. The tongs are the most used of all of them. The Microplane is permanent. The honing steel gets used before every shift. The channel knife and traditional zester? Sitting in my kitchen drawer collecting dust."
  },
  {
    question: "What Would You Add Now That Wasn't on the School List?",
    answer: "A proper instant-read thermometer—something like the Thermapen or Thermoworks models that respond in under two seconds. If you break down salmon, the fish tweezers and a flexible boning or filet knife. A Benriner mandolin and a cut glove are amazing for making veggies beautiful and thin. And more bandaids. Always more bandaids."
  },
  {
    question: "Is This a Complete Kitchen Setup?",
    answer: "No. This is the foundation—the tools that handle prep work and most cooking tasks. You'll eventually need cutting boards, pots, pans, mixing bowls, and measuring equipment. But if you get these eleven tools right, everything else becomes easier."
  },
  {
    question: "Where Should Someone Start If They Can't Afford All Eleven?",
    answer: "Start with the 8\" chef's knife, a paring knife, the peeler, and the bench scraper. Those four tools handle about 80% of daily kitchen work. Add the others as you can afford them."
  }
]

export default function ToolsThatStartedItAllPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FAQSchema faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The Tools That Started It All
          </h1>
          <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            These are the essentials I packed for my first day at culinary school in 2005. Twenty years later, I still reach for them first.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              The required equipment list from Seattle Central College&apos;s Culinary Arts program was specific: a long list of tool requirements, some of which I had never even used or heard of.
            </p>

            <p className="text-slate-700 text-lg leading-relaxed mb-8">
              I showed up to orientation with everything on the list, a fresh knife roll, and no idea that most of these tools would still be in my bag two decades later.
            </p>

            {/* The Knives That Survived Everything */}
            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">
              The Knives That Survived Everything
            </h2>

            <div className="space-y-6 mb-12">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-orange-600 hover:text-orange-800 transition-colors">
                    Victorinox Fibrox 8&quot; Chef&apos;s Knife
                  </Link>
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  This was the workhorse. Prep work, butchering, vegetable cutting—everything ran through the 8-inch. I&apos;ve replaced the handle once in twenty years. The blade is still sharp enough to matter.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  <Link href="/reviews/victorinox-fibrox-10-inch-chefs-knife" className="text-orange-600 hover:text-orange-800 transition-colors">
                    Victorinox Fibrox 10&quot; Chef&apos;s Knife
                  </Link>
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  The 10-inch was required, but I rarely reached for it in school. That changed at Purple Café when I started breaking down larger proteins. Now I keep both within arm&apos;s reach.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  <Link href="/reviews/victorinox-4-inch-paring-knife" className="text-orange-600 hover:text-orange-800 transition-colors">
                    Victorinox Fibrox 4&quot; Paring Knife
                  </Link>
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Two paring knives felt excessive until I spent a shift brunoise-ing shallots and realized having a backup meant not stopping to clean the first one. The 4-inch handles detailed work. The 3.25-inch is better for turning vegetables and in-hand cutting.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  <Link href="/reviews/victorinox-granton-edge-boning-knife" className="text-orange-600 hover:text-orange-800 transition-colors">
                    Victorinox Fibrox Granton Edge Boning Knife
                  </Link>
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Required for butchery class. I thought I&apos;d never use it outside of school. Then I spent six years at Purple Café and Feierabend. The sheer joy if taking a silverskin of a tenderloin with no effort was enough to make me love this knife. It paid for itself in the first month.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  <Link href="/reviews/victorinox-offset-bread-knife" className="text-orange-600 hover:text-orange-800 transition-colors">
                    Victorinox Fibrox Offset Bread Knife
                  </Link>
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  The offset handle keeps your knuckles off the cutting board when you&apos;re slicing through crusty bread to make croutons or slicing bread for crostini. Mine is twenty years old and still cuts clean.
                </p>
              </div>
            </div>

            {/* The Tools That Earned Their Space */}
            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">
              The Tools That Earned Their Space
            </h2>

            <div className="space-y-6 mb-12">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  <Link href="/reviews/oxo-good-grips-swivel-peeler" className="text-orange-600 hover:text-orange-800 transition-colors">
                    OXO Good Grips Swivel Peeler
                  </Link>
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  I&apos;ve peeled thousands of pounds of potatoes, carrots, and apples with this peeler. Somehow, it has retained its edges when my backup peeler just sits in my drawer unused after the first month.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  J.A. Henckels Sharpening Steel <span className="text-sm text-slate-500">(Review coming soon)</span>
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  This was part of the required kit. I hone every knife before service. The steel keeps edges aligned between using a whetstone to sharpen. Make sure to clean it every once in a while to keep the ridges clear and functional.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  <Link href="/reviews/oxo-good-grips-bench-scraper" className="text-orange-600 hover:text-orange-800 transition-colors">
                    OXO Bench Scraper
                  </Link>
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  I use this more than almost anything else in my kit. Portioning dough, moving chopped vegetables, cleaning cutting boards, scraping down work surfaces—it handles all of it. I never imagined it would be so useful when I bought it.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  <Link href="/reviews/winco-heavy-duty-tongs" className="text-orange-600 hover:text-orange-800 transition-colors">
                    Winco 12&quot; Tongs
                  </Link>
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Every professional kitchen uses these. They&apos;re long enough to keep your hands away from heat, sturdy enough not to bend, and cheap enough that losing one doesn&apos;t matter. They last forever and are by far the most utilized tool in the bag.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Microplane Zester <span className="text-sm text-slate-500">(Review coming soon)</span>
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Required for baking class. Turns out zesting citrus, grating hard cheeses, and finishing dishes with fresh nutmeg became regular parts of the job. This tool earned permanent space in my roll.
                </p>
              </div>
            </div>

            {/* The Tools I Never Used */}
            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">
              The Tools I Never Used
            </h2>

            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              The equipment list included a few items that seemed important at the time but never found their way into regular rotation.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Channel Knife and Traditional Zester
              </h3>
              <p className="text-slate-700 leading-relaxed">
                If I&apos;d ended up working in bars or high-end cocktail service, these would&apos;ve mattered. In restaurant kitchens? I don&apos;t think I used either one after the practical exam that required them.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Wine Opener
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Same story. Useful for front-of-house staff and sommeliers. Not something line cooks reach for, unless I was making those port-braised pears for a winter pizza.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                ChefCraft Instant-Read Thermometer
              </h3>
              <p className="text-slate-700 leading-relaxed">
                This was the cheap version the school recommended. It fits in the little pocket on the arm of a chef coat, where it remained full time until I graduated. I replaced it with better models over the years and learned that thermometers are worth the investment.
              </p>
            </div>

            {/* The Third Quarter Addition */}
            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">
              The Third Quarter Addition
            </h2>

            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              By the third quarter, I&apos;d added three things to my knife bag that weren&apos;t on the required list. Two of them were a Ziploc bag of bandaids and a tube of Neosporin Pain.
            </p>

            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              Everyone asked for bandaids. Constantly. Burns, cuts, blisters from new knife handles—culinary school is rough on hands. I got tired of watching people bleed into paper towels while looking for first aid supplies, so I kept my own stash. And the Neosporin pain, gold for keeping the distraction of burns and cuts from derailing your momentum.
            </p>

            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              The third was a pair of fish tweezers to remove pin bones from salmon. Indispensable and nothing else besides a pair of pliers works as well.
            </p>

            <p className="text-slate-700 text-lg leading-relaxed mb-8">
              I also started carrying an extra Sharpie. You only forget to bring one to service once before learning that backup tools matter as much as primary ones. I can still hear my chef now, &apos;Bradley, where&apos;s your sharpie!?&apos;
            </p>

            {/* Twenty Years Later */}
            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">
              Twenty Years Later
            </h2>

            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              Most of these tools are still in my knife bag. The knives have been steeled hundreds of times. The peeler has been replaced once. The bench scraper&apos;s handle is worn smooth. The tongs keep on keeping on.
            </p>

            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              But they all still work. They&apos;ve survived culinary school, professional kitchens at Mellow Mushroom and Purple Café, years of various other jobs, and now daily use in my home kitchen.
            </p>

            <p className="text-slate-700 text-lg leading-relaxed mb-8">
              If you&apos;re starting from scratch—whether you&apos;re heading to culinary school or just tired of fighting with dull knives and flimsy tools—this is what actually matters. Not the expensive knife sets with pieces you&apos;ll never use. Not the gadgets that promise to make cooking easier. Just solid, professional-grade tools that show up when you need them.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start With What Works
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            These eleven tools handled everything from culinary school to professional kitchens to daily home cooking. Browse the individual reviews to see why they&apos;ve earned permanent space in my knife bag.
          </p>
          <Link
            href="/reviews"
            className="inline-block bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            Browse All Reviews →
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Related Content
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/reviews"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Browse All Product Reviews
              </h3>
              <p className="text-sm text-slate-600">
                See all professional kitchen equipment reviews
              </p>
            </Link>

            <Link
              href="/knives"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Browse Knife Reviews
              </h3>
              <p className="text-sm text-slate-600">
                Professional chef&apos;s knife recommendations
              </p>
            </Link>

            <Link
              href="/about"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                About Scott Bradley
              </h3>
              <p className="text-sm text-slate-600">
                24 years of professional kitchen experience
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-slate-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">About the Author</h2>
            <p className="text-slate-300 leading-relaxed">
              Scott Bradley has 24 years of professional kitchen experience, including roles as Kitchen Manager at Mellow Mushroom and line cook positions at Purple Café, Feierabend, Il Pizzaiolo, and Paragary&apos;s. He graduated from Seattle Central College&apos;s Culinary Arts program in 2007 and still uses most of the tools from his required equipment list twenty years later.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
