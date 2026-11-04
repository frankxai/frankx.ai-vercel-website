# CI and security completion review, Codex, 4 November 2026, revision 4

Author: Codex. Created: 2026-11-04. Review state: text-package verification pending.
Sources: PR #1162, issue #1161, current source and the linked hosted checks.
Revisions 1–3 remain preserved; this revision corrects their pending snapshots.

The full application and audit passed at head
`af04e9ab466cebbb80db75c369bbc8192cd2a3ca` in CI run 41765171782. Root audit:
zero critical/high, seven moderate and two low. Merge Gate 41765171688 passed.
The CLI rebuild reproduced the reviewed package, 345 upstream tests passed,
one existing optional Terrazzo integration skipped and zero failed. Existing
typecheck, lint, template suites/build, production build, `/ops` HTTP/cache checks,
Mermaid rendering and browser journeys passed. Local contract/security suite:
53 passed, zero failed, including required vendor trigger coverage.

Ready-for-review exposed the Media Guard policy: archives belong outside Git.
Run 41766456960 correctly rejected the `.tgz`; no policy exception is added.
The same verified package is now committed as 58 inspectable text files under
`vendor/google-design-md/package`, consumed through pnpm's local-directory
protocol. Its complete tree must match the pinned rebuild, and a fresh frozen
install must verify the installed CLI. The narrow vendor `.gitignore` rule tracks
only these reviewed runtime files; ordinary build output remains ignored.
Temporary lockfile preparation will be removed before final CI.

Vercel Agent check 126365874698 independently reviewed that prior head, completed
successfully and created zero suggestions (review ID
`0cc79393c40d66f2d69ca025ffb034b5`). It does not sign off the packaging revision.
The final head needs fresh independent review and all required checks.

The existing Vercel preview cost policy skipped draft deployments. Their green
Vercel status means an ignored build, not a successful preview build. The final
coherent commit will explicitly request `[preview]` through the existing native
Git policy. Production remains held by `git.deploymentEnabled.main=false`.
No production deployment, billing change or Vercel review-setting change is allowed.
The `/ops` repair is not live until a separately approved production release.

CodeRabbit's PR pause command was posted, but no acknowledgment was returned;
installation and pause state remain unverified. The installation-inventory API
requires a GitHub App-authorized token (403 with this token). The actual Vercel
Agent review is observed; no extra Copilot review is requested on this PR.
These facts supersede revision 3's unconfirmed pause wording. No new paid service
or reviewer workflow was added. Billing/quota overlap requires dashboard review.

Manual follow-up stays open in #1161: historical credential-owner review for four
alerts, require the exact `Dependency audit` and `scan` contexts, assess the
Actions approval permission and independent-approval enforcement, and approve a
separate release before removing the production hold. Existing unrelated PR
findings remain with their owners. Hub handover is still blocked by the live
`agentic-ops-hub` session/ledger/next-prompt lane; no foreign work was overwritten.
