# FrankX CI completion review, Codex, 4 November 2026, v2

Author: Codex / OpenAI. Created: 2026-11-04. Revision: 2; v1 retained.
Review state: implementation and hosted verification in progress.
Source: PR 1162, starting head 585cef502b5b7170fa18cb318d1359c2b8ac09ce; issue 1161.
Root AGENTS.md read, SHA-256 583C7DF2A00769DEFBE4052ABFFCA456C348A5170B59304421C75781190CCB64.

The remaining repair moves Puppeteer to 25.16.0 and Mermaid CLI to its compatible 12.0.0 release. Puppeteer's maintained browser installer replaces the vulnerable extract-zip/basic-ftp dependency paths. Existing browser journeys remain required. Lifecycle scripts remain denied, including the new exact Puppeteer version; browsers are still installed explicitly in CI.

Preparation run 41753565510 rejected Mermaid CLI 12.2.0 because it was younger than the existing three-day supply-chain cooldown. The candidate now selects mature 12.0.0, which declares Puppeteer 25 support. The cooldown was preserved; no release-age exemption was added.

Three template manifests move from Zod 3 to patched Zod 4.6.7. Both single-argument record schemas in the governance starter gain explicit string-key schemas. The templates join the existing pnpm workspace so one committed lockfile can reproduce all four installations and the dependency audit can include them. CI runs both existing template test suites and the MCP template build.

An opt-in ci:verify label lets an authorized maintainer run existing CI and Merge Gate on a draft when a synchronize or re-run event occurs. Normal drafts still skip those heavy jobs. This avoids marking an unfinished security PR ready and avoids triggering AI reviewers that exclude drafts. No trigger, required check, source gate, timeout or token permission is removed.

Local build admission at 01:12 UTC was HOLD: 2,474 MB free versus 8,192 MB required. No local install or heavy build runs under that hold. A temporary, read-only job inside existing ci.yml prepares only pnpm-lock.yaml with scripts disabled on a GitHub-hosted runner. Its artifact is bound to the candidate head, retained one day, downloaded and inspected before commit. The helper job is removed after the lockfile is retrieved. Its success is not security or install verification; frozen installs and tests must run again against the committed result.

The Google design CLI remains an upstream blocker. Published 0.4.0 and current upstream main still require Zod 3, and the npm CLI/linter artifacts embed Zod 3 code. A dependency override alone would hide the declared path while leaving the embedded implementation unchanged. No override or suppression is added. Existing upstream issue: https://github.com/google-labs-code/design.md/issues/184 . Actual exploitability through local DESIGN.md input has not been demonstrated.

Preparation run 41753886388 succeeded at head 95de037b1cd36c3c7a3d6d8a56571d0e1804e15a. Artifact 13286168774 contains only pnpm-lock.yaml, SHA-256 898c29623bb023418067adaad5de7ce876a400698b28bf04ae789fe8c24735a0. Its four importers cover root plus all three templates. Only the two intended root dependency versions changed. The lockfile contains no extract-zip or basic-ftp package, and each template resolves Zod 4.6.7. All 29 existing override pins remain. The temporary preparation job has been removed.

The root lockfile audit now reports one high advisory, seven moderate and two low, with zero critical; the remaining high is the unchanged Google design CLI Zod path. This is an affected dependency, not a demonstrated website exploit. No exemption was added.

Small source-level tests using the existing primary checkout's compiler/dependencies passed the payments guard's 20 tests and the governance starter's 32 tests when each suite ran from its documented directory. An initial combined invocation from repository root failed two fixture-path lookups; no product code was changed to mask that invocation error. Frozen-install compilation and tests against the committed lockfile remain the authoritative hosted checks.

The four historical secret alerts still require credential-owner review; no key is printed, tested, rotated or dismissed. No merge, production promotion, billing change, Vercel review-setting change, additional paid reviewer or service purchase is authorized or performed.

Sources inspected 2026-11-04: npm package metadata for Puppeteer, @puppeteer/browsers, Mermaid CLI, Zod and MCP SDK; https://pptr.dev/guides/configuration ; https://zod.dev/v4/changelog ; https://pnpm.io/cli/install ; upstream design.md package/source and issue 184. Hosted run and final exact-head results will be linked in issue 1161 and PR 1162.
