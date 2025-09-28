// Lead magnet content for "Kitchen Manager's Equipment Survival Guide"

export const leadMagnetContent = {
  title: "The $500 vs $5,000 Kitchen Equipment Guide",
  subtitle: "Why Spending More Doesn't Always Mean Better (Professional Chef's Honest Breakdown)",
  author: "Scott Bradley, Kitchen Manager & Culinary Professional",

  sections: [
    {
      title: "The Shocking Truth: When $500 Equipment Outperforms $5,000 Gear",
      content: [
        "I've watched too many chefs waste their life savings on equipment that Instagram food bloggers recommended, only to see it fail during the first dinner rush.",
        "After managing $80K+/month restaurant operations and testing thousands of tools, I've discovered something the equipment industry doesn't want you to know:",
        "Price has almost ZERO correlation with performance under real kitchen pressure.",
        "This guide reveals exactly when to save money and when to splurge - based on 21+ years of brutal real-world testing."
      ]
    },
    {
      title: "The $500 vs $5,000 Kitchen Setup: Side-by-Side Comparison",
      content: [
        "🔥 THE $500 SETUP (Restaurant-Quality Performance):",
        "• Victorinox Fibrox Pro 8\" Chef Knife ($45) - SAME knife used in Michelin restaurants",
        "• Lodge 12\" Cast Iron Skillet ($35) - Outperformed $300 French cookware in heat retention tests",
        "• Vollrath 14\" Stainless Steel Sauté Pan ($89) - Survived 2+ years of 200-cover nights",
        "• NSF Commercial Cutting Board ($29) - Hospital-grade sanitation, dishwasher safe",
        "• Mercer Culinary Hone Steel ($24) - Identical to $150 versions from luxury brands",
        "• Digital Thermometer ($19) - More accurate than $200 analog thermometers",
        "• Bench Scraper ($12) - Most-used tool in professional kitchens",
        "• Kitchen Scale ($18) - Precision baking, portion control",
        "TOTAL: $471 + Professional Results ✅",
        "",
        "💸 THE $5,000+ SETUP (Luxury Brand Tax):",
        "• Kramer Carbon Steel 8\" Chef Knife ($450) - Instagram famous, maintenance nightmare",
        "• Mauviel Copper Cookware Set ($1,200) - Beautiful but requires constant polishing",
        "• KitchenAid Artisan Stand Mixer ($400) - Dies under commercial loads",
        "• Vitamix A3500 ($650) - Same motor as $350 model, just fancier buttons",
        "• Boos Block End-Grain Board ($200) - Harbors bacteria unless perfectly maintained",
        "• Japanese Water Stones Set ($300) - Requires expert technique to use properly",
        "• Designer Tool Set ($200) - Pretty but impractical for daily use",
        "TOTAL: $3,400+ Labor-Intensive Maintenance ❌",
        "",
        "🎯 THE TRUTH: Performance gap? Less than 5%. Price gap? 700%."
      ]
    },
    {
      title: "Rookie Mistakes That Cost Restaurants Thousands",
      content: [
        "1. BUYING BEAUTIFUL, NOT FUNCTIONAL",
        "That copper cookware looks amazing but requires constant maintenance and doesn't heat evenly.",
        "",
        "2. SKIPPING THE BORING ESSENTIALS",
        "Spent $2K on a fancy espresso machine but used $10 plastic cutting boards that harbored bacteria.",
        "",
        "3. NOT UNDERSTANDING VOLUME REQUIREMENTS",
        "Home-grade equipment dies quickly under commercial loads. Always buy one tier above your needs.",
        "",
        "4. IGNORING MAINTENANCE COSTS",
        "That $3,000 combi-oven needs $500 annual service calls. Factor ongoing costs into decisions."
      ]
    },
    {
      title: "Equipment by Category: What Actually Works",
      subsections: [
        {
          title: "KNIVES (Most Important Investment)",
          items: [
            "German vs Japanese: German knives (Wüsthof, Henckels) are more forgiving and easier to maintain. Japanese knives are sharper but require more skill.",
            "Size matters: 8\" is the sweet spot for 90% of tasks. 10\" if you're over 6 feet tall.",
            "The $20 rule: A sharp $20 knife outperforms a dull $200 knife every time."
          ]
        },
        {
          title: "COOKWARE (Foundation of Every Kitchen)",
          items: [
            "Tri-ply stainless steel: Even heating, easy cleanup, oven-safe to 500°F",
            "Cast iron: Perfect for searing, baking, camping. Lodge is 90% as good as expensive brands.",
            "Non-stick: Replace every 2 years max. Never spend more than $50 on a non-stick pan."
          ]
        },
        {
          title: "APPLIANCES (Buy Once, Use Forever)",
          items: [
            "Stand mixers: KitchenAid Commercial Series only. Home models die under heavy use.",
            "Blenders: Vitamix or Blendtec. Everything else is a toy in comparison.",
            "Food processors: Cuisinart DFP-14BCNY. Discontinued but available refurbished."
          ]
        }
      ]
    },
    {
      title: "Supplier Secrets: Where Pros Actually Shop",
      content: [
        "RESTAURANT DEPOT: Membership required, but wholesale prices on commercial equipment",
        "WEBSTAURANTSTORE: Online restaurant supply, ships to homes, no membership needed",
        "AMAZON COMMERCIAL: Business account gets better prices and bulk options",
        "LOCAL RESTAURANT SUPPLY: Often negotiate, especially for large orders"
      ]
    },
    {
      title: "Maintenance Schedule: Make Equipment Last Decades",
      content: [
        "DAILY:",
        "• Hone knives before each use",
        "• Hand wash and dry knives immediately",
        "• Season cast iron after cleaning",
        "",
        "WEEKLY:",
        "• Deep clean cutting boards with bleach solution",
        "• Check knife edges for chips or rolls",
        "• Oil wooden utensils and boards",
        "",
        "MONTHLY:",
        "• Professional knife sharpening (or learn to use whetstones)",
        "• Deep clean appliances according to manual",
        "• Inspect equipment for loose handles, worn parts"
      ]
    },
    {
      title: "Red Flags: Equipment to Avoid",
      content: [
        "• Anything with 'As Seen on TV' marketing",
        "• Knife sets with more than 6 pieces (you only need 3-4 knives max)",
        "• Cookware sets with non-stick interiors (buy pieces individually)",
        "• Single-use appliances (garlic presses, avocado slicers, etc.)",
        "• Equipment without clear warranty terms"
      ]
    }
  ],

  bonusContent: {
    title: "BONUS: 15-Minute Equipment Inspection Checklist",
    items: [
      "□ Knife edges - any chips, rolls, or excessive dullness?",
      "□ Cutting board surfaces - deep cuts harboring bacteria?",
      "□ Pan surfaces - warping, hot spots, coating damage?",
      "□ Appliance cords - fraying, loose connections?",
      "□ Moving parts - unusual noises, resistance, wobbling?",
      "□ Seals and gaskets - cracking, food buildup?",
      "□ Temperature readings - calibrate thermometers quarterly"
    ]
  },

  footer: {
    contact: "Questions? Email scott@chefapprovedtools.com",
    website: "www.chefapprovedtools.com",
    credentials: "Scott Bradley - Kitchen Manager, Seattle Central Culinary Graduate, 21+ Years Professional Experience"
  }
}

