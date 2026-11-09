import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const evaluateConfig = (source) => {
  const context = { module: { exports: {} }, require: () => ({}) }
  vm.runInNewContext(source, context)
  return context.module.exports
}
const config = evaluateConfig(fs.readFileSync('tailwind.config.js', 'utf8'))
const luminance = (hex) => {
  const channels = hex.replace('#', '').match(/../g).map((c) => parseInt(c, 16) / 255)
  const linear = channels.map((c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722
}
const contrast = (foreground, background) => {
  const a = luminance(foreground), b = luminance(background)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

test('shared 500 shades retain AA contrast on existing white and cream worksheets', () => {
  const colors = config.theme.extend.colors
  const slate500 = colors.slate?.[500] ?? '#64748b'
  for (const background of ['#ffffff', '#fffdf8']) {
    for (const foreground of [slate500, colors.neutral[500]]) {
      assert.ok(contrast(foreground, background) >= 4.5,
        `${foreground} fails AA on ${background}`)
    }
  }
})

test('the scoped dark-surface labels and showroom selector retain AA contrast', () => {
  const colors = config.theme.extend.colors
  const slate400 = colors.slate?.[400] ?? '#94a3b8'
  assert.ok(contrast(slate400, colors.void) >= 4.5)
  const css = fs.readFileSync('components/ai-architecture/ArchitectureShowroom.module.css', 'utf8')
  const selector = css.match(/\.selector button>span\s*\{[^}]*color:(#[a-f0-9]{6})/i)
  assert.ok(selector, 'showroom selector text color must be measurable')
  assert.ok(contrast(selector[1], '#153128') >= 4.5)
})

test('AI architecture scrollable regions have keyboard focusability', () => {
  const atlas = fs.readFileSync('components/ai-architecture/OfficialArchitectureAtlas.tsx', 'utf8')
  const pillar = fs.readFileSync('components/ai-architecture/pillar/PillarGuide.tsx', 'utf8')
  assert.ok(atlas.includes('tabIndex={0} role="region" aria-label="Deployment platform comparison matrix"'))
  assert.ok(pillar.includes('tabIndex={0} role="region" aria-label="Workflow and agent shape comparison"'))
})
