#!/usr/bin/env python3
"""
Verify that all metadata titles and descriptions match the expected values
from the TSV file without changing other metadata fields.
"""

import re
import csv
from pathlib import Path

def extract_metadata_from_tsx(file_path):
    """Extract title and description from a TSX file's metadata export."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the metadata export block
        metadata_match = re.search(
            r'export\s+const\s+metadata[:\s]*(?:Metadata\s*)?=\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}',
            content,
            re.DOTALL
        )

        if not metadata_match:
            return None, None, "No metadata export found"

        metadata_block = metadata_match.group(1)

        # Extract title
        title_match = re.search(r'title:\s*[\'"]([^\'"]+)[\'"]', metadata_block)
        title = title_match.group(1) if title_match else None

        # Extract description
        desc_match = re.search(r'description:\s*[\'"]([^\'"]+)[\'"]', metadata_block)
        description = desc_match.group(1) if desc_match else None

        return title, description, None

    except Exception as e:
        return None, None, str(e)

def main():
    # Read the expected values from TSV
    tsv_path = Path('/Users/scottbradley/chef-approved-tools/docs/optimized-meta-descriptions-final.tsv')
    expected = {}

    with open(tsv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        for row in reader:
            file_path = row['File Path']
            expected[file_path] = {
                'title': row['Page Title'],
                'description': row['Meta Description']
            }

    # Check each file
    mismatches = []
    missing = []

    for file_path, expected_data in expected.items():
        full_path = Path(f'/Users/scottbradley/chef-approved-tools/{file_path}')

        if not full_path.exists():
            missing.append(f"File not found: {file_path}")
            continue

        actual_title, actual_desc, error = extract_metadata_from_tsx(full_path)

        if error:
            missing.append(f"{file_path}: {error}")
            continue

        issues = []

        if actual_title != expected_data['title']:
            issues.append(f"  Title mismatch:")
            issues.append(f"    Expected: {expected_data['title']}")
            issues.append(f"    Actual:   {actual_title}")

        if actual_desc != expected_data['description']:
            issues.append(f"  Description mismatch:")
            issues.append(f"    Expected: {expected_data['description']}")
            issues.append(f"    Actual:   {actual_desc}")

        if issues:
            mismatches.append(f"\n{file_path}:")
            mismatches.extend(issues)

    # Print results
    print("=" * 80)
    print("METADATA VERIFICATION REPORT")
    print("=" * 80)

    if missing:
        print("\nMISSING OR UNREADABLE FILES:")
        for item in missing:
            print(f"  {item}")

    if mismatches:
        print("\nMISMATCHES FOUND:")
        for line in mismatches:
            print(line)
        print(f"\nTotal files with mismatches: {len([m for m in mismatches if not m.startswith('  ')])}")
    else:
        print("\n✓ All titles and descriptions match!")

    print(f"\nTotal files checked: {len(expected)}")
    print("=" * 80)

    return len(mismatches) > 0

if __name__ == "__main__":
    import sys
    sys.exit(1 if main() else 0)
