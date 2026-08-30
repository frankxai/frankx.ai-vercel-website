import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
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
      VERCEL_GIT_PREVIOUS_SHA: '',
      VERCEL_GIT_REPO_OWNER: '',
      VERCEL_GIT_REPO_SLUG: '',
      ...env,
    },
  })
}

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
