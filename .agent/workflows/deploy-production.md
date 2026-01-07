---
description: Deploy the FrankX website to Vercel after running quality checks.
---

1. **Run Linting**: `npm run lint` in `FrankX.AI - Vercel Website`.
   - If fails, **STOP** and report errors.
2. **Run Type Check**: `npm run type-check` (if script exists) or `npx tsc --noEmit`.
   - If fails, **STOP**.
3. **Build Check**: `npm run build`.
   - If fails, **STOP**.
4. **Git Status**: Check if there are uncommitted changes.
   - If yes, ask user to commit or stash.
5. **Push**: `git push origin main`.
6. **Notify**: "Deployment triggered. Check Vercel dashboard."
