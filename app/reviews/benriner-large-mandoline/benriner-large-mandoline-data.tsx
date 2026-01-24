import Link from 'next/link'

export const reviewData = {
  // Product identification
  productSlug: 'benriner-large-mandoline',

  // Metadata for SEO and OG images
  metadata: {
    title: 'Benriner Mandoline: The $40 Japanese Slicer',
    description: 'Professional review of the Benriner mandoline after years of restaurant and home use. Japanese precision at an accessible price point.',
    ogTitle: 'Benriner Mandoline: Professional Review',
    ogDescription: 'Professional chef tests Benriner mandoline after years of restaurant use',
    testingPeriod: 'Years of Professional Testing',
    tier: 1,
  },

  // Tracking data
  tracking: {
    testingPeriod: 'Years of professional kitchen testing',
    hook: 'Japanese precision engineering delivers professional prep speed and accuracy',
  },

  // Breadcrumb
  breadcrumb: {
    productName: 'Benriner Large Mandoline',
  },

  // Legacy product data (fallback if not in Supabase)
  legacyProductData: {
    name: 'Benriner large mandoline',
    slug: 'benriner-large-mandoline',
    brand: 'Benriner',
    category: 'Kitchen Equipment',
    pros: [
      'Japanese precision engineering - consistent results every time',
      'Ultra-sharp blade handles paper-thin slicing easily',
      '70% faster than knife work for uniform slicing',
      'Precise thickness adjustment from paper-thin to 5mm',
      'Large capacity handles big vegetables (onions, potatoes)',
      'Blade stays sharp for years in professional use',
      'Replacement blades available at reasonable prices',
    ],
    cons: [
      'Extremely sharp - most dangerous tool in kitchen',
      'Requires constant attention and safety protocols',
      'Plastic body construction (not all-metal)',
      'Learning curve required for proper technique',
      'Not suitable for soft items like ripe tomatoes',
    ],
    affiliateLinks: [],
    inStock: true,
    expertRating: 5.0,
    expertOpinion: 'After years of professional use at Purple Cafe, the Benriner mandoline proved itself as genuine professional equipment.',
    dateAdded: '2025-10-13',
    lastUpdated: '2025-10-13',
  },

  // FAQ data for schema
  faqData: [
    {
      question: 'Is the Benriner mandoline worth it?',
      answer: 'After years of professional use, absolutely yes. The Japanese precision engineering delivers consistent results that justify the investment. Cuts prep time significantly and produces restaurant-quality uniform slices. For serious home cooks or professionals, this is the standard.',
    },
    {
      question: 'How dangerous is a mandoline slicer?',
      answer: "Extremely sharp blade requires serious respect. Always use the hand guard, never slice without it. Professional kitchens require cut-resistant gloves when using mandolines. The blade is sharp enough to slice through fingernails easily. This is not an exaggeration. With proper safety protocols, it's safe. Without them, it's one of the most dangerous tools in the kitchen.",
    },
    {
      question: "What's the difference between Benriner and cheap mandolines?",
      answer: 'The blade quality is night and day. Benriner uses high-carbon Japanese stainless steel that stays sharp significantly longer. Cheap mandolines dull quickly and produce inconsistent results. The adjustment mechanism on Benriner is precise and repeatable. Budget mandolines often have loose, imprecise adjustments that defeat the purpose of uniform slicing.',
    },
    {
      question: 'What vegetables work best on a mandoline?',
      answer: 'Excellent for: cucumbers, potatoes, radishes, carrots, zucchini, apples, onions, cabbage. Basically any firm vegetable or fruit that you want uniformly sliced. Avoid: very soft items like tomatoes (unless extremely ripe), leafy greens, or anything too irregular in shape. Soft items get crushed rather than cleanly sliced.',
    },
    {
      question: 'Should I get the Large or Original Benriner?',
      answer: 'The Large (reviewed here) is more versatile and stable for serious cooking. It handles full-size onions, potatoes, and cabbage without awkward positioning. The Original is more compact but has limited capacity, but it includes 3 julienne blade inserts for different cut sizes. Both include hand guard. For professional or serious home use, always choose the Large. Note: The Large version comes with a straight blade only (no julienne blades) included.',
    },
    {
      question: 'How do you clean a Benriner mandoline safely?',
      answer: 'Rinse immediately after use to prevent food from drying on blade. Use a brush or sponge, never your bare hand directly on blade. Dishwasher safe, but hand washing preserves blade edge longer. Always clean with extreme caution. The blade is sharp enough to cut through sponges easily. Many professionals keep a dedicated brush just for mandoline cleaning.',
    },
    {
      question: 'How long does the blade stay sharp?',
      answer: 'With proper care, the blade stays professionally sharp for years. In our restaurant environment with daily use, we found minimal dulling over time. The Japanese stainless steel holds an edge far better than budget alternatives. When it does eventually dull, replacement blades are available and reasonably priced.',
    },
    {
      question: 'Is the hand guard effective?',
      answer: "The included hand guard is well-designed and effective when used properly. It has spikes that grip the food securely and keeps your fingers safely away from the blade. That said, many professional cooks prefer cut-resistant gloves as additional protection. The hand guard is good, but the blade is so sharp that extra precaution is never wasted.",
    },
  ],

  // SECTION 1: HERO
  hero: {
    title: 'Benriner Large Mandoline Review: Professional Kitchen Test',
    authorName: 'Scott Bradley',
    authorCredentials: 'Professional Chef • 24 Years in Professional Kitchens',
    rating: 5.0,
    tierBadge: {
      icon: '🏆',
      text: 'Tier 1: Professional Kitchen Use',
      linkText: "What's this?",
      linkHref: '#',
    },
    verdictStrong: 'After years of professional use at Purple Cafe, the Benriner mandoline proved itself as genuine professional equipment.',
    verdict: 'Japanese precision engineering delivers consistent slicing that transformed our prep efficiency. Ultra-sharp blade handles everything from paper-thin cucumber to thick potato rounds with consistent accuracy.',
    ctaText: 'Check Price on Amazon →',
    ctaSubtext: 'Check current pricing and availability',
  },

  // SECTION 2: TESTING RESULTS
  testingResults: {
    title: 'Years of Professional Kitchen Testing',
    sections: [
      {
        title: 'Initial Testing & First Impressions',
        content: (
          <>
            <p className="text-base leading-relaxed text-slate-900 mb-4">
              When I started using the Benriner mandoline at Purple Café, I was skeptical. We&apos;d tried various slicers over the years, and most ended up in the back of the storage room after a few months. But this Japanese-made mandoline changed my perspective on what consistent slicing equipment could deliver.
            </p>
            <p className="text-base leading-relaxed text-slate-900 mb-0">
              I tested this alongside our <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Victorinox chef knives</Link> and <Link href="/reviews/john-boos-platinum-commercial-cutting-board" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">John Boos cutting boards</Link> at Purple Café. After years of daily professional use, it earned its permanent place in our prep station.
            </p>
          </>
        ),
      },
    ],
    testingEnvironment: [
      { label: 'Location', value: 'Purple Café' },
      { label: 'Primary Use', value: 'Daily vegetable prep and garnish work' },
      { label: 'Volume', value: 'High-volume professional kitchen operations' },
      { label: 'Duration', value: 'Years of continuous testing' },
    ],
    outstandingPerformance: [
      'Paper-thin slicing: Cucumbers so thin they\'re nearly transparent',
      'Clean cuts: No crushing or tearing, even on delicate vegetables',
      'Consistent results: Identical slices every single time',
      'Speed improvement: 70% faster than knife work for uniform slicing',
    ],
    minorConsiderations: [
      'Extremely sharp: Most dangerous tool in kitchen - requires constant attention',
      'Safety equipment mandatory: Hand guard must be used every single time',
      'Plastic body: Not all-metal construction (though proven durable)',
      'Learning curve: Takes practice to master proper technique',
    ],
  },

  // SECTION 3: PERFORMANCE ANALYSIS
  performanceAnalysis: {
    title: 'Performance Analysis: What Sets Benriner Apart',
    sections: [
      {
        title: 'Blade Quality: The Japanese Difference',
        content: (
          <>
            <p className="text-slate-600 leading-[1.7] mb-4">
              The blade is the heart of any mandoline, and the <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner mandoline&apos;s</Link> high-carbon Japanese stainless steel is exceptional. This isn&apos;t marketing hyperbole. The difference is immediately obvious when you make your first slice.
            </p>
            <p className="text-slate-600 leading-[1.7] mb-4">
              <strong>Sharpness Test:</strong> I can slice cucumbers so thin they&apos;re nearly transparent with the <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner</Link>. The blade glides through root vegetables like potatoes and carrots without crushing or tearing. Even after years of professional use, the edge remains sharp enough for clean, precise cuts.
            </p>
            <p className="text-slate-600 leading-[1.7] mb-4 last:mb-0">
              Compared to budget mandolines I&apos;ve tested, the <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner</Link> stays sharp significantly longer. Cheap mandolines dull quickly and start producing inconsistent results within months. The <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner mandoline</Link> maintains professional performance for years.
            </p>
          </>
        ),
      },
      {
        title: 'Precision and Consistency',
        content: (
          <>
            <p className="text-slate-600 leading-[1.7] mb-4">
              The adjustment mechanism is where the <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner mandoline</Link> separates itself from competitors. The thickness dial offers precise, repeatable settings from paper-thin to about 5mm. Each click provides consistent results, critical when you&apos;re slicing for even cooking or uniform presentation.
            </p>
            <p className="text-slate-600 leading-[1.7] mb-4">
              In a professional kitchen serving hundreds of customers daily, consistency isn&apos;t optional. When we needed uniform potato slices for gratins or precisely thin radishes for garnish, the <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner</Link> delivered identical results every single time.
            </p>
            <p className="text-slate-600 leading-[1.7] mb-4 last:mb-0">
              The large capacity is a significant advantage. Unlike smaller mandolines, the <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner Large</Link> handles full-size onions, potatoes, and even cabbage halves without awkward positioning. This makes high-volume prep dramatically more efficient than working with a smaller model.
            </p>
          </>
        ),
      },
      {
        title: 'Durability and Construction',
        content: (
          <>
            <p className="text-slate-600 leading-[1.7] mb-4">
              The construction of the <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner mandoline</Link> is sturdy but not heavy. The body is made from BPA-free plastic that&apos;s proven durable through years of professional use. While it&apos;s not all-metal construction, the design prioritizes functionality over aesthetics.
            </p>
            <p className="text-slate-600 leading-[1.7] mb-4">
              The feet provide stable grip on countertops, though I sometimes secure it with a damp towel underneath for maximum stability during high-speed slicing. The <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner</Link> pairs perfectly with our <Link href="/reviews/oxo-good-grips-bench-scraper" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">OXO bench scraper</Link> for gathering sliced vegetables.
            </p>
            <p className="text-slate-600 leading-[1.7] mb-4 last:mb-0">
              After years of daily use in a commercial kitchen, our <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner</Link> shows minimal wear. The adjustment mechanism remains tight and precise, and the blade still delivers professional results. When the blade eventually dulls, replacement blades are available at reasonable prices.
            </p>
          </>
        ),
      },
      {
        title: 'Professional Kitchen Performance',
        content: (
          <>
            <p className="text-slate-600 leading-[1.7] mb-4">
              Over years of professional use, I&apos;ve put the <Link href="/reviews/benriner-large-mandoline" className="text-orange-700 no-underline font-medium hover:underline hover:text-orange-700">Benriner mandoline</Link> through scenarios that would destroy budget alternatives:
            </p>
          </>
        ),
        bulletPoints: [
          {
            label: 'High-Volume Prep',
            value: 'Slicing 50+ pounds of vegetables daily during peak season. The Benriner mandoline maintained consistent performance without dulling or loosening.',
          },
          {
            label: 'Tough Vegetables',
            value: 'Root vegetables like turnips, beets, and sweet potatoes. The blade powered through without requiring excessive force.',
          },
          {
            label: 'Delicate Work',
            value: 'Paper-thin cucumber slices for garnish, translucent radish rounds for presentation. Precise control for delicate tasks.',
          },
          {
            label: 'Speed Tests',
            value: 'Compared to knife work, the mandoline cut prep time by approximately 70% for uniform slicing tasks. Critical in a professional environment where time equals money.',
          },
        ],
      },
    ],
  },

  // CUSTOM SECTION: SAFETY (Product-specific - life-critical)
  safety: {
    warnings: [
      <>
        <strong>This is the most dangerous tool in my kitchen.</strong> That&apos;s not an exaggeration. The blade is sharp enough to slice through fingernails easily. I&apos;ve seen experienced cooks get careless and pay the price.
      </>,
    ],
    guidelines: {
      title: 'Non-Negotiable Safety Rules',
      items: [
        'Always use the hand guard, no exceptions',
        'Consider cut-resistant gloves for additional protection',
        'Never rush when using a mandoline',
        'Keep your eyes on the blade at all times',
        'Clean with extreme caution using a brush, never bare hands',
      ],
    },
    additionalInfo: (
      <>
        <p className="text-base leading-relaxed text-slate-900 mb-4">
          The included hand guard is well-designed with spikes that grip food securely. It works effectively when used properly. That said, many professional kitchens require cut-resistant gloves as additional protection.
        </p>
        <p className="text-base leading-relaxed text-slate-900 mb-0">
          If you&apos;re uncomfortable with extremely sharp blades or tend to rush through prep work, this tool isn&apos;t for you. But with proper safety protocols and respect for the blade, it&apos;s a worthwhile addition to your kitchen.
        </p>
      </>
    ),
  },

  // CUSTOM SECTION: COMPATIBILITY GUIDE (Product-specific - vegetable guide)
  compatibility: {
    categories: [
      {
        title: 'Excellent Results',
        emoji: '✅',
        items: [
          { name: 'Cucumbers', rating: 'excellent' as const, note: 'Paper-thin slices' },
          { name: 'Potatoes', rating: 'excellent' as const, note: 'Perfect for gratins' },
          { name: 'Radishes', rating: 'excellent' as const, note: 'Translucent rounds' },
          { name: 'Carrots', rating: 'excellent' as const, note: 'Uniform slices' },
          { name: 'Zucchini', rating: 'excellent' as const, note: 'Consistent thickness' },
          { name: 'Apples', rating: 'excellent' as const, note: 'Uniform for pies' },
          { name: 'Onions', rating: 'excellent' as const, note: 'Perfect rings' },
          { name: 'Cabbage', rating: 'excellent' as const, note: 'Coleslaw ready' },
          { name: 'Beets', rating: 'excellent' as const, note: 'Even cooking' },
          { name: 'Turnips', rating: 'excellent' as const, note: 'Professional cuts' },
        ],
      },
      {
        title: 'Avoid These',
        emoji: '❌',
        items: [
          { name: 'Ripe tomatoes', rating: 'avoid' as const, note: 'Too soft, will get crushed rather than sliced cleanly' },
          { name: 'Leafy greens', rating: 'avoid' as const, note: 'Wrong tool for this task - use a knife instead' },
          { name: 'Irregular shapes', rating: 'avoid' as const, note: 'Items that won\'t sit flat will produce inconsistent results' },
          { name: 'Very soft items', rating: 'avoid' as const, note: 'Stick to knife work for soft produce' },
        ],
      },
    ],
  },

  // SECTION 4: COMPARISON TABLE (Benriner doesn't have one in current version - skip for now)
  comparison: null,

  // SECTION 5: PROS & CONS
  prosConsTitle: 'Pros & Cons After Years of Use',
  prosTitle: 'What I Love After Years of Use',
  consTitle: 'Limitations & Important Concerns',

  // SECTION 6: WHO SHOULD BUY
  whoShouldBuy: {
    title: "Who Should (and Shouldn't) Buy the Benriner Mandoline",
    perfectForTitle: '✅ Perfect For:',
    considerAlternativesTitle: '⚠️ Consider Alternatives If:',
    perfectFor: [
      'Professional kitchens requiring high-volume prep',
      'Serious home cooks who value precision and consistency',
      'Those who cook regularly and need efficient prep',
      'Users comfortable with extremely sharp blades',
      'Anyone wanting professional-quality slicing at home',
      'Those who prioritize consistent results over convenience',
    ],
    considerAlternatives: [
      'You only occasionally slice vegetables (weekly or less)',
      "You're uncomfortable with extremely sharp blades",
      'You tend to rush through prep work',
      'Limited counter space or storage',
      'You need something for soft items like ripe tomatoes',
    ],
    sizing: {
      title: 'Size Considerations:',
      options: [
        {
          name: 'Large Benriner',
          note: 'Best for serious cooking. Handles full-size onions, potatoes, and cabbage without awkward positioning. More stable during use. Comes with straight blade only (no julienne blades). Includes hand guard. The extra capacity makes high-volume prep dramatically more efficient.',
        },
        {
          name: 'Original Benriner',
          note: 'More compact storage but limited capacity. Includes 3 julienne blade inserts for matchstick cuts at different sizes. Includes hand guard. Good for smaller kitchens with limited space, but less versatile than the Large. For professional or serious home use, the Large is worth the extra counter space.',
        },
      ],
    },
  },

  // SECTION 7: FAQ
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'Is the Benriner mandoline worth it?',
        answer: (
          <p>After years of professional use, absolutely yes. The Japanese precision engineering delivers consistent results that justify the investment. Cuts prep time significantly and produces restaurant-quality uniform slices. For serious home cooks or professionals, this is the standard.</p>
        ),
      },
      {
        question: 'How dangerous is a mandoline slicer?',
        answer: (
          <p>Extremely sharp blade requires serious respect. Always use the hand guard, never slice without it. Professional kitchens require cut-resistant gloves when using mandolines. The blade is sharp enough to slice through fingernails easily. This is not an exaggeration. With proper safety protocols, it&apos;s safe. Without them, it&apos;s one of the most dangerous tools in the kitchen.</p>
        ),
      },
      {
        question: "What's the difference between Benriner and cheap mandolines?",
        answer: (
          <p>The blade quality is night and day. Benriner uses high-carbon Japanese stainless steel that stays sharp significantly longer. Cheap mandolines dull quickly and produce inconsistent results. The adjustment mechanism on Benriner is precise and repeatable. Budget mandolines often have loose, imprecise adjustments that defeat the purpose of uniform slicing.</p>
        ),
      },
      {
        question: 'What vegetables work best on a mandoline?',
        answer: (
          <p>Excellent for: cucumbers, potatoes, radishes, carrots, zucchini, apples, onions, cabbage. Basically any firm vegetable or fruit that you want uniformly sliced. Avoid: very soft items like tomatoes (unless extremely ripe), leafy greens, or anything too irregular in shape. Soft items get crushed rather than cleanly sliced.</p>
        ),
      },
      {
        question: 'Should I get the Large or Original Benriner?',
        answer: (
          <p>The Large (reviewed here) is more versatile and stable for serious cooking. It handles full-size onions, potatoes, and cabbage without awkward positioning. The Original is more compact but has limited capacity, but it includes 3 julienne blade inserts for different cut sizes. Both include hand guard. For professional or serious home use, always choose the Large. Note: The Large version comes with a straight blade only (no julienne blades) included.</p>
        ),
      },
      {
        question: 'How do you clean a Benriner mandoline safely?',
        answer: (
          <p>Rinse immediately after use to prevent food from drying on blade. Use a brush or sponge, never your bare hand directly on blade. Dishwasher safe, but hand washing preserves blade edge longer. Always clean with extreme caution. The blade is sharp enough to cut through sponges easily. Many professionals keep a dedicated brush just for mandoline cleaning.</p>
        ),
      },
      {
        question: 'How long does the blade stay sharp?',
        answer: (
          <p>With proper care, the blade stays professionally sharp for years. In our restaurant environment with daily use, we found minimal dulling over time. The Japanese stainless steel holds an edge far better than budget alternatives. When it does eventually dull, replacement blades are available and reasonably priced.</p>
        ),
      },
      {
        question: 'Is the hand guard effective?',
        answer: (
          <p>The included hand guard is well-designed and effective when used properly. It has spikes that grip the food securely and keeps your fingers safely away from the blade. That said, many professional cooks prefer cut-resistant gloves as additional protection. The hand guard is good, but the blade is so sharp that extra precaution is never wasted.</p>
        ),
      },
    ],
  },

  // SECTION 8: WHERE TO BUY (not in current version - add minimal version)
  whereToBuy: {
    title: 'Where to Buy the Benriner Mandoline',
    introText: 'Based on years of professional testing, I recommend purchasing from these authorized retailers:',
    retailers: [
      {
        name: 'Amazon',
        description: 'Prime shipping, verified reviews, easy returns',
        url: '[AFFILIATE_URL]',
        ctaText: 'Check Price on Amazon →',
        ctaId: 'where-to-buy-amazon',
        highlighted: true,
      },
    ],
    disclaimer: 'Note: Prices and availability may vary.',
  },

  // SECTION 9: EMAIL CAPTURE
  emailCapture: {
    title: 'Get My Essential Kitchen Tools Guide',
    subtitle: 'Join 2,500+ home cooks and professional chefs. Get my free guide: "11 Tools I Use Most" plus weekly equipment reviews and technique tips.',
    inputPlaceholder: 'Your email address',
    buttonText: 'Get Free Guide',
    finePrint: 'Unsubscribe anytime. No spam, ever.',
  },

  // SECTION 10: BOTTOM LINE
  bottomLine: {
    title: 'The Bottom Line',
    paragraphs: [
      <>
        After years of professional use at Purple Café, the Benriner mandoline earned its permanent place in our prep station through consistent, reliable performance. Japanese precision engineering delivers the kind of results that justify the investment: paper-thin cucumber slices, perfectly uniform potato rounds, and consistent thickness that would take 70% longer by knife.
      </>,
      <>
        The blade quality is exceptional. Where budget mandolines dull within months, the Benriner maintains professional sharpness for years. The adjustment mechanism provides precise, repeatable thickness control from paper-thin to 5mm. Every aspect feels purpose-built for consistent results.
      </>,
      <>
        <strong>The reality:</strong> This is an extremely sharp, potentially dangerous tool that demands respect and proper safety protocols. Always use the hand guard, consider cut-resistant gloves, and never rush. For those comfortable with these requirements and who cook regularly, the Benriner transforms prep efficiency.
      </>,
      <>
        <strong className="text-white">Final Verdict: 4.5/5 ⭐⭐⭐⭐☆</strong>
        <br />
        Professional-grade equipment at a reasonable price. Would I buy this again? Without hesitation.
      </>,
    ],
    ctaText: 'Check Price on Amazon →',
  },

  // SECTION 11: RELATED PRODUCTS
  relatedProducts: {
    title: 'Related Professional Kitchen Equipment',
    products: [
      {
        name: 'John Boos Cutting Board',
        description: "The prep surface that matches this mandoline's precision. Perfect platform for uniform slicing.",
        emoji: '🪵',
        href: '/reviews/john-boos-platinum-commercial-cutting-board',
      },
      {
        name: 'Victorinox 8" Chef Knife',
        description: 'The knife I use alongside this mandoline. Professional quality for detailed work.',
        emoji: '🔪',
        href: '/reviews/victorinox-fibrox-8-inch-chefs-knife',
      },
      {
        name: 'OXO Bench Scraper',
        description: 'Perfect for gathering sliced vegetables from mandoline. Essential prep tool.',
        emoji: '🔧',
        href: '/reviews/oxo-good-grips-bench-scraper',
      },
      {
        name: 'Diamond Crystal Kosher Salt',
        description: 'The professional standard for seasoning. Perfect for salting sliced vegetables.',
        emoji: '🧂',
        href: '/reviews/diamond-crystal-kosher-salt',
      },
    ],
  },
}
