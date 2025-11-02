# Test Homepage V4 - Setup Notes

**Test URL:** http://localhost:3000/test-homepage-v4

---

## ✅ What's Ready

This test page is based on the V3 homepage that Claude.ai created for you. It includes:

1. **Hero Section** - With the red line fix (rounded-2xl on the image itself)
2. **"These Tools Create This Food"** - 3-column food photography grid
3. **Email Capture Form** - Styled correctly but NOT connected to ActiveCampaign (test only)
4. **Why Listen to Me?** - Credentials section with action shots
5. **Shop by Category** - New section with knives/cookware/appliances
6. **Secondary CTA** - "Tools That Started It All"
7. **Top Professional Picks** - Product review cards
8. **Final CTA** - Bottom email capture
9. **Trust Bar** - Footer with credentials

---

## ⚠️ Image Substitutions I Made

The new design called for some images that don't exist yet. Here's what I substituted:

### Food Photos Section:
- **"Perfect Eggs"** - Original wanted: `le-creuset-eggs-over-easy.jpg`
  - **Substituted:** `cuisinart-eggs-cooking.jpg` (you already have this)
  - **Updated link:** Points to cuisinart-multiclad-pro-skillet review

- **"BBQ Ribs"** - Original wanted: `bbq-ribs-plated.jpg`
  - **Substituted:** `nordic-ware-ribs.jpg` (you already have this)
  - **Updated link:** Points to nordic-ware-half-sheet-pan review

### Product Cards Section:
- **Missing:** `vitamix-5200-blender.jpg` - Shows placeholder
- **Missing:** `lodge-cast-iron-skillet.jpg` - Shows placeholder
- **Missing:** `victorinox-fibrox-chefs-knife.jpg` - Shows placeholder

---

## 🚨 Questions for You

### 1. Email Form Integration
The test form is **NOT connected to ActiveCampaign** yet. When you click submit, it just shows an alert.

**Question:** Do you want me to:
- A) Connect it to ActiveCampaign now using the credentials from the deployment guide?
- B) Leave it as-is for testing and connect it later when we deploy to production?

### 2. Missing Product Images
Three product images are missing (shown as placeholders).

**Question:** Should I:
- A) Create placeholder images or use your logo?
- B) Skip the "Top Professional Picks" section entirely?
- C) Leave as-is and you'll add product images later?

### 3. Category Pages
The "Shop by Category" section links to `/knives`, `/cookware`, and `/appliances`.

**Question:** Do these pages exist? If not:
- Should I create them?
- Or change the links to go somewhere else (like `/reviews`)?

### 4. "Tools That Started It All" Page
There's a link to `/tools-that-started-it-all` which may not exist.

**Question:**
- Does this page exist?
- If not, should I remove the section or change the link?

### 5. Review Page Links
The food photos link to specific review pages. Do all of these exist?
- `/reviews/lodge-cast-iron-skillet`
- `/reviews/epicurean-cutting-board`
- `/reviews/le-creuset-dutch-oven`
- `/reviews/cuisinart-multiclad-pro-skillet`
- `/reviews/nordic-ware-half-sheet-pan`
- `/reviews/vitamix-5200-professional-blender`
- `/reviews/victorinox-fibrox-chefs-knife`

---

## 🎯 Next Steps

Once you review the test page and answer the questions above:

1. **If you like it as-is:**
   - I'll help you deploy it to the actual homepage
   - We'll connect the ActiveCampaign form properly
   - We'll add any missing images or pages

2. **If you want changes:**
   - Let me know what to adjust
   - I can iterate on this test page until it's perfect

3. **Then we'll deploy:**
   - Backup current homepage
   - Replace with V4
   - Test in production
   - Monitor conversion rates

---

## 🔍 What to Check

When you view http://localhost:3000/test-homepage-v4:

- [ ] **Hero section** - Is the red line gone? Does the badge look right?
- [ ] **Food photos** - Do the substituted images work for you?
- [ ] **Email form** - Does the styling look good? (Don't worry about submit yet)
- [ ] **Credentials section** - Does the "three-tier system" callout look good?
- [ ] **Category cards** - Do you like the emoji icons and hover effects?
- [ ] **Product cards** - Are the placeholders okay or do you want me to handle differently?
- [ ] **Mobile view** - Check on your phone - does everything stack nicely?
- [ ] **Overall flow** - Does the page tell your story the way you want?

---

## 📝 Technical Notes

### Changes from Original V3:
1. Renamed component to `HomePageV4()` for clarity
2. Changed gradient to `to-slate-600` (avoids red line issue)
3. Added `rounded-2xl` directly to Image component (red line fix)
4. Form has test handler instead of ActiveCampaign POST
5. Product cards show placeholders for missing images
6. Substituted existing images where originals were missing

### No Changes Needed To:
- All the action shot images (garlic, pot roast, mandolin, air fryer) - these all exist
- Hero photo (scott-chef-coat-cropped.jpg) - exists
- Most food photos (steak, burger, tomatoes, pot roast) - all exist

---

Let me know what you think and what adjustments you'd like!
