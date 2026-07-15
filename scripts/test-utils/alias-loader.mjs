// Node ESM customization hook that resolves the '@/*' tsconfig path alias
// (see tsconfig.json) when running .ts sources directly with
// `node --experimental-strip-types`. Next.js/webpack resolve this alias at
// build time; plain node has no equivalent without ts-node/tsx, which this
// repo doesn't depend on, so we register this tiny hook instead.
import { resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'

let root

export function initialize(data) {
  root = data.root
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const mapped = pathToFileURL(resolvePath(root, specifier.slice(2))).href
    if (mapped.endsWith('.json')) {
      return { url: mapped, format: 'json', shortCircuit: true }
    }
    return nextResolve(mapped, context)
  }

  // Relative TS imports in this repo omit the extension (resolved by
  // tsc/webpack module resolution). Plain node ESM requires an explicit
  // extension, so retry with '.ts' appended when the bare specifier 404s.
  if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) {
    try {
      return await nextResolve(specifier, context)
    } catch (err) {
      if (err?.code === 'ERR_MODULE_NOT_FOUND') {
        return nextResolve(`${specifier}.ts`, context)
      }
      throw err
    }
  }

  return nextResolve(specifier, context)
}

export async function load(url, context, nextLoad) {
  if (url.endsWith('.json') && context.format === 'json') {
    return nextLoad(url, { ...context, importAttributes: { ...context.importAttributes, type: 'json' } })
  }
  return nextLoad(url, context)
}
