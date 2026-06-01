#!/usr/bin/env node
/**
 * port-acos-skill — mirror a skill from a local ACOS clone into this repo.
 *
 * Why: skills live canonically in `frankxai/agentic-creator-os` under
 * `skills/`. Claude Code sessions working in this repo discover skills from
 * `.claude-skills/`, so each ACOS skill the user wants available here has to
 * be mirrored. Paths that are self-referential to the skill's location have
 * to be adapted from `skills/<category>/<name>/...` to
 * `.claude-skills/<category>/<name>/...`.
 *
 * What: given a skill name and a path to a local ACOS clone, copy every file
 * under `skills/<category>/<name>/` to `.claude-skills/<category>/<name>/`,
 * rewriting self-referential paths in every text file as we go.
 *
 * Usage:
 *   node scripts/port-acos-skill.mjs <skill-name>
 *   node scripts/port-acos-skill.mjs <skill-name> --acos-path /custom/path
 *   node scripts/port-acos-skill.mjs <skill-name> --category projects
 *   node scripts/port-acos-skill.mjs --list           # show ACOS skills
 *   node scripts/port-acos-skill.mjs --diff           # show ports out of date
 *
 * Defaults:
 *   ACOS path:    $ACOS_REPO_PATH || /home/user/agentic-creator-os
 *   Category:     auto-detected by searching skills/<*>/<name>/ in ACOS
 *
 * Exit codes:
 *   0  success
 *   1  argument error
 *   2  ACOS path not found
 *   3  skill not found in ACOS
 *   4  copy or rewrite failure
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, existsSync } from 'node:fs'
import { dirname, join, relative, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = dirname(HERE)
const DEFAULT_ACOS = process.env.ACOS_REPO_PATH || '/home/user/agentic-creator-os'
const TEXT_EXTS = new Set(['.md', '.mdx', '.txt', '.yaml', '.yml', '.json', '.mjs', '.js', '.ts'])

// Crude argv parsing — no external deps.
const args = process.argv.slice(2)
const flags = {}
const positional = []
for (let i = 0; i < args.length; i++) {
  const a = args[i]
  if (a === '--acos-path') flags.acosPath = args[++i]
  else if (a === '--category') flags.category = args[++i]
  else if (a === '--list') flags.list = true
  else if (a === '--diff') flags.diff = true
  else if (a === '--dry-run') flags.dryRun = true
  else if (a.startsWith('--')) {
    console.error(`unknown flag: ${a}`)
    process.exit(1)
  } else positional.push(a)
}

const acosPath = flags.acosPath || DEFAULT_ACOS

if (!existsSync(acosPath)) {
  console.error(`ACOS path not found: ${acosPath}`)
  console.error(`Set $ACOS_REPO_PATH or pass --acos-path /path/to/agentic-creator-os.`)
  process.exit(2)
}

const acosSkills = join(acosPath, 'skills')
if (!existsSync(acosSkills)) {
  console.error(`Expected ${acosSkills} to exist — is this a valid ACOS clone?`)
  process.exit(2)
}

if (flags.list) {
  listSkills()
  process.exit(0)
}

if (flags.diff) {
  reportDiff()
  process.exit(0)
}

const skillName = positional[0]
if (!skillName) {
  console.error(usage())
  process.exit(1)
}

const category = flags.category || findCategory(skillName)
if (!category) {
  console.error(`skill "${skillName}" not found under ${acosSkills}/<*>/`)
  console.error(`Try --list to see what's available.`)
  process.exit(3)
}

const src = join(acosSkills, category, skillName)
const dst = join(REPO_ROOT, '.claude-skills', category, skillName)
// No trailing slash so adaptPaths matches both `skills/foo/bar/` and
// bare `skills/foo/bar` (the latter shows up in markdown links).
const srcRel = `skills/${category}/${skillName}`
const dstRel = `.claude-skills/${category}/${skillName}`

console.log(`Porting ${srcRel} → ${dstRel}`)
console.log(`  source: ${src}`)
console.log(`  target: ${dst}`)
if (flags.dryRun) console.log('  (dry-run — no files written)')

let copied = 0
let rewritten = 0
try {
  copyTree(src, dst, { srcRel, dstRel, dryRun: flags.dryRun })
  console.log(`\n${copied} file(s) copied · ${rewritten} file(s) with path rewrites`)
} catch (err) {
  console.error(`\ncopy failed: ${err.message}`)
  process.exit(4)
}

if (!flags.dryRun) {
  console.log(`\nNext steps:`)
  console.log(`  1. git add .claude-skills/${category}/${skillName}/`)
  console.log(`  2. Update .claude-skills/registry/SKILL_REGISTRY.md if this is a new entry`)
  console.log(`  3. Update .claude-skills/README.md table if this is a new entry`)
  console.log(`  4. git commit -m "feat(skills): port ${skillName} from ACOS"`)
}

// ---------------------------------------------------------------------------

function isSkillDir(catPath, name) {
  // A directory is a "skill" only if it contains SKILL.md at its root.
  // Without this filter, --list and --diff over-report by including
  // arbitrary subdirs (e.g. `skills/technical/mcp-architecture/<subdir>`
  // where mcp-architecture itself is the skill, not a category).
  try {
    return existsSync(join(catPath, name, 'SKILL.md'))
  } catch {
    return false
  }
}

function listSkills() {
  const cats = readdirSync(acosSkills, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
  for (const cat of cats) {
    const catPath = join(acosSkills, cat)
    const skills = readdirSync(catPath, { withFileTypes: true })
      .filter((d) => d.isDirectory() && isSkillDir(catPath, d.name))
      .map((d) => d.name)
      .sort()
    if (skills.length) {
      console.log(`${cat}/`)
      for (const s of skills) console.log(`  ${s}`)
    }
  }
}

function findCategory(name) {
  const cats = readdirSync(acosSkills, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
  for (const cat of cats) {
    const candidate = join(acosSkills, cat, name)
    if (existsSync(candidate) && statSync(candidate).isDirectory()) return cat
  }
  return null
}

function reportDiff() {
  // For each ACOS skill (directory with a SKILL.md), check whether it
  // exists in this repo's .claude-skills and report differing content.
  let stale = 0
  let missing = 0
  const cats = readdirSync(acosSkills, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
  for (const cat of cats) {
    const catPath = join(acosSkills, cat)
    const skills = readdirSync(catPath, { withFileTypes: true })
      .filter((d) => d.isDirectory() && isSkillDir(catPath, d.name))
      .map((d) => d.name)
    for (const s of skills) {
      const here = join(REPO_ROOT, '.claude-skills', cat, s)
      if (!existsSync(here)) {
        console.log(`MISSING  ${cat}/${s}`)
        missing++
        continue
      }
      const drift = compareTrees(join(acosSkills, cat, s), here, { catName: cat, skillName: s })
      if (drift > 0) {
        console.log(`STALE    ${cat}/${s}  (${drift} file(s) differ after path-adaptation)`)
        stale++
      }
    }
  }
  console.log(`\n${missing} missing · ${stale} stale`)
}

function compareTrees(src, dst, ctx) {
  let differ = 0
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const sp = join(src, entry.name)
    const dp = join(dst, entry.name)
    if (entry.isDirectory()) {
      if (!existsSync(dp)) {
        differ++
        continue
      }
      differ += compareTrees(sp, dp, ctx)
      continue
    }
    if (!existsSync(dp)) {
      differ++
      continue
    }
    const ext = extname(entry.name)
    if (!TEXT_EXTS.has(ext)) continue
    const adaptedSrc = adaptPaths(
      readFileSync(sp, 'utf8'),
      `skills/${ctx.catName}/${ctx.skillName}`,
      `.claude-skills/${ctx.catName}/${ctx.skillName}`
    )
    const dstText = readFileSync(dp, 'utf8')
    if (adaptedSrc !== dstText) differ++
  }
  // Orphans: files in the mirror that no longer exist in ACOS.
  // The drift policy says the user must delete these manually, but we flag
  // them so --diff surfaces the staleness instead of staying silent.
  for (const entry of readdirSync(dst, { withFileTypes: true })) {
    const sp = join(src, entry.name)
    if (!existsSync(sp)) differ++
  }
  return differ
}

function copyTree(src, dst, ctx) {
  if (!ctx.dryRun) mkdirSync(dst, { recursive: true })
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const sp = join(src, entry.name)
    const dp = join(dst, entry.name)
    if (entry.isDirectory()) {
      copyTree(sp, dp, ctx)
      continue
    }
    const ext = extname(entry.name)
    const raw = readFileSync(sp)
    let out = raw
    let didRewrite = false
    if (TEXT_EXTS.has(ext)) {
      const adapted = adaptPaths(raw.toString('utf8'), ctx.srcRel, ctx.dstRel)
      if (adapted !== raw.toString('utf8')) didRewrite = true
      out = Buffer.from(adapted, 'utf8')
    }
    if (!ctx.dryRun) writeFileSync(dp, out)
    copied++
    if (didRewrite) rewritten++
    const tag = didRewrite ? '  (rewrote paths)' : ''
    console.log(`  ${relative(REPO_ROOT, dp)}${tag}`)
  }
}

/**
 * Rewrite self-referential paths. Only touches the skill's own ACOS path
 * (`skills/<cat>/<name>/...`) and rewrites it to the mirror path
 * (`.claude-skills/<cat>/<name>/...`). Does NOT touch unrelated `skills/`
 * mentions (e.g. an unrelated `frankx-daily-execution/skills/` reference).
 */
function adaptPaths(text, srcRel, dstRel) {
  // Replace inside backticks, fenced code blocks, plain text — anywhere.
  // Use a literal string replace; the source path is a fixed prefix.
  return text.split(srcRel).join(dstRel)
}

function usage() {
  return `Usage:
  node scripts/port-acos-skill.mjs <skill-name>
  node scripts/port-acos-skill.mjs --list
  node scripts/port-acos-skill.mjs --diff

Options:
  --acos-path <path>   Path to ACOS clone (default: $ACOS_REPO_PATH or /home/user/agentic-creator-os)
  --category <name>    Override category (default: auto-detect)
  --dry-run            Print actions without writing files
  --list               List all ACOS skills by category
  --diff               Report skills missing or stale in .claude-skills

Examples:
  node scripts/port-acos-skill.mjs agentic-builder-lab
  ACOS_REPO_PATH=/path/to/acos node scripts/port-acos-skill.mjs hook
`
}
