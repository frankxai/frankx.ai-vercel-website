# FrankX.ai Deployment & Environment Strategy
*Production-Ready Setup for frankx.ai Domain with Development Workflow*

## Overview

This document outlines the complete deployment strategy for FrankX.ai, including:
- Domain configuration (frankx.ai)
- Git branching strategy
- Environment management (dev/staging/production)
- CI/CD pipeline with Vercel
- Testing and rollback procedures

---

## 1. Domain Setup: frankx.ai

### Current State
- **Active URL:** https://frankx-ai-vercel-website.vercel.app/
- **Target Domain:** frankx.ai
- **DNS Provider:** (To be configured)

### Vercel Domain Configuration Steps

#### Step 1: Purchase/Transfer Domain
1. **Recommended Registrar:** Vercel Domains, Namecheap, or Cloudflare
2. **Cost:** ~$10-15/year for .ai domain
3. **Action:** Purchase frankx.ai if not already owned

#### Step 2: Add Domain to Vercel Project
```bash
# Via Vercel CLI
vercel domains add frankx.ai

# Or via Vercel Dashboard:
# 1. Go to Project Settings → Domains
# 2. Click "Add Domain"
# 3. Enter: frankx.ai
# 4. Vercel will provide DNS records
```

#### Step 3: Configure DNS Records

**If using External DNS Provider (Namecheap, Cloudflare):**
```
Type: A Record
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**If using Vercel DNS (Recommended):**
- Update nameservers at registrar to:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`
- Vercel handles all DNS automatically

#### Step 4: Configure Redirects
```javascript
// vercel.json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.frankx.ai"
        }
      ],
      "destination": "https://frankx.ai/:path*",
      "permanent": true
    },
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "frankx-ai-vercel-website.vercel.app"
        }
      ],
      "destination": "https://frankx.ai/:path*",
      "permanent": true
    }
  ]
}
```

#### Step 5: SSL Certificate
- **Automatic:** Vercel provisions SSL via Let's Encrypt
- **Propagation:** 24-48 hours for full DNS propagation
- **Verification:** Check https://frankx.ai shows green padlock

---

## 2. Git Branching Strategy

### Branch Structure

```
main (production)
├── staging (pre-production testing)
└── develop (active development)
    ├── feature/homepage-redesign
    ├── feature/assessment-flow
    ├── feature/notion-cms
    └── hotfix/critical-bug
```

### Branch Purposes

#### `main` - Production Branch
- **Purpose:** Live production code at frankx.ai
- **Protection:** Requires pull request + approval
- **Deploys to:** https://frankx.ai
- **Auto-deploy:** Yes, on merge
- **Rollback:** Available via Vercel dashboard

**Rules:**
- No direct commits
- Requires 1 approval (you can self-approve as solo dev)
- All tests must pass
- Must be up-to-date with staging

#### `staging` - Pre-Production Branch
- **Purpose:** Final testing before production
- **Deploys to:** https://staging.frankx.ai (or staging-frankx.vercel.app)
- **Auto-deploy:** Yes
- **Testing:** Full QA, stakeholder review
- **Lifetime:** Permanent branch

**Rules:**
- Merge from develop after feature completion
- Test all features in production-like environment
- Validate analytics, forms, integrations
- Approve before merging to main

#### `develop` - Development Branch
- **Purpose:** Integration branch for active work
- **Deploys to:** https://dev.frankx.ai (or dev-frankx.vercel.app)
- **Auto-deploy:** Yes
- **Testing:** Unit tests, basic functionality
- **Lifetime:** Permanent branch

**Rules:**
- Default branch for feature merges
- Continuous integration
- May have breaking changes
- Not guaranteed stable

#### `feature/*` - Feature Branches
- **Naming:** `feature/short-description`
- **Examples:**
  - `feature/homepage-redesign`
  - `feature/vibe-os-landing`
  - `feature/notion-cms-integration`
- **Deploy:** Optional preview URLs
- **Lifetime:** Delete after merge to develop

