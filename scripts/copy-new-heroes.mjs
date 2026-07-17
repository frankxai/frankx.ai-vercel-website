#!/usr/bin/env node
/**
 * Copy the 10 newly generated premium heroes from the current Grok session temp
 * into public/images/blog/ with canonical names. Idempotent.
 */
import fs from 'fs'
import path from 'path'

const sessionId = '019e9c1d-0d5d-7252-a5db-dba44e1ef6ed'
const srcBase = `\\\\?\\C:\\Users\\frank\\.grok\\sessions\\C%3A%5CUsers%5Cfrank%5Cstarlight%5Crepos%5CFrankX\\${sessionId}\\images`

const mapping = [
  { src: '1.jpg', dest: 'frankx-resources-universe-hero.png' },
  { src: '3.jpg', dest: 'frankx-curated-visuals-hero.png' },
  { src: '2.jpg', dest: 'ai-video-generation-2026-hero.png' },
  { src: '4.jpg', dest: 'my-100-month-ai-stack-hero.png' },
  { src: '6.jpg', dest: 'ollama-local-ai-privacy-hero.png' },
  { src: '5.jpg', dest: 'rag-for-creators-hero.png' },
  { src: '7.jpg', dest: 'voice-ai-agents-2026-hero.png' },
  { src: '8.jpg', dest: 'props-to-the-builders-hero.png' },
  { src: '10.jpg', dest: 'mcp-server-architecture-workshop-hero.png' },
  { src: '9.jpg', dest: 'suno-ai-music-creation-workshop-hero.png' },
]

const destDir = path.resolve('public/images/blog')
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })

let copied = 0
for (const { src, dest } of mapping) {
  const srcPath = path.join(srcBase, src)
  const destPath = path.join(destDir, dest)
  try {
    fs.copyFileSync(srcPath, destPath)
    console.log('Copied', src, '→', dest)
    copied++
  } catch (e) {
    console.error('Failed copy', src, e.message)
  }
}
console.log(`Done: ${copied}/10 heroes integrated.`)
