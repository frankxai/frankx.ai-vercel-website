#!/usr/bin/env node
/** Private capture -> reviewed Markdown -> idempotent draft PR. Never publishes. */
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { createHash, randomUUID } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { isCanonicalBlogSlug } from '../lib/blog-redirects.mjs'
import { isJournalDate, journalDay, journalHubs, journalArticleSlugs } from '../lib/journal-policy.ts'

export const REPOSITORY = 'frankxai/frankx.ai-vercel-website'
export const hash = (value) => createHash('sha256').update(value).digest('hex')
const inside = (root, target) => target === root || target.startsWith(root + path.sep)
const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))

async function immutable(file, bytes) {
  try { await fs.writeFile(file, bytes, { flag: 'wx', mode: 0o600 }) }
  catch (error) {
    if (error.code !== 'EEXIST') throw error
    if (!(await fs.readFile(file)).equals(Buffer.from(bytes))) throw new Error('Existing capture or draft differs; use a new capture ID. Nothing overwritten.')
  }
}

/** Resolve symlinks BEFORE checking boundaries; reject Git worktrees as well. */
export async function privateDirectory(directory, repo = root) {
  if (!directory || !path.isAbsolute(directory)) throw new Error('Set JOURNAL_PRIVATE_DIR to an absolute private vault directory outside Git.')
  // Resolve existing ancestors before creating anything, including a symlink parent.
  let ancestor = path.resolve(directory)
  const tail = []
  for (;;) {
    try { ancestor = await fs.realpath(ancestor); break }
    catch (error) {
      if (error.code !== 'ENOENT') throw error
      tail.unshift(path.basename(ancestor)); ancestor = path.dirname(ancestor)
    }
  }
  const target = path.join(ancestor, ...tail)
  const repoPath = await fs.realpath(repo)
  if (inside(repoPath, target) || inside(target, repoPath) || inside(os.tmpdir(), target)) {
    throw new Error('Private vault must be outside this repository and temporary storage.')
  }
  for (let cursor = target; ; cursor = path.dirname(cursor)) {
    try { await fs.lstat(path.join(cursor, '.git')); throw new Error('Private vault must be outside every Git repository.') }
    catch (error) { if (error.code !== 'ENOENT') throw error }
    if (path.dirname(cursor) === cursor) break
  }
  await fs.mkdir(target, { recursive: true, mode: 0o700 })
  const stat = await fs.stat(target)
  if (process.platform !== 'win32' && (stat.mode & 0o077)) throw new Error('Private vault permissions must be 0700. Set its permissions before capture.')
  return target
}

function safeId(id) {
  if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(id || '')) throw new Error('Capture ID must contain lowercase letters, numbers and hyphens only.')
  return id
}

export async function capture({ directory, source, id, date = journalDay(), repo = root }) {
  if (!isJournalDate(date)) throw new Error('Invalid date.')
  const vault = await privateDirectory(directory, repo)
  const sourcePath = await fs.realpath(source)
  if (inside(await fs.realpath(repo), sourcePath)) throw new Error('Raw source must already be outside the public repository.')
  const bytes = await fs.readFile(sourcePath)
  if (!bytes.length || bytes.length > 50 * 1024 * 1024) throw new Error('Capture must be nonempty and at most 50 MB.')
  const digest = hash(bytes)
  const key = safeId(id || `${date}-${digest.slice(0,20)}`)
  const record = path.join(vault, key)
  await fs.mkdir(record, { recursive: true, mode: 0o700 })
  // A pre-existing capture-key symlink must never redirect original bytes
  // into a public checkout (or any other directory outside this private vault).
  if ((await fs.lstat(record)).isSymbolicLink() || await fs.realpath(record) !== record) {
    throw new Error('Capture records cannot be symlinks.')
  }
  // This hash and the original filename never leave the private vault.
  await immutable(path.join(record, 'original'), bytes)
  let state
  try { state = JSON.parse(await fs.readFile(path.join(record, 'capture.json'), 'utf8')) }
  catch (error) { if (error.code !== 'ENOENT') throw error }
  if (state) {
    if (state.sourceHash !== digest || state.date !== date) throw new Error('Capture ID conflict; nothing overwritten.')
  } else {
    state = { version: 1, contentId: `journal:${randomUUID()}`, date, sourceHash: digest, sourceName: path.basename(sourcePath), status: 'captured' }
    await immutable(path.join(record, 'capture.json'), JSON.stringify(state, null, 2) + '\n')
  }
  return { id: key, status: state.status, contentId: state.contentId }
}

