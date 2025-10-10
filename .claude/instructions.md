# Claude Code Instructions for This Project

## Critical Rules

### File Operations
- **NEVER delete, empty, or remove any file content without explicit user approval**
- Only make edits that are specifically requested by the user
- When in doubt, ask before making destructive changes
- If a user says "stop" or rejects an edit, stop immediately

### Problem Solving Approach
- **ALWAYS use the easiest solution that uses the least tokens**
- Don't go down rabbit holes without discussing with user first
- If encountering a complex problem (like reading Excel files), ask user for simpler alternative (screenshot, CSV, etc.) before attempting complex solutions

### JSX Content Quality (CRITICAL - Prevents Build Failures)
- **NEVER use unescaped quotes in JSX text content**
- Always use HTML entities: `&quot;` for double quotes, `&apos;` for apostrophes
- This prevents ESLint `react/no-unescaped-entities` errors that block Netlify builds
- Each failed build costs money and credits
- Examples:
  - ❌ WRONG: `<p>This is a "professional" knife</p>`
  - ✅ CORRECT: `<p>This is a &quot;professional&quot; knife</p>`
  - ❌ WRONG: `<p>It's the best</p>`
  - ✅ CORRECT: `<p>It&apos;s the best</p>`

### Tracking Implementation
- Only implement Amazon affiliate tracking (no other merchants yet)
- Use AffiliateButton component for all Amazon affiliate links
- Track positions: above_fold, mid_article, final_cta

### Review Page Updates
- Reviews completed with new template: KitchenAid KSM8990WH, Victorinox 8" Chef's Knife, Le Creuset 7.25-Qt Dutch Oven
- Only update reviews that have been explicitly approved for the new template
- John Boos and other reviews use different templates - wait for instructions before updating
