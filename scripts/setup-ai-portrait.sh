#!/bin/bash

# Script to set up your AI portrait for the site
# Usage: ./scripts/setup-ai-portrait.sh /path/to/ChefScottAI.jpg

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🎨 AI Portrait Setup Script${NC}"
echo "======================================"
echo ""

# Check if source file provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: ./scripts/setup-ai-portrait.sh /path/to/ChefScottAI.jpg${NC}"
    echo ""
    echo "Common locations to check:"
    echo "  ~/Desktop/ChefScottAI.jpg"
    echo "  ~/Downloads/ChefScottAI.jpg"
    echo "  ~/Pictures/ChefScottAI.jpg"
    echo ""
    echo "Or drag and drop the file into Terminal after typing:"
    echo "./scripts/setup-ai-portrait.sh "
    exit 1
fi

SOURCE_FILE="$1"

# Check if file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo -e "${RED}❌ File not found: $SOURCE_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Found: $SOURCE_FILE${NC}"
echo ""

# Create branding directory
mkdir -p public/images/branding

# Check for ImageMagick
if ! command -v convert &> /dev/null; then
    echo -e "${YELLOW}⚠️  ImageMagick not installed${NC}"
    echo "Install with: brew install imagemagick"
    echo ""
    echo "For now, I'll just copy the original file."
    echo "Run this script again after installing ImageMagick for optimized versions."
    echo ""
    cp "$SOURCE_FILE" public/images/branding/scott-ai-portrait.jpg
    echo -e "${GREEN}✓ Copied to: public/images/branding/scott-ai-portrait.jpg${NC}"
    exit 0
fi

# Check for WebP tools
if ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}⚠️  WebP tools not installed${NC}"
    echo "Install with: brew install webp"
    echo "Continuing without WebP conversion..."
    SKIP_WEBP=true
fi

echo "Creating optimized versions..."
echo ""

# 1. Full size PNG (transparent background if possible)
echo "1/6 Creating full-size version..."
convert "$SOURCE_FILE" -resize 1500x1500 -quality 95 public/images/branding/scott-ai-portrait.png
echo -e "${GREEN}✓ Created: scott-ai-portrait.png (1500x1500)${NC}"

# 2. Circle crop
echo "2/6 Creating circular crop..."
convert "$SOURCE_FILE" -resize 1000x1000^ -gravity center -extent 1000x1000 \
    \( +clone -threshold -1 -negate -fill white -draw 'circle 500,500 500,0' \) \
    -alpha off -compose copy_opacity -composite \
    public/images/branding/scott-ai-portrait-circle.png
echo -e "${GREEN}✓ Created: scott-ai-portrait-circle.png (1000x1000)${NC}"

# 3. Square crop
echo "3/6 Creating square crop..."
convert "$SOURCE_FILE" -resize 1000x1000^ -gravity center -extent 1000x1000 \
    public/images/branding/scott-ai-portrait-square.png
echo -e "${GREEN}✓ Created: scott-ai-portrait-square.png (1000x1000)${NC}"

# 4. Medium size (for web)
echo "4/6 Creating medium size..."
convert "$SOURCE_FILE" -resize 600x600 -quality 90 public/images/branding/scott-ai-portrait-medium.png
echo -e "${GREEN}✓ Created: scott-ai-portrait-medium.png (600x600)${NC}"

# 5. Thumbnail
echo "5/6 Creating thumbnail..."
convert "$SOURCE_FILE" -resize 300x300 -quality 85 public/images/branding/scott-ai-portrait-thumb.png
echo -e "${GREEN}✓ Created: scott-ai-portrait-thumb.png (300x300)${NC}"

# 6. WebP versions (if available)
if [ "$SKIP_WEBP" != "true" ]; then
    echo "6/6 Converting to WebP format..."
    for img in public/images/branding/scott-ai-portrait*.png; do
        cwebp -q 90 "$img" -o "${img%.*}.webp" 2>/dev/null
    done
    echo -e "${GREEN}✓ Created WebP versions${NC}"
else
    echo "6/6 Skipping WebP conversion (install webp tools)"
fi

echo ""
echo "======================================"
echo -e "${GREEN}✅ AI Portrait Setup Complete!${NC}"
echo ""
echo "Created files in public/images/branding/:"
ls -lh public/images/branding/scott-ai-* | awk '{print "  " $9 " (" $5 ")"}'
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. View the files to make sure they look good"
echo "2. Update your templates to use these images"
echo "3. Add to social media profiles (use square/circle versions)"
echo ""
echo "File usage guide:"
echo "  • scott-ai-portrait.png - Original quality (email, print)"
echo "  • scott-ai-portrait-circle.png - Social profiles, author bios"
echo "  • scott-ai-portrait-square.png - Instagram, thumbnails"
echo "  • scott-ai-portrait-medium.png - Website headers"
echo "  • scott-ai-portrait-thumb.png - Small avatars, comments"
echo "  • *.webp versions - Use these on web (faster loading)"
echo ""
echo -e "${GREEN}Ready to brand your site! 🎨${NC}"
