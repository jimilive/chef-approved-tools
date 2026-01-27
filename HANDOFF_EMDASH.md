# Em Dash Removal Handoff

**Date:** 2026-01-26
**Session Summary:** Established verified em dash removal process after discovering previous humanizer work was incomplete.

---

## Background

The previous humanizer work claimed 116 pages completed, but grep verification revealed ~99 files still contained em dashes. Investigation showed incomplete audits - pages were marked "Done" after partial fixes without grep verification.

## New Process Established

**Before starting a file:**
```bash
grep -c "—" <file>
```

**For each em dash:**
1. Show line number and surrounding context
2. Propose replacement (comma, period, colon, parentheses, or keep)
3. Get explicit user approval
4. Make the edit

**After all changes:**
```bash
grep -c "—" <file>
```
Must be zero (or only approved keeps like attributions/UI labels).

**Only then** add to `EMDASH_VERIFIED.md` tracking file.

---

## Tracking File

`/Users/scottbradley/chef-approved-tools/EMDASH_VERIFIED.md` - Only files with grep-verified zero fixable em dashes go here.

---

## Completed Review Files (15)

All in `app/reviews/`:

| File | Status |
|------|--------|
| rubbermaid-commercial-cooks-scraper/page.tsx | 1 attribution kept |
| oxo-good-grips-bench-scraper/page.tsx | 1 attribution kept |
| norton-im200-tri-stone-sharpener/page.tsx | 1 fixed |
| oxo-good-grips-swivel-peeler/page.tsx | 1 attribution kept |
| small-metal-hotel-pans/page.tsx | 2 UI labels kept |
| small-plastic-hotel-pans/page.tsx | 2 UI labels kept |
| large-metal-hotel-pans/page.tsx | 2 UI labels kept |
| winco-heavy-duty-tongs-data.ts | 1 kept, 2 fixed |
| zuperia-bar-mops-data.ts | 3 fixed |
| robot-coupe-r2-dice/page.tsx | 5 removed (third-party reviews) |
| le-creuset-dutch-oven-data.ts | 6 fixed |
| kitchenaid-professional-600-data.ts | 8 fixed |
| lamson-fish-spatula-data.ts | 9 fixed |
| large-metal-hotel-pans-data.ts | 10 fixed |
| wusthof-classic-ikon-16-piece-data.ts | 11 fixed |

---

## Remaining Review Files (~6)

Run this to get current counts:
```bash
for f in $(grep -l "—" --include="*.tsx" --include="*.ts" -r app/reviews/ 2>/dev/null); do count=$(grep -c "—" "$f"); echo "$count $f"; done | sort -rn
```

Expected remaining:
- ninja-bl660-professional-blender-data.ts (54)
- norton-im200-tri-stone-sharpener-data.ts (28)
- wusthof-classic-ikon-santoku-data.ts (16)
- oxo-good-grips-swivel-peeler-data.ts (14)
- method-all-purpose-cleaner-data.ts (14)
- cuisinart-dlc-10c-data.ts (14)

---

## Blog Files (Not Started)

~70+ blog files still have em dashes. Run:
```bash
for f in $(grep -l "—" --include="*.tsx" --include="*.ts" -r app/blog/ 2>/dev/null); do count=$(grep -c "—" "$f"); echo "$count $f"; done | sort -rn
```

---

## Important Discoveries This Session

1. **Amazon reviews removed** - Displaying Amazon customer reviews violates affiliate TOS. Removed from:
   - rubbermaid-commercial-cooks-scraper
   - oxo-good-grips-bench-scraper
   - oxo-good-grips-swivel-peeler

2. **WebstaurantStore reviews removed** - Same compliance concern. Removed from:
   - robot-coupe-r2-dice

3. **UI labels can keep em dashes** - Size selectors like `${option.size} — ${option.depth}` are acceptable.

4. **Attributions keep em dashes** - Quote attributions like `— Scott Bradley` or `— Amazon verified purchaser` use proper em dash.

---

## Replacement Guidelines

| Context | Replace With |
|---------|--------------|
| Pause/aside | comma |
| New sentence follows | period (capitalize next word) |
| List introduction | colon |
| Paired em dashes (parenthetical) | parentheses |
| Attribution (— Author) | KEEP |
| UI labels | KEEP (user preference) |

---

## Tool Created

`scripts/humanize-emdash.js` - Interactive em dash removal tool (not used in this session, but available). Run with:
```bash
node scripts/humanize-emdash.js <file-path>
```

---

## Next Steps

1. Continue with remaining 6 review files
2. Then move to blog files (~70+)
3. Always use the established process: grep count → show context → get approval → edit → verify → track
