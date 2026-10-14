import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import kit from '@/data/joei-story-studio-kit.json'
import { createJoeiZip } from '@/lib/friends/joei-zip'

export const runtime = 'nodejs'

const assetNames = [
  'crew-sheet.webp', 'client-delivery.webp',
  'story-garden.webp', 'workflow-infographic.svg', 'provenance.json',
] as const

export async function GET() {
  const entries = Object.entries(kit)
    .filter(([name]) => name !== 'manifest.json')
    .map(([name, text]) => ({ name, bytes: Buffer.from(text, 'utf8') }))
  for (const name of assetNames) {
    const bytes = await readFile(join(process.cwd(), 'public', 'images', 'friends', 'joei', name))
    entries.push({ name: `assets/${name}`, bytes })
  }
  const provenance = JSON.parse(entries.find(entry => entry.name === 'assets/provenance.json')!.bytes.toString('utf8')) as { assets: { file: string; prompt: string }[] }
  for (const asset of provenance.assets) {
    entries.push({ name: `production/${asset.file.replace('.webp', '')}-prompt.txt`, bytes: Buffer.from(asset.prompt, 'utf8') })
  }
  const manifest = {
    revision: '2026-10-13.2', state: 'proposal',
    workflowExecution: 'Portable briefs; no AI execution on page',
    files: entries.map(({ name, bytes }) => ({
      path: name, sha256: createHash('sha256').update(bytes).digest('hex'),
    })),
  }
  entries.push({ name: 'manifest.json', bytes: Buffer.from(JSON.stringify(manifest, null, 2)) })
  return new Response(new Uint8Array(createJoeiZip(entries)), {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="Joei-Story-Studio.zip"',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
