#!/usr/bin/env node
/**
 * One-shot: repair every blog article whose `image:` frontmatter points at a
 * file that does not exist on disk. Generates premium generative-art heroes
 * (textless, on-brand) for most; repoints the Starlight posts at the real
 * existing .webp asset. Rewrites the `image:` line where the path changes.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { buildSvg } from './generate-hero-art.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const BLOG = join(ROOT, 'content', 'blog')
const PUB = join(ROOT, 'public')

// slug -> theme (generate art) OR { repoint: '/path' } (use existing asset)
const PLAN = {
  'aeo-knowledge-graph-2026': 'intelligence',
  'agent-family-architecture': 'tech',
  'agent-feed-privacy-first-ai-transparency': 'tech',
  'ai-agents-inner-family': 'soul',
  'embodied-creator-os': 'soul',
  'inner-hr-ai-agent': 'soul',
  'mcp-server-architecture-workshop': 'tech',
  'meaning-as-operating-system': 'soul',
  'memory-as-exile-ai': 'soul',
  'no-bad-parts-ai-debugging': 'soul',
  'personal-ai-assistant-setup-workshop': 'tech',
  'predictive-mind-reality-models': 'intelligence',
  'six-primitives-ai-agent': 'tech',
  'suno-ai-music-creation-workshop': 'soul',
  'terminal-first-ai-workflow-claude-code': 'tech',
  'the-great-transition-build-your-own-business': 'intelligence',
  'trinity-ai-conscious-operating-system': 'arcanea',
  'ultimate-guide-ai-coding-agents-2026': 'tech',
  'vercel-ai-sdk-first-agent-stack': 'tech',
  // real designed asset already on disk — just repoint .png -> .webp
  'sis-trajectory-learning-how-ai-agents-improve': { repoint: '/images/golden-age/starlight-intelligence-v2.webp' },
  'starlight-intelligence-system-how-ai-agents-learn': { repoint: '/images/golden-age/starlight-intelligence-v2.webp' },
  // explicit visual upgrade — regenerate over existing flat text card
  'magnifica-humanitas-benevolent-future-arcanea': 'flagship',
}

function readImage(src) {
  const m = src.match(/^image:[ \t]*['"]?([^'"\n]+)['"]?/m)
  return m ? m[1].trim() : null
}

async function render(slug, theme, outAbs) {
  const svg = buildSvg(slug, theme)
  await sharp(Buffer.from(svg), { density: 144 }).png({ quality: 92, compressionLevel: 9 }).toFile(outAbs)
}

let generated = 0
let repointed = 0
for (const [slug, cfg] of Object.entries(PLAN)) {
  const file = join(BLOG, `${slug}.mdx`)
  if (!existsSync(file)) {
    console.warn(`skip (no mdx): ${slug}`)
    continue
  }
  let raw = readFileSync(file, 'utf8')
  const cur = readImage(raw)

  if (typeof cfg === 'object' && cfg.repoint) {
    if (!existsSync(join(PUB, cfg.repoint))) {
      console.warn(`repoint target missing for ${slug}: ${cfg.repoint}`)
      continue
    }
    raw = raw.replace(/^image:.*$/m, `image: '${cfg.repoint}'`)
    writeFileSync(file, raw)
    console.log(`repoint ${slug} -> ${cfg.repoint}`)
    repointed++
    continue
  }

  // generate art. Keep existing /images/blog/*.png path if it already targets one;
  // otherwise normalize to /images/blog/<slug>-hero.png
  let webPath = cur && /^\/images\/blog\/[^/]+\.png$/.test(cur) ? cur : `/images/blog/${slug}-hero.png`
  const outAbs = join(PUB, webPath)
  await render(slug, cfg, outAbs)
  if (cur !== webPath) {
    raw = raw.replace(/^image:.*$/m, `image: '${webPath}'`)
    writeFileSync(file, raw)
  }
  console.log(`art ${slug} (${cfg}) -> ${webPath}`)
  generated++
}
console.log(`\nDone. generated=${generated} repointed=${repointed}`)
