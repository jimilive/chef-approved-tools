# Active Tasks - Product Reviews & Database

## Priority 0: Technical Maintenance & Training

### Supabase Admin Training Session
- [ ] Schedule training session for Supabase database management
- [ ] Cover: How to add/edit products correctly
- [ ] Cover: Affiliate link best practices (unique links per product)
- [ ] Cover: Required fields and data validation
- [ ] Cover: How to use validation scripts before making changes
- [ ] Document: Step-by-step guide for common tasks

### Critical: Fix Duplicate Affiliate Links
- [ ] **Robot Coupe R2 Dice** - Create unique Amazon affiliate link (currently shares `https://amzn.to/4gVgENj` with Black+Decker)
- [ ] **Victorinox 10" Knife** - Create unique Amazon affiliate link (currently shares `https://amzn.to/4o6pPwW` with Diamond Crystal Salt)
- [ ] Run `npm run validate:duplicates` after fixing to verify
- [ ] **BLOCKER**: Site won't deploy until these are fixed

### Add Missing Affiliate Links to Supabase
- [ ] **Benriner large mandoline** (`benriner-large-mandoline`) - Add Amazon affiliate link
- [ ] **Bodum chambord french press** (`bodum-chambord-french-press`) - Add Amazon affiliate link
- [ ] **Cuisinart 8-Inch Nonstick Pan** (`cuisinart-8-inch-nonstick-pan`) - Add Amazon affiliate link
- [ ] **Method All-Purpose Cleaner** (`method-all-purpose-cleaner`) - Add Amazon affiliate link
- [ ] **Norton tri stone sharpener** (`norton-im200-tri-stone-sharpener`) - Add Amazon affiliate link
- [ ] **Zuperia bar mops** (`zuperia-bar-mops`) - Add Amazon affiliate link

### Next.js Version Update
- [ ] Check current Next.js version (currently 14.2.32)
- [ ] Review Next.js 15 changelog and breaking changes
- [ ] Test update in local environment
- [ ] Update if stable and beneficial

## Priority 1: Missing Product Reviews (Full Creation Required)

### Create Henckels 10-Inch Sharpening Steel Review
- [ ] Create `/app/reviews/henckels-10-inch-sharpening-steel/page.tsx`
- [ ] Write full review content (pros, cons, expert opinion, testing details)
- [ ] Add product entry to Supabase with all metadata
- [ ] Ensure slug: `henckels-10-inch-sharpening-steel`
- [ ] Add affiliate link: `https://amzn.to/4qh96Zu`
- [ ] Update internal links in blog/how-to-steel-a-knife to point to new review

### Create Gourmia Pizza Oven Review
- [ ] Create `/app/reviews/gourmia-pizza-oven/page.tsx`
- [ ] Write full review content (pros, cons, expert opinion, testing details)
- [ ] Add product entry to Supabase with all metadata
- [ ] Ensure slug: `gourmia-pizza-oven`
- [ ] Add affiliate link: `https://amzn.to/4qfaiMU`
- [ ] Update internal links in guides/affordable-kitchen-appliances to point to new review

## Priority 2: Hotel Pan Lids & Configuration

### Add Missing Lid Products
- [ ] Create Plastic Hotel Pan Lids product in Supabase
- [ ] Create Metal Hotel Pan Regular Lids (non-notched) in Supabase
- [ ] Verify Metal Hotel Pan Notched Lids exists (`https://amzn.to/47IgA0o`)
- [ ] Verify all 4 hotel pan products (small-plastic, large-plastic, small-metal, large-metal) have correct affiliate links

## Priority 3: Knife Product Cleanup

### Victorinox Paring Knife Variants
- [x] Updated all site code with correct working links
  - 4-inch: `https://amzn.to/3Lc3oIo` (updated in review page, kitchen-bundle, best-chef-knives guide)
  - 3.25-inch: `https://amzn.to/4qN4b31` (updated in review page)
- [x] Review page now properly displays both size options
- [ ] Add both variants to Supabase product with tags "4-inch" and "3.25-inch"

