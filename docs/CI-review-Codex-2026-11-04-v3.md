# CI and security completion review, Codex, 4 November 2026, revision 3

Author: Codex. Created: 2026-11-04. Review state: final CI and independent review pending.
Revisions 1 and 2 remain preserved. Sources: current repository, PR #1162,
issue #1161, hosted CI receipts, Google upstream source/issue 184 and Vercel APIs.

## Confirmed dependency remediation

The Google design.md 0.4.0 registry package embeds vulnerable Zod 3 in both built
entry points. Overriding its manifest leaves the embedded implementation in use.
Removing the tool would discard the accepted lint/export commands. The selected
repair is a temporary, licensed source rebuild with a visible migration patch,
upstream source hash, exact Bun/pnpm versions, full upstream tests and declaration
typecheck. Both entry points now import external Zod 4.6.7. Every runtime dependency
remains declared, locked and visible to audit. No advisory is ignored or downgraded.

[Preparation run 41763398558](https://github.com/frankxai/frankx.ai-vercel-website/actions/runs/41763398558)
at `29c6478193188421d62c2216b9bc9b00b3c4f12b` built and tested the package:
345 upstream tests passed, zero failed, one existing optional Terrazzo integration
test skipped; declaration typecheck passed. Its preparation job succeeded. The
overall workflow failed because the old committed lockfile still had the high
advisory. That preparation is not the final candidate's verification.

Downloaded artifact 13291152681 contains only the package and generated lockfile.
Package SHA256: `0f1bceb282c3dbd227f29d97c2157826886f66d89e3abfe5dc38723010bb2d30`.
Lockfile SHA256: `3f6758266664543eb10f6aea6685e36f2b50e02bc1ad62b46f004aa6b2e3f39a`.
Upstream commit: `9bf8eae67128b6cc55ad9bf86665767deb4c11cd`.
The adjacent vendor README, patch, rebuild script and Apache license preserve
source provenance. Ordinary installs consume the committed integrity-locked
package. CI independently rebuilds it and compares bytes, then exercises the
installed CLI's lint/export and invalid/missing-input behavior. The temporary
preparation/artifact job has been removed.

## Merge authorization and production hold

Frank authorized qualifying merges with no production deployment. Vercel's project
API confirms `main` is the production branch. `vercel.json` disables Git deployments
of main while preserving feature previews; CI checks the exact branch policy.
Production remains deployment `dpl_8YitHAmrK913ufgehYjfz8veUnGV`, commit
`242df91b1f583a9791bdccba99126280c0510882` before this PR's merge. Recheck afterward.
Removing the hold requires a separately approved production release.

AgenticIncome PR #120 merged as `f38b5fadb1d6109ac1d58db5ab54c8f572c01722` after
194 passing tests, full CI/audit and independently authored Copilot approval.
Its production deployment remained unchanged after the merge.

## Review cost and remaining operations

Ready-for-review triggered the pre-existing Vercel Agent Review on AgenticIncome,
in addition to the explicitly requested Copilot review. Its exact-head check
126356386899 completed successfully with zero suggestions. No billing/settings
change or paid service was purchased. For FrankX, CodeRabbit automatic review is
paused on this PR to avoid overlapping general reviewers; the existing Vercel
Agent review will supply independent review after final CI. Source/security
guards remain enabled. Billing rates, quotas and global dashboard overlap remain
unverified; Frank can select one general reviewer in the dashboard separately.

The Impeccable detector returned zero findings for the actual changed
`app/ops/page.tsx`; the change preserves its markup. Revision 2 contains the real
production HTTP authorization/cache tests. This does not claim a new visual audit.
Historical credential alerts and manual branch-protection/security settings from
revisions 1/2 still require owner action. Shared hub ledger/session files remain
owned by another live lane and were preserved. Product issue #1161 holds receipts.
