#!/bin/bash

# Quick batch image optimization for multiple products
# Usage: ./batch-optimize.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}📦 Batch Image Optimization${NC}"
echo "======================================"
echo ""

# Check for ImageMagick and WebP tools
if ! command -v convert &> /dev/null || ! command -v cwebp &> /dev/null; then
    echo "❌ Required tools not found!"
    echo "Install with:"
    echo "  brew install imagemagick webp"
    exit 1
fi

# Process all subdirectories in temp folder
for dir in public/images/temp/*/; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        echo -e "${YELLOW}Processing: $dirname${NC}"

        # Create output directory
        mkdir -p "public/images/products/$dirname"

        # Run optimization
        ./scripts/content-creation/optimize-images.sh "$dir" "public/images/products/$dirname"

        echo ""
    fi
done

echo -e "${GREEN}✅ Batch processing complete!${NC}"
