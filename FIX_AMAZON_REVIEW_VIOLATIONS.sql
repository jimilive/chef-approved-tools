-- REMEDIATION: Remove Amazon review data to comply with Amazon Associates TOS
-- Amazon Associates Program Operating Agreement Section (t) prohibits storing/displaying
-- Amazon customer reviews or star ratings unless obtained via PA-API in real-time
--
-- This script removes Amazon review data from all 8 products currently in violation
-- Run these UPDATE statements in Supabase SQL Editor

-- OPTION 1: Set reviews to zero/empty but keep the field structure
-- (Allows you to potentially use the field for YOUR expert reviews later)

UPDATE products
SET reviews = jsonb_build_object(
  'count', 0,
  'rating', 0,
  'source', 'Not Available',
  'verified', false,
  'lastUpdated', NOW()::text
)
WHERE slug IN (
  'victorinox-4-inch-paring-knife',
  'victorinox-fibrox-10-inch-chefs-knife',
  'victorinox-fibrox-8-inch-chefs-knife',
  'victorinox-granton-edge-boning-knife',
  'victorinox-offset-bread-knife',
  'vitamix-5200-professional-blender',
  'kitchenaid-ksm8990wh',
  'le-creuset-signature-7-25-qt-dutch-oven'
);

-- OPTION 2: Remove reviews field entirely
-- (Uncomment if you want to completely remove the reviews field instead)
/*
UPDATE products
SET reviews = NULL
WHERE slug IN (
  'victorinox-4-inch-paring-knife',
  'victorinox-fibrox-10-inch-chefs-knife',
  'victorinox-fibrox-8-inch-chefs-knife',
  'victorinox-granton-edge-boning-knife',
  'victorinox-offset-bread-knife',
  'vitamix-5200-professional-blender',
  'kitchenaid-ksm8990wh',
  'le-creuset-signature-7-25-qt-dutch-oven'
);
*/

-- Verify the fix worked
SELECT
  slug,
  name,
  reviews->>'source' as review_source,
  reviews->>'count' as review_count,
  reviews->>'rating' as review_rating
FROM products
WHERE slug IN (
  'victorinox-4-inch-paring-knife',
  'victorinox-fibrox-10-inch-chefs-knife',
  'victorinox-fibrox-8-inch-chefs-knife',
  'victorinox-granton-edge-boning-knife',
  'victorinox-offset-bread-knife',
  'vitamix-5200-professional-blender',
  'kitchenaid-ksm8990wh',
  'le-creuset-signature-7-25-qt-dutch-oven'
)
ORDER BY name;

-- Double-check: Should return 0 rows (no more violations)
SELECT COUNT(*) as remaining_violations
FROM products
WHERE
  reviews->>'source' = 'Amazon'
  AND (
    (reviews->>'count')::int > 0
    OR (reviews->>'rating')::numeric > 0
  );
