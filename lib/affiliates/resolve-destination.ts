export type ProgramDestination = {
  tool: string
  aliases?: readonly string[]
  hasProgram: boolean
  status: string
  ourLink?: string | null
}

export function httpsDestination(value?: string | null): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password ? value : undefined
  } catch { return undefined }
}

/** Preserve partner-issued parameters byte for byte. Article IDs belong in analytics. */
export function resolveProgramDestination(
  id: string,
  programs: readonly ProgramDestination[],
  fallback?: { name: string; url: string },
): { href: string; sponsored: boolean } | undefined {
  const names = [id, fallback?.name].filter(Boolean).map(name => name!.toLowerCase())
  const program = programs.find(entry => [entry.tool, ...(entry.aliases ?? [])]
    .some(name => names.includes(name.toLowerCase())))
  const partnerUrl = program?.hasProgram && program.status === 'active'
    ? httpsDestination(program.ourLink) : undefined
  if (partnerUrl) return { href: partnerUrl, sponsored: true }
  const href = httpsDestination(fallback?.url)
  return href ? { href, sponsored: false } : undefined
}
