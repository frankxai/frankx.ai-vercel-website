/** The source skill is pinned independently from this browser report format. */
export const REPORT_FORMAT = 'frankx-architecture-interview/1'
export const RUBRIC_SOURCE =
  'https://github.com/frankxai/frankx.ai-vercel-website/blob/61fc5266bc2d3f048a5edce9d8eaeca79e6bb45b/public/skills/ai-architect-review/SKILL.md'

export function createCopyAttemptGuard() {
  let version = 0
  return {
    invalidate() { version += 1 },
    begin() {
      const attempt = ++version
      return () => attempt === version
    },
  }
}

export function withReportProvenance(report: string): string {
  return [
    report,
    '',
    '### Source and limits',
    'Evidence basis: self-reported answers. No repository files or runtime measurements were inspected.',
    'The four verdicts describe these answers. Security, production readiness and the seven-plane review remain unassessed.',
    `Report format: ${REPORT_FORMAT}`,
    'Rubric: https://www.frankx.ai/ai-architect',
    `Rubric source revision: ${RUBRIC_SOURCE}`,
    'Skill (MIT): https://www.frankx.ai/skills/ai-architect-review/SKILL.md',
  ].join('\n')
}

export async function copyReviewReport(
  report: string,
  clipboard: Pick<Clipboard, 'writeText'> | undefined,
  onCopied: () => void,
  timeoutMs = 3000,
): Promise<'copied' | 'manual'> {
  if (!report || !clipboard) return 'manual'
  let timeout: ReturnType<typeof setTimeout> | undefined
  try {
    await Promise.race([
      clipboard.writeText(report),
      new Promise<never>((_resolve, reject) => {
        timeout = setTimeout(() => reject(new Error('Clipboard response timed out')), timeoutMs)
      }),
    ])
  } catch {
    return 'manual'
  } finally {
    clearTimeout(timeout)
  }
  onCopied()
  return 'copied'
}
