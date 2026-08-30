/** Trailing brand already applied by root `title.template` (`%s | FrankX`). */
export const BRAND_TITLE_SUFFIX =
  /(?:\s*[|·—–]\s*|\s+-\s+)(?:FrankX(?:\.AI|\.ai)?)\s*$/i

export function stripBrandTitleSuffix(title: string): string {
  let next = title.trim()
  for (let i = 0; i < 2; i += 1) {
    const stripped = next.replace(BRAND_TITLE_SUFFIX, '').trim()
    if (stripped === next || stripped.length === 0) break
    next = stripped
  }
  return next
}
