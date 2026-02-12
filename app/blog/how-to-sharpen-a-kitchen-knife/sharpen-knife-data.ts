// ============================================================================
// HOW TO SHARPEN A KITCHEN KNIFE - Educational Blog Data
// Pattern B: How-To Educational Post
// ============================================================================

export const sharpenKnifeData = {
  breadcrumb: {
    category: "Blog",
    title: "How to Sharpen a Kitchen Knife"
  },

  hero: {
    title: "How to Sharpen a Kitchen Knife: A Professional Chef's Complete Guide",
    introduction: [
      "After 24 years in professional kitchens, I've seen more injuries from dull knives than sharp ones. That surprises people. They assume a sharper blade is more dangerous. But here's what actually happens when your knife is dull: you push harder to compensate. The blade slips. And when a dull edge slips under force, it doesn't go straight. It turns sideways, unpredictably, and if it goes straight toward the hand that isn't holding the knife, OUCH!"
    ]
  },

  howToSchema: {
    name: "How to Sharpen a Kitchen Knife with a Whetstone",
    description: "Professional chef technique for sharpening kitchen knives using the parallel sweep method on a tri-stone system. Step-by-step guide covering angle control, grit progression, burr formation, and edge testing.",
    totalTime: "PT20M",
    tools: [
      "Tri-stone sharpening system (such as the Norton IM200)",
      "Light mineral oil (for oil stones) or water (for water stones)",
      "Damp kitchen towel",
      "Honing steel (for finishing)",
      "Paper or tomato (for testing)"
    ],
    steps: [
      {
        name: "Set Up Your Station",
        text: "Place your sharpening stone on a damp towel or non-slip surface so it cannot move when you apply pressure. If using an oil stone, apply a thin film of light mineral oil to the surface. If using a water stone, make sure it is fully soaked until bubbles stop rising. Start with your coarsest grit if the knife is truly dull."
      },
      {
        name: "Establish Your Angle",
        text: "Set your knife at 15 to 20 degrees against the stone. A simple way to visualize this: lay the blade flat on the stone, then raise the spine about two stacked quarters off the surface. Consistency matters more than perfection. A consistent 22 degrees produces a better edge than wobbling between 15 and 25."
      },
      {
        name: "Position Knife Parallel to the Stone",
        text: "Orient the stone lengthwise away from your body. Hold the knife with the blade roughly parallel to the stone, tip facing away from you. This is the parallel sweep method used by professional chefs."
      },
      {
        name: "Sweep Tip to Heel Across the Full Stone Length",
        text: "Sweep the blade from tip to heel across the full length of the stone, moving from one corner of the stone lengthwise to the opposite corner in a single controlled stroke. This uses the entire stone surface for each pass, distributing wear evenly. Do five to ten passes on one side, then flip the knife and repeat on the other side."
      },
      {
        name: "Progress Through Finer Grits",
        text: "After completing the coarse stone, move to the medium stone and repeat with five to ten passes per side. Then move to the fine stone and repeat with five to ten passes per side, using progressively lighter pressure on the final passes."
      },
      {
        name: "Remove the Burr",
        text: "On your finest grit, make five to ten ultra-light strokes per side, alternating after each stroke. Think of it as wiping the edge across the stone rather than grinding. Then finish with a few passes on a honing rod to align any remaining micro-burr."
      },
      {
        name: "Test Sharpness",
        text: "Hold a sheet of printer paper by one end and slice downward. A sharp knife bites immediately and cuts smoothly with no snagging. For the kitchen test, rest the blade on tomato skin with zero downward pressure and pull forward gently. A sharp edge will break through the skin effortlessly."
      }
    ]
  },

  // Product slugs for Supabase lookups
  products: {
    nortonTriStone: 'norton-im200-tri-stone-sharpener',
    henckelsSteel: 'henckels-sharpening-steel',
    victorinox8: 'victorinox-fibrox-8-inch-chefs-knife'
  },

  // Two FAQs cherry-picked from old tri-stone blog post
  faq: {
    questions: [
      {
        question: "Why isn't my knife getting sharp even after sharpening?",
        answer: "The most common causes are not forming a burr (meaning you haven't sharpened all the way to the edge yet), inconsistent angle throughout the stroke, or starting with too fine a grit for a truly dull knife. If you have done many passes without feeling a burr along the full length of the edge, drop down to your coarsest stone and apply slightly more pressure. Also check that you are not changing your angle mid-stroke, which rounds the edge instead of sharpening it. Finally, make sure you are removing the burr at the end with light alternating passes on your finest stone."
      },
      {
        question: "How do I remove the burr after sharpening?",
        answer: "The burr is removed by progressing through finer grits with lighter pressure. Each finer stone creates a smaller burr until it is microscopic. On your finest stone, use very light strokes (just the weight of the knife), alternating sides after each stroke. Five to ten alternating passes with minimal pressure should break off the remaining burr cleanly. You can also finish with a few passes on a honing steel to align any remaining micro-burr and leave the cleanest possible edge."
      }
    ]
  },

  relatedArticles: [
    {
      href: "/reviews/norton-im200-tri-stone-sharpener",
      title: "Norton IM200 Tri-Stone Sharpener Review",
      description: "The sharpening system that survived 6 years of professional restaurant use."
    },
    {
      href: "/reviews/henckels-sharpening-steel",
      title: "Henckels Sharpening Steel Review",
      description: "The honing steel I have used daily since culinary school in 2005."
    },
    {
      href: "/blog/how-to-steel-a-knife",
      title: "How to Steel a Knife",
      description: "Learn proper honing technique to maintain your edge between sharpening sessions."
    },
    {
      href: "/reviews/victorinox-fibrox-8-inch-chefs-knife",
      title: "Victorinox Fibrox 8-Inch Chef's Knife Review",
      description: "The professional workhorse knife that sharpens beautifully on stones."
    },
    {
      href: "/blog/santoku-vs-chef-knife",
      title: "Santoku vs Chef Knife",
      description: "Understanding the differences helps you sharpen each style correctly."
    }
  ]
}
