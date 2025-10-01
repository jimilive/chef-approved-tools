#!/bin/bash

# Image Optimization Script for Phase 1 Content Blitz
# Converts images to WebP format and optimizes for web delivery
# Usage: ./optimize-images.sh [input-directory] [output-directory]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default directories
INPUT_DIR="${1:-public/images/temp}"
OUTPUT_DIR="${2:-public/images/products}"

echo -e "${GREEN}🖼️  Image Optimization Script${NC}"
echo "======================================"
echo "Input directory: $INPUT_DIR"
echo "Output directory: $OUTPUT_DIR"
echo ""

# Check if ImageMagick and cwebp are installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick not found!${NC}"
    echo "Install with: brew install imagemagick"
    exit 1
fi

if ! command -v cwebp &> /dev/null; then
    echo -e "${RED}❌ WebP tools not found!${NC}"
    echo "Install with: brew install webp"
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Counter for processed images
COUNT=0

# Process each image
for img in "$INPUT_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
    # Skip if no files found
    [ -e "$img" ] || continue

    # Get filename without extension
    filename=$(basename "$img")
    filename_no_ext="${filename%.*}"

    echo -e "${YELLOW}Processing: $filename${NC}"

    # Step 1: Resize to max width of 1200px (maintaining aspect ratio)
    # Step 2: Compress JPEG to 85% quality
    convert "$img" \
        -resize '1200x1200>' \
        -quality 85 \
        -strip \
        "$OUTPUT_DIR/${filename_no_ext}.jpg"

    echo "  ✓ Resized and compressed to JPG"

    # Step 3: Convert to WebP at 80% quality
    cwebp -q 80 "$OUTPUT_DIR/${filename_no_ext}.jpg" -o "$OUTPUT_DIR/${filename_no_ext}.webp"

    echo "  ✓ Converted to WebP"

    # Optional: Create thumbnail (300px wide) for gallery views
    convert "$img" \
        -resize '300x300>' \
        -quality 80 \
        -strip \
        "$OUTPUT_DIR/${filename_no_ext}-thumb.jpg"

    cwebp -q 75 "$OUTPUT_DIR/${filename_no_ext}-thumb.jpg" -o "$OUTPUT_DIR/${filename_no_ext}-thumb.webp"

    echo "  ✓ Created thumbnail"

    # Get file sizes
    original_size=$(du -h "$img" | cut -f1)
    webp_size=$(du -h "$OUTPUT_DIR/${filename_no_ext}.webp" | cut -f1)

    echo -e "  ${GREEN}✓ Complete: $original_size → $webp_size${NC}"
    echo ""

    COUNT=$((COUNT + 1))
done

echo "======================================"
echo -e "${GREEN}✅ Processed $COUNT images${NC}"
echo ""
echo "Next steps:"
echo "1. Move images from $OUTPUT_DIR to your content directory"
echo "2. Update image paths in your content files"
echo "3. Add alt text for SEO"
echo "4. Use <picture> tags for WebP with JPG fallback"
echo ""
echo "Example usage in Next.js:"
echo '<Image src="/images/products/product-name.webp" alt="Description" width={1200} height={800} />'
