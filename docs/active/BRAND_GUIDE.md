# Chef Approved Tools - Brand Guide

## Brand Overview
**Website:** https://www.chefapprovedtools.com
**Tagline:** "Tools for Your Kitchen"
**Mission:** Professional chef-tested reviews of commercial kitchen equipment and tools. Honest, detailed evaluations based on 23+ years of restaurant experience.

---

## Logo & Visual Identity

### Primary Logo
- **File Location:** `/public/logo.png`
- **Dimensions:** 1000 x 1000 px (square format)
- **Format:** PNG with transparency
- **Description:**
  - "Chef" text in bold black sans-serif
  - "Approved" text in bright golden yellow
  - Tagline "TOOLS FOR YOUR KITCHEN" in thin black uppercase with yellow accent line
  - Black chef's pan with handle illustration
  - Golden yellow flame rising from pan
  - Clean, professional, modern design

### Alternative Logo Assets
- **OG Image:** `/public/og-image.jpg` (1000x1000px, JPG format for social sharing)
- **Twitter Image:** `/public/twitter-image.jpg` (1000x1000px, optimized for Twitter cards)
- **Favicon:** Auto-generated from logo

### AI Image Generation Prompts
When creating consistent brand imagery, use these prompts:

**Logo Recreation:**
```
Modern professional chef logo with text "Chef Approved" where "Chef" is in bold black and "Approved" is in golden yellow (#F59E0B). Include a minimalist black chef's pan with a golden yellow flame. Tagline below reads "TOOLS FOR YOUR KITCHEN" in thin uppercase letters. Clean white background, suitable for web use.
```

**Brand Photography Style:**
```
Professional kitchen photography, commercial restaurant setting, stainless steel surfaces, natural lighting from left side, sharp focus on [product name], shallow depth of field, clean professional aesthetic matching Chef Approved Tools brand
```

**Product Hero Images:**
```
High-quality product photography of [product name] on clean white background, professional studio lighting, sharp focus, restaurant-grade quality, professional chef aesthetic, suitable for review page hero image
```

---

## Color Palette

### Primary Colors

**Brand Orange (Primary Brand Color)**
- Hex: `#EA580C` (orange-600)
- RGB: `234, 88, 12`
- Usage: Primary CTAs, gradients, accents, logo "Approved" text, flames, hero backgrounds
- Lighter variant: `#F97316` (orange-500)
- Light background: `#FFF7ED` (orange-50)
- Darker variant: `#C2410C` (orange-700)
- Border/highlights: `#FB923C` (orange-400)
- Badge text: `#FDBA74` (orange-200)
- Represents: Heat, cooking energy, professional passion, attention, quality

**Deep Black**
- Hex: `#000000`
- RGB: `0, 0, 0`
- Usage: Logo "Chef" text, headings, pan illustration, primary text
- Represents: Professional authority, sophistication, timelessness

**Slate Gray (Secondary)**
- Dark: `#1E293B` (slate-800) to `#0F172A` (slate-900)
- Medium: `#475569` (slate-600)
- Light: `#94A3B8` (slate-400)
- Very light: `#F8FAFC` (slate-50)
- Usage: Hero gradients (slate-to-orange), backgrounds, secondary text
- Represents: Professional kitchen steel, modern sophistication

### Supporting Colors

**Teal/Turquoise (Links & Interactive)**
- Hex: `#0D9488` (teal-600)
- RGB: `13, 148, 136`
- Usage: Links, hover states, interactive elements
- Represents: Trust, reliability, professional expertise

**Golden Yellow (Accents)**
- Hex: `#FBBF24` (yellow-400)
- RGB: `251, 191, 36`
- Usage: Logo yellow accent, star ratings, warm highlights
- Represents: Quality approval, warmth, certification

**Green (Success/Pros)**
- Hex: `#10B981` (green-500)
- RGB: `16, 185, 129`
- Light variant: `#ECFDF5` (green-50) for backgrounds
- Dark variant: `#065F46` (green-900) for text
- Border: `#BBF7D0` (green-200)
- Usage: "What Works" sections, pros lists, success states
- Represents: Approval, positive aspects, quality

**Red (Limitations/Cons)**
- Hex: `#EF4444` (red-500)
- RGB: `239, 68, 68`
- Light variant: `#FEF2F2` (red-50) for backgrounds
- Dark variant: `#7F1D1D` (red-900) for text
- Border: `#FECACA` (red-200)
- Usage: "Limitations" sections, cons lists, warnings
- Represents: Caution, limitations, honest assessment

### Neutral Colors

