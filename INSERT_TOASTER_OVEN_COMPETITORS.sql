-- SQL to insert 3 competitor toaster oven products into Supabase
-- Black+Decker TO1785SG Comparison Table Competitors
-- Run these one at a time in Supabase SQL Editor
--
-- COMPLIANCE NOTE: Amazon Associates TOS prohibits storing Amazon review data
-- All review fields use "Not Available" source to indicate these are NOT Amazon reviews
-- The expert_rating field contains OUR expert ratings, not Amazon customer ratings

-- 1. Hamilton Beach Sure-Crisp 31403
INSERT INTO products (
  slug,
  name,
  brand,
  model,
  category,
  subcategory,
  in_stock,
  availability,
  affiliate_links,
  vendors,
  primary_affiliate,
  reviews,
  expert_rating,
  pros,
  cons,
  description,
  expert_opinion,
  usage_scenarios,
  alternatives,
  images,
  category_id
) VALUES (
  'hamilton-beach-sure-crisp-31403',
  'Hamilton Beach Sure-Crisp Air Fryer Toaster Oven',
  'Hamilton Beach',
  '31403',
  'Appliances',
  'toaster-ovens',
  true,
  'In stock',
  '[{"url":"https://amzn.to/4oSmDWu","label":"Amazon","merchant":"amazon","is_primary":true}]'::jsonb,
  '[]'::jsonb,
  'amazon',
  '{"count":0,"rating":0,"source":"Not Available","verified":false,"lastUpdated":"2025-11-19T00:00:00.000Z"}'::jsonb,
  4.0,
  ARRAY['Affordable price','Good air frying performance','Ready bell feature','Stay-on setting'],
  ARRAY['30-minute timer limitation','Pan warping issues','Limited precision controls'],
  'Budget-friendly air fryer toaster oven with reliable performance for basic home cooking needs.',
  'A solid budget option that delivers better air frying performance than cheaper competitors at only a modest price increase.',
  ARRAY['Air frying frozen foods','Quick family meals','Basic toasting','Small batch cooking'],
  ARRAY['black-decker-toaster-oven','cuisinart-toa-70'],
  '{"alt":"Hamilton Beach Sure-Crisp Air Fryer Toaster Oven","primary":"https://images.unsplash.com/photo-1585515656642-6a3da3be92f7?q=80&w=1200"}'::jsonb,
  (SELECT id FROM categories WHERE name = 'Appliances' LIMIT 1)
);

-- 2. Cuisinart TOA-70
INSERT INTO products (
  slug,
  name,
  brand,
  model,
  category,
  subcategory,
  in_stock,
  availability,
  affiliate_links,
  vendors,
  primary_affiliate,
  reviews,
  expert_rating,
  pros,
  cons,
  description,
  expert_opinion,
  usage_scenarios,
  alternatives,
  images,
  category_id
) VALUES (
  'cuisinart-toa-70',
  'Cuisinart TOA-70 Air Fryer Toaster Oven with Grill',
  'Cuisinart',
  'TOA-70',
  'Appliances',
  'toaster-ovens',
  true,
  'In stock',
  '[{"url":"https://amzn.to/4o2YpYc","label":"Amazon","merchant":"amazon","is_primary":true}]'::jsonb,
  '[]'::jsonb,
  'amazon',
  '{"count":0,"rating":0,"source":"Not Available","verified":false,"lastUpdated":"2025-11-19T00:00:00.000Z"}'::jsonb,
  4.0,
  ARRAY['1800W powerful heating','8 cooking functions','3-year warranty','Interior light','Whisper-quiet operation','Includes grill/griddle plate'],
  ARRAY['Manual dials lack precision','Not dishwasher safe','Large footprint','Loud mechanical timer'],
  'Premium multi-function air fryer toaster oven with grill capability and solid build quality for families.',
  'Good Housekeeping top performer that successfully consolidates multiple appliances. Excellent for air frying and convection cooking, though toast function can be inconsistent.',
  ARRAY['Air frying for families','Multi-function cooking','Indoor grilling','Convection baking','Quick family dinners'],
  ARRAY['cuisinart-toa-60','ninja-foodi-dt201','breville-smart-oven'],
  '{"alt":"Cuisinart TOA-70 Air Fryer Toaster Oven","primary":"https://images.unsplash.com/photo-1585515656642-6a3da3be92f7?q=80&w=1200"}'::jsonb,
  (SELECT id FROM categories WHERE name = 'Appliances' LIMIT 1)
);

-- 3. COSORI Smart 12-in-1
INSERT INTO products (
  slug,
  name,
  brand,
  model,
  category,
  subcategory,
  in_stock,
  availability,
  affiliate_links,
  vendors,
  primary_affiliate,
  reviews,
  expert_rating,
  pros,
  cons,
  description,
  expert_opinion,
  usage_scenarios,
  alternatives,
  images,
  category_id
) VALUES (
  'cosori-smart-12-in-1',
  'COSORI Smart 12-in-1 Air Fryer Toaster Oven',
  'COSORI',
  'CO130-AO',
  'Appliances',
  'toaster-ovens',
  true,
  'In stock',
  '[{"url":"https://amzn.to/4ictKXa","label":"Amazon","merchant":"amazon","is_primary":true}]'::jsonb,
  '[]'::jsonb,
  'amazon',
  '{"count":0,"rating":0,"source":"Not Available","verified":false,"lastUpdated":"2025-11-19T00:00:00.000Z"}'::jsonb,
  5.0,
  ARRAY['12 cooking functions','1800W power','Digital LED controls','Rotisserie included','Smart app connectivity','Large 26QT capacity'],
  ARRAY['Very large footprint','Interior lacks nonstick coating','Heat vent placement restrictions','Learning curve with many functions'],
  'Feature-rich air fryer toaster oven with digital controls, rotisserie, and smart connectivity for tech-savvy home cooks.',
  'Maximum versatility at a competitive price point. Exceptional air frying and rotisserie capabilities make it a standout for families wanting to consolidate multiple appliances.',
  ARRAY['Large family meals','Rotisserie cooking','Dehydrating','Fermentation','Air frying','Smart home integration'],
  ARRAY['cuisinart-toa-70','ninja-foodi-dt201','breville-smart-oven'],
  '{"alt":"COSORI Smart 12-in-1 Air Fryer Toaster Oven","primary":"https://images.unsplash.com/photo-1585515656642-6a3da3be92f7?q=80&w=1200"}'::jsonb,
  (SELECT id FROM categories WHERE name = 'Appliances' LIMIT 1)
);

-- Verify the inserts
SELECT slug, name, brand, primary_affiliate, expert_rating
FROM products
WHERE slug IN ('hamilton-beach-sure-crisp-31403', 'cuisinart-toa-70', 'cosori-smart-12-in-1')
ORDER BY slug;
