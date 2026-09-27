import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const repoFile = (path) => new URL(`../../${path}`, import.meta.url)

// Execute the actual TSX modules. Only framework hooks and external effects are
// replaced; the page's routing and the form's request construction run unchanged.
function loadModule(path, imports = {}, fetch = () => assert.fail('unexpected network request')) {
  const source = readFileSync(repoFile(path), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  })
  const loadedModule = { exports: {} }
  const localRequire = (id) => Object.hasOwn(imports, id) ? imports[id] : require(id)
  new Function('require', 'module', 'exports', 'fetch', outputText)(
    localRequire, loadedModule, loadedModule.exports, fetch,
  )
  return loadedModule.exports
}

function findElement(node, predicate) {
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findElement(child, predicate)
      if (found) return found
    }
  } else if (node && typeof node === 'object') {
    if (predicate(node)) return node
    return findElement(node.props?.children, predicate)
  }
}

async function submitWaitlist(intent, signupOverrides = {}, responseSequence = []) {
  const state = []
  let hookIndex = 0
  const requests = []
  const { EmailSignup } = loadModule('components/email-signup.tsx', {
    react: {
      useId: () => 'test-id',
      useState: (initial) => {
        const index = hookIndex++
        if (!(index in state)) state[index] = initial
        return [state[index], (value) => { state[index] = value }]
      },
    },
    'next/link': { default: 'a' },
    'next/navigation': { useRouter: () => ({}) },
    '@/lib/analytics': { trackEvent() {} },
    '@/lib/utils': { cn: (...values) => values.filter(Boolean).join(' ') },
    '@/lib/diagnostic/demand': loadModule('lib/diagnostic/demand.ts'),
  }, async (url, options) => {
    requests.push({ url, method: options.method, body: JSON.parse(options.body) })
    return responseSequence.shift() ?? { ok: true, json: async () => ({ success: true }) }
  })
  const { default: WaitlistPage } = loadModule('app/waitlist/page.tsx', {
    '@/components/email-signup': { EmailSignup },
    '@/lib/diagnostic/waitlist-intents': loadModule('lib/diagnostic/waitlist-intents.ts'),
    '@/lib/seo': { createMetadata: (value) => value },
  })
  const page = await WaitlistPage({ searchParams: Promise.resolve({ intent }) })
  const signup = findElement(page, (element) => element.type === EmailSignup)
  assert.ok(signup, 'the route must render the existing signup form')
  const signupProps = { ...signup.props, ...signupOverrides }
  const renderSignup = () => {
    hookIndex = 0
    return EmailSignup(signupProps)
  }
  const email = findElement(renderSignup(), (element) => element.type === 'input' && element.props.type === 'email')
  email.props.onChange({ target: { value: 'unit-test@example.invalid' } })
  const form = findElement(renderSignup(), (element) => element.type === 'form')
  await form.props.onSubmit({ preventDefault() {} })
  assert.equal(requests.length, 1)
  assert.equal(requests[0].url, '/api/subscribe')
  assert.equal(requests[0].method, 'POST')
  return {
    props: signupProps,
    body: requests[0].body,
    rendered: renderSignup(),
    requests,
    retry: async (newEmail) => {
      if (newEmail) {
        const input = findElement(renderSignup(), (element) => element.type === 'input' && element.props.type === 'email')
        input.props.onChange({ target: { value: newEmail } })
      }
      const retryForm = findElement(renderSignup(), (element) => element.type === 'form')
      await retryForm.props.onSubmit({ preventDefault() {} })
      return requests.at(-1).body
    },
  }
}

async function submitDemand(response) {
  const state = []
  let hookIndex = 0
  const requests = []
  const { EmailSignup } = loadModule('components/email-signup.tsx', {
    react: {
      useId: () => 'test-id',
      useState: (initial) => {
        const index = hookIndex++
        if (!(index in state)) state[index] = initial
        return [state[index], (value) => { state[index] = value }]
      },
    },
    'next/link': { default: 'a' },
    'next/navigation': { useRouter: () => ({}) },
    '@/lib/analytics': { trackEvent() {} },
    '@/lib/utils': { cn: (...values) => values.filter(Boolean).join(' ') },
    '@/lib/diagnostic/demand': loadModule('lib/diagnostic/demand.ts'),
  }, async (url, options) => {
    requests.push({ url, body: JSON.parse(options.body) })
    return Array.isArray(response) ? response.shift() : response
  })
  const props = { askDemand: true, intent: 'bv-kit', listType: 'premium-packs' }
  const render = () => {
    hookIndex = 0
    return EmailSignup(props)
  }

  // Seed the hook state as a completed signup with one optional answer.
  render()
  state[3] = 'success'
  state[5] = '25-99'
  const demandForm = findElement(
    render(),
    (element) => element.type === 'form' && element.props?.className?.includes('mt-6'),
  )
  await demandForm.props.onSubmit({ preventDefault() {} })
  return {
    requests,
    rendered: render(),
    retry: async () => {
      const retryForm = findElement(
        render(),
        (element) => element.type === 'form' && element.props?.className?.includes('mt-6'),
      )
      await retryForm.props.onSubmit({ preventDefault() {} })
      return render()
    },
  }
}

