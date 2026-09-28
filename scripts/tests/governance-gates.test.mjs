import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { evaluateSurfaces, matches, parseBriefs } from '../governance/surface-guard.mjs'
import { evaluateThreads } from '../governance/review-gate.mjs'

const registry = {
  surfaces: [
    { id: 'homepage', policy: 'evolve', paths: ['app/page.tsx', 'components/home/**'], jobs: ['identity', 'conversion'] },
    { id: 'brand-tokens', policy: 'locked', paths: ['tailwind.config.js'], jobs: ['visual identity'] },
  ],
}

const brief = (over = {}) => {
  const b = {
    Surface: 'homepage', Kind: 'evolve', Intent: 'Frank, 2026-09-28: "make the hero load faster"',
    Keeps: 'identity: unchanged hero copy; conversion: same two CTAs', Changes: 'Hero image moved to next/image with priority',
    Evidence: 'https://preview.example/ before/after LCP 3.1s -> 1.9s', ...over,
  }
  return ['### Surface change brief', ...Object.entries(b).map(([k, v]) => `${k}: ${v}`)].join('\n')
}

test('glob matching covers exact paths, * and **', () => {
  assert.ok(matches('app/page.tsx', 'app/page.tsx'))
  assert.ok(matches('components/home/Hero.tsx', 'components/home/**'))
  assert.ok(matches('components/home/a/b/c.tsx', 'components/home/**'))
  assert.ok(!matches('components/homepage/x.tsx', 'components/home/**'))
  assert.ok(matches('app/pricing/page.tsx', 'app/*/page.tsx'))
  assert.ok(!matches('app/a/b/page.tsx', 'app/*/page.tsx'))
})

test('untouched surfaces pass with no brief', () => {
  assert.deepEqual(evaluateSurfaces({ registry, changed: ['lib/x.ts'], body: '', labels: [] }).errors, [])
})

test('touching a protected surface without a brief fails and names the surface and its jobs', () => {
  const { errors } = evaluateSurfaces({ registry, changed: ['components/home/Hero.tsx'], body: 'just a refactor', labels: [] })
  assert.match(errors.join('\n'), /homepage/)
  assert.match(errors.join('\n'), /identity, conversion/)
})

test('a complete evolve brief passes', () => {
  assert.deepEqual(evaluateSurfaces({ registry, changed: ['app/page.tsx'], body: brief(), labels: [] }).errors, [])
})

test('a brief must address every job, fill every field, and not leave template placeholders', () => {
  const missingJob = evaluateSurfaces({ registry, changed: ['app/page.tsx'], body: brief({ Keeps: 'identity: same' }), labels: [] })
  assert.match(missingJob.errors.join('\n'), /conversion/)
  const placeholder = evaluateSurfaces({ registry, changed: ['app/page.tsx'], body: brief({ Evidence: '<preview URL>' }), labels: [] })
  assert.match(placeholder.errors.join('\n'), /Evidence/)
  const badKind = evaluateSurfaces({ registry, changed: ['app/page.tsx'], body: brief({ Kind: 'redesign' }), labels: [] })
  assert.match(badKind.errors.join('\n'), /Kind/)
})

test('rearchitect and locked surfaces need Frank\'s surface-approved label', () => {
  const re = evaluateSurfaces({ registry, changed: ['app/page.tsx'], body: brief({ Kind: 'rearchitect' }), labels: [] })
  assert.match(re.errors.join('\n'), /surface-approved/)
  assert.deepEqual(evaluateSurfaces({ registry, changed: ['app/page.tsx'], body: brief({ Kind: 'rearchitect' }), labels: ['surface-approved'] }).errors, [])
  const locked = evaluateSurfaces({ registry, changed: ['tailwind.config.js'], body: brief({ Surface: 'brand-tokens', Keeps: 'visual identity: same palette' }), labels: [] })
  assert.match(locked.errors.join('\n'), /locked/)
})

test('a brief left inside the template comment does not count', () => {
  const { errors } = evaluateSurfaces({ registry, changed: ['app/page.tsx'], body: `<!--\n${brief()}\n-->`, labels: [] })
  assert.match(errors.join('\n'), /Add a Surface change brief/)
})

test('parseBriefs reads several surfaces from one body', () => {
  const body = `${brief()}\n\n${brief({ Surface: 'brand-tokens' })}`
  assert.deepEqual(parseBriefs(body).map((b) => b.Surface), ['homepage', 'brand-tokens'])
})

const bot = 'chatgpt-codex-connector'
const thread = (over = {}) => ({ isResolved: false, comments: [{ author: bot, body: '![P2 Badge] Accept calls without arguments' }], ...over })

test('review gate: unanswered AI findings block; answered ones pass', () => {
  assert.match(evaluateThreads([thread()], { author: 'frankxai' }).join('\n'), /unanswered/)
  const answered = thread({ comments: [...thread().comments, { author: 'frankxai', body: 'Fixed in 5b0f500 with a regression test.' }] })
  assert.deepEqual(evaluateThreads([answered], { author: 'frankxai' }), [])
  assert.deepEqual(evaluateThreads([thread({ isResolved: true })], { author: 'frankxai' }), [])
})

test('review gate: P0/P1 findings need a fix commit or a reasoned decline, not just any reply', () => {
  const p1 = (reply) => thread({ comments: [{ author: bot, body: '![P1 Badge] SQL injection in search' }, { author: 'frankxai', body: reply }] })
  assert.match(evaluateThreads([p1('ok')], { author: 'frankxai' }).join('\n'), /P1/)
  assert.deepEqual(evaluateThreads([p1('Fixed in a1b2c3d, test added.')], { author: 'frankxai' }), [])
  assert.deepEqual(evaluateThreads([p1('Declined: the query is a fixed allowlist lookup, never interpolated; see lib/search.ts:40.')], { author: 'frankxai' }), [])
})

test('review gate: human threads are left to humans', () => {
  assert.deepEqual(evaluateThreads([{ isResolved: false, comments: [{ author: 'someone', body: 'nit' }] }], { author: 'frankxai' }), [])
})

test('every protected path matches a tracked file, so a rename cannot silently drop protection', () => {
  const real = JSON.parse(readFileSync(new URL('../../.github/protected-surfaces.json', import.meta.url), 'utf8'))
  const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean)
  const dead = real.surfaces.flatMap((s) => s.paths.filter((p) => !tracked.some((f) => matches(f, p))).map((p) => `${s.id}: ${p}`))
  assert.deepEqual(dead, [])
})

test('the registry protects the homepage exactly as the existing contract guard does', () => {
  const real = JSON.parse(readFileSync(new URL('../../.github/protected-surfaces.json', import.meta.url), 'utf8'))
  const home = real.surfaces.find((s) => s.id === 'homepage')
  assert.deepEqual(home.paths.slice(0, 2), ['app/page.tsx', 'components/home/**'])
  assert.equal(home.jobs.length, 7)
})
