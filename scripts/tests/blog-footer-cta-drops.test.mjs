import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const cta = readFileSync(new URL('../../components/blog/BlogFooterCTA.tsx', import.meta.url), 'utf8')

// Any href to a dropped route, in object-literal form (href: '/x'), JSX string form
// (href="/x"), or JSX braces / template form (href={'/x'}, href={`/x`}).
const hrefTo = (route) =>
  new RegExp(`href\\s*[:=]\\s*\\{?\\s*[\`'"]${route.replace(/\//g, '\\/')}(?:[\\/?#\`'"])`)

const droppedRoutes = ['/inner-circle', '/ai-architecture/templates']

test('the href matcher recognises object, JSX string, braces and template forms', () => {
  for (const route of droppedRoutes) {
    const re = hrefTo(route)
    assert.match(`{ href: '${route}' }`, re)
    assert.match(`<Link href="${route}">Join</Link>`, re)
    assert.match(`<Link href={'${route}'}>Join</Link>`, re)
    assert.match(`<Link href={\`${route}\`}>Join</Link>`, re)
    assert.match(`<a href="${route}/apply">Join</a>`, re)
  }
})

test('blog footer CTA links neither dropped route in any form', () => {
  for (const route of droppedRoutes) {
    assert.doesNotMatch(cta, hrefTo(route), `href to ${route} reintroduced`)
    assert.ok(!cta.includes(route), `${route} appears in BlogFooterCTA.tsx`)
  }
})

test('blog footer CTA no longer promotes the Inner Circle as a live community', () => {
  assert.ok(!cta.includes('Weekly office hours, shared resources, direct access'))
  assert.ok(!cta.includes('Join the builder community'))
})

test('blog footer CTA no longer offers the coming-soon architecture templates', () => {
  assert.ok(!cta.includes('Download AI architecture templates'))
})

test('blog footer CTA drops the ACOS guide claims and keeps one plain link to /start', () => {
  assert.ok(!cta.includes('Build your first AI system'))
  assert.ok(!cta.includes('Step-by-step guide to setting up ACOS'))
  assert.ok(!cta.includes('GlowCard'))
  assert.ok(!cta.includes('md:grid-cols-3'))
  assert.equal((cta.match(/<Link\b/g) ?? []).length, 1)
  assert.match(cta, /<Link\s+href="\/start"[\s\S]*?>\s*Start here\s*<ArrowRight/)
})

test('the /start link has a 24px minimum tap target and names its destination', () => {
  const link = cta.match(/<Link\s[\s\S]*?>/)?.[0] ?? ''
  assert.match(link, /className="[^"]*\binline-flex\b[^"]*"/)
  assert.match(link, /className="[^"]*\bmin-h-6\b[^"]*"/)
  assert.match(link, /aria-label="Start here: find your founder constraint with the Founder Stack map"/)
})

test('the newsletter block under the blog footer promises no weekly cadence', () => {
  // The signup fine print says "Occasional"; the block description must not promise a schedule.
  const post = readFileSync(new URL('../../app/blog/[slug]/page.tsx', import.meta.url), 'utf8')
  assert.ok(!/Weekly field notes/i.test(post))
  assert.ok(post.includes('description="Field notes on AI systems, production patterns, and builder strategy."'))
})
