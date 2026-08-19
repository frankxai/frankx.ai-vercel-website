import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { submitNewsletter } from '../../lib/newsletter/submit-newsletter.ts'

test('returns success only after an accepted provider response', async () => {
  let requestBody
  const result = await submitNewsletter(' Creator@Example.com ', async (_url, init) => {
    requestBody = JSON.parse(init.body)
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  })

  assert.deepEqual(result, { ok: true })
  assert.deepEqual(requestBody, {
    email: 'creator@example.com',
    listType: 'newsletter',
    source: 'email-capture-form',
  })
})

test('does not treat an HTTP success without an accepted outcome as a conversion', async () => {
  const result = await submitNewsletter('creator@example.com', async () =>
    new Response('{}', { status: 200 })
  )

  assert.equal(result.ok, false)
})

test('returns an honest error when intake rejects or cannot be reached', async () => {
  const rejected = await submitNewsletter('creator@example.com', async () =>
    new Response(JSON.stringify({ error: 'Email service not configured.' }), { status: 500 })
  )
  const unavailable = await submitNewsletter('creator@example.com', async () => {
    throw new Error('network unavailable')
  })

  assert.deepEqual(rejected, { ok: false, message: 'Email service not configured.' })
  assert.equal(unavailable.ok, false)
})

test('the capture form records only a bounded event after accepted intake', async () => {
  const source = await readFile(
    new URL('../../components/funnels/EmailCaptureForm.tsx', import.meta.url),
    'utf8'
  )
  const acceptedResponse = source.indexOf('if (!result.ok)')
  const conversion = source.indexOf("trackEvent('lead_submitted'")
  const conversionProperties = source.slice(conversion, source.indexOf('});', conversion))

  assert.ok(acceptedResponse >= 0)
  assert.ok(conversion > acceptedResponse)
  assert.doesNotMatch(conversionProperties, /\bemail\s*[:,]/)
  assert.match(source, /surface: 'email_capture_form'/)
  assert.match(source, /offer_id: 'frankx_newsletter'/)
  assert.match(source, /source: 'frankx_site'/)
})
