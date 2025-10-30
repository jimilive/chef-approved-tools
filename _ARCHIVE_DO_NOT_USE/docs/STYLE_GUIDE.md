# Chef Approved Tools - Style Guide

**Last Updated:** October 22, 2025

This document defines the visual design system for chefapprovedtools.com, ensuring consistency across all pages and components.

---

## 📝 Typography

### Primary Font Family
**Inter** - Google Fonts (self-hosted for performance)
- Loaded from: `/fonts/inter-latin-*.woff2`
- Display: `swap` (optimized for web)
- Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

### Font Weights Used
- **Regular (400)** - Body text, paragraphs
- **Semibold (600)** - Subheadings, emphasis, buttons
- **Bold (700)** - Headings, strong emphasis

### Heading Styles

```css
h1 {
  font-size: 2.5rem;     /* 40px */
  font-weight: 700;      /* Bold */
}

h2 {
  font-size: 2rem;       /* 32px */
  font-weight: 700;      /* Bold */
}

h3 {
  font-size: 1.5rem;     /* 24px */
  font-weight: 600;      /* Semibold */
}

h4 {
  font-size: 1.25rem;    /* 20px */
  font-weight: 600;      /* Semibold */
}

h5 {
  font-size: 1rem;       /* 16px */
  font-weight: 600;      /* Semibold */
}
```

### Body Text Sizes

| Class | Size | Usage |
|-------|------|-------|
| `.text-xs` | 0.75rem (12px) | Metadata, captions, labels |
| `.text-sm` | 0.875rem (14px) | Small body text, secondary info |
| `.text-base` | 1rem (16px) | **Default body text** |
| `.text-lg` | 1.125rem (18px) | Lead paragraphs, emphasis |
| `.text-xl` | 1.25rem (20px) | Subheadings |
| `.text-2xl` | 1.5rem (24px) | Section headers |
| `.text-3xl` | 1.875rem (30px) | Page titles |
| `.text-4xl` | 2.25rem (36px) | Hero titles |
| `.text-5xl` | 3rem (48px) | Large hero text |

### Line Heights
- **Body text:** `1.5` (default)
- **Headings:** `1.25` (`.leading-tight`)
- **Relaxed:** `1.625` (`.leading-relaxed`)

---

## 🎨 Color Palette

### Primary Brand Colors (Orange)

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| **Orange 500** | `#f97316` | `bg-orange-500` | Brand accents, badges |
| **Orange 600** | `#ea580c` | `bg-orange-600` | **Primary CTA buttons** (main) |
| **Orange 700** | `#c2410c` | `bg-orange-700` | Hover states, darker accents |
| **Orange 800** | `#9a3412` | `bg-orange-800` | **Header/navigation**, dark elements |
| **Orange 400** | `#fb923c` | `text-orange-400` | Light text on dark backgrounds |
| **Orange 200** | `#fed7aa` | `text-orange-200` | Very light text/accents |
| **Orange 100** | `#ffedd5` | `bg-orange-100` | Light backgrounds, badges |
| **Orange 50** | `#fff7ed` | `bg-orange-50` | Hover backgrounds, very light |

### Secondary Accent (Amber)
| Color | Hex Code | Tailwind Class | Usage |
|-------|----------|----------------|-------|
| **Amber 500** | `#f59e0b` | `to-amber-500` | Gradient stops, warm accents |
| **Amber 100** | `#fef3c7` | `bg-amber-100` | Warning badges, light highlights |
| **Amber 800** | `#92400e` | `text-amber-800` | Dark text on amber backgrounds |

### Custom Orange
| Color | Hex Code | Usage |
|-------|----------|-------|
| **Accent Orange** | `#ff6b35` | Clock icon in Recently Viewed component |

### Gradient Stops (Gold/Yellow)
| Color | Hex Code | Usage |
|-------|----------|-------|
| **Gold** | `#FFD700` | Star icons, premium badges, gradients |
| **Orange Gradient** | `#FFA500` | Gradient endpoints |

