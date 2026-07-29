import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import {
  recommendedCourses,
  resolveCourseDestination,
} from '../../data/learning-catalog.ts'
import {
  OPENAI_MASTERY_VERIFIED_AT,
  openAIModes,
  openAIResources,
  openAIRolePaths,
} from '../../data/openai-mastery.ts'
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

test('OpenAI mastery keeps one hub, three mode paths, and the stable legacy URLs', () => {
  for (const page of [
    'app/learn/openai/page.tsx',
    'app/learn/chatgpt-work-mastery/page.tsx',
  ]) {
    assert.equal(fs.existsSync(path.join(root, page)), true, `${page} must exist`)
  }

  assert.deepEqual(
    openAIModes.map((mode) => mode.id),
    ['chat', 'work', 'codex'],
  )
  assert.deepEqual(
    openAIModes.map((mode) => mode.href),
    [
      '/learn/chatgpt-mastery',
      '/learn/chatgpt-work-mastery',
      '/learn/codex-mastery',
    ],
  )

  const legacyRegistry = fs.readFileSync(
    path.join(root, 'data/learning-paths.ts'),
    'utf8',
  )
  assert.match(legacyRegistry, /slug:\s*'chatgpt-mastery'/)
  assert.match(legacyRegistry, /slug:\s*'codex-mastery'/)
})

test('OpenAI mastery registry has explicit provenance, lifecycle, and freshness', () => {
  const ids = new Set()
  const isoDate = /^\d{4}-\d{2}-\d{2}$/

  assert.match(OPENAI_MASTERY_VERIFIED_AT, isoDate)

  for (const resource of openAIResources) {
    assert.equal(ids.has(resource.id), false, `${resource.id} must be unique`)
    ids.add(resource.id)
    assert.equal(resource.url.startsWith('https://'), true, `${resource.id} must use HTTPS`)
    assert.match(resource.lastVerifiedAt, isoDate, `${resource.id} needs an ISO review date`)
    assert.equal(typeof resource.official, 'boolean')
    assert.ok(resource.audiences.length > 0, `${resource.id} needs at least one audience`)
    assert.ok(resource.surfaces.length > 0, `${resource.id} needs at least one surface`)
  }

  assert.equal(
    openAIResources.some((resource) => resource.url === 'https://github.com/openai/skills'),
    false,
    'the deprecated openai/skills catalog must not be presented as current',
  )
  assert.equal(
    openAIResources.some(
      (resource) =>
        resource.url === 'https://github.com/openai/plugins' &&
        resource.status === 'current',
    ),
    true,
    'openai/plugins must be the current official catalog',
  )
})

test('OpenAI role recommendations remain a bounded routing layer', () => {
  assert.deepEqual(
    openAIRolePaths.map((role) => role.id),
    ['founder', 'creator', 'researcher', 'developer', 'team'],
  )

  for (const role of openAIRolePaths) {
    assert.notEqual(role.primarySurface, role.secondarySurface)
    assert.equal(role.nextHref.startsWith('/'), true)
  }
})

test('OpenAI hub emits collection schemas instead of pretending to be one course', () => {
  const hub = fs.readFileSync(path.join(root, 'app/learn/openai/page.tsx'), 'utf8')
  const workPath = fs.readFileSync(
    path.join(root, 'app/learn/chatgpt-work-mastery/page.tsx'),
    'utf8',
  )

  assert.match(hub, /type="CollectionPage"/)
  assert.match(hub, /type="ItemList"/)
  assert.match(hub, /type="BreadcrumbList"/)
  assert.doesNotMatch(hub, /type="Course"/)
  assert.match(workPath, /type="Course"/)
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
