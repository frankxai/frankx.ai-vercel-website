/**
 * Safety Guard — pure destructive-operation classifier.
 *
 * Pattern matcher for @meta-safety-guard. Returns one of allow / needs-confirm /
 * block based on a fixed destructive-operation vocabulary. Pure function so the
 * smoke eval can verify the verdict table deterministically.
 *
 * Born from feedback_audit_nested_repos.md + feedback_auto_hook_chaos.md — the
 * lessons learned the hard way (628-file would-have-been-destroyed cleanup,
 * the 20K-deletion mislabeled auto-commit).
 */

export type SafetyVerdict = 'allow' | 'needs-confirm' | 'block'

export interface SafetyContext {
  /** Current branch name — used to detect main/master operations */
  currentBranch?: string
  /** Remote URL — used to detect production-repo pushes */
  remoteUrl?: string
  /** Working-tree dirtiness — affects whether to suggest stash-first */
  workingTreeDirty?: boolean
  /** Estimated file count at the target — for rm -rf size checks */
  targetFileCount?: number
  /** LOC of uncommitted work — for reset --hard size checks */
  uncommittedLoc?: number
}

export interface SafetyOutcome {
  verdict: SafetyVerdict
  command: string
  reason: string
  show_stash_option: boolean
  verb: string
  flags: string
  target: string
}

const PRODUCTION_REMOTE_PATTERNS = [
  /frankx\.ai-vercel-website/,
  /\/main$/,
  /\/master$/,
]

const MAIN_BRANCH_NAMES = new Set(['main', 'master', 'production', 'prod'])

/**
 * Classify a candidate command. The caller should already have tokenized
 * the command line; this function does the verdict.
 */
export function classifySafety(command: string, ctx: SafetyContext = {}): SafetyOutcome {
  const trimmed = command.trim()
  const tokens = trimmed.split(/\s+/).filter(Boolean)
  const verb = tokens[0] ?? ''
  const flags = tokens.filter((t) => t.startsWith('-')).join(' ')
  const target = tokens.filter((t) => !t.startsWith('-')).slice(1).join(' ')

  // BLOCK rules (must come first)
  // 1. rm -rf root, home, $HOME
  if (/^rm\s+-rf?\s+(\/|~|\$HOME)\s*$/.test(trimmed) || /^rm\s+-rf?\s+(\/|~|\$HOME)\/?$/.test(trimmed)) {
    return mk('block', command, 'rm -rf on system root / home directory', false, verb, flags, target)
  }

  // 2. git push --force to main on production repo
  if (/^git\s+push\s+(-f|--force|--force-with-lease)\b/.test(trimmed)) {
    const isMain = MAIN_BRANCH_NAMES.has(getPushTarget(trimmed) ?? ctx.currentBranch ?? '')
    const isProd = (ctx.remoteUrl ?? '').match(/frankx\.ai-vercel-website/)
    if (isMain && isProd) {
      return mk('block', command, 'force-push to main on production repo', ctx.workingTreeDirty ?? false, verb, flags, target)
    }
    if (isMain) {
      return mk('needs-confirm', command, 'force-push to main branch', ctx.workingTreeDirty ?? false, verb, flags, target)
    }
    return mk('needs-confirm', command, 'force-push to non-main branch', ctx.workingTreeDirty ?? false, verb, flags, target)
  }

  // 3. git reset --hard with large uncommitted work
  if (/^git\s+reset\s+--hard\b/.test(trimmed)) {
    const loc = ctx.uncommittedLoc ?? 0
    if (loc > 50) {
      return mk('block', command, `reset --hard would lose ${loc} LOC uncommitted work`, true, verb, flags, target)
    }
    if (ctx.workingTreeDirty) {
      return mk('needs-confirm', command, 'reset --hard with dirty working tree', true, verb, flags, target)
    }
    return mk('allow', command, 'reset --hard on clean tree', false, verb, flags, target)
  }

  // 4. DROP DATABASE / DROP TABLE
  if (/\bDROP\s+(DATABASE|TABLE|SCHEMA)\b/i.test(trimmed)) {
    // Match prod-prefixed identifiers (production_users, prod_db) + bare live/main
    if (/\b(prod\w*|live|main)/i.test(trimmed)) {
      return mk('block', command, 'DROP on production-like name', false, verb, flags, target)
    }
    return mk('needs-confirm', command, 'DROP statement', false, verb, flags, target)
  }

  // 5. find ... -delete without path filter
  if (/^find\s+\.\s+-delete\s*$/.test(trimmed) || /^find\s+-delete\s*$/.test(trimmed)) {
    return mk('block', command, 'find -delete with no path filter', false, verb, flags, target)
  }

  // NEEDS-CONFIRM rules
  // 6. rm -rf on a large directory
  if (/^rm\s+-rf?\b/.test(trimmed)) {
    const count = ctx.targetFileCount ?? 0
    if (count > 100) {
      return mk('needs-confirm', command, `rm -rf on directory with ${count} files`, false, verb, flags, target)
    }
    if (count > 0) {
      return mk('allow', command, `rm -rf on small directory (${count} files)`, false, verb, flags, target)
    }
    return mk('needs-confirm', command, 'rm -rf with unknown target size', false, verb, flags, target)
  }

  // 7. git branch -D
  if (/^git\s+branch\s+-D\b/.test(trimmed)) {
    return mk('needs-confirm', command, 'git branch -D (force delete)', false, verb, flags, target)
  }

  // 8. git clean -fd with untracked files
  if (/^git\s+clean\s+-fd?\b/.test(trimmed)) {
    return mk('needs-confirm', command, 'git clean -fd removes untracked files', ctx.workingTreeDirty ?? false, verb, flags, target)
  }

  // ALLOW (everything else)
  return mk('allow', command, 'no destructive vocabulary matched', false, verb, flags, target)
}

function mk(
  verdict: SafetyVerdict,
  command: string,
  reason: string,
  show_stash_option: boolean,
  verb: string,
  flags: string,
  target: string,
): SafetyOutcome {
  return { verdict, command, reason, show_stash_option, verb, flags, target }
}

/** Extract the push target branch from `git push [-f|--force] <remote> <branch>` */
function getPushTarget(command: string): string | undefined {
  const tokens = command.trim().split(/\s+/)
  // Skip git push --force, find the last non-flag token
  const nonFlag = tokens.slice(2).filter((t) => !t.startsWith('-'))
  if (nonFlag.length >= 2) return nonFlag[1]
  if (nonFlag.length === 1) return nonFlag[0]
  return undefined
}
