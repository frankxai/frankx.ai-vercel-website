import assert from 'node:assert/strict'
import test from 'node:test'
import matter from 'gray-matter'
import { skillFrontmatter } from '../../app/skills/builder/frontmatter.ts'

for (const [name, description] of [
  ['creator-launch-architect', 'Assess: inference costs #1'],
  ['true', '2026-11-30'],
  ['123', 'null'],
  ['review', '"Quoted" paths: C:\\work'],
  ['review', 'Use #1 source\n---\nversion: alternate'],
]) {
  test(`skill metadata survives a YAML round trip: ${JSON.stringify(description)}`, () => {
    const file = skillFrontmatter(name, description, 'research', '2026-11-24') + '\n\n# Review\n'
    const { data, content } = matter(file)
    assert.equal(data.name, name)
    assert.equal(data.description, description)
    assert.equal(data.category, 'research')
    assert.equal(data.version, '1.0.0')
    assert.equal(content.trim(), '# Review')
  })
}
