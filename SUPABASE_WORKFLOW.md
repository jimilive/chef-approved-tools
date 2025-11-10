# Supabase Database Workflow

**Last Updated:** November 6, 2025  
**Purpose:** Complete guide for database operations and product management  
**Database:** Supabase PostgreSQL

---

## 🎯 Overview

Supabase is the **single source of truth** for product data on Chef Approved Tools. Every product review page pulls data from Supabase to ensure:

- Consistent product information across site
- Easy bulk updates (change one field, updates everywhere)
- Centralized affiliate link management
- Reliable data structure
- Fallback handling when database unavailable

**Critical Rule:** Products MUST exist in Supabase before creating review pages.

---

## 📊 Database Structure

### Products Table Schema

```sql
CREATE TABLE products (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Core Product Info (REQUIRED)
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  
  -- Rating & Testing (REQUIRED)
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  tier INTEGER NOT NULL CHECK (tier IN (1, 2, 3)),
  testing_period TEXT NOT NULL,
  
  -- Media (REQUIRED)
  image_url TEXT NOT NULL,
  
  -- Affiliate (REQUIRED)
  affiliate_url TEXT NOT NULL,
  
  -- Optional Fields
  short_description TEXT,
  price_tier TEXT CHECK (price_tier IN ('budget', 'mid-range', 'luxury')),
  amazon_asin TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_rating ON products(rating);
```

---

## 📋 Required Fields

### Slug
- **Type:** TEXT (unique)
- **Format:** URL-friendly, lowercase, hyphenated
- **Example:** `vitamix-5200-professional-blender`
- **Rules:**
  - No spaces (use hyphens)
  - No special characters (except hyphens)
  - Include brand and model when applicable
  - Keep under 60 characters
  - Must match review page URL

**Good slugs:**
- `le-creuset-7-25-qt-dutch-oven`
- `victorinox-fibrox-8-inch-chefs-knife`
- `kitchenaid-kp26m1xlc-professional-600`

**Bad slugs:**
- `Le Creuset Dutch Oven` (spaces, caps)
- `dutch_oven_review` (underscores, generic)
- `product-123` (not descriptive)

---

### Name
- **Type:** TEXT
- **Format:** Full product name with brand
- **Example:** `Vitamix 5200 Professional Blender`
- **Rules:**
  - Include brand name
  - Include model number when applicable
  - Use proper capitalization
  - Match product packaging
  - Clear and descriptive

---

### Brand
- **Type:** TEXT
- **Format:** Official brand name
- **Example:** `Vitamix`, `Le Creuset`, `Victorinox`
- **Rules:**
  - Use official capitalization
  - No abbreviations unless official (OXO, not "Oxo")
  - Consistent across all products

---

### Category
- **Type:** TEXT
- **Format:** Lowercase, singular
- **Valid Values:**
  - `knives`
  - `cookware`
  - `appliances`
  - `tools`
  - `bakeware`
  - `cutting-boards`
  - `specialty`

**Rules:**
- Use existing categories when possible
- New categories need hub page creation
- Affects breadcrumbs and navigation

---

### Rating
- **Type:** INTEGER
- **Range:** 1-5
- **Format:** Whole number only
- **Example:** `5`, `4`, `3`
- **Rules:**
  - Based on Scott's actual assessment
  - No decimal ratings (use integers only)
  - 5 = Exceptional, would buy again
  - 4 = Very good, minor issues
  - 3 = Good, notable limitations
  - 2 = Acceptable, significant issues
  - 1 = Poor, not recommended

---

### Tier
- **Type:** INTEGER
- **Values:** `1`, `2`, or `3`
- **Meaning:**

**Tier 1: Professional Kitchen Use**
- Highest credibility
- Used in actual restaurant operations
- Example: Daily use at Purple Café for 6+ years

**Tier 2: Long-Term Personal Testing**
- Extensive home testing
- Multiple years of use
- Example: 5 years of daily home use

**Tier 3: Expert Evaluation**
- Thorough research and analysis
- Based on specifications and professional knowledge
- Example: Evaluated through professional standards

**Rules:**
- Must accurately reflect testing
- Don't inflate tier for credibility
- Document testing period accurately

