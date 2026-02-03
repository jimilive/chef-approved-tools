// ============================================================================
// BACON BUT NOT IN THIS DISH - Blog Data
// Migrated from inline to data-driven architecture
// ============================================================================

export const baconData = {
  breadcrumb: {
    category: "Blog", title: "When NOT to Use Bacon"
  }, hero: {
    title: "Oh Sweet, Sweet Bacon: How I Love Thee (But Not in This Dish)", introduction: [
      "Learn when bacon overpowers dishes instead of enhancing them. Professional chef reveals 7 dishes where bacon doesn't belong and why restraint creates better food."
    ]
  }, sections: [
    {
      id: "intro", content: [
        "I love bacon. I really do. I've cooked thousands of pounds of it in professional kitchens. I've rendered bacon fat for cooking, made bacon-wrapped everything, and created countless dishes where bacon was the star.", "But here's the truth that took me years to learn: **bacon doesn't belong in every dish.**", "In today's food culture, bacon has become the culinary equivalent of a laugh track, something people add to force flavor instead of building it properly. We've turned bacon into a crutch, a shortcut, a way to make boring food taste interesting without actually learning technique.", "This isn't about hating bacon. This is about respecting it enough to use it only where it truly belongs."
      ]
    }, {
      id: "bacon-problem", title: "The Bacon Problem in Modern Cooking", hasIcon: true, iconType: "scale", reasons: [
        {
          label: "It's a Flavor Bomb", description: "Bacon provides intense umami, salt, fat, and smoke all at once. It's cooking on easy mode, add bacon and suddenly your dish has \"flavor.\" But that's exactly the problem."
        }, {
          label: "It's Trendy (Still)", description: "The bacon craze of the 2010s never really ended. We still see bacon in ice cream, cocktails, donuts, and every possible dish. Food media taught an entire generation that bacon = flavor = good cooking."
        }, {
          label: "It Hides Poor Technique", description: "Can't build proper fond? Add bacon. Can't develop complex flavors through layering? Add bacon. Can't season properly with salt and acid? Add bacon."
        }
      ], warning: "If your first instinct is \"this needs bacon,\" pause and ask: \"What does this dish actually need?\" Usually the answer is better technique, proper seasoning, or patience, not pork products."
    }, {
      id: "seven-dishes", title: "7 Dishes Where Bacon Doesn't Belong", dishes: [
        {
          number: 1, name: "Delicate Fish Preparations", why: "Fish like halibut, sole, and cod have subtle, delicate flavors. Bacon obliterates those nuances completely. You're eating bacon that happens to have fish in it, not fish enhanced by supporting ingredients.", alternatives: ["Lemon and capers (classic for a reason)", "Brown butter with sage", "White wine reduction", "Olive oil with herbs"], realProblem: "If your fish is so bland it needs bacon, you bought bad fish. Fresh, high-quality fish needs minimal enhancement."
        }, {
          number: 2, name: "Fresh Summer Tomato Dishes", why: "Peak-season tomatoes are sweet, acidic, complex, and perfect. Adding bacon's smoke and salt covers everything that makes summer tomatoes special.", alternatives: ["Good olive oil and flaky sea salt", "Fresh basil", "Aged balsamic vinegar", "Burrata or fresh mozzarella"], exception: "BLTs work because bacon IS the star, with tomatoes providing acid balance. But in a Caprese salad or tomato salad? Bacon ruins it."
        }, {
          number: 3, name: "Proper Carbonara", why: "This one makes people angry, but traditional carbonara uses guanciale (cured pork jowl) or pancetta (Italian bacon), NOT American bacon. Bacon is smoked; guanciale and pancetta are cured but not smoked. The smoke overwhelms the delicate egg-cheese sauce.", alternatives: ["Guanciale (if you can find it)", "Pancetta (more available)", "If you must use bacon: use unsmoked bacon"]
        }, {
          number: 4, name: "Asian-Style Stir-Fries", why: "Stir-fries have carefully balanced flavors: ginger, garlic, soy sauce, sesame oil, sometimes fish sauce or oyster sauce. Bacon's smoke clashes with these flavors instead of complementing them.", alternatives: ["Chinese bacon (lap yuk) if pork is needed", "Char siu (Chinese BBQ pork)", "Regular pork belly", "Lap cheong (Chinese sausage)"]
        }, {
          number: 5, name: "Mushroom Risotto", why: "Mushrooms have earthy, umami-rich flavors that develop through proper sautéing and layering. Bacon's smoke and salt overpower that earthiness, turning complex mushroom flavors into \"bacon-flavored rice with mushroom texture.\"", alternatives: ["Pancetta (if you need pork)", "Mushroom stock for depth", "Porcini powder", "Proper sautéing technique for the mushrooms", "Parmesan and butter for richness"]
        }, {
          number: 6, name: "Proper French Onion Soup", why: "French onion soup is about deeply caramelized onions, rich beef stock, and melted Gruyère. It's already a rich, complex dish. Bacon adds nothing except confusion.", alternatives: ["Properly caramelized onions (45+ minutes)", "Rich beef stock", "Dry sherry or cognac", "Good Gruyère cheese"]
        }, {
          number: 7, name: "Caesar Salad (Usually)", why: "Traditional Caesar dressing already has anchovy, Parmesan, and egg, tons of umami. Adding bacon creates umami overload and turns a balanced salad into a meat-and-cheese delivery vehicle.", alternatives: ["Proper anchovies in the dressing", "Quality Parmesan", "Good croutons", "Perfectly grilled chicken (if protein is needed)"]
        }
      ]
    }, {
      id: "when-bacon-belongs", title: "When Bacon DOES Belong", intro: "Before you think I hate bacon, here are dishes where bacon is essential:", dishes: [
        { name: "BLT Sandwich", reason: "Bacon is the star; lettuce and tomato are supporting players" }, { name: "Carbonara (with guanciale or pancetta)", reason: "The pork fat is crucial for emulsifying the sauce" }, { name: "Bacon-Wrapped Dates or Scallops", reason: "Sweet + salty + smoke = perfect contrast" }, { name: "Proper Baked Beans", reason: "Bacon provides the pork base traditional recipes require" }, { name: "Clam Chowder (New England)", reason: "Bacon or salt pork is traditional and essential" }, { name: "Brussels Sprouts with Bacon", reason: "The bitter + smoke combination works perfectly" }
      ]
    }, {
      id: "philosophy", title: "The Philosophy of Restraint in Cooking", principles: [
        {
          label: "Ingredients Should Shine", description: "Good cooking highlights ingredients, not buries them. If you're using quality fish, vegetables, or meat, let those flavors come through."
        }, {
          label: "Technique Over Additions", description: "Adding bacon is easy. Developing proper fond, layering flavors, building complexity through technique. That's actual cooking skill."
        }, {
          label: "Balance Matters", description: "Every ingredient should have a purpose. If you can't explain WHY bacon belongs in a dish beyond \"it tastes good,\" it probably doesn't belong."
        }
      ]
    }, {
      id: "conclusion", title: "The Bottom Line on Bacon", content: [
        "Bacon is wonderful. I've cooked thousands of pounds of it. I've created dishes where bacon was essential and transformative.", "But bacon isn't seasoning. It's not a fix for boring food. It's not appropriate in every dish just because people like it.", "Good cooking is about restraint, balance, and respecting ingredients. It's about knowing when to add something and, more importantly, when to leave it out.", "The next time you reach for bacon, pause and ask: \"Does this dish actually need bacon, or am I using it because I don't know how else to make it interesting?\"", "Most of the time, the answer is the latter. And that's okay, as long as you're honest about it and willing to learn the techniques that create real flavor.", "Save bacon for the dishes where it truly belongs. Your cooking will be better for it."
      ]
    }
  ], newsletterCTA: {
    slug: "bacon-but-not-in-this-dish", description: "Get my free \"11 Essential Tools I Use Most\" PDF, the exact equipment I rely on after 24 years in professional kitchens, including the tools that help you build flavor without shortcuts. No fluff, just the tools that actually matter."
  }, faq: {
    questions: [
      {
        question: "But everyone loves bacon! Why does it matter if I add it?", answer: "Everyone loves isn't a cooking principle. People also love sugar and salt. That doesn't mean we add them to everything. Good cooking is about balance, not pandering. If you want to become a better cook, challenge yourself to create delicious food without relying on bacon as a crutch."
      }, {
        question: "How do I know if bacon belongs in a dish?", answer: "Ask yourself: 1) Is bacon traditional in this dish? 2) Can I taste the other main ingredients, or does bacon dominate? 3) Am I adding bacon because the dish actually needs it, or because I can't figure out how to make it taste good? If you can't answer those questions, leave bacon out."
      }, {
        question: "What about bacon fat for cooking instead of bacon pieces?", answer: "Bacon fat is more versatile than bacon pieces because you control the smoke intensity. I keep rendered bacon fat in my fridge and use it for roasting vegetables, frying eggs, and making cornbread. But even bacon fat doesn't belong everywhere. It's still smoky pork flavor."
      }
    ]
  }, relatedArticles: [
    { href: "/blog/benefits-cooking-with-garlic", title: "Benefits of Cooking with Garlic" }, { href: "/blog/fat-is-flavor", title: "Why Fat is Flavor" }, { href: "/blog/understanding-acids-cooking", title: "Understanding Acids in Cooking" }, { href: "/blog/how-to-cook-perfect-pasta", title: "How to Cook Perfect Pasta" }
  ]
}
