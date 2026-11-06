import assert from 'node:assert/strict'
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const script = path.join(root, 'scripts/should-deploy.sh')

function getBashCommand() {
  if (process.platform === 'win32') {
    const gitBash = path.join(process.env.ProgramFiles || 'C:\\Program Files', 'Git\\bin\\bash.exe')
    if (existsSync(gitBash)) return gitBash
    const gitUsrBash = path.join(
      process.env.ProgramFiles || 'C:\\Program Files',
      'Git\\usr\\bin\\bash.exe',
    )
    if (existsSync(gitUsrBash)) return gitUsrBash
  }
  return 'bash'
}

const curlDir = mkdtempSync(path.join(tmpdir(), 'frankx-vercel-curl-'))
const curlFixture = path.join(curlDir, 'curl')
writeFileSync(
  curlFixture,
  '#!/usr/bin/env bash\nprintf "%s\\n" "$@" > "${CURL_LOG:-/dev/null}"\nprintf "%s" "${CURL_REPLY:-[]}"\nexit "${CURL_EXIT:-0}"\n',
)
chmodSync(curlFixture, 0o755)
test.after(() => rmSync(curlDir, { recursive: true, force: true }))

function run(env, cwd = root) {
  const bashCmd = getBashCommand()
  const scriptArg = process.platform === 'win32' ? script.replace(/\\/g, '/') : script
  return spawnSync(bashCmd, [scriptArg], {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      VERCEL_GIT_PULL_REQUEST_ID: '',
      VERCEL_GIT_COMMIT_SHA: '',
      VERCEL_GIT_PREVIOUS_SHA: '',
      VERCEL_GIT_REPO_OWNER: 'frankxai',
      VERCEL_GIT_REPO_SLUG: 'frankx.ai-vercel-website',
      VERCEL_GIT_COMMIT_REF: 'feature/guard-fixture',
      VERCEL_GIT_COMMIT_MESSAGE: '',
      VERCEL_ENV: 'preview',
      CURL_REPLY: '[{"state":"open","draft":false}]',
      CURL_EXIT: '0',
      PATH: `${curlDir}${path.delimiter}${process.env.PATH || ''}`,
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
  const result = run(
    { VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_MESSAGE: 'dependency policy change' },
    dir,
  )
  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Relevant changes detected/)
})

test('a requested same-commit redeploy takes precedence over agent-wip', (t) => {
  const { dir, commit } = fixture(t)
  const sha = commit('README.md', 'baseline\n', '[agent-wip] checkpoint')
  const result = run(
    {
      VERCEL_ENV: 'preview',
      VERCEL_GIT_COMMIT_SHA: sha,
      VERCEL_GIT_PREVIOUS_SHA: sha,
      VERCEL_GIT_COMMIT_MESSAGE: '[agent-wip] checkpoint',
    },
    dir,
  )
  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Manual redeploy/)
})

test('an explicit unavailable deployment base cannot fall back to a docs-only parent', (t) => {
  const { dir, commit } = fixture(t)
  commit('app/page.tsx', 'runtime change\n')
  commit('README.md', 'docs after runtime change\n')
  const result = run(
    {
      VERCEL_ENV: 'preview',
      VERCEL_GIT_PREVIOUS_SHA: 'ffffffffffffffffffffffffffffffffffffffff',
      VERCEL_GIT_COMMIT_MESSAGE: 'docs after runtime change',
    },
    dir,
  )
  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Previous deployment commit is unavailable/)
})

test('a known previous deployment includes relevant changes before the latest docs commit', (t) => {
  const { dir, commit } = fixture(t)
  const previous = commit('README.md', 'baseline\n')
  commit('app/page.tsx', 'runtime change\n')
  commit('README.md', 'later docs\n')
  const result = run(
    {
      VERCEL_ENV: 'preview',
      VERCEL_GIT_PREVIOUS_SHA: previous,
      VERCEL_GIT_COMMIT_MESSAGE: 'later docs',
    },
    dir,
  )
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
  const bashCmd = getBashCommand()
  const scriptArg = process.platform === 'win32' ? script.replace(/\\/g, '/') : script
  const result = spawnSync(bashCmd, ['-n', scriptArg], { encoding: 'utf8' })
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
  assert.match(result.stdout, /checkpoint.*SKIPPING/)
})

