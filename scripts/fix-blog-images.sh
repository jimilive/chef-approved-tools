#!/bin/bash

# Fix remaining blog post image tags

files=(
  "app/blog/kitchen-gloves-guide/page.tsx"
  "app/blog/meat-cooking-temperatures-thermometers/page.tsx"
  "app/blog/why-professional-chefs-use-kosher-salt/page.tsx"
)

for file in "${files[@]}"; do
  echo "Processing $file..."

  # Add Image import if not present
  if ! grep -q "import Image from 'next/image'" "$file"; then
    # Insert import at the beginning
    sed -i.bak '1i\
import Image from '"'"'next/image'"'"'
' "$file"
  fi

  # Replace img tag with Image component
  sed -i.bak 's|<img|\<Image|g' "$file"
  sed -i.bak 's|src="/images/team/head-shot-1.jpg"|src="/images/team/head-shot-1.jpg"\n          width={100}\n          height={100}|g' "$file"
  sed -i.bak '/width: .*100px.*,/d' "$file"
  sed -i.bak '/height: .*100px.*,/d' "$file"
  sed -i.bak 's|/>|/>|g' "$file"

  rm -f "${file}.bak"
done

echo "Done!"
