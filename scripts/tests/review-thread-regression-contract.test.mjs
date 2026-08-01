import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('release status comes from one registry and one gate definition', async () => {
  const [buildHub, productPage, products, gates] = await Promise.all([
    readRepoFile('app/build/page.tsx'),
    readRepoFile('app/build/[slug]/page.tsx'),
    readRepoFile('data/products.ts'),
    readRepoFile('lib/release-gates.ts'),
  ])

  assert.match(buildHub, /getProductBySlug\('six-primitives-primer'\)/)
  assert.match(buildHub, /getProductBySlug\('six-primitives-toolkit'\)/)
  assert.match(buildHub, /SIX_PRIMITIVES_RELEASE_GATES/)
  assert.match(productPage, /SIX_PRIMITIVES_RELEASE_GATES/)
  assert.match(productPage, /noindex: true/)
  assert.match(products, /eur\?: number/)
  assert.match(products, /pricing: \{ plannedEur: 197, cadence: 'unavailable' \}/)
  assert.doesNotMatch(products, /productsByStage/)
  assert.doesNotMatch(products, /seatsPerQuarter/)
  assert.match(gates, /The final files match the published contents list/)
})

test('retired routes consolidate permanently and conversion paths are measured', async () => {
  const [founders, application, home, start, build] = await Promise.all([
    readRepoFile('app/founders-circle/page.tsx'),
    readRepoFile('app/founders-circle/apply/page.tsx'),
    readRepoFile('components/home/FrankXProductionHome.tsx'),
    readRepoFile('app/start/page.tsx'),
    readRepoFile('app/build/page.tsx'),
  ])

  for (const source of [founders, application]) {
    assert.match(source, /permanentRedirect\('\/work-with-me#contact'\)/)
    assert.doesNotMatch(source, /import \{ redirect \}/)
  }

  for (const source of [home, start, build]) {
    assert.match(source, /TrackedLink/)
    assert.match(source, /eventName="creator_funnel_step"/)
  }
})

test('commerce identity and the current A2A discovery path have one truthful source', async () => {
  const [
    commerce,
    productPage,
    buyButton,
    templates,
    primer,
    cardGuide,
    essay,
    email,
    workshops,
    specEmail,
    walkthrough,
    transferMatrix,
  ] =
    await Promise.all([
      readRepoFile('lib/commerce-links.ts'),
      readRepoFile('app/build/[slug]/page.tsx'),
      readRepoFile('components/funnel/BuyButton.tsx'),
      readRepoFile('app/ai-architecture/templates/page.tsx'),
      readRepoFile('content/guides/first-agent-primer.mdx'),
      readRepoFile('content/guides/agent-card-a2a-spec.mdx'),
      readRepoFile('content/blog/six-primitives-ai-agent.mdx'),
      readRepoFile('content/email/funnel/08-walkthrough.md'),
      readRepoFile('data/workshops.ts'),
      readRepoFile('content/email/funnel/06-spec.md'),
      readRepoFile('content/email/funnel/08-walkthrough.md'),
      readRepoFile('content/email/funnel/09-transfer-matrix.md'),
    ])

  assert.match(commerce, /https:\/\/frankx\.lemonsqueezy\.com/)
  for (const source of [productPage, buyButton, templates]) {
    assert.match(source, /commerceLinks\.lemonSqueezyStorefront/)
    assert.doesNotMatch(source, /https:\/\/frankx\.lemonsqueezy\.com/)
  }

  for (const source of [primer, cardGuide, essay, email]) {
    assert.match(source, /\.well-known\/agent-card\.json/)
    assert.doesNotMatch(source, /\.well-known\/agent\.json/)
  }

  for (const source of [primer, cardGuide, essay]) {
    assert.match(source, /supportedInterfaces/)
    assert.match(source, /protocolBinding/)
    assert.match(source, /protocolVersion/)
  }
  assert.match(cardGuide, /securitySchemes/)
  assert.doesNotMatch(cardGuide, /"authentication":/)
  assert.doesNotMatch(cardGuide, /stateTransitionHistory/)
  for (const source of [primer, workshops, specEmail, walkthrough, transferMatrix]) {
    assert.doesNotMatch(source, /Google A2A/)
  }
  assert.match(primer, /CORS headers are a separate browser boundary/)
  assert.match(workshops, /compatible A2A clients can discover/)
  assert.match(workshops, /need native A2A client support or an adapter/)
  for (const source of [specEmail, walkthrough]) {
    assert.match(source, /supportedInterfaces/)
    assert.match(source, /protocolBinding/)
    assert.match(source, /protocolVersion/)
  }
  assert.doesNotMatch(specEmail, /"provider": \{ "name":/)
  assert.doesNotMatch(specEmail, /lowest-common-denominator/)
  assert.doesNotMatch(specEmail, /BCG's enterprise agent playbook/)
  assert.match(specEmail, /neither is a subset of the other/)
  assert.match(walkthrough, /server-to-server A2A clients do not rely on browser CORS/)
  assert.match(transferMatrix, /need a compatible server binding or adapter/)
  assert.doesNotMatch(transferMatrix, /same Card works whether/)
  assert.doesNotMatch(primer, /isn't discoverable from another origin/)
  assert.doesNotMatch(cardGuide, /cross-origin browser discovery/)
})

test('the blog collection route is concrete despite its route group', async () => {
  const blogIndex = await readRepoFile('app/blog/(index)/page.tsx')
  assert.match(blogIndex, /export default function BlogPage/)
})

test('the inquiry form and walkthrough expose their real privacy and setup boundaries', async () => {
  const [inquiry, privacy, inquiryRoute, walkthrough] = await Promise.all([
    readRepoFile('app/work-with-me/StudioClient.tsx'),
    readRepoFile('app/privacy/page.tsx'),
    readRepoFile('app/api/studio-inquiry/route.ts'),
    readRepoFile('content/email/funnel/08-walkthrough.md'),
  ])

  assert.match(inquiry, /autoComplete="name"/)
  assert.match(inquiry, /autoComplete="email"/)
  assert.match(inquiry, /autoComplete="organization"/)
  assert.match(inquiry, /href="\/privacy"/)
  assert.match(inquiry, /store these details only to review and/)
  assert.match(privacy, /your name, email address, message, and/)
  assert.match(privacy, /The form sends those details through Resend/)
  assert.match(privacy, /Sending an inquiry does not add you to a marketing list/)
  assert.match(inquiryRoute, /https:\/\/api\.resend\.com\/emails/)
  assert.match(inquiryRoute, /reply_to: email\.trim\(\)/)

  assert.match(walkthrough, /without assuming that you downloaded a repository or handout/)
  assert.match(walkthrough, /project you control/)
  assert.doesNotMatch(walkthrough, /handout you downloaded/)
  assert.doesNotMatch(walkthrough, /Open `src\//)
  assert.doesNotMatch(walkthrough, /Run `pnpm eval`/)
})
