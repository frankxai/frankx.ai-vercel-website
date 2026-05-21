/**
 * Memory Guardian — pure zone classifier.
 *
 * Single source of truth for the green/yellow/red RAM zone rules from
 * .claude/skills/memory-guardian/SKILL.md. Extracted as a pure function so
 * @meta-memory-guardian's smoke eval can test the classification
 * deterministically without invoking the agent itself.
 *
 * Zones (immutable contract):
 *   pct < 75   → green   · parallel_cap=4 · build_safe=true
 *   75 ≤ pct<90 → yellow  · parallel_cap=2 · build_safe=false
 *   pct ≥ 90   → red     · parallel_cap=1 · build_safe=false · recovery_needed=true
 */

export type RamZone = 'green' | 'yellow' | 'red'

export interface RamProbe {
  used_mb: number
  total_mb: number
  /** Optional swap state — informational only, does not affect zone */
  swap_used_mb?: number
  swap_total_mb?: number
}

export interface RamVerdict {
  zone: RamZone
  pct: number
  used_mb: number
  total_mb: number
  parallel_cap: number
  build_safe: boolean
  recovery_needed: boolean
  swap_used_mb: number
  swap_total_mb: number
}

export function classifyRam(probe: RamProbe): RamVerdict {
  if (probe.total_mb <= 0) {
    throw new RangeError(`total_mb must be > 0 (got ${probe.total_mb})`)
  }
  if (probe.used_mb < 0) {
    throw new RangeError(`used_mb must be >= 0 (got ${probe.used_mb})`)
  }
  const pct = Math.round((probe.used_mb / probe.total_mb) * 100)

  let zone: RamZone
  let parallel_cap: number
  let build_safe: boolean
  let recovery_needed: boolean

  if (pct < 75) {
    zone = 'green'
    parallel_cap = 4
    build_safe = true
    recovery_needed = false
  } else if (pct < 90) {
    zone = 'yellow'
    parallel_cap = 2
    build_safe = false
    recovery_needed = false
  } else {
    zone = 'red'
    parallel_cap = 1
    build_safe = false
    recovery_needed = true
  }

  return {
    zone,
    pct,
    used_mb: probe.used_mb,
    total_mb: probe.total_mb,
    parallel_cap,
    build_safe,
    recovery_needed,
    swap_used_mb: probe.swap_used_mb ?? 0,
    swap_total_mb: probe.swap_total_mb ?? 0,
  }
}

/**
 * Parse `free -m` output (Linux/WSL convention) into a RamProbe.
 * Format expected:
 *               total        used        free      shared  buff/cache   available
 * Mem:          12288        8200        2000           0        2088        3800
 * Swap:         12288         512       11776
 */
export function parseFreeMb(stdout: string): RamProbe {
  const lines = stdout.split('\n')
  let probe: Partial<RamProbe> = {}
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('Mem:')) {
      const parts = trimmed.split(/\s+/)
      probe.total_mb = Number(parts[1])
      probe.used_mb = Number(parts[2])
    } else if (trimmed.startsWith('Swap:')) {
      const parts = trimmed.split(/\s+/)
      probe.swap_total_mb = Number(parts[1])
      probe.swap_used_mb = Number(parts[2])
    }
  }
  if (probe.total_mb === undefined || probe.used_mb === undefined) {
    throw new Error('parseFreeMb: missing Mem: line in input')
  }
  return probe as RamProbe
}
