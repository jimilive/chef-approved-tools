# Development Workflow Guide

## Initial Setup

### 1. Clone Repository
```bash
git clone https://github.com/jimilive/chef-approved-tools.git
cd chef-approved-tools
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Open in VS Code
```bash
code .
```

When you open the project, VS Code will prompt you to install recommended extensions. Click "Install All" to get:
- Auto Rename Tag
- Prettier (code formatting)
- ESLint (code quality)
- Live Server
- HTMLHint
- CSS Peek
- Path Intellisense
- Tailwind CSS IntelliSense
- TypeScript support
- MDX support

---

## Branch Strategy

### Main Branches

**`main`** - Production branch
- Always deployable
- Protected branch (requires PR approval)
- Auto-deploys to: https://www.chefapprovedtools.com
- Never commit directly to main

**`development`** - Staging branch
- Integration branch for features
- Auto-deploys to: development--chefapprovedtools.netlify.app
- Merge features here first before production

### Feature Branches

Create feature branches from `development`:

```bash
# Switch to development
git checkout development
git pull origin development

# Create feature branch
git checkout -b feature/homepage-redesign
git checkout -b feature/add-new-review
git checkout -b fix/mobile-navigation
git checkout -b content/update-pricing
```

**Branch naming conventions:**
- `feature/*` - New features or enhancements
- `fix/*` - Bug fixes
- `content/*` - Content updates (reviews, guides)
- `refactor/*` - Code refactoring
- `test/*` - Adding or updating tests

---

## Development Workflow

### Starting Development

```bash
# Make sure you're on the latest development
git checkout development
git pull origin development

# Create your feature branch
git checkout -b feature/your-feature-name

# Start dev server
npm run dev
```

The site will be available at: http://localhost:3000

### Making Changes

1. **Edit files** in VS Code
2. **Auto-formatting**: Save files (Prettier formats on save)
3. **See changes instantly**: Hot reload shows updates immediately
4. **Check for errors**: ESLint will show warnings/errors inline

### Testing Your Changes

```bash
# Run linter
npm run lint

# Run tests (when available)
npm test

# Build for production (catches build errors)
npm run build

# Test production build locally
npm start
```

### Committing Changes

```bash
# Check what changed
git status
git diff

# Stage your changes
git add .

# Commit with descriptive message
git commit -m "Add homepage hero section redesign"

# Push to GitHub
git push origin feature/your-feature-name
```

### Creating a Pull Request

1. Go to: https://github.com/jimilive/chef-approved-tools/pulls
2. Click "New Pull Request"
3. Base branch: `development` (not main!)
4. Compare branch: `feature/your-feature-name`
5. Fill out PR template:
   - **Title**: Brief description
   - **Description**: What changed and why
   - **Screenshots**: If UI changes
   - **Testing**: How you tested it
6. Click "Create Pull Request"

### Netlify Deploy Preview

When you create a PR, Netlify automatically:
- Builds your branch
- Creates a unique preview URL
- Comments on the PR with the preview link
- Runs Lighthouse tests

Example preview URL: `deploy-preview-123--chefapprovedtools.netlify.app`

Review your changes at the preview URL before merging!

---

## Merging to Production

### Development → Main (Production Deploy)

1. Test thoroughly on development staging site
2. Create PR from `development` to `main`
3. Review all changes
4. Get approval (if working with team)
5. Merge to `main`
6. Netlify auto-deploys to www.chefapprovedtools.com
7. Verify production site works correctly

### Hotfix Workflow (Emergency Fixes)

For critical bugs in production:

```bash
# Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b fix/critical-bug

# Make the fix
# ... edit files ...

# Test thoroughly
npm run build
npm start

# Commit and push
git add .
git commit -m "Fix critical bug in affiliate links"
git push origin fix/critical-bug

# Create PR to main for immediate deploy
# After merge, also merge main back to development
git checkout development
git merge main
git push origin development
```

---

## Environment Configuration

### Local Development (.env.local)

Create `.env.local` for local secrets (never commit this file):

```bash
# Amazon Associates
NEXT_PUBLIC_AMAZON_TAG=chefapproved-20

# Analytics (if needed)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API Keys
NETLIFY_API_TOKEN=your-token-here
```

### Netlify Environment Variables

Set in Netlify dashboard under Site Settings → Environment Variables:
- `NEXT_PUBLIC_AMAZON_TAG=chefapproved-20`
- `NODE_VERSION=18`
- Any other secrets needed

---

## Common Tasks

### Adding a New Product Review

```bash
git checkout development
git checkout -b content/add-review-product-name

# Create review file
touch app/reviews/product-slug/page.tsx

# Use existing review as template
cp app/reviews/vitamix-5200/page.tsx app/reviews/new-product/page.tsx

# Edit the new review
code app/reviews/new-product/page.tsx

# Test locally
npm run dev
# Visit: http://localhost:3000/reviews/new-product

# Commit and push
git add .
git commit -m "Add professional review for [Product Name]"
git push origin content/add-review-product-name
```

### Updating Existing Content

```bash
git checkout development
git checkout -b content/update-vitamix-pricing

# Make your edits
code app/reviews/vitamix-5200/page.tsx

# Verify changes
npm run dev

# Commit with clear message
git commit -am "Update Vitamix 5200 pricing and availability"
git push origin content/update-vitamix-pricing
```

### Fixing Bugs

```bash
git checkout development
git checkout -b fix/mobile-menu-not-closing

# Fix the bug
# Test on mobile viewport in browser DevTools
npm run dev

# Verify fix works
npm run build
npm start

# Commit
git commit -am "Fix mobile menu not closing on link click"
git push origin fix/mobile-menu-not-closing
```

---

## Code Quality Standards

### Before Every Commit

✅ **Run linter**
```bash
npm run lint
```

✅ **Test build**
```bash
npm run build
```

✅ **Check formatting**
- Prettier auto-formats on save
- Or run: `npx prettier --write .`

✅ **Test functionality**
- Click through your changes
- Test on mobile viewport
- Verify affiliate links work

### Writing Good Commits

**Good commit messages:**
```
✅ Add Recently Viewed component to homepage
✅ Fix mobile navigation overlay z-index
✅ Update Lodge cast iron pricing and specs
✅ Refactor product schema generation
```

**Bad commit messages:**
```
❌ Fixed stuff
❌ WIP
❌ asdfasdf
❌ Update
```

**Format**: `[Type] Brief description of what changed`
- Add: New features
- Fix: Bug fixes
- Update: Content/data changes
- Refactor: Code improvements without behavior change
- Remove: Deleting code/features

---

## Performance Checklist

Before merging to `main`, verify:

- [ ] Lighthouse score still 100/100 (check Netlify preview)
- [ ] No console errors in browser
- [ ] Images are optimized (WebP/AVIF)
- [ ] No unnecessary dependencies added
- [ ] Bundle size didn't increase significantly
- [ ] All affiliate links work correctly
- [ ] Mobile responsiveness maintained
- [ ] SEO metadata present

---

## Troubleshooting

### Build Fails on Netlify

1. Check build logs in Netlify dashboard
2. Common issues:
   - TypeScript errors
   - Missing dependencies
   - Environment variables not set
3. Test locally: `npm run build`
4. Fix errors and push again

### Git Conflicts

```bash
# Update your branch with latest development
git checkout development
git pull origin development

git checkout feature/your-branch
git merge development

# Fix conflicts in VS Code (look for <<<<<<< markers)
# After fixing:
git add .
git commit -m "Resolve merge conflicts"
git push origin feature/your-branch
```

### Dev Server Issues

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

---

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Check code quality

# Git
git status           # See what changed
git diff             # See line-by-line changes
git log --oneline    # See commit history
git branch           # List branches
git checkout -       # Switch to previous branch

# Netlify CLI (optional)
netlify dev          # Run with Netlify functions
netlify deploy       # Manual deploy
netlify open         # Open Netlify dashboard
```

---

## Best Practices

### DO ✅
- Create small, focused branches
- Write descriptive commit messages
- Test on mobile viewport
- Keep dependencies up to date
- Review your own PR before requesting review
- Merge development regularly to avoid conflicts

### DON'T ❌
- Commit directly to `main`
- Push large files (videos, high-res images)
- Commit `.env.local` or secrets
- Leave console.logs in production code
- Make huge PRs with 50+ file changes
- Skip testing before pushing

---

## Getting Help

### Resources
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Issues**: https://github.com/jimilive/chef-approved-tools/issues

### Common Questions

**Q: How do I test Netlify-specific features locally?**
A: Install Netlify CLI: `npm install -g netlify-cli`, then run `netlify dev`

**Q: Can I work on multiple features at once?**
A: Yes! Create separate branches and switch between them:
```bash
git checkout feature/homepage
# Work on homepage...
git checkout feature/new-review
# Work on review...
```

**Q: How do I undo uncommitted changes?**
A: `git checkout -- filename` or `git restore filename`

**Q: How do I undo a commit?**
A: `git reset HEAD~1` (keeps changes) or `git reset --hard HEAD~1` (deletes changes)

---

## Deployment URLs

- **Production**: https://www.chefapprovedtools.com
- **Development Staging**: https://development--chefapprovedtools.netlify.app
- **Deploy Previews**: Unique URL per PR (posted in PR comments)
- **Netlify Dashboard**: https://app.netlify.com/sites/chefapprovedtools

---

**Happy coding! 🚀**