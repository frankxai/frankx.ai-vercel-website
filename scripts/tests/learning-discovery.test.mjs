import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import test from 'node:test'
import vm from 'node:vm'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const root = process.cwd()
const missing = () => { throw new Error('NEXT_HTTP_ERROR_FALLBACK;404') }
const fixture = {
  id: 'chatgpt', slug: 'chatgpt-mastery', title: 'ChatGPT & OpenAI Mastery',
  description: 'A source-backed learning path.', icon: 'brain', color: 'emerald',
  difficulty: 'beginner', category: 'model-maker', outcomes: ['Check the output'],
  relatedGuides: [], videos: [
    { id: 'one', youtubeId: 'test-one', title: 'First lesson', creator: 'Teacher',
      creatorChannel: 'https://example.com/teacher', duration: '10:00',
      level: 'beginner', description: 'One complete example.', tags: ['Research'] },
  ],
}

function load(file, overrides = {}) {
  const code = ts.transpileModule(readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  }).outputText
  const module = { exports: {} }
  const dependencies = {
    'next/navigation': { notFound: missing },
    '@/data/learning-paths': { learningPaths: [fixture, { ...fixture, id: 'other', slug: 'other' }] },
    '@/lib/seo': { createMetadata: (options) => options, siteConfig: { url: 'https://www.frankx.ai' } },
    ...overrides,
  }
  vm.runInNewContext(code, {
    exports: module.exports, module,
    require: (id) => Object.hasOwn(dependencies, id) ? dependencies[id] : require(id),
  }, { filename: file })
  return module.exports
}

test('metadata and server page reject unknown portals before emitting a canonical or body', async () => {
  const layout = load('app/learn/[slug]/layout.tsx')
  const page = load('app/learn/[slug]/page.tsx', {
    '@/components/learn/LearningPathPage': { default: () => null, __esModule: true },
  })
  const request = { params: Promise.resolve({ slug: 'not-a-portal' }) }
  await assert.rejects(layout.generateMetadata(request), /;404/)
  await assert.rejects(page.default(request), /;404/)
  assert.equal(layout.dynamicParams, false)
})

test('known portal metadata and client payload use the same selected catalog record', async () => {
  const layout = load('app/learn/[slug]/layout.tsx')
  const page = load('app/learn/[slug]/page.tsx', {
    '@/components/learn/LearningPathPage': { default: () => null, __esModule: true },
  })
  const request = { params: Promise.resolve({ slug: fixture.slug }) }
  const metadata = await layout.generateMetadata(request)
  const element = await page.default(request)
  assert.equal(metadata.path, `/learn/${fixture.slug}`)
  assert.equal(metadata.description, fixture.description)
  assert.equal(element.props.path, fixture)
  assert.equal(Object.keys(element.props).length, 1, 'only the selected portal is passed to the client')
  assert.equal(layout.generateStaticParams().length, 2)
})

test('learning content and its video count are present and visible in initial HTML', () => {
  const Component = load('components/learn/LearningPathPage.tsx', {
    'next/image': { default: (props) => React.createElement('img', { alt: props.alt, src: props.src }), __esModule: true },
    'next/link': { default: (props) => React.createElement('a', props), __esModule: true },
    '@/components/seo/Breadcrumbs': { default: () => null, __esModule: true },
  }).default
  const html = renderToStaticMarkup(React.createElement(Component, { path: fixture }))
  assert.match(html, /ChatGPT &amp; OpenAI Mastery/)
  assert.match(html, /First lesson/)
  assert.match(html, /1 video/)
  assert.doesNotMatch(html, /opacity:0|visibility:hidden/)
  const empty = renderToStaticMarkup(React.createElement(Component, { path: { ...fixture, videos: [] } }))
  assert.doesNotMatch(empty, /Course Videos|0 videos|iframe/)
})

test('AI search crawler rules retain the public and private boundaries and training policy', () => {
  const { rules, sitemap } = load('app/robots.ts').default()
  const wildcard = rules.find((rule) => rule.userAgent === '*')
  const forAgent = (agent) => rules.find((rule) => Array.isArray(rule.userAgent) && rule.userAgent.includes(agent))
  for (const agent of ['OAI-SearchBot', 'Claude-SearchBot', 'Claude-User']) {
    const policy = forAgent(agent)
    assert.ok(policy, `${agent} has an explicit policy`)
    assert.equal(JSON.stringify(policy.allow), JSON.stringify(wildcard.allow))
    assert.equal(JSON.stringify(policy.disallow), JSON.stringify(wildcard.disallow))
    assert.ok(policy.disallow.includes('/admin/'))
    assert.ok(policy.disallow.includes('/dashboard/'))
  }
  for (const agent of ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended']) {
    assert.ok(forAgent(agent).allow.includes('/'), `${agent} training policy is unchanged`)
  }
  assert.equal(sitemap, 'https://www.frankx.ai/sitemap.xml')
})
