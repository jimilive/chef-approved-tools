-- SQL to find and fix Staub Dutch oven affiliate link in Supabase
-- The link is currently pointing to a perfume/cologne site instead of the Dutch oven

-- STEP 1: Find the Staub product and check current affiliate link
SELECT
  slug,
  name,
  brand,
  affiliate_links,
  primary_affiliate
FROM products
WHERE slug LIKE '%staub%' OR brand LIKE '%Staub%'
ORDER BY slug;

-- STEP 2: Update with correct CJ.com deep link to exact Staub 7qt Cherry Dutch Oven product page
-- Deep link format: CJ click URL + encoded destination URL
-- Destination: https://www.zwilling.com/us/staub-cast-iron-7-qt-round-dutch-oven-cherry-1033400/1033400.html?cgid=our-brands_staub_cast-iron_cocottes-dutch-ovens
UPDATE products
SET affiliate_links = '[{"url":"https://www.tkqlhce.com/click-101557027-13778316?url=https%3A%2F%2Fwww.zwilling.com%2Fus%2Fstaub-cast-iron-7-qt-round-dutch-oven-cherry-1033400%2F1033400.html%3Fcgid%3Dour-brands_staub_cast-iron_cocottes-dutch-ovens","label":"Zwilling.com","merchant":"cj","is_primary":true}]'::jsonb,
    primary_affiliate = 'cj'
WHERE slug = 'staub-cast-iron-7-qt-round-cocotte';

-- STEP 3: Verify the update worked
/*
SELECT
  slug,
  name,
  affiliate_links->0->>'url' as affiliate_url,
  primary_affiliate
FROM products
WHERE slug = 'staub-cast-iron-7-qt-round-cocotte';
*/
