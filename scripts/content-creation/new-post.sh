#!/bin/bash

# Quick Content Creation Script
# Creates a new post from template with proper directory structure
# Usage: ./new-post.sh [type] [slug]
# Types: review, comparison, guide

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check arguments
if [ $# -lt 2 ]; then
    echo -e "${RED}Usage: ./new-post.sh [type] [slug]${NC}"
    echo ""
    echo "Types:"
    echo "  review     - Product review"
    echo "  comparison - Comparison post"
    echo "  guide      - Buying guide"
    echo ""
    echo "Example:"
    echo "  ./new-post.sh review wusthof-classic-8-inch-knife"
    exit 1
fi

TYPE=$1
SLUG=$2

# Determine template and output path
case $TYPE in
    review)
        TEMPLATE="templates/content/product-review-template.tsx"
        OUTPUT_DIR="app/reviews"
        TEMPLATE_TYPE="Product Review"
        ;;
    comparison)
        TEMPLATE="templates/content/comparison-post-template.tsx"
        OUTPUT_DIR="app/guides"
        TEMPLATE_TYPE="Comparison Post"
        ;;
    guide)
        TEMPLATE="templates/content/buying-guide-template.tsx"
        OUTPUT_DIR="app/guides"
        TEMPLATE_TYPE="Buying Guide"
        ;;
    *)
        echo -e "${RED}Invalid type: $TYPE${NC}"
        echo "Valid types: review, comparison, guide"
        exit 1
        ;;
esac

# Create output path
OUTPUT_PATH="$OUTPUT_DIR/$SLUG"

# Check if already exists
if [ -d "$OUTPUT_PATH" ]; then
    echo -e "${RED}❌ Post already exists at $OUTPUT_PATH${NC}"
    exit 1
fi

# Create directory
mkdir -p "$OUTPUT_PATH"

# Copy template
cp "$TEMPLATE" "$OUTPUT_PATH/page.tsx"

echo -e "${GREEN}✅ Created new $TEMPLATE_TYPE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Path: $OUTPUT_PATH/page.tsx"
echo "URL: /$OUTPUT_DIR/$SLUG"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Open $OUTPUT_PATH/page.tsx in VS Code"
echo "2. Fill in productData/guideData/comparisonData"
echo "3. Write unique content for each section"
echo "4. Add 5-7 product images to public/images/products/$SLUG/"
echo "5. Run image optimization: ./scripts/content-creation/optimize-images.sh"
echo "6. Update affiliate links with your tracking ID"
echo "7. Add internal links to related posts"
echo "8. Test locally: npm run dev"
echo "9. Commit and push to deploy"
echo ""
echo -e "${GREEN}📝 Use VS Code snippets:${NC}"
echo "  - productbox    : Product box with CTA"
echo "  - proscons      : Pros and cons section"
echo "  - tablerow      : Comparison table row"
echo "  - afflink       : Affiliate link button"
echo "  - protip        : Pro tip callout"
echo ""
echo "Good luck! 🚀"