function loadSubscribeRoute(fetch, { configureResend = true } = {}) {
  const previousKey = process.env.RESEND_API_KEY
  if (configureResend) process.env.RESEND_API_KEY = 'test-key'
  else delete process.env.RESEND_API_KEY
  try {
    return loadModule('app/api/subscribe/route.ts', {
      'next/server': {
        NextResponse: { json: (body, init) => Response.json(body, init) },
      },
      '@/lib/email-templates': { musicPromptsEmail: () => ({}) },
      '@/lib/email-templates-welcome': { welcomeEmail1: () => ({}) },
      '@/lib/email-templates-ikigai': { ikigaiBrandingEmail: () => ({}) },
      '@/lib/email-templates-inner-circle': { innerCircleWaitlistEmail: () => ({}) },
      '@/lib/email-templates-mvu': {
        mvuRsvpConfirmation: () => ({}),
        mvuRsvpAlert: () => ({}),
      },
      '@/lib/diagnostic/waitlist-intents': loadModule('lib/diagnostic/waitlist-intents.ts'),
      '@/data/products.json': { __esModule: true, default: JSON.parse(readFileSync(repoFile('data/products.json'), 'utf8')) },
      '@/lib/ratelimit': {
        emailRatelimit: { limit: async () => ({ success: true }) },
        getClientIdentifier: () => 'test-client',
      },
      '@/lib/seo': { siteConfig: { url: 'https://www.frankx.ai' } },
    }, fetch)
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY
    else process.env.RESEND_API_KEY = previousKey
  }
}

function subscribeRequest(body) {
  return {
    json: async () => body,
    headers: new Headers({ referer: 'https://www.frankx.ai/waitlist?intent=vibe-os' }),
    url: 'https://www.frankx.ai/api/subscribe',
  }
}

test('product interest uses its dedicated Growth Core program and never calls Resend', async () => {
  const requests = []
  const { POST } = loadSubscribeRoute(async (url, options) => {
    const body = JSON.parse(options.body)
    requests.push({ url: String(url), body })
    return Response.json({ accepted: true, requestId: body.request_id })
  })

  const response = await POST(subscribeRequest({
    email: 'existing@example.invalid',
    listType: 'product-interest',
    intent: 'vibe-os',
    source: '/waitlist',
    requestId: 'f02797de-c0dd-4ce0-8dd0-1eaa27bfe68d',
  }))
  const result = await response.json()

  assert.equal(response.status, 200)
  assert.equal('duplicate' in result, false)
  assert.equal(result.welcomeSent, false)
  assert.equal(result.message, 'Your product interest was recorded.')
  assert.equal(requests[0].body.program, 'frankx-product-interest')
  assert.match(requests[0].body.request_id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-a[0-9a-f]{3}-[0-9a-f]{12}$/)
  assert.equal(requests[0].body.consent_version, 'frankx-product-interest.v1')
  assert.deepEqual(requests[0].body.metadata, {
    list_type: 'product-interest',
    intent: 'vibe-os',
  })
  assert.equal(requests.length, 1, 'product interest must stop after Growth Core accepts')
  assert.doesNotMatch(requests[0].url, /api\.resend\.com/)
})

test('a product-interest retry reuses its request id after a lost response', async () => {
  const requests = []
  const { POST } = loadSubscribeRoute(async (url, options) => {
    const body = JSON.parse(options.body)
    requests.push({ url: String(url), body })
    if (requests.length === 1) throw new Error('response lost after remote capture')
    return Response.json({ accepted: true, requestId: body.request_id })
  })

  const request = subscribeRequest({
    email: 'retry@example.invalid',
    listType: 'product-interest',
    intent: 'vibe-os',
    requestId: 'c028b35c-33c7-4372-8fef-2cb3ccf3f7df',
  })
  const failedResponse = await POST(request)
  const failedResult = await failedResponse.json()
  const retriedResponse = await POST(request)
  const retriedResult = await retriedResponse.json()

  assert.equal(failedResponse.status, 503)
  assert.equal(failedResult.error, 'Product interest could not be recorded. Please try again.')
  assert.equal(retriedResponse.status, 200)
  assert.equal(retriedResult.message, 'Your product interest was recorded.')
  assert.equal(requests.length, 2)
  assert.ok(requests.every((entry) => entry.body.program === 'frankx-product-interest'))
  assert.equal(requests[0].body.request_id, requests[1].body.request_id)
})

