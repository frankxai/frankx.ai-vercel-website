# frankx.ai Marketing Site

Next.js 15 marketing site for FrankX � conscious AI systems for creators, families, and professionals. This repository powers the public landing pages, micro-funnels, and resource hubs that deploy to Vercel.

## Tech Stack
- Next.js 15 with the App Router
- TypeScript + Tailwind CSS for styling
- MDX/Markdown for long-form content
- Vercel for hosting and analytics integrations

## Local Development
```bash
# install dependencies
npm install

# start local dev server
npm run dev

# run quality checks
npm run lint
npm run type-check
npm run build
```

Environment variables (analytics, APIs) live in `.env.local` � copy from `.env.local.example` when needed. Do not commit secrets.

## Testing & Verification

**Smoke Tests (Recommended):**
```bash
# Test local dev server
npm run test:smoke

# Test production site
npm run test:smoke:prod
```

Smoke tests verify critical paths using curl:
- Homepage loads (HTTP 200)
- Links page loads and displays correctly
- Social links match BRAND_IDENTITY.md
- Key content is present

**Full E2E Tests (Optional):**
```bash
# Requires system dependencies first:
# sudo npx playwright install-deps chromium

# Run comprehensive browser tests
npm run test:e2e

# Interactive test runner
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug
```

E2E tests provide deeper validation:
- Navigation flows work correctly
- Forms and interactive elements function
- Mobile responsiveness
- Console error detection
- Performance metrics

**Deployment Verification Loop:**
```bash
# In Claude Code, use:
/verify-deploy
```

This runs smoke tests, deploys to production, and verifies the live site automatically. See `.claude/commands/verify-deploy.md` for details.

## Content Structure
- `app/` � route files for landing pages and micro funnels
- `components/` � shared UI building blocks
- `content/` � blog and guide MDX/Markdown sources
- `lib/` � utility helpers for content loading
- `public/` � static assets (favicon, templates, sitemap)
- `scripts/` � static generation helpers (feeds, search, HTML exports)

## Deployment
Push to `main` to trigger the Vercel production deployment. Preview branches deploy automatically via Vercel previews. Update `DEPLOYMENT.md` if rollout steps change.

## Contribution Workflow
1. Branch from `main`: `git checkout -b codex/YYYY-MM-DD-feature`
2. Make changes and keep commits focused
3. Run quality checks before opening a PR:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   npm run test:smoke  # Verify critical paths
   ```
4. Provide release notes covering copy, components, analytics impacts
5. Merge to `main` once approved; Vercel will deploy automatically
6. Verify production deployment: `npm run test:smoke:prod`

## License
Copyright � FrankX. All rights reserved.
