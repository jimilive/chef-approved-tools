import { Metadata } from 'next'
import Link from 'next/link'
import { Droplets, Thermometer, Eye, Clock } from 'lucide-react'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

export const metadata: Metadata = {
  title: 'How Restaurants Make Sauce Taste 10x Better',
  description: 'Reduction concentrates flavor. 24 years of professional cooking reveals the technique that turns thin liquid into restaurant sauce.',
  keywords: ['reducing sauces', 'sauce reduction', 'how to reduce sauce', 'professional cooking techniques', 'sauce making', 'nappe consistency', 'demi-glace'],
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/blog/reducing-sauces-restaurant-technique',
  },
}

const articleSchema = generateArticleSchema({
  headline: 'Reducing Sauces: The Technique Restaurants Use Daily',
  description: 'Professional chef explains the art of reducing sauces — how to concentrate flavor, control consistency, and create restaurant-quality reductions at home.',
  datePublished: "2025-09-09",
  dateModified: '2025-10-21',
  authorName: 'Scott Bradley',
  authorUrl: 'https://www.chefapprovedtools.com/about',
  url: 'https://www.chefapprovedtools.com/blog/reducing-sauces-restaurant-technique',
  imageUrl: 'https://www.chefapprovedtools.com/images/blog/reducing-sauces.jpg',
  keywords: ['reducing sauces', 'sauce reduction', 'how to reduce sauce', 'professional cooking techniques']
,
  urlPrefix: 'blog',
  urlSuffix: 'reducing-sauces-restaurant-technique'})

const breadcrumbJsonLd = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://www.chefapprovedtools.com' },
  { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
  { name: 'Reducing Sauces: The Technique Restaurants Use Daily', url: 'https://www.chefapprovedtools.com/blog/reducing-sauces-restaurant-technique' }
])

const faqJsonLd = generateFAQSchema([
  {
    question: 'Can I fix an over-reduced sauce?',
    answer: 'Yes—add a splash of stock or water to thin it back to balance. Over-reduced sauces become too salty, too thick, or too intense. Add liquid gradually, tasting as you go, until the flavor and consistency return to balance. The sauce may need a few minutes of gentle simmering to reintegrate the added liquid.'
  },
  {
    question: 'Why does my sauce taste metallic?',
    answer: 'Usually from acidic reductions in aluminum pans—stick to stainless or enameled cookware. Aluminum reacts with acids (wine, tomatoes, vinegar) and can impart a metallic or off flavor. Stainless steel, enameled cast iron, or copper-lined pans are non-reactive and preserve the true flavor of your reduction.'
  },
  {
    question: 'What&apos;s the difference between reducing and thickening?',
    answer: 'Reduction removes water to intensify flavor; thickening adds starch or fat to change texture. Reduction concentrates everything in the liquid—sugars, acids, proteins—creating depth. Thickening with cornstarch, flour, or cream changes consistency but doesn&apos;t concentrate flavor. Professional sauces use reduction for flavor, then thicken only if needed.'
  },
  {
    question: 'How long should I reduce a sauce?',
    answer: 'Depends on volume—20 minutes for light reductions, up to 90 for demi-glace. A pan sauce from deglazing might reduce in 5-10 minutes. A full stock reduction for demi-glace can take 1-2 hours. Volume, pan size, and heat level all affect timing. Judge by consistency and taste, not the clock.'
  },
  {
    question: 'Can I store reduced sauces?',
    answer: 'Yes—refrigerate up to 5 days or freeze up to 3 months. Store reduced sauces in airtight containers. They&apos;ll thicken further when chilled; gently reheat with a splash of stock or water to restore the original consistency. Reduced sauces are concentrated flavor bombs—perfect for quick weeknight meals.'
  },
  {
    question: 'What does nappe consistency mean?',
    answer: 'Nappe is the French term for when sauce coats the back of a spoon and leaves a clean trail when you drag your finger through it. This is the classic test for proper reduction. The sauce should cling to the spoon without being gloppy or running off immediately. It&apos;s the perfect balance between too thin and too thick.'
  },
  {
    question: 'Should I reduce with the lid on or off?',
    answer: 'Always off. Covering the pan traps steam and prevents evaporation—the whole point of reduction. You want water to escape, concentrating the flavors left behind. A lid turns reduction into simmering, which doesn&apos;t change the liquid&apos;s composition. Keep it uncovered and watch the magic happen.'
  },
  {
    question: 'Why is my reduced sauce cloudy instead of clear?',
    answer: 'You didn&apos;t skim enough during reduction. As sauce simmers, proteins, fats, and impurities rise to the surface. If you don&apos;t skim them off, they emulsify back into the sauce, creating cloudiness. Skim every few minutes with a ladle or spoon for crystal-clear, professional results. Clarity equals clean flavor.'
  }
])

