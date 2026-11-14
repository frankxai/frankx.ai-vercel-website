import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (rel) => readFileSync(path.join(root, rel), 'utf8')

test('HomeShaderAtmosphere scopes WebGL canvas to hero band and disposes planeGeometry + shaderMaterial', () => {
  const src = read('components/home/HomeShaderAtmosphere.tsx')
  assert.doesNotMatch(src, /\bfixed\s+inset-0\b/, 'shader canvas must not overlay the entire viewport as fixed inset-0')
  assert.match(src, /absolute inset-x-0 top-0/, 'shader atmosphere is scoped to the top hero band')
  assert.match(src, /geometry\?\.dispose\(\)/, 'planeGeometry is disposed on unmount')
  assert.match(src, /shaderMaterial\.dispose\(\)/, 'shaderMaterial is disposed on unmount')
  assert.match(src, /useReducedMotion/, 'respects prefers-reduced-motion')
})

test('HomeLiquidSurface uses single border treatment and imperative pointer highlight without useState', () => {
  const src = read('components/home/HomeLiquidSurface.tsx')
  assert.match(src, /border border-white\/\[0\.1\]/, 'uses crisp single border')
  assert.doesNotMatch(src, /backdrop-blur/, 'no competing backdrop-blur per taste.md')
  assert.doesNotMatch(src, /\bshadow-/, 'no competing drop shadow per taste.md')
  assert.doesNotMatch(src, /\buseState\b/, 'pointer tracking must not trigger React state re-renders')
  assert.match(src, /spotRef/, 'updates highlight DOM element imperatively via ref')
})

test('HomeAgentCommandBar exposes canonical MCP endpoint and clears copy timeout on unmount', () => {
  const src = read('components/home/HomeAgentCommandBar.tsx')
  assert.match(src, /https:\/\/frankx\.ai\/api\/mcp/, 'exposes canonical /api/mcp endpoint')
  assert.match(src, /copyTimerRef/, 'tracks copy timer handle')
  assert.match(src, /window\.clearTimeout\(copyTimerRef\.current\)/, 'clears copy timeout on unmount and re-copy')
})
