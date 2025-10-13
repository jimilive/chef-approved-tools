#!/bin/bash
# Batch standardize all 12 problem pages

PAGES=(
  "nordic-ware-half-sheet-pan"
  "norton-im200-tri-stone-sharpener"
  "black-decker-toaster-oven"
  "bodum-chambord-french-press"
  "method-all-purpose-cleaner"
  "zuperia-bar-mops"
  "victorinox-offset-bread-knife"
  "diamond-crystal-kosher-salt"
  "victorinox-fibrox-8-inch-chefs-knife"
  "victorinox-fibrox-10-inch-chefs-knife"
  "benriner-large-mandoline"
  "cuisinart-8-inch-nonstick-pan"
)

echo "🚀 Starting batch standardization of ${#PAGES[@]} pages..."
echo ""

SUCCESS_COUNT=0
FAIL_COUNT=0

for page in "${PAGES[@]}"; do
  echo "Processing: $page"
  if node scripts/auto-standardize-page.js "$page"; then
    ((SUCCESS_COUNT++))
    echo "✅ Success: $page"
  else
    ((FAIL_COUNT++))
    echo "❌ Failed: $page"
  fi
  echo "---"
done

echo ""
echo "============================================"
echo "📊 Batch Standardization Complete"
echo "============================================"
echo "✅ Successful: $SUCCESS_COUNT"
echo "❌ Failed: $FAIL_COUNT"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff app/reviews/"
echo "  2. Run type check: npm run type-check"
echo "  3. Test locally: npm run dev"
echo ""
