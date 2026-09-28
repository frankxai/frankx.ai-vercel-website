#!/usr/bin/env node
/**
 * Review gate: every finding an AI reviewer (Codex, Copilot, Claude) leaves on a pull request must be answered
 * before it merges. Any reply or a resolved thread answers a P2/P3; a P0/P1 needs a fix (a commit SHA in the reply)
 * or a reasoned decline ("Declined: <why>"). Human threads are left to humans.
 *
 * Why: merges are autonomous, so the reviewer's findings are the quality gate. An unanswered finding means nobody
 * decided about it; on #817 a reviewer found three real defects that every automated check had passed.
 *
 *   node scripts/governance/review-gate.mjs   (reads GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER, PR_AUTHOR)
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REVIEWER_BOTS = /(\[bot\]$|^chatgpt-codex-connector$|^copilot|^claude$|^coderabbit)/i
const SEVERE = /\bP[01]\b|\b(critical|high severity)\b/i
const FIX_REF = /\b[0-9a-f]{7,40}\b/
const DECLINE = /^\s*declined\s*:\s*\S.{30,}/is

export function evaluateThreads(threads, { author }) {
  const errors = []
  for (const [index, thread] of threads.entries()) {
    const [first, ...replies] = thread.comments
    if (!first || !REVIEWER_BOTS.test(first.author ?? '')) continue
    const title = first.body.replace(/!\[[^\]]*\]\([^)]*\)|<[^>]+>|\*+/g, '').trim().split('\n')[0].slice(0, 90)
    const answers = replies.filter((r) => !REVIEWER_BOTS.test(r.author ?? '') || r.author === author)
    const severe = SEVERE.test(first.body)
    if (severe) {
      const decided = answers.some((r) => FIX_REF.test(r.body) || DECLINE.test(r.body))
      if (!decided) errors.push(`thread ${index + 1} (${first.author}, ${/P0/.test(first.body) ? 'P0' : 'P1'}): "${title}" needs a fix commit or "Declined: <reason>".`)
    } else if (!thread.isResolved && !answers.length) {
      errors.push(`thread ${index + 1} (${first.author}): "${title}" is unanswered. Fix it, or reply with why not.`)
    }
  }
  return errors
}

const QUERY = `query($owner:String!,$name:String!,$number:Int!){repository(owner:$owner,name:$name){pullRequest(number:$number){
  reviewThreads(first:100){nodes{isResolved comments(first:50){nodes{author{login} body}}}}}}}`

async function fetchThreads() {
  const [owner, name] = String(process.env.GITHUB_REPOSITORY).split('/')
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { authorization: `bearer ${process.env.GITHUB_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { owner, name, number: Number(process.env.PR_NUMBER) } }),
  })
  const json = await response.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data.repository.pullRequest.reviewThreads.nodes.map((t) => ({
    isResolved: t.isResolved,
    comments: t.comments.nodes.map((c) => ({ author: c.author?.login ?? '', body: c.body })),
  }))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const threads = await fetchThreads()
  const errors = evaluateThreads(threads, { author: process.env.PR_AUTHOR })
  const reviewed = threads.filter((t) => REVIEWER_BOTS.test(t.comments[0]?.author ?? '')).length
  for (const error of errors) console.error(`[review-gate] ${error}`)
  // exitCode, not exit(): exiting while fetch's socket closes aborts Node on Windows (libuv assertion, code 127).
  if (errors.length) process.exitCode = 1
  else console.log(`[review-gate] ${reviewed} AI review thread(s), all answered.`)
}
