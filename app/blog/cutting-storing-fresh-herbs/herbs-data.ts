// ============================================================================
// CUTTING & STORING FRESH HERBS - Blog Data
// Migrated from inline to data-driven architecture
// ============================================================================

export const herbsData = {
  metadata: {
    title: "How To Cut & Store Fresh Herbs (Stay Fresh For Weeks)",
    description: "Master professional techniques for cutting, storing, and preserving fresh herbs. Learn why technique matters and how to keep herbs fresh for days.",
    publishedDate: "2025-09-14",
    lastUpdated: "2025-10-24",
    primaryKeyword: "how to store fresh herbs",
    secondaryKeywords: ["cutting herbs", "herb storage", "keep herbs fresh"],
    readTime: "8 min read"
  },

  breadcrumb: {
    category: "Blog",
    title: "How To Cut & Store Fresh Herbs (Stay Fresh For Weeks)"
  },

  hero: {
    title: "How To Cut & Store Fresh Herbs (Stay Fresh For Weeks)",
    introduction: [
      "Master professional techniques for cutting, storing, and preserving fresh herbs. Learn why technique matters and how to keep herbs fresh for days."
    ]
  },

  howToSchema: {
    name: "How to Cut and Store Fresh Herbs",
    description: "Master professional techniques for cutting, storing, and preserving fresh herbs. Learn why technique matters and how to keep herbs fresh for days.",
    datePublished: "2025-09-14",
    tools: ["Sharp chef's knife or kitchen scissors", "Salad spinner", "Paper towels", "Glass jar or container", "Plastic bag"],
    steps: [
      { name: "Wash Herbs Properly", text: "Fill a large bowl with cold water. Submerge herbs and agitate gently. Lift herbs out (dirt sinks to bottom). Repeat if water is dirty. Never run herbs under direct stream. It damages leaves." },
      { name: "Dry Herbs Thoroughly", text: "Place washed herbs in a salad spinner and spin until no water droplets remain. This is critical: wet herbs oxidize faster and become slimy in storage." },
      { name: "Cut with Sharp Knife", text: "Use a very sharp knife to slice cleanly through herb cells with minimal crushing. For basil, use chiffonade method: stack leaves, roll tightly, slice thin ribbons. For cilantro/parsley, group stems and chop with rocking motion. Dull knives bruise herbs and cause rapid blackening." },
      { name: "Store Tender Herbs in Water", text: "For cilantro, parsley, and mint: trim ½ inch from stem bottoms, place in glass with 1-2 inches of water, cover loosely with plastic bag, refrigerate. Change water every 2-3 days. Lasts 1-2 weeks." },
      { name: "Store Hardy Herbs in Damp Towel", text: "For rosemary, thyme, sage: lay herbs on damp (not wet) paper towel, roll loosely, place in plastic bag or container, refrigerate. Lasts 1-2 weeks." },
      { name: "Handle Basil Specially", text: "Basil hates cold. Never refrigerate. Store at room temperature with stems in water, loosely covered. Cut basil immediately before use as it oxidizes within 10-15 minutes." }
    ]
  },

  faq: {
    questions: [
      {
        question: "How do I know if my herbs have gone bad?",
        answer: "Bad herbs show: slimy texture, dark brown/black color (not just on cut edges), moldy spots, or rotten smell. Slight wilting is okay (you can revive in cold water). But slime, mold, or bad smell = throw them out."
      },
      {
        question: "Can I store different herbs together?",
        answer: "Store similar herbs together (tender with tender, hardy with hardy), but keep strong-flavored herbs separate. Don't store basil with cilantro (flavors can transfer). Mint especially should be stored alone (it overpowers everything)."
      },
      {
        question: "Should I wash herbs before storing or before using?",
        answer: "Both methods work. Washing before storing means they're ready to use, but you MUST dry them completely (salad spinner). Washing just before using is safer if you're worried about moisture, but less convenient. Professional kitchens wash in the morning, dry completely, then store, ready when needed."
      },
      {
        question: "Why does my basil turn black in the refrigerator?",
        answer: "Basil is tropical and hates cold. Refrigeration causes cell damage (like frostbite), which leads to blackening. Store basil at room temperature (stems in water, loosely covered). It will last 3-5 days this way, longer than it would survive in the fridge."
      },
      {
        question: "Can I revive wilted herbs?",
        answer: "Yes, if they're just wilted (not slimy or brown). Trim stems, submerge entire herb in ice water for 10-15 minutes, then dry thoroughly and store properly. This rehydrates cells and perks them up. Works great for cilantro, parsley, and mint. Less effective for basil."
      },
      {
        question: "Are herb stems usable or should I throw them away?",
        answer: "Depends on the herb. Tender herb stems (cilantro, parsley) have great flavor. Use in stocks, sauces, or chop finely with leaves. Basil stems are edible but texture is off. Save for stocks. Woody stems (rosemary, thyme) are inedible. Discard or save for smoking/grilling flavor."
      }
    ]
  },

  relatedLinks: [
    { href: "/blog/oxidization-effect-on-food", text: "Oxidization's Effect on Food" },
    { href: "/blog/mis-en-place-professional-cooking", text: "Mis en Place Guide" },
    { href: "/guides/best-chef-knives", text: "Best Chef Knives Guide" }
  ]
}