**Text Colors**
- Primary: `#111827` (gray-900) - Main body text
- Secondary: `#374151` (gray-700) - Supporting text
- Tertiary: `#6B7280` (gray-500) - Meta information
- Light: `#D1D5DB` (gray-300) - Disabled states

**Background Colors**
- Page background: `#F9FAFB` (gray-50)
- Card background: `#FFFFFF` (white)
- Section background: `#F8FAFC` (slate-50)
- Border: `#E5E7EB` (gray-200)

### Star Ratings
- Star color: `#FBBF24` (yellow-400)
- RGB: `251, 191, 36`
- Usage: Product ratings, review scores

---

## Typography

### Font Family
```css
font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```
- Professional, clean, highly legible
- System fonts for fast loading
- Consistent across all devices

### Heading Sizes
- H1: `2.5rem` (40px) - Page titles
- H2: `2rem` (32px) - Section headings
- H3: `1.5rem` (24px) - Subsections
- H4: `1.25rem` (20px) - Card titles
- H5: `1rem` (16px) - Small headings

### Heading Weights
- H1, H2: `font-weight: bold` (700)
- H3, H4, H5: `font-weight: 600` (semi-bold)

### Body Text
- Base size: `16px` (1rem)
- Line height: `1.5` (24px)
- Large text: `1.125rem` (18px) for emphasis
- Small text: `0.875rem` (14px) for meta info

---

## Brand Voice & Messaging

### Tone
- **Authoritative** - 23+ years restaurant experience
- **Honest** - Transparent pros and cons
- **Professional** - Commercial-grade focus
- **Practical** - Real-world testing and use cases
- **Approachable** - Written for both pros and serious home cooks

### Key Phrases
- "Professional Kitchen Tested"
- "Restaurant-Grade Quality"
- "Certified Chef Approved"
- "Tested in Real Restaurant Environments"
- "23+ Years Restaurant Experience"
- "Commercial Kitchen Durability"

### Expertise Credentials
- **Name:** Scott Bradley
- **Title:** Professional Chef & Kitchen Manager
- **Experience:** 23+ years restaurant experience
- **Previous Role:** Former Kitchen Manager at Mellow Mushroom
- **Testing Environment:** Real commercial kitchen conditions

---

## Design Patterns

### Call-to-Action Buttons

**Primary CTA (Orange Gradient)**
```
Background: linear-gradient from #EA580C (orange-600) to #DC2626 (red-600)
Text: #FFFFFF (white)
Hover: from #C2410C (orange-700) to #B91C1C (red-700)
Shadow: Large elevation on hover
Font: Bold
Border-radius: 8px (rounded-lg)
```

**Secondary CTA (Orange Outline)**
```
Background: Transparent or white
Border: 2px solid #EA580C (orange-600)
Text: #EA580C (orange-600)
Hover Background: #FFF7ED (orange-50)
Font: Bold
Border-radius: 8px (rounded-lg)
```

**Tertiary CTA (Black)**
```
Background: #000000 (black)
Text: #FFFFFF (white)
Hover: #1F2937 (gray-800)
Border: Optional white outline
```

### Badges & Labels

**"Professional Kitchen Tested" Badge**
```
Background: #F97316/20 (orange-500 with 20% opacity)
Border: #FB923C/30 (orange-400 with 30% opacity)
Text: #FDBA74 (orange-300)
Shape: Rounded pill (full border-radius)
```

**Star Ratings**
```
Color: #FBBF24 (yellow-400)
Size: Inline with text
Format: ★★★★★
```

### Content Cards

**Product Cards**
```
Background: #FFFFFF (white)
Border: 1px solid #E5E7EB (gray-200)
Border-radius: 8px (rounded-lg)
Shadow: Subtle on hover
Padding: 24px
```

**Pros Section**
```
Background: #ECFDF5 (green-50)
Border-left: 4px solid #10B981 (green-500)
Heading color: #065F46 (green-900)
Text color: #374151 (gray-700)
```

**Cons Section**
```
Background: #FEF2F2 (red-50)
Border-left: 4px solid #EF4444 (red-500)
Heading color: #7F1D1D (red-900)
Text color: #374151 (gray-700)
```

**Bottom Line / Summary**
```
Background: #FFF7ED (orange-50)
Border-left: 4px solid #F97316 (orange-600)
Text color: #374151 (gray-700)
Heading color: #111827 (gray-900)
```

---

## Spacing & Layout

### Container Width
- Max width: `1280px`
- Padding: `1rem` (16px) on mobile, `2rem` (32px) on desktop

### Section Spacing
- Between major sections: `3rem` (48px)
- Between subsections: `2rem` (32px)
- Between paragraphs: `1rem` (16px)

### Grid Layouts
- Product grids: 3 columns on desktop, 1 column on mobile
- Gap between cards: `1.5rem` (24px)

