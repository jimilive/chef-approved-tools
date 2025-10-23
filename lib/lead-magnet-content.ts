// Lead magnet content for "The 11 Tools I Use Most in My Home Kitchen"
import { getProductBySlug, getPrimaryAffiliateLink } from './product-helpers'

// Helper function to get tool data from products database
function getToolData(slug: string, customWhy: string, customStory: string) {
  const product = getProductBySlug(slug)
  if (!product) {
    throw new Error(`Product not found: ${slug}`)
  }

  return {
    name: product.name,
    amazonUrl: getPrimaryAffiliateLink(product),
    why: customWhy,
    story: customStory
  }
}

export const leadMagnetContent = {
  title: "The 11 Tools I Use Most: From Professional Kitchens to My Apartment Kitchen",
  subtitle: "My daily workhorse tools, tested in professional kitchens and proven at home.",
  author: "Scott Bradley - 24 Years Professional Kitchen Experience",

  // The 11 actual tools with Amazon affiliate links - dynamically pulled from products database
  tools: [
    getToolData(
      'victorinox-fibrox-10-inch-chefs-knife',
      "The longer blade is perfect for larger cuts and if you have bigger hands. I keep both sizes.",
      "This is the knife I grab for breaking down proteins and chopping larger vegetables. The extra 2 inches makes a real difference when you're working fast."
    ),
    getToolData(
      'victorinox-fibrox-8-inch-chefs-knife',
      "More maneuverable for precise cuts. Perfect for most home cooking tasks.",
      "This is the workhorse. 80% of my knife work happens with this 8-inch. It's balanced, sharp, and never lets me down."
    ),
    getToolData(
      'victorinox-paring-knife',
      "Essential for detailed work - peeling, trimming, deveining shrimp.",
      "You can't do precision work with a chef's knife. This little guy handles everything from garlic to strawberries."
    ),
    getToolData(
      'victorinox-granton-edge-boning-knife',
      "Firm blade gets close to bones. Also great for filleting smaller fish.",
      "Breaking down a whole chicken takes 3 minutes with this knife. The granton edge prevents sticking."
    ),
    getToolData(
      'victorinox-offset-bread-knife',
      "Offset handle keeps knuckles off the cutting board. Serrated edge never needs sharpening.",
      "Bread, tomatoes, cakes - anything with a delicate exterior. The offset design is a game-changer for comfort."
    ),
    {
      name: "OXO Good Grips Swivel Peeler",
      amazonUrl: "https://amzn.to/4nLKDkf",
      why: "Comfortable grip, sharp blade, swivels to follow contours.",
      story: "I've tried every peeler out there. This is the one. It just works, day after day, year after year."
    },
    {
      name: "OXO Good Grips Bench Scraper",
      amazonUrl: "https://amzn.to/4Y5MepL",
      why: "Moves chopped ingredients, scrapes dough, cleans cutting boards.",
      story: "Most underrated tool in any kitchen. Once you start using one, you'll wonder how you lived without it."
    },
    {
      name: "Winco Heavy Duty Tongs (12\")",
      amazonUrl: "https://amzn.to/4n0pWIy",
      why: "Restaurant-grade tongs with proper spring tension and durability.",
      story: "These are a heavy duty version of the same style tongs used in every professional kitchen. Strong, reliable, dishwasher-safe."
    },
    {
      name: "Benriner Large Mandoline",
      amazonUrl: "https://amzn.to/3kBAukM",
      why: "Professional consistency for slicing. Adjustable thickness.",
      story: "Perfect potato gratin every time. Consistent slices mean even cooking. Just watch your fingers!"
    },
    {
      name: "ZUPERIA Bar Mops (12-pack)",
      amazonUrl: "https://amzn.to/4nfExRj",
      why: "Absorbent, durable, machine washable. These are what restaurants actually use.",
      story: "Forget fancy kitchen towels. These are what every professional kitchen uses. They last forever and actually dry things."
    },
    {
      name: "Epicurean Kitchen Cutting Board (17.5\" × 13\")",
      amazonUrl: "https://amzn.to/4kLtMa7",
      why: "Dishwasher-safe, knife-friendly, won't harbor bacteria like wood.",
      story: "I've used wooden boards for decades. These are better. Period. Dishwasher-safe changes everything."
    }
  ],

  sections: [
    {
      title: "Why Only 11 Tools?",
      content: [
        "I've been cooking since I was 10 years old—45 years of experience, including 24 years working professionally from Wendy's at 15 to managing kitchen operations at Mellow Mushroom and 6 years at Purple Café.",
        "When I set up my home kitchen, I kept only what I actually reach for. Everything else is marketing.",
        "These 11 tools handle 99% of what I cook at home. No junk drawers. No single-use gadgets. Just workhorses that earn their space."
      ]
    },
    {
      title: "Total Investment: About $320",
      content: [
        "For roughly $320, you get a complete professional-quality toolkit that will last decades with proper care.",
        "Compare that to what celebrity chefs push on Instagram—$1,000+ knife sets that mostly sit unused.",
        "Every tool on this list has survived years of restaurant abuse. They'll handle anything your home kitchen throws at them."
      ]
    },
    {
      title: "The Victorinox Advantage",
      content: [
        "Notice 5 of the 11 tools are Victorinox knives? There's a reason.",
        "Victorinox makes the knives I used daily at Purple Café and at several other professional kitchens. Not because they're pretty—because they work.",
        "Sharp out of the box, easy to maintain, and they cost a fraction of 'luxury' brands. I've run mine through the dishwasher after every use for 20 years (though Victorinox doesn't recommend it). The key: dry them immediately after washing and never leave them sitting in water or with food on them.",
        "I've tried Japanese carbon steel, German forged, ceramic—you name it. For daily professional use, Victorinox wins every time."
      ]
    },
    {
      title: "Care & Maintenance: The Truth About How I Actually Do This",
      content: [
        "Here's what I've actually done for 20 years - not what the manufacturers recommend, but what works:",
        "",
        "**Knives:**",
        "• Hone/steel before each use (except the serrated bread knife - skip that one)",
        "• Run through the dishwasher after use (yes, even though Victorinox doesn't recommend it)",
        "• Dry immediately when the cycle finishes - don't leave them sitting wet",
        "• Never leave soaking in water or sitting with food on them (especially acidic stuff like tomatoes)",
        "• Get them professionally sharpened when they're dull, or learn to use a whetstone",
        "",
        "**Everything Else:**",
        "• Dishwasher safe - run them daily",
        "• Don't leave soaking in water",
        "• Don't leave with food sitting on them",
        "",
        "**Bar Mops:**",
        "• Machine wash with a little bleach to keep them sanitary",
        "• Machine dry (skip the fabric softener so it doesn't get in your food)",
        "",
        "I've been running everything through the dishwasher daily for two decades. Same knives, same peeler, same bench scraper. They all still work perfectly. The key is drying them right away and never leaving them sitting in water or with food residue."
      ]
    },
    {
      title: "What's NOT on This List (And Why)",
      content: [
        "🚫 Garlic press - Knife minces faster and easier to clean",
        "🚫 Egg slicer - Knife works fine",
        "🚫 Avocado tool - Use a spoon",
        "🚫 Multiple cutting boards - One good one is enough",
        "🚫 Knife block sets - You only need 4-5 knives max",
        "🚫 Expensive honing steel - A good honing steel doesn't need to cost $200",
        "",
        "Every item I didn't include failed the 'do I actually use this?' test. Be honest with yourself—half your kitchen tools probably live in a drawer untouched."
      ]
    },
    {
      title: "Where to Buy",
      content: [
        "I've included Amazon links for convenience (and yes, I earn a small commission if you buy through them).",
        "But you can find these same items at:",
        "• Restaurant supply stores (often cheaper, no membership needed)",
        "• WebstaurantStore.com (restaurant supply that ships to homes)",
        "• Sur La Table / Williams-Sonoma (though you'll pay more)",
        "",
        "The key is getting the RIGHT tools, not necessarily from the right store."
      ]
    }
  ],

  bonusContent: {
    title: "BONUS: Professional Knife Skills in 5 Minutes",
    items: [
      "□ Pinch grip - Thumb and forefinger on blade, not handle",
      "□ Claw hand - Curl fingertips away from blade when cutting",
      "□ Sharp = safe - Dull knives require more pressure and slip",
      "□ Hone before every use - Takes 10 seconds, keeps edge aligned",
      "□ Let the knife do the work - If you're forcing it, it's dull"
    ]
  },

  footer: {
    contact: "Questions? Email scott@chefapprovedtools.com",
    website: "www.chefapprovedtools.com",
    credentials: "Scott Bradley - 24 Years Professional Kitchen Experience, A.A.S. Culinary Arts (Seattle Central College), Former Kitchen Manager at Mellow Mushroom"
  }
}

