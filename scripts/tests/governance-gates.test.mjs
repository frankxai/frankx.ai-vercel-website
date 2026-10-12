import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { evaluateSurfaces, matches, parseBriefs } from '../governance/surface-guard.mjs'
import { evaluateFindings } from '../governance/review-gate.mjs'

const registry = {
  surfaces: [
    { id: 'homepage', policy: 'evolve', paths: ['app/page.tsx', 'components/home/**'], jobs: ['identity', 'conversion'] },
    { id: 'brand-tokens', policy: 'locked', paths: ['tailwind.config.js'], jobs: ['visual identity'] },
  ],
}

const brief = (over = {}) => {
  const b = {
    Surface: 'homepage', Kind: 'evolve', Intent: 'Frank, 2026-09-28: "make the hero load faster"',
    Keeps: 'identity: unchanged hero copy and portrait; conversion: same two CTAs in the same order', Changes: 'Hero image moved to next/image with priority',
    Evidence: 'https://preview.example/ before/after LCP 3.1s -> 1.9s', ...over,
  }
  return ['### Surface change brief', ...Object.entries(b).map(([k, v]) => `${k}: ${v}`)].join('\n')
}
const run = (over) => evaluateSurfaces({ registry, baseRegistry: registry, changed: ['app/page.tsx'], body: brief(), labels: [], eventAction: 'opened', approvedBy: 'frankxai', ...over })

test('glob matching covers exact paths, * and **', () => {
  assert.ok(matches('app/page.tsx', 'app/page.tsx'))
  assert.ok(matches('components/home/Hero.tsx', 'components/home/**'))
  assert.ok(matches('components/home/a/b/c.tsx', 'components/home/**'))
  assert.ok(!matches('components/homepage/x.tsx', 'components/home/**'))
  assert.ok(matches('app/pricing/page.tsx', 'app/*/page.tsx'))
  assert.ok(!matches('app/a/b/page.tsx', 'app/*/page.tsx'))
})

test('untouched surfaces pass with no brief', () => {
  assert.deepEqual(run({ changed: ['lib/x.ts'], body: '' }).errors, [])
})

test('touching a protected surface without a brief fails and names the surface and its jobs', () => {
  const { errors } = run({ changed: ['components/home/Hero.tsx'], body: 'just a refactor' })
  assert.match(errors.join('\n'), /homepage/)
  assert.match(errors.join('\n'), /identity, conversion/)
})

test('a complete evolve brief passes', () => {
  assert.deepEqual(run().errors, [])
})

test('a brief must explain every job, fill every field, and not leave placeholders', () => {
  assert.match(run({ body: brief({ Keeps: 'identity: unchanged hero copy' }) }).errors.join('\n'), /conversion/)
  assert.match(run({ body: brief({ Keeps: 'identity, conversion' }) }).errors.join('\n'), /identity/, 'job names alone are not an explanation')
  assert.match(run({ body: brief({ Keeps: 'identity: hero copy removed; conversion: same two CTAs' }) }).errors.join('\n'), /identity/, 'a job described as removed is not kept')
  assert.match(run({ body: brief({ Evidence: '<preview URL>' }) }).errors.join('\n'), /Evidence/)
  assert.match(run({ body: brief({ Kind: 'redesign' }) }).errors.join('\n'), /Kind/)
})

test("rearchitect and locked surfaces need Frank's surface-approved label", () => {
  assert.match(run({ body: brief({ Kind: 'rearchitect' }) }).errors.join('\n'), /surface-approved/)
  assert.deepEqual(run({ body: brief({ Kind: 'rearchitect' }), labels: ['surface-approved'], eventAction: 'labeled' }).errors, [])
  const locked = run({ changed: ['tailwind.config.js'], body: brief({ Surface: 'brand-tokens', Keeps: 'visual identity: same palette and fonts' }) })
  assert.match(locked.errors.join('\n'), /locked/)
})

