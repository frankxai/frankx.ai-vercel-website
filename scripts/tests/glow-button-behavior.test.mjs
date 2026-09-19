import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const glowSource = readFileSync(path.resolve(here, '../../components/ui/GlowButton.tsx'), 'utf8')
const primitiveSource = readFileSync(path.resolve(here, '../../components/ui/primitives/button.tsx'), 'utf8')

test('shared buttons ban transition-all and keep reduced-motion plus focus locks', () => {
  assert.equal(glowSource.includes('transition-all'), false)
  assert.equal(primitiveSource.includes('transition-all'), false)
  assert.match(glowSource, /motion-reduce:transition-none/)
  assert.match(glowSource, /motion-reduce:hidden/)
  assert.match(glowSource, /\(hover: hover\) and \(pointer: fine\)/)
  assert.match(glowSource, /focus-visible:!transform-none/)
  assert.match(primitiveSource, /motion-reduce:transition-none/)
})

test('href wrapper is the production glow surface and swallows disabled clicks', () => {
  assert.match(glowSource, /<div ref=\{containerRef\} \{\.\.\.pointerHandlers\} className="inline-block">/)
  assert.match(glowSource, /if \(disabled\) \{\s*event\.preventDefault\(\)/)
  assert.match(glowSource, /aria-disabled=\{disabled \|\| undefined\}/)
  assert.match(glowSource, /tabIndex=\{disabled \? -1 : undefined\}/)
})

test('pointer glow arms only for fine mouse pointers and drops when reduced or disabled', () => {
  assert.match(glowSource, /event\.pointerType === 'mouse'/)
  assert.match(glowSource, /window\.matchMedia\('\(hover: hover\) and \(pointer: fine\)'\)\.matches/)
  assert.match(glowSource, /const pointerHandlers = shouldReduceMotion \|\| disabled\s*\? \{\}/)
})