test('product-interest success requires the exact durable receipt', async () => {
  for (const receipt of [undefined, 'c028b35c-33c7-4372-8fef-2cb3ccf3f7df']) {
    const requests = []
    const { POST } = loadSubscribeRoute(async (url, options) => {
      requests.push({ url: String(url), body: JSON.parse(options.body) })
      return Response.json({ accepted: true, requestId: receipt })
    })
    const response = await POST(subscribeRequest({
      email: 'receipt@example.invalid',
      listType: 'product-interest',
      intent: 'vibe-os',
      requestId: '177cbce5-0f06-489e-a7f0-32e045f24855',
    }))
    assert.equal(response.status, 503)
    assert.equal((await response.json()).error, 'Product interest could not be recorded. Please try again.')
    assert.equal(requests.length, 1, 'receipt failures must not proceed to Resend')
  }
})

test('a reused browser operation id cannot replay a changed submission', async () => {
  const requests = []
  const { POST } = loadSubscribeRoute(async (url, options) => {
    const body = JSON.parse(options.body)
    requests.push(body)
    return Response.json({ accepted: true, requestId: body.request_id })
  })
  for (const payload of [
    { email: 'first@example.invalid' },
    { email: 'second@example.invalid' },
    { email: 'first@example.invalid', utm_campaign: 'revised-source' },
  ]) {
    const response = await POST(subscribeRequest({
      ...payload,
      listType: 'product-interest',
      intent: 'vibe-os',
      requestId: '757c196b-a069-45c2-aa27-1ed90dd35b95',
    }))
    assert.equal(response.status, 200)
  }
  assert.notEqual(requests[0].request_id, requests[1].request_id)
  assert.notEqual(requests[0].request_id, requests[2].request_id)
})

test('product interest requires a recognized product and valid operation id before capture', async () => {
  let captures = 0
  const { POST } = loadSubscribeRoute(async () => { captures++; return Response.json({ accepted: true }) })
  for (const [intent, requestId] of [
    ['', '757c196b-a069-45c2-aa27-1ed90dd35b95'],
    ['invented-product', '757c196b-a069-45c2-aa27-1ed90dd35b95'],
    ['vibe-os', 'invalid'],
  ]) {
    const response = await POST(subscribeRequest({
      email: 'invalid@example.invalid', listType: 'product-interest', intent, requestId,
    }))
    assert.equal(response.status, 400)
  }
  assert.equal(captures, 0)
})

test('the product-index Suno card retains its interest attribution', async () => {
  const requests = []
  const { POST } = loadSubscribeRoute(async (url, options) => {
    const body = JSON.parse(options.body)
    requests.push(body)
    return Response.json({ accepted: true, requestId: body.request_id })
  })
  const response = await POST(subscribeRequest({
    email: 'suno@example.invalid',
    listType: 'product-interest',
    intent: 'suno-prompts-bundle',
    requestId: '0f79babb-e432-44b6-b81e-0698fe70c5e3',
  }))
  assert.equal(response.status, 200)
  assert.equal(requests[0].metadata.intent, 'suno-prompts-bundle')
})

test('product interest works without a Resend API key', async () => {
  const requests = []
  const previousKey = process.env.RESEND_API_KEY
  delete process.env.RESEND_API_KEY
  const { POST } = loadSubscribeRoute(
    async (url, options) => {
      const body = JSON.parse(options.body)
      requests.push({ url: String(url), body })
      return Response.json({ accepted: true, requestId: body.request_id })
    },
    { configureResend: false },
  )

  try {
    const response = await POST(subscribeRequest({
      email: 'growth-only@example.invalid',
      listType: 'product-interest',
      intent: 'vibe-os',
      requestId: 'd8dc21e0-c0a9-4fd2-90fc-35d68f34fe8e',
    }))
    const result = await response.json()

    assert.equal(response.status, 200)
    assert.equal(result.message, 'Your product interest was recorded.')
    assert.equal(requests.length, 1)
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY
    else process.env.RESEND_API_KEY = previousKey
  }
})

