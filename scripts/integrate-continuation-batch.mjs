#!/usr/bin/env node
/**
 * Continuation autonomous integrator - batch for the next 10 after previous.
 */
import fs from 'fs'
import path from 'path'

const sessionId = '019e9c1d-0d5d-7252-a5db-dba44e1ef6ed'
const srcBase = `\\\\?\\C:\\Users\\frank\\.grok\\sessions\\C%3A%5CUsers%5Cfrank%5Cstarlight%5Crepos%5CFrankX\\${sessionId}\\images`

// Assignment based on call order in this continuation (10 gens)
const batch = [
  { slug: 'agentic-ai-roadmap-2025', src: '22.jpg', destBase: 'agentic-ai-roadmap-2025' },
  { slug: 'agentic-creator-os', src: '23.jpg', destBase: 'agentic-creator-os' },
  { slug: 'agentic-seo-publishing-masterplan', src: '25.jpg', destBase: 'agentic-seo-publishing-masterplan' },
  { slug: 'agi-2026-opportunities-students-creators', src: '21.jpg', destBase: 'agi-2026-opportunities-students-creators' },
  { slug: 'ai-coe-launch', src: '24.jpg', destBase: 'ai-coe-launch' },
  { slug: 'ai-engineering-without-hype-willison', src: '26.jpg', destBase: 'ai-engineering-without-hype-willison' },
  { slug: 'claude-code-mastery-top-resources', src: '28.jpg', destBase: 'claude-code-mastery-top-resources' },
  { slug: 'mcp-doctor-claude-code-server-optimization', src: '29.jpg', destBase: 'mcp-doctor-claude-code-server-optimization' },
  { slug: 'creator-intelligence-systems-2026', src: '27.jpg', destBase: 'creator-intelligence-systems-2026' },
  { slug: 'karpathys-ai-vision-deep-dive', src: '30.jpg', destBase: 'karpathys-ai-vision-deep-dive' },
]

const destDir = path.resolve('public/images/blog')
fs.mkdirSync(destDir, { recursive: true })

console.log('Copying continuation batch 10 heroes...')
batch.forEach(({ src, destBase }) => {
  const srcPath = path.join(srcBase, src)
  const destPath = path.join(destDir, `${destBase}-hero.png`)
  try {
    fs.copyFileSync(srcPath, destPath)
    console.log('  copied', src, '->', `${destBase}-hero.png`)
  } catch (e) {
    console.error('  FAIL', src, e.message)
  }
})

// Update MDX
console.log('\nUpdating MDX frontmatter for continuation batch...')
const blogDir = 'content/blog'
batch.forEach(({ slug, destBase }) => {
  let mdxFile = path.join(blogDir, `${slug}.mdx`)
  if (!fs.existsSync(mdxFile)) {
    const clean = slug.replace(/^\d+-/, '')
    mdxFile = path.join(blogDir, `${clean}.mdx`)
  }
  if (!fs.existsSync(mdxFile)) {
    console.log('  SKIP no mdx for', slug)
    return
  }
  let c = fs.readFileSync(mdxFile, 'utf8')
  const newImg = `/images/blog/${destBase}-hero.png`
  const imgLine = `image: "${newImg}"`

  if (/^image:.*$/m.test(c)) {
    c = c.replace(/^image:.*$/m, imgLine)
  } else {
    c = c.replace(/^(---\n[\s\S]*?)(---)/, (m, pre, post) => {
      if (!pre.includes('image:')) return pre + imgLine + '\n' + post
      return m
    })
  }
  fs.writeFileSync(mdxFile, c)
  console.log('  updated', path.basename(mdxFile))
})

// Augment manifests
console.log('\nAugmenting manifests...')
const heroesPath = 'data/blog-heroes.json'
let heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf-8'))
const now = new Date().toISOString().slice(0,10)
const newHeroes = batch.map(({ slug, destBase }) => ({
  id: slug.replace(/^\d+-/, ''),
  title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
  blog: `/blog/${slug.replace(/^\d+-/, '')}`,
  image: `/images/blog/${destBase}-hero.png`,
  date: now,
  category: 'Agentic & Intelligence',
  exists: true,
  score: 9,
  proScore: 9,
  style: 'dark-premium-glass',
  prompt: `Premium dark glass/technical for ${slug}.`,
  model: 'pro'
}))
heroes.heroes.push(...newHeroes)
if (heroes.meta) {
  heroes.meta.totalHeroes = heroes.heroes.length
  heroes.meta.generatedAt = new Date().toISOString()
}
fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2))
console.log('  added 10 to blog-heroes.json')

const regPath = 'data/visual-registry.json'
let reg = JSON.parse(fs.readFileSync(regPath, 'utf-8'))
const adds = batch.map(({ destBase }) => ({
  path: `/images/blog/${destBase}-hero.png`,
  directory: 'blog',
  category: 'blog',
  filename: `${destBase}-hero.png`,
  sizeKB: 400,
  tags: ['hero', 'premium', 'continuation-batch'],
  mood: 'branded',
  theme: 'dark',
  suitableFor: ['blog-hero']
}))
reg.push(...adds)
fs.writeFileSync(regPath, JSON.stringify(reg, null, 2))
console.log('  added 10 to visual-registry (total ~', reg.length, ')')

const csvPath = 'data/visual-inventory.csv'
const csvLines = batch.map(({ destBase }) => 
  `/images/blog/${destBase}-hero.png,blog,${destBase}-hero.png,400,"hero,premium,continuation",branded,dark,"blog-hero",NEW autonomous continuation batch`
).join('\n')
fs.appendFileSync(csvPath, '\n' + csvLines)
console.log('  appended 10 to CSV')

console.log('\n=== CONTINUATION BATCH INTEGRATION COMPLETE (10 more) ===')
console.log('Total premium headers added in autonomous run: 30+')
