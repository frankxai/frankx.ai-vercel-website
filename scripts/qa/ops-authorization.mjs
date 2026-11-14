import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { createRequire } from 'node:module'
import { spawnManagedProcess, stopManagedProcess } from '../tests/helpers/managed-next-process.mjs'

assert.equal(process.env.GITHUB_ACTIONS, 'true', 'Run this production-server check in hosted CI.')
const require = createRequire(import.meta.url)
const origin = 'http://127.0.0.1:4318'
const admin = randomUUID()
const server = spawnManagedProcess(process.execPath, [
  require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', '4318',
], {
  cwd: process.cwd(),
  // Test only the route boundary. No live provider requests or credential logs.
  env: { ...process.env, ADMIN_SECRET: admin, GITHUB_TOKEN: '', VERCEL_TOKEN: '', VERCEL_ENV: 'preview' },
  stdio: 'ignore',
})

const paths = ['/ops', '/ops/sites', '/ops/calendar']
const request = (path, candidate) => fetch(`${origin}${path}`, {
  headers: candidate ? { 'x-admin-secret': candidate } : {},
  redirect: 'manual',
  signal: AbortSignal.timeout(15_000),
})

try {
  const deadline = Date.now() + 60_000
  let anonymous
  while (!anonymous) {
    assert.equal(server.spawnError, null, 'Production server failed to launch')
    assert.equal(server.exitCode, null, 'Production server exited before readiness')
    assert.ok(Date.now() < deadline, 'Production server readiness timed out')
    try { anonymous = await request('/ops') } catch {
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  }
  assert.equal(anonymous.status, 404, 'Anonymous access to /ops must be denied')
  await anonymous.arrayBuffer()

  for (const path of paths) {
    if (path !== '/ops') {
      const anonymousChild = await request(path)
      assert.equal(anonymousChild.status, 404, `Anonymous access to ${path} must be denied`)
      await anonymousChild.arrayBuffer()
    }

    const incorrect = await request(path, 'fixture-incorrect-admin')
    assert.equal(incorrect.status, 404, `Incorrect admin access to ${path} must be denied`)
    await incorrect.arrayBuffer()

    const authorized = await request(path, admin)
    assert.equal(authorized.status, 200, `Configured admin must reach ${path}`)
    if (path === '/ops') {
      assert.match(authorized.headers.get('cache-control') ?? '', /\bno-store\b/)
    }
    assert.equal((await authorized.text()).includes(admin), false, `Admin credential must not enter HTML on ${path}`)

    const afterAdmin = await request(path)
    assert.equal(afterAdmin.status, 404, `An authorized ${path} response must not be shared with anonymous visitors`)
    await afterAdmin.arrayBuffer()
  }
  console.log('Ops production authorization passed: anonymous, incorrect, authorized, and post-admin anonymous requests for /ops, /ops/sites, and /ops/calendar.')
} finally {
  await stopManagedProcess(server)
}
