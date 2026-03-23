# Branch Strategy & CI/CD Guide

## Branch Structure

```
main (production)
  │
  ├── staging (pre-production testing)
  │     └── Vercel Preview: staging-frankx-ai.vercel.app
  │
  └── feature/* (short-lived feature branches)
        └── Vercel Preview: auto-generated per PR
```

## Branches

| Branch | Purpose | Deploys To | Protection |
|--------|---------|------------|------------|
| `main` | Production | frankx.ai | Required reviews, CI must pass |
| `staging` | Pre-production testing | staging preview URL | CI must pass |
| `feature/*` | Active development | PR preview URLs | None |

## Workflow

### Daily Development
1. Create feature branch from `main`:
   ```bash
   git checkout main && git pull
   git checkout -b feature/my-feature
   ```

2. Work on feature, commit regularly

3. Push and create PR to `staging`:
   ```bash
   git push -u origin feature/my-feature
   # Create PR to staging for testing
   ```

4. Test on staging preview URL

5. When approved, merge PR to `main` for production deploy

### Quick Fixes
For urgent production fixes:
```bash
git checkout main && git pull
git checkout -b hotfix/fix-description
# Make fix
git push -u origin hotfix/fix-description
# Create PR directly to main
```

## CI/CD Pipeline

### GitHub Actions (`.github/workflows/ci.yml`)

| Job | Runs On | Purpose |
|-----|---------|---------|
| `typecheck` | Push/PR to main, staging | TypeScript validation |
| `lint` | Push/PR to main, staging | Code style enforcement |
| `build` | After typecheck + lint | Ensures project builds |

### Vercel Integration

Vercel automatically:
- Deploys `main` → Production (frankx.ai)
- Deploys `staging` → Preview (staging-*.vercel.app)
- Creates unique preview for each PR

## Best Practices

### Commit Messages
```
type: description

Types: feat, fix, docs, style, refactor, perf, test, chore
```

Examples:
- `feat: Add PDF generation for lead magnets`
- `fix: Resolve MDX placeholder rendering`
- `docs: Update branch strategy guide`

### Before Merging to Main
1. Ensure CI passes (green checkmark)
2. Test on staging preview URL
3. Get PR review if touching core features
4. Squash commits if many small changes

### Branch Cleanup
Delete feature branches after merge:
```bash
# Local
git branch -d feature/my-feature

# Remote (usually automatic via GitHub PR settings)
git push origin --delete feature/my-feature
```

## Vercel Configuration

The `vercel.json` includes:
- Clean URLs (no `.html` extensions)
- Security headers (X-Frame-Options, etc.)
- Next.js framework detection

## Environment Variables

Production secrets are managed in:
- Vercel Dashboard → Settings → Environment Variables
- Separate values for Production, Preview, Development
