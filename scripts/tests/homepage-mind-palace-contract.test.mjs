import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('the public homepage is the Human Proof Studio release', async () => {
  const page = await readRepoFile('app/page.tsx')
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')

  assert.match(
    page,
    /import FrankXProductionHome from '@\/components\/home\/FrankXProductionHome'/,
  )
  assert.match(page, /<FrankXProductionHome latestPosts=\{latestPosts\} \/>/)
  assert.match(page, /FrankX — Agentic Systems for Creator-Operators/)
  assert.match(
    page,
    /Frank Riemer maps the approvals, replies, research, reporting, and handoffs that still return to creator-operators/,
  )
  assert.doesNotMatch(page, /HomePageElite/)
  assert.doesNotMatch(page, /homepageFeaturedRelease/)
  assert.doesNotMatch(page, /getPublishedBooks/)
  assert.doesNotMatch(page, /FAQPageJsonLd/)

  assert.match(homepage, /Agentic systems for creator-operators/)
  assert.match(homepage, /Remove one recurring workflow/)
  assert.match(homepage, /from your daily path\./)
  assert.match(
    homepage,
    /You already use AI\. The approvals, replies, research, reporting, and handoffs still/,
  )
  assert.match(homepage, /Map the workflow that waits on me/)
  assert.match(homepage, /href="\/work-with-me#contact"/)
  assert.match(homepage, /Already shipping agents\? See the Toolkit’s release status\./)
  assert.match(homepage, /Frank Riemer · AI Architect · Independent practice/)
  assert.match(homepage, /not affiliated with, endorsed by, or sponsored by Oracle/)
})

test('homepage proof is factual, bounded, and inspectable', async () => {
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')

  assert.match(homepage, /Frank Riemer presenting an AI architecture session, 2025\./)
  assert.match(
    homepage,
    /A useful system makes its decisions visible: what it may do, when a person/,
  )
  assert.match(homepage, /how output is evaluated, what it may cost, and how it is stopped\./)

  for (const route of [
    '/blog/production-agentic-ai-systems',
    '/ai-architecture/blueprints',
    '/journal',
  ]) {
    assert.ok(homepage.includes(`href: '${route}'`), `missing proof route: ${route}`)
  }

  assert.doesNotMatch(homepage, /Focused handoffs/)
  assert.doesNotMatch(homepage, /ecosystemRoutes/)
  assert.doesNotMatch(homepage, /Evidence before adjectives/)
  assert.doesNotMatch(homepage, /Scope confirmed before work begins/)
  assert.doesNotMatch(homepage, /Worked example/)
  assert.doesNotMatch(homepage, /client work/i)
})

test('the start page routes by current state without contradictory entry spines', async () => {
  const start = await readRepoFile('app/start/page.tsx')

  for (const copy of [
    'Choose by current state',
    'Start with the work that is stuck.',
    'I need a clear model before I build.',
    'I have a working agent. Reliability is the problem.',
    'Approvals and handoffs still return to me.',
    'I have expertise, but no repeatable publishing loop.',
    'Get the free Primer',
    'Check Toolkit status',
    'Map the workflow',
    'Explore GenCreator',
    'I’m here to study the work.',
    'Durable essays',
    'Dated field notes',
  ]) {
    assert.ok(start.includes(copy), `missing start-page copy: ${copy}`)
  }

  for (const route of [
    '/start-here',
    '/build/six-primitives-toolkit',
    '/work-with-me#contact',
    '/gencreator',
    '/blog',
    '/journal',
  ]) {
    assert.ok(start.includes(route), `missing start-page route: ${route}`)
  }

  assert.doesNotMatch(start, /Join Signal Loop/)
  assert.doesNotMatch(start, /Music Lab/)
  assert.doesNotMatch(start, /Peak State Systems/)
  assert.doesNotMatch(start, /12,000\+/)
  assert.doesNotMatch(start, /For agents and search systems/)
})