### Neutral Colors (Gray/Slate)

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| **Slate 900** | `#0f172a` | `text-slate-900` | **Primary text color** |
| **Slate 800** | `#1e293b` | `bg-slate-800` | Dark backgrounds, footer |
| **Slate 700** | `#334155` | `bg-slate-700` | Medium dark elements |
| **Slate 600** | `#475569` | `border-slate-600` | Borders on dark backgrounds |
| **Slate 400** | `#94a3b8` | `text-slate-400` | Muted text, metadata |
| **Slate 300** | `#cbd5e1` | `text-slate-300` | Light text on dark bg |
| **Gray 900** | `#111827` | - | Body text (fallback) |
| **Gray 200** | `#e5e7eb` | - | Light borders |
| **Gray 100** | `#f3f4f6` | - | Subtle backgrounds |
| **Gray 50** | `#f9fafb` | `bg-gray-50` | **Page background** |

### Utility Colors

| Color | Hex Code | Tailwind Class | Usage |
|-------|----------|----------------|-------|
| **White** | `#ffffff` | `bg-white` | Cards, content backgrounds |
| **Red 600** | `#dc2626` | `to-red-600` | Errors, urgent CTAs |
| **Red 700** | `#b91c1c` | `to-red-700` | Hover states for red |
| **Teal 600** | `#0d9488` | Link color | Link text (globals.css) |
| **Warning Yellow** | `#fff3cd` | Custom bg | Warning/callout boxes |
| **Warning Border** | `#ffc107` | Custom border | Warning box borders |

### Background Colors

| Purpose | Color | Hex/Class |
|---------|-------|-----------|
| **Page Background** | Gray 50 | `#f9fafb` / `bg-gray-50` |
| **Card/Content** | White | `#ffffff` / `bg-white` |
| **Subtle Section** | Gray 100 | `#f3f4f6` / `bg-gray-100` |
| **Light Info Box** | Orange 50 | `#fff7ed` / `bg-orange-50` |
| **Dark Header** | Slate 800 | `#1e293b` / `bg-slate-800` |
| **Warning Box** | Warning Yellow | `#fff3cd` |

---

## 🔘 Buttons & CTAs

### Primary CTA Button (Orange Gradient)
```css
.btn-primary {
  background: linear-gradient(to right, #ea580c, #dc2626);
  color: #fff;
  font-weight: 600;
  padding: 0.75rem 1.5rem;  /* py-3 px-6 */
  border-radius: 0.75rem;   /* rounded-xl */
  transition: all 0.2s;
}

.btn-primary:hover {
  background: linear-gradient(to right, #c2410c, #b91c1c);
  transform: scale(1.02);
}
```

**Tailwind Classes:**
```html
<button class="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95">
  Primary CTA
</button>
```

### Secondary Button (Outline)
```html
<button class="border-2 border-orange-600 text-orange-800 hover:bg-orange-600 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all">
  Secondary CTA
</button>
```

### Tertiary Button (Slate Outline)
```html
<button class="border-2 border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-800 font-semibold py-3 px-6 rounded-xl transition-all">
  Tertiary CTA
</button>
```

### Header/Navigation Button
```html
<button class="bg-orange-800 hover:bg-orange-900 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
  Nav Button
</button>
```

### Button Sizes

| Size | Padding | Font Size | Border Radius |
|------|---------|-----------|---------------|
| **Small** | `px-4 py-2` | `text-sm` | `rounded-lg` |
| **Medium** (default) | `px-6 py-3` | `text-base` | `rounded-xl` |
| **Large** | `px-8 py-4` | `text-lg` | `rounded-xl` |

---

## 📐 Spacing & Layout

### Container Widths
```css
.container {
  max-width: 1280px;      /* 72rem */
  margin: 0 auto;
  padding: 0 1rem;
}
```

**Responsive Breakpoints:**
- Mobile: `padding: 0 1rem` (16px)
- Tablet (640px+): `padding: 0 1.5rem` (24px)
- Desktop (1024px+): `padding: 0 2rem` (32px)

### Common Spacing Values

