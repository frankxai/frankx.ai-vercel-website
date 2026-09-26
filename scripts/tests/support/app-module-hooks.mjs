// Module hooks that let plain Node import app modules the way Next.js bundles them:
// the @/ alias, extensionless .ts imports, React's server-only cache, and JSON imports written without `with { type: 'json' }`.
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = new URL('../../../', import.meta.url)
const candidates = ['', '.ts', '.tsx', '/index.ts']

function resolveFile(base) {
  const path = fileURLToPath(base)
  const suffix = candidates.find((candidate) => existsSync(path + candidate) && (candidate !== '' || /\.\w+$/.test(path)))
  return suffix === undefined ? null : pathToFileURL(path + suffix).href
}

export async function resolve(specifier, context, nextResolve) {
  const fromApp = context.parentURL?.startsWith(root.href) && !context.parentURL.includes('/node_modules/')
  if (specifier.startsWith('@/')) {
    const url = resolveFile(new URL(specifier.slice(2), root))
    if (url) return { url, shortCircuit: true }
  } else if (fromApp && specifier.startsWith('.')) {
    const url = resolveFile(new URL(specifier, context.parentURL))
    if (url) return { url, shortCircuit: true }
  } else if (fromApp && specifier === 'react') {
    // lib/blog.ts wraps loaders in React's server-only `cache`, which comes from the React build vendored
    // inside Next.js, not the react@18 package. Outside a request, per-request memoisation is a pass-through.
    return { url: 'data:text/javascript,export const cache = (fn) => fn', shortCircuit: true }
  }
  return nextResolve(specifier, context)
}

export async function load(url, context, nextLoad) {
  if (url.startsWith(root.href) && url.endsWith('.json') && !url.includes('/node_modules/')) {
    return { format: 'module', source: `export default ${readFileSync(fileURLToPath(url), 'utf8')}`, shortCircuit: true }
  }
  return nextLoad(url, context)
}