// Helper function to generate PDF-ready content
export function generateLeadMagnetHTML(): string {
  const { title, subtitle, author, sections, bonusContent, footer } = leadMagnetContent

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
        h1 { color: #EA580C; font-size: 24px; border-bottom: 3px solid #EA580C; padding-bottom: 10px; }
        h2 { color: #1F2937; font-size: 18px; margin-top: 30px; }
        h3 { color: #374151; font-size: 16px; }
        .subtitle { color: #6B7280; font-size: 14px; margin-bottom: 30px; }
        .author { color: #374151; font-style: italic; margin-bottom: 40px; }
        .section { margin-bottom: 30px; }
        .bonus { background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 30px 0; }
        .checklist { list-style: none; padding: 0; }
        .checklist li { margin: 5px 0; }
        .footer { border-top: 1px solid #D1D5DB; padding-top: 20px; margin-top: 40px; text-align: center; color: #6B7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="subtitle">${subtitle}</div>
      <div class="author">By ${author}</div>

      ${sections.map(section => `
        <div class="section">
          <h2>${section.title}</h2>
          ${section.content ? section.content.map(paragraph => `<p>${paragraph}</p>`).join('') : ''}
          ${section.subsections ? section.subsections.map(sub => `
            <h3>${sub.title}</h3>
            ${sub.items.map(item => `<p>• ${item}</p>`).join('')}
          `).join('') : ''}
        </div>
      `).join('')}

      <div class="bonus">
        <h2>${bonusContent.title}</h2>
        <ul class="checklist">
          ${bonusContent.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="footer">
        <p>${footer.contact}</p>
        <p>${footer.website}</p>
        <p>${footer.credentials}</p>
      </div>
    </body>
    </html>
  `
}