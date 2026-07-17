#!/usr/bin/env node
/**
 * Autonomous discovery for next batch of blog heroes.
 * Scans MDX frontmatter, cross-refs blog-heroes manifest and visual-registry.
 * Flags: no image, raw-uuid, aurora/placeholder, low-premium naming, or low-score in manifest.
 * Outputs top candidates prioritized by strategy + manifest gaps.
 */
import fs from 'fs'
import path from 'path'

const blogDir = 'content/blog'
const heroesPath = 'data/blog-heroes.json'
const registryPath = 'data/visual-registry.json'
const strategyPath = 'data/content-strategy.json'

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx') && !f.startsWith('_') && !f.includes('CONTENT_SCHEMA'))

const heroesData = JSON.parse(fs.readFileSync(heroesPath, 'utf-8'))
const heroMap = new Map(heroesData.heroes.map(h => [h.id || h.blog?.replace('/blog/',''), h]))

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
const registrySet = new Set(registry.map(r => r.path))

const strategy = JSON.parse(fs.readFileSync(strategyPath, 'utf-8'))
const strategySpokes = new Set()
strategy.pillars.forEach(p => (p.spokes || []).forEach(s => strategySpokes.add(s)))

const candidates = []

for (const f of files) {
  const slug = f.replace(/\.mdx$/, '')
  const full = path.join(blogDir, f)
  const content = fs.readFileSync(full, 'utf-8')
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  let image = null
  if (fmMatch) {
    const m = fmMatch[1].match(/image:\s*["']?([^\s"']+)/)
    if (m) image = m[1]
  }

  const heroEntry = heroMap.get(slug) || heroMap.get(f.replace(/\.mdx$/,''))
  const score = heroEntry ? (heroEntry.proScore || heroEntry.score || 0) : 0
  const hasPro = !!(heroEntry && (heroEntry.proImage || heroEntry.proScore))

  const isRaw = image && /[0-9a-f]{8}-[0-9a-f]{4}/.test(image)
  const isGeneric = image && (image.includes('aurora') || image.includes('placeholder') || image.includes('default-hero'))
  const noPremiumName = image && !/hero(-v[2-9]|\.png|v[2-9])/.test(image) && !hasPro
  const inStrategy = strategySpokes.has(slug)
  const lowManifest = score < 8 || !hasPro

  if (!image || isRaw || isGeneric || noPremiumName || (inStrategy && lowManifest) || lowManifest) {
    candidates.push({
      slug,
      file: f,
      currentImage: image || 'MISSING',
      score,
      hasPro,
      inStrategy,
      reasons: [
        !image ? 'no-fm-image' : null,
        isRaw ? 'raw-uuid' : null,
        isGeneric ? 'generic-placeholder' : null,
        noPremiumName ? 'no-premium-name' : null,
        inStrategy ? 'strategy-spoke' : null,
        lowManifest ? 'low-manifest-score' : null
      ].filter(Boolean)
    })
  }
}

// Prioritize: strategy spokes first, then low-score manifest, then raw/generic
candidates.sort((a,b) => {
  const aStrat = a.inStrategy ? 1 : 0
  const bStrat = b.inStrategy ? 1 : 0
  if (aStrat !== bStrat) return bStrat - aStrat
  return (a.score || 0) - (b.score || 0)
})

console.log('=== WEAK / GAP HERO CANDIDATES (top 30) ===')
console.log('Total flagged:', candidates.length)
candidates.slice(0,30).forEach((c,i) => {
  console.log(`${i+1}. ${c.slug}`)
  console.log(`   current: ${c.currentImage}`)
  console.log(`   score:${c.score} pro:${c.hasPro} strategy:${c.inStrategy}`)
  console.log(`   reasons: ${c.reasons.join(', ')}`)
})

const top10 = candidates.slice(0,10).map(c => c.slug)
console.log('\n=== RECOMMENDED NEXT 10 FOR NEW PREMIUM HEROES ===')
console.log(top10.join('\n'))
fs.writeFileSync('scripts/next-10-heroes.json', JSON.stringify(top10, null, 2))
console.log('\nWrote scripts/next-10-heroes.json for processing.')
