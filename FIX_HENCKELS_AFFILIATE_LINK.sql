-- SQL to find and fix Henckels Honing Steel affiliate link in Supabase

-- STEP 1: Find the Henckels product and check current affiliate link
SELECT
  slug,
  name,
  brand,
  affiliate_links,
  primary_affiliate
FROM products
WHERE slug LIKE '%henckels%' OR brand LIKE '%Henckels%'
ORDER BY slug;

-- STEP 2: Update with correct CJ.com deep link to exact Henckels 9" Honing Steel product page
-- Deep link format: CJ click URL + encoded destination URL
-- Destination: https://www.henckels.com/us/product/edge-maintenance-9.00-inch-honing-steel-32547-232/32547-232-0.html
UPDATE products
SET affiliate_links = '[{"url":"https://www.anrdoezrs.net/click-101557027-13778388?url=https%3A%2F%2Fwww.henckels.com%2Fus%2Fproduct%2Fedge-maintenance-9.00-inch-honing-steel-32547-232%2F32547-232-0.html","label":"Henckels.com","merchant":"cj","is_primary":true}]'::jsonb,
    primary_affiliate = 'cj'
WHERE slug = 'henckels-sharpening-steel';

-- STEP 3: Verify the update worked
SELECT
  slug,
  name,
  affiliate_links->0->>'url' as affiliate_url,
  primary_affiliate
FROM products
WHERE slug = 'henckels-sharpening-steel';
