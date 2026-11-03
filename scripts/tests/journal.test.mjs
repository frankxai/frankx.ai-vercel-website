import test, { mock } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { capture, stage, draftPr, hash, privateDirectory, validateDraft } from '../journal-capture.mjs'
import { hasJournalApproval } from '../check-journal-approval.mjs'
import { isPublicJournalData, journalDay, isJournalDate } from '../../lib/journal-policy.ts'
// React 18's Next server cache is supplied by Next; outside Next use identity caching.
mock.module('react', { namedExports: { cache: fn => fn } })

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))
async function fixture(t) {
  const directory = await fs.mkdtemp(path.join(os.homedir(), 'journal-test-'))
  t.after(() => fs.rm(directory, { recursive: true, force: true }))
  const repo = path.join(directory, 'public-repo')
  const vault = path.join(directory, 'private-vault')
  await fs.mkdir(path.join(repo, 'content/journal'), { recursive: true })
  await fs.mkdir(path.join(repo, 'content/blog'), { recursive: true })
  const source = path.join(directory, 'voice-transcript.txt')
  await fs.writeFile(source, 'PRIVATE original transcript. Keep this wording out of Git.')
  return { repo, directory: vault, source }
}
const data = (overrides = {}) => ({ title: 'An afternoon away from the laptops', date: '2026-11-03', kind: 'note', summary: 'A reminder to make time outside.', tags: ['founder-life'], visibility: 'public', published: false, ...overrides })
const draft = (overrides = {}, text = 'Today I spent too much time indoors. I want to make time outside.') => matter.stringify(text, data(overrides))

test('publication is fail closed for omissions, string booleans, private and future notes', () => {
  const publicData = data({ published: true })
  assert.equal(isPublicJournalData(publicData, '2026-11-03'), true)
  for (const bad of [{ published: undefined }, { published: 'true' }, { visibility: undefined }, { visibility: 'private' }, { date: '2026-11-04' }, { date: '2026-02-30' }]) {
    assert.equal(isPublicJournalData({ ...publicData, ...bad }, '2026-11-03'), false)
  }
})

test('Amsterdam day handles UTC boundaries and DST', () => {
  assert.equal(journalDay(new Date('2026-11-02T23:30:00Z')), '2026-11-03')
  assert.equal(journalDay(new Date('2026-07-01T22:30:00Z')), '2026-07-02')
  assert.equal(isJournalDate('2026-02-30'), false)
  assert.equal(isJournalDate('2028-02-29'), true)
})

test('capture retries preserve original bytes, date and identity', async t => {
  const f = await fixture(t)
  const first = await capture({ ...f, date: '2026-11-03' })
  const second = await capture({ ...f, date: '2026-11-03' })
  assert.deepEqual(first, second)
  assert.deepEqual(await fs.readFile(path.join(f.directory, first.id, 'original')), await fs.readFile(f.source))
  if (process.platform !== 'win32') assert.equal((await fs.stat(path.join(f.directory, first.id, 'original'))).mode & 0o777, 0o600)
  await fs.writeFile(f.source, 'Changed source')
  await assert.rejects(capture({ ...f, id: first.id, date: '2026-11-03' }), /differs|conflict/)
})

test('private storage rejects repo paths, symlink escapes, temporary and Git-backed vaults', async t => {
  const f = await fixture(t)
  await assert.rejects(privateDirectory(path.join(f.repo, 'private'), f.repo), /outside/)
  await fs.symlink(f.repo, path.join(path.dirname(f.repo), 'repo-link'))
  await assert.rejects(privateDirectory(path.join(path.dirname(f.repo), 'repo-link', 'private'), f.repo), /outside/)
  const gitVault = path.join(path.dirname(f.repo), 'git-vault')
  await fs.mkdir(path.join(gitVault, '.git'), { recursive: true })
  await assert.rejects(privateDirectory(path.join(gitVault, 'notes'), f.repo), /every Git/)
  await assert.rejects(privateDirectory(path.join(os.tmpdir(), 'journal-private'), f.repo), /temporary/)
})

test('capture refuses raw notes already inside the public repository', async t => {
  const f = await fixture(t)
  const source = path.join(f.repo, 'raw.txt')
  await fs.writeFile(source, 'Synthetic private note')
  await assert.rejects(capture({ ...f, source }), /outside the public/)
})

test('a capture-key symlink cannot redirect original bytes into a public directory', async t => {
  const f = await fixture(t)
  await privateDirectory(f.directory, f.repo)
  await fs.symlink(f.repo, path.join(f.directory, 'malicious-key'))
  await assert.rejects(capture({ ...f, id: 'malicious-key' }), /symlinks/)
  await assert.rejects(fs.access(path.join(f.repo, 'original')))
})