| Class | Value | Usage |
|-------|-------|-------|
| `gap-4` | 1rem (16px) | Default card spacing |
| `gap-6` | 1.5rem (24px) | Section spacing |
| `gap-8` | 2rem (32px) | Large section spacing |
| `mb-4` | 1rem (16px) | Paragraph spacing |
| `mb-6` | 1.5rem (24px) | Heading spacing |
| `mb-8` | 2rem (32px) | Section spacing |
| `py-12` | 3rem (48px) | Section padding (vertical) |
| `px-4` | 1rem (16px) | Container padding |
| `px-6` | 1.5rem (24px) | Button padding |
| `px-8` | 2rem (32px) | Large element padding |

### Grid Layouts
```html
<!-- Product Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards -->
</div>

<!-- Two Column -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  <!-- Content -->
</div>
```

---

## 🎴 Cards & Components

### Standard Card
```css
.card {
  background: #fff;
  border-radius: 0.75rem;    /* rounded-xl */
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

**Tailwind Classes:**
```html
<div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
  <!-- Card content -->
</div>
```

### Info/Warning Box
```html
<!-- Warning/Callout Box -->
<div style="background: #fff3cd; padding: 20px; border-radius: 8px; border: 2px solid #ffc107;">
  <p><strong>⚠️ Important Note:</strong> Content here</p>
</div>

<!-- Light Info Box -->
<div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
  <p>Info content</p>
</div>
```

### Badge/Tag
```html
<!-- Primary Badge -->
<span class="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
  Badge Text
</span>

<!-- Amber Badge -->
<div class="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-md">
  Tier 2
</div>
```

### Gradient Background
```html
<div class="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700 text-white">
  <!-- Hero content -->