### Verify Duplicate Affiliate Links
- [x] Victorinox 10-inch chef knife - removed broken link `https://amzn.to/3JhIxaZA`, keeping working link `https://amzn.to/4o6pPwW`
- [x] Victorinox Granton boning knife - removed broken link `https://amzn.to/4bWqrgs`, keeping working link `https://amzn.to/4pUDed1`
- [x] Victorinox paring knife - removed broken links, updated with correct working links
- [x] All duplicate/broken knife links cleaned up from site code ✅

## Priority 4: Email Configuration

### Email Testing & Verification
- [ ] Check with Dave if email worked
- [ ] Test scott@chefapprovedtools.com email address works

### Email Capture Lead Magnet Standardization
- [ ] Update all 5 email capture locations to use only the 11 products lead magnet
- [ ] Ensure all email capture wording is consistent across all 5 locations
- [ ] Verify lead magnet offer is clear and compelling in all instances

## Priority 5: SEO & Link Building (Week of Oct 28-Nov 1)

### Guest Posting & Outreach
- [ ] Send 5 guest post pitches (Tuesday)
- [ ] Respond to 3-5 HARO queries (Tuesday AM)
- [ ] Resource page outreach - 20 emails (Wednesday)
- [ ] Follow up on guest post pitches (Thursday)
- [ ] Check if Tasting Table articles published (Friday)

## Priority 6: Production Monitoring (Optional - Do When Ready)

### Error Tracking Setup
- [ ] Setup Sentry for production error tracking (30 min)
  - Free tier: 5,000 errors/month
  - Catches JavaScript errors in production
  - Get alerts when things break
  - See detailed stack traces
  - Guide: `docs/PRODUCTION-MONITORING-SETUP.md`

### 404 Monitoring
- [ ] Enable Google Search Console email alerts for 404s (5 min)
  - Already have Search Console setup
  - Just enable notifications in settings

### Uptime Monitoring
- [ ] Setup UptimeRobot (10 min, free)
  - Get alerts if site goes down
  - 5-minute check intervals
  - Email/SMS notifications

**Total time:** ~45 minutes
**Total cost:** $0/month (all free tiers)
**See:** `docs/PRODUCTION-MONITORING-SETUP.md` for detailed setup instructions

---

# Metadata Update Project - Third Iteration

## Instructions (CRITICAL - DO NOT DEVIATE)
1. Update ALL page titles and meta descriptions based on spreadsheet data
2. Check both `page.tsx` AND `layout.tsx` files for metadata location
3. Verify page content matches years/testing period stated in new metadata
4. Flag ANY mismatches for review - DO NOT assume or change content
5. Work ONE page at a time - NO SCRIPTS
6. Update ONLY `title` and `description` fields in metadata
7. DO NOT change any page content beyond metadata

## Process for Each Page
1. Read spreadsheet entry for the page
2. Open the page file (check both page.tsx and layout.tsx)
3. Read page content to verify years/testing location matches new metadata
4. If match: Update title and description
5. If mismatch: FLAG for review with specific details
6. Mark as complete in tracking list below

## Pages to Update (68 total)

### Informational Pages
- [ ] /app/about/page.tsx - "About Scott Bradley & Testing Methodology"
- [ ] /app/contact/page.tsx - "Contact Chef Scott Bradley | Get Advice"
- [ ] /app/methodology/page.tsx - "Testing Methodology: Real Restaurant Trials"
- [ ] /app/review-tiers/page.tsx - "Three-Tier Testing: Review Methodology"