---

## Responsive Breakpoints

```css
Mobile: max-width: 480px
Tablet: max-width: 768px
Desktop: 769px and above
```

### Mobile Adjustments
- Hero title: `2rem` (32px) on mobile vs `2.5rem` (40px) on desktop
- Single column layouts
- Full-width CTAs (max 280px centered)
- Reduced padding: `0.75rem` (12px)

---

## Brand Assets Checklist

### Current Assets
- [x] Primary logo (PNG, 1000x1000px)
- [x] OG/social sharing image (JPG, 1000x1000px)
- [x] Twitter card image (JPG, 1000x1000px)
- [x] Favicon (auto-generated)
- [x] Color palette documented
- [x] Typography system defined
- [ ] Square social profile images (recommended: 400x400px)
- [ ] Rectangular hero images for blog posts (recommended: 1200x630px)
- [ ] Email header template
- [ ] Printable business cards/letterhead (if needed)

### Recommended Additions
- [ ] Transparent PNG logo (black text only, for dark backgrounds)
- [ ] Transparent PNG logo (white text only, for light backgrounds)
- [ ] Simplified icon-only version (pan + flame only)
- [ ] Horizontal logo layout for email signatures
- [ ] Product photography template/guidelines
- [ ] Social media post templates (Instagram, Pinterest, Facebook)

---

## Usage Guidelines

### Logo Usage
- **DO:** Use on white or very light backgrounds
- **DO:** Maintain minimum clear space around logo (10% of logo width)
- **DO:** Maintain aspect ratio when resizing
- **DON'T:** Distort, rotate, or skew the logo
- **DON'T:** Change the colors (black, yellow, white only)
- **DON'T:** Add effects (shadows, outlines, glows)

### Color Usage
- Golden yellow (#F59E0B) should be used sparingly as an accent, not as a dominant color
- Always maintain sufficient contrast for accessibility (WCAG AA minimum)
- Use white backgrounds for product photography to match brand cleanliness

### Brand Consistency
- All product reviews should include "Professional Kitchen Tested" badge
- Star ratings always use yellow-400 (#FBBF24)
- Maintain consistent spacing and card designs across all pages
- Use standard pros/cons color scheme (green/red) on all reviews

---

## File Locations

```
/public/logo.png - Primary logo (1000x1000px PNG)
/public/og-image.jpg - Open Graph social sharing image
/public/twitter-image.jpg - Twitter card image
/app/globals.css - Global CSS with color values
/tailwind.config.js - Tailwind configuration
```

---

## Quick Reference: Hex Color List

### Primary Brand Colors (Use These!)
```
Brand Orange (Primary): #EA580C (orange-600) - Main CTAs, accents, logo
Orange Light: #F97316 (orange-500) - Lighter accents
Orange Dark: #C2410C (orange-700) - Hover states
Orange Background: #FFF7ED (orange-50) - Light backgrounds
Orange Border: #FB923C (orange-400) - Borders
Orange Text Light: #FDBA74 (orange-200) - Light text on dark
Orange Text Dark: #9A3412 (orange-800) - Dark text on light

Brand Red (Gradient partner): #DC2626 (red-600) - CTA gradients
Red Hover: #B91C1C (red-700) - Gradient hover

Black: #000000 - Logo "Chef", headings
White: #FFFFFF - Backgrounds, light text

Slate 900: #0F172A - Hero gradients
Slate 800: #1E293B - Hero gradients
Slate 700: #334155 - Hero gradients
Slate 600: #475569 - Secondary text
Slate 400: #94A3B8 - Tertiary text
Slate 300: #CBD5E1 - Light text on dark
Slate 50: #F8FAFC - Light backgrounds
```

### Supporting Colors
```
Yellow (stars/accents): #FBBF24 (yellow-400)
Teal (links): #0D9488 (teal-600)

Green (pros): #10B981 (green-500)
Green light bg: #ECFDF5 (green-50)
Green dark text: #065F46 (green-900)
Green border: #BBF7D0 (green-200)

Red (cons): #EF4444 (red-500)
Red light bg: #FEF2F2 (red-50)
Red dark text: #7F1D1D (red-900)
Red border: #FECACA (red-200)

Gray 900 (text): #111827
Gray 700 (secondary): #374151
Gray 600: #4B5563
Gray 500 (tertiary): #6B7280
Gray 400: #9CA3AF
Gray 300: #D1D5DB
Gray 200 (borders): #E5E7EB
Gray 50 (page bg): #F9FAFB
```

---

**Last Updated:** 2025-10-03
**Maintained By:** Scott Bradley
**Brand Version:** 2.0
