import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const repoUrl = new URL('../../', import.meta.url)
const repoFile = (path) => new URL(path, repoUrl)

const fileExists = async (path) => {
  try {
    await access(repoFile(path))
    return true
  } catch {
    return false
  }
}

test('public arbitrary-recipient email routes do not exist', async () => {
  assert.equal(await fileExists('app/api/test-email/route.ts'), false)
  assert.equal(await fileExists('app/api/welcome-sequence/route.ts'), false)
})

test('welcome cron fails closed before queue or provider work', async () => {
  const source = await readFile(repoFile('app/api/cron/welcome-sequence/route.ts'), 'utf8')
  const missingSecretGuard = source.indexOf('if (!CRON_SECRET)')
  const authorizationGuard = source.indexOf('authHeader !== `Bearer ${CRON_SECRET}`')
  const providerCall = source.indexOf("fetch('https://api.resend.com/emails'")
  const queueRead = source.indexOf("kv.keys('welcome:*')")

  assert.ok(missingSecretGuard >= 0, 'missing CRON_SECRET must be rejected')
  assert.ok(authorizationGuard > missingSecretGuard, 'authorization must follow the configuration guard')
  assert.ok(providerCall > authorizationGuard, 'provider calls must remain behind authorization')
  assert.ok(queueRead > authorizationGuard, 'queue reads must remain behind authorization')
  assert.match(source, /return NextResponse\.json\(\{ error: 'Service unavailable' \}, \{ status: 503 \}\)/)
  assert.match(source, /return NextResponse\.json\(\{ error: 'Unauthorized' \}, \{ status: 401 \}\)/)
})
