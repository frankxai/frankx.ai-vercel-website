import { appendFileSync, readFileSync } from "node:fs"

function fail(message) {
  throw new Error(`trusted media-guard resolution failed: ${message}`)
}

function requireSha(value, label) {
  if (!/^[0-9a-f]{40}$/u.test(value || "")) fail(`${label} is not a full lowercase Git SHA`)
  return value
}

function output(name, value) {
  if (!process.env.GITHUB_OUTPUT) fail("GITHUB_OUTPUT is unavailable")
  appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`)
}

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "frankx-media-guard",
    },
  })
  if (!response.ok) fail(`GitHub API ${path} returned ${response.status}`)
  return response.json()
}

if (!process.env.GITHUB_EVENT_PATH || !process.env.GITHUB_REPOSITORY || !process.env.GITHUB_TOKEN) {
  fail("required GitHub Actions environment is unavailable")
}

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"))
const run = event.workflow_run
if (!run || run.name !== "Media Guard" || run.event !== "pull_request") {
  fail("triggering run is not the safe Media Guard pull_request workflow")
}
if (!Array.isArray(run.pull_requests) || run.pull_requests.length !== 1) {
  fail("triggering run must identify exactly one pull request")
}

const summary = run.pull_requests[0]
const prNumber = summary.number
if (!Number.isSafeInteger(prNumber) || prNumber <= 0) fail("pull request number is invalid")
const eventHead = requireSha(summary.head?.sha, "event PR head")
const pullRequest = await github(`/repos/${process.env.GITHUB_REPOSITORY}/pulls/${prNumber}`)

if (pullRequest.state !== "open") fail("pull request is no longer open")
if (!pullRequest.base || !["main", "staging"].includes(pullRequest.base.ref)) {
  fail("pull request does not target an enforced base branch")
}
const headSha = requireSha(pullRequest.head?.sha, "current PR head")
if (headSha !== eventHead) fail("triggering run is stale for the current PR head")
if (pullRequest.base.repo?.full_name !== process.env.GITHUB_REPOSITORY) fail("pull request base repository is unexpected")

const baseSha = requireSha(pullRequest.base.sha, "current PR base")
const mergeSha = requireSha(pullRequest.merge_commit_sha, "current GitHub merge commit")

output("pr_number", String(prNumber))
output("head_sha", headSha)
output("base_sha", baseSha)
output("merge_sha", mergeSha)

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `### Trusted media-guard target\n\n- PR: #${prNumber}\n- head: \`${headSha}\`\n- base: \`${baseSha}\`\n- merge: \`${mergeSha}\`\n`,
  )
}
