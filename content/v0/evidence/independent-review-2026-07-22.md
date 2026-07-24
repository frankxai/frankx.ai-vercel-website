# Independent v0 Review Receipt

Date: 2026-07-22
Candidate commit: `5d01c6090eb123cb9d4401bd67d01ff3fce1d089`
Release authority: Frank

No private v0 chat, project, user, preview, or token identifier is included in this receipt.

## Engineering Review

v0 Max Fast returned **PASS WITH FOLLOW-UPS** for the exact remediation patch.

Confirmed closed:

- deny-by-default preview response headers, including `Refresh` and origin-state headers;
- own-property enforcement for public preview-key mappings;
- stale, malformed, non-HTTPS, and tokenless remote-preview rejection;
- empty or missing resume-node fail-closed behavior;
- server-only configuration and route boundaries;
- normalized duplicate-edge handling.

The reviewer raised one medium compression-contract follow-up. The pinned v0 SDK was then inspected and integration-tested: `fetchPreview` removes `content-encoding` and `content-length` after its fetch implementation returns the decoded body. The regression suite now locks that behavior. The reviewer also requested explicit non-read-only coverage; the suite already rejects POST before credential resolution.

Final engineering gates:

- 33/33 focused behavior and contract tests pass;
- full TypeScript passes;
- scoped ESLint passes;
- direct Next.js 16.2.6 production build passes for 1,132 routes;
- staged and commit-hook secret scans pass.

## Visual Review

v0 Max Fast reviewed six immutable PNG derivatives covering catalog, package, and studio across desktop and mobile. It returned **PASS WITH FOLLOW-UPS** and **26/30**, clearing the 26-point premium beta gate.

Score:

| Dimension | Score |
| --- | ---: |
| Hierarchy | 5/5 |
| Brand fit and distinctiveness | 4/5 |
| Craft | 4/5 |
| Accessibility and responsiveness visible in stills | 3/5 |
| Provenance and accuracy cues | 5/5 |
| Intended utility | 5/5 |

Confirmed strengths:

- deliberate desktop-to-mobile recomposition rather than a compressed canvas;
- contained text and controls across all six views;
- credible operational density and visible run-state transitions;
- strong demo, seed, review, rights, and provenance cues;
- original FrankX product language without Figma Weave trade dress.

Tracked follow-ups:

- verify muted secondary-label contrast from computed tokens before a wider release;
- consider a slightly larger initial graph scale on desktop;
- replace generic-cinematic catalog imagery when stronger real product proof exists.

The existing machine receipt covers interaction, focus, reduced motion, overflow, accessible names, image integrity, console and request diagnostics, and performance; those behaviors cannot be proven by stills alone.

## Cloud Gate

The final candidate deployment cloned successfully, then Vercel's ignored-build step canceled it because draft PR 351 is intentionally configured not to build. This is a policy gate, not a build failure. An earlier UI commit has a READY Vercel preview and passed the six-route cloud QA run; the final security remediation passed the complete local release stack.

The next authorized action is to mark PR 351 ready for review. That single state change intentionally triggers the final GitHub and Vercel suite. Production merge and promotion remain separate Frank approvals.