### Landing Pages
- [ ] /app/guides/affordable-kitchen-appliances/page.tsx - "Budget Kitchen Appliances 2025: What Works"
- [ ] /app/reviews/benriner-large-mandoline/page.tsx - "Benriner Mandoline: Pro Safety & Precision"
- [ ] /app/best-budget-chef-knife/page.tsx - "Best Budget Chef Knife 2025: Victorinox 8""
- [ ] /app/guides/best-chef-knives/page.tsx - "Best Chef Knives 2025: Expert Buying Guide"
- [ ] /app/cookware/page.tsx - "Best Cookware 2025 | Chef Pots & Pans Guide"
- [ ] /app/guides/best-cookware/page.tsx - "Restaurant-Grade Cookware: Pro Comparison"
- [ ] /app/guides/kitchen-appliances/page.tsx - "Commercial Kitchen Appliances 2025: Guide"
- [ ] /app/appliances/page.tsx - "Kitchen Appliances 2025 | Pro Chef Reviews"
- [ ] /app/best-knife-for-cutting-meat/page.tsx - "Best Meat Cutting Knife 2025: Boning Guide"
- [ ] /app/blog/best-scrambled-eggs/page.tsx - "Perfect Scrambled Eggs: Pro Chef Technique"
- [ ] /app/reviews/black-decker-toaster-oven/page.tsx - "Black+Decker Toaster Oven: 48-Year Review"
- [ ] /app/reviews/bodum-chambord-french-press/page.tsx - "Bodum Chambord: 18-Year French Press Test"
- [ ] /app/knives/page.tsx - "Chef Knives Hub: All Reviews, Guides, Tips"
- [ ] /app/kitchen-bundle/page.tsx - "Essential Kitchen Starter: 10 Year Pro-Tested"
- [ ] /app/cookie-policy/page.tsx - "Cookie Policy | Chef Approved Tools Notice"
- [ ] /app/guides/cookware-materials/page.tsx - "Cookware Materials: Chef's Complete Guide"
- [ ] /app/reviews/cuisinart-8-inch-nonstick-pan/page.tsx - "Cuisinart 8" Nonstick: Perfect Eggs Every Time"
- [ ] /app/reviews/cuisinart-dlc-10c-classic-food-processor/page.tsx - "Cuisinart DLC-10C: 30-Year Durability Test"
- [ ] /app/reviews/diamond-crystal-kosher-salt/page.tsx - "Diamond Crystal Salt: Pro Kitchen Essential"
- [ ] /app/reviews/epicurean-kitchen-cutting-board/page.tsx - "Epicurean Board: Dishwasher-Safe Pro Choice"
- [ ] /app/newsletter/page.tsx - "Equipment Newsletter: Pro Tips & Insights"
- [ ] /app/blog/how-to-sear-steaks-like-restaurant-chef/page.tsx - "How to Sear Steaks Like Restaurant Chefs"
- [ ] /app/blog/how-to-sharpen-with-tri-stone/page.tsx - "Sharpen with Tri-Stone: Step-by-Step Pro"
- [ ] /app/blog/how-to-steel-a-knife/page.tsx - "How to Steel a Knife: Professional Honing"
- [ ] /app/reviews/john-boos-platinum-commercial-cutting-board/page.tsx - "John Boos Board: 14-Year Butcher Block Test"
- [ ] /app/guides/page.tsx - "Kitchen Equipment Guides | Chef's Picks"
- [ ] /app/glossary/page.tsx - "Kitchen Terms Glossary: Pro Cuts & Tools"
- [ ] /app/blog/kitchen-gloves-guide/page.tsx - "Kitchen Gloves: Cut-Resistant Safety Guide"
- [ ] /app/reviews/kitchenaid-ksm8990wh/page.tsx - "KitchenAid KSM8990WH: Commercial Test NSF"
- [ ] /app/reviews/kitchenaid-kp26m1xlc-professional-600/page.tsx - "KitchenAid Pro 600: Home Baker's Workhorse"
- [ ] /app/guides/knife-care/page.tsx - "Knife Care: Sharpening & Storage Techniques"
- [ ] /app/reviews/le-creuset-signature-7-25-qt-dutch-oven/page.tsx - "Le Creuset 7.25-Qt: 12-Year Dutch Oven Test"
- [ ] /app/reviews/lodge-seasoned-cast-iron-3-skillet-bundle/page.tsx - "Lodge Cast Iron 3-Skillet: Home Use Review"
- [ ] /app/blog/meat-cooking-temperatures-thermometers/page.tsx - "Meat Temps & Thermometers: Safety Guide"
- [ ] /app/reviews/method-all-purpose-cleaner/page.tsx - "Method Cleaner: Non-Toxic Grease-Cutting"
- [ ] /app/reviews/nordic-ware-half-sheet-pan/page.tsx - "Nordic Ware Sheet Pan: 10-Year Baker Test"
- [ ] /app/reviews/norton-im200-tri-stone-sharpener/page.tsx - "Norton Tri-Stone: Restaurant Sharpener Pro"
- [ ] /app/reviews/oxo-good-grips-bench-scraper/page.tsx - "OXO Bench Scraper: Underrated Kitchen MVP"
- [ ] /app/reviews/oxo-good-grips-swivel-peeler/page.tsx - "OXO Swivel Peeler: Ergonomic Design Winner"
- [ ] /app/blog/how-to-make-perfect-french-press-coffee/page.tsx - "French Press Coffee: Perfect Ratio & Method"
- [ ] /app/privacy-policy/page.tsx - "Privacy Policy | Chef Approved Tools Legal"
- [ ] /app/blog/page.tsx - "Pro Cooking Techniques | Restaurant Methods"
- [ ] /app/reviews/robot-coupe-r2-dice/page.tsx - "Robot Coupe R2: Commercial Prep Powerhouse"
- [ ] /app/reviews/rubbermaid-commercial-cooks-scraper/page.tsx - "Rubbermaid Scraper: Buy-It-For-Life Tool"
- [ ] /app/terms/page.tsx - "Terms of Service | Chef Approved Tools Info"
- [ ] /app/review-tiers/page.tsx - "Three-Tier Testing: Review Methodology"
- [ ] /app/reviews/victorinox-fibrox-10-inch-chefs-knife/page.tsx - "Victorinox 10" Chef: Large Hand Pro Choice"
- [ ] /app/reviews/victorinox-4-inch-paring-knife/page.tsx - "Victorinox 4" Paring: NSF Certified Value"
- [ ] /app/reviews/victorinox-fibrox-8-inch-chefs-knife/page.tsx - "Victorinox 8" Fibrox: Budget Pro Performance"
- [ ] /app/reviews/victorinox-granton-edge-boning-knife/page.tsx - "Victorinox Granton Boning: Firm Blade Pro"
- [ ] /app/reviews/victorinox-offset-bread-knife/page.tsx - "Victorinox Bread Knife: Offset Ergo Design"
- [ ] /app/reviews/vitamix-5200/page.tsx - "Vitamix 5200 Blender: 5-Year Power Test"
- [ ] /app/reviews/wusthof-classic-ikon-16-piece/page.tsx - "Wusthof Ikon 16-Pc: German Forged Quality"
- [ ] /app/blog/why-professional-chefs-use-kosher-salt/page.tsx - "Why Kosher Salt: Chef's Priceable Secret"
- [ ] /app/reviews/winco-heavy-duty-tongs/page.tsx - "Winco Heavy-Duty Tongs: Restaurant Grade"
- [ ] /app/reviews/zuperia-bar-mops/page.tsx - "ZUPERIA Bar Mops: Industry Standard Cotton"
- [ ] /app/page.tsx - "Chef Approved Tools: Restaurant-Tested Gear"
- [ ] /app/contact/page.tsx - "Contact Chef Scott Bradley | Get Advice"
- [ ] /app/methodology/page.tsx - "Testing Methodology: Real Restaurant Trials"
- [ ] /app/reviews/page.tsx - "All Product Reviews | Chef-Tested Kitchen Gear"

