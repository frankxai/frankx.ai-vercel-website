import test from 'node:test'
import assert from 'node:assert/strict'
import {
  SITE_ARCHETYPE_PRESETS,
  generateWebdesignBundle,
} from '../../lib/self-service/webdesign-architect.ts'
import { composeSkillStack } from '../../lib/self-service/skill-composer.ts'
import { buildZipArchive } from '../../lib/self-service/zip.ts'

test('generateWebdesignBundle escapes unsafe markup and builds AEO/AX bundle', () => {
  const base = SITE_ARCHETYPE_PRESETS['founder-authority'].defaults
  const bundle = generateWebdesignBundle({
    ...base,
    siteName: 'Evil <script>alert(1)</script> Org',
    headline: 'Calm verified tools for operators',
  })

  const html = bundle.files.find((f) => f.path === 'index.html')?.content ?? ''
  assert.equal(html.includes('<script>alert(1)</script>'), false)
  assert.equal(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), true)
  assert.equal(bundle.files.some((f) => f.path === 'llms.txt'), true)
  assert.equal(bundle.files.some((f) => f.path === 'schema.jsonld'), true)
  assert.equal(bundle.files.some((f) => f.path === 'robots.txt'), true)
  assert.equal(bundle.audit.score, bundle.audit.maxScore)
})

test('composeSkillStack reports exact selected counts without inflated claims', () => {
  const stack = composeSkillStack({
    projectName: 'sample-app',
    roleId: 'solo-founder',
    harnessId: 'claude-code',
    moduleIds: ['maker-checker-gate', 'fail-closed-money', 'anti-slop-editorial'],
    includeMcp: true,
  })

  assert.equal(stack.selectedModules.length, 3)
  const manifest = stack.files.find((f) => f.path === 'skills-manifest.json')
  assert.ok(manifest)
  const parsed = JSON.parse(manifest.content)
  assert.equal(parsed.moduleCount, 3)
  assert.equal(manifest.content.includes('630+'), false)

  const archive = buildZipArchive(stack.files.map((f) => ({ path: f.path, content: f.content })))
  assert.equal(archive[0], 0x50)
  assert.equal(archive[1], 0x4b)
  assert.equal(archive[2], 0x03)
  assert.equal(archive[3], 0x04)
})