---

### Testing Period
- **Type:** TEXT
- **Format:** Descriptive duration
- **Examples:**
  - `18+ years professional use`
  - `6 years daily restaurant use at Purple Café`
  - `5 years personal testing`
  - `Expert evaluation and research`

**Rules:**
- Be specific when possible
- Include restaurant name for Tier 1
- Use "+" for ongoing testing (18+ years)
- Match tier classification

---

### Image URL
- **Type:** TEXT
- **Format:** Relative or absolute path
- **Examples:**
  - `/images/products/vitamix-5200.jpg`
  - `https://chefapprovedtools.com/images/products/vitamix-5200.jpg`

**Requirements:**
- Image must exist at specified path
- Optimized for web (<200KB)
- WebP format preferred
- Dimensions: 800x800px minimum
- Shows product clearly

---

### Affiliate URL
- **Type:** TEXT
- **Format:** Full affiliate link
- **Examples:**
  - `https://amzn.to/3XYZ123` (Amazon short link)
  - `https://www.amazon.com/dp/B00123?tag=chefapproved-20`
  - `https://shareasale.com/r.cfm?b=...` (Other programs)

**Rules:**
- Must be working link
- Include tracking parameters
- Test before adding to database
- Use highest commission program available
- Update if link breaks

---

### Optional Fields

**short_description:**
- Brief product summary (1-2 sentences)
- Used in product cards
- Not required but recommended

**price_tier:**
- `budget`, `mid-range`, or `luxury`
- Used for comparison tables
- Helps users filter by budget

**amazon_asin:**
- Amazon Standard Identification Number
- Useful for API integration
- Format: 10 characters (B00XXXXX)

---

## 🔧 Adding Products to Supabase

### Method 1: Supabase Dashboard (Recommended for Single Products)

**Step 1: Access Dashboard**
1. Go to Supabase project dashboard
2. Navigate to **Table Editor**
3. Select **products** table

**Step 2: Click "Insert Row"**

**Step 3: Fill Required Fields**
```
slug: vitamix-5200-professional-blender
name: Vitamix 5200 Professional Blender
brand: Vitamix
category: appliances
rating: 5
tier: 1
testing_period: 18+ years professional use
image_url: /images/products/vitamix-5200.jpg
affiliate_url: https://amzn.to/3XYZ123
```

**Step 4: Fill Optional Fields** (if applicable)
```
short_description: Professional-grade blender with 2.0 HP motor
price_tier: luxury
amazon_asin: B00XXXXX
```

**Step 5: Save**
- Click "Save" button
- Verify product appears in table
- Test by visiting review page

---

### Method 2: SQL Insert (For Multiple Products)

```sql
INSERT INTO products (
  slug,
  name,
  brand,
  category,
  rating,
  tier,
  testing_period,
  image_url,
  affiliate_url,
  short_description,
  price_tier
) VALUES 
(
  'vitamix-5200-professional-blender',
  'Vitamix 5200 Professional Blender',
  'Vitamix',
  'appliances',
  5,
  1,
  '18+ years professional use',
  '/images/products/vitamix-5200.jpg',
  'https://amzn.to/3XYZ123',
  'Professional-grade blender with 2.0 HP motor',
  'luxury'
),
(
  'le-creuset-7-25-qt-dutch-oven',
  'Le Creuset 7.25 Qt Dutch Oven',
  'Le Creuset',
  'cookware',
  5,
  1,
  '6+ years professional use at Purple Café',
  '/images/products/le-creuset-7qt.jpg',
  'https://amzn.to/4qCgf6S',
  'Enameled cast iron Dutch oven for professional use',
  'luxury'
);
```

**When to use SQL:**
- Adding 3+ products at once
- Bulk import from CSV
- Updating multiple products
- More comfortable with SQL

---

