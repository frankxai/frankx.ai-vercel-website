import fs from 'node:fs'
import path from 'node:path'

// Close the known legacy-export resurfacing bug: withdrawn claims and agent
// policy must not be republished by prebuild. This is NOT a universal editorial
// publication policy or a security boundary for the repository-wide exporters.
const internalPolicyNames = /^(?:AGENTS|CLAUDE(?:_NEW)?|CREATOR|taste|design)\.(?:md|markdown|txt|html)$/i
const withdrawnClaims = [
  /\b(?:12(?:,?000|\s?k|\s+thousand)|twelve[\s-]+thousand)\b\s*\+?[\s-]*(?:[A-Za-z-]+\s+){0,2}(?:songs?|tracks?|experiments?)\b/i,
  /(?<![$€£\d,.])\b12(?:,?000|\s?k)\b\s*\+?\s+(?:(?:AI|song|track)\s+)*catalog\b|\bmy\s+12(?:,?000|\s?k)\b\s*\+?\s+(?:live|catalog|here|are|were|still)\b/i,
  /114,000\s+words/i,
  /(?<![$€£\d,.])\b15,?000(?:[\s-]word\b|\+?\s+words\s+(?:of|in)\s+(?:(?:original|written|authored|published|long-form|new)\s+)?(?:research|content|writing|copy|prose|analysis|documentation|strategy)\b)/i,
  /500-1,000 tracks per year/i,
  /\b15\+?[\s-]+years?(?:[\s-]+(?:of|in|building|architecting|as(?:\s+an?)?))*[\s-]+(?:an?\s+)?(?:enterprise|architect\w*)/i,
  /Organic impressions rose 320%/i,
]

export function publicReadingHoldReason(relativePath, source) {
  if (internalPolicyNames.test(path.basename(relativePath))) return 'internal_policy'
  // A preserved URL slug is an identifier, not an asserted production count.
  const prose = source.replaceAll('suno-ai-12000-songs-production-lessons', '')
  return withdrawnClaims.some(pattern => pattern.test(prose)) ? 'withdrawn_claim' : null
}

export function selectPublicReadingFiles(files, root) {
  const eligible = []
  const held = []
  for (const file of files) {
    const reason = publicReadingHoldReason(path.relative(root, file), fs.readFileSync(file, 'utf8'))
    if (reason) held.push({ file, reason })
    else eligible.push(file)
  }
  return { eligible, held }
}

// Only remove exact counterparts of currently held sources, inside the known
// output roots, and only when they carry the existing exporter's own marker.
export function pruneHeldReadingExports(held, eligible, outputDirs, outputsFor) {
  const retainedPaths = new Set(eligible.flatMap(outputsFor))
  let removed = 0
  for (const { file } of held) {
    for (const output of outputsFor(file)) {
      if (retainedPaths.has(output) || !outputDirs.some(dir => {
        const rel = path.relative(dir, output)
        return rel && !rel.startsWith('..') && !path.isAbsolute(rel)
      }) || !fs.existsSync(output)) continue
      const prior = fs.readFileSync(output, 'utf8')
      if (!prior.includes('<meta name="generator" content="codex-cli"') &&
          !prior.includes('<div class="attribution" style="font-family: system-ui')) continue
      fs.unlinkSync(output)
      removed++
    }
  }
  return removed
}
