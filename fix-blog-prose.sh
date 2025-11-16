#!/bin/bash

# Blog Post Prose Wrapper Fix Script
# This script removes the complex prose class wrapper from blog posts
# and replaces it with the simple version

set -e  # Exit on any error

echo "============================================"
echo "Blog Post Prose Wrapper Fix Script"
echo "============================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for tracking
TOTAL_FILES=0
FIXED_FILES=0
SKIPPED_FILES=0

# Create backup directory
BACKUP_DIR="./blog-fix-backups-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo -e "${GREEN}✓${NC} Created backup directory: $BACKUP_DIR"
echo ""

# Find all blog post page.tsx files
echo "Finding all blog post files..."
BLOG_FILES=$(find app/blog -name "page.tsx" -type f)
TOTAL_FILES=$(echo "$BLOG_FILES" | wc -l | tr -d ' ')
echo -e "${GREEN}Found $TOTAL_FILES blog post files${NC}"
echo ""

# Function to check if file has the problematic prose wrapper
has_complex_prose_wrapper() {
    local file="$1"
    # Look for the multi-line prose className pattern
    grep -q "prose prose-lg prose-slate max-w-3xl mx-auto" "$file" && \
    grep -q "prose-headings:font-bold" "$file"
}

# Function to fix a single file
fix_file() {
    local file="$1"
    local relative_path="${file#app/blog/}"
    
    echo -e "${YELLOW}Processing:${NC} $relative_path"
    
    # Check if file needs fixing
    if ! has_complex_prose_wrapper "$file"; then
        echo -e "${GREEN}  ✓ Already fixed or doesn't need fixing${NC}"
        SKIPPED_FILES=$((SKIPPED_FILES + 1))
        return 0
    fi
    
    # Create backup
    local backup_file="$BACKUP_DIR/${relative_path//\//_}"
    cp "$file" "$backup_file"
    echo -e "${GREEN}  ✓ Backup created${NC}"
    
    # Create temp file for the fix
    local temp_file="${file}.tmp"
    
    # Use awk to replace the multi-line prose wrapper
    # This finds the opening div with all the prose classes and replaces it
    awk '
    /^[[:space:]]*<div className="prose prose-lg prose-slate max-w-3xl mx-auto$/ {
        in_prose_div = 1
        buffer = $0
        next
    }
    
    in_prose_div {
        buffer = buffer "\n" $0
        if (/bg-white rounded-xl shadow-lg p-8 mb-8">/) {
            # Found the end of the prose wrapper, replace it
            print "        <div className=\"bg-white rounded-xl shadow-lg p-8 mb-8\">"
            in_prose_div = 0
            buffer = ""
            next
        }
        next
    }
    
    { print }
    ' "$file" > "$temp_file"
    
    # Replace original with fixed version
    mv "$temp_file" "$file"
    
    echo -e "${GREEN}  ✓ Fixed prose wrapper${NC}"
    FIXED_FILES=$((FIXED_FILES + 1))
    echo ""
}

# Process first file as test
echo "============================================"
echo "STEP 1: Testing on first file"
echo "============================================"
echo ""

FIRST_FILE=$(echo "$BLOG_FILES" | head -n 1)
echo -e "${YELLOW}Test file:${NC} $FIRST_FILE"
echo ""

# Show before state
echo "BEFORE (first 30 lines):"
echo "------------------------"
head -n 30 "$FIRST_FILE" | grep -A 10 "prose prose-lg" || echo "No prose wrapper found"
echo ""

# Fix the test file
fix_file "$FIRST_FILE"

# Show after state
echo "AFTER (first 30 lines):"
echo "------------------------"
head -n 30 "$FIRST_FILE" | grep -A 5 "bg-white rounded-xl" || echo "Check file manually"
echo ""

echo "============================================"
echo "TEST FILE PROCESSED"
echo "============================================"
echo ""
echo -e "${YELLOW}IMPORTANT:${NC} Please check the test file:"
echo "  File: $FIRST_FILE"
echo ""
echo "  1. Does it look correct?"
echo "  2. Does the blog post render properly?"
echo "  3. Is the spacing still good?"
echo ""
echo -e "${GREEN}If YES:${NC} Type 'continue' to process remaining files"
echo -e "${RED}If NO:${NC} Type 'rollback' to restore from backup"
echo ""
read -p "Your choice (continue/rollback): " choice

if [ "$choice" = "rollback" ]; then
    echo ""
    echo "Rolling back test file..."
    cp "$BACKUP_DIR/$(basename $FIRST_FILE)" "$FIRST_FILE"
    echo -e "${GREEN}✓ Test file restored${NC}"
    echo ""
    echo "Backup directory preserved at: $BACKUP_DIR"
    echo "Script aborted - no other files were modified"
    exit 0
fi

if [ "$choice" != "continue" ]; then
    echo ""
    echo -e "${RED}Invalid choice. Exiting for safety.${NC}"
    echo "Backup directory preserved at: $BACKUP_DIR"
    exit 1
fi

echo ""
echo "============================================"
echo "STEP 2: Processing remaining files"
echo "============================================"
echo ""

# Process remaining files
REMAINING_FILES=$(echo "$BLOG_FILES" | tail -n +2)

for file in $REMAINING_FILES; do
    fix_file "$file"
done

echo "============================================"
echo "COMPLETE!"
echo "============================================"
echo ""
echo -e "${GREEN}Summary:${NC}"
echo "  Total files found: $TOTAL_FILES"
echo "  Files fixed: $FIXED_FILES"
echo "  Files skipped: $SKIPPED_FILES"
echo ""
echo -e "${GREEN}Backups saved to:${NC} $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "  1. Test a few blog posts in your browser"
echo "  2. Run: npm run build (to verify no errors)"
echo "  3. If all good, commit the changes"
echo "  4. If issues, restore from: $BACKUP_DIR"
echo ""
echo -e "${GREEN}✓ Script complete!${NC}"
