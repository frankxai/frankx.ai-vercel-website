import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

test('tailwind slate-500 and neutral-500 meet WCAG AA contrast on #0a0a0b void background', () => {
  const tw = fs.readFileSync('tailwind.config.js', 'utf8')
  assert.ok(!tw.includes("500: '#64748b'"), 'neutral/slate 500 must not use #64748b (4.15:1 on #0a0a0b)')
  assert.ok(tw.includes("500: '#8494a7'"), 'neutral and slate 500 must use #8494a7 (6.37:1 on #0a0a0b)')
})

test('HomePageElite and ArchitectureShowroom meet WCAG AA 4.5:1 contrast', () => {
  const home = fs.readFileSync('components/home/HomePageElite.tsx', 'utf8')
  assert.ok(!home.includes('text-emerald-400/50'), 'HomePageElite must not use low-contrast text-emerald-400/50 (3.25:1)')
  const css = fs.readFileSync('components/ai-architecture/ArchitectureShowroom.module.css', 'utf8')
  assert.ok(!css.includes('color:#83958b;'), 'ArchitectureShowroom selector index must not use #83958b (4.41:1 on #153128)')
  assert.ok(css.includes('color:#9cb0a5;'), 'ArchitectureShowroom selector index must use #9cb0a5 (5.89:1 on #153128)')
})

test('AI architecture scrollable regions have keyboard focusability (tabIndex={0})', () => {
  const atlas = fs.readFileSync('components/ai-architecture/OfficialArchitectureAtlas.tsx', 'utf8')
  const pillar = fs.readFileSync('components/ai-architecture/pillar/PillarGuide.tsx', 'utf8')
  assert.ok(atlas.includes('tabIndex={0} role="region" aria-label="Deployment platform comparison matrix"'))
  assert.ok(pillar.includes('tabIndex={0} role="region" aria-label="Workflow and agent shape comparison"'))
})
