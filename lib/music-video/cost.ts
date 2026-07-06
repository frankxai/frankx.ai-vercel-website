import type { CostEstimate, CostLineItem, ShotPlan } from './types'
import { getEngine, imageUsd, motionSecondUsd, HIGGSFIELD_USD_PER_CREDIT } from './engines'
import { getStyle } from './styles'

// Generate-to-keep ratio: you roll ~2x the clips you ship and select the best.
const DEFAULT_SELECTS_MULTIPLIER = 2

// ROI framing constants.
const USD_PER_SPOTIFY_STREAM = 0.004 // ~mid-range payout
const TYPICAL_SYNC_DEAL_USD = 500 // a single modest sync placement

export function estimateCost(
  plan: ShotPlan,
  selectsMultiplier = DEFAULT_SELECTS_MULTIPLIER,
): CostEstimate {
  const style = getStyle(plan.style)
  const lineItems: CostLineItem[] = []

  // ── L1 keyframes — one locking still per shot ─────────────────────────
  const keyframeTier = plan.resolution === '4k' ? '4k' : 'standard'
  const keyframeCount = plan.shots.length
  if (style.keyframeEngine) {
    const each = imageUsd(style.keyframeEngine, keyframeTier)
    lineItems.push({
      layer: 'keyframe',
      engine: style.keyframeEngine,
      label: `${getEngine(style.keyframeEngine).label} keyframes`,
      quantity: keyframeCount,
      unit: 'image',
      usd: round(each * keyframeCount),
      higgsfieldCredits: 0,
    })
  }

  // ── L1 Soul ID — one-time character lock ──────────────────────────────
  if (plan.characterCount > 0) {
    const soul = getEngine('higgsfield-soul-id')
    lineItems.push({
      layer: 'keyframe',
      engine: 'higgsfield-soul-id',
      label: 'Soul ID character lock',
      quantity: plan.characterCount,
      unit: 'character',
      usd: round((soul.rate.flatUsd ?? 0) * plan.characterCount),
      higgsfieldCredits: (soul.rate.higgsfieldCredits ?? 0) * plan.characterCount,
    })
  }

  // ── L2 motion — per shot, hero shots upgraded ─────────────────────────
  if (style.motionEngine) {
    const bodyShots = plan.shots.filter((s) => !s.isHero)
    const heroShots = plan.shots.filter((s) => s.isHero)

    if (bodyShots.length > 0) {
      const secs = bodyShots.reduce((a, s) => a + s.durationSec, 0) * selectsMultiplier
      const each = motionSecondUsd(style.motionEngine, plan.resolution)
      const eng = getEngine(style.motionEngine)
      lineItems.push({
        layer: 'motion',
        engine: style.motionEngine,
        label: `${eng.label} — body (${bodyShots.length} shots)`,
        quantity: round(secs),
        unit: 'second',
        usd: round(each * secs),
        higgsfieldCredits: higgsfieldCreditsForSeconds(eng, secs),
      })
    }

    if (heroShots.length > 0 && style.heroEngine) {
      const secs = heroShots.reduce((a, s) => a + s.durationSec, 0) * selectsMultiplier
      const each = motionSecondUsd(style.heroEngine, plan.resolution)
      const eng = getEngine(style.heroEngine)
      lineItems.push({
        layer: 'motion',
        engine: style.heroEngine,
        label: `${eng.label} — hero (${heroShots.length} shots)`,
        quantity: round(secs),
        unit: 'second',
        usd: round(each * secs),
        higgsfieldCredits: higgsfieldCreditsForSeconds(eng, secs),
      })
    }
  }

  // ── L3 assembly — local, $0 marginal ──────────────────────────────────
  lineItems.push({
    layer: 'assembly',
    engine: style.assemblyEngine,
    label: `${getEngine(style.assemblyEngine).label} — assemble + ${plan.formats.length} formats`,
    quantity: plan.formats.length,
    unit: 'clip',
    usd: 0,
    higgsfieldCredits: 0,
  })

  const totalUsd = round(lineItems.reduce((a, li) => a + li.usd, 0))
  const totalHiggsfieldCredits = Math.round(
    lineItems.reduce((a, li) => a + li.higgsfieldCredits, 0),
  )

  return {
    songId: plan.songId,
    lineItems,
    totalUsd,
    totalHiggsfieldCredits,
    breakevenSpotifyStreams: Math.ceil(totalUsd / USD_PER_SPOTIFY_STREAM),
    breakevenSyncDeals: Math.max(1, Math.ceil(totalUsd / TYPICAL_SYNC_DEAL_USD)),
    resonanceScore: null,
    resonanceFlags: [],
    selectsMultiplier,
  }
}

function higgsfieldCreditsForSeconds(
  eng: ReturnType<typeof getEngine>,
  seconds: number,
): number {
  if (eng.defaultRoute !== 'higgsfield' || !eng.rate.higgsfieldCredits) return 0
  const clipSec = Math.min(eng.maxClipSec ?? 8, 8)
  const clips = Math.ceil(seconds / clipSec)
  return clips * eng.rate.higgsfieldCredits
}

function round(n: number): number {
  return Math.round(n * 100) / 100
}

export { HIGGSFIELD_USD_PER_CREDIT }