test('review gate binds privacy and attribution decisions to exact draft bytes', async t => {
  const f = await fixture(t)
  const result = await capture({ ...f, date: '2026-11-03' })
  const record = path.join(f.directory, result.id)
  const markdown = draft({ contentId: result.contentId, topicHubs: ['human-layer'] })
  await fs.writeFile(path.join(record, 'draft.md'), markdown)
  await fs.writeFile(path.join(record, 'review.json'), JSON.stringify({ candidateHash: hash(markdown), privacy: 'accept', attribution: 'blocked', reviewer: 'test' }))
  await assert.rejects(stage({ ...f, id: result.id }), /review must accept/)
  await fs.writeFile(path.join(record, 'review.json'), JSON.stringify({ candidateHash: hash(markdown), privacy: 'accept', attribution: 'accept', reviewer: 'test' }))
  const first = await stage({ ...f, id: result.id })
  assert.deepEqual(await stage({ ...f, id: result.id }), first)
  const exported = await fs.readFile(path.join(f.repo, first.file), 'utf8')
  assert.equal(matter(exported).data.published, false)
  assert.equal(exported.includes('PRIVATE'), false)
  assert.equal(exported.includes(f.directory), false)
  assert.equal(exported.includes(hash(await fs.readFile(f.source))), false)
  await fs.appendFile(path.join(record, 'draft.md'), '\nAn unreviewed sentence.')
  await assert.rejects(stage({ ...f, id: result.id }), /exact draft bytes/)
})

test('public export blocks private metadata, credentials and executable MDX', async t => {
  const f = await fixture(t)
  for (const markdown of [draft({ published: true }), draft({ visibility: 'private' }), draft({ sourceHash: 'private' }), draft({}, 'Email me at private@example.com.'), draft({}, '{process.env.SECRET}'), draft({}, '<script>alert(1)</script>')]) {
    await assert.rejects(validateDraft(markdown, f.repo))
  }
  await assert.rejects(validateDraft(draft({ topicHubs: ['invented'] }), f.repo), /hub/)
  await assert.rejects(validateDraft(draft({ relatedArticles: ['missing'] }), f.repo))
  assert.ok(await validateDraft(draft(), f.repo))
})

test('all journal consumers receive only the same public entries', async t => {
  const f = await fixture(t)
  const originals = process.cwd()
  await fs.writeFile(path.join(f.repo, 'content/journal/live.md'), draft({ published: true, date: '2020-01-01' }))
  await fs.writeFile(path.join(f.repo, 'content/journal/unpublished.md'), draft({ date: '2020-01-01' }))
  await fs.writeFile(path.join(f.repo, 'content/journal/private.md'), draft({ visibility: 'private', published: true, date: '2020-01-01' }))
  await fs.writeFile(path.join(f.repo, 'content/journal/missing-flag.md'), draft({ date: '2020-01-01' }).replace('published: false\n', ''))
  await fs.writeFile(path.join(f.repo, 'content/journal/future.md'), draft({ published: true, date: '2999-01-01' }))
  process.chdir(f.repo)
  try {
    const { getJournalEntries, getJournalEntry, getJournalEntrySummaries, getAdjacentJournalEntries } = await import('../../lib/journal.ts?loader-fixture')
    assert.deepEqual(getJournalEntries().map(e => e.slug), ['live'])
    assert.deepEqual(getJournalEntrySummaries().map(e => e.slug), ['live'])
    for (const slug of ['unpublished', 'private', 'missing-flag', 'future']) assert.equal(getJournalEntry(slug), null)
    assert.deepEqual(getAdjacentJournalEntries('live'), { newer: null, older: null })
  } finally { process.chdir(originals) }
})

test('publication approval rejects bots, other users and stale revisions', () => {
  const head = 'a'.repeat(40)
  const comment = { user: { login: 'frankxai', type: 'User' }, body: `approve founder journal publication ${head}` }
  assert.equal(hasJournalApproval([comment], head), true)
  assert.equal(hasJournalApproval([comment], 'b'.repeat(40)), false)
  assert.equal(hasJournalApproval([{ ...comment, user: { login: 'frankxai', type: 'Bot' } }], head), false)
  assert.equal(hasJournalApproval([{ ...comment, user: { login: 'someone-else', type: 'User' } }], head), false)
})

