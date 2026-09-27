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
  const module = { exports: {} }
  const localRequire = (id) => Object.hasOwn(imports, id) ? imports[id] : require(id)
  new Function('require', 'module', 'exports', 'fetch', outputText)(
    localRequire, module, module.exports, fetch,
  )
  return module.exports
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

async function submitWaitlist(intent) {
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
    return { ok: true, json: async () => ({ success: true }) }
  })
  const { default: WaitlistPage } = loadModule('app/waitlist/page.tsx', {
    '@/components/email-signup': { EmailSignup },
    '@/lib/diagnostic/waitlist-intents': loadModule('lib/diagnostic/waitlist-intents.ts'),
    '@/lib/seo': { createMetadata: (value) => value },
  })
  const page = await WaitlistPage({ searchParams: Promise.resolve({ intent }) })
  const signup = findElement(page, (element) => element.type === EmailSignup)
  assert.ok(signup, 'the route must render the existing signup form')
  const renderSignup = () => {
    hookIndex = 0
    return EmailSignup(signup.props)
  }
  const email = findElement(renderSignup(), (element) => element.type === 'input' && element.props.type === 'email')
  email.props.onChange({ target: { value: 'unit-test@example.invalid' } })
  const form = findElement(renderSignup(), (element) => element.type === 'form')
  await form.props.onSubmit({ preventDefault() {} })
  assert.equal(requests.length, 1)
  assert.equal(requests[0].url, '/api/subscribe')
  assert.equal(requests[0].method, 'POST')
  return { props: signup.props, body: requests[0].body, rendered: renderSignup() }
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

function loadSubscribeRoute(fetch) {
  const previousKey = process.env.RESEND_API_KEY
  process.env.RESEND_API_KEY = 'test-key'
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

test('product interest persists intent before a duplicate without changing topics', async () => {
  const requests = []
  const { POST } = loadSubscribeRoute(async (url, options) => {
    requests.push({ url: String(url), body: JSON.parse(options.body) })
    if (requests.length === 1) return Response.json({ accepted: true })
    return Response.json({ message: 'duplicate' }, { status: 409 })
  })

  const response = await POST(subscribeRequest({
    email: 'existing@example.invalid',
    listType: 'product-interest',
    intent: 'vibe-os',
    source: '/waitlist',
  }))
  const result = await response.json()

  assert.equal(response.status, 200)
  assert.equal(result.duplicate, true)
  assert.equal(result.message, 'Your interest was recorded.')
  assert.equal(requests[0].body.program, 'frankx-courses-waitlist')
  assert.deepEqual(requests[0].body.metadata, {
    list_type: 'product-interest',
    intent: 'vibe-os',
  })
  assert.equal(requests.length, 2, 'a duplicate must not write topic preferences or send email')
})

test('new product interest contact opts out of every known topic and receives no welcome', async () => {
  const requests = []
  const { POST } = loadSubscribeRoute(async (url, options) => {
    requests.push({ url: String(url), body: JSON.parse(options.body) })
    if (requests.length === 1) return Response.json({ accepted: true })
    if (requests.length === 2) return Response.json({ id: 'contact-id' })
    return Response.json({ success: true })
  })

  const response = await POST(subscribeRequest({
    email: 'new@example.invalid',
    listType: 'product-interest',
    intent: 'vibe-os',
  }))
  const result = await response.json()

  assert.equal(response.status, 200)
  assert.equal(result.welcomeSent, false)
  assert.equal(result.message, 'Your interest was recorded.')
  assert.equal(requests.length, 3)
  assert.match(requests[2].url, /\/topics$/)
  assert.ok(requests[2].body.topics.every((topic) => topic.subscription === 'opt_out'))
  assert.equal(requests.some((request) => request.url.endsWith('/emails')), false)
})

test('Growth Core retains product interest when Resend rejects contact properties', async () => {
  const requests = []
  const { POST } = loadSubscribeRoute(async (url, options) => {
    requests.push({ url: String(url), body: JSON.parse(options.body) })
    if (requests.length === 1) return Response.json({ accepted: true })
    if (requests.length === 2) return Response.json({}, { status: 422 })
    if (requests.length === 3) return Response.json({ id: 'contact-id' })
    return Response.json({ success: true })
  })

  const response = await POST(subscribeRequest({
    email: 'fallback@example.invalid',
    listType: 'product-interest',
    intent: 'vibe-os',
  }))

  assert.equal(response.status, 200)
  assert.equal(requests[0].body.metadata.intent, 'vibe-os')
  assert.equal(requests[2].body.properties, undefined)
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

test('registered waitlist entry points preserve their delivery list routing', async () => {
  const course = await submitWaitlist('course-creator-business-systems')
  assert.equal(course.body.listType, 'courses-waitlist')
  const courseStatus = findElement(course.rendered, (element) => element.props?.role === 'status')
  assert.match(String(courseStatus?.props.children), /You are subscribed\./)

  const toolkit = await submitWaitlist('creative-ai-toolkit')
  assert.equal(toolkit.body.listType, 'premium-packs')
})

test('an unregistered valid product intent uses the interest-only path', async () => {
  const { body, rendered } = await submitWaitlist('vibe-os')
  assert.equal(body.intent, 'vibe-os')
  assert.equal(body.listType, 'product-interest')
  const status = findElement(rendered, (element) => element.props?.role === 'status')
  assert.match(String(status?.props.children), /Your interest was recorded\./)
  assert.doesNotMatch(String(status?.props.children), /You are subscribed\./)
})

test('missing, repeated, or unsafe intents cannot become product attribution', async () => {
  for (const intent of [undefined, ['bv-kit', 'prompt-vault'], '../bv-kit', '<script>']) {
    const { props, body } = await submitWaitlist(intent)
    assert.equal(props.intentLabel, undefined)
    assert.equal(body.intent, undefined)
    assert.equal(body.listType, 'courses-waitlist')
  }
})
