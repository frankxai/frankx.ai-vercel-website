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
    '@/lib/track': { trackWaitlistJoin() {} },
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
  const answerDemand = async () => {
    const roleButton = findElement(renderSignup(), (element) => element.type === 'button' && typeof element.props.onClick === 'function')
    roleButton.props.onClick()
    const forms = []
    findElement(renderSignup(), (element) => { if (element.type === 'form') forms.push(element); return false })
    await forms.at(-1).props.onSubmit({ preventDefault() {} })
    return requests.at(-1)
  }
  return { props: signup.props, body: requests[0].body, answerDemand }
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

test('both Command Center Template CTAs lead to its labelled premium launch list', async () => {
  const slug = 'command-center-template'
  const label = 'The Command Center Template'
  const registry = { '@/data/products.json': { default: require('../../data/products.json') } }
  const links = { 'next/link': { default: 'a' }, 'next/image': { default: 'img' } }
  const { default: CatalogPage } = loadModule('app/products/(index)/page.tsx', {
    ...registry,
    ...links,
    react: {
      useState: (initial) => [initial === 'All' ? 'Systems and code' : initial, () => {}],
      useMemo: (compute) => compute(),
    },
    'framer-motion': { motion: { div: 'div' }, useReducedMotion: () => true },
    '@/lib/analytics': { trackEvent() {} },
    '@/components/ui/glow-card': { GlowCard: 'article' },
  })
  const { default: ProductPage } = loadModule('app/products/[slug]/page.tsx', {
    ...links,
    '@/lib/products': loadModule('lib/products.ts', registry),
    '@/lib/products/preview-manifests': { getPreviewManifest: () => undefined },
    '@/lib/seo': { siteConfig: { url: 'https://example.invalid' } },
    '@/components/seo/JsonLd': { default: () => null },
    '@/components/seo/Breadcrumbs': { default: () => null },
    '@/components/products/ProductFileInspector': { default: () => null },
  })

  const catalogCard = findElement(CatalogPage(), (node) => node.type === 'article' &&
    findElement(node, (heading) => heading.type === 'h3' && heading.props.children === label))
  const detailPage = await ProductPage({ params: Promise.resolve({ slug }) })
  const signups = []
  for (const page of [catalogCard, detailPage]) {
    const link = findElement(page, (node) => node.type === 'a' && node.props.href?.startsWith('/waitlist?'))
    assert.ok(link, 'Command Center must have a waitlist CTA')
    const url = new URL(link.props.href, 'https://example.invalid')
    const { props, body } = await submitWaitlist(url.searchParams.get('intent'))
    signups.push({ label: props.intentLabel, intent: body.intent, listType: body.listType })
  }
  assert.deepEqual(signups, Array(2).fill({ label, intent: slug, listType: 'premium-packs' }))
})

test('Multi-agent Ops links from Playbooks to its tagged premium-pack waitlist', async () => {
  const { playbookTracks } = loadModule('data/playbooks.ts')
  const pack = playbookTracks.flatMap((track) => track.items).find((item) => item.title === 'Multi-agent Ops')
  assert.equal(pack?.format, 'Prelaunch waitlist')
  assert.equal(pack.href, '/waitlist?intent=multi-agent-ops')

  const intent = new URL(pack.href, 'https://example.invalid').searchParams.get('intent')
  const { props, body } = await submitWaitlist(intent)
  assert.equal(props.intentLabel, pack.title)
  assert.equal(props.askDemand, false)
  assert.equal(body.intent, intent)
  assert.equal(body.listType, 'premium-packs')
})

test('Creator Studio OS waitlist links reach its labelled premium list', async () => {
  const products = JSON.parse(readFileSync(repoFile('data/products.json'), 'utf8'))
  const product = products.find((entry) => entry.id === 'generative-creator-os')
  const ctaImports = {
    'next/link': { default: 'a' },
    '@/lib/analytics': {},
    '@/lib/track': {},
    '@/lib/products/preview-manifests': { getPreviewManifest: () => undefined },
    '@/components/products/ProductFileInspector': { default: 'div' },
  }
  const ctas = Object.fromEntries(['ProductHero', 'OfferStack', 'FinalCTA'].map((name) => {
    const path = `components/products/${name}`
    return [`@/${path}`, loadModule(`${path}.tsx`, ctaImports)]
  }))
  const { default: ProductPage } = loadModule('app/products/generative-creator-os/page.tsx', {
    ...ctas,
    '@/data/products.json': { default: products },
    '@/components/products/ProofRail': { default: 'div' },
    '@/components/products/TransformationList': { default: 'div' },
    '@/lib/seo': { comingSoonProductStructuredData: () => ({}), createMetadata: (value) => value },
  })
  const page = ProductPage()
  const hrefs = Object.entries(ctas).map(([path, { default: CTA }]) => {
    const component = findElement(page, (element) => element.type === CTA)
    assert.ok(component, `${path} must render on the product page`)
    const link = findElement(CTA(component.props), (element) => element.type === 'a' && element.props.href?.startsWith('/waitlist?'))
    assert.ok(link, `${path} must link to the waitlist`)
    return link.props.href
  })
  assert.deepEqual(hrefs, Array(3).fill('/waitlist?intent=generative-creator-os'))

  const intent = new URL(hrefs[0], 'https://example.invalid').searchParams.get('intent')
  const { props, body } = await submitWaitlist(intent)
  assert.equal(props.intentLabel, product.name)
  assert.equal(body.intent, product.id)
  assert.equal(body.listType, 'premium-packs')
  assert.equal(body.source, '/waitlist')
})

test('legacy waitlist entry points preserve their current list routing', async () => {
  for (const intent of ['course-creator-business-systems', 'creative-ai-toolkit']) {
    const { body } = await submitWaitlist(intent)
    assert.equal(body.intent, intent)
    assert.equal(body.listType, 'courses-waitlist')
  }
})

for (const intent of ['creative-ai-toolkit', 'creation-chronicles']) {
  test(`${intent} gets a per-product waitlist that asks the demand questions`, async () => {
    const { props, body } = await submitWaitlist(intent)
    assert.equal(props.askDemand, true)
    assert.equal(props.intent, intent)
    assert.equal(body.intent, intent)
    assert.equal(body.source, '/waitlist')
  })

  test(`${intent} demand answers keep the list the signup was written to`, async () => {
    const { body, answerDemand } = await submitWaitlist(intent)
    const demand = await answerDemand()
    assert.equal(demand.url, '/api/demand')
    assert.equal(demand.body.intent, intent)
    assert.equal(demand.body.listType, body.listType)
  })
}

test('missing, repeated, or unsafe intents cannot become product attribution', async () => {
  for (const intent of [undefined, ['bv-kit', 'prompt-vault'], '../bv-kit', '<script>']) {
    const { props, body } = await submitWaitlist(intent)
    assert.equal(props.intentLabel, undefined)
    assert.equal(body.intent, undefined)
    assert.equal(body.listType, 'courses-waitlist')
  }
})

test('creation-chronicles launch-list CTA files the signup under its own list, not the generic waitlist', async () => {
  const { props, body } = await submitWaitlist('creation-chronicles')
  assert.equal(props.intentLabel, 'Creation Chronicles')
  assert.equal(body.intent, 'creation-chronicles')
  assert.equal(body.listType, 'creation-chronicles')
  assert.equal(body.source, '/waitlist')
})
