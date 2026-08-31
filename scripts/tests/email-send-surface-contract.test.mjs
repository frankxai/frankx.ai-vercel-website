import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const repoUrl = new URL('../../', import.meta.url)
const repoFile = (path) => new URL(path, repoUrl)

test('retired public email routes are explicit inert 404 tombstones', async () => {
  for (const path of [
    'app/api/test-email/route.ts',
    'app/api/welcome-sequence/route.ts',
  ]) {
    const source = await readFile(repoFile(path), 'utf8')

    assert.match(source, /NextResponse\.json\(\{ error: 'Not found' \}, \{ status: 404 \}\)/)
    assert.match(source, /export const GET = notFound/)
    assert.match(source, /export const POST = notFound/)
    assert.doesNotMatch(source, /resend|fetch\(|process\.env|kv\./i)
  }
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

test('intake treats Vercel instance logs as diagnostic and preserves full Notion messages', async () => {
  const source = await readFile(repoFile('lib/contact-intake.ts'), 'utf8')

  assert.match(source, /const durableLog = logged && !process\.env\.VERCEL/)
  assert.match(source, /notify === 'sent' \|\| notion === 'added' \|\| durableLog/)
  assert.match(source, /const NOTION_RICH_TEXT_CHUNK_SIZE = 1900/)
  assert.match(source, /rich_text: splitNotionRichText\(payload\.message\)/)
  assert.match(source, /value\.slice\(offset, offset \+ NOTION_RICH_TEXT_CHUNK_SIZE\)/)
  assert.doesNotMatch(source, /payload\.message\.slice\(0, 1897\)/)
})

test('newsletter preference writes require signed ownership and never resubscribe duplicates', async () => {
  const route = await readFile(repoFile('app/api/subscribe/route.ts'), 'utf8')
  const page = await readFile(repoFile('app/newsletter/preferences/page.tsx'), 'utf8')
  const preferenceGuard = route.indexOf('if (hasExplicitTopics || preferenceToken)')
  const createContact = route.indexOf('let resendResponse = await createContact(fullBody)')
  const duplicateGuard = route.indexOf('if (resendResponse.status === 409)')
  const welcomeDelivery = route.indexOf('await sendWelcomeEmail(email, name, listType, intention)')

  assert.match(route, /createHmac\('sha256', PREFERENCES_SECRET\)/)
  assert.match(route, /timingSafeEqual\(receivedBytes, expectedBytes\)/)
  assert.match(route, /\.update\(`\$\{email\}\\n\$\{payload\}`\)/)
  assert.match(route, /newsletter\/preferences\?token=\$\{encodeURIComponent\(token\)\}/)
  assert.doesNotMatch(route, /newsletter\/preferences\?email=/)
  assert.match(route, /emailRatelimit\.limit\(`subscribe:ip:/)
  assert.match(route, /emailRatelimit\.limit\(`subscribe:email:\$\{emailDigest\}`\)/)
  assert.match(route, /rateLimit === 'unavailable'[\s\S]{0,240}?status: 503/)
  assert.ok(preferenceGuard >= 0 && preferenceGuard < createContact)
  assert.ok(duplicateGuard > createContact && duplicateGuard < welcomeDelivery)
  assert.doesNotMatch(route, /updateAudienceContact/)
  assert.doesNotMatch(route, /properties\.topics/)
  assert.doesNotMatch(route, /existingContact \|\| listType === 'music-lab'/)
  assert.match(route, /No duplicate email was sent/)

  assert.match(page, /Saving changes requires email confirmation/)
  assert.match(page, /with no email address in the URL/)
  assert.match(page, /re-enter the same[\s\S]{0,40}email/)
  assert.match(page, /preferenceToken: tokenMatchesSelection \? preferenceToken : undefined/)
  assert.match(page, /confirmationRequired/)
})

test('application contracts fail closed, preserve assembled messages, and align field limits', async () => {
  const applications = [
    {
      route: 'app/api/foundry/apply/route.ts',
      client: 'components/foundry/FoundryApplicationForm.tsx',
      limits: { name: 200, email: 200, company: 200, link: 500, building: 1500, why: 1500 },
    },
    {
      route: 'app/api/founders-circle/apply/route.ts',
      client: 'components/founders-circle/FoundersCircleApplicationForm.tsx',
      limits: { name: 200, email: 200, company: 200, link: 500, decision: 1200, tried: 900, firstCall: 900 },
    },
  ]

  for (const application of applications) {
    const route = await readFile(repoFile(application.route), 'utf8')
    const client = await readFile(repoFile(application.client), 'utf8')
    const limiter = route.slice(route.indexOf('leadRatelimit.limit'), route.indexOf('const body'))

    assert.match(limiter, /catch \(error\)[\s\S]*status: 503/)
    assert.doesNotMatch(limiter, /continuing open/)
    assert.doesNotMatch(route, /\.join\('\\n'\)\s*\.slice\(/)

    for (const [field, limit] of Object.entries(application.limits)) {
      assert.match(route, new RegExp(`${field}: ${limit}`))
      assert.match(
        client,
        new RegExp(`name="${field}"[\\s\\S]{0,500}?maxLength=\\{${limit}\\}`),
      )
    }
  }

  const circle = await readFile(
    repoFile('components/founders-circle/FoundersCircleApplicationForm.tsx'),
    'utf8',
  )
  assert.match(circle, /setAckSent\(data\.ackSent === true\)/)
  assert.match(circle, /\{ackSent[\s\S]{0,500}?no confirmation email was sent/)
})
