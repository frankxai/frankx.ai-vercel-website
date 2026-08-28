import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const guardPath = fileURLToPath(new URL('../check-contract-guard.mjs', import.meta.url))

const git = (cwd, ...args) =>
  execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })

async function createRepository(files) {
  const cwd = await mkdtemp(path.join(tmpdir(), 'frankx-contract-guard-'))
  for (const [file, source] of Object.entries(files)) {
    const destination = path.join(cwd, file)
    await mkdir(path.dirname(destination), { recursive: true })
    await writeFile(destination, source)
  }

  git(cwd, 'init', '--initial-branch=main')
  git(cwd, 'config', 'user.name', 'Contract Guard Test')
  git(cwd, 'config', 'user.email', 'contract-guard@example.invalid')
  git(cwd, 'add', '.')
  git(cwd, 'commit', '-m', 'baseline')
  git(cwd, 'branch', 'origin/main')
  git(cwd, 'switch', '-c', 'feature')
  return cwd
}

function runGuard(cwd, title = '[contract-change] deliberate update') {
  return spawnSync(process.execPath, [guardPath], {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      GITHUB_BASE_REF: 'main',
      PR_TITLE: title,
    },
  })
}

test('a title override cannot weaken the homepage contract beside the homepage', async (t) => {
  const cwd = await createRepository({
    'app/page.tsx': 'export default function Page() { return <HomePageElite /> }\n',
    'components/home/HomePageElite.tsx': 'export default function HomePageElite() { return null }\n',
    'scripts/tests/homepage-mind-palace-contract.test.mjs':
      "const entrypoint = 'app/page.tsx'\nconst homepage = 'components/home/HomePageElite.tsx'\n",
  })
  t.after(() => rm(cwd, { recursive: true, force: true }))

  await writeFile(path.join(cwd, 'app/page.tsx'), 'export default function Page() { return <Replacement /> }\n')
  await writeFile(
    path.join(cwd, 'scripts/tests/homepage-mind-palace-contract.test.mjs'),
    "const entrypoint = 'app/page.tsx'\n",
  )
  git(cwd, 'add', '.')
  git(cwd, 'commit', '-m', 'replace homepage and loosen contract')

  const result = runGuard(cwd)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /homepage preservation contract cannot be changed/i)
})

test('homepage work cannot hide unrelated executable changes', async (t) => {
  const cwd = await createRepository({
    'app/page.tsx': 'export default function Page() { return <HomePageElite /> }\n',
    'components/home/HomePageElite.tsx': 'export default function HomePageElite() { return null }\n',
    'app/api/newsletter/route.ts': 'export const POST = () => new Response()\n',
    'scripts/tests/homepage-mind-palace-contract.test.mjs':
      "const entrypoint = 'app/page.tsx'\nconst homepage = 'components/home/HomePageElite.tsx'\n",
  })
  t.after(() => rm(cwd, { recursive: true, force: true }))

  await writeFile(path.join(cwd, 'app/page.tsx'), 'export default function Page() { return <HomePageElite revised /> }\n')
  await writeFile(
    path.join(cwd, 'app/api/newsletter/route.ts'),
    'export const POST = () => new Response(null, { status: 204 })\n',
  )
  git(cwd, 'add', '.')
  git(cwd, 'commit', '-m', 'mix homepage and api work')

  const result = runGuard(cwd)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /bundled with unrelated executable surfaces/i)
  assert.match(result.stderr, /app\/api\/newsletter\/route\.ts/)
})

test('the existing override remains available for unrelated contracts', async (t) => {
  const cwd = await createRepository({
    'components/Example.tsx': 'export const Example = () => null\n',
    'scripts/tests/example-contract.test.mjs': "const surface = 'components/Example.tsx'\n",
  })
  t.after(() => rm(cwd, { recursive: true, force: true }))

  await writeFile(path.join(cwd, 'components/Example.tsx'), 'export const Example = () => <div />\n')
  await writeFile(
    path.join(cwd, 'scripts/tests/example-contract.test.mjs'),
    "const surface = 'components/Example.tsx'\nconst changed = true\n",
  )
  git(cwd, 'add', '.')
  git(cwd, 'commit', '-m', 'deliberate unrelated contract update')

  const result = runGuard(cwd)
  assert.equal(result.status, 0)
  assert.match(result.stderr, /Acknowledged/i)
})
