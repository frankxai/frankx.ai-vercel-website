import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import {
  recommendedCourses,
  resolveCourseDestination,
} from '../../data/learning-catalog.ts'
import { enumerateRoutes } from '../../lib/route-enumeration.mjs'

const root = process.cwd()

test('learning discovery and Academy pattern routes exist', () => {
  const requiredPages = [
    'app/learn/page.tsx',
    'app/courses/page.tsx',
    'app/ai-architect-academy/page.tsx',
    'app/ai-architect-academy/patterns/page.tsx',
  ]

  for (const page of requiredPages) {
    // An index page may sit in an (index) route group so its loading.tsx wraps
    // only the index and not the dynamic siblings beside it. Route groups do
    // not change the URL, so either location satisfies "this route exists" —
    // and deleting the page still fails, which is what this guard is for.
    const grouped = page.replace(/\/page\.tsx$/, '/(index)/page.tsx')
    const exists =
      fs.existsSync(path.join(root, page)) || fs.existsSync(path.join(root, grouped))
    assert.equal(exists, true, `${page} (or ${grouped}) must exist`)
  }
})

test('legacy Academy paths resolve to the canonical Academy route', () => {
  const redirects = JSON.parse(
    fs.readFileSync(path.join(root, 'data/redirect-aliases.json'), 'utf8'),
  )

  for (const alias of [
    '/academy',
    '/aiarchitectacademy',
    '/ar-architect-academy',
    '/architect-academy',
  ]) {
    assert.equal(
      redirects.aliases[alias],
      '/ai-architect-academy',
      `${alias} must resolve to /ai-architect-academy`,
    )
  }
})

test('retired signal entry resolves to the maintained architecture field guide', () => {
  const redirects = JSON.parse(
    fs.readFileSync(path.join(root, 'data/redirect-aliases.json'), 'utf8'),
  )

  assert.equal(redirects.aliases['/signal'], '/ai-architecture')
  assert.equal(
    fs.existsSync(path.join(root, 'app/ai-architecture/page.tsx')),
    true,
    'the /signal destination must remain a real page',
  )
})

test('Mindvalley University aliases resolve permanently to the canonical MVU page', async () => {
  const redirects = JSON.parse(
    fs.readFileSync(path.join(root, 'data/redirect-aliases.json'), 'utf8'),
  )
  const nextConfig = (await import('../../next.config.mjs')).default
  const configuredRedirects = await nextConfig.redirects()

  assert.equal(
    fs.existsSync(path.join(root, 'app/mvu/page.tsx')),
    true,
    'the canonical /mvu destination must remain a real page',
  )

  for (const source of ['/mindvalley-university', '/mindvalleyuniversity']) {
    assert.equal(redirects.aliases[source], '/mvu')
    assert.deepEqual(
      configuredRedirects.find((redirect) => redirect.source === source),
      {
        source,
        destination: '/mvu',
        permanent: true,
      },
    )
  }
})

test('Academy learning-path claims stay aligned with the rendered preview cards', () => {
  const academy = fs.readFileSync(
    path.join(root, 'app/ai-architect-academy/page.tsx'),
    'utf8',
  )
  const previewBlock = academy.match(
    /const learningPathPreviews = \[([\s\S]*?)\n\]\n\nconst colorMap/,
  )?.[1]

  assert.ok(previewBlock, 'learningPathPreviews must remain a readable static catalog')
  assert.equal(
    previewBlock.match(/\btitle:/g)?.length,
    4,
    'the Academy currently renders four learning-path previews',
  )
  assert.match(academy, /value: String\(learningPathPreviews\.length\)/)
  assert.match(academy, /\{learningPathPreviews\.length\} curriculum previews/)
  assert.match(academy, /\{learningPathPreviews\.map\(\(path, i\) =>/)
  assert.doesNotMatch(academy, /five core learning paths/i)
})

test('learning outcome icons fail safely when the outcome catalog grows', () => {
  const learnShell = fs.readFileSync(
    path.join(root, 'components/learn/LearnShell.tsx'),
    'utf8',
  )

  assert.match(
    learnShell,
    /const Icon = outcomeIcons\[index\] \?\? BookOpen/,
  )
})

test('course recommendations fail closed unless an affiliate URL is explicitly approved', () => {
  const editorialCourse = recommendedCourses[0]
  const unapprovedAffiliate = {
    ...editorialCourse,
    relationship: 'affiliate',
    affiliateUrl: 'https://example.com/unapproved-tracking-link',
  }
  const approvedAffiliate = {
    ...unapprovedAffiliate,
    affiliateApproval: {
      status: 'approved',
      program: 'Impact',
      approvedAt: '2026-07-25',
    },
  }

  assert.deepEqual(resolveCourseDestination(unapprovedAffiliate), {
    href: editorialCourse.canonicalUrl,
    isAffiliate: false,
  })
  assert.deepEqual(resolveCourseDestination(approvedAffiliate), {
    href: approvedAffiliate.affiliateUrl,
    isAffiliate: true,
  })
  assert.deepEqual(
    resolveCourseDestination({
      ...approvedAffiliate,
      relationship: 'editorial',
    }),
    {
      href: editorialCourse.canonicalUrl,
      isAffiliate: false,
    },
  )

  for (const course of recommendedCourses) {
    if (!course.affiliateUrl) continue
    assert.equal(course.relationship, 'affiliate')
    assert.equal(course.affiliateApproval?.status, 'approved')
  }
})

test('recipient-specific pages stay live but out of generated discovery surfaces', () => {
  const consentGatedRoutes = ['/friends/ana', '/mvu/sabrina']
  const generatedIndex = JSON.parse(
    fs.readFileSync(path.join(root, 'data/route-index.json'), 'utf8'),
  )
  const indexedRoutes = new Set(generatedIndex.routes.map((route) => route.href))
  const enumeratedRoutes = new Set(enumerateRoutes().map((route) => route.href))
  const anaPage = fs.readFileSync(
    path.join(root, 'app/friends/ana/page.tsx'),
    'utf8',
  )
  const sabrinaPage = fs.readFileSync(
    path.join(root, 'app/mvu/sabrina/page.tsx'),
    'utf8',
  )

  assert.match(anaPage, /noindex: true/)
  assert.match(sabrinaPage, /robots:\s*\{[\s\S]*?index: false/)

  for (const href of consentGatedRoutes) {
    assert.equal(
      fs.existsSync(path.join(root, 'app', href.slice(1), 'page.tsx')),
      true,
      `${href} must remain directly reachable`,
    )
    assert.equal(enumeratedRoutes.has(href), false, `${href} must not be enumerated`)
    assert.equal(indexedRoutes.has(href), false, `${href} must not be indexed`)
  }
})

test('Academy implementation CTA uses the privacy-safe analytics convention', () => {
  const patternsPage = fs.readFileSync(
    path.join(root, 'app/ai-architect-academy/patterns/page.tsx'),
    'utf8',
  )

  assert.match(patternsPage, /<TrackedLink[\s\S]*?eventName="cta_click"/)
  assert.match(patternsPage, /location: 'academy-patterns'/)
  assert.match(patternsPage, /target: 'implementation-patterns'/)
  assert.doesNotMatch(
    patternsPage.slice(patternsPage.indexOf('<TrackedLink')),
    /\b(?:url|href|email|name):\s*['"]/,
  )
})