test('the first coherent commit after agent-wip is forced to build', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'frankx-vercel-guard-'))

  try {
    const git = (...args) => spawnSync('git', args, { cwd: dir, encoding: 'utf8' })

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

  const result = run({ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'agent/claude/no-op' }, dir)

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

  const result = run({ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'agent/claude/offline' }, dir)

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

// This guard used to scan the whole commit body, so a commit that merely
// described the marker matched it. Measured 2026-09-08 on
// starlight-intelligence-web, which had been given a copy of this file: commit
// f0abfcb explained what [agent-wip] does and deployment
// dpl_DFrAVq1r2rpZkTpQtiKgz9U4orcc was cancelled in 3.3 seconds by this check.
// The failure runs toward NOT building, which is the direction that ships stale.
test('a commit that only describes the marker in its body still builds', (t) => {
  const { dir, commit } = fixture(t)
  commit('app/page.tsx', 'export default function Page() {}\n')
  commit('app/page.tsx', 'export default function Page() { return null }\n')

  const result = run(
    {
      VERCEL_ENV: 'preview',
      VERCEL_GIT_COMMIT_MESSAGE:
        'fix(vercel): give the ignore step filters that can skip a preview\n\n' +
        'should-deploy.sh covered two cases: production always builds, [agent-wip]\n' +
        'always skips. Every other preview built.\n',
    },
    dir,
  )

  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Relevant changes detected/)
})

test('the marker in the subject still skips', (t) => {
  const { dir, commit } = fixture(t)
  commit('app/page.tsx', 'export default function Page() {}\n')

  const result = run(
    {
      VERCEL_ENV: 'preview',
      VERCEL_GIT_COMMIT_MESSAGE: '[agent-wip] checkpoint\n\nbody text\n',
    },
    dir,
  )

  assert.equal(result.status, 0, result.stdout + result.stderr)
  assert.match(result.stdout, /agent-wip/)
})

test('a parent that only describes the marker does not force a build', (t) => {
  const { dir, commit } = fixture(t)
  commit('app/page.tsx', 'export default function Page() {}\n')
  commit(
    'docs/notes.md',
    'first\n',
    'docs: record the checkpoint convention\n\nExplains how [agent-wip] works.',
  )
  commit('docs/notes.md', 'second\n', 'docs: more notes')

  const result = run({ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_MESSAGE: 'docs: more notes' }, dir)

  assert.equal(result.status, 0, result.stdout + result.stderr)
  assert.match(result.stdout, /No relevant paths changed/)
})

function readyChange(t) {
  const f = fixture(t)
  f.commit('README.md', 'baseline\n')
  f.commit('app/page.tsx', 'export default function Page() { return null }\n')
  return f
}

test('unknown refs and main always build, including a checkpoint', () => {
  for (const ref of ['', 'main']) {
    const result = run({
      VERCEL_GIT_COMMIT_REF: ref,
      VERCEL_GIT_COMMIT_MESSAGE: '[agent-wip] checkpoint',
      CURL_REPLY: '[]',
    })
    assert.equal(result.status, 1, result.stdout + result.stderr)
  }
})

test('agent work with a valid ready PR builds relevant changes', (t) => {
  const { dir } = readyChange(t)
  const result = run({ VERCEL_GIT_COMMIT_REF: 'agent/codex/ready' }, dir)
  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /Relevant changes detected/)
})

test('draft readiness is read only from the top-level PR fields', (t) => {
  const { dir } = readyChange(t)
  const result = run(
    {
      VERCEL_GIT_COMMIT_REF: 'agent/codex/draft',
      CURL_REPLY: '[{"state":"open","draft":true,"nested":{"draft":false}}]',
    },
    dir,
  )
  assert.equal(result.status, 0, result.stdout + result.stderr)
  assert.match(result.stdout, /PR is a draft/)
})

