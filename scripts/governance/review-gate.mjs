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

// Named AI reviewers only, matched exactly and only when GitHub says the account is a Bot: dependabot and vercel
// post status, not findings, and a human account named "claude-fan" is not a reviewer.
const REVIEWERS = new Set(['chatgpt-codex-connector', 'copilot-pull-request-reviewer', 'copilot', 'claude', 'coderabbitai'])
const MEMBERS = new Set(['OWNER', 'MEMBER', 'COLLABORATOR'])
const BADGE = /\bP[0-3]\s*Badge\b|!\[P[0-3]/i
const SEVERE = /\bP[01]\b|\b(critical|high severity)\b/i
const DECLINE = /^\s*declined\s*:\s*\S.{30,}/is

const isReviewer = (c) => c.isBot === true && REVIEWERS.has(String(c.author ?? '').replace(/\[bot\]$/, '').toLowerCase())
const authorized = (c, author) => !c.isBot && (c.author === author || MEMBERS.has(c.association))
const titleOf = (body) => body.replace(/!\[[^\]]*\](\([^)]*\))?|<[^>]+>|\*+/g, '').trim().split('\n')[0].slice(0, 90)

/** When a finding was last stated: an edit replaces it, so earlier answers and commits no longer count. */
const statedAt = (found) => (found.editedAt && found.editedAt > found.createdAt ? found.editedAt : found.createdAt)

/** A fix names a commit of this PR made after the finding was last stated; any other hex string proves nothing. */
function fixes(reply, found, commits) {
  const refs = reply.body.match(/\b[0-9a-f]{7,40}\b/g) ?? []
  return refs.some((ref) => commits.some((c) => c.oid.startsWith(ref) && c.committedDate >= statedAt(found)))
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

const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** A top-level answer must point at its finding (link, or the finding's title), so one reply cannot clear them all. */
function references(reply, found) {
  const anchor = /#(?:issuecomment|discussion_r|pullrequestreview)-?\d+/.exec(found.url ?? '')?.[0]
  if (anchor && reply.body.includes(anchor.slice(1))) return true
  const title = normalize(titleOf(found.body)).slice(0, 40)
  // Quoting the title exactly identifies the finding; very short titles (under 6 characters) would match anything.
  return title.length >= 6 && normalize(reply.body).includes(title)
}

/**
 * One review body can hold several badged findings; each is its own finding with its own severity. With more than
 * one, a link to the shared review cannot say which was answered, so each needs its title quoted.
 */
function sections(item) {
  const starts = [...item.body.matchAll(/!\[P[0-3]\s*Badge\]/gi)].map((m) => m.index)
  if (starts.length <= 1) return [item]
  return starts.map((start, i) => ({ ...item, url: undefined, body: item.body.slice(start, starts[i + 1]) }))
}

export function evaluateFindings({ threads, topLevel, commits, author }) {
  const errors = []
  for (const [index, thread] of threads.entries()) {
    // Every AI comment in a thread is a finding, not only the first; each carries its own review's dismissal.
    const found = thread.comments.filter((c) => isReviewer(c) && !c.dismissed)
    if (!found.length) continue
    if (thread.truncated) {
      errors.push(`thread ${index + 1} (${found[0].author}): "${titleOf(found[0].body)}" has more comments than one read returns; too long to verify, so it fails closed. Summarise the outcome in a new reply after resolving.`)
      continue
    }
    // With several findings in one thread, an answer must name the one it answers (title or link).
    const several = found.length > 1
    for (const item of found) {
      const answers = thread.comments.filter((r) => authorized(r, author) && r.createdAt >= statedAt(item) && (!several || references(r, item)))
      // A resolution predates any later edit of the finding, so an edited finding needs a fresh answer.
      if (thread.isResolved && severity(item.body) > 1 && !item.editedAt) continue
      const error = decide(item, answers, commits, `thread ${index + 1}`)
      if (error) errors.push(error)
    }
  }
  const ordered = [...topLevel].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  for (const item of ordered) {
    if (!isReviewer(item) || item.dismissed || !BADGE.test(item.body)) continue
    for (const section of sections(item)) {
      const answers = ordered.filter((r) => r !== item && r.createdAt >= statedAt(section) && authorized(r, author) && references(r, section))
      const error = decide(section, answers, commits, 'review comment')
      if (error) errors.push(error)
    }
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

const comment = (c) => ({
  author: c.author?.login ?? '', isBot: c.author?.__typename === 'Bot', association: c.authorAssociation, body: c.body ?? '', createdAt: c.createdAt,
  editedAt: c.lastEditedAt ?? undefined, url: c.url, dismissed: c.state === 'DISMISSED' || c.pullRequestReview?.state === 'DISMISSED',
})

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
  const who = 'author{__typename login} authorAssociation body createdAt lastEditedAt url'
  const [threads, reviews, comments, commits] = await Promise.all([
    paged('reviewThreads', `isResolved comments(first:100){totalCount nodes{${who} pullRequestReview{state}}}`, variables),
    paged('reviews', `${who} state`, variables),
    paged('comments', who, variables),
    paged('commits', 'commit{oid committedDate}', variables),
  ])
  return {
    threads: threads.map((t) => {
      const comments = t.comments.nodes.map(comment)
      return { isResolved: t.isResolved, truncated: t.comments.totalCount > t.comments.nodes.length, comments }
    }),
    topLevel: [...reviews, ...comments].map(comment),
    commits: commits.map((c) => c.commit),
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const data = await fetchAll()
  const errors = evaluateFindings({ ...data, author: process.env.PR_AUTHOR })
  const reviewed = data.threads.filter((t) => t.comments.some(isReviewer)).length
  for (const error of errors) console.error(`[review-gate] ${error}`)
  // exitCode, not exit(): exiting while fetch's socket closes aborts Node on Windows (libuv assertion, code 127).
  if (errors.length) process.exitCode = 1
  else console.log(`[review-gate] ${reviewed} AI review thread(s) and every badged review comment answered.`)
}
