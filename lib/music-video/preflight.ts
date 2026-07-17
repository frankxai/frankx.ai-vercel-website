import type { CostEstimate, ShotPlan } from './types'
import { getStyle } from './styles'
import { getFormat } from './formats'

// The pre-flight card. NO render starts without this being shown + approved.
// Returns both a structured object (for the /studio/music cockpit) and a
// monospace string (for the CLI / INDEX.md).

export interface PreflightCard {
  songTitle: string
  style: string
  formats: string[]
  designBrief: { audience: string; arc: string; hook: string }
  shotSummary: string
  estimate: CostEstimate
  verdict: 'ready' | 'needs-brief' | 'over-budget'
}

export function buildPreflightCard(
  plan: ShotPlan,
  estimate: CostEstimate,
  designBrief: { audience: string; arc: string; hook: string } | null,
  budgetCeilingUsd = 75,
): PreflightCard {
  const style = getStyle(plan.style)
  const heroShots = plan.shots.filter((s) => s.isHero).length

  const verdict: PreflightCard['verdict'] = !designBrief
    ? 'needs-brief'
    : estimate.totalUsd > budgetCeilingUsd
      ? 'over-budget'
      : 'ready'

  return {
    songTitle: plan.songTitle,
    style: style.label,
    formats: plan.formats.map((f) => getFormat(f).label),
    designBrief: designBrief ?? {
      audience: '— run design-thinking first —',
      arc: style.emotionalArc,
      hook: style.hookDoctrine,
    },
    shotSummary: `${plan.shots.length} shots (${heroShots} hero) · ${plan.totalDurationSec}s · ${plan.resolution}${plan.bpm ? ` · ${plan.bpm} BPM` : ''}`,
    estimate,
    verdict,
  }
}

export function renderPreflightText(card: PreflightCard): string {
  const e = card.estimate
  const lines: string[] = []
  lines.push(`┌─ PRE-FLIGHT: "${card.songTitle}" → ${card.style} ${'─'.repeat(Math.max(2, 30 - card.songTitle.length))}┐`)
  lines.push(`│ DESIGN  audience: ${card.designBrief.audience}`)
  lines.push(`│         arc: ${truncate(card.designBrief.arc, 60)}`)
  lines.push(`│         hook: ${truncate(card.designBrief.hook, 60)}`)
  lines.push(`│ FORMATS ${card.formats.join(' · ')}`)
  lines.push(`│ SHOTS   ${card.shotSummary}`)
  lines.push(`│ COST`)
  for (const li of e.lineItems) {
    const credits = li.higgsfieldCredits ? ` (${li.higgsfieldCredits} cr)` : ''
    lines.push(`│   ${li.label.padEnd(40)} $${li.usd.toFixed(2)}${credits}`)
  }
  lines.push(`│   ${'── TOTAL'.padEnd(40)} $${e.totalUsd.toFixed(2)}  +  ${e.totalHiggsfieldCredits} Higgsfield credits`)
  lines.push(`│ RESONANCE  ${e.resonanceScore != null ? `${e.resonanceScore}/10` : 'unscored — run virality_predictor'}${e.resonanceFlags.length ? ` ⚠ ${e.resonanceFlags.join(', ')}` : ''}`)
  lines.push(`│ ROI     breakeven at ~${e.breakevenSpotifyStreams.toLocaleString()} streams or ${e.breakevenSyncDeals} sync deal${e.breakevenSyncDeals > 1 ? 's' : ''}`)
  lines.push(`│ VERDICT ${card.verdict.toUpperCase()}`)
  lines.push(`└${'─'.repeat(64)}┘`)
  return lines.join('\n')
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1) + '…' : s
}
