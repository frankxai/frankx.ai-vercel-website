#!/usr/bin/env node
/**
 * scripts/sync-marketplace.mjs
 * Refreshes the stale agentic-creator-skills marketplace repository
 * by copying updated versions of existing skills and commands from agentic-creator-os.
 */
import fs from 'node:fs'
import path from 'node:path'

const SOURCE_OS = 'C:\\Users\\frank\\starlight\\repos\\agentic-creator-os'
const TARGET_MARKETPLACE = 'C:\\Users\\frank\\starlight\\repos\\agentic-creator-skills'

console.log('═══ Marketplace Sync ═══')
console.log(`Source (OS): ${SOURCE_OS}`)
console.log(`Target (Marketplace): ${TARGET_MARKETPLACE}\n`)

if (!fs.existsSync(SOURCE_OS) || !fs.existsSync(TARGET_MARKETPLACE)) {
  console.error('Error: Source or Target repository does not exist.')
  process.exit(1)
}

// Helper to copy directory recursively
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

let copiedSkills = 0
let copiedCommands = 0

// 1. Walk through agentic-creator-skills to find existing skills and commands
function walkAndSync(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  // Check if this directory is a skill folder (contains SKILL.md or is in a skills folder)
  const isSkillsSubdir = path.basename(dir) === 'skills'
  if (isSkillsSubdir) {
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillName = entry.name
        const srcSkillPath = path.join(SOURCE_OS, '.claude', 'skills', skillName)
        const destSkillPath = path.join(dir, skillName)
        
        if (fs.existsSync(srcSkillPath)) {
          console.log(`Syncing skill: ${skillName} → ${path.relative(TARGET_MARKETPLACE, destSkillPath)}`)
          copyDirRecursive(srcSkillPath, destSkillPath)
          copiedSkills++
        }
      }
    }
    return
  }

  // Check if this directory is a commands folder
  const isCommandsSubdir = path.basename(dir) === 'commands'
  if (isCommandsSubdir) {
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const commandFile = entry.name
        const srcCmdPath = path.join(SOURCE_OS, '.claude', 'commands', commandFile)
        const destCmdPath = path.join(dir, commandFile)
        
        if (fs.existsSync(srcCmdPath)) {
          console.log(`Syncing command: ${commandFile} → ${path.relative(TARGET_MARKETPLACE, destCmdPath)}`)
          fs.copyFileSync(srcCmdPath, destCmdPath)
          copiedCommands++
        }
      }
    }
    return
  }

  // Otherwise, recurse
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== '.git' && entry.name !== '.github' && entry.name !== 'node_modules') {
      walkAndSync(path.join(dir, entry.name))
    }
  }
}

walkAndSync(TARGET_MARKETPLACE)

console.log(`\n✓ Sync complete: Refreshed ${copiedSkills} skills and ${copiedCommands} commands in the marketplace!`)
