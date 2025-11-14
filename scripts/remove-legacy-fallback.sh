#!/bin/bash

# Script to remove legacy data fallback from all review pages
# Changes: const productData = product || reviewData.legacyProductData
# To: const productData = product

echo "Removing legacy data fallback from review pages..."

# Find all review page.tsx files
find app/reviews -name "page.tsx" -type f | while read file; do
  # Check if file contains the legacy fallback pattern
  if grep -q "product || reviewData\.legacyProductData" "$file"; then
    echo "Updating: $file"
    # Use sed to replace the pattern
    sed -i '' 's/product || reviewData\.legacyProductData/product/g' "$file"
  fi
done

echo "Done! All review pages updated to use Supabase exclusively."
