# Vercel Worktree Social Links Fix
**Priority**: HIGH - Incorrect links are live in production
**Estimated Time**: 30-45 minutes
**Location**: `.worktrees/vercel-ui-ux/`

---

## ⚠️ Critical Issues Found

Your Vercel website (production) has **incorrect social media links** in 20+ files:

```
❌ linkedin.com/in/frankxai          → Should be: linkedin.com/in/frank-x-riemer/
❌ linkedin.com/in/frankzickert      → Should be: linkedin.com/in/frank-x-riemer/ (WRONG PERSON!)
❌ suno.com/@frankxai                → Should be: suno.com/@frankx
❌ twitter.com/frankxai              → Should be: x.com/frankxeth
❌ x.com/frankxai                    → Should be: x.com/frankxeth
```

---

## Files That Need Fixing

### Footer Components (High Priority)
- `.worktrees/vercel-ui-ux/components/Footer.tsx`
- `.worktrees/vercel-ui-ux/components/Footer2025.tsx`

### Pages with Social Links (High Priority)
- `.worktrees/vercel-ui-ux/app/about/page.tsx`
- `.worktrees/vercel-ui-ux/app/page.tsx` (homepage - schema.org markup)
- `.worktrees/vercel-ui-ux/components/home/HomePageElite.tsx`

### Content Pages (Medium Priority)
- `.worktrees/vercel-ui-ux/app/blog/[slug]/page.tsx` (share buttons)
- `.worktrees/vercel-ui-ux/app/community/page.tsx`
- `.worktrees/vercel-ui-ux/app/creation-chronicles/page.tsx`
- `.worktrees/vercel-ui-ux/app/music/page.tsx`
- `.worktrees/vercel-ui-ux/app/music-lab/page.tsx`
- `.worktrees/vercel-ui-ux/app/students/page.tsx`

---

## Option 1: Automated Fix (Recommended)

### Step 1: Navigate to Vercel Worktree
```bash
cd .worktrees/vercel-ui-ux/
```

### Step 2: Create Fix Branch
```bash
git checkout -b fix/correct-social-links
```

### Step 3: Run Search & Replace

**Important**: Review each change before committing!

```bash
# Fix LinkedIn (frankxai → frank-x-riemer)
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.mdx" \) \
  -exec grep -l "linkedin.com/in/frankxai" {} \; | \
  xargs sed -i 's|linkedin.com/in/frankxai|linkedin.com/in/frank-x-riemer/|g'

# Fix LinkedIn (frankzickert → frank-x-riemer) - CRITICAL!
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.mdx" \) \
  -exec grep -l "linkedin.com/in/frankzickert" {} \; | \
  xargs sed -i 's|linkedin.com/in/frankzickert|linkedin.com/in/frank-x-riemer/|g'

# Fix LinkedIn (generic "frank" → frank-x-riemer)
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.mdx" \) \
  -exec grep -l 'linkedin.com/in/frank"' {} \; | \
  xargs sed -i 's|linkedin.com/in/frank"|linkedin.com/in/frank-x-riemer/"|g'

# Fix Suno (frankxai → frankx)
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.mdx" \) \
  -exec grep -l "suno.com/@frankxai" {} \; | \
  xargs sed -i 's|suno.com/@frankxai|suno.com/@frankx|g'

# Fix Twitter (frankxai → frankxeth)
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.mdx" \) \
  -exec grep -l "twitter.com/frankxai" {} \; | \
  xargs sed -i 's|twitter.com/frankxai|x.com/frankxeth|g'

# Fix X handle (@frankxai → @frankxeth)
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.mdx" \) \
  -exec grep -l "@frankxai" {} \; | \
  xargs sed -i 's|@frankxai|@frankxeth|g'

# Fix X domain (x.com/frankxai → x.com/frankxeth)
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.mdx" \) \
  -exec grep -l "x.com/frankxai" {} \; | \
  xargs sed -i 's|x.com/frankxai|x.com/frankxeth|g'
```

### Step 4: Review Changes
```bash
git status
git diff

# Review each changed file carefully!
# Make sure no legitimate "frankxai" references were changed
```

### Step 5: Copy Central Config (Future-Proof)
```bash
# Copy the social-links.ts config from main repo
cp ../../lib/social-links.ts ./lib/social-links.ts

# Now update Footer components to import from it
```

### Step 6: Commit and Push
```bash
git add .
git commit -m "fix: correct all social media links to match BRAND_IDENTITY.md

- Fix LinkedIn: frankxai → frank-x-riemer
- Fix LinkedIn: frankzickert → frank-x-riemer (critical!)
- Fix Suno: @frankxai → @frankx
- Fix X/Twitter: frankxai → frankxeth
- Add central social-links.ts config
- Update Footer components to import from config

Reference: /mnt/c/Users/Frank/FrankX/BRAND_IDENTITY.md"

git push origin fix/correct-social-links
```

### Step 7: Deploy
- Create PR on GitHub
- Review changes one more time
- Merge to main
- Vercel auto-deploys

---

## Option 2: Manual Fix (Safer, Slower)

### Step 1: Open Files One by One
Use VS Code to open each file listed above.

### Step 2: Search & Replace in Each File
Use VS Code's Find & Replace (Cmd+F):

**LinkedIn fixes:**
- Find: `linkedin.com/in/frankxai`
- Replace: `linkedin.com/in/frank-x-riemer/`

