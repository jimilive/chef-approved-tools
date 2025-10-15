#!/usr/bin/env python3
"""
Script to add CTAVisibilityTracker wrappers to all AffiliateButton components in review pages.
"""

import re
import sys
from pathlib import Path

def add_imports(content):
    """Add the required imports if not already present."""
    # Check if imports already exist
    if 'CTAVisibilityTracker' in content:
        return content

    # Find the import section and add our imports
    import_pattern = r"(import\s+.*?from\s+'@/components/AffiliateButton')"

    new_imports = """\1
import ProductImpressionTracker from '@/components/ProductImpressionTracker'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'"""

    content = re.sub(import_pattern, new_imports, content)
    return content

def wrap_affiliate_button(content, product_slug):
    """Wrap AffiliateButton components with CTAVisibilityTracker."""

    # Split content into lines for easier processing
    lines = content.split('\n')
    result_lines = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Check if line contains AffiliateButton opening tag
        if '<AffiliateButton' in line and 'CTAVisibilityTracker' not in lines[max(0, i-5):i]:
            # Extract indentation
            indent = len(line) - len(line.lstrip())
            base_indent = ' ' * indent

            # Find href, merchant, and position attributes
            merchant_match = re.search(r'merchant="([^"]+)"', line)
            position_match = re.search(r'position="([^"]+)"', line)

            if merchant_match and position_match:
                merchant = merchant_match.group(1)
                position = position_match.group(1)

                # Add CTAVisibilityTracker opening tag
                result_lines.append(f'{base_indent}<CTAVisibilityTracker')
                result_lines.append(f'{base_indent}  ctaId={{`review-${{productData.slug}}-{position}`}}')
                result_lines.append(f'{base_indent}  position="{position}"')
                result_lines.append(f'{base_indent}  productSlug={{productData.slug}}')
                result_lines.append(f'{base_indent}  merchant="{merchant}"')
                result_lines.append(f'{base_indent}>')

                # Add the AffiliateButton and collect until closing tag
                result_lines.append(f'{base_indent}  {line.strip()}')
                i += 1

                # Continue collecting lines until we find </AffiliateButton>
                while i < len(lines) and '</AffiliateButton>' not in lines[i]:
                    result_lines.append(f'{base_indent}  {lines[i].strip()}')
                    i += 1

                # Add closing AffiliateButton line
                if i < len(lines):
                    result_lines.append(f'{base_indent}  {lines[i].strip()}')
                    i += 1

                # Add CTAVisibilityTracker closing tag
                result_lines.append(f'{base_indent}</CTAVisibilityTracker>')
                continue

        # Normal line - just add it
        result_lines.append(line)
        i += 1

    return '\n'.join(result_lines)

def process_file(file_path):
    """Process a single review file."""
    print(f"Processing: {file_path}")

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract product slug from file path
        product_slug = file_path.parent.name

        # Count AffiliateButtons
        button_count = content.count('<AffiliateButton')
        wrapped_count = content.count('CTAVisibilityTracker')

        if button_count == wrapped_count:
            print(f"  ✓ Already processed ({button_count} buttons already wrapped)")
            return 0

        # Add imports
        content = add_imports(content)

        # Wrap AffiliateButtons
        content = wrap_affiliate_button(content, product_slug)

        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        new_wrapped = content.count('CTAVisibilityTracker') - wrapped_count
        print(f"  ✓ Wrapped {new_wrapped} new buttons")
        return new_wrapped

    except Exception as e:
        print(f"  ✗ Error: {e}")
        return 0

def main():
    # Get all review page files
    reviews_dir = Path('/Users/scottbradley/chef-approved-tools/app/reviews')

    # List of files to process (the 17 remaining)
    remaining_files = [
        'john-boos-platinum-commercial-cutting-board',
        'kitchenaid-kp26m1xlc-professional-600',
        'lodge-seasoned-cast-iron-3-skillet-bundle',
        'method-all-purpose-cleaner',
        'nordic-ware-half-sheet-pan',
        'norton-im200-tri-stone-sharpener',
        'oxo-good-grips-bench-scraper',
        'oxo-good-grips-swivel-peeler',
        'robot-coupe-r2-dice',
        'victorinox-4-inch-paring-knife',
        'victorinox-fibrox-10-inch-chefs-knife',
        'victorinox-granton-edge-boning-knife',
        'victorinox-offset-bread-knife',
        'vitamix-5200',
        'winco-heavy-duty-tongs',
        'wusthof-classic-ikon-16-piece',
        'zuperia-bar-mops',
    ]

    total_wrapped = 0
    total_files = 0

    for folder in remaining_files:
        file_path = reviews_dir / folder / 'page.tsx'
        if file_path.exists():
            wrapped = process_file(file_path)
            if wrapped > 0:
                total_wrapped += wrapped
                total_files += 1

    print(f"\n{'='*60}")
    print(f"COMPLETED: {total_files} files processed, {total_wrapped} buttons wrapped")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
