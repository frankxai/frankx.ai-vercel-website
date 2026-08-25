# Trusted media guard: bootstrap and operation

## Security invariant

Pull-request code is candidate data, never policy or executable verifier code. A pull request cannot authorize its own media, change the checker that judges it, change the workflow that invokes the checker, or set a label/configuration/CLI flag that makes those changes acceptable.

The gate deliberately uses two GitHub Actions workflows:

1. `.github/workflows/media-guard.yml` runs on `pull_request` with `permissions: {}`. It checks out and executes nothing. Its only purpose is to produce a completed `workflow_run` event.
2. `.github/workflows/media-guard-trusted.yml` runs from the default branch on that event. It resolves the exact open PR, current base SHA, head SHA, and GitHub-generated merge SHA; checks out the trusted base and candidate merge separately; and runs only `trusted/scripts/media-guard.mjs` with the trusted base policy.

The trusted job's ordinary `GITHUB_TOKEN` has only `contents: read` and `pull-requests: read`. Candidate dependencies, actions, scripts, build hooks, and Git submodules are never executed. Checkout credentials are not persisted. Every action is pinned to a full commit SHA.

The only write uses a short-lived installation token for a dedicated GitHub App to create the `Media Guard Trusted` commit status on the exact PR head. App credentials live in a branch-restricted `media-guard-trusted` environment and are passed only to the pinned token-minting action; the checker process and candidate checkout never receive them. This distinct App identity prevents a same-repository PR workflow from spoofing the required context with a generic Actions token.

If a PR deletes, renames, disables, or replaces the request workflow, the trusted status is absent and the required check blocks the PR. If it preserves or forges a workflow named `Media Guard`, the default-branch verifier still runs and judges the candidate with base-controlled code.

`pull_request_target` is not used. It must not be introduced as an escape hatch for this gate.

## Why this PR cannot enforce itself

GitHub loads a `pull_request` workflow from the pull request merge commit. That is safe only because its token is read-minimal and it receives no secrets; it is not a trust root. GitHub loads a `workflow_run` workflow only after that workflow exists on the default branch. Therefore the new trusted verifier cannot authoritatively judge the same pull request that first introduces it.

This is a real bootstrap boundary, not a test gap. Do not claim that `Media Guard Trusted` protected the bootstrap PR.

## One-time staged activation

1. Create and install a dedicated `FrankX Media Guard` GitHub App on this repository. Give it only **Commit statuses: read and write** plus repository metadata. Do not reuse a broad automation App or personal token.
2. Create the `media-guard-trusted` GitHub Environment. Restrict deployment branches to the protected default branch only. Store the App ID as `MEDIA_GUARD_APP_ID` and private key as `MEDIA_GUARD_APP_PRIVATE_KEY` environment secrets. A normal `pull_request` workflow must be unable to access this environment.
3. Keep the bootstrap PR draft until the complete diff, local adversarial suite, ordinary CI, and Vercel preview are reviewed. Confirm there is no `pull_request_target` workflow and no untrusted-code execution with a privileged token.
4. Merge the bootstrap PR only through an administrator-reviewed bootstrap exception to the future trusted status. Do not weaken unrelated required checks.
5. Wait until the exact default-branch commit and production deployment are healthy.
6. Open a disposable negative-canary PR that performs all of the following in one head commit:
   - replaces both media-guard workflows with no-op/self-success definitions;
   - replaces the checker, resolver, reporter, and policy with self-exempting versions;
   - adds the exact PR #502 text-placeholder PNG and forged PNG/JPEG/WebP signatures;
   - changes and deletes entries covered by a temporary base-policy `requiredAssets` fixture.
7. Verify that the default-branch `Media Guard Trusted` run posts `failure` on the canary's exact head **from the dedicated App identity**. Also verify that removing the inert request workflow leaves the trusted status absent, not successful. Close the canary without merging.
8. Add `Media Guard Trusted` as a required status for `main` and `staging`, selecting the dedicated GitHub App as the expected source. Require branches to be up to date or use the merge queue so a success against an older base cannot be reused after the base advances. Restrict rule bypass to the smallest administrator set.
9. Re-run a smaller negative canary after any change to the workflow, checker, resolver, reporter, policy schema, GitHub App/environment, permissions, or branch rules.

For an organization-owned successor repository, prefer an organization ruleset-required workflow pinned to an administrator-controlled repository/ref. This user-owned repository uses the staged default-branch `workflow_run` design because repository-local `pull_request` YAML cannot be immutable to its own PR.

## Required assets

`.github/media-guard-policy.json` is read relative to the trusted checker checkout, never from the candidate checkout. `requiredAssets` maps repository-relative paths to lowercase SHA-256 content digests:

```json
{
  "schemaVersion": 1,
  "requiredAssets": {
    "public/images/example.png": "<64 lowercase hex characters>"
  }
}
```

Every listed asset must remain a regular file with the exact digest. Deletion, symlink replacement, or content change fails closed. Candidate edits to the policy file are themselves protected and cannot alter the policy used for that run.

## Trust-root updates

These paths are protected by the base checker:

- `.github/media-guard-policy.json`
- `.github/workflows/media-guard.yml`
- `.github/workflows/media-guard-trusted.yml`
- `scripts/media-guard.mjs`
- `scripts/resolve-media-guard-pr.mjs`
- `scripts/report-media-guard-status.mjs`
- `scripts/tests/media-guard.contract.mjs`

A change to any trust root is expected to fail `Media Guard Trusted`. It requires a separately reviewed administrator policy update; PR labels, PR-head configuration, environment flags, and candidate workflow inputs are not authorization. Review the exact commit, run the entire adversarial suite, use the narrow branch-rule bypass for that exact update, then immediately restore enforcement and run a negative canary. Never combine a trust-root update with unrelated product work.

## Verification receipt

For every normal PR, retain:

- exact PR head, base, and GitHub merge SHAs from the trusted workflow summary;
- the `Media Guard Trusted` status target URL and conclusion;
- ordinary CI and exact-head Vercel deployment state;
- runtime/build-log scan when the PR changes application behavior.

Vercel preview success is valuable release evidence but is not an authorization source for the media policy.