// Helper function to convert markdown bold to HTML
function convertMarkdownBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

// Helper function to generate PDF-ready content
export function generateLeadMagnetHTML(): string {
  const { title, subtitle, author, tools, sections, bonusContent, footer } = leadMagnetContent

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          line-height: 1.6;
          margin: 40px;
          color: #1F2937;
        }
        h1 {
          color: #EA580C;
          font-size: 28px;
          border-bottom: 3px solid #EA580C;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        h2 {
          color: #1F2937;
          font-size: 20px;
          margin-top: 40px;
          margin-bottom: 15px;
        }
        h3 {
          color: #374151;
          font-size: 16px;
          margin-top: 20px;
        }
        .subtitle {
          color: #6B7280;
          font-size: 16px;
          margin-bottom: 10px;
        }
        .author {
          color: #6B7280;
          font-style: italic;
          margin-bottom: 40px;
          font-size: 14px;
        }
        .tool {
          background: #F9FAFB;
          border-left: 4px solid #EA580C;
          padding: 15px;
          margin: 20px 0;
        }
        .tool-name {
          font-weight: bold;
          color: #1F2937;
          font-size: 16px;
          margin-bottom: 5px;
        }
        .tool-why {
          color: #374151;
          margin: 10px 0;
        }
        .tool-story {
          color: #6B7280;
          font-style: italic;
          margin: 10px 0;
          padding-left: 15px;
          border-left: 3px solid #D1D5DB;
        }
        .section {
          margin-bottom: 30px;
        }
        .bonus {
          background: #FEF3C7;
          padding: 25px;
          border-radius: 8px;
          margin: 30px 0;
          border-left: 4px solid #F59E0B;
        }
        .checklist {
          list-style: none;
          padding: 0;
        }
        .checklist li {
          margin: 8px 0;
          padding-left: 5px;
        }
        .footer {
          border-top: 2px solid #D1D5DB;
          padding-top: 20px;
          padding-bottom: 20px;
          margin-top: 40px;
          text-align: center;
          color: #6B7280;
          font-size: 14px;
        }
        ul {
          margin: 10px 0;
        }
        li {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="subtitle">${subtitle}</div>
      <div class="author">By ${author}</div>

      <h2>The 11 Tools</h2>
      ${tools.map(tool => `
        <div class="tool">
          <div class="tool-name">${tool.name}</div>
          <div class="tool-why"><strong>Why I use it:</strong> ${tool.why}</div>
          <div class="tool-story">"${tool.story}"</div>
        </div>
      `).join('')}

      ${sections.map((section: any) => `
        <div class="section">
          <h2>${section.title}</h2>
          ${section.content ? section.content.map((paragraph: string) => `<p>${convertMarkdownBold(paragraph)}</p>`).join('') : ''}
          ${section.subsections ? section.subsections.map((sub: any) => `
            <h3>${sub.title}</h3>
            <ul>
              ${sub.items.map((item: string) => `<li>${convertMarkdownBold(item)}</li>`).join('')}
            </ul>
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
        <p><strong>${footer.contact}</strong></p>
        <p>${footer.website}</p>
        <p>${footer.credentials}</p>
      </div>
    </body>
    </html>
  `
}