test("only an approver's label counts: a bot or collaborator applying surface-approved is not Frank", () => {
  const withActor = (approvedBy) => run({ body: brief({ Kind: 'rearchitect' }), labels: ['surface-approved'], eventAction: 'labeled', approvedBy })
  assert.deepEqual(withActor('frankxai').errors, [])
  assert.match(withActor('some-bot[bot]').errors.join('\n'), /frankxai/)
  assert.match(withActor(undefined).errors.join('\n'), /frankxai/, 'unknown actor fails closed')
})

test('an approval older than the head commit is stale on any event, not only synchronize', () => {
  const base = { body: brief({ Kind: 'rearchitect' }), labels: ['surface-approved'], eventAction: 'edited' }
  assert.match(run({ ...base, approvedAt: '2026-09-28T10:00:00Z', headCommittedAt: '2026-09-28T11:00:00Z' }).errors.join('\n'), /earlier head/)
  assert.deepEqual(run({ ...base, approvedAt: '2026-09-28T12:00:00Z', headCommittedAt: '2026-09-28T11:00:00Z' }).errors, [])
})

test('the gate test file is part of the locked governance surface', () => {
  assert.match(run({ changed: ['scripts/tests/governance-gates.test.mjs'], body: '' }).errors.join('\n'), /governance/)
})

test('an approval does not survive new commits: synchronize marks it stale', () => {
  const result = run({ body: brief({ Kind: 'rearchitect' }), labels: ['surface-approved'], eventAction: 'synchronize' })
  assert.equal(result.staleApproval, true)
  assert.match(result.errors.join('\n'), /earlier head/)
})

test('the registry is read from the base branch, so a PR cannot unprotect what it changes', () => {
  const weakened = { surfaces: [] }
  assert.match(evaluateSurfaces({ registry: weakened, baseRegistry: registry, changed: ['app/page.tsx'], body: '', labels: [], eventAction: 'opened' }).errors.join('\n'), /homepage/)
})

test('changing the gates themselves is a locked governance surface once they exist on the base', () => {
  const touched = run({ changed: ['scripts/governance/surface-guard.mjs'], body: '' })
  assert.match(touched.errors.join('\n'), /governance/)
  const bootstrap = evaluateSurfaces({ registry, baseRegistry: null, changed: ['scripts/governance/surface-guard.mjs'], body: '', labels: [], eventAction: 'opened' })
  assert.deepEqual(bootstrap.errors, [], 'the PR that introduces the gates is not blocked by them')
})

test('a brief left inside the template comment does not count', () => {
  assert.match(run({ body: `<!--\n${brief()}\n-->` }).errors.join('\n'), /Add a Surface change brief/)
  assert.match(run({ body: `Notes <!-- never closed\n${brief()}` }).errors.join('\n'), /Add a Surface change brief/, 'GitHub hides everything after an unclosed comment')
  assert.deepEqual(run({ body: 'Strips `<!--` markers.\n\n```html\n<!-- example\n```\n\n' + brief() }).errors, [], 'a marker inside code renders as text')
  assert.match(run({ body: `prose \`\`\` <!--\n${brief()}\n-->` }).errors.join('\n'), /Add a Surface change brief/, 'mid-line backticks are not a fence')
  assert.deepEqual(run({ body: '```\ncode\n````\n\n' + brief() }).errors, [], 'a longer closing fence closes the block')
  assert.match(run({ body: `a \`\`x <!--\` y\n${brief()}\n-->` }).errors.join('\n'), /Add a Surface change brief/, 'unmatched backtick runs are not a code span')
  // CommonMark 0.31.2 §4.5, example 145: a backtick in a backtick fence's info string makes the line inline code.
  assert.match(run({ body: `\`\`\` a\`b\n<!--\n${brief()}\n` }).errors.join('\n'), /Add a Surface change brief/, 'a backtick info string is not a fence, so the comment hides the brief')
  assert.deepEqual(run({ body: '~~~ a`b\n<!-- example\n~~~\n\n' + brief() }).errors, [], 'a tilde fence may carry a backtick in its info string')
})

test('parseBriefs reads several surfaces from one body', () => {
  assert.deepEqual(parseBriefs(`${brief()}\n\n${brief({ Surface: 'brand-tokens' })}`).map((b) => b.Surface), ['homepage', 'brand-tokens'])
})