export default function ReducingSaucesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Reducing Sauces: The Technique Restaurants Use Daily
          </h1>

          <div className="flex items-center gap-4 text-slate-600 text-sm mb-6">
            <time dateTime="2025-10-21">October 21, 2025</time>
            <span>•</span>
            <span>8 min read</span>
          </div>

          <p className="text-xl text-slate-700 leading-relaxed">
            Professional chef explains the art of reducing sauces — how to concentrate flavor, control consistency, and create restaurant-quality reductions at home.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <p>
            If there&apos;s one sound that tells a chef things are going right, it&apos;s that gentle, confident simmer of a sauce reducing on the stove. Not boiling, not splattering — just a calm <em>blip... blip... blip</em> as the liquid thickens, aromas deepen, and the flavor builds toward perfection.
          </p>

          <p>
            Reduction is one of those techniques that separates home cooking from restaurant cooking. It&apos;s simple in theory — just simmer until thicker — but the details make all the difference. Temperature, timing, and taste control determine whether you end up with a silky, glossy glaze or a scorched, sticky mess.
          </p>

          <p>
            Let&apos;s go deep on the method every restaurant uses daily — the one that turns good into unforgettable.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Droplets className="w-8 h-8 text-orange-700" />
            The Purpose of Reduction
          </h2>

          <p>
            Every reduction has one goal: intensify flavor through evaporation.
          </p>

          <p>
            By slowly cooking off water, you&apos;re concentrating everything that remains — sugars, fats, proteins, acids, and aromas. Done right, reduction turns thin stock into glossy demi-glace, watery pan drippings into a rich jus, or simple wine into velvet sauce.
          </p>

          <p>
            The key word here is <em>slowly</em>. When you rush reduction, you don&apos;t just lose water — you lose balance. Sweet becomes bitter, savory turns salty, and acid goes harsh.
          </p>

          <p>
            In short: heat makes flavor louder; time makes it beautiful.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
            <p className="font-semibold text-slate-900 mb-3">What Reduction Accomplishes:</p>
            <ul className="space-y-2 mb-0">
              <li><strong>Concentrates flavor:</strong> Removes water, leaving behind pure essence</li>
              <li><strong>Improves texture:</strong> Creates body and viscosity without starch</li>
              <li><strong>Deepens color:</strong> Caramelization intensifies during reduction</li>
              <li><strong>Balances elements:</strong> Controlled reduction harmonizes sweet, salty, and acidic notes</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Thermometer className="w-8 h-8 text-orange-700" />
            The Science of Concentration
          </h2>

          <p>
            When a liquid simmers, water molecules escape as vapor, leaving behind the heavier compounds that give food flavor and texture.
          </p>

          <p>
            Each stage of reduction changes the sauce&apos;s behavior:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
            <ul className="space-y-2 mb-0">
              <li><strong>Early (thin stage):</strong> Gentle simmering releases steam, color still light.</li>
              <li><strong>Middle (coating stage):</strong> Viscosity increases, bubbles slow down.</li>
              <li><strong>Final (nappe stage):</strong> Sauce coats the back of a spoon and leaves a clean line when you drag your finger through it.</li>
            </ul>
          </div>

          <p>
            The more you reduce, the less forgiving the sauce becomes. At the end, a few seconds can mean the difference between silk and sludge.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Clock className="w-8 h-8 text-orange-700" />
            The Professional Reduction Method
          </h2>

          <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
            Step 1: Start with the Right Base
          </h3>

          <p>
            Great reductions start with flavor. If you begin with watery broth, you&apos;ll just end up with less watery broth. Use homemade stock, pan drippings, or a sauce already rich in gelatin.
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-8">
            <p className="font-semibold text-slate-900 mb-2">Pro Tip:</p>
            <p className="mb-0">
              Avoid store-bought &quot;broths&quot; with added salt — you&apos;ll over-reduce and end up with a salt bomb.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
            Step 2: Choose the Right Pan
          </h3>

          <p>
            A wide, shallow pan exposes more surface area for evaporation.
          </p>

          <p>
            Try a Made In Stainless Saucier or an All-Clad D3 10&quot; Skillet.
          </p>

          <p>
            <CTAVisibilityTracker
              ctaId="reducing-sauces-cookware-guide-1"
              position="mid_article"
              productSlug="reducing-sauces-restaurant-technique"
              merchant="internal"
            >
              <Link href="/blog/cookware-materials-explained" className="text-blue-700 underline">
                Learn about different cookware materials
              </Link>
            </CTAVisibilityTracker> and why stainless steel is ideal for sauce reductions.
          </p>

          <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
            Step 3: Medium Heat, Gentle Simmer
          </h3>

          <p>
            Bring the liquid just to a simmer — small, lazy bubbles. Never full boil. Boiling agitates the sauce, clouds it, and risks scorching.
          </p>

          <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
            Step 4½: Skim, Skim, Skim
          </h3>

          <p>
            Every few minutes, impurities, proteins, and fat rise to the top. If you don&apos;t skim them off, they emulsify back in and cloud your sauce.
          </p>

          <p>
            Use a ladle or small spoon, and don&apos;t rush it. This step is what separates a restaurant-level reduction from a greasy home version.
          </p>

          <p>
            Keep your eye on the surface — the cleaner you keep it, the purer and brighter your final flavor will be.
          </p>

          <blockquote className="border-l-4 border-orange-600 pl-6 italic text-slate-700 my-6">
            As one of my chefs used to yell over the line:<br />
            &quot;You want clarity? Then skim, skim, skim!&quot;
          </blockquote>

          <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
            Step 5: Watch, Stir, Taste
          </h3>

          <p>
            A reduction isn&apos;t a &quot;set it and forget it&quot; process. Stir occasionally with a{' '}
            <CTAVisibilityTracker
              ctaId="reducing-sauces-scraper-1"
              position="mid_article"
              productSlug="rubbermaid-cooks-scraper"
              merchant="amazon"
            >
              <Link href="/reviews/rubbermaid-commercial-cooks-scraper" className="text-blue-700 underline">
                Rubbermaid Commercial Cook&apos;s Scraper
              </Link>
            </CTAVisibilityTracker> and taste throughout. The balance changes every few minutes.
          </p>

          <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
            Step 6: Stop at the Right Moment
          </h3>

          <p>
            When the sauce coats the back of a spoon and a finger swipe leaves a clean trail — that&apos;s <em>nappe</em>, the French test for perfection.
          </p>

          <p>
            Pull it early if unsure. It&apos;ll continue thickening slightly off the heat.
          </p>

          <p>
            <CTAVisibilityTracker
              ctaId="reducing-sauces-deglazing-guide-1"
              position="mid_article"
              productSlug="reducing-sauces-restaurant-technique"
              merchant="internal"
            >
              <Link href="/blog/deglazing-secret-to-restaurant-quality-flavor" className="text-blue-700 underline">
                Learn how to deglaze properly
              </Link>
            </CTAVisibilityTracker> before reducing—deglazing captures fond that becomes the base of your reduction.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
            <Eye className="w-8 h-8 text-orange-700" />
            How to Judge When It&apos;s Done
          </h2>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 my-8">
            <ul className="space-y-3 mb-0">
              <li>
                <strong className="text-slate-900">Visual:</strong> Bubbles grow larger and slower as water content decreases. The surface glosses over like satin.
              </li>
              <li>
                <strong className="text-slate-900">Auditory:</strong> The sound deepens — higher-pitched hissing turns to low bubbling.
              </li>
              <li>
                <strong className="text-slate-900">Touch:</strong> Dip a spoon. If the sauce clings and runs slowly, it&apos;s ready.
              </li>
              <li>
                <strong className="text-slate-900">Taste:</strong> If you taste salt first, you&apos;ve gone too far. Add a splash of stock or water to rebalance.
              </li>
            </ul>
          </div>

          <p>
            Professional cooks rely on all four senses—sight, sound, touch, and taste—to judge reduction. Don&apos;t just watch the clock. Engage with the sauce as it transforms.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Common Mistakes (And How to Avoid Them)
          </h2>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Mistake</th>
                  <th className="border border-slate-300 px-4 py-2 text-left font-semibold">What Happens</th>
                  <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-4 py-2">Boiling too fast</td>
                  <td className="border border-slate-300 px-4 py-2">Scorched or bitter flavor</td>
                  <td className="border border-slate-300 px-4 py-2">Lower heat; slow simmer only</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2">Overseasoning early</td>
                  <td className="border border-slate-300 px-4 py-2">Salt concentrates too much</td>
                  <td className="border border-slate-300 px-4 py-2">Salt only near the end</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2">Skipping the skimming</td>
                  <td className="border border-slate-300 px-4 py-2">Cloudy, greasy sauce</td>
                  <td className="border border-slate-300 px-4 py-2">Skim throughout the reduction</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2">Ignoring the sauce</td>
                  <td className="border border-slate-300 px-4 py-2">Burns or separates</td>
                  <td className="border border-slate-300 px-4 py-2">Stir and monitor constantly</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2">Trying to &quot;thicken&quot; instead of reduce</td>
                  <td className="border border-slate-300 px-4 py-2">Texture, not flavor</td>
                  <td className="border border-slate-300 px-4 py-2">Reduction is about flavor, not starch</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The biggest mistake is confusing reduction with thickening. Adding cornstarch or flour creates body, but it dilutes flavor. True reduction concentrates everything—it&apos;s flavor alchemy, not chemistry class.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 my-8">
            <p className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">🔥</span> Chef&apos;s Tip:
            </p>
            <p className="mb-0">
              Add a knob of cold butter right before serving. Whisk it in off the heat — it adds shine, rounds flavor, and gives that &quot;restaurant gloss.&quot;
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Chef&apos;s Tips & Recommended Tools
          </h2>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
            <ul className="space-y-3 mb-0">
              {/* <li>
                <strong>Pan:</strong>{' '}
                <CTAVisibilityTracker
                  ctaId="reducing-sauces-made-in-saucier-1"
                  position="mid_article"
                  productSlug="made-in-saucier"
                  merchant="amazon"
                >
                  
                    Made In Stainless Saucier
                  
                </CTAVisibilityTracker> — curved sides help prevent burning.
              </li> */}
              <li>
                <strong>Pan:</strong> Made In Stainless Saucier — curved sides help prevent burning.
              </li>
              <li>
                <strong>Scraper:</strong>{' '}
                <CTAVisibilityTracker
                  ctaId="reducing-sauces-scraper-2"
                  position="mid_article"
                  productSlug="rubbermaid-cooks-scraper"
                  merchant="amazon"
                >
                  <Link href="/reviews/rubbermaid-commercial-cooks-scraper" className="text-blue-700 underline">
                    Rubbermaid Commercial Cook&apos;s Scraper
                  </Link>
                </CTAVisibilityTracker> — keeps fond from sticking.
              </li>
              {/* <li>
                <strong>Thermometer:</strong>{' '}
                <CTAVisibilityTracker
                  ctaId="reducing-sauces-thermapen-1"
                  position="mid_article"
                  productSlug="thermoworks-thermapen-one"
                  merchant="amazon"
                >
                  
                    ThermoWorks Thermapen ONE
                  
                </CTAVisibilityTracker> — track simmer heat (195°F ideal).
              </li> */}
              <li>
                <strong>Thermometer:</strong> ThermoWorks Thermapen ONE — track simmer heat (195°F ideal).
              </li>
              {/* <li>
                <strong>Strainer:</strong>{' '}
                <CTAVisibilityTracker
                  ctaId="reducing-sauces-oxo-strainer-1"
                  position="mid_article"
                  productSlug="oxo-fine-mesh-strainer"
                  merchant="amazon"
                >
                  
                    OXO Fine Mesh Strainer
                  
                </CTAVisibilityTracker> — for smooth finishes.
              </li> */}
              <li>
                <strong>Strainer:</strong> OXO Fine Mesh Strainer — for smooth finishes.
              </li>
              {/* <li>
                <strong>Container:</strong>{' '}
                <CTAVisibilityTracker
                  ctaId="reducing-sauces-cambro-1"
                  position="mid_article"
                  productSlug="cambro-2-qt-containers"
                  merchant="amazon"
                >
                  
                    Cambro 2-Qt Storage Container
                  
                </CTAVisibilityTracker> — to chill and store reduced sauces safely.
              </li> */}
              <li>
                <strong>Container:</strong> Cambro 2-Qt Storage Container — to chill and store reduced sauces safely.
              </li>
            </ul>
          </div>

          <p>
            The right pan makes all the difference. Wide, shallow pans like sauciers and skillets maximize surface area, speeding evaporation and creating even, controlled reduction.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Final Thoughts
          </h2>

          <p>
            Reduction is the soul of professional sauce-making. It&apos;s where patience meets precision, where time transforms simple liquids into complex, layered flavor.
          </p>

          <p>
            Once you understand reduction—once you learn to listen to the simmer, watch the bubbles, and taste the balance—you&apos;ll never look at sauce the same way. You&apos;ll build them instinctively, adjusting heat and timing by feel.
          </p>

          <p>
            That&apos;s the professional approach: control the process, trust the technique, and let the flavor speak for itself.
          </p>

          <p>
            <CTAVisibilityTracker
              ctaId="reducing-sauces-braising-guide-1"
              position="mid_article"
              productSlug="reducing-sauces-restaurant-technique"
              merchant="internal"
            >
              <Link href="/blog/braising-101-tough-cuts-made-tender" className="text-blue-700 underline">
                Learn how to braise
              </Link>
            </CTAVisibilityTracker>—another slow-cooking technique that creates deep, reduced flavors through patience.
          </p>

          <p>
            <CTAVisibilityTracker
              ctaId="reducing-sauces-caramelizing-onions-1"
              position="mid_article"
              productSlug="reducing-sauces-restaurant-technique"
              merchant="internal"
            >
              <Link href="/blog/caramelizing-onions-why-it-takes-45-minutes" className="text-blue-700 underline">
                Master caramelizing onions
              </Link>
            </CTAVisibilityTracker>—a technique that relies on reduction and evaporation to concentrate sugars and build flavor.
          </p>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-600 p-6 my-12 rounded-r-lg">
            <p className="text-slate-900 mb-0">
              <strong>About the Author:</strong> Scott Bradley spent 24 years in professional kitchens, including a long tenure as Kitchen Manager at Mellow Mushroom. He specializes in teaching home cooks the professional techniques that create consistent, restaurant-quality results.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Can I fix an over-reduced sauce?
              </h3>
              <p className="text-slate-700">
                Yes—add a splash of stock or water to thin it back to balance. Over-reduced sauces become too salty, too thick, or too intense. Add liquid gradually, tasting as you go, until the flavor and consistency return to balance. The sauce may need a few minutes of gentle simmering to reintegrate the added liquid.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Why does my sauce taste metallic?
              </h3>
              <p className="text-slate-700">
                Usually from acidic reductions in aluminum pans—stick to stainless or enameled cookware. Aluminum reacts with acids (wine, tomatoes, vinegar) and can impart a metallic or off flavor. Stainless steel, enameled cast iron, or copper-lined pans are non-reactive and preserve the true flavor of your reduction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                What&apos;s the difference between reducing and thickening?
              </h3>
              <p className="text-slate-700">
                Reduction removes water to intensify flavor; thickening adds starch or fat to change texture. Reduction concentrates everything in the liquid—sugars, acids, proteins—creating depth. Thickening with cornstarch, flour, or cream changes consistency but doesn&apos;t concentrate flavor. Professional sauces use reduction for flavor, then thicken only if needed.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                How long should I reduce a sauce?
              </h3>
              <p className="text-slate-700">
                Depends on volume—20 minutes for light reductions, up to 90 for demi-glace. A pan sauce from deglazing might reduce in 5-10 minutes. A full stock reduction for demi-glace can take 1-2 hours. Volume, pan size, and heat level all affect timing. Judge by consistency and taste, not the clock.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Can I store reduced sauces?
              </h3>
              <p className="text-slate-700">
                Yes—refrigerate up to 5 days or freeze up to 3 months. Store reduced sauces in airtight containers. They&apos;ll thicken further when chilled; gently reheat with a splash of stock or water to restore the original consistency. Reduced sauces are concentrated flavor bombs—perfect for quick weeknight meals.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                What does nappe consistency mean?
              </h3>
              <p className="text-slate-700">
                Nappe is the French term for when sauce coats the back of a spoon and leaves a clean trail when you drag your finger through it. This is the classic test for proper reduction. The sauce should cling to the spoon without being gloppy or running off immediately. It&apos;s the perfect balance between too thin and too thick.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Should I reduce with the lid on or off?
              </h3>
              <p className="text-slate-700">
                Always off. Covering the pan traps steam and prevents evaporation—the whole point of reduction. You want water to escape, concentrating the flavors left behind. A lid turns reduction into simmering, which doesn&apos;t change the liquid&apos;s composition. Keep it uncovered and watch the magic happen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Why is my reduced sauce cloudy instead of clear?
              </h3>
              <p className="text-slate-700">
                You didn&apos;t skim enough during reduction. As sauce simmers, proteins, fats, and impurities rise to the surface. If you don&apos;t skim them off, they emulsify back into the sauce, creating cloudiness. Skim every few minutes with a ladle or spoon for crystal-clear, professional results. Clarity equals clean flavor.
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
