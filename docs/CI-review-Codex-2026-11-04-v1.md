# FrankX CI and security review, Codex, 4 November 2026, v1

Author: Codex / OpenAI. Created: 2026-11-04. Revision: 1.
Review state: draft; source-level regression tests passed, candidate CI and independent provider review pending.
Source: `frankxai/frankx.ai-vercel-website`, main `242df91b1f583a9791bdccba99126280c0510882`.
Instructions read: root AGENTS.md, SHA-256 `583C7DF2A00769DEFBE4052ABFFCA456C348A5170B59304421C75781190CCB64`; installed Next.js headers/notFound documentation. No deeper instruction scope governs these files.
Lane: `agent/codex/ci-security-20261104`, isolated sparse worktree; primary checkout preserved.
Tracking issue: [1161](https://github.com/frankxai/frankx.ai-vercel-website/issues/1161); related private-operator issue [768](https://github.com/frankxai/frankx.ai-vercel-website/issues/768). At 00:55 UTC another preflight still held builds: 4,726 MB free versus 8,192 MB required.

## Configured and missing

| Area | Observed on main | Remaining gap |
| --- | --- | --- |
| Install | packageManager pnpm 10.28.0; committed pnpm-lock.yaml; frozen install; Node 22 | No lockfile replacement needed. |
| CI | Read-only CI runs type-check, lint, language refusal, build and numerous contract/runtime/browser checks; Merge Gate covers the additional contracts/content/links | Full jobs intentionally skip drafts; a skipped job is not successful execution. |
| Security | Override guard protects 29 pins; estate-guard source scanner; monthly grouped Dependabot; public secret scanning | No root dependency-audit job; code-scanning endpoint returns no analysis (404). Root audit misses standalone template manifests. |
| Protection | Strict CI, Contract Guard, Media Guard, Merge Gate, design-contract / design-contract, Vercel, Surface Guard, Review Gate; admins enforced; stale approvals dismissed | Zero mandatory approvals. Neither Dependency audit nor estate-guard is required. |
| Permissions | Default workflow token read; CI read-only; checkout credential persistence disabled | Repository allows Actions to approve PR reviews; assess disabling that permission. |
| Reviews | CodeRabbit automatic review enabled for main, drafts excluded, chat auto-reply off; Codex and Copilot reviews observed | Billing and actual CodeRabbit/Vercel Agent enablement cannot be inferred from config or comments alone. |

The active ruleset named "Copilot review for default branch" contains PR/deletion/non-fast-forward rules and zero required approving reviews. Its name does not prove a mandatory independent AI review.

## Confirmed high-priority source fix

Current main app/ops/page.tsx fetched GitHub PRs/issues, including a private repository, and Vercel deployments with server credentials before checking the visitor. This confirms the substance of the private-telemetry finding on open PR 1067 against current main, rather than accepting its old AI comment on trust. Exposure depends on configured server tokens; live token configuration and exploitability were not probed.

This branch checks x-admin-secret using the existing timing-safe verifier before any telemetry request. Missing configuration, missing/wrong header or a provider token presented as the admin credential ends rendering through notFound. The page is request-time only and both provider fetches use no-store. The admin header is never forwarded to either provider. There is no new login/session system, query-string secret, client-side secret or dashboard setting. Existing server-to-server/admin requests must supply the configured header; ordinary navigation is denied.

Six focused tests execute the actual transpiled page and verifier with mocked framework rendering/headers and outbound HTTP. All six fail against the original source; all six pass with this change. Five denied paths make zero provider requests. The authorized path makes seven mocked requests and checks no-store and absence of the admin value in outbound options. These tests do not establish a rendered Next.js response or production behavior. Existing TypeScript from the primary checkout was used only as the local test compiler, without installing or assuming the app dependency tree.

## CI change

Add Dependency audit to existing ci.yml, including drafts, with pinned actions, contents:read, no persisted credentials, no dependency install, no scripts, no secret inputs or report uploads and a five-minute timeout. pnpm audit --audit-level high fails on high/critical advisories and registry errors. No ignored advisories or continue-on-error. Existing CI and Merge Gate commands/check names are preserved. The ops regression runs in the existing CI job after type-check.

Alternative considered: another paid reviewer/security workflow or forced dependency overrides to clear audit. Existing source/review gates remain; the missing lockfile check is added directly. Forcing a Zod major across incompatible consumers or suppressing unpatched findings would not validate the repair.

## Dependency findings, current root lockfile

Verified with manifest-selected pnpm 10.28.0 via corepack: audit exit 1; 4 high, 7 moderate, 2 low, 0 critical.

| Advisory | Current dependency path | Disposition |
| --- | --- | --- |
| GHSA-jmr9-qjv8-65gv | puppeteer -> @puppeteer/browsers -> extract-zip 2.0.1 | Confirmed affected dependency. No patched extract-zip release. Replace/upgrade the upstream browser installer with browser-journey verification; do not disable existing journeys. |
| GHSA-7pqw-9j4j-h8q3 | Same extract-zip dependency | Separate advisory, same affected path; remains open. |
| GHSA-c475-qrg2-pj4r | puppeteer -> browsers -> proxy-agent -> get-uri -> basic-ftp 5.3.1 | Patched floor 6.2.1 requires a cross-major upstream/override compatibility check. No untested forced override. |
| GHSA-mrhx-c7xc-m3w5 | @google/design.md 0.4.0 -> zod 3.25.76 | Latest design.md still requires Zod 3; patched floor is 4.6.6. Needs supported upstream migration or tested consumer replacement. |

These are affected packages, not a claim that every advisory is remotely reachable through the website. No attacker-controlled archive or FTP listing was processed. The new audit is expected to remain red until repaired; it was not weakened to make this branch green.

GitHub Dependabot returned 12 open alerts: 3 high Zod alerts (206-208), 6 medium and 3 low. The three highs refer to standalone templates/agent-payments-guard, templates/mcp-server-kit and templates/swarm-governance-starter, each declaring ^3.25.0 with no committed child lockfile. Confirmed against current manifests. Root zod@4 override does not cover these separate installers. Swarm code uses the Zod-3 single-argument record API, so a manifest-only major bump would break it. Their migration, reproducible child installs and tests remain open. No unsafe major bump was applied.

## Secret alerts

Four open public GitHub alerts were inspected without printing any credential values. Alerts 1-2 reference historical Google API keys. Their reported values are absent from the corresponding current script/report paths; several old scripts are deleted. Alerts 3-4 reference historical generated reading HTML now absent from the tree. Alert 4 matches a placeholder pattern; that alone does not authorize dismissal. Validity is unknown for all four.

Credential owner must verify revocation/rotation and resolve the historical alerts after review. No key was tested against a provider, rotated, copied into artifacts or dismissed, and no history was rewritten. Current-source cleanup does not establish historical revocation. This audit is not a full historical secret scan.

The vendored estate scanner currently includes a short prefix as SEC001 evidence. Its upstream owner should replace that with complete redaction before relying on exported findings as secret-free artifacts. This branch adds no scanner report upload and does not modify the shared vendor scanner or suppress its checks.

## Checks and existing failures

- Ops regression: 6/6 passed; baseline source fails 6/6. Governance: 41/41 passed. All workflow YAML parsed; new audit structure/least privilege checked; git diff --check passed before PR preparation.
- pnpm override guard: 29 declarations and lockfile pins passed. merge:gate coverage: 40 steps covered, two existing exemptions. Sparse checkout cannot establish full deployed-import path coverage; the path checker returned zero imported directories, so that result is not full-tree verification.
- Web Interface Guidelines detector: app/ops/page.tsx passed, zero errors/warnings. Markup, focus controls, touch behavior and animations were unchanged; no browser, motion, accessibility or visual verification is claimed.
- Installed Impeccable 4.7.0 detector completed for app/ops/page.tsx, exit 0 with no reported findings. It used regex matching only; parsed-element contrast/tiny-text rules did not run. This is source coverage only.
- Local installs, full lint/type-check/tests and production build were blocked by machine admission: 5,446 MB free, 8,192 MB required. Only small tests/text edits ran. The documented storage sensor script is missing in the current config checkout; fresh disk reading exceeded both hard floors.
- Baseline main CI [41645577155](https://github.com/frankxai/frankx.ai-vercel-website/actions/runs/41645577155) succeeded at the source SHA above. This does not prove candidate checks or resolve the audit findings.
- PR 1144 major dependency group fails Merge Gate and Review Gate; its React-pdf/React-18 compatibility finding remains with that branch. PR 1142 action bump and 1155 legal-entity text fail Surface Guard. No governance approval labels were self-applied.

## Existing PR triage and cost controls

46 PRs were open before this branch's PR; see the [current inventory](https://github.com/frankxai/frankx.ai-vercel-website/pulls). Relevant owners: [1138](https://github.com/frankxai/frankx.ai-vercel-website/pull/1138) glob update, [1125](https://github.com/frankxai/frankx.ai-vercel-website/pull/1125) override floors, [1144](https://github.com/frankxai/frankx.ai-vercel-website/pull/1144) major group, [1142](https://github.com/frankxai/frankx.ai-vercel-website/pull/1142) action update, [1157](https://github.com/frankxai/frankx.ai-vercel-website/pull/1157) review evidence, [1067](https://github.com/frankxai/frankx.ai-vercel-website/pull/1067) product/ops findings, [1148](https://github.com/frankxai/frankx.ai-vercel-website/pull/1148) cost snapshot. No existing branch was rewritten or merged.

Unresolved threads were inventoried across open PRs, including 1018/1120 capture, 1028 evidence/pricing and 1067 commerce/private-telemetry findings. Only the confirmed current-main /ops security boundary is fixed here; other product and editorial findings remain open. A review badge alone was not used as proof of a source defect.

CodeRabbit config overlaps the observed Codex/Copilot review roles; its active installation/subscription status is unverified. No automatic AI workflow or reviewer was added or invoked. Existing CI/merge-gate overlap includes small noopener and ship-guide tests; do not alter the required coverage contract solely to save those few seconds. Concurrency, draft skips, grouped monthly Dependabot and existing artifact retention remain unchanged. The new audit has no artifact retention cost or model charge, but uses normal hosted Actions time.

Vercel project frankx-ai-vercel-website, Node 22 and preview protection were inspected. No native-CI invocations were returned for this repository in the inspected API query. Vercel Agent review findings, billing and dashboard enablement remain unverified; no review/billing/deployment setting changed.

## Manual steps and handoff

Keep this PR draft until full candidate CI/build, rendered denial/authorized-route verification and independent exact-head review are available. Configure ADMIN_SECRET through the existing secret-management process if admin access is required; leave it unset to deny everyone. Never put it in URLs, reports or browser storage.

After remediation and successful candidate checks, add Dependency audit and estate-guard to required main checks without removing current protections. Assess turning off Actions approval permission. Review Copilot/CodeRabbit/Vercel automatic-review coverage and choose paid-review scope in their dashboards. No subscription or Vercel setting changes are authorized by this patch.

Skills: Humanizer read/applied; Vercel Agent/deployments-cicd read/applied to audit and scope. Emil read; no interaction/motion design applied or verified. Impeccable detector selected for the changed TSX file; record its result separately from rendered/browser verification. Independent provider review remains pending.

Sources: GitHub repository/protection/ruleset/Actions/security/PR-review APIs inspected 2026-11-04; authenticated Vercel project/native-CI APIs; [pnpm audit](https://pnpm.io/cli/audit), [Zod advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5), [extract-zip advisory](https://github.com/advisories/GHSA-jmr9-qjv8-65gv), npm registry package metadata, installed Next.js docs and [headers](https://nextjs.org/docs/app/api-reference/functions/headers)/[notFound](https://nextjs.org/docs/app/api-reference/functions/not-found).

Estate record belongs in frankxai/agentic-ops-hub. Its session, OPS-LEDGER and NEXT-PROMPTS files have a live foreign lane, so the required append/refresh is blocked until that owner releases them. Preserve the existing product issue and link this PR/report there.