const bot = 'chatgpt-codex-connector'
const finding = (body, extra = {}) => ({ author: bot, isBot: true, association: 'NONE', body, createdAt: '2026-09-28T10:00:00Z', ...extra })
const reply = (body, extra = {}) => ({ author: 'frankxai', association: 'OWNER', body, createdAt: '2026-09-28T11:00:00Z', ...extra })
const commits = [{ oid: 'a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0', committedDate: '2026-09-28T10:30:00Z' }]
const gate = (threads, topLevel = []) => evaluateFindings({ threads, topLevel, commits, author: 'frankxai' })

test('review gate: unanswered AI findings block; answered or resolved ones pass', () => {
  assert.match(gate([{ isResolved: false, comments: [finding('![P2 Badge] Accept calls without arguments')] }]).join('\n'), /unanswered/)
  assert.deepEqual(gate([{ isResolved: false, comments: [finding('![P2 Badge] x'), reply('Fixed in a1b2c3d.')] }]), [])
  assert.deepEqual(gate([{ isResolved: true, comments: [finding('![P2 Badge] x')] }]), [])
})

test('review gate: a P0/P1 fix reference must be a real PR commit made after the finding', () => {
  const p1 = (text) => [{ isResolved: false, comments: [finding('![P1 Badge] SQL injection in search'), reply(text)] }]
  assert.match(gate(p1('ok')).join('\n'), /P1/)
  assert.match(gate(p1('I disagree that deadbee applies here')).join('\n'), /P1/, 'hex that is not a PR commit')
  assert.deepEqual(gate(p1('Fixed in a1b2c3d, test added.')), [])
  const early = [{ isResolved: false, comments: [finding('![P1 Badge] x', { createdAt: '2026-09-28T12:00:00Z' }), reply('Fixed in a1b2c3d', { createdAt: '2026-09-28T12:30:00Z' })] }]
  assert.match(gate(early).join('\n'), /P1/, 'a commit older than the finding cannot fix it')
  assert.deepEqual(gate(p1('Declined: the query is a fixed allowlist lookup, never interpolated; see lib/search.ts:40.')), [])
})

test('review gate: severity comes from the badge, not from words in the finding', () => {
  const p2MentioningP1 = finding('![P2 Badge] Paginate threads. For a P0/P1 thread the check is stricter.')
  assert.match(gate([{ isResolved: false, comments: [p2MentioningP1] }]).join('\n'), /unanswered/, 'treated as P2')
  const p1MentioningP0 = finding('![P1 Badge] Validate fix references. For a P0/P1 thread any hex passes.')
  assert.match(gate([{ isResolved: false, comments: [p1MentioningP0] }]).join('\n'), /, P1\)/)
})

test('review gate: only the PR author or repo members can answer', () => {
  const outsider = { author: 'drive-by', association: 'NONE', body: 'Declined: this is fine because I say so and nobody checks.', createdAt: '2026-09-28T11:00:00Z' }
  assert.match(gate([{ isResolved: false, comments: [finding('![P2 Badge] x'), outsider] }]).join('\n'), /unanswered/)
  assert.match(gate([{ isResolved: false, comments: [finding('![P1 Badge] x'), outsider] }]).join('\n'), /P1/)
})

test('review gate: severity-marked findings in review bodies or PR comments need their own later answer', () => {
  const top = [finding('![P1 Badge] Rate limit missing on /api/demand', { url: 'https://github.com/o/r/pull/1#issuecomment-11' })]
  assert.match(gate([], top).join('\n'), /P1/)
  assert.deepEqual(gate([], [...top, reply('Re "Rate limit missing on /api/demand": fixed in a1b2c3d with the shared limiter.')]), [], 'quoting the title answers it')
  assert.deepEqual(gate([], [...top, reply('Fixed in a1b2c3d (https://github.com/o/r/pull/1#issuecomment-11).')]), [], 'linking the finding answers it')
  assert.deepEqual(gate([], [finding('Here are some automated review suggestions for this pull request.')]), [], 'boilerplate without a finding is ignored')
})

