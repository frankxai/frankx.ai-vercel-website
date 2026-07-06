#!/usr/bin/env node
/**
 * ACOS Pack Installer
 *
 * Installs a pillar pack (9 agents + skills + commands) from the FrankX ACOS
 * catalog into the current project's `.claude/` directory.
 *
 * Usage from this repo (local dev):
 *   node scripts/acos-install.mjs <pillar-id> [--target <dir>] [--dry-run]
 *
 * Usage as published npm package (future — not yet published):
 *   npx @frankx/acos install <pillar-id>
 *   npx @frankx/acos list
 *   npx @frankx/acos info <pillar-id>
 *
 * Examples:
 *   node scripts/acos-install.mjs meta              # install Meta pack into .claude/
 *   node scripts/acos-install.mjs music --dry-run   # preview the Music pack
 *   node scripts/acos-install.mjs list              # list all packs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const CATALOG = path.join(REPO_ROOT, 'data', 'acos', 'agents.ts')
const SOURCE_AGENTS = path.join(REPO_ROOT, '.claude', 'agents')
const SOURCE_SKILLS = path.join(REPO_ROOT, '.claude', 'skills')
const SOURCE_COMMANDS = path.join(REPO_ROOT, '.claude', 'commands')
const SOURCE_FIXTURES = path.join(REPO_ROOT, 'tests', 'fixtures')

// ── Argv parse ──
const argv = process.argv.slice(2)
const cmd = argv[0]
const args = argv.slice(1)
const flags = {
  target: '.claude',
  dryRun: false,
  withFixtures: true,
  json: false,
}
for (let i = 0; i < args.length; i++) {
  const a = args[i]
  if (a === '--target' || a === '-t') flags.target = args[++i]
  else if (a === '--dry-run' || a === '-n') flags.dryRun = true
  else if (a === '--no-fixtures') flags.withFixtures = false
  else if (a === '--json') flags.json = true
}

// ── Catalog parser (no TypeScript transpile) ──
function parseCatalog() {
  const src = fs.readFileSync(CATALOG, 'utf8')
  const pillars = []
  const pillarRe = /\{\s*id:\s*'([^']+)',\s*number:\s*(\d+),\s*title:\s*'([^']+)',\s*tagline:\s*'([^']+)',[\s\S]*?specialists:\s*\[([\s\S]*?)\],\s*\}/g
  let pm
  while ((pm = pillarRe.exec(src))) {
    const [, id, num, title, tagline, body] = pm
    const slots = []
    const slotRe = /\{\s*name:\s*'([^']+)',\s*kind:\s*'([^']+)',\s*ref:\s*'([^']*?)',\s*status:\s*'([^']+)'/g
    let sm
    while ((sm = slotRe.exec(body))) {
      slots.push({ name: sm[1], kind: sm[2], ref: sm[3], status: sm[4] })
    }
    pillars.push({ id, number: Number(num), title, tagline, slots })
  }
  return pillars
}

// ── Helpers ──
function pad(s, w) {
  return String(s).padEnd(w, ' ')
}
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}
function copyIfExists(src, dst, dryRun) {
  if (!fs.existsSync(src)) return { copied: false, reason: 'source-missing' }
  if (dryRun) return { copied: false, reason: 'dry-run' }
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    ensureDir(dst)
    for (const entry of fs.readdirSync(src)) {
      copyIfExists(path.join(src, entry), path.join(dst, entry), dryRun)
    }
  } else {
    ensureDir(path.dirname(dst))
    fs.copyFileSync(src, dst)
  }
  return { copied: true }
}

// ── Commands ──
function listPacks() {
  const pillars = parseCatalog()
  if (flags.json) {
    console.log(JSON.stringify(pillars.map((p) => ({ id: p.id, number: p.number, title: p.title, slots: p.slots.length, shipped: p.slots.filter((s) => s.status === 'shipped').length })), null, 2))
    return
  }
  console.log('\nACOS packs available:\n')
  console.log(`  ${pad('ID', 14)} ${pad('Pillar', 26)} ${pad('Shipped', 10)} Tagline`)
  console.log('  ' + '─'.repeat(80))
  for (const p of pillars) {
    const shipped = p.slots.filter((s) => s.status === 'shipped').length
    console.log(`  ${pad(p.id, 14)} ${pad(p.title, 26)} ${pad(`${shipped}/9`, 10)} ${p.tagline.slice(0, 60)}`)
  }
  console.log('\nInstall any pack:  node scripts/acos-install.mjs install <pack-id>\n')
}

function info(pillarId) {
  const pillars = parseCatalog()
  const p = pillars.find((x) => x.id === pillarId)
  if (!p) {
    console.error(`Unknown pack: ${pillarId}`)
    process.exit(1)
  }
  console.log(`\n${p.title} Pack  (pillar ${p.number})`)
  console.log(`${p.tagline}\n`)
  for (const s of p.slots) {
    const icon = s.status === 'shipped' ? '✓' : s.status === 'in-progress' ? '⟳' : '·'
    console.log(`  ${icon}  ${pad(s.kind, 8)} ${pad(s.name, 32)} ${s.ref || ''}`)
  }
  console.log('')
}

function install(pillarId) {
  const pillars = parseCatalog()
  const p = pillars.find((x) => x.id === pillarId)
  if (!p) {
    console.error(`Unknown pack: ${pillarId}`)
    console.error(`Available: ${pillars.map((x) => x.id).join(', ')}`)
    process.exit(1)
  }

  const targetRoot = path.resolve(process.cwd(), flags.target)
  const targetAgents = path.join(targetRoot, 'agents')
  const targetSkills = path.join(targetRoot, 'skills')
  const targetCommands = path.join(targetRoot, 'commands')
  const targetFixtures = path.resolve(process.cwd(), 'tests', 'fixtures')

  console.log(`\nInstalling ${p.title} Pack → ${targetRoot}${flags.dryRun ? '  [DRY RUN]' : ''}`)
  console.log('─'.repeat(70))

  let installed = 0
  let skipped = 0

  for (const slot of p.slots) {
    if (!slot.ref) {
      console.log(`  ·  ${pad(slot.kind, 8)} ${slot.name}  (no ref — skipped)`)
      skipped++
      continue
    }
    if (slot.status === 'gap') {
      console.log(`  ·  ${pad(slot.kind, 8)} ${slot.name}  (gap — nothing to install yet)`)
      skipped++
      continue
    }

    if (slot.kind === 'agent' && !slot.ref.startsWith('/') && !slot.ref.includes(' ')) {
      // Standard FrankX-namespaced agent file
      const src = path.join(SOURCE_AGENTS, `${slot.ref}.md`)
      const dst = path.join(targetAgents, `${slot.ref}.md`)
      const res = copyIfExists(src, dst, flags.dryRun)
      if (res.copied || flags.dryRun) {
        console.log(`  ✓  agent    ${slot.name}  →  agents/${slot.ref}.md`)
        installed++
      } else {
        console.log(`  ·  agent    ${slot.name}  (${res.reason})`)
        skipped++
      }

      // Fixture if present and requested
      if (flags.withFixtures) {
        const fixSrc = path.join(SOURCE_FIXTURES, slot.ref)
        const fixDst = path.join(targetFixtures, slot.ref)
        if (fs.existsSync(fixSrc)) {
          copyIfExists(fixSrc, fixDst, flags.dryRun)
          console.log(`     fixture: tests/fixtures/${slot.ref}/`)
        }
      }
    } else if (slot.kind === 'skill') {
      const src = path.join(SOURCE_SKILLS, slot.ref)
      const dst = path.join(targetSkills, slot.ref)
      const res = copyIfExists(src, dst, flags.dryRun)
      if (res.copied || flags.dryRun) {
        console.log(`  ✓  skill    ${slot.name}  →  skills/${slot.ref}/`)
        installed++
      } else {
        console.log(`  ·  skill    ${slot.name}  (${res.reason})`)
        skipped++
      }
    } else if (slot.kind === 'command') {
      const cmdName = slot.ref.replace(/^\//, '')
      const src = path.join(SOURCE_COMMANDS, `${cmdName}.md`)
      const dst = path.join(targetCommands, `${cmdName}.md`)
      const res = copyIfExists(src, dst, flags.dryRun)
      if (res.copied || flags.dryRun) {
        console.log(`  ✓  command  ${slot.name}  →  commands/${cmdName}.md`)
        installed++
      } else {
        console.log(`  ·  command  ${slot.name}  (${res.reason})`)
        skipped++
      }
    } else if (slot.kind === 'agent' && slot.ref.includes(' ')) {
      // Builtin Anthropic agent — no file to install, just note it
      console.log(`  ⓘ  builtin  ${slot.name}  (Anthropic-provided — already available)`)
      skipped++
    } else {
      console.log(`  ?  ${slot.kind}  ${slot.name}  (unsupported kind)`)
      skipped++
    }
  }

  console.log('─'.repeat(70))
  console.log(`Installed: ${installed}  ·  Skipped: ${skipped}${flags.dryRun ? '  (dry run — nothing written)' : ''}`)
  if (!flags.dryRun) {
    console.log(`\nNext step: restart your Claude Code session so it picks up the new agents.`)
    console.log(`See the catalog:  https://frankx.ai/agents/packs/${p.id}\n`)
  }
}

function help() {
  console.log(`
ACOS Pack Installer  ·  install FrankX's 99-agent catalog into your project

Usage:
  node scripts/acos-install.mjs <command> [args]

Commands:
  list                          List all available packs
  info <pack-id>                Show specialists in a pack
  install <pack-id>             Install a pack into ./claude/ (or --target)
  help                          Show this message

Flags:
  --target <dir>                Install target dir (default: .claude)
  --dry-run                     Preview without writing files
  --no-fixtures                 Skip smoke fixtures
  --json                        Machine-readable output (list only)

Examples:
  node scripts/acos-install.mjs list
  node scripts/acos-install.mjs info meta
  node scripts/acos-install.mjs install meta
  node scripts/acos-install.mjs install music --dry-run

Catalog source:  https://github.com/frankxai/FrankX/blob/main/data/acos/agents.ts
Pack landing:    https://frankx.ai/agents
`)
}

// ── Dispatch ──
if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
  help()
} else if (cmd === 'list' || cmd === 'ls') {
  listPacks()
} else if (cmd === 'info') {
  if (!args[0]) { console.error('info requires a pack-id'); process.exit(1) }
  info(args[0])
} else if (cmd === 'install') {
  if (!args[0]) { console.error('install requires a pack-id'); process.exit(1) }
  install(args[0])
} else {
  // Backward-compat: bare `<pack-id>` → install
  const pillars = parseCatalog()
  if (pillars.find((p) => p.id === cmd)) {
    install(cmd)
  } else {
    console.error(`Unknown command: ${cmd}`)
    help()
    process.exit(1)
  }
}
