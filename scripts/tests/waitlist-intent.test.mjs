import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
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
    'next/link': { default: 'a' },
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
  return { props: signup.props, body: requests[0].body }
}

for (const [intent, label] of [['bv-kit', 'Creator BV Kit'], ['prompt-vault', 'Prompt Vault']]) {
  test(`${intent} reaches the signup request with its product identity and launch list`, async () => {
    const { props, body } = await submitWaitlist(`  ${intent}  `)
    assert.equal(props.intentLabel, label)
    assert.equal(body.intent, intent)
    assert.equal(body.listType, 'premium-packs')
    assert.equal(body.source, '/waitlist')
  })
}

test('legacy waitlist entry points preserve their current list routing', async () => {
  for (const intent of ['course-creator-business-systems', 'creative-ai-toolkit']) {
    const { body } = await submitWaitlist(intent)
    assert.equal(body.intent, intent)
    assert.equal(body.listType, 'courses-waitlist')
  }
})

test('missing, repeated, or unsafe intents cannot become product attribution', async () => {
  for (const intent of [undefined, ['bv-kit', 'prompt-vault'], '../bv-kit', '<script>']) {
    const { props, body } = await submitWaitlist(intent)
    assert.equal(props.intentLabel, undefined)
    assert.equal(body.intent, undefined)
    assert.equal(body.listType, 'courses-waitlist')
  }
})

test('ai-architect-academy asks the three questions on the shared waitlist', async () => {
  const { props, body } = await submitWaitlist('ai-architect-academy')
  assert.equal(props.intentLabel, 'AI Architect Academy')
  assert.equal(props.askDemand, true)
  assert.equal(body.intent, 'ai-architect-academy')
  assert.equal(body.listType, 'courses-waitlist')
  assert.equal(body.source, '/waitlist')
})

test('ai-architect-academy roles come from the shared demand vocabulary', () => {
  const { rolesFor } = loadModule('lib/diagnostic/demand.ts')
  assert.deepEqual(rolesFor('ai-architect-academy'), [
    'Engineer',
    'Architect / staff+',
    'Eng manager',
    'Consultant',
    'Founder',
    'Career switcher',
  ])
})

test('the blog post is the ADR gift plus the shared capture', () => {
  const postUrl = repoFile('content/blog/one-architecture-decision-you-can-use-today.mdx')
  const post = readFileSync(postUrl, 'utf8')
  assert.match(post, /Retrieval before fine-tuning/)
  assert.match(post, /intent="ai-architect-academy"/)
  assert.match(post, /askDemand=\{true\}/)
  assert.match(post, /listType="courses-waitlist"/)
  assert.equal(post.includes('/checkout'), false)
  assert.equal(post.includes('299'), false)
  assert.equal(existsSync(fileURLToPath(repoFile(
    'public/images/blog/generated/frankx-editorial-20260830/ai-architecture-four-seams.webp',
  ))), true)
  const components = readFileSync(repoFile('components/blog/MDXComponents.tsx'), 'utf8')
  assert.match(components, /EmailSignup/)
})
