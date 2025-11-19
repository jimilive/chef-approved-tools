-- Add Amazon link back to Henckels alongside CJ link
-- Strategy: Offer customers both options (Amazon primary, CJ secondary)

-- STEP 1: Check current state
SELECT
  slug,
  name,
  affiliate_links,
  primary_affiliate
FROM products
WHERE slug = 'henckels-sharpening-steel';

-- STEP 2: Add Amazon link as primary, keep CJ as secondary option
UPDATE products
SET affiliate_links = '[
  {"url":"https://amzn.to/49aqAAP","label":"Amazon","merchant":"amazon","is_primary":true},
  {"url":"https://www.anrdoezrs.net/click-101557027-13778388?url=https%3A%2F%2Fwww.henckels.com%2Fus%2Fproduct%2Fedge-maintenance-9.00-inch-honing-steel-32547-232%2F32547-232-0.html","label":"Henckels.com","merchant":"cj","is_primary":false}
]'::jsonb,
    primary_affiliate = 'amazon'
WHERE slug = 'henckels-sharpening-steel';

-- STEP 3: Verify both links are present
SELECT
  slug,
  name,
  affiliate_links,
  primary_affiliate
FROM products
WHERE slug = 'henckels-sharpening-steel';
