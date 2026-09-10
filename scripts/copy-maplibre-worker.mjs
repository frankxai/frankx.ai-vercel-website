import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)

export async function copyMapLibreWorker({
  root = projectRoot,
  packageFile = require.resolve('maplibre-gl/package.json'),
} = {}) {
  const config = JSON.parse(await readFile(path.join(root, 'lib/maplibre-assets.json'), 'utf8'))
  const installed = JSON.parse(await readFile(packageFile, 'utf8'))
  if (!/^\d+\.\d+\.\d+$/.test(config.version) || installed.version !== config.version) {
    throw new Error(`MapLibre worker version mismatch: expected ${config.version}, installed ${installed.version}`)
  }
  const directory = `maplibre/${config.version}`
  if (config.workerUrl !== `/${directory}/maplibre-gl-worker.mjs`) {
    throw new Error('MapLibre worker URL does not match the versioned asset directory')
  }

  // Read the complete pair before writing: a worker without its relative import
  // fails after a successful Next.js build. Include the upstream BSD license.
  const packageRoot = path.dirname(packageFile)
  const names = ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs', 'LICENSE.txt']
  const contents = await Promise.all(names.map((name) => readFile(
    path.join(packageRoot, name === 'LICENSE.txt' ? name : `dist/${name}`),
  )))
  const destination = path.join(root, 'public', directory)
  const files = Object.fromEntries(names.map((name, index) => [name, {
    bytes: contents[index].length,
    sha256: createHash('sha256').update(contents[index]).digest('hex'),
  }]))
  const manifest = { version: installed.version, workerUrl: config.workerUrl, files }

  await mkdir(destination, { recursive: true })
  await Promise.all(names.map((name, index) => writeFile(path.join(destination, name), contents[index])))
  await writeFile(path.join(destination, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  return manifest
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifest = await copyMapLibreWorker()
  console.log(`Prepared MapLibre ${manifest.version} worker and shared module`)
}
