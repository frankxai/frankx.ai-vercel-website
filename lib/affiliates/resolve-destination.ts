import { programToRecord, sponsorDecision, toolSlug, type ProgramSource } from '../tools/record.ts'

export type ProgramDestination = ProgramSource & {
  hasProgram: boolean
  status: string
}

export function httpsDestination(value?: string | null): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password ? value : undefined
  } catch { return undefined }
}

/** Hop-enabled programs recheck freshness on click, even from cached articles. */
export function resolveProgramDestination(
  id: string,
  programs: readonly ProgramDestination[],
  fallback?: { name: string; url: string },
  now = new Date(),
): { href: string; sponsored: boolean } | undefined {
  const names = [id, fallback?.name].filter(Boolean).map(name => name!.toLowerCase())
  const program = programs.find(entry => [entry.tool, ...(entry.aliases ?? [])]
    .some(name => names.includes(name.toLowerCase())))
  if (program) {
    const decision = sponsorDecision(programToRecord(program), now)
    if (program.useHop) return { href: `/go/${toolSlug(program.tool)}`, sponsored: decision.sponsored }
    if (decision.sponsored && decision.href) return { href: decision.href, sponsored: true }
  }
  const href = httpsDestination(fallback?.url)
  return href ? { href, sponsored: false } : undefined
}