test('review gate: one generic reply does not answer several top-level findings', () => {
  const top = [
    finding('![P2 Badge] Cache the sitemap', { url: 'u#issuecomment-1' }),
    finding('![P2 Badge] Escape the RSS titles', { url: 'u#issuecomment-2', createdAt: '2026-09-28T10:05:00Z' }),
  ]
  const errors = gate([], [...top, reply('All addressed, thanks!')])
  assert.equal(errors.length, 2)
  assert.deepEqual(gate([], [...top, reply('Cache the sitemap: done in a1b2c3d.'), reply('Escape the RSS titles: declined, titles are already escaped by the feed library.')]), [])
})

test('review gate: each badged section of one review body is its own finding', () => {
  const body = '![P2 Badge] Cache the sitemap\nsome detail\n\n![P1 Badge] Escape user input in search\nmore detail'
  const top = [finding(body, { url: 'u#pullrequestreview-9' })]
  const errors = gate([], [...top, reply('Cache the sitemap: done in a1b2c3d.')])
  assert.equal(errors.length, 1)
  assert.match(errors[0], /P1.*Escape user input/)
  assert.deepEqual(gate([], [...top, reply('Cache the sitemap: done in a1b2c3d.'), reply('Escape user input in search: fixed in a1b2c3d.')]), [])
})

test('review gate: only named AI reviewers are gated, not every bot', () => {
  const dependabot = { author: 'dependabot', isBot: true, association: 'NONE', body: '![P1 Badge] Bumps x from 1 to 2', createdAt: '2026-09-28T10:00:00Z' }
  assert.deepEqual(gate([{ isResolved: false, comments: [dependabot] }], [dependabot]), [])
})

test('review gate: an edited finding needs an answer newer than the edit', () => {
  const edited = finding('![P1 Badge] New problem after edit', { editedAt: '2026-09-28T12:00:00Z' })
  assert.match(gate([{ isResolved: false, comments: [edited, reply('Fixed in a1b2c3d.')] }]).join('\n'), /P1/, 'commit and reply predate the edit')
  const later = reply('Fixed in b2c3d4e.', { createdAt: '2026-09-28T13:00:00Z' })
  const commits2 = [...commits, { oid: 'b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1', committedDate: '2026-09-28T12:30:00Z' }]
  assert.deepEqual(evaluateFindings({ threads: [{ isResolved: false, comments: [edited, later] }], topLevel: [], commits: commits2, author: 'frankxai' }), [])
})

test('review gate: a short finding title can be answered by quoting it exactly', () => {
  const body = '![P2 Badge] Fix XSS\nd\n\n![P2 Badge] Cache the sitemap\nd'
  const top = [finding(body)]
  assert.deepEqual(gate([], [...top, reply('Fix XSS: done in a1b2c3d.'), reply('Cache the sitemap: done in a1b2c3d.')]), [])
})

test('review gate: findings of a dismissed AI review no longer block', () => {
  const dismissed = { isResolved: false, comments: [finding('![P1 Badge] Obsolete finding', { dismissed: true })] }
  assert.deepEqual(gate([dismissed], [finding('![P1 Badge] Obsolete body finding', { dismissed: true })]), [])
})

test('review gate: a thread too long to read completely fails closed', () => {
  const long = { isResolved: false, truncated: true, comments: [finding('![P2 Badge] x'), reply('Fixed in a1b2c3d.')] }
  assert.match(gate([long]).join('\n'), /too long/)
})

test('review gate: a human account named like a reviewer is not a reviewer', () => {
  const impostor = { author: 'claude-fan', isBot: false, association: 'NONE', body: '![P1 Badge] Fake finding', createdAt: '2026-09-28T10:00:00Z' }
  assert.deepEqual(gate([{ isResolved: false, comments: [impostor] }], [impostor]), [])
})