test('draft PR retries reuse the same branch and PR; provider denial causes no writes', async t => {
  const f = await fixture(t)
  const result = await capture({ ...f, date: '2026-11-03' })
  const record = path.join(f.directory, result.id)
  const markdown = draft({ contentId: result.contentId })
  await fs.writeFile(path.join(record, 'draft.md'), markdown)
  await fs.writeFile(path.join(record, 'review.json'), JSON.stringify({ candidateHash: hash(markdown), privacy: 'accept', attribution: 'accept', reviewer: 'test' }))
  await stage({ ...f, id: result.id })
  const calls = []
  const api = (endpoint, method = 'GET') => {
    calls.push({ endpoint, method })
    if (endpoint.includes('/pulls?')) return [{ state: 'open', draft: true, html_url: 'https://github.com/example/repo/pull/1', head: { sha: 'a'.repeat(40) } }]
    return { content: Buffer.from(markdown).toString('base64') }
  }
  assert.equal((await draftPr({ ...f, id: result.id, api })).reused, true)
  assert.equal((await draftPr({ ...f, id: result.id, api })).reused, true)
  assert.ok(calls.every(call => call.method === 'GET'))
  const denied = () => { throw Object.assign(new Error('Denied'), { stderr: 'HTTP 403' }) }
  await assert.rejects(draftPr({ ...f, id: result.id, api: denied }), /Denied/)
})

test('scaffold --private fails before any repository write', () => {
  assert.throws(() => execFileSync(process.execPath, [path.join(repoRoot, 'scripts/new-journal-entry.mjs'), 'Synthetic private note', '--private'], { stdio: 'pipe' }), /Command failed/)
})

test('new scaffolds are unpublished and cannot overwrite a same-day draft', async t => {
  const f = await fixture(t)
  await fs.mkdir(path.join(f.repo, 'scripts'))
  await fs.mkdir(path.join(f.repo, 'lib'))
  await fs.copyFile(path.join(repoRoot, 'scripts/new-journal-entry.mjs'), path.join(f.repo, 'scripts/new-journal-entry.mjs'))
  await fs.copyFile(path.join(repoRoot, 'lib/journal-policy.ts'), path.join(f.repo, 'lib/journal-policy.ts'))
  const command = [path.join(f.repo, 'scripts/new-journal-entry.mjs'), 'A "quoted" title', '--date', '2026-11-03']
  execFileSync(process.execPath, command, { stdio: 'pipe' })
  const [filename] = await fs.readdir(path.join(f.repo, 'content/journal'))
  const markdown = await fs.readFile(path.join(f.repo, 'content/journal', filename), 'utf8')
  assert.equal(matter(markdown).data.published, false)
  assert.equal(matter(markdown).data.title, 'A "quoted" title')
  assert.throws(() => execFileSync(process.execPath, command, { stdio: 'pipe' }))
  assert.equal(await fs.readFile(path.join(f.repo, 'content/journal', filename), 'utf8'), markdown)
})

test('first PR creation exports one public file on a stable branch with draft:true', async t => {
  const f = await fixture(t)
  const result = await capture({ ...f, date: '2026-11-03' })
  const record = path.join(f.directory, result.id)
  const markdown = draft({ contentId: result.contentId })
  await fs.writeFile(path.join(record, 'draft.md'), markdown)
  await fs.writeFile(path.join(record, 'review.json'), JSON.stringify({ candidateHash: hash(markdown), privacy: 'accept', attribution: 'accept', reviewer: 'test' }))
  await stage({ ...f, id: result.id })
  const writes = []
  let pr, remote, ref
  const missing = () => { throw Object.assign(new Error('Not found'), { stderr: 'HTTP 404' }) }
  const api = (endpoint, method = 'GET', body) => {
    if (method !== 'GET') writes.push({ endpoint, body })
    if (endpoint.includes('/pulls?')) return pr ? [pr] : []
    if (endpoint.endsWith('/git/ref/heads/main')) return { object: { sha: 'b'.repeat(40) } }
    if (endpoint.includes('/git/ref/heads/')) return ref || missing()
    if (endpoint.endsWith('/git/refs')) return (ref = { object: { sha: body.sha } })
    if (endpoint.includes('/contents/')) {
      if (method === 'PUT') return (remote = { content: body.content })
      return remote || missing()
    }
    if (endpoint.endsWith('/pulls') && method === 'POST') {
      assert.equal(body.draft, true)
      return (pr = { draft: true, state: 'open', html_url: 'https://github.com/example/repo/pull/2', head: { sha: 'a'.repeat(40) } })
    }
    throw new Error('Unexpected API request')
  }
  assert.equal((await draftPr({ ...f, id: result.id, api })).reused, false)
  assert.equal((await draftPr({ ...f, id: result.id, api })).reused, true)
  assert.equal(writes.length, 3)
  assert.equal(Buffer.from(remote.content, 'base64').toString('utf8'), markdown)
  assert.ok(!JSON.stringify(writes).includes(f.directory))
  assert.ok(!JSON.stringify(writes).includes(result.id))
})
