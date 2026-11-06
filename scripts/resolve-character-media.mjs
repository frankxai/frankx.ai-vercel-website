import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const manifest = JSON.parse(await readFile(new URL('public/media/characters.json', root), 'utf8'))

try {
  const keys = new Set()
  for (const asset of manifest.assets) {
    if (keys.has(asset.key)) throw new Error(`Duplicate key: ${asset.key}`)
    keys.add(asset.key)
    if (!/^\/images\/guides\/mini-me\/[a-z0-9-]+\.svg$/.test(asset.url)) {
      throw new Error(`Unexpected public path: ${asset.key}`)
    }
    if (!['needs-scene-review', 'existing-public-example'].includes(asset.reuse_status) || asset.identity_reference !== false) {
      throw new Error(`Invalid example classification: ${asset.key}`)
    }
    const bytes = await readFile(new URL(`public${asset.url}`, root))
    if (bytes.length !== asset.bytes || createHash('sha256').update(bytes).digest('hex') !== asset.sha256) {
      throw new Error(`Asset changed; review required: ${asset.key}`)
    }
  }
  const serialized = JSON.stringify(manifest)
  if (/libfile_|drive\.google\.com|signed[_-]?url|token|private_recovery/i.test(serialized)) {
    throw new Error('Private locator or credential field in public manifest')
  }
  const key = process.argv[2]
  if (key === '--check') {
    console.log(`Verified ${keys.size} public example files and review classifications`)
  } else {
    const asset = manifest.assets.find((item) => item.key === key)
    if (!asset) throw new Error('Unknown key. See public/media/characters.json; no identity fallback is permitted.')
    if (asset.reuse_status !== 'existing-public-example') throw new Error(`Scene review required: ${key}`)
    console.log(JSON.stringify({ key, url: asset.url, role: asset.role, identity_reference: false, local_path: fileURLToPath(new URL(`public${asset.url}`, root)) }, null, 2))
  }
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
