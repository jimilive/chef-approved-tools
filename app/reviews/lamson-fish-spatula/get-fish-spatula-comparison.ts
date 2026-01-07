/**
 * Fish Spatula Comparison Data
 *
 * Competitor affiliate links (not in Supabase):
 * - Wüsthof: https://amzn.to/49IRRKi
 * - OXO: https://amzn.to/49K1LeI
 * - Victorinox: https://amzn.to/4jyxzH1
 */

export function getFishSpatulaComparison() {
  const comparisonProducts = [
    {
      name: 'Lamson Fish Spatula',
      brand: 'Lamson',
      affiliateLink: 'https://amzn.to/3L4u9Pt',
      material: 'High-Carbon Stainless Steel',
      madeIn: 'USA',
      leftHandOption: 'Yes',
      handle: 'POM (3 rivets)',
      professionalGrade: 'Yes',
      scottsPick: 'Winner',
    },
    {
      name: 'Wüsthof Fish Spatula',
      brand: 'Wüsthof',
      affiliateLink: 'https://amzn.to/49IRRKi',
      material: 'Stainless Steel',
      madeIn: 'Germany',
      leftHandOption: 'No',
      handle: 'POM',
      professionalGrade: 'Yes',
      scottsPick: 'Runner-up',
    },
    {
      name: 'OXO Fish Spatula',
      brand: 'OXO',
      affiliateLink: 'https://amzn.to/49K1LeI',
      material: 'Stainless Steel',
      madeIn: 'China',
      leftHandOption: 'No',
      handle: 'Silicone',
      professionalGrade: 'No',
      scottsPick: 'Budget+',
    },
    {
      name: 'Victorinox Fish Spatula',
      brand: 'Victorinox',
      affiliateLink: 'https://amzn.to/4jyxzH1',
      material: 'Stainless Steel',
      madeIn: 'Switzerland',
      leftHandOption: 'No',
      handle: 'Fibrox',
      professionalGrade: 'Yes',
      scottsPick: 'Good',
    },
  ]

  return {
    products: comparisonProducts,
    highlightedProduct: 'Lamson Fish Spatula',
    title: 'How the Lamson Compares to Other Fish Spatulas',
    subtitle: 'See how the Lamson stacks up against top competitors',
    comparisonRows: [
      { label: 'Material', field: 'material' },
      { label: 'Made In', field: 'madeIn' },
      { label: 'Left-Hand Option', field: 'leftHandOption' },
      { label: 'Handle', field: 'handle' },
      { label: 'Professional Grade', field: 'professionalGrade' },
      { label: "Scott's Pick", field: 'scottsPick' },
    ],
  }
}
