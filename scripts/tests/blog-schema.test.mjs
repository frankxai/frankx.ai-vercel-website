import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

test('Soul Frequency Framework article emits Article schema', () => {
  // We can't render but we can check if it creates the schema object correctly and passes it to JsonLd
  const content = fs.readFileSync('app/blog/soul-frequency-framework/page.tsx', 'utf8')

  const schemaRegex = /const articleSchema = \{[\s\S]*?headline:\s*['"]([^'"]+)['"][\s\S]*?datePublished:\s*['"]([^'"]+)['"][\s\S]*?mainEntityOfPage:\s*\{\s*['"]?@type['"]?:\s*['"]WebPage['"],\s*['"]?@id['"]?:\s*`([^`]+)`/
  const match = content.match(schemaRegex)

  assert.ok(match, 'Should find the articleSchema object with required fields')
  if (match) {
    assert.equal(match[1], 'Soul Frequency Framework', 'Headline should match')
    assert.equal(match[2], '2024-08-20T00:00:00.000Z', 'DatePublished should match')
    assert.ok(match[3].includes('/blog/soul-frequency-framework'), 'Should include correct URL path')
  }

  assert.ok(content.includes('<JsonLd type="Article" data={articleSchema} />'), 'Should pass schema to JsonLd component')
})
