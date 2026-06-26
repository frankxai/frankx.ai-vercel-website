#!/usr/bin/env node
/**
 * Reference check for global-agent archive candidates.
 * Greps commands/skills/agents/settings for each candidate name and reports
 * whether anything outside the candidate's own file references it.
 *
 * Usage: node scripts/agents/archive-refcheck.mjs
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const HOME = os.homedir()
const CANDIDATES = [
  // 13 prompt-* global dupes (project copies win on collision)
  'prompt-architect', 'prompt-claude-specialist', 'prompt-conductor', 'prompt-evaluator',
  'prompt-gemini-specialist', 'prompt-gpt-specialist', 'prompt-harvester', 'prompt-librarian',
  'prompt-optimizer', 'prompt-oss-specialist', 'prompt-psyche-cartographer', 'prompt-psychometrist',
  'prompt-red-team',
  // departments (superseded by pillar orchestrators)
  'business-department', 'content-department', 'design-department', 'dev-department', 'marketing-department',
  // superseded dupes
  'music-production', 'frequency-music-production', 'social-content-generator', 'viral-content-strategy',
  // legacy scaffolds
  'luminor-strategic-guidance', 'golden-age-visionary', 'frankx-content-creation', 'frankx-website-builder',
  'coaching-program-design', 'template-design', 'ui-ux-design-guidance', 'ux-design-development',
  'mcp-server-advising', 'nano-banana-image-generation', 'content-product-development', 'strategist',
  'seo_specialist', 'starlight-architecture-design',
]

const SCAN_DIRS = [
  path.join(HOME, '.claude', 'commands'),
  path.join(HOME, '.claude', 'skills'),
  path.join(HOME, '.claude', 'agents'),
  path.join(HOME, '.claude', 'settings.json'),
  path.join(HOME, 'FrankX', '.claude', 'commands'),
  path.join(HOME, 'FrankX', '.claude', 'skills'),
  path.join(HOME, 'FrankX', '.claude', 'agents'),
]

function* walkFiles(p) {
  if (!existsSync(p)) return
  const st = statSync(p)
  if (st.isFile()) { yield p; return }
  for (const entry of readdirSync(p, { withFileTypes: true })) {
    const full = path.join(p, entry.name)
    if (entry.isDirectory()) yield* walkFiles(full)
    else if (entry.isFile() && /\.(md|json|mjs|js)$/.test(entry.name)) yield full
  }
}

// Pre-read all files once
const corpus = []
for (const dir of SCAN_DIRS) {
  for (const file of walkFiles(dir)) {
    corpus.push({ file, content: readFileSync(file, 'utf-8') })
  }
}
console.log(`Scanned ${corpus.length} files.\n`)

// 'strategist' is too generic for substring matching — require @ or quote context
const STRICT = new Set(['strategist'])

for (const c of CANDIDATES) {
  const ownFile = `${c}.md`
  const refs = []
  for (const { file, content } of corpus) {
    if (path.basename(file) === ownFile) continue
    const needles = STRICT.has(c)
      ? [`@${c}`, `"${c}"`, `'${c}'`, `subagent_type: ${c}`]
      : [c]
    if (needles.some((n) => content.includes(n))) {
      refs.push(path.relative(HOME, file))
    }
  }
  const tag = refs.length ? 'REF ' : 'free'
  console.log(`${tag}  ${c}${refs.length ? `\n        ${refs.slice(0, 4).join('\n        ')}${refs.length > 4 ? `\n        … +${refs.length - 4} more` : ''}` : ''}`)
}