const allowed = new Set(['title', 'date', 'kind', 'summary', 'tags', 'visibility', 'published', 'contentId', 'topicHubs', 'relatedArticles'])
export async function validateDraft(markdown, repo = root) {
  const { data, content } = matter(markdown)
  for (const key of Object.keys(data)) if (!allowed.has(key)) throw new Error(`Unsupported journal metadata: ${key}`)
  if (typeof data.title !== 'string' || !data.title.trim() || data.title.length > 150 || /[\r\n]/.test(data.title)) throw new Error('A short, single-line title is required.')
  if (!isJournalDate(data.date)) throw new Error('A real YYYY-MM-DD date is required.')
  if (!['daily', 'note', 'log'].includes(data.kind)) throw new Error('Invalid journal kind.')
  if (data.visibility !== 'public') throw new Error('Private notes never belong in this public repository.')
  if (data.published !== false) throw new Error('Staging requires published: false.')
  if (typeof data.summary !== 'string' || !data.summary.trim() || data.summary.length > 300) throw new Error('A summary of 1–300 characters is required.')
  if (!Array.isArray(data.tags) || data.tags.some(t => typeof t !== 'string' || !/^[A-Za-z0-9 -]{1,60}$/.test(t))) throw new Error('Tags must be short, plain labels.')
  if (data.topicHubs !== undefined && (!Array.isArray(data.topicHubs) || journalHubs(data.topicHubs).length !== data.topicHubs.length)) throw new Error('Unknown or duplicate topic hub.')
  if (data.relatedArticles !== undefined && (!Array.isArray(data.relatedArticles) || journalArticleSlugs(data.relatedArticles).length !== data.relatedArticles.length)) throw new Error('Invalid related article slug.')
  for (const slug of data.relatedArticles || []) {
    if (!isCanonicalBlogSlug(slug)) throw new Error('Link the canonical article instead of its redirect alias.')
    const related = matter(await fs.readFile(path.join(repo, 'content/blog', `${slug}.mdx`), 'utf8')).data
    if (related.draft === true || related.published === false) throw new Error('Related article must be published.')
  }
  if (!content.trim()) throw new Error('The note is empty.')
  // Human source review remains required: this scan cannot infer consent.
  if (/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|(?:file|obsidian):\/\/|(?:sk-|ghp_|github_pat_)[a-z0-9_-]{12,}|\b(?:rawNote|sourceHash|privateUri|sourceName)\s*:/i.test(markdown)) throw new Error('Possible private detail or credential; redact and review again.')
  if (/^\s*(?:import |export )|<\/?[A-Za-z]|\{[^}]*\}/m.test(content)) throw new Error('Journal captures accept plain Markdown only; no executable MDX or HTML.')
  return { data, content }
}

export async function stage({ directory, id, repo = root }) {
  const vault = await privateDirectory(directory, repo)
  const record = path.join(vault, safeId(id))
  if ((await fs.lstat(record)).isSymbolicLink()) throw new Error('Capture records cannot be symlinks.')
  const state = JSON.parse(await fs.readFile(path.join(record, 'capture.json'), 'utf8'))
  const markdown = await fs.readFile(path.join(record, 'draft.md'), 'utf8')
  const review = JSON.parse(await fs.readFile(path.join(record, 'review.json'), 'utf8'))
  if (review.candidateHash !== hash(markdown) || review.privacy !== 'accept' || review.attribution !== 'accept' || !review.reviewer) throw new Error('Privacy and attribution review must accept these exact draft bytes.')
  const { data } = await validateDraft(markdown, repo)
  if (data.contentId !== state.contentId || data.date !== state.date) throw new Error('Draft identity must match the private capture.')
  const slug = `${state.date}-${state.contentId.replace('journal:', '')}`
  const relative = `content/journal/${slug}.md`
  // No original note, vault path, source key, digest or review notes are exported.
  await fs.mkdir(path.join(repo, 'content/journal'), { recursive: true })
  await immutable(path.join(repo, relative), markdown)
  await fs.writeFile(path.join(record, 'staged.json'), JSON.stringify({ contentId: state.contentId, file: relative, candidateHash: hash(markdown) }, null, 2) + '\n', { mode: 0o600 })
  return { status: 'draft', file: relative, contentId: state.contentId }
}

