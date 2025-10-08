# Image & Video Organization Guide

**Last Updated:** 2025-10-07

---

## Directory Structure Created

```
/public/
├── images/
│   ├── products/           # WebP images for site (organized by product)
│   ├── pinterest/          # JPG images for Pinterest
│   └── team/              # Team headshots
└── videos/                # Product demonstration videos
```

---

## Naming Convention

### ✅ Final Approved Format: `[product-slug]-[number].[extension]`

**Why dashes?**
- SEO-friendly (search engines read dashes as word separators)
- Web standard (URLs use dashes)
- Clean and readable

---

## Product Folders Created (18 Total)

### Products WITH Reviews (12):
1. john-boos-platinum-commercial-cutting-board
2. gold-textiles-bar-mops
3. epicurean-kitchen-cutting-board
4. victorinox-offset-bread-knife
5. victorinox-granton-edge-boning-knife
6. oxo-good-grips-swivel-peeler
7. oxo-good-grips-bench-scraper
8. victorinox-4-inch-paring-knife
9. victorinox-fibrox-10-inch-chefs-knife
10. victorinox-fibrox-8-inch-chefs-knife
11. benriner-large-mandoline
12. winco-heavy-duty-tongs

### Products WITHOUT Reviews Yet (6):
1. honing-steel
2. garlic-chopper
3. cambro-6-pan
4. sani-bucket
5. cuisinart-egg-pan
6. knife-guard

---

## File Naming Examples

### WebP Images (For Website):
```
/public/images/products/[product-slug]/
└── victorinox-fibrox-8-inch-chefs-knife-1.webp
└── victorinox-fibrox-8-inch-chefs-knife-2.webp
└── victorinox-fibrox-8-inch-chefs-knife-3.webp
└── victorinox-fibrox-8-inch-chefs-knife-4.webp
└── etc.
```

**Usage:** Image #1 is the primary/hero image. Images display in numerical order.

### JPG Images (For Pinterest):
```
/public/images/pinterest/
├── victorinox-fibrox-8-inch-chefs-knife-1.jpg
├── victorinox-fibrox-8-inch-chefs-knife-2.jpg
├── oxo-good-grips-swivel-peeler-1.jpg
├── benriner-large-mandoline-1.jpg
└── etc.
```

### Videos:
```
/public/videos/
├── victorinox-fibrox-8-inch-chefs-knife-1.mp4      # Turn cut demo (angle 1)
├── victorinox-fibrox-8-inch-chefs-knife-2.mp4      # Turn cut demo (angle 2)
├── victorinox-fibrox-10-inch-chefs-knife-1.mp4     # Steeling demonstration
├── oxo-good-grips-swivel-peeler-1.mp4              # Peeling carrot (angle 1)
├── oxo-good-grips-swivel-peeler-2.mp4              # Peeling carrot (angle 2)
├── benriner-large-mandoline-1.mp4                   # Shaving onion demo
└── sources/                                         # Original .mov files (backup)
    ├── victorinox-fibrox-8-inch-chefs-knife-1.mov
    ├── victorinox-fibrox-8-inch-chefs-knife-2.mov
    ├── victorinox-fibrox-10-inch-chefs-knife-1.mov
    ├── oxo-good-grips-swivel-peeler-1.mov
    ├── oxo-good-grips-swivel-peeler-2.mov
    └── benriner-large-mandoline-1.mov
```

### Headshot:
```
/public/images/team/
├── scott-bradley.webp      # For website
└── scott-bradley.jpg       # For social media/Pinterest
```

---

## How to Upload Your Images

### Step 1: Rename Your Files

**WebP files** → Move to `/public/images/products/[product-slug]/`
- Rename to: `[product-slug]-1.webp`, `[product-slug]-2.webp`, etc.

**JPG files** → Move to `/public/images/pinterest/`
- Rename to: `[product-slug]-1.jpg`, `[product-slug]-2.jpg`, etc.

**Videos:**
- MP4 files → `/public/videos/[product-slug]-1.mp4`
- MOV files → `/public/videos/sources/[product-slug]-1.mov`

### Step 2: Image Order Matters

**The first image (#1) is always the primary/hero image.**

Images will display in numerical order (1, 2, 3, 4...) on product pages.

---

## Current Image Inventory

- **Total Products with Images:** 18
- **Estimated Images:** ~272 total (136 webp + 136 jpg)
- **Average per Product:** 7-8 images
- **Videos:** 6 total (3 mp4 + 3 mov)
- **Headshots:** 1 (webp + jpg)

---

## Video Details

| Product | Video File | Description |
|---------|-----------|-------------|
| benriner-large-mandoline | benriner-large-mandoline-1.mp4 | Shaving red onion demo |
| victorinox-fibrox-8-inch-chefs-knife | victorinox-fibrox-8-inch-chefs-knife-1.mp4 | Turn cut on carrot (angle 1) |
| victorinox-fibrox-8-inch-chefs-knife | victorinox-fibrox-8-inch-chefs-knife-2.mp4 | Turn cut on carrot (angle 2) |
| victorinox-fibrox-10-inch-chefs-knife | victorinox-fibrox-10-inch-chefs-knife-1.mp4 | Steeling demonstration |
| oxo-good-grips-swivel-peeler | oxo-good-grips-swivel-peeler-1.mp4 | Peeling carrot (angle 1) |
| oxo-good-grips-swivel-peeler | oxo-good-grips-swivel-peeler-2.mp4 | Peeling carrot (angle 2) |

---

## Quick Reference: Product Slug List

### Copy/paste these exact slugs when renaming files:

```
benriner-large-mandoline
cambro-6-pan
cuisinart-egg-pan
epicurean-kitchen-cutting-board
garlic-chopper
gold-textiles-bar-mops
honing-steel
john-boos-platinum-commercial-cutting-board
knife-guard
oxo-good-grips-bench-scraper
oxo-good-grips-swivel-peeler
sani-bucket
victorinox-4-inch-paring-knife
victorinox-fibrox-10-inch-chefs-knife
victorinox-fibrox-8-inch-chefs-knife
victorinox-granton-edge-boning-knife
victorinox-offset-bread-knife
winco-heavy-duty-tongs
```

---

## Next Steps

1. **Rename your 272 images** using the naming convention above
2. **Move images to correct folders:**
   - WebP → `/public/images/products/[product-slug]/`
   - JPG → `/public/images/pinterest/`
3. **Move videos** to `/public/videos/`
4. **Move headshot** to `/public/images/team/`

---

## Notes

- Image #1 is always the primary/hero image
- Images display in numerical order on product pages
- WebP for website (performance), JPG for Pinterest (compatibility)
- Keep original .mov files as backup in `/videos/sources/`
