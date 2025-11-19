-- AUDIT: Find all products with Amazon review data (TOS VIOLATION)
-- Run this in Supabase SQL Editor to identify compliance issues

-- Query 1: Products with Amazon review data
SELECT
  slug,
  name,
  brand,
  reviews->>'source' as review_source,
  reviews->>'count' as review_count,
  reviews->>'rating' as review_rating,
  reviews->>'verified' as verified,
  reviews->>'lastUpdated' as last_updated
FROM products
WHERE
  reviews->>'source' = 'Amazon'
  AND (
    (reviews->>'count')::int > 0
    OR (reviews->>'rating')::numeric > 0
  )
ORDER BY name;

-- Query 2: Count of products with Amazon review violations
SELECT
  COUNT(*) as total_violations,
  SUM(CASE WHEN (reviews->>'verified')::boolean = true THEN 1 ELSE 0 END) as verified_reviews
FROM products
WHERE
  reviews->>'source' = 'Amazon'
  AND (
    (reviews->>'count')::int > 0
    OR (reviews->>'rating')::numeric > 0
  );

-- Query 3: All products review data overview
SELECT
  slug,
  name,
  reviews->>'source' as source,
  reviews->>'count' as count,
  reviews->>'rating' as rating
FROM products
ORDER BY name;

-- Query 4: Products without review data (safe)
SELECT
  slug,
  name,
  CASE
    WHEN reviews IS NULL THEN 'No reviews field'
    WHEN reviews->>'count' = '0' THEN 'Zero count (safe)'
    ELSE 'Unknown'
  END as status
FROM products
WHERE
  reviews IS NULL
  OR reviews->>'source' IS NULL
  OR (reviews->>'count')::int = 0
ORDER BY name;
