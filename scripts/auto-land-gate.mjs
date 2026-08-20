/**
 * Fail-closed PR landing gate.
 *
 * Usage:
 *   node scripts/auto-land-gate.mjs [PR_NUMBER]
 *
 * This script verifies release admission; it never resolves findings,
 * dismisses reviews, bypasses branch protection, or ignores failed checks.
 */

import { execSync } from 'node:child_process'

const prArgument = process.argv[2]

if (!/^[1-9]\d*$/.test(prArgument ?? '')) {
  console.error('PR number must be a positive decimal integer.')
  process.exit(1)
}

const prNumber = Number(prArgument)

function run(command, options = {}) {
  return execSync(command, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
    ...options,
  })
}

const repoName = run('gh repo view --json name -q .name').trim()
if (!/^[A-Za-z0-9_.-]+$/.test(repoName)) {
  throw new Error('Repository name contains unsupported characters.')
}

console.log(`[release-admission] Validating PR #${prNumber} in frankxai/${repoName}`)

run('npm run guards:check', { stdio: 'inherit' })

const threadQuery = `query {
  repository(owner: "frankxai", name: "${repoName}") {
    pullRequest(number: ${prNumber}) {
      reviewThreads(first: 100) {
        nodes { id isResolved }
      }
    }
  }
}`
const threadData = JSON.parse(run(`gh api graphql -f query='${threadQuery}'`))
const threads =
  threadData?.data?.repository?.pullRequest?.reviewThreads?.nodes ?? []
const unresolved = threads.filter((thread) => !thread.isResolved)
if (unresolved.length > 0) {
  throw new Error(`${unresolved.length} review thread(s) remain unresolved.`)
}

const reviews = JSON.parse(
  run(`gh api repos/frankxai/${repoName}/pulls/${prNumber}/reviews`),
)
const blockingReviews = reviews.filter(
  (review) => review.state === 'CHANGES_REQUESTED',
)
if (blockingReviews.length > 0) {
  throw new Error(
    `${blockingReviews.length} change-request review(s) remain active.`,
  )
}

const pullRequest = JSON.parse(
  run(
    `gh pr view ${prNumber} --json isDraft,mergeable,reviewDecision,state`,
  ),
)
if (pullRequest.state !== 'OPEN') {
  throw new Error(`PR is not open (state: ${pullRequest.state}).`)
}
if (pullRequest.isDraft) {
  throw new Error('Draft PRs cannot be landed.')
}
if (pullRequest.mergeable !== 'MERGEABLE') {
  throw new Error(`PR is not mergeable (state: ${pullRequest.mergeable}).`)
}
if (pullRequest.reviewDecision !== 'APPROVED') {
  throw new Error(
    `Independent approval is required (decision: ${pullRequest.reviewDecision || 'none'}).`,
  )
}

run(`gh pr checks ${prNumber} --watch --fail-fast`, {
  stdio: 'inherit',
})

run(`gh pr merge ${prNumber} --squash --delete-branch`, {
  stdio: 'inherit',
})

console.log(`[release-admission] PR #${prNumber} merged without bypass.`)
