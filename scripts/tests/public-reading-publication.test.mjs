import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, existsSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import test from 'node:test'
import { publicReadingHoldReason } from '../lib/public-reading-publication.mjs'

const htmlScript = fileURLToPath(new URL('../generate_interlinked_html.mjs', import.meta.url))
const searchScript = fileURLToPath(new URL('../generate_search_index.mjs', import.meta.url))

function generate(root) {
  for (const script of [htmlScript, searchScript]) {
    const result = spawnSync(process.execPath, [script], { cwd: root, encoding: 'utf8' })
    assert.equal(result.status, 0, result.stderr)
  }
}

test('rerun withdraws generated documents and links while preserving authored sources and unrelated files', () => {
  const root = mkdtempSync(join(tmpdir(), 'reading-publication-'))
  try {
    mkdirSync(join(root, 'content/books'), { recursive: true })
    const source = join(root, 'content/books/legacy.md')
    writeFileSync(source, '# Legacy chapter\nA useful original exercise.')
    writeFileSync(join(root, 'content/books/retained.md'), '# Retained chapter\nA useful original exercise.')
    generate(root)
    for (const output of ['reading-site', 'public/reading']) {
      assert.ok(existsSync(join(root, output, 'content/books/legacy.html')))
      writeFileSync(join(root, output, 'manual.html'), '<p>Unrelated file</p>')
      // Simulate an older build that still exported agent policy.
      writeFileSync(join(root, output, 'AGENTS.html'), '<meta name="generator" content="codex-cli" />Old agent policy')
      // Even an exact held counterpart is not ours to delete without a marker.
      writeFileSync(join(root, output, 'content/books/unowned.html'), '<p>Manually maintained page</p>')
    }
    const withdrawn = '# Legacy chapter\nA 15,000-word masterwork and 12,000 AI songs.'
    writeFileSync(source, withdrawn)
    writeFileSync(join(root, 'content/books/unowned.txt'), withdrawn)
    writeFileSync(join(root, 'AGENTS.md'), '# Agent instructions\nInternal policy.')
    writeFileSync(join(root, 'content/books/CLAUDE.md'), '# Scoped agent memory\nInternal policy.')
    generate(root)
    assert.equal(readFileSync(source, 'utf8'), withdrawn)
    for (const output of ['reading-site', 'public/reading']) {
      assert.equal(existsSync(join(root, output, 'content/books/legacy.html')), false)
      assert.equal(existsSync(join(root, output, 'AGENTS.html')), false)
      assert.equal(existsSync(join(root, output, 'content/books/CLAUDE.html')), false)
      assert.ok(existsSync(join(root, output, 'content/books/retained.html')))
      assert.equal(readFileSync(join(root, output, 'content/books/unowned.html'), 'utf8'), '<p>Manually maintained page</p>')
      assert.equal(readFileSync(join(root, output, 'manual.html'), 'utf8'), '<p>Unrelated file</p>')
      assert.doesNotMatch(readFileSync(join(root, output, 'index.html'), 'utf8'), /Legacy chapter|Agent instructions|Scoped agent memory/)
    }
    const items = JSON.parse(readFileSync(join(root, 'public/reading/search-index.json'), 'utf8')).items
    assert.deepEqual(items.map(item => item.title), ['Retained chapter'])
  } finally { rmSync(root, { recursive: true, force: true }) }
})


test('holds known withdrawn claims across formats while retaining legitimate quantities and URL identifiers', () => {
  for (const copy of ['Twelve thousand AI tracks', '12K+ song catalog', '114,000 words', '15,000-word masterwork', '500-1,000 tracks per year', '15 years building enterprise AI', 'Organic impressions rose 320%']) {
    for (const extension of ['md', 'markdown', 'txt', 'html']) {
      assert.equal(publicReadingHoldReason(`content/example.${extension}`, copy), 'withdrawn_claim', copy)
    }
  }
  for (const copy of ['$12,000 catalog budget', '15,000 words of context window', '12K impressions', '/blog/suno-ai-12000-songs-production-lessons']) {
    assert.equal(publicReadingHoldReason('content/example.md', copy), null, copy)
  }
  for (const filename of ['AGENTS.md', 'content/blog/CLAUDE.md', 'CREATOR.md', 'taste.md', 'design.md', 'CLAUDE_NEW.md']) {
    assert.equal(publicReadingHoldReason(filename, '# Instructions'), 'internal_policy')
  }
})
