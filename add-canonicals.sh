#!/bin/bash

# Script to add canonical URLs to all Next.js page.tsx files
# Usage: ./add-canonicals.sh

set -e

DOMAIN="https://www.chefapprovedtools.com"
APP_DIR="app"
DRY_RUN=false
BACKUP_DIR=".canonical-backups-$(date +%Y%m%d-%H%M%S)"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Adding Canonical URLs to page.tsx files ===${NC}\n"

# Create backup directory
mkdir -p "$BACKUP_DIR"
echo -e "${GREEN}✓ Created backup directory: $BACKUP_DIR${NC}\n"

# Counter variables
updated=0
skipped=0
errors=0

# Function to get canonical path from file path
get_canonical_path() {
    local file=$1
    # Remove 'app/' prefix and '/page.tsx' suffix
    local path=${file#app/}
    path=${path%/page.tsx}
    
    # If empty (homepage), return '/'
    if [ -z "$path" ]; then
        echo "/"
    else
        echo "/$path"
    fi
}

# Function to check if file already has canonical
has_canonical() {
    local file=$1
    grep -q "canonical:" "$file" 2>/dev/null
}

# Function to add canonical to a file
add_canonical() {
    local file=$1
    local canonical_path=$2
    
    # Create backup
    cp "$file" "$BACKUP_DIR/$(echo $file | sed 's/\//_/g').backup"
    
    # Check if file has Metadata import
    if ! grep -q "import.*Metadata.*from.*next" "$file"; then
        # Add import at the top after other imports
        sed -i.tmp "1i\\
import { Metadata } from 'next'\\
" "$file"
        rm -f "${file}.tmp"
    fi
    
    # Check if metadata export exists
    if grep -q "export const metadata" "$file"; then
        # Metadata exists - need to add alternates to it
        if grep -q "alternates:" "$file"; then
            # alternates section exists, skip or update
            echo -e "${YELLOW}  ⚠ File already has alternates section, skipping: $file${NC}"
            return 1
        else
            # Add alternates before the closing brace of metadata
            # Find the last closing brace and insert before it
            awk -v canon="$canonical_path" '
            /^}/ && !found {
                print "  alternates: {"
                print "    canonical: '\''/" canon "'\'',"
                print "  },"
                found = 1
            }
            { print }
            ' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
        fi
    else
        # No metadata export - add complete metadata block
        # Find a good place to insert (after imports, before export default)
        awk -v canon="$canonical_path" '
        /^export default/ && !inserted {
            print ""
            print "export const metadata: Metadata = {"
            print "  alternates: {"
            print "    canonical: '\''/" canon "'\'',"
            print "  },"
            print "}"
            print ""
            inserted = 1
        }
        { print }
        ' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
    fi
    
    return 0
}

# Find all page.tsx files, excluding test directories and node_modules
while IFS= read -r file; do
    # Skip test files
    if [[ $file == *"/test"* ]] || [[ $file == *"/test-"* ]]; then
        echo -e "${YELLOW}⊘ Skipping test file: $file${NC}"
        ((skipped++))
        continue
    fi
    
    # Get the canonical path
    canonical_path=$(get_canonical_path "$file")
    
    echo -e "${BLUE}Processing: $file${NC}"
    echo -e "  Canonical: $canonical_path"
    
    # Check if already has canonical
    if has_canonical "$file"; then
        echo -e "${YELLOW}  ⊘ Already has canonical, skipping${NC}\n"
        ((skipped++))
        continue
    fi
    
    # Add canonical
    if add_canonical "$file" "$canonical_path"; then
        echo -e "${GREEN}  ✓ Added canonical${NC}\n"
        ((updated++))
    else
        echo -e "${RED}  ✗ Error or skipped${NC}\n"
        ((errors++))
    fi
    
done < <(find "$APP_DIR" -name "page.tsx" -type f | grep -v node_modules | sort)

# Summary
echo -e "\n${BLUE}=== Summary ===${NC}"
echo -e "${GREEN}✓ Files updated: $updated${NC}"
echo -e "${YELLOW}⊘ Files skipped: $skipped${NC}"
echo -e "${RED}✗ Errors: $errors${NC}"
echo -e "\n${GREEN}Backups saved in: $BACKUP_DIR${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Review changes: ${BLUE}git diff${NC}"
echo -e "2. Test locally: ${BLUE}npm run dev${NC}"
echo -e "3. Check canonicals in browser (View Source)"
echo -e "4. If good: ${BLUE}git add . && git commit -m 'Add canonical URLs to all pages'${NC}"
echo -e "5. If bad: ${BLUE}git checkout .${NC} (or restore from $BACKUP_DIR)\n"