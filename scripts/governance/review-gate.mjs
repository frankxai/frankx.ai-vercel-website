#!/usr/bin/env node
/**
 * Review gate: every finding an AI reviewer (Codex, Copilot, Claude) leaves on a pull request must be answered by
 * the PR author or a repository member before it merges. A P2/P3 needs any such reply or a resolved thread. A P0/P1
 * needs a fix — a reply naming a commit of this PR made after the finding — or a reasoned "Declined: <why>".
 * Findings in review bodies or PR comments count when they carry a severity badge. Human threads are left to humans.
 *
 * Why: merges are autonomous, so the reviewer's findings are the quality gate. An unanswered finding means nobody
 * decided about it; on #817 a reviewer found three real defects that every automated check had passed.
 *
 *   node scripts/governance/review-gate.mjs   (reads GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER, PR_AUTHOR)
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REVIEWER_BOTS = /(\[bot\]$|^chatgpt-codex-connector$|^copilot|^claude$|^coderabbit)/i
const MEMBERS = new Set(['OWNER', 'MEMBER', 'COLLABORATOR'])
const BADGE = /\bP[0-3]\s*Badge\b|!\[P[0-3]/i
const SEVERE = /\bP[01]\b|\b(critical|high severity)\b/i
const DECLINE = /^\s*declined\s*:\s*\S.{30,}/is

const isBot = (c) => REVIEWER_BOTS.test(c.author ?? '')
const authorized = (c, author) => !isBot(c) && (c.author === author || MEMBERS.has(c.association))
const titleOf = (body) => body.replace(/!\[[^\]]*\]\([^)]*\)|<[^>]+>|\*+/g, '').trim().split('\n')[0].slice(0, 90)

/** A fix names a commit of this PR that was made after the finding; any other hex string proves nothing. */
function fixes(reply, found, commits) {
  const refs = reply.body.match(/\b[0-9a-f]{7,40}\b/g) ?? []
  return refs.some((ref) => commits.some((c) => c.oid.startsWith(ref) && c.committedDate >= found.createdAt))
}

/** The badge decides ("![P1 Badge]"); findings often mention other levels in their text ("for a P0/P1 thread…"). */
function severity(body) {
  const badge = /!\[P([0-3])\s*Badge/i.exec(body) ?? /\bP([0-3])\s*Badge\b/i.exec(body)
  if (badge) return Number(badge[1])
  return SEVERE.test(body) ? 1 : 2
}

function decide(found, answers, commits, label) {
  const level = severity(found.body)
  if (level <= 1) {
    if (answers.some((r) => fixes(r, found, commits) || DECLINE.test(r.body))) return null
    return `${label} (${found.author}, P${level}): "${titleOf(found.body)}" needs a fix commit of this PR or "Declined: <reason>" from the author or a member.`
  }
  return answers.length ? null : `${label} (${found.author}): "${titleOf(found.body)}" is unanswered. Fix it, or reply with why not.`
}

export function evaluateFindings({ threads, topLevel, commits, author }) {
  const errors = []
  for (const [index, thread] of threads.entries()) {
    const [first, ...replies] = thread.comments
    if (!first || !isBot(first)) continue
    const answers = replies.filter((r) => authorized(r, author))
    if (thread.isResolved && severity(first.body) > 1) continue
    const error = decide(first, answers, commits, `thread ${index + 1}`)
    if (error) errors.push(error)
  }
  const ordered = [...topLevel].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  for (const [index, item] of ordered.entries()) {
    if (!isBot(item) || !BADGE.test(item.body)) continue
    const answers = ordered.slice(index + 1).filter((r) => authorized(r, author))
    const error = decide(item, answers, commits, 'review comment')
    if (error) errors.push(error)
  }
  return errors
}

async function graphql(query, variables) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { authorization: `bearer ${process.env.GITHUB_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  const json = await response.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data.repository.pullRequest
}

const comment = (c) => ({ author: c.author?.login ?? '', association: c.authorAssociation, body: c.body ?? '', createdAt: c.createdAt })

/** Walks every page; a truncated read could report "all answered" while later findings sit unread. */
async function paged(field, selection, variables) {
  const nodes = []
  let after = null
  do {
    const pr = await graphql(`query($owner:String!,$name:String!,$number:Int!,$after:String){repository(owner:$owner,name:$name){pullRequest(number:$number){
      ${field}(first:100,after:$after){pageInfo{hasNextPage endCursor} nodes{${selection}}}}}}`, { ...variables, after })
    nodes.push(...pr[field].nodes)
    after = pr[field].pageInfo.hasNextPage ? pr[field].pageInfo.endCursor : null
  } while (after)
  return nodes
}

async function fetchAll() {
  const [owner, name] = String(process.env.GITHUB_REPOSITORY).split('/')
  const variables = { owner, name, number: Number(process.env.PR_NUMBER) }
  const who = 'author{login} authorAssociation body createdAt'
  const [threads, reviews, comments, commits] = await Promise.all([
    paged('reviewThreads', `isResolved comments(first:100){nodes{${who}}}`, variables),
    paged('reviews', who, variables),
    paged('comments', who, variables),
    paged('commits', 'commit{oid committedDate}', variables),
  ])
  return {
    threads: threads.map((t) => ({ isResolved: t.isResolved, comments: t.comments.nodes.map(comment) })),
    topLevel: [...reviews, ...comments].map(comment),
    commits: commits.map((c) => c.commit),
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const data = await fetchAll()
  const errors = evaluateFindings({ ...data, author: process.env.PR_AUTHOR })
  const reviewed = data.threads.filter((t) => isBot(t.comments[0] ?? {})).length
  for (const error of errors) console.error(`[review-gate] ${error}`)
  // exitCode, not exit(): exiting while fetch's socket closes aborts Node on Windows (libuv assertion, code 127).
  if (errors.length) process.exitCode = 1
  else console.log(`[review-gate] ${reviewed} AI review thread(s) and every badged review comment answered.`)
}