**Workflow:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/homepage-redesign
# ... work on feature ...
git push origin feature/homepage-redesign
# Create PR to develop
# After merge: git branch -d feature/homepage-redesign
```

#### `hotfix/*` - Emergency Fixes
- **Naming:** `hotfix/critical-issue-description`
- **Branch from:** main
- **Merge to:** main AND develop
- **Deploy:** Immediately after testing

**Workflow:**
```bash
git checkout main
git pull origin main
git checkout -b hotfix/broken-checkout
# ... fix critical bug ...
git push origin hotfix/broken-checkout
# Create PR to main (fast-track)
# After merge to main, also merge to develop
git checkout develop
git merge hotfix/broken-checkout
```

---

## 3. Environment Configuration

### Three-Tier Environment Setup

| Environment | Branch | URL | Purpose | Auto-Deploy |
|-------------|--------|-----|---------|-------------|
| **Production** | main | frankx.ai | Live users | Yes |
| **Staging** | staging | staging.frankx.ai | Pre-release QA | Yes |
| **Development** | develop | dev.frankx.ai | Active dev work | Yes |

### Environment Variables

Create separate `.env` files for each environment:

#### `.env.production` (Vercel Production Environment)
```bash
# Site
NEXT_PUBLIC_SITE_URL=https://frankx.ai
NEXT_PUBLIC_VERCEL_ENV=production

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=frankx.ai
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Notion CMS
NOTION_API_KEY=secret_prod_xxxxxxxxxxxxxx
NOTION_BLOG_DB_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Email
SENDGRID_API_KEY=SG.prod_xxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=hello@frankx.ai

# Features
NEXT_PUBLIC_ENABLE_NOTION_CMS=true
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false
```

#### `.env.staging` (Vercel Staging Environment)
```bash
NEXT_PUBLIC_SITE_URL=https://staging.frankx.ai
NEXT_PUBLIC_VERCEL_ENV=staging
NEXT_PUBLIC_ENABLE_NOTION_CMS=true
NEXT_PUBLIC_ENABLE_BETA_FEATURES=true
# Use staging Notion workspace or same with different DB
NOTION_API_KEY=secret_staging_xxxxxxxxxxxxxx
SENDGRID_API_KEY=SG.staging_xxxxxxxxxxxxxxxxxx
```

#### `.env.development` (Vercel Dev Environment)
```bash
NEXT_PUBLIC_SITE_URL=https://dev.frankx.ai
NEXT_PUBLIC_VERCEL_ENV=development
NEXT_PUBLIC_ENABLE_NOTION_CMS=false  # Use MDX for faster builds
NEXT_PUBLIC_ENABLE_BETA_FEATURES=true
# Dev keys
NOTION_API_KEY=secret_dev_xxxxxxxxxxxxxx
SENDGRID_API_KEY=SG.dev_xxxxxxxxxxxxxxxxxx
```

#### `.env.local` (Local Development)
```bash
# Never commit this file (.gitignore it)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_VERCEL_ENV=local
NOTION_API_KEY=secret_xxxxxxxxxxxxxx
SENDGRID_API_KEY=SG.test_xxxxxxxxxxxxxxxxxx
```

### Setting Environment Variables in Vercel

**Via Vercel Dashboard:**
1. Project Settings → Environment Variables
2. Add each variable
3. Select environments: Production, Preview (Staging), Development

**Via Vercel CLI:**
```bash
# Production
vercel env add NOTION_API_KEY production
# Enter value when prompted

# Staging (Preview)
vercel env add NOTION_API_KEY preview

# Development
vercel env add NOTION_API_KEY development
```

---

## 4. Vercel Project Configuration

### Connect Git Repository

```bash
# If not already connected
vercel link

# Follow prompts:
# - Scope: Your account
# - Link to existing project? Yes
# - Project name: frankx-ai
```

### Branch Deployment Settings

**Vercel Dashboard → Settings → Git:**

1. **Production Branch:** `main`
   - ✅ Auto-deploy on push
   - ✅ Use production environment variables
   - Domain: frankx.ai

2. **Preview Branches:**
   - `staging` → staging.frankx.ai (or custom domain)
   - `develop` → dev.frankx.ai (or auto-generated)
   - All feature branches → auto-generated URLs

3. **Ignored Build Step** (optional for feature branches):
```javascript
// vercel.json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "staging": true,
      "develop": true,
      "feature/*": true  // Set false to disable auto-preview for all features
    }
  }
}
```

---

## 5. CI/CD Pipeline

### Automated Workflow

```mermaid
Feature Branch → Develop → Staging → Main (Production)
     ↓             ↓          ↓           ↓
  Preview      Dev URL   Staging URL  frankx.ai
```

### Pipeline Steps (Automated by Vercel)

#### On Every Push:

1. **Build Phase**
   ```bash
   npm install
   npm run prebuild  # Your custom scripts
   npm run build
   ```

2. **Tests** (configure in package.json)
   ```bash
   npm run type-check
   npm run lint
   # npm run test (if you add tests)
   ```

3. **Deploy**
   - Generate preview URL
   - Run deployment
   - Update environment

4. **Notifications**
   - GitHub commit status
   - Vercel dashboard
   - Optional: Slack/Discord webhook

### Manual Approval Gate for Production

**Option 1: GitHub Branch Protection** (Recommended)
```bash
# GitHub Settings → Branches → Add rule for 'main'
# ✅ Require pull request reviews before merging
# ✅ Require status checks to pass
# ✅ Require branches to be up to date
```

**Option 2: Vercel Manual Promotion**
- Disable auto-deploy for main
- Manually promote staging deployments to production

---

## 6. Deployment Workflow Examples

### Scenario 1: New Feature Development

```bash
# 1. Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/new-assessment-flow

# 2. Develop and test locally
npm run dev
# ... make changes ...

# 3. Commit and push
git add .
git commit -m "feat: implement new assessment flow with progressive disclosure"
git push origin feature/new-assessment-flow

# 4. Vercel auto-deploys preview
# Opens: https://frankx-ai-git-feature-new-assessment-flow-frank.vercel.app

# 5. Create PR to develop on GitHub
gh pr create --base develop --title "New Assessment Flow"

# 6. Review, approve, merge to develop
# Vercel auto-deploys to dev.frankx.ai

# 7. Test on dev environment
# Visit: https://dev.frankx.ai

# 8. When ready for staging, create PR from develop to staging
git checkout staging
git pull origin staging
git merge develop
git push origin staging

# 9. Vercel auto-deploys to staging.frankx.ai
# Full QA testing here

# 10. After QA approval, merge staging to main
git checkout main
git pull origin main
git merge staging
git push origin main

# 11. Vercel auto-deploys to production (frankx.ai)
# Monitor analytics and error tracking
```

### Scenario 2: Hotfix for Production Bug

```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/checkout-button-broken

# 2. Fix the critical issue
# ... make minimal, targeted changes ...

# 3. Test locally
npm run build
npm start  # Test production build

# 4. Commit and push
git add .
git commit -m "fix: restore checkout button click handler"
git push origin hotfix/checkout-button-broken

# 5. Create PR to main (emergency fast-track)
gh pr create --base main --title "HOTFIX: Checkout button not working"

# 6. Self-approve and merge immediately
# Vercel auto-deploys to frankx.ai

# 7. Also merge to develop and staging to keep in sync
git checkout develop
git merge hotfix/checkout-button-broken
git push origin develop

git checkout staging
git merge hotfix/checkout-button-broken
git push origin staging

# 8. Delete hotfix branch
git branch -d hotfix/checkout-button-broken
git push origin --delete hotfix/checkout-button-broken
```

### Scenario 3: Content Update (via Notion CMS)

```bash
# No Git workflow needed!

# 1. Edit content in Notion
# 2. Trigger revalidation webhook (optional)
curl -X POST https://frankx.ai/api/revalidate?secret=YOUR_SECRET&slug=blog-post

# 3. Or wait for ISR (10-minute cache)
# Content updates automatically on next page visit
```

---

## 7. Testing Strategy Per Environment

### Local Development
- **Tools:** Jest, React Testing Library (if added)
- **Tests:** Unit tests, component tests
- **Run:** `npm run test`

### Development Environment (dev.frankx.ai)
- **Purpose:** Integration testing
- **Tests:**
  - Feature functionality
  - API integrations
  - Basic user flows
- **Checks:** Manual QA, automated smoke tests

### Staging Environment (staging.frankx.ai)
- **Purpose:** Pre-production validation
- **Tests:**
  - Full user journey testing
  - Cross-browser compatibility
  - Mobile responsiveness
  - Performance testing (Lighthouse)
  - SEO validation
  - Forms and integrations (with test keys)
  - Analytics tracking
- **Approval:** Required before production

### Production Environment (frankx.ai)
- **Monitoring:**
  - Vercel Analytics
  - Error tracking (Sentry, optional)
  - Uptime monitoring
  - User behavior (Plausible/GA4)
- **Rollback:** Available if issues detected

---

## 8. Rollback Procedures

### Quick Rollback (Vercel Dashboard)

1. Go to Vercel Dashboard → Deployments
2. Find last known good deployment
3. Click "..." → Promote to Production
4. Confirm promotion
5. Previous deployment instantly becomes live

**Timeline:** < 1 minute

### Git Rollback (For Major Issues)

```bash
# Option 1: Revert the merge commit
git checkout main
git revert HEAD~1  # Reverts last merge
git push origin main
# Vercel auto-deploys reverted code

# Option 2: Reset to previous commit (dangerous)
git checkout main
git reset --hard HEAD~1
git push --force origin main  # ⚠️ Use with caution
```

### Rollback Checklist

- [ ] Identify deployment causing issue
- [ ] Confirm impact (% of users affected)
- [ ] Choose rollback method (Vercel UI vs. Git)
- [ ] Execute rollback
- [ ] Verify site functionality
- [ ] Notify stakeholders (if applicable)
- [ ] Create postmortem
- [ ] Fix issue in feature branch
- [ ] Redeploy proper fix through normal pipeline

---

## 9. Monitoring and Alerting

### Vercel Built-in Monitoring

**Speed Insights** (included in Pro plan)
- Real user metrics (RUM)
- Core Web Vitals
- Performance score

**Deployment Notifications**
```javascript
// vercel.json
{
  "github": {
    "enabled": true,
    "autoAlias": true
  }
}
```

### Recommended Additional Tools

1. **Uptime Monitoring:** UptimeRobot (free)
   - Monitor: frankx.ai
   - Interval: 5 minutes
   - Alert: Email/SMS on downtime

2. **Error Tracking:** Sentry (optional)
   ```bash
   npm install @sentry/nextjs
   # Configure in next.config.js
   ```

3. **Analytics:**
   - Plausible (privacy-friendly, $9/mo)
   - Google Analytics 4 (free)

4. **Performance:**
   - Lighthouse CI (automated)
   - WebPageTest (manual checks)

---

## 10. Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local` (already in .gitignore)
- ✅ Use Vercel's encrypted environment variables
- ✅ Rotate API keys quarterly
- ✅ Use different keys per environment

### API Routes Protection
```typescript
// app/api/admin/route.ts
import { headers } from 'next/headers'

export async function POST(request: Request) {
  // Verify secret token
  const headersList = headers()
  const token = headersList.get('authorization')

  if (token !== process.env.ADMIN_SECRET_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }

  // ... protected logic
}
```

### Content Security Policy
```javascript
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' plausible.io;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' plausible.io;
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ]
  }
}
```

---

## 11. Cost Estimation

### Vercel Hosting
- **Free Plan:** ✅ Sufficient for start
  - 100GB bandwidth/month
  - Unlimited deployments
  - Automatic HTTPS
  - Global CDN
- **Pro Plan ($20/mo):** Upgrade when needed
  - 1TB bandwidth
  - Advanced analytics
  - Team collaboration
  - Priority support

### Domain
- **frankx.ai:** ~$10-15/year (one-time annual)

### Optional Services
- Plausible Analytics: $9/mo (optional, can use free Google Analytics)
- Notion Plus: $10/mo (only if >100 pages in Notion CMS)
- UptimeRobot: Free (up to 50 monitors)

**Total Monthly Cost:**
- Minimum: $0 (Vercel Free + Google Analytics)
- Recommended: $0-20 (Vercel Free/Pro)
- With all extras: ~$40/mo

---

## 12. Initial Setup Checklist

### Pre-Launch (Now)

- [ ] Purchase frankx.ai domain (if not owned)
- [ ] Add domain to Vercel project
- [ ] Configure DNS records
- [ ] Set up branch protection rules on GitHub
- [ ] Create `staging` and `develop` branches
- [ ] Configure environment variables in Vercel
- [ ] Set up environment-specific `.env` files
- [ ] Test deployment pipeline (push to develop)
- [ ] Verify preview URLs work
- [ ] Configure `vercel.json` redirects

### Launch Day

- [ ] Final QA on staging.frankx.ai
- [ ] Merge staging → main
- [ ] Verify frankx.ai loads correctly
- [ ] Test SSL certificate (green padlock)
- [ ] Check all pages render properly
- [ ] Test forms and API routes
- [ ] Verify analytics tracking
- [ ] Set up uptime monitoring
- [ ] Create rollback plan
- [ ] Monitor for first 24 hours

### Post-Launch (Week 1)

- [ ] Monitor Vercel Analytics
- [ ] Check error logs
- [ ] Gather user feedback
- [ ] Optimize performance based on real data
- [ ] Document any issues and fixes
- [ ] Create knowledge base for common tasks

---

## 13. Quick Reference Commands

### Git Workflow
```bash
# Start new feature
git checkout develop && git pull && git checkout -b feature/name

# Push and create PR
git push origin feature/name && gh pr create --base develop

# Merge to staging for QA
git checkout staging && git pull && git merge develop && git push

# Deploy to production
git checkout main && git pull && git merge staging && git push
```

### Vercel CLI
```bash
# Link project
vercel link

# Deploy current branch
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Promote deployment to production
vercel promote [deployment-url]
```

### Local Development
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Test production build
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

---

## Summary

This deployment strategy provides:

✅ **Clear separation** of environments (dev/staging/production)
✅ **Automated CI/CD** with Vercel integration
✅ **Safe deployment** process with testing gates
✅ **Quick rollback** capability for emergencies
✅ **Scalable architecture** as your site grows
✅ **Cost-effective** setup starting at $0/month

**Next Steps:**
1. Review this strategy
2. Purchase frankx.ai domain
3. Configure Vercel project with branches
4. Set environment variables
5. Test deployment pipeline
6. Launch to production

Your site will be production-ready with professional DevOps practices in place.
