import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const script = path.join(root, 'scripts/should-deploy.sh')

function run(env, cwd = root) {
  return spawnSync('bash', [script], {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      VERCEL_GIT_PULL_REQUEST_ID: '',
      VERCEL_GIT_COMMIT_SHA: '',
      VERCEL_GIT_PREVIOUS_SHA: '',
      VERCEL_GIT_REPO_OWNER: '',
      VERCEL_GIT_REPO_SLUG: '',
      ...env,
    },
  })
}

function fixture(t) {
  const dir = mkdtempSync(path.join(tmpdir(), 'frankx-vercel-history-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  const git = (...args) => {
    const result = spawnSync('git', args, { cwd: dir, encoding: 'utf8' })
    assert.equal(result.status, 0, result.stderr)
    return result.stdout.trim()
  }
  git('init')
  git('config', 'user.name', 'Contract Test')
  git('config', 'user.email', 'contract@example.invalid')
  const commit = (file, content, message = 'fixture change') => {
    mkdirSync(path.dirname(path.join(dir, file)), { recursive: true })
    writeFileSync(path.join(dir, file), content)
    git('add', file)
    git('commit', '-m', message)
    return git('rev-parse', 'HEAD')
  }
  return { dir, git, commit }
}

test('workspace security and lifecycle configuration triggers a preview build', (t) => {
  const { dir, commit } = fixture(t)
  commit('README.md', 'baseline\n')
  commit('pnpm-workspace.yaml', "allowBuilds:\n  'sharp@0.34.5': true\n")
  const result = run({ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_MESSAGE: 'dependency policy change' }, dir)
  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Relevant changes detected/)
})

test('a requested same-commit redeploy takes precedence over agent-wip', (t) => {
  const { dir, commit } = fixture(t)
  const sha = commit('README.md', 'baseline\n', '[agent-wip] checkpoint')
  const result = run({
    VERCEL_ENV: 'preview',
    VERCEL_GIT_COMMIT_SHA: sha,
    VERCEL_GIT_PREVIOUS_SHA: sha,
    VERCEL_GIT_COMMIT_MESSAGE: '[agent-wip] checkpoint',
  }, dir)
  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Manual redeploy/)
})

test('an explicit unavailable deployment base cannot fall back to a docs-only parent', (t) => {
  const { dir, commit } = fixture(t)
  commit('app/page.tsx', 'runtime change\n')
  commit('README.md', 'docs after runtime change\n')
  const result = run({
    VERCEL_ENV: 'preview',
    VERCEL_GIT_PREVIOUS_SHA: 'ffffffffffffffffffffffffffffffffffffffff',
    VERCEL_GIT_COMMIT_MESSAGE: 'docs after runtime change',
  }, dir)
  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Previous deployment commit is unavailable/)
})

test('a known previous deployment includes relevant changes before the latest docs commit', (t) => {
  const { dir, commit } = fixture(t)
  const previous = commit('README.md', 'baseline\n')
  commit('app/page.tsx', 'runtime change\n')
  commit('README.md', 'later docs\n')
  const result = run({
    VERCEL_ENV: 'preview',
    VERCEL_GIT_PREVIOUS_SHA: previous,
    VERCEL_GIT_COMMIT_MESSAGE: 'later docs',
  }, dir)
  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Relevant changes detected/)
})

test('a docs-only preview retains the inexpensive skip path', (t) => {
  const { dir, commit } = fixture(t)
  commit('README.md', 'baseline\n')
  commit('README.md', 'edited docs\n')
  const result = run({ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_MESSAGE: 'edited docs' }, dir)
  assert.equal(result.status, 0, result.stdout + result.stderr)
  assert.match(result.stdout, /No relevant paths changed/)
})

test('a first preview without a parent proceeds', (t) => {
  const { dir, commit } = fixture(t)
  commit('README.md', 'first commit\n')
  const result = run({ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_MESSAGE: 'first commit' }, dir)
  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /No base commit available/)
})