for (const [name, reply] of [
  ['nested-only draft', '[{"state":"open","nested":{"draft":false}}]'],
  ['closed PR', '[{"state":"closed","draft":false}]'],
  ['missing state', '[{"draft":false}]'],
  ['non-boolean draft', '[{"state":"open","draft":"false"}]'],
  ['malformed JSON', '[{"draft":false}'],
  ['invalid top-level shape', '{"state":"open","draft":false}'],
]) {
  test(`an agent preview cannot infer readiness from ${name}`, (t) => {
    const { dir } = readyChange(t)
    const result = run({ VERCEL_GIT_COMMIT_REF: 'agent/codex/unconfirmed', CURL_REPLY: reply }, dir)
    assert.equal(result.status, 0, result.stdout + result.stderr)
    assert.match(result.stdout, /without a confirmed ready PR/)
  })
}

test('a failed curl cannot establish readiness from partial output', (t) => {
  const { dir } = readyChange(t)
  const result = run(
    {
      VERCEL_GIT_COMMIT_REF: 'agent/codex/network-error',
      CURL_REPLY: '[{"state":"open","draft":false}]',
      CURL_EXIT: '22',
    },
    dir,
  )
  assert.equal(result.status, 0, result.stdout + result.stderr)
  assert.match(result.stdout, /without a confirmed ready PR/)
})

test('direct PR lookup validates open state and draft type', (t) => {
  const { dir } = readyChange(t)
  for (const [reply, expected] of [
    ['{"state":"open","draft":false}', 1],
    ['{"state":"open","draft":true}', 0],
    ['{"state":"closed","draft":false}', 0],
    ['{"nested":{"draft":false}}', 0],
  ]) {
    const result = run(
      {
        VERCEL_GIT_COMMIT_REF: 'agent/codex/direct',
        VERCEL_GIT_PULL_REQUEST_ID: '12',
        CURL_REPLY: reply,
      },
      dir,
    )
    assert.equal(result.status, expected, result.stdout + result.stderr)
  }
})

test('the branch head query is passed through curl URL encoding', (t) => {
  const { dir } = readyChange(t)
  const log = path.join(curlDir, 'encoded-query.log')
  const ref = 'agent/codex/task&state=closed'
  const result = run({ VERCEL_GIT_COMMIT_REF: ref, CURL_LOG: log }, dir)
  assert.equal(result.status, 1, result.stdout + result.stderr)
  const args = readFileSync(log, 'utf8').split('\n')
  assert.ok(args.includes('--data-urlencode'))
  assert.ok(args.includes(`head=frankxai:${ref}`))
  assert.ok(args.includes('state=open'))
  assert.ok(args.includes('https://api.github.com/repos/frankxai/frankx.ai-vercel-website/pulls'))
})

test('explicit preview opt-ins build even without a ready PR', () => {
  for (const env of [
    { VERCEL_GIT_COMMIT_REF: 'preview/task' },
    {
      VERCEL_GIT_COMMIT_REF: 'dependabot/update',
      VERCEL_GIT_COMMIT_MESSAGE: '[preview] inspect dependency',
    },
  ]) {
    const result = run({ ...env, CURL_REPLY: '[]' })
    assert.equal(result.status, 1, result.stdout + result.stderr)
  }
})

test('an opt-in marker mentioned only in a body does not request a build', () => {
  const result = run({
    VERCEL_GIT_COMMIT_REF: 'agent/codex/no-pr',
    VERCEL_GIT_COMMIT_MESSAGE: 'docs: explain previews\n\nUse [preview] to request a build.',
    CURL_REPLY: '[]',
  })
  assert.equal(result.status, 0, result.stdout + result.stderr)
})

test('bot previews and catch-up merge previews skip unless explicitly requested', () => {
  for (const env of [
    { VERCEL_GIT_COMMIT_REF: 'dependabot/npm/update' },
    {
      VERCEL_GIT_COMMIT_REF: 'agent/codex/catchup',
      VERCEL_GIT_COMMIT_MESSAGE: "Merge branch 'main' into agent/codex/catchup",
    },
  ]) {
    const result = run(env)
    assert.equal(result.status, 0, result.stdout + result.stderr)
  }
})
