# The 5-Invariants Pre-Flight & Post-Slice Checklist

Run this 60-second verification checklist before launching an autonomous coding session and before marking any PR ready for review.

---

## Part A: Pre-Flight Check (Before Any File Write)

- [ ] **Invariant 1 — 4-Fact Git Check Passed**
  ```bash
  pwd
  git rev-parse --show-toplevel
  git remote get-url origin
  git branch --show-current
  ```
  *Confirm you are on an isolated branch (`agent/<harness>/<scope>`) and NOT on `main` or `master`.*

- [ ] **Invariant 2 — `reality.md` Ground Truth Loaded**
  - Target repository path matches the Active Repositories table in `reality.md`.
  - Task aligns with the Current 30-Day Focus and does not touch frozen surfaces.

- [ ] **Invariant 3 — Money & External Systems Fail Closed**
  - Slice does not execute live Stripe/Gumroad charges, mutate production pricing without human gate, alter DNS, or send live customer emails/social posts.

- [ ] **Invariant 4 — Search & Filesystem Scope Bounded**
  - All `rg`, `grep`, `find`, or file-watcher commands target explicit project subdirectories (`src/`, `app/`, `lib/`), never `/`, `C:\`, or `$HOME`.

- [ ] **Invariant 5 — FinOps & Loop Ceilings Declared**
  - Maximum iterations (e.g., `<= 8`), failure circuit breaker (`<= 3` consecutive test failures), and session timeout (`<= 45m`) are active.

---

## Part B: Post-Slice Verification (Before Push / PR Ready)

- [ ] **Surgical Diff Audit**
  ```bash
  git status -sb
  git diff --stat
  ```
  *Zero unintended file deletions, zero `.env` or secret files staged, zero unrelated formatting churn.*

- [ ] **Secret Scan Clean**
  - Verified no hardcoded API keys (`sk-`, `ghp_`, `rk_live_`, `whsec_`) appear in `git diff`.

- [ ] **Automated Gates Green**
  - Typecheck passed (`pnpm typecheck` or `npx next typegen && tsc --noEmit`).
  - Unit / integration tests passed (`pnpm test` or `npx vitest run`) on all touched modules.

- [ ] **Independent Checker Pass (`Maker != Checker`)**
  - Consequential changes reviewed by an independent agent context or adversarial review pass against the acceptance criteria.

- [ ] **Handover Receipt Recorded**
  - Commit SHA, changed file list, verification output, and next pickup prompt logged for the next session.