### Method 3: Supabase Client (Programmatic)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function addProduct() {
  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        slug: 'vitamix-5200-professional-blender',
        name: 'Vitamix 5200 Professional Blender',
        brand: 'Vitamix',
        category: 'appliances',
        rating: 5,
        tier: 1,
        testing_period: '18+ years professional use',
        image_url: '/images/products/vitamix-5200.jpg',
        affiliate_url: 'https://amzn.to/3XYZ123',
        short_description: 'Professional-grade blender',
        price_tier: 'luxury',
      }
    ])
    .select();

  if (error) {
    console.error('Error adding product:', error);
    return null;
  }

  return data;
}
```

**When to use programmatic:**
- Building admin interface
- Automated product imports
- Need error handling
- Complex workflows

---

## 🔍 Querying Products

### Get Single Product by Slug

```typescript
import { createClient } from '@supabase/supabase-js';

export async function getProductBySlug(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}
```

---

### Get Multiple Products by Slugs

```typescript
export async function getProductsBySlugs(slugs: string[]) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('slug', slugs);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}
```

---

### Get Products by Category

```typescript
export async function getProductsByCategory(category: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('rating', { ascending: false });

  if (error) {
    console.error('Error fetching category products:', error);
    return [];
  }

  return data || [];
}
```

---

## 🛡️ Fallback Patterns

**CRITICAL:** Always provide fallbacks for Supabase data.

### Page-Level Fallback

```typescript
export default async function ReviewPage() {
  // Attempt to fetch from Supabase
  const productFromDb = await getProductBySlug('vitamix-5200-professional-blender');
  
  // Fallback data (from data.ts file)
  const product = productFromDb || {
    slug: productData.slug,
    name: productData.name,
    brand: productData.brand,
    rating: productData.rating,
    affiliateUrl: productData.affiliateUrl,
    imageUrl: '/images/products/vitamix-5200.jpg',
    tier: productData.tier,
    testingPeriod: productData.testingPeriod,
  };

  return (
    <ReviewHero
      productName={product.name}
      rating={product.rating}
      // ... other props
    />
  );
}
```

**Why fallback matters:**
- Supabase could be down (rare but possible)
- API rate limits
- Network issues
- Page still works without database

---

### Component-Level Fallback

```typescript
interface ProductCardProps {
  product?: Product | null; // Allow null
}

export function ProductCard({ product }: ProductCardProps) {
  // Fallback for missing data
  const name = product?.name || 'Product Name Unavailable';
  const rating = product?.rating || 0;
  const imageUrl = product?.image_url || '/images/placeholder.jpg';
  const affiliateUrl = product?.affiliate_url || '#';

  return (
    <div className="product-card">
      <Image src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <StarRating rating={rating} />
      <a href={affiliateUrl}>View Product</a>
    </div>
  );
}
```

---

## 🔄 Updating Products

### Update Single Field

```typescript
const { data, error } = await supabase
  .from('products')
  .update({ affiliate_url: 'https://amzn.to/NEW123' })
  .eq('slug', 'vitamix-5200-professional-blender')
  .select();
```

### Update Multiple Fields

```typescript
const { data, error } = await supabase
  .from('products')
  .update({
    rating: 5,
    testing_period: '19+ years professional use',
    updated_at: new Date().toISOString(),
  })
  .eq('slug', 'vitamix-5200-professional-blender')
  .select();