test('Vercel ignore command is valid Bash', () => {
  const result = spawnSync('bash', ['-n', script], { encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr)
})

test('production always builds even when the commit is marked agent-wip', () => {
  const result = run({
    VERCEL_ENV: 'production',
    VERCEL_GIT_COMMIT_MESSAGE: '[agent-wip] checkpoint',
  })
  assert.equal(result.status, 1)
  assert.match(result.stdout, /Production deployment/)
})

test('preview agent-wip checkpoints are skipped before a PR exists', () => {
  const result = run({
    VERCEL_ENV: 'preview',
    VERCEL_GIT_COMMIT_MESSAGE: '[agent-wip] checkpoint',
  })
  assert.equal(result.status, 0)
  assert.match(result.stdout, /SKIPPING build/)
})

test('the first coherent commit after agent-wip is forced to build', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'frankx-vercel-guard-'))

  try {
    const git = (...args) =>
      spawnSync('git', args, { cwd: dir, encoding: 'utf8' })

    assert.equal(git('init').status, 0)
    assert.equal(git('config', 'user.name', 'Contract Test').status, 0)
    assert.equal(git('config', 'user.email', 'contract@example.invalid').status, 0)

    writeFileSync(path.join(dir, 'fixture.txt'), 'wip\n')
    assert.equal(git('add', 'fixture.txt').status, 0)
    assert.equal(git('commit', '-m', '[agent-wip] checkpoint').status, 0)

    writeFileSync(path.join(dir, 'fixture.txt'), 'coherent\n')
    assert.equal(git('add', 'fixture.txt').status, 0)
    assert.equal(git('commit', '-m', 'fix: coherent checkpoint').status, 0)

    const result = run(
      {
        VERCEL_ENV: 'preview',
        VERCEL_GIT_COMMIT_MESSAGE: 'fix: coherent checkpoint',
      },
      dir,
    )

    assert.equal(result.status, 1)
    assert.match(result.stdout, /follows \[agent-wip\]/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

// The branch-vs-main skip is only worth anything if it fires inside Vercel's
// shallow preview clone, where origin/main does not resolve. Measured
// 2026-09-07: 0 of the previous 20 preview deployments were skipped.
function remoteFixture(t) {
  const { dir, git, commit } = fixture(t)
  const bare = mkdtempSync(path.join(tmpdir(), 'frankx-vercel-remote-'))
  t.after(() => rmSync(bare, { recursive: true, force: true }))
  assert.equal(spawnSync('git', ['init', '--bare', '-b', 'main', bare]).status, 0)
  git('branch', '-M', 'main')
  // file:// forces the smart protocol, which is what supports --depth.
  git('remote', 'add', 'origin', `file://${bare.split(path.sep).join('/')}`)
  return { dir, git, commit, bare }
}

test('a branch matching main is skipped even when origin/main is absent', (t) => {
  const { dir, git, commit } = remoteFixture(t)
  commit('app/page.tsx', 'export default function Page() {}\n')
  git('push', 'origin', 'main')
  git('checkout', '-b', 'agent/claude/no-op')
  commit('docs/notes.md', 'internal only\n')
  // Vercel's clone has no remote-tracking main; the guard must fetch one.
  git('update-ref', '-d', 'refs/remotes/origin/main')

  const result = run(
    { VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'agent/claude/no-op' },
    dir,
  )

  assert.equal(result.status, 0, result.stdout + result.stderr)
  assert.match(result.stdout, /no relevant diff against main \(FETCH_HEAD\)/)
})

test('a branch that changes rendered output still builds', (t) => {
  const { dir, git, commit } = remoteFixture(t)
  commit('app/page.tsx', 'export default function Page() {}\n')
  git('push', 'origin', 'main')
  git('checkout', '-b', 'agent/claude/real-change')
  commit('app/page.tsx', 'export default function Page() { return null }\n')
  git('update-ref', '-d', 'refs/remotes/origin/main')

  const result = run(
    { VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'agent/claude/real-change' },
    dir,
  )

  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Relevant changes detected/)
})

test('an unreachable main falls through to the base-SHA diff instead of skipping', (t) => {
  const { dir, commit, git } = fixture(t)
  commit('app/page.tsx', 'export default function Page() {}\n')
  commit('app/page.tsx', 'export default function Page() { return null }\n')
  git('remote', 'add', 'origin', 'file:///frankx/does/not/exist')

  const result = run(
    { VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'agent/claude/offline' },
    dir,
  )

  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /main not reachable for branch comparison/)
})

test('production is never skipped by the branch comparison', (t) => {
  const { dir, git, commit } = remoteFixture(t)
  commit('app/page.tsx', 'export default function Page() {}\n')
  git('push', 'origin', 'main')

  const result = run(
    { VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'agent/claude/whatever' },
    dir,
  )

  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Production deployment/)
})