test('courses waitlist preserves newsletter topic and welcome delivery behavior', async () => {
  const requests = []
  const { POST } = loadSubscribeRoute(async (url, options) => {
    requests.push({ url: String(url), body: JSON.parse(options.body) })
    if (requests.length === 1) return Response.json({ accepted: true })
    if (requests.length === 2) return Response.json({ id: 'contact-id' })
    return Response.json({ success: true })
  })

  const response = await POST(subscribeRequest({
    email: 'course@example.invalid',
    listType: 'courses-waitlist',
    intent: 'course-creator-business-systems',
  }))
  const result = await response.json()

  assert.equal(response.status, 200)
  assert.equal(result.message, 'Successfully subscribed!')
  assert.equal(result.welcomeSent, true)
  assert.equal(requests[0].body.program, 'frankx-courses-waitlist')
  assert.ok(requests[2].body.topics.some((topic) => topic.subscription === 'opt_in'))
  assert.equal(requests[3].url, 'https://api.resend.com/emails')
})

test('optional demand answers report success only after a successful response', async () => {
  const accepted = await submitDemand({ ok: true, json: async () => ({ success: true }) })
  assert.equal(accepted.requests[0].url, '/api/demand')
  assert.ok(findElement(accepted.rendered, (element) =>
    element.props?.children === 'Recorded. That is what decides build order.'))

  const rejected = await submitDemand([
    { ok: false, json: async () => ({ error: 'Could not save your answers.' }) },
    { ok: true, json: async () => ({ success: true }) },
  ])
  assert.equal(
    findElement(rejected.rendered, (element) => element.props?.role === 'alert')?.props.children,
    'Could not save your answers.',
  )
  assert.equal(findElement(rejected.rendered, (element) =>
    element.props?.children === 'Recorded. That is what decides build order.'), undefined)
  assert.equal(
    findElement(rejected.rendered, (element) => element.props?.['aria-pressed'] === true)
      ?.props.children,
    '25 to 99',
    'a rejected response must preserve the selected answer',
  )

  const retried = await rejected.retry()
  assert.deepEqual(rejected.requests[1].body, rejected.requests[0].body)
  assert.ok(findElement(retried, (element) =>
    element.props?.children === 'Recorded. That is what decides build order.'))
})

for (const [intent, label] of [['bv-kit', 'Creator BV Kit'], ['prompt-vault', 'Prompt Vault']]) {
  test(`${intent} reaches the signup request with its product identity and launch list`, async () => {
    const { props, body } = await submitWaitlist(`  ${intent}  `)
    assert.equal(props.intentLabel, label)
    assert.equal(body.intent, intent)
    assert.equal(body.listType, 'premium-packs')
    assert.equal(body.source, '/waitlist')
  })
}

test('legacy and unregistered waitlist intents preserve the existing delivery routing', async () => {
  for (const intent of ['course-creator-business-systems', 'creative-ai-toolkit', 'vibe-os']) {
    const { body, rendered } = await submitWaitlist(intent)
    assert.equal(body.listType, 'courses-waitlist')
    const status = findElement(rendered, (element) => element.props?.role === 'status')
    assert.match(String(status?.props.children), /You are subscribed\./)
  }
})

test('an explicit product surface uses the interest-only client state', async () => {
  const { body, rendered } = await submitWaitlist(undefined, {
    listType: 'product-interest',
    intent: 'vibe-os',
  })
  assert.equal(body.intent, 'vibe-os')
  assert.equal(body.listType, 'product-interest')
  assert.match(body.requestId, /^[0-9a-f-]{36}$/)
  const status = findElement(rendered, (element) => element.props?.role === 'status')
  assert.match(String(status?.props.children), /Your product interest was recorded\./)
  assert.doesNotMatch(String(status?.props.children), /You are subscribed\./)
})

test('interest form reuses its operation id after failure and changes it for a changed email', async () => {
  const first = await submitWaitlist(undefined, { listType: 'product-interest', intent: 'vibe-os' }, [
    { ok: false, json: async () => ({ error: 'Capture unavailable' }) },
    { ok: true, json: async () => ({ success: true }) },
  ])
  const retried = await first.retry()
  assert.equal(retried.requestId, first.body.requestId)
  const changed = await first.retry('different@example.invalid')
  assert.notEqual(changed.requestId, first.body.requestId)
})

test('missing, repeated, or unsafe intents cannot become product attribution', async () => {
  for (const intent of [undefined, ['bv-kit', 'prompt-vault'], '../bv-kit', '<script>']) {
    const { props, body } = await submitWaitlist(intent)
    assert.equal(props.intentLabel, undefined)
    assert.equal(body.intent, undefined)
    assert.equal(body.listType, 'courses-waitlist')
  }
})