</div>
```

---

## 🔗 Links

### Default Link Style
```css
a {
  color: #0d9488;        /* Teal 600 */
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

### Orange Link Style
```html
<a href="#" class="text-orange-600 hover:text-orange-800 underline">
  Link Text
</a>
```

### Navigation Link
```html
<a href="#" class="text-slate-300 hover:text-orange-400 transition-colors">
  Nav Link
</a>
```

---

## 📊 Tables

### Specification Table
```html
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
      <th style="padding: 12px; text-align: left; font-weight: 600;">Spec</th>
      <th style="padding: 12px; text-align: left; font-weight: 600;">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #dee2e6;">
      <td style="padding: 12px; font-weight: 500;">Dimension</td>
      <td style="padding: 12px;">Value</td>
    </tr>
    <!-- Alternate row background -->
    <tr style="background: #f8f9fa; border-bottom: 1px solid #dee2e6;">
      <td style="padding: 12px; font-weight: 500;">Weight</td>
      <td style="padding: 12px;">Value</td>
    </tr>
  </tbody>
</table>
```

**Table Colors:**
- Header background: `#f8f9fa` (light gray)
- Alternate row: `#f8f9fa` (light gray)
- Border: `#dee2e6` (gray 300)

---

## 🎯 Border Radius

| Size | Value | Class | Usage |
|------|-------|-------|-------|
| Small | 0.375rem (6px) | `rounded-md` | Small elements, badges |
| Medium | 0.5rem (8px) | `rounded-lg` | Buttons, inputs, cards |
| Large | 0.75rem (12px) | `rounded-xl` | Large cards, CTAs |
| Full | 9999px | `rounded-full` | Pills, circular badges |

---

## ✨ Shadows

| Level | Shadow | Class | Usage |
|-------|--------|-------|-------|
| **Small** | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `shadow-sm` | Subtle lift |
| **Medium** | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | `shadow-md` | Default cards |
| **Large** | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | `shadow-lg` | **Standard card** |
| **XL** | `0 20px 25px -5px rgb(0 0 0 / 0.1)` | `shadow-xl` | **Hover state** |

---

## 📱 Responsive Design

### Breakpoints
```javascript
// Tailwind default breakpoints
sm:  640px   // Tablet
md:  768px   // Small laptop
lg:  1024px  // Desktop
xl:  1280px  // Large desktop
2xl: 1536px  // Extra large
```

### Mobile-First Approach
Always start with mobile styles, then add responsive classes:
```html
<div class="text-sm md:text-base lg:text-lg">
  <!-- Text scales up on larger screens -->
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Grid responsive -->
</div>
```

### Mobile Optimizations (< 768px)
- Hero title: `2.5rem` → `2rem` (480px)
- Hero buttons: Full width, max 280px
- Product grid: Single column
- Container padding: `1rem` → `0.75rem` (480px)

---

## 🎨 Common Patterns

### Hero Section
```html
<section class="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700 text-white px-4 py-12 text-center">
  <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-4">
    Hero Title
  </h1>
  <p class="text-lg text-slate-300 max-w-3xl mx-auto mb-6">
    Hero description
  </p>
  <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
    <a href="#" class="btn-primary">Primary CTA</a>
    <a href="#" class="border-2 border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-800">
      Secondary CTA
    </a>
  </div>
</section>
```

### Product Card
```html
<div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
  <img src="..." alt="..." class="rounded-lg mb-4" />
  <h3 class="text-xl font-semibold mb-2">Product Name</h3>
  <p class="text-slate-600 mb-4">Description</p>
  <a href="#" class="bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold px-6 py-3 rounded-xl block text-center">
    View Review
  </a>
</div>
```

### Section Container
```html
<section class="container max-w-7xl mx-auto px-4 py-12">
  <h2 class="text-3xl font-bold text-center mb-8">Section Title</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Content -->
  </div>
</section>
```

---

## ⚡ Transitions & Animations

### Standard Transitions
```css
transition-colors    /* Color changes only */
transition-all       /* All properties */
transition-shadow    /* Shadow changes only */

/* Durations */
duration-150         /* 150ms - Fast */
duration-200         /* 200ms - Standard */
duration-300         /* 300ms - Slow */
```

### Hover Effects
```html
<!-- Scale on hover -->
<button class="hover:scale-105 active:scale-95 transition-transform">
  Button
</button>

<!-- Shadow lift -->
<div class="shadow-lg hover:shadow-xl transition-shadow">
  Card
</div>

<!-- Color change -->
<a class="text-orange-600 hover:text-orange-800 transition-colors">
  Link
</a>
```

### Loading Spinner
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

---

## ♿ Accessibility

### Focus States
```html
<!-- Skip to content link -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-700 text-white px-4 py-2 rounded-md z-50">
  Skip to main content
</a>

<!-- Button focus ring -->
<button class="focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
  Accessible Button
</button>
```

### Screen Reader Only
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 📋 Usage Guidelines

### Do's ✅
- Use Inter font for all text
- Use orange-600 (`#ea580c`) for primary CTAs
- Maintain consistent spacing with Tailwind classes
- Use gradient buttons for primary actions
- Keep shadows consistent (lg → xl on hover)
- Use border-radius consistently (md, lg, xl, full)
- Add transitions to interactive elements
- Use semantic HTML headings (h1-h5)

### Don'ts ❌
- Don't mix custom hex colors with Tailwind classes
- Don't use inline styles unless absolutely necessary
- Don't exceed 1280px container width
- Don't use custom fonts beyond Inter
- Don't skip heading levels (h1 → h3)
- Don't use orange-500 for CTAs (use orange-600)
- Don't forget hover/focus states on interactive elements

---

## 🎯 Quick Reference

**Primary CTA:** Orange-600 to Red-600 gradient (`#ea580c` → `#dc2626`)
**Header:** Slate-800 with Orange-800 buttons (`#1e293b`)
**Body Text:** Slate-900 on Gray-50 background (`#0f172a`)
**Links:** Teal-600 (`#0d9488`) or Orange-600 (`#ea580c`)
**Cards:** White with shadow-lg → shadow-xl on hover
**Font:** Inter (Regular 400, Semibold 600, Bold 700)
**Container:** Max 1280px, padding 1rem (responsive)

---

**Questions?** Refer to `/app/globals.css` and `/app/layout.tsx` for implementation details.
