import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const readRepoFile = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

const arenaPage = readRepoFile('app/research/model-arena/page.tsx')
const routingPlayground = readRepoFile('components/research/TaskRoutingPlayground.tsx')
const studio = readRepoFile('app/work-with-me/StudioClient.tsx')
const blog = readRepoFile('app/blog/BlogPageClient.tsx')

test('model arena receipt outputs expose named keyboard-scroll regions', () => {
  assert.match(arenaPage, /aria-label=\{`\$\{RECEIPT_LOGS\[activeReceiptTab\]\.modelA\.name\} completion output`\}/)
  assert.match(arenaPage, /aria-label=\{`\$\{RECEIPT_LOGS\[activeReceiptTab\]\.modelB\.name\} completion output`\}/)
  assert.equal((arenaPage.match(/tabIndex=\{0\}/g) ?? []).length, 2)
  assert.equal((arenaPage.match(/focus-visible:ring-inset/g) ?? []).length, 2)
})

test('routing playground secondary labels retain AA contrast', () => {
  assert.match(routingPlayground, /text-xs text-white\/60 font-mono uppercase tracking-wider mb-1/)
  assert.match(routingPlayground, /text-\[10px\] text-white\/60 font-mono/)
  assert.match(routingPlayground, /'text-white\/60 hover:text-white\/80'/)
  assert.doesNotMatch(routingPlayground, /text-white\/40 font-mono uppercase tracking-wider mb-1/)
  assert.doesNotMatch(routingPlayground, /'text-white\/40 hover:text-white\/70'/)
})

test('studio reduced motion uses hydration-stable render props', () => {
  assert.match(studio, /MotionConfig reducedMotion="user"/)
  assert.match(studio, /motion-safe:animate-pulse/)
  assert.doesNotMatch(studio, /useReducedMotion/)
  assert.doesNotMatch(studio, /shouldReduceMotion/)
})

test('blog content does not wait in an opacity-zero entrance state', () => {
  assert.equal((blog.match(/initial=\{false\}/g) ?? []).length, 6)
  assert.doesNotMatch(blog, /initial=\{\{\s*opacity:\s*0/)
  assert.match(blog, /src=\{latestPost\.image\}[\s\S]*?fill[\s\S]*?priority/)
})