- Find: `linkedin.com/in/frankzickert`
- Replace: `linkedin.com/in/frank-x-riemer/`

**Suno fix:**
- Find: `suno.com/@frankxai`
- Replace: `suno.com/@frankx`

**X/Twitter fixes:**
- Find: `twitter.com/frankxai`
- Replace: `x.com/frankxeth`

- Find: `x.com/frankxai`
- Replace: `x.com/frankxeth`

- Find: `@frankxai`
- Replace: `@frankxeth`

### Step 3: Update Footer Components

**Current state**: Footer has hardcoded links (or missing social links)

**Target state**: Import from central config

```tsx
// Add to top of Footer.tsx
import { PRIMARY_SOCIAL_LINKS } from '@/lib/social-links'

// Replace hardcoded social links section with:
<div className="flex space-x-3">
  {PRIMARY_SOCIAL_LINKS.map((social) => (
    <a
      key={social.name}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="..."
      aria-label={social.description}
    >
      {/* Icon component */}
    </a>
  ))}
</div>
```

### Step 4: Test Locally
```bash
npm run dev
# Visit each page with social links and verify
```

### Step 5: Commit & Deploy
Same as Option 1 steps 6-7.

---

## Post-Deployment Verification

After deploying, manually check:

### ✅ Checklist
- [ ] Footer social icons link to correct URLs
- [ ] About page social links are correct
- [ ] Homepage schema.org `sameAs` array is correct
- [ ] Blog share buttons use correct Twitter handle
- [ ] Music pages link to correct Suno profile
- [ ] No more references to frankxai anywhere
- [ ] No more references to frankzickert (wrong person!)

### Tools to Use
1. **Link Checker**: Run `npx broken-link-checker https://frankx.ai`
2. **Manual Test**: Click every social link on every page
3. **Schema Validator**: Use Google Rich Results Test
4. **Grep Search**: Search codebase for deprecated links

---

## Prevention: Automated Link Checker

### Pre-Commit Hook (Recommended)

Create `.worktrees/vercel-ui-ux/.husky/pre-commit`:

```bash
#!/bin/bash

echo "🔍 Checking for deprecated social links..."

# Check staged files for incorrect patterns
INCORRECT=$(git diff --cached --name-only | \
  xargs grep -n "linkedin.com/in/frankxai\|linkedin.com/in/frankzickert\|suno.com/@frankxai\|twitter.com/frankxai\|x.com/frankxai" 2>/dev/null)

if [ ! -z "$INCORRECT" ]; then
  echo "❌ ERROR: Deprecated social links found!"
  echo "$INCORRECT"
  echo ""
  echo "Please use the correct links from lib/social-links.ts:"
  echo "  - LinkedIn: linkedin.com/in/frank-x-riemer/"
  echo "  - Suno: suno.com/@frankx"
  echo "  - X/Twitter: x.com/frankxeth"
  echo ""
  echo "See BRAND_IDENTITY.md for canonical URLs."
  exit 1
fi

echo "✅ No deprecated links found"
```

Make it executable:
```bash
chmod +x .worktrees/vercel-ui-ux/.husky/pre-commit
```

### GitHub Action (CI/CD Check)

Create `.worktrees/vercel-ui-ux/.github/workflows/check-social-links.yml`:

```yaml
name: Check Social Links

on: [pull_request]

jobs:
  check-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Check for deprecated social links
        run: |
          echo "Checking for deprecated social links..."

          # Search for incorrect patterns
          if grep -r "linkedin.com/in/frankxai" . --exclude-dir={node_modules,.next,out}; then
            echo "❌ Found deprecated LinkedIn link: frankxai"
            exit 1
          fi

          if grep -r "linkedin.com/in/frankzickert" . --exclude-dir={node_modules,.next,out}; then
            echo "❌ Found wrong person's LinkedIn: frankzickert"
            exit 1
          fi

          if grep -r "suno.com/@frankxai" . --exclude-dir={node_modules,.next,out}; then
            echo "❌ Found deprecated Suno link: @frankxai"
            exit 1
          fi

          if grep -r "twitter.com/frankxai\|x.com/frankxai" . --exclude-dir={node_modules,.next,out}; then
            echo "❌ Found deprecated X/Twitter link: frankxai"
            exit 1
          fi

          echo "✅ All social links are correct!"
```

---

## Timeline

**Immediate (Today):**
- [ ] Review this document
- [ ] Choose Option 1 (automated) or Option 2 (manual)
- [ ] Create fix branch
- [ ] Make changes

**This Week:**
- [ ] Deploy to production
- [ ] Verify all links work
- [ ] Set up automated checker

**Ongoing:**
- [ ] Monthly link audits
- [ ] Update BRAND_IDENTITY.md if links change
- [ ] Propagate changes to all codebases

---

## Support

If you run into issues:
1. Check `git status` and `git diff` before committing
2. Test locally with `npm run dev` before pushing
3. Review PR carefully before merging
4. Monitor Vercel deployment logs

**Remember**: The goal is to have ONE source of truth (BRAND_IDENTITY.md) that all code references. This fix is step one. The automated checker is step two.

---

**Status**: Ready to execute
**Estimated Time**: 30-45 minutes
**Impact**: HIGH - Fixes production brand consistency issues
