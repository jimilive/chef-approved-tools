#!/usr/bin/env python3
import os
import re

review_dir = "app/reviews"
issues = []

for slug in os.listdir(review_dir):
    page_path = os.path.join(review_dir, slug, "page.tsx")
    if not os.path.isfile(page_path):
        continue

    with open(page_path, 'r') as f:
        content = f.read()

    has_product_data = 'const productData = {' in content
    has_min_height = 'className="min-h-screen' in content
    has_tracker = 'ProductViewTrackerWrapper' in content

    # Extract structure type
    if '<article' in content[:2000]:
        structure = 'ARTICLE'
    elif '<div className="min-h-screen' in content:
        structure = 'MIN_H_DIV'
    else:
        structure = 'OTHER'

    status = '✅' if has_tracker else '❌'

    print(f"{status} {slug:50} | Data:{('✓' if has_product_data else '✗'):2} | {structure:10}")

    if not has_tracker:
        issues.append(slug)

print(f"\n{'='*80}")
print(f"Summary: {27 - len(issues)}/27 pages have tracker")
print(f"Missing tracker: {len(issues)} pages")
print(f"\nPages needing manual fix: {', '.join(issues)}")
