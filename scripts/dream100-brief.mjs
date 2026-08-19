import { readFile } from 'node:fs/promises'

const registryUrl = new URL('../data/dream100/registry.json', import.meta.url)
const registry = JSON.parse(await readFile(registryUrl, 'utf8'))
const day = process.argv.find((arg) => arg.startsWith('--date='))?.slice(7) ?? new Date().toISOString().slice(0, 10)
const recent = [...registry.signals].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3)
const members = new Map(registry.members.map((member) => [member.id, member]))

console.log(`# Dream 100 brief · ${day}`)
console.log(`\nSnapshot: ${registry.snapshotId}`)
console.log(`\nPrinciple: ${registry.principle}`)
console.log('\n## Research queue')
for (const signal of recent) {
  console.log(`\n### ${signal.title}`)
  console.log(`- Subject: ${members.get(signal.subjectId)?.name ?? signal.subjectId}`)
  console.log(`- Verify: ${signal.sourceUrl}`)
  console.log(`- FrankX: ${signal.architectureAngle}`)
  console.log(`- GenCreator: ${signal.creatorAngle}`)
  console.log(`- Contribution: ${signal.contribution}`)
}
console.log('\n## Guardrails')
console.log('- Verify new facts at the primary source before drafting.')
console.log('- Do not publish or contact anyone automatically.')
console.log('- Make one useful contribution before proposing a conversation.')