test('review gate: an AI finding posted as a reply inside a thread is evaluated', () => {
  const thread = { isResolved: false, comments: [
    { author: 'someone', isBot: false, association: 'NONE', body: 'question about this line', createdAt: '2026-09-28T09:00:00Z' },
    finding('![P1 Badge] Unbounded loop here', { createdAt: '2026-09-28T10:00:00Z' }),
  ] }
  assert.match(gate([thread]).join('\n'), /P1.*Unbounded loop/)
  thread.comments.push(reply('Fixed in a1b2c3d.'))
  assert.deepEqual(gate([thread]), [])
})

test('review gate: dismissal applies per finding, not per thread', () => {
  const thread = { isResolved: false, comments: [
    finding('![P2 Badge] From a dismissed review', { dismissed: true }),
    finding('![P1 Badge] From an active review', { createdAt: '2026-09-28T10:30:00Z' }),
  ] }
  const errors = gate([thread])
  assert.equal(errors.length, 1)
  assert.match(errors[0], /active review/)
})

test('review gate: with several findings in one thread, each answer must name its finding', () => {
  const thread = { isResolved: false, comments: [
    finding('![P1 Badge] Unbounded loop in parser'),
    finding('![P1 Badge] Missing auth check on export', { createdAt: '2026-09-28T10:10:00Z' }),
    reply('Fixed in a1b2c3d.'),
  ] }
  assert.equal(gate([thread]).length, 2, 'a generic reply names neither')
  thread.comments.push(reply('Unbounded loop in parser: fixed in a1b2c3d.'), reply('Missing auth check on export: fixed in a1b2c3d.'))
  assert.deepEqual(gate([thread]), [])
})

test('review gate: a quoted title must tell the finding apart from siblings that share its opening words', () => {
  const shared = 'Validate the pull request fix references before accepting'
  const thread = { isResolved: false, comments: [
    finding(`![P1 Badge] ${shared} them for P0 findings`),
    finding(`![P1 Badge] ${shared} them for P1 findings`, { createdAt: '2026-09-28T10:10:00Z' }),
    reply(`${shared}: fixed in a1b2c3d.`),
  ] }
  assert.equal(gate([thread]).length, 2, 'the shared prefix names neither finding')
  thread.comments.push(reply(`${shared} them for P0 findings: fixed in a1b2c3d.`))
  assert.equal(gate([thread]).length, 1, 'a full quote answers only its own finding')
  const twins = { isResolved: false, comments: [
    finding('![P1 Badge] Same title twice', { url: 'https://x/pull/1#discussion_r11' }),
    finding('![P1 Badge] Same title twice', { url: 'https://x/pull/1#discussion_r12', createdAt: '2026-09-28T10:10:00Z' }),
    reply('Same title twice: fixed in a1b2c3d.'),
  ] }
  assert.equal(gate([twins]).length, 2, 'identical titles can only be answered by link')
  twins.comments.push(reply('discussion_r11 and discussion_r12: fixed in a1b2c3d.'))
  assert.deepEqual(gate([twins]), [])
})

test('review gate: separate top-level findings with the same opening words need their own answers', () => {
  const shared = 'Validate the pull request fix references before accepting'
  const topLevel = [
    finding(`![P1 Badge] ${shared} them for P0 findings`),
    finding(`![P1 Badge] ${shared} them for P1 findings`, { createdAt: '2026-09-28T10:10:00Z' }),
    reply(`${shared}: fixed in a1b2c3d.`),
  ]
  assert.equal(gate([], topLevel).length, 2, 'one quote of the shared opening answers neither')
  topLevel.push(reply(`${shared} them for P0 findings: fixed in a1b2c3d.`))
  assert.equal(gate([], topLevel).length, 1)
})

test('review gate: a title that prefixes a sibling is answered by quoting it without the longer one', () => {
  const body = '![P1 Badge](https://img.shields.io/badge/P1-orange?style=flat) Validate input\n\ntext\n\n![P1 Badge](https://img.shields.io/badge/P1-orange?style=flat) Validate input before saving the draft\n\ntext'
  const topLevel = [finding(body), reply('Validate input: fixed in a1b2c3d.')]
  assert.equal(gate([], topLevel).length, 1, 'the short title is answered, the longer sibling is not')
})