## Progress Tracking
- Total pages: 68
- Completed: 0
- Flagged for review: 0
- In progress: Starting

## Flags/Issues
(Will document any mismatches found during verification)

---

## Notes
- This is the THIRD iteration of this task
- Previous attempts used scripts which caused issues
- This time: Manual, one page at a time, careful verification
- Context may compact - use this file to resume work

---

# Supabase Products - Missing Items (Add to Database)

## Missing Product Reviews (Need Full Creation)

### Products Referenced But No Review Pages Exist:
- [ ] **Henckels 10-Inch Sharpening Steel** - `henckels-10-inch-sharpening-steel` - https://amzn.to/4qh96Zu
  - Currently referenced in: blog/how-to-steel-a-knife/page.tsx
  - **Needs:** Full product review page creation + Supabase entry

- [ ] **Gourmia 1800W Indoor Pizza Oven** - `gourmia-pizza-oven` - https://amzn.to/4qfaiMU
  - Currently referenced in: guides/affordable-kitchen-appliances/page.tsx
  - **Needs:** Full product review page creation + Supabase entry

## Hotel Pans - Missing Lids & Configuration Verification

### Current 4-Product Structure (CORRECT - Intentional Design):
✅ small-plastic-hotel-pans
✅ large-plastic-hotel-pans
✅ small-metal-hotel-pans
✅ large-metal-hotel-pans