```

### Bulk Update (Same Field, Multiple Products)

```sql
UPDATE products
SET price_tier = 'luxury'
WHERE brand = 'Le Creuset';
```

---

## 🚨 Common Errors & Solutions

### Error: "duplicate key value violates unique constraint"

**Cause:** Slug already exists in database

**Solution:**
1. Check if product already exists
2. Use different slug
3. Or update existing product instead

```sql
-- Check if slug exists
SELECT * FROM products WHERE slug = 'your-slug';
```

---

### Error: "null value in column violates not-null constraint"

**Cause:** Missing required field

**Solution:** Ensure all required fields are provided
- slug ✅
- name ✅
- brand ✅
- category ✅
- rating ✅
- tier ✅
- testing_period ✅
- image_url ✅
- affiliate_url ✅

---

### Error: "new row for relation violates check constraint"

**Cause:** Invalid value for constrained field

**Common Issues:**
- rating not between 1-5
- tier not 1, 2, or 3
- price_tier not 'budget', 'mid-range', or 'luxury'

**Solution:** Use valid values only

---

### Error: Product data not appearing on page

**Possible Causes:**
1. Slug mismatch (database vs page URL)
2. Supabase environment variables not set
3. Product not fetched correctly
4. Fallback data missing

**Debug Steps:**
```typescript
// Add logging to page
const product = await getProductBySlug('your-slug');
console.log('Product from DB:', product);
```

**Solution:** Verify slug matches exactly, check env vars

---

## 📊 Database Maintenance

### Regular Tasks

**Weekly:**
- [ ] Verify all affiliate links still work
- [ ] Check for any missing images
- [ ] Confirm no duplicate slugs

**Monthly:**
- [ ] Update testing periods for ongoing products
- [ ] Review and update ratings if needed
- [ ] Add new products for upcoming reviews

**Quarterly:**
- [ ] Audit all product data for accuracy
- [ ] Update affiliate links to highest commission programs
- [ ] Clean up any unused products

---

### Backup Strategy

**Automated Backups:**
- Supabase provides automatic daily backups
- Accessible in dashboard under Database → Backups

**Manual Export (Recommended monthly):**
```sql
-- Export all products to CSV
COPY products TO '/tmp/products_backup.csv' DELIMITER ',' CSV HEADER;
```

Or use Supabase dashboard:
1. Table Editor → products
2. Click "..." menu
3. Select "Download as CSV"

---

## 🔐 Security Best Practices

### Row Level Security (RLS)

Products table should allow:
- ✅ **Public read** (anyone can view products)
- ❌ **No public write** (only authenticated users can modify)

**RLS Policy:**
```sql
-- Allow public read access
CREATE POLICY "Allow public read access"
ON products FOR SELECT
TO anon
USING (true);

-- Restrict write access to authenticated users
CREATE POLICY "Allow authenticated write access"
ON products FOR ALL
TO authenticated
USING (true);
```

### Environment Variables

**Required in `.env.local`:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Never commit:**
- Service role key
- Postgres password
- API keys

---

## 📋 Pre-Review Checklist

Before creating ANY review page:

- [ ] Product added to Supabase
- [ ] Slug is URL-friendly and unique
- [ ] All required fields filled
- [ ] Affiliate link tested and working
- [ ] Image uploaded and path correct
- [ ] Rating and tier accurately reflect testing
- [ ] Category matches existing categories
- [ ] Tested query returns product data

**Test Query:**
```typescript
const product = await getProductBySlug('your-slug');
console.log(product); // Should return product object
```

---

## 💡 Pro Tips

1. **Consistent naming:** Use same format for all slugs (brand-model-type)
2. **Test affiliate links:** Click them before adding to database
3. **Use relative image paths:** Easier to migrate if needed
4. **Document tier accurately:** Don't inflate credibility
5. **Keep slugs permanent:** Changing slug breaks URLs
6. **Fallback always:** Never trust database will be available
7. **Log queries during development:** Helps debug issues
8. **Batch updates:** Use SQL for multiple products
9. **Regular audits:** Check data accuracy monthly
10. **Backup before bulk changes:** Safety first

---

## 📚 Related Documentation

- **REVIEW_PAGE_MASTER_TEMPLATE.md** - How review pages use Supabase data
- **SEO_AND_ACCESSIBILITY_REQUIREMENTS.md** - Standards for all content
- **COMPONENT_PROP_INTERFACES.md** - Component data structure

---

## 🎯 Quick Command Reference

```sql
-- Get all products
SELECT * FROM products;

-- Get products by category
SELECT * FROM products WHERE category = 'knives';

-- Get high-rated products
SELECT * FROM products WHERE rating >= 4 ORDER BY rating DESC;

-- Count products by category
SELECT category, COUNT(*) FROM products GROUP BY category;

-- Find products missing optional fields
SELECT * FROM products WHERE short_description IS NULL;

-- Update affiliate link
UPDATE products SET affiliate_url = 'new-url' WHERE slug = 'product-slug';

-- Delete product (careful!)
DELETE FROM products WHERE slug = 'product-slug';
```

---

**Remember:** Supabase is the foundation of your review system. Treat it as the single source of truth, always provide fallbacks, and keep data accurate and up-to-date.

---

**Last Updated:** November 6, 2025
