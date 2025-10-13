#!/usr/bin/env python3
"""
Comprehensive audit of review pages to identify inconsistencies and improvement opportunities
"""
import os
import re
from collections import defaultdict

review_dir = "app/reviews"
issues = defaultdict(list)

def check_page(slug, content):
    """Check a single page for various issues"""
    page_issues = []

    # 1. Check for ProductViewTrackerWrapper
    if 'ProductViewTrackerWrapper' not in content:
        page_issues.append("❌ Missing ProductViewTrackerWrapper")

    # 2. Check for productData structure
    if 'const productData = {' not in content:
        page_issues.append("⚠️  Missing productData constant")

    # 3. Check for metadata
    if 'export const metadata' not in content and 'export const metadata:' not in content:
        page_issues.append("⚠️  Missing metadata export")

    # 4. Check for schema.org structured data
    if 'generateProductReviewSchema' not in content:
        page_issues.append("⚠️  Missing product review schema")

    if 'generateBreadcrumbSchema' not in content:
        page_issues.append("⚠️  Missing breadcrumb schema")

    # 5. Check for FTC disclosure
    if 'FTCDisclosure' not in content:
        page_issues.append("⚠️  Missing FTC disclosure component")

    # 6. Check for AuthorBio
    if 'AuthorBio' not in content and 'About Scott Bradley' not in content:
        page_issues.append("⚠️  Missing author bio")

    # 7. Check for tier badge
    if 'Tier1Badge' not in content and 'Tier2Badge' not in content:
        page_issues.append("⚠️  Missing tier badge")

    # 8. Check for affiliate links
    if 'AffiliateButton' not in content:
        page_issues.append("⚠️  Missing AffiliateButton component")

    # 9. Check for testimonials
    if 'TestimonialsSection' not in content and 'testimonials' not in content.lower():
        page_issues.append("ℹ️  No testimonials section")

    # 10. Check for FAQ section
    if 'FAQPage' not in content and 'faq' not in content.lower():
        page_issues.append("ℹ️  No FAQ section")

    # 11. Check for internal links
    internal_link_count = len(re.findall(r'href="/reviews/', content))
    if internal_link_count < 3:
        page_issues.append(f"ℹ️  Low internal linking ({internal_link_count} links)")

    # 12. Check for image optimization
    if '<Image' not in content and '<img' in content:
        page_issues.append("⚠️  Using <img> instead of Next.js <Image>")

    # 13. Check for proper heading structure
    h1_count = len(re.findall(r'<h1[^>]*>', content))
    if h1_count == 0:
        page_issues.append("❌ No H1 heading")
    elif h1_count > 1:
        page_issues.append(f"⚠️  Multiple H1 headings ({h1_count})")

    # 14. Check for pricing information
    if 'price' not in content.lower() and 'cost' not in content.lower():
        page_issues.append("ℹ️  No pricing information")

    # 15. Check for pros/cons
    if 'pros' not in content.lower() or 'cons' not in content.lower():
        page_issues.append("ℹ️  Missing pros/cons section")

    # 16. Check structure type
    if '<article' in content[:2000]:
        structure = 'ARTICLE'
    elif 'className="min-h-screen' in content:
        structure = 'MIN_H_DIV'
    else:
        structure = 'OTHER'

    return page_issues, structure

print("=" * 100)
print("COMPREHENSIVE REVIEW PAGE AUDIT")
print("=" * 100)

all_issues = {}
structure_types = defaultdict(list)

for slug in sorted(os.listdir(review_dir)):
    page_path = os.path.join(review_dir, slug, "page.tsx")
    if not os.path.isfile(page_path):
        continue

    with open(page_path, 'r') as f:
        content = f.read()

    page_issues, structure = check_page(slug, content)
    structure_types[structure].append(slug)

    if page_issues:
        all_issues[slug] = page_issues

# Print results
print("\n📊 STRUCTURE DISTRIBUTION:")
print("-" * 100)
for structure, pages in structure_types.items():
    print(f"\n{structure}: {len(pages)} pages")
    for page in pages[:5]:  # Show first 5
        print(f"  - {page}")
    if len(pages) > 5:
        print(f"  ... and {len(pages) - 5} more")

print("\n\n🔍 PAGES WITH ISSUES:")
print("-" * 100)

if not all_issues:
    print("✅ No issues found! All pages are consistent.")
else:
    for slug, page_issues in sorted(all_issues.items()):
        print(f"\n📄 {slug}")
        for issue in page_issues:
            print(f"   {issue}")

# Summary statistics
print("\n\n📈 SUMMARY STATISTICS:")
print("-" * 100)

critical_count = sum(1 for issues in all_issues.values() if any('❌' in i for i in issues))
warning_count = sum(1 for issues in all_issues.values() if any('⚠️' in i for i in issues))
info_count = sum(1 for issues in all_issues.values() if any('ℹ️' in i for i in issues))

print(f"Total pages audited: {len([f for f in os.listdir(review_dir) if os.path.isfile(os.path.join(review_dir, f, 'page.tsx'))])}")
print(f"Pages with critical issues (❌): {critical_count}")
print(f"Pages with warnings (⚠️): {warning_count}")
print(f"Pages with info notes (ℹ️): {info_count}")
print(f"Perfect pages: {27 - len(all_issues)}")

# Common issues
print("\n\n🔥 MOST COMMON ISSUES:")
print("-" * 100)

issue_counts = defaultdict(int)
for page_issues in all_issues.values():
    for issue in page_issues:
        # Extract just the issue text without the emoji
        issue_text = re.sub(r'^[❌⚠️ℹ️]\s*', '', issue)
        issue_counts[issue_text] += 1

for issue, count in sorted(issue_counts.items(), key=lambda x: x[1], reverse=True)[:10]:
    print(f"  {count:2d} pages: {issue}")

print("\n" + "=" * 100)
