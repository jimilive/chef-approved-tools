#!/bin/bash

# Add null checks to all review pages after removing legacy fallback
echo "Adding null checks to review pages..."

find app/reviews -name "page.tsx" -type f | while read file; do
  # Add null check in generateMetadata function
  if grep -q "const product = await getProductBySlug" "$file"; then
    # Check if null check already exists
    if ! grep -q "if (!product) {" "$file"; then
      echo "Updating: $file"
      # Use perl for multi-line replacement
      perl -i -pe '
        if (/const product = await getProductBySlug/) {
          $_ .= "\n" unless /\n$/;
          $found_line = 1;
        } elsif ($found_line && /const productData = product/) {
          $_ = "
  if (!product) {
    throw new Error(\`Product not found in Supabase: \${reviewData.productSlug}\`)
  }

" . $_;
          $found_line = 0;
        }
      ' "$file"
    fi
  fi
done

echo "Done! Null checks added to all review pages."
