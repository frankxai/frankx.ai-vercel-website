import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function validateDossierCandidates(packet) {
  const errors = []
  if (packet?.schemaVersion !== 1 || packet.status !== 'editorial-candidate') return ['Expected a held editorial-candidate packet']
  const sources = new Set(packet.sources.map((source) => source.id))
  const media = new Map(packet.media.map((item) => [item.id, item]))
  if (sources.size !== packet.sources.length) errors.push('Duplicate source ids')
  if (media.size !== packet.media.length) errors.push('Duplicate media ids')
  const ids = new Set()
  const checkIds = (references, label) => {
    for (const id of references) if (!sources.has(id)) errors.push(`${label}: unknown source ${id}`)
  }
  for (const source of packet.sources) {
    let url
    try { url = new URL(source.url) } catch { errors.push(`${source.id}: invalid source URL`); continue }
    if (url.protocol !== 'https:' || url.username || url.password || /\/search(?:\/|$)/.test(url.pathname)) errors.push(`${source.id}: expected direct HTTPS publication`)
    if (!source.locators?.length || !source.version || !source.limitations?.length) errors.push(`${source.id}: missing scope, locators or limits`)
  }
  for (const asset of packet.media) {
    checkIds([asset.sourceId], asset.id)
    if (asset.type === 'image' && (!asset.width || !asset.height || !asset.alt || !asset.licenseUrl)) errors.push(`${asset.id}: image needs dimensions, alt and license basis`)
    if (asset.type === 'video' && (!asset.width || !asset.height || !asset.description || !asset.licenseUrl)) errors.push(`${asset.id}: video needs dimensions, text alternative and license basis`)
    if (asset.type === 'youtube' && !/^https:\/\/www\.youtube-nocookie\.com\/embed\/[\w-]+$/.test(asset.embedUrl)) errors.push(`${asset.id}: unexpected video embed origin`)
  }
  for (const dossier of packet.dossiers) {
    if (dossier.reviewStatus !== 'editorial-candidate' || dossier.publishedAt) errors.push(`${dossier.slug}: candidate cannot assert publication`)
    if (!dossier.method || !dossier.limitations?.length || dossier.sections.length < 3) errors.push(`${dossier.slug}: missing substantive method or sections`)
    for (const section of dossier.sections) {
      for (const paragraph of section.paragraphs) {
        if (ids.has(paragraph.id)) errors.push(`Duplicate claim id ${paragraph.id}`)
        ids.add(paragraph.id)
        if (paragraph.kind !== 'analysis' && !paragraph.sourceIds.length) errors.push(`${paragraph.id}: factual paragraph needs sources`)
        checkIds(paragraph.sourceIds, paragraph.id)
      }
      for (const row of section.table?.rows ?? []) {
        checkIds(row.sourceIds, row.id)
        if (row.cells.length !== section.table.headings.length) errors.push(`${row.id}: table cell mismatch`)
      }
      for (const id of section.mediaIds) if (!media.has(id)) errors.push(`${section.id}: unknown media ${id}`)
    }
  }
  return errors
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const packet = JSON.parse(fs.readFileSync(path.join(root, 'data/research/dossier-candidates.json'), 'utf8'))
  const errors = validateDossierCandidates(packet)
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 }
  else console.log(`Research candidate integrity: ${packet.dossiers.length} held dossiers; source bindings and media bases valid`)
}
