# Repository Actions event policy

`frankxai/frankx.ai-vercel-website` runs under a repository Actions policy,
`Allow surface guard triggers` (policy id 12195, created 2026-11-09), whose
`restrict_action_events` rule lists the only events that may trigger a workflow.
The policy is repository configuration, not a file in this tree, so it is
recorded here because a missing event fails silently at run startup.

## Why this record exists

Between 2026-11-09 and 2026-11-28 the allowed list omitted `issue_comment`.
`review-gate.yml` triggers on `issue_comment` so a `/gate` comment can refresh
the Review Gate status without a push. Every one of those runs failed before any
job started:

```
Event 'issue_comment' is not allowed to trigger Actions workflows. Workflow file: '.github/workflows/review-gate.yml'.
```

The run status was `startup_failure`, the job list was empty, and the run had no
logs. `pull_request` and `pull_request_review_comment` runs on the same commit
succeeded because both events were in the allowed list.

## Required events

These are the events the workflows in this repository declare, so all of them
must stay in the policy's `allowed_events`:

| Event | Used by |
| --- | --- |
| `pull_request` | ci, contract-guard, estate-guard, media-guard, merge-gate, review-gate, starlight-design-contract, starlight-editorial-contract, web-excellence |
| `pull_request_target` | surface-guard |
| `pull_request_review` | review-gate |
| `pull_request_review_comment` | review-gate |
| `issue_comment` | review-gate (`/gate`) |
| `push` | branch-cleanup, ci, draft-release, estate-guard, search-context-evidence |
| `workflow_dispatch` | branch-cleanup, draft-release, estate-guard, intelligence-refresh, waitlist-scoreboard |
| `schedule` | estate-guard, intelligence-refresh, waitlist-scoreboard |

The policy also allows `workflow_run`, `release` and `repository_dispatch`, which
no workflow in this tree currently declares.

## Checking and repairing it

```bash
gh api -H "X-GitHub-Api-Version: 2026-03-10" \
  repos/frankxai/frankx.ai-vercel-website/actions/policies/12195 \
  --jq '.rules[] | select(.type=="restrict_action_events") | .parameters.allowed_events'
```

To repair, `PUT` the policy with the full allowed list; omitting `conditions`
preserves the existing workflow-path targeting:

```bash
curl -X PUT -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  https://api.github.com/repos/frankxai/frankx.ai-vercel-website/actions/policies/12195 \
  -d '{"name":"Allow surface guard triggers","enforcement":"active","rules":[{"type":"restrict_action_events","parameters":{"allowed_events":["pull_request","pull_request_target","push","workflow_dispatch","schedule","pull_request_review","pull_request_review_comment","issue_comment","workflow_run","release","repository_dispatch"]}}]}'
```

A `/gate` comment on a pull request is the live check: the Review Gate run must
reach `in_progress` and publish a `Review Gate` status on the head SHA. A
`startup_failure` with zero jobs means the event is missing from the policy.

Reference: `docs.github.com/en/rest/actions/policies`.