function gh(endpoint, method = 'GET', body) {
  const args = ['api', endpoint, '--method', method]
  if (body) args.push('--input', '-')
  // execFile argv + stdin: no shell, no raw source, no token on the command line.
  return JSON.parse(execFileSync('gh', args, { input: body ? JSON.stringify(body) : undefined, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }))
}

export async function draftPr({ directory, id, repo = root, api = gh }) {
  const vault = await privateDirectory(directory, repo)
  const record = path.join(vault, safeId(id))
  if ((await fs.lstat(record)).isSymbolicLink()) throw new Error('Capture records cannot be symlinks.')
  const staged = JSON.parse(await fs.readFile(path.join(record, 'staged.json'), 'utf8'))
  const markdown = await fs.readFile(path.join(repo, staged.file), 'utf8')
  const review = JSON.parse(await fs.readFile(path.join(record, 'review.json'), 'utf8'))
  if (staged.candidateHash !== hash(markdown) || review.candidateHash !== hash(markdown) || review.privacy !== 'accept' || review.attribution !== 'accept') throw new Error('Draft changed after review; stage and review again.')
  const { data } = await validateDraft(markdown, repo)
  if (data.contentId !== staged.contentId) throw new Error('Draft identity changed.')
  const branch = `agent/codex/journal-${staged.contentId.replace('journal:', '')}`
  const endpoint = `repos/${REPOSITORY}`
  const prs = api(`${endpoint}/pulls?head=frankxai:${encodeURIComponent(branch)}&state=all`)
  if (prs.length) {
    const existing = prs[0]
    if (existing.state !== 'open' || !existing.draft) throw new Error('Existing PR is closed or ready for review; human action required.')
    const remote = api(`${endpoint}/contents/${staged.file}?ref=${encodeURIComponent(branch)}`)
    if (Buffer.from(remote.content, 'base64').toString('utf8') !== markdown) throw new Error('Existing PR differs; update it through normal reviewed git work.')
    return { status: 'draft', url: existing.html_url, head: existing.head.sha, reused: true }
  }
  const main = api(`${endpoint}/git/ref/heads/main`)
  let ref
  try { ref = api(`${endpoint}/git/ref/heads/${branch}`) }
  catch (error) {
    // A denied/transient read must never be interpreted as an absent branch.
    if (!String(error.stderr || '').includes('HTTP 404')) throw error
  }
  if (!ref) api(`${endpoint}/git/refs`, 'POST', { ref: `refs/heads/${branch}`, sha: main.object.sha })
  let existingFile
  try { existingFile = api(`${endpoint}/contents/${staged.file}?ref=${encodeURIComponent(branch)}`) }
  catch (error) { if (!String(error.stderr || '').includes('HTTP 404')) throw error }
  if (existingFile) {
    if (Buffer.from(existingFile.content, 'base64').toString('utf8') !== markdown) throw new Error('Remote draft conflict; nothing overwritten.')
  } else {
    api(`${endpoint}/contents/${staged.file}`, 'PUT', { branch, message: `content(journal): draft ${data.date}`, content: Buffer.from(markdown).toString('base64') })
  }
  const pr = api(`${endpoint}/pulls`, 'POST', { base: 'main', head: branch, draft: true, title: `Journal draft: ${data.title}`, body: 'Public-safe, lightly edited first-person note. Original and privacy/attribution review remain in the private vault.\n\n`published: false` excludes this note from routes, index, RSS and sitemap. Human approval of the exact revision is required before publication. No auto-merge. Preview absence of a draft is intentional.' })
  return { status: 'draft', url: pr.html_url, head: pr.head.sha, reused: false }
}

async function main() {
  const [command, ...argv] = process.argv.slice(2)
  const args = { directory: process.env.JOURNAL_PRIVATE_DIR }
  for (let i = 0; i < argv.length; i += 2) {
    const flag = argv[i]
    if (!['--source', '--id', '--date'].includes(flag) || !argv[i + 1]) throw new Error('Use capture --source <external file> [--id <stable key>] [--date YYYY-MM-DD], stage --id <key>, or pr --id <key>.')
    args[flag.slice(2)] = argv[i + 1]
  }
  const action = { capture, stage, pr: draftPr }[command]
  if (!action) throw new Error('Commands: capture, stage, pr. Set JOURNAL_PRIVATE_DIR once. Publication is deliberately unavailable.')
  console.log(JSON.stringify(await action(args)))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(() => { console.error('Journal action failed. Check arguments, vault permissions, review hash and GitHub access. Raw content and provider errors are deliberately omitted.'); process.exitCode = 1 })
}