test('the Toolkit and paid product pages fail closed until checkout is verified', async () => {
  const productPage = await readRepoFile('app/build/[slug]/page.tsx')
  const buildHub = await readRepoFile('app/build/page.tsx')
  const products = await readRepoFile('data/products.ts')
  const normalizedProductPage = productPage.replace(/\s+/g, ' ')

  for (const copy of [
    'Release status · Planned price €197',
    'Checkout is not open.',
    'No payment is collected on this page.',
    'Planned price: €197, one-time.',
    'Open the public Six Primitives path',
    'Toolkit checkout is not open.',
  ]) {
    assert.ok(normalizedProductPage.includes(copy), `missing Toolkit release copy: ${copy}`)
  }

  assert.match(productPage, /if \(!product\.pricing\.lemonSqueezyVariantId\)/)
  assert.match(productPage, /noindex: !isCheckoutOpen/)
  assert.doesNotMatch(productPage, /<BuyButton/)
  assert.doesNotMatch(productPage, /<OutcomeList/)
  assert.doesNotMatch(productPage, /<ValueStack/)
  assert.doesNotMatch(productPage, /<RefundGuarantee/)
  assert.doesNotMatch(buildHub, /<PricingTable/)
  assert.doesNotMatch(buildHub, /Founder’s Circle|Founder's Circle/)

  const toolkitStart = products.indexOf("slug: 'six-primitives-toolkit'")
  const toolkit = products.slice(toolkitStart)

  assert.match(toolkit, /outcomes: \[\]/)
  assert.match(toolkit, /includes: \[\]/)
  assert.match(toolkit, /releaseStatus: 'unavailable'/)
  assert.match(toolkit, /featured: false/)
  for (const stoppedClaim of [
    'Most buyers',
    '30+ Agent',
    '50 patterns',
    '100 cases',
    'Discord',
    'Private GitHub',
    'Lifetime access',
    'no-questions refund',
  ]) {
    assert.doesNotMatch(toolkit, new RegExp(stoppedClaim), `Toolkit still contains: ${stoppedClaim}`)
  }
})

test('the promoted Six Primitives path exposes only public artifacts and unavailable paid status', async () => {
  const sources = await Promise.all(
    [
      'app/start-here/page.tsx',
      'app/build/page.tsx',
      'app/build/[slug]/page.tsx',
      'data/products.ts',
      'data/workshops.ts',
      'content/blog/six-primitives-ai-agent.mdx',
      'content/blog/vercel-ai-sdk-first-agent-stack.mdx',
      'content/guides/first-agent-primer.mdx',
      'content/guides/agent-card-a2a-spec.mdx',
      'content/email/funnel/00-welcome.md',
      'content/email/funnel/02-model.md',
      'content/email/funnel/03-tool.md',
      'content/email/funnel/04-memory.md',
      'content/email/funnel/05-loop.md',
      'content/email/funnel/06-spec.md',
      'content/email/funnel/07-deploy.md',
      'content/email/funnel/08-walkthrough.md',
      'content/email/funnel/09-transfer-matrix.md',
      'content/email/funnel/README.md',
    ].map(readRepoFile),
  )
  const publicClaims = sources.join('\n')
  const startHere = sources[0]

  assert.match(startHere, /Public now · No form · No checkout/)
  assert.match(startHere, /One mental model\. Two public artifacts\./)
  assert.match(startHere, /href: '\/blog\/six-primitives-ai-agent'/)
  assert.match(startHere, /href: '\/guides\/first-agent-primer'/)
  assert.match(startHere, /No paid Six Primitives offer is available today/)
  assert.match(startHere, /final contents, delivery, or refund terms/)
  assert.doesNotMatch(startHere, /EmailSignup|courses-waitlist/)
  assert.doesNotMatch(
    publicClaims,
    /first-agent-vercel-aisdk|downloads\/six-primitives-primer\.pdf|cloneable starter repository is available/i,
  )

  for (const stoppedClaim of [
    'six-primitives-pack',
    'Six Primitives Pack',
    'six-primitives-mastery',
    'Six Primitives Mastery',
    'six-primitives-architect',
    'Six Primitives Architect',
    'most builders settle',
    'most working builders settle',
    '30-day refund',
    'no-questions refund',
    '30+ Agent',
    '50-pattern',
    '100-case',
    'Discord community',
    'five tiers',
    '€497',
    '€997',
    '€2,997',
  ]) {
    assert.doesNotMatch(
      publicClaims,
      new RegExp(stoppedClaim, 'i'),
      `promoted Six Primitives source still contains: ${stoppedClaim}`,
    )
  }
})

test('footer and machine-readable surfaces share the canonical proposition', async () => {
  const footer = await readRepoFile('components/Footer.tsx')
  const llms = await readRepoFile('app/llms.txt/route.ts')
  const llmsFull = await readRepoFile('app/llms-full.txt/route.ts')
  const machineCopy = `${llms}\n${llmsFull}`

  assert.match(footer, /Agentic systems and field notes/)
  assert.match(footer, /maps founder-routed work and builds bounded agent systems/)
  assert.doesNotMatch(footer, /Weekly dispatch|One email per week|Foundry|Founder’s Circle|Coaching/)

  for (const source of [llms, llmsFull]) {
    assert.match(source, /independent studio for bounded agent systems/)
    assert.match(source, /maps one recurring founder-routed workflow/)
    assert.match(source, /Checkout is not open|checkout is not open/)
  }

  for (const stoppedClaim of [
    '12,000+',
    'enterprise-grade',
    '5-tier',
    '10 seats',
    'application-only quarterly cohort',
    '1:1 advisory',
    'multi-agent research operation',
    'MIT-licensed',
  ]) {
    assert.doesNotMatch(machineCopy, new RegExp(stoppedClaim), `machine copy still contains: ${stoppedClaim}`)
  }
})