### Missing Lid Products:
- [ ] **Plastic Hotel Pan Lids** - Create product with appropriate affiliate link(s)
- [ ] **Metal Hotel Pan Regular Lids (non-notched)** - Create product with affiliate link
- [ ] Verify **Metal Hotel Pan Notched Lids** exists - https://amzn.to/47IgA0o (currently in code)

### Configuration Verification Needed:
- [ ] Verify all 4 hotel pan products have correct affiliate links in Supabase
- [ ] Verify small-plastic-hotel-pans has https://amzn.to/47oh8qZ (or correct link)
- [ ] Verify large-plastic-hotel-pans has https://amzn.to/4qtKjSe (or correct link)
- [ ] Verify small-metal-hotel-pans has https://amzn.to/3Wny7og (or correct link)
- [ ] Verify large-metal-hotel-pans has https://amzn.to/4hoWZ8C (or correct link)

## Knife Variants - Needs Cleanup

### Victorinox 4-Inch Paring Knife
**Current:** One product with duplicate links
**Should be:** One product with TWO tagged variants:
- [ ] Tag "4-inch": https://amzn.to/4mzvALq (primary)
- [ ] Tag "3.25-inch": https://amzn.to/4n4bDvw (variant)

### Victorinox 10-Inch Chef's Knife
**Issue:** Two different affiliate links found
- https://amzn.to/4o6pPwW
- https://amzn.to/3JhIxaZA
**Action needed:** Verify which is correct, remove duplicate/incorrect link

### Victorinox Granton Edge Boning Knife
**Issue:** Two different affiliate links found
- https://amzn.to/4bWqrgs
- https://amzn.to/4pUDed1
**Action needed:** Verify which is correct, remove duplicate/incorrect link

## Analysis Summary

### Total Unique Products in Reviews: 36
1. benriner-large-mandoline
2. black-decker-toaster-oven
3. bodum-chambord-french-press
4. cuisinart-8-inch-nonstick-pan
5. cuisinart-dlc-10c-classic-food-processor
6. diamond-crystal-kosher-salt
7. epicurean-kitchen-cutting-board
8. instant-pot-duo-plus-6qt
9. japanese-wooden-spoon-set
10. john-boos-platinum-commercial-cutting-board
11. kitchenaid-kp26m1xlc-professional-600
12. kitchenaid-ksm8990wh
13. large-metal-hotel-pans
14. large-plastic-hotel-pans
15. le-creuset-signature-7-25-qt-dutch-oven
16. lodge-seasoned-cast-iron-3-skillet-bundle
17. method-all-purpose-cleaner
18. ninja-air-fryer-af101
19. ninja-bl660-professional-blender
20. nordic-ware-half-sheet-pan
21. norton-im200-tri-stone-sharpener
22. oxo-good-grips-bench-scraper
23. oxo-good-grips-swivel-peeler
24. robot-coupe-r2-dice
25. rubbermaid-commercial-cooks-scraper
26. small-metal-hotel-pans
27. small-plastic-hotel-pans
28. victorinox-4-inch-paring-knife
29. victorinox-fibrox-10-inch-chefs-knife
30. victorinox-fibrox-8-inch-chefs-knife
31. victorinox-granton-edge-boning-knife
32. victorinox-offset-bread-knife
33. vitamix-5200
34. winco-heavy-duty-tongs
35. wusthof-classic-ikon-16-piece
36. zuperia-bar-mops

### Products Referenced in Guides/Bundles (Not in Reviews):
- Henckels 10-Inch Sharpening Steel (NO REVIEW PAGE EXISTS - needs full creation)
- Gourmia Pizza Oven (NO REVIEW PAGE EXISTS - needs full creation)

### Why Nordic Ware Half Sheet Pan Has No Link Listed:
- Product exists in reviews with `affiliateLinks: []`
- Already configured to fetch from Supabase
- Link IS in Supabase database, not in fallback code
- This is CORRECT implementation ✅

### Insight: Why We Were Missing Products
Initial analysis only captured products with fallback URLs in code. Products already fully integrated with Supabase (like Nordic Ware) weren't listed. All 36 review products ARE migrated and working correctly. The "missing" items are:
1. Henckels Sharpening Steel - **No review page exists, needs full creation**
2. Gourmia Pizza Oven - **No review page exists, needs full creation**
3. Hotel pan lids - Oversight during original creation, need product entries
