import { statSync } from 'node:fs'
import { join, resolve, sep } from 'node:path'

function isFile(path) {
  try {
    return statSync(path).isFile()
  } catch {
    return false
  }
}

/**
 * Resolve a clean internal href against public/.
 *
 * Exact files and exact directories containing index.html are deployable
 * public resources. Missing paths and paths escaping the public root fail
 * closed; no path prefixes are implicitly trusted.
 */
export function resolvesPublicHref(publicDir, href) {
  if (typeof href !== 'string') return false

  const rel = href.replace(/^\/+/, '')
  if (!rel) return false

  const root = resolve(publicDir)
  const resolved = resolve(root, rel)
  if (resolved !== root && !resolved.startsWith(root + sep)) return false

  try {
    const target = statSync(resolved)
    if (target.isFile()) return true
    if (!target.isDirectory()) return false
    return isFile(join(resolved, 'index.html'))
  } catch {
    return false
  }
}