test('review gate: findings in one review whose titles share 90+ characters can still be answered', () => {
  const long = 'Validate every fix reference against the commits of this pull request before the gate accepts it'
  const body = `![P1 Badge](x) ${long} for P0\n\ntext\n\n![P1 Badge](x) ${long} for P1\n\ntext`
  const topLevel = [finding(body), reply(`${long} for P0 and ${long} for P1: fixed in a1b2c3d.`)]
  assert.deepEqual(gate([], topLevel), [])
  const twins = [finding(`![P1 Badge](x) ${long}\n\n![P1 Badge](x) ${long}`), reply(`${long}: fixed in a1b2c3d.`)]
  assert.deepEqual(gate([], twins), [], 'identical sections of one review have no link, so the title answers them')
})

test('review gate: plain-text badges split a review body into findings too', () => {
  const topLevel = [finding('P2 Badge Rename the helper for clarity\n\nP1 Badge Missing auth check on export route'), reply('Rename the helper for clarity: done in a1b2c3d.')]
  assert.match(gate([], topLevel).join('\n'), /P1\): "P1 Badge Missing auth check/)
})

test('review gate: an answer edited after a revised finding counts from its edit', () => {
  const thread = { isResolved: false, comments: [
    finding('![P2 Badge] Tighten the retry bound', { editedAt: '2026-09-28T12:00:00Z' }),
    reply('Bounded at 3 retries.', { editedAt: '2026-09-28T12:30:00Z' }),
  ] }
  assert.deepEqual(gate([thread]), [])
})

test('review gate: a later finding does not undo an answer given while it did not exist', () => {
  const thread = { isResolved: false, comments: [
    finding('![P2 Badge] Cache key ignores locale'),
    reply('Good catch, keyed by locale now.', { createdAt: '2026-09-28T10:30:00Z' }),
    finding('![P2 Badge] Cache key ignores locale for drafts', { createdAt: '2026-09-28T11:00:00Z' }),
  ] }
  assert.deepEqual(gate([thread]).map((e) => /drafts/.test(e)), [true], 'only the new finding is open')
})

test('review gate: resolving does not cover a finding edited afterwards', () => {
  const edited = { isResolved: true, comments: [finding('![P2 Badge] Changed after resolution', { editedAt: '2026-09-28T12:00:00Z' })] }
  assert.match(gate([edited]).join('\n'), /unanswered/)
})

test('review gate: human threads are left to humans', () => {
  assert.deepEqual(gate([{ isResolved: false, comments: [{ author: 'someone', association: 'NONE', body: 'nit', createdAt: '2026-09-28T10:00:00Z' }] }]), [])
})

test('every protected path matches a tracked file, so a rename cannot silently drop protection', () => {
  const real = JSON.parse(readFileSync(new URL('../../.github/protected-surfaces.json', import.meta.url), 'utf8'))
  const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean)
  const dead = real.surfaces.flatMap((s) => s.paths.filter((p) => !tracked.some((f) => matches(f, p))).map((p) => `${s.id}: ${p}`))
  assert.deepEqual(dead, [])
})

test('the registry protects the homepage like the contract guard, and capture includes its APIs', () => {
  const real = JSON.parse(readFileSync(new URL('../../.github/protected-surfaces.json', import.meta.url), 'utf8'))
  const home = real.surfaces.find((s) => s.id === 'homepage')
  assert.deepEqual(home.paths.slice(0, 2), ['app/page.tsx', 'components/home/**'])
  assert.equal(home.jobs.length, 7)
  const capture = real.surfaces.find((s) => s.id === 'capture')
  for (const api of ['app/api/subscribe/**', 'app/api/demand/**']) assert.ok(capture.paths.includes(api), api)
  const offers = real.surfaces.find((s) => s.id === 'offer-pages')
  for (const p of ['components/foundry/**', 'components/founders-circle/**', 'components/founder-stack/**', 'app/api/studio-inquiry/**', 'app/api/foundry/apply/**', 'app/api/founders-circle/apply/**']) assert.ok(offers.paths.includes(p), p)
  assert.ok(capture.paths.includes('components/newsletter/**'))
  assert.deepEqual(real.approvers, ['frankxai'])
})
