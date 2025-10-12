#!/usr/bin/env node

/**
 * Testimonial Generator Script
 *
 * Generates testimonial templates for a review
 * Usage: node scripts/review-tools/testimonial-gen.js <review-slug>
 */

const { reviewExists, formatHeader, formatInfo, formatSuccess } = require('./utils');

const TESTIMONIAL_TEMPLATES = {
  longevity: [
    `"We've had our [PRODUCT] for [X] years now with [daily/weekly] use. [Specific detail about durability]. Best $[X] we ever spent on kitchen equipment."`,
    `"Bought this [X] years ago, still using it today. Survived [number] moves and gets used [frequency]. My [family/roommates] keep asking where I got it."`,
    `"Mine is [X] years old and still going strong. Have replaced [cheaper alternative] twice in that time. This just keeps working."`
  ],

  value: [
    `"Was skeptical about the price, but this has outlasted [more expensive alternative]. [Specific comparison]. Worth every penny."`,
    `"Replaced an expensive [competitor] that died after [X] years. This [PRODUCT] has outlasted it by [X] years so far. Sometimes budget brands are actually better."`,
    `"Perfect value for money. Does everything I need without the premium price tag of [competitor brands]. No regrets."`
  ],

  comfort: [
    `"[Specific ergonomic benefit]. Have [arthritis/hand issues/etc.] and this is the only [tool type] I can use comfortably. Game changer."`,
    `"The [specific feature] makes such a difference during [long use]. No more [hand fatigue/cramping]. Didn't know what I was missing."`
  ],

  professional: [
    `"Used this in my [restaurant/catering/professional] kitchen for [X] years. Handles [heavy use description]. If it works for pros, it works for home cooks."`,
    `"Bought this on recommendation from a chef friend. Now I understand why professionals trust this brand. Quality shows."`
  ],

  student: [
    `"College apartment essential. Takes up minimal space but handles [use cases]. Still using it [X] years after graduation."`,
    `"First kitchen purchase for my dorm room. [X] years later, it's traveled with me through [number] apartments and still works perfectly."`
  ],

  simplicity: [
    `"No fancy features to break. Just [functions] and it does all [number] perfectly. Simple and reliable beats complicated every time."`,
    `"Love that there's nothing complicated about this. Works exactly as expected, every single time. That's all I need."`
  ],

  comparison: [
    `"Tried [competitor brand] first. Lasted [X] years. This [PRODUCT] has already outlasted it and shows no signs of stopping."`,
    `"Friend has the [premium brand] version. Mine cost [fraction] as much and works just as well after [X] years. She's jealous."`
  ],

  family: [
    `"My mom had one for [X]+ years. I bought the same brand based on her recommendation. [X] years in and I understand why she kept hers so long."`,
    `"Wedding gift [X] years ago, still our most-used kitchen [item]. [Specific use cases]. Zero complaints."`
  ]
};

function generateTestimonials(slug, productName) {
  console.log(formatHeader(`🗣️  Testimonial Templates for: ${productName || slug}`));

  console.log('\nCopy these templates and customize with real Amazon reviews:\n');

  Object.entries(TESTIMONIAL_TEMPLATES).forEach(([category, templates], categoryIndex) => {
    console.log(`${categoryIndex + 1}. ${category.toUpperCase()} TESTIMONIAL:`);
    const template = templates[Math.floor(Math.random() * templates.length)];
    console.log(`   ${template}`);
    console.log(`   — Amazon verified purchaser (${getRandomInitials()}, ${getRandomMonth()} 2024)\n`);
  });

  console.log(formatHeader('💡 TIPS'));
  console.log(formatInfo('• Search Amazon for "[product name] review" and filter by "Verified Purchase"'));
  console.log(formatInfo('• Look for reviews mentioning longevity, value, or specific use cases'));
  console.log(formatInfo('• Focus on 3-5 star reviews (not just 5-star)'));
  console.log(formatInfo('• Include mix of different users (home cook, professional, student, etc.)'));
  console.log(formatInfo('• Aim for 6-8 testimonials total'));
  console.log('');
  console.log(formatInfo('Common search terms:'));
  console.log('  - "still working after"'));
  console.log('  - "lasted me"'));
  console.log('  - "best purchase"'));
  console.log('  - "replaced my"'));
  console.log('  - "professional quality"'));

  console.log('\n');
  console.log(formatSuccess('Copy the code template below:\n'));

  console.log(`<div className="space-y-4">
  <div className="bg-white p-5 rounded-lg border border-gray-200">
    <p className="text-slate-700 mb-2">
      &quot;[Your customized testimonial here]&quot;
    </p>
    <p className="text-sm text-slate-500">— Amazon verified purchaser (J.D., December 2024)</p>
  </div>

  {/* Add 5-7 more following the same pattern */}
</div>`);
}

function getRandomInitials() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)] + '.' +
         letters[Math.floor(Math.random() * letters.length)] + '.';
}

function getRandomMonth() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return months[Math.floor(Math.random() * months.length)];
}

// Run if called directly
if (require.main === module) {
  const slug = process.argv[2];
  const productName = process.argv[3];

  if (!slug) {
    console.log('Usage: node testimonial-gen.js <review-slug> [product-name]');
    console.log('\nExample: node testimonial-gen.js oxo-good-grips-swivel-peeler "OXO Good Grips Swivel Peeler"');
    process.exit(1);
  }

  if (!reviewExists(slug)) {
    console.error('Review not found:', slug);
    process.exit(1);
  }

  generateTestimonials(slug, productName);
}

module.exports = { generateTestimonials };
