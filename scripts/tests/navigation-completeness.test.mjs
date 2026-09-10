import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import test from 'node:test'
import { runInNewContext } from 'node:vm'
import { resolveNavigationGroups } from '../../lib/navigation-groups.ts'

// Execute the actual component registries without importing browser/React code.
// The only substituted values are Lucide icons; names, destinations and groups
// remain the production data. A stale copied fixture would miss this regression.
function loadRegistry(path, name, endMarker) {
  const source = readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')
  const start = source.indexOf(`const ${name}`)
  const end = source.indexOf(endMarker, start)
  assert.ok(start >= 0 && end > start, `${path}: registry boundaries must resolve`)
  const iconImport = source.match(/import\s*\{([^}]+)\}\s*from 'lucide-react'/)
  assert.ok(iconImport, `${path}: Lucide import must resolve`)
  const icons = Object.fromEntries(
    iconImport[1].split(',').map((item) => item.trim()).filter(Boolean)
      .filter((item) => !item.startsWith('type ')).map((item) => [item, item]),
  )
  const declaration = stripTypeScriptTypes(source.slice(start, end))
  const registry = runInNewContext(`${declaration}\n${name}`, icons, { timeout: 1000 })
  assert.ok(source.includes('resolveNavigationGroups(') || source.includes('resolveNavigationGroups<'),
    `${path}: grouped rendering must use the shared resolver`)
  return registry
}

const desktop = loadRegistry('components/NavigationMega.tsx', 'navigation', '\ntype NavKey')
const mobile = loadRegistry('components/MobileNavOverlay.tsx', 'sections', '\nconst overlayVariants')

for (const [surface, sections] of [['desktop', Object.values(desktop)], ['mobile', Array.from(mobile)]]) {
  test(`${surface}: every configured destination survives grouping exactly once`, () => {
    for (const section of sections) {
      const resolved = resolveNavigationGroups(section.items, section.groups ?? [])
      const visible = resolved.flatMap((group) => group.items)
      assert.equal(visible.length, section.items.length, `${section.label}: no lost destinations`)
      assert.equal(new Set(visible).size, visible.length, `${section.label}: no duplicate destinations`)
      for (const item of section.items) {
        assert.ok(visible.includes(item), `${section.label}: ${item.name} remains reachable`)
      }

      const explicitlyGrouped = new Set(Array.from(section.groups ?? []).flatMap((group) => Array.from(group.items)))
      const unassigned = Array.from(section.items).filter((item) => !explicitlyGrouped.has(item.name))
      if (unassigned.length) {
        assert.deepEqual(Array.from(resolved.at(-1).items), unassigned, `${section.label}: remaining source order is preserved`)
      }
    }
  })

  test(`${surface}: Arcanea and the public exploration routes are rendered`, () => {
    const founder = sections.find((section) => section.label === 'Founder')
    assert.ok(founder)
    const visible = resolveNavigationGroups(founder.items, founder.groups).flatMap((group) => group.items)
    for (const href of ['/magic', '/vault', '/ecosystem', '/map', '/qualities', '/intelligence-atlas', '/licensing']) {
      assert.equal(visible.filter((item) => item.href === href).length, 1, `${href}: one reachable destination`)
    }
  })
}

test('curated order wins while duplicate references and stale names cannot drop remaining items', () => {
  const items = ['First', 'Second', 'Third', 'Fourth'].map((name) => ({ name, href: `/${name.toLowerCase()}` }))
  const groups = [
    { label: 'Selected', items: ['Third', 'First', 'Third'] },
    { label: 'Other selection', items: ['First', 'Missing'] },
  ]
  const resolved = resolveNavigationGroups(items, groups)
  assert.deepEqual(resolved, [
    { label: 'Selected', items: [items[2], items[0]] },
    { label: 'More to explore', items: [items[1], items[3]] },
  ])
})

test('complete curation has no empty fallback group', () => {
  const items = [{ name: 'Arcanea' }, { name: 'Starlight' }]
  assert.deepEqual(resolveNavigationGroups(items, [{ label: 'Brands', items: ['Starlight', 'Arcanea'] }]), [
    { label: 'Brands', items: [items[1], items[0]] },
  ])
  assert.deepEqual(resolveNavigationGroups([], []), [])
})
