import Link from 'next/link'

export const reviewData = {
  // Product identification
  productSlug: '[PRODUCT-SLUG]',

  // Metadata for SEO and OG images
  metadata: {
    title: '[Product Name] Review: [Testing Period] Professional Testing | Chef Approved Tools',
    description: '[One sentence about testing experience and key finding]',
    ogTitle: '[Product Name] Review: [Testing Period] Professional Testing',
    ogDescription: 'Professional chef review after [testing period] of [testing environment] testing',
    testingPeriod: '[X+ years]',
    tier: 1, // 1 = Professional, 2 = Personal Long-term, 3 = Expert Evaluation
  },

  // Tracking data
  tracking: {
    testingPeriod: '[X+ years in commercial restaurant operations]',
    hook: '[Professional-grade performance that survived X+ years of daily restaurant abuse]',
  },

  // Breadcrumb
  breadcrumb: {
    productName: '[Product Short Name]',
  },

  // Legacy product data (fallback if not in Supabase)
  legacyProductData: {
    name: '[Full Product Name]',
    slug: '[product-slug]',
    brand: '[Brand Name]',
    model: '[Model Number]',
    sku: '[SKU]',
    gtin13: '[GTIN13]',
    dealStatus: 'normal' as const,
    category: '[Category]',
    pros: [
      '[Pro 1 - be specific with numbers/details]',
      '[Pro 2]',
      '[Pro 3]',
      '[Pro 4]',
      '[Pro 5]',
      '[Pro 6]',
      '[Pro 7]',
    ],
    cons: [
      '[Con 1 - be honest about limitations]',
      '[Con 2]',
      '[Con 3]',
      '[Con 4]',
      '[Con 5]',
    ],
    affiliateLinks: [],
    inStock: true,
    expertRating: 4.8,
    expertOpinion: '[One sentence professional verdict from testing]',
    dateAdded: '[YYYY-MM-DD]',
    lastUpdated: '[YYYY-MM-DD]',
  },

  // FAQ data for schema
  faqData: [
    {
      question: '[Common question about the product]',
      answer: '[Detailed answer based on professional experience]',
    },
    {
      question: '[Question about specific feature or concern]',
      answer: '[Honest answer with professional context]',
    },
    // Add 4-10 FAQs total
  ],

  // SECTION 1: HERO
  hero: {
    title: '[Product Name] Review: [Testing Period] Professional Testing',
    authorName: 'Scott Bradley',
    authorCredentials: 'Professional Chef • 24 Years in Professional Kitchens',
    rating: 4.8,
    tierBadge: {
      icon: '🏆',
      text: 'Tier 1: Professional Kitchen Use',
      linkText: "What's this?",
      linkHref: '#',
    },
    verdictStrong: 'After [testing period] as our [primary use case] at [location], the [Product Name] delivered [key finding].',
    verdict: '[Additional context about performance under demanding conditions. Highlight durability, consistency, or standout features.]',
    ctaText: 'View on Amazon →',
    ctaSubtext: 'Check current pricing and availability',
  },

  // SECTION 2: TESTING RESULTS
  testingResults: {
    title: '[X+ Years] of Professional Kitchen Testing',
    sections: [
      {
        title: '[Primary Performance Category in Action]',
        content: (
          <p className="text-slate-700 leading-[1.7] mb-4 last:mb-0">
            During [X years] of [usage context] at [location], the [Product Name] [specific performance details]. The [key feature] consistently [performance outcome] that met our quality standards. The [Product Name] became as essential to our operations as our <Link href="#" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">[related tool 1]</Link> and <Link href="#" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">[related tool 2]</Link>, handling tasks that previously required multiple [tools/steps].
          </p>
        ),
      },
      {
        title: 'Exceptional Durability Under Pressure',
        content: (
          <p className="text-slate-700 leading-[1.7] mb-4 last:mb-0">
            What sets this [product type] apart is its [construction quality]. After [X years] of daily [use type], including [specific demanding tasks], the [component] shows no signs of degradation. The [parts] maintain their [quality], the [component] integrity remains intact, and performance has stayed consistently [adjective] throughout our testing period. The [Product Name]&apos;s durability rivals that of my <Link href="#" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">[comparable high-quality tool]</Link>—both are genuine buy-it-for-life investments that justify premium pricing.
          </p>
        ),
      },
      {
        title: 'Superior Results vs Competition',
        content: (
          <p className="text-slate-700 leading-[1.7] mb-4 last:mb-0">
            The [key differentiator] of the [Product Name] creates [results] that other [product type] simply cannot match. [Specific outcomes] achieve perfect [quality] without [common issues], while [results] reach restaurant-quality [standard]. The [control feature] allows for precise [control type] - essential for professional applications where [consistency factor] matters for customer satisfaction.
          </p>
        ),
      },
    ],
    testingEnvironment: [
      { label: 'Location', value: '[Testing Location]' },
      { label: 'Primary Use', value: '[Primary use case]' },
      { label: 'Volume', value: '[Usage frequency/volume]' },
      { label: 'Duration', value: '[X years] of continuous testing' },
    ],
    outstandingPerformance: [
      '[Outstanding aspect 1 - specific result]',
      '[Outstanding aspect 2]',
      '[Outstanding aspect 3]',
      '[Outstanding aspect 4]',
      '[Outstanding aspect 5]',
    ],
    minorConsiderations: [
      '[Minor concern 1 - be honest]',
      '[Minor concern 2]',
      '[Minor concern 3]',
      '[Minor concern 4]',
    ],
  },

  // SECTION 3: PERFORMANCE ANALYSIS
  performanceAnalysis: {
    title: 'Performance Analysis: What Sets the [Product Name] Apart',
    sections: [
      {
        title: '[Primary Performance Category]',
        content: (
          <>
            <p className="text-slate-700 leading-[1.7] mb-4 last:mb-0">
              <strong>Real-World [Performance Type] Excellence:</strong> The [key component] handles [challenge] without strain, creating consistently [result] at [speed/efficiency] that dramatically reduce [pain point]. This [product type] pairs perfectly with other essentials in my <Link href="#" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">[collection/guide link]</Link>, streamlining [workflow] alongside my <Link href="#" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">[tool 1]</Link> and <Link href="#" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">[tool 2]</Link>.
            </p>
          </>
        ),
        metrics: [
          { label: '[Metric 1 Category]', score: '5', maxScore: '5' },
          { label: '[Metric 2 Category]', score: '5', maxScore: '5' },
          { label: '[Metric 3 Category]', score: '4', maxScore: '5' },
        ],
      },
      {
        title: '[X+ Year] Durability Assessment',
        content: (
          <p className="text-slate-700 leading-[1.7] mb-4">
            <strong>[X+ Year] Durability Report:</strong> Zero repairs needed during our entire testing period. [Component 1] remains excellent with no noticeable [wear type]. [Component 2] has stayed consistent without any [degradation type]. [Component 3] shows minimal wear despite daily commercial use. This level of reliability is exactly what professional kitchens demand.
          </p>
        ),
        bulletPoints: [
          { label: '[Component 1]', value: '[Condition after testing period]' },
          { label: '[Component 2]', value: '[Condition after testing period]' },
          { label: '[Component 3]', value: '[Condition after testing period]' },
          { label: 'Repairs Needed', value: 'No repairs required during entire testing period' },
        ],
      },
      {
        title: 'Why Chefs Choose [Product Name] in Professional Kitchens',
        content: (
          <>
            <p className="text-slate-700 leading-[1.7] mb-4">
              <strong>Industry Standard:</strong> The [Product Name] is [adoption statement in professional settings]. Chefs use it [specific use cases], to [achieve specific result].
            </p>
            <p className="text-slate-700 leading-[1.7] mb-4">
              <strong>Professional Preference:</strong> Many chefs actually prefer the [Product/Model] over [alternatives] because [specific reason with concrete example].
            </p>
            <p className="text-slate-700 leading-[1.7] mb-4 last:mb-0">
              Found in [types of establishments], the [Product Name] has earned the trust of chefs for its [key attributes] in professional [application type].
            </p>
          </>
        ),
      },
    ],
  },

  // SECTION 4: COMPARISON TABLE
  comparison: {
    title: '[Product Name] vs Professional Alternatives',
    introText: (
      <p>
        For more [product type] recommendations across different budgets, check our <Link href="#" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">complete reviews section</Link>.
      </p>
    ),
    mainProductName: '[Product Name]',
    competitor1Name: '[Competitor 1]',
    competitor2Name: '[Competitor 2]',
    rows: [
      {
        feature: '[Feature 1]',
        mainProduct: '[Value]',
        mainProductStyle: 'success',
        competitor1: '[Value]',
        competitor1Style: 'default',
        competitor2: '[Value]',
        competitor2Style: 'info',
      },
      {
        feature: '[Feature 2]',
        mainProduct: '[Value]',
        mainProductStyle: 'success',
        competitor1: '[Value]',
        competitor1Style: 'default',
        competitor2: '[Value]',
        competitor2Style: 'info',
      },
      // Add 5-7 rows comparing key features
    ],
  },

  // SECTION 5: PROS & CONS
  prosConsTitle: 'Pros & Cons After [X+ Years] of Use',
  prosTitle: 'What I Love After [X+ Years]',
  consTitle: 'Limitations & Long-Term Concerns',
  // pros and cons come from legacyProductData above

  // SECTION 6: WHO SHOULD BUY
  whoShouldBuy: {
    title: "Who Should (and Shouldn't) Buy the [Product Name]",
    perfectForTitle: '✅ Perfect For:',
    considerAlternativesTitle: '⚠️ Consider Alternatives If:',
    perfectFor: [
      '[User type 1 - be specific]',
      '[Use case 1]',
      '[User type 2]',
      '[User type 3]',
      '[Use case 2]',
      '[User type 4]',
    ],
    considerAlternatives: [
      '[Reason to skip 1 - be honest]',
      '[Reason to skip 2]',
      '[Reason to skip 3]',
      '[Reason to skip 4]',
      '[Reason to skip 5]',
    ],
  },

  // SECTION 7: FAQ
  faq: {
    title: 'Frequently Asked Questions About [Product Name]',
    items: [
      {
        question: '[Is the Product Name worth the money?]',
        answer: (
          <>
            <p>After [X years] of professional use, [yes/no]—if [condition]. The combination of [features] justifies the [price level] investment. For [target user], this pays for itself through [value proposition].</p>
            <p>However, if you [opposite use case], a [alternative] may serve you fine. The value proposition: [cost analysis or longevity calculation].</p>
          </>
        ),
      },
      {
        question: "[What's the difference between Product Name and other models?]",
        answer: (
          <>
            <p>The [Product Name] is [positioning statement]. Key differences from other [brand/category] models:</p>
            <ul className="list-none pl-0 space-y-2">
              <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-orange-700 before:font-bold before:text-xl">
                <strong>vs. [Model 1]:</strong> [Key difference with context]
              </li>
              <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-orange-700 before:font-bold before:text-xl">
                <strong>vs. [Model 2]:</strong> [Key difference with context]
              </li>
              <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-orange-700 before:font-bold before:text-xl">
                <strong>vs. [Model 3]:</strong> [Key difference with context]
              </li>
            </ul>
            <p><strong>My take:</strong> [Recommendation with reasoning]</p>
          </>
        ),
      },
      // Add 4-8 more FAQs covering common questions, concerns, and use cases
    ],
  },

  // SECTION 8: WHERE TO BUY
  whereToBuy: {
    title: 'Where to Buy the [Product Name]',
    introText: 'Based on [X+ years] of professional testing, I recommend purchasing from these authorized retailers:',
    retailers: [
      {
        name: 'Amazon',
        description: 'Prime shipping, verified reviews, easy returns',
        url: '[AFFILIATE_URL]',
        ctaText: 'View on Amazon →',
        ctaId: 'where-to-buy-amazon',
        highlighted: true,
      },
      {
        name: '[Brand] Direct',
        description: 'Factory direct, full warranty, occasional promotions',
        url: '[DIRECT_URL]',
        ctaText: 'Visit [Brand].com →',
        ctaId: 'where-to-buy-brand-direct',
        highlighted: false,
      },
    ],
    disclaimer: 'Note: Prices and availability may vary. Check both retailers for current deals and promotions.',
  },

  // SECTION 9: EMAIL CAPTURE
  emailCapture: {
    title: 'Get My Professional Kitchen Equipment Guide',
    subtitle: 'Join 2,500+ home cooks getting my weekly recommendations. No spam, just honest gear advice from 24 years in professional kitchens.',
    inputPlaceholder: 'Enter your email',
    buttonText: 'Get Free Guide',
    finePrint: 'Free guide includes my 11 essential tools + buying tips',
  },

  // SECTION 10: BOTTOM LINE
  bottomLine: {
    title: '[Key Takeaway Statement About Value Proposition]',
    paragraphs: [
      <>
        <strong>After [X+ years] of daily professional testing at [location], the [Product Name] has earned its reputation as [positioning statement].</strong> The combination of [key features] creates a value proposition that transcends its [price level] pricing for serious users.
      </>,
      <>
        This isn&apos;t a [product type] for [casual users]—it&apos;s an investment for [target users] who demand [key benefits]. If you [use case], prioritize [value 1] over [value 2], and want equipment that will last [timeframe], the [Product Name] delivers exceptional long-term value.
      </>,
      <>
        <strong>The verdict:</strong> For [primary users], this is a buy-it-for-life purchase that pays for itself through [value props]. For [secondary users], the [price level] investment may not align with [usage level]—consider [alternatives] instead.
      </>,
    ],
    ctaText: 'View Current Pricing on Amazon →',
  },

  // SECTION 11: RELATED PRODUCTS
  relatedProducts: {
    title: 'Related Professional Kitchen Equipment',
    products: [
      {
        name: '[Related Product 1]',
        description: '[One line description of use case]',
        emoji: '🔪',
        href: '#',
      },
      {
        name: '[Related Product 2]',
        description: '[One line description of use case]',
        emoji: '🥘',
        href: '#',
      },
      {
        name: '[Related Product 3]',
        description: '[One line description of use case]',
        emoji: '🌡️',
        href: '#',
      },
      {
        name: '[Related Product 4]',
        description: '[One line description of use case]',
        emoji: '🍳',
        href: '#',
      },
    ],
  },
}
