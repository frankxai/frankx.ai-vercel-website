'use client'

import { useEffect, useId, useState } from 'react'
import { AlertTriangle, Calculator, Check } from 'lucide-react'

// Prices read from vendor pricing pages on 2026-11-26
// Sources: higgsfield.ai/pricing and elevenlabs.io/pricing (Black Friday annual plans).
// Update this object, and the source note at the bottom, when prices change.
const PRICING = {
  checkedOn: 'November 26, 2026',
  // Sale windows as printed on the vendor pages. Update the plans when a window closes.
  higgsfieldSaleEnds: 'November 27, 2026, 00:00 UTC',
  elevenlabsSaleEnds: 'December 1, 2026, 11:59pm ET',
  higgsfield: {
    plans: [
      { id: 'plus', name: 'Plus', monthlyUsd: 30, creditsPerMonth: 1200 },
      { id: 'ultra-3k', name: 'Ultra 3K', monthlyUsd: 45, creditsPerMonth: 3000 },
    ],
    imageCredits: 2, // Nano Banana Pro, per image
    videoModels: [
      { id: 'seedance-720', name: 'Seedance 2.5 720p', creditsPerClip: 35 },
      { id: 'seedance-1080', name: 'Seedance 2.5 1080p', creditsPerClip: 80 },
      { id: 'kling-1080', name: 'Kling 4.0 1080p', creditsPerClip: 18.75 },
    ],
  },
  elevenlabs: {
    plans: [
      { id: 'creator', name: 'Creator', firstYearUsd: 99, renewalUsd: 220, creditsPerMonth: 121000 },
      { id: 'pro', name: 'Pro', firstYearUsd: 445.5, renewalUsd: 990, creditsPerMonth: 600000 },
    ],
    narrationCreditsPerMinute: 1000, // ~1,000 characters per minute at 1 credit per character
    musicCreditsPerMinute: 900,
  },
} as const

type HiggsfieldPlanId = (typeof PRICING.higgsfield.plans)[number]['id']
type VideoModelId = (typeof PRICING.higgsfield.videoModels)[number]['id']
type ElevenLabsPlanId = (typeof PRICING.elevenlabs.plans)[number]['id']

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const usdNoCents = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
// Plan prices: "$30" for whole dollars, "$445.50" otherwise.
const usdWhole = { format: (n: number) => (Number.isInteger(n) ? usdNoCents.format(n) : usd.format(n)) }
const credits = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
const whole = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const percent = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 })

const MAX_COUNT = 100000

function toCount(raw: string): number {
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(Math.floor(n), MAX_COUNT)
}

interface Coverage {
  needed: number
  included: number
  over: number
  spare: number
  usedShare: number
  fitsPlanName: string | null
}

function coverage(
  needed: number,
  included: number,
  plans: ReadonlyArray<{ name: string; creditsPerMonth: number }>
): Coverage {
  const over = Math.max(0, needed - included)
  const fits = over > 0 ? plans.find((p) => p.creditsPerMonth >= needed) : undefined
  return {
    needed,
    included,
    over,
    spare: Math.max(0, included - needed),
    usedShare: included > 0 ? needed / included : 0,
    fitsPlanName: fits ? fits.name : null,
  }
}

// ── Shared styling, matched to the guide workbenches ──────────────────────
const groupLabel = 'block text-[11px] font-semibold uppercase tracking-wider text-white/50'
const optionBase =
  'flex min-h-[44px] cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-2 text-xs transition-colors motion-reduce:transition-none peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0d1117]'
const optionOn = 'border-emerald-500/60 bg-emerald-500/15 font-semibold text-white'
const optionOff = 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white'
const numberInput =
  'mt-1.5 block w-full min-h-[44px] rounded-xl border border-white/10 bg-[#090d13] px-3 py-2 font-mono text-sm tabular-nums text-white placeholder:text-white/30 focus-visible:border-emerald-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400'

interface RadioOption<T extends string> {
  id: T
  label: string
  detail: string
}

function RadioGroup<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
  columns,
}: {
  legend: string
  name: string
  value: T
  options: ReadonlyArray<RadioOption<T>>
  onChange: (next: T) => void
  columns: string
}) {
  return (
    <fieldset>
      <legend className={`${groupLabel} mb-2`}>{legend}</legend>
      <div className={`grid gap-2 ${columns}`}>
        {options.map((opt) => {
          const checked = opt.id === value
          return (
            <label key={opt.id} className="relative block">
              <input
                type="radio"
                name={name}
                value={opt.id}
                checked={checked}
                onChange={() => onChange(opt.id)}
                className="peer sr-only"
              />
              <span className={`${optionBase} ${checked ? optionOn : optionOff}`}>
                <span>{opt.label}</span>
                <span className={`text-right font-mono text-[11px] font-normal tabular-nums ${checked ? 'text-emerald-300' : 'text-white/50'}`}>
                  {opt.detail}
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function CountField({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string
  label: string
  hint: string
  value: string
  onChange: (next: string) => void
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-white/80">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        max={MAX_COUNT}
        step={1}
        name={id}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onChange(String(toCount(e.target.value)))}
        aria-describedby={`${id}-hint`}
        className={numberInput}
      />
      <p id={`${id}-hint`} className="mt-1 text-[11px] leading-snug text-white/50">
        {hint}
      </p>
    </div>
  )
}

function CoverageStatus({ c }: { c: Coverage }) {
  if (c.over > 0) {
    return (
      <div className="flex min-h-[4rem] md:min-h-[3.25rem] items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/[0.06] p-2.5 text-[11px] leading-snug text-amber-200">
        <AlertTriangle className="mt-px h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
        <span>
          <strong className="font-semibold text-amber-300">Over by {credits.format(c.over)} credits a month.</strong>{' '}
          {c.fitsPlanName ? `${c.fitsPlanName} covers this volume.` : 'No plan here covers it; budget for extra credits.'}
        </span>
      </div>
    )
  }
  return (
    <div className="flex min-h-[4rem] md:min-h-[3.25rem] items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] p-2.5 text-[11px] leading-snug text-emerald-100/90">
      <Check className="mt-px h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
      <span>
        <strong className="font-semibold text-emerald-300">Covered.</strong> {credits.format(c.spare)} credits spare, {percent.format(c.usedShare)} of
        the plan used.
      </span>
    </div>
  )
}

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-white/5 py-2 first:border-t-0">
      <dt className="text-[11px] leading-snug text-white/60">
        {label}
        {sub ? <span className="block text-[11px] text-white/55">{sub}</span> : null}
      </dt>
      <dd className="shrink-0 font-mono text-xs font-semibold tabular-nums text-white">{value}</dd>
    </div>
  )
}

function CreditBar({ c }: { c: Coverage }) {
  const fill = Math.min(1, c.usedShare)
  return (
    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]" aria-hidden="true">
      <div
        className={`h-full rounded-full ${c.over > 0 ? 'bg-amber-400' : 'bg-emerald-400'}`}
        style={{ width: `${fill * 100}%` }}
      />
    </div>
  )
}

export default function CreatorStackCostCalculator() {
  const uid = useId()
  const [hfPlanId, setHfPlanId] = useState<HiggsfieldPlanId>('plus')
  const [videoModelId, setVideoModelId] = useState<VideoModelId>('seedance-720')
  const [images, setImages] = useState('30')
  const [clips, setClips] = useState('6')
  const [keepRate, setKeepRate] = useState(25)
  const [elPlanId, setElPlanId] = useState<ElevenLabsPlanId>('creator')
  const [narration, setNarration] = useState('30')
  const [music, setMusic] = useState('10')

  const hf = PRICING.higgsfield
  const el = PRICING.elevenlabs
  const hfPlan = hf.plans.find((p) => p.id === hfPlanId) ?? hf.plans[0]
  const videoModel = hf.videoModels.find((m) => m.id === videoModelId) ?? hf.videoModels[0]
  const elPlan = el.plans.find((p) => p.id === elPlanId) ?? el.plans[0]

  // Higgsfield: inputs are kept assets; generations include the ones you throw away.
  const rate = keepRate / 100
  const keptImages = toCount(images)
  const keptClips = toCount(clips)
  // Integer math: 21 / 0.35 gives 60.00000000000001 in floating point and would round up to 61.
  const imageGenerations = Math.ceil((keptImages * 100) / keepRate)
  const clipGenerations = Math.ceil((keptClips * 100) / keepRate)
  const hfNeeded = imageGenerations * hf.imageCredits + clipGenerations * videoModel.creditsPerClip
  const hfCoverage = coverage(hfNeeded, hfPlan.creditsPerMonth, hf.plans)
  const hfFirstYear = hfPlan.monthlyUsd * 12
  const hfUsdPerCredit = hfPlan.monthlyUsd / hfPlan.creditsPerMonth
  const imagePerGen = hfUsdPerCredit * hf.imageCredits
  const clipPerGen = hfUsdPerCredit * videoModel.creditsPerClip

  // ElevenLabs: minutes generated, retakes included.
  const narrationMinutes = toCount(narration)
  const musicMinutes = toCount(music)
  const elNeeded = narrationMinutes * el.narrationCreditsPerMinute + musicMinutes * el.musicCreditsPerMinute
  const elCoverage = coverage(elNeeded, elPlan.creditsPerMonth, el.plans)
  const elUsdPerCredit = elPlan.firstYearUsd / (elPlan.creditsPerMonth * 12)
  const narrationPerMinute = elUsdPerCredit * el.narrationCreditsPerMinute
  const musicPerMinute = elUsdPerCredit * el.musicCreditsPerMinute

  const combinedFirstYear = hfFirstYear + elPlan.firstYearUsd
  const renewalIncrease = elPlan.renewalUsd - elPlan.firstYearUsd
  const anyOver = hfCoverage.over > 0 || elCoverage.over > 0

  const summary = `First year ${usdWhole.format(combinedFirstYear)}. Higgsfield ${hfPlan.name}: ${credits.format(hfNeeded)} of ${credits.format(
    hfPlan.creditsPerMonth
  )} credits a month${hfCoverage.over > 0 ? `, over by ${credits.format(hfCoverage.over)}` : ''}. ElevenLabs ${elPlan.name}: ${credits.format(
    elNeeded
  )} of ${credits.format(elPlan.creditsPerMonth)} credits a month${elCoverage.over > 0 ? `, over by ${credits.format(elCoverage.over)}` : ''}.`

  // Announce the summary once input settles, not on every keystroke or slider step.
  const [announced, setAnnounced] = useState(summary)
  useEffect(() => {
    const t = window.setTimeout(() => setAnnounced(summary), 600)
    return () => window.clearTimeout(t)
  }, [summary])

  return (
    <section
      aria-labelledby={`${uid}-title`}
      className="my-10 rounded-2xl border border-white/10 bg-[#0d1117] p-5 text-white shadow-2xl sm:p-6"
    >
      <div className="border-b border-white/10 pb-5">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
          <Calculator className="h-3.5 w-3.5" aria-hidden="true" /> Cost calculator
        </span>
        <h3 id={`${uid}-title`} className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          What your monthly output costs on the annual plans
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-white/70 sm:text-sm">
          Enter what you publish in a month. The calculator counts the generations you throw away, compares the credits with what
          each plan includes, and prices every kept asset.
        </p>
      </div>

      {/* ── Inputs ─────────────────────────────────────────────────── */}
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="text-sm font-bold text-white">Higgsfield</p>
          <RadioGroup
            legend="Plan, billed yearly"
            name={`${uid}-hf-plan`}
            value={hfPlanId}
            onChange={setHfPlanId}
            columns="grid-cols-1"
            options={hf.plans.map((p) => ({
              id: p.id,
              label: p.name,
              detail: `${usdWhole.format(p.monthlyUsd)}/mo · ${credits.format(p.creditsPerMonth)} cr`,
            }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <CountField
              id={`${uid}-images`}
              label="Kept images a month"
              hint={`Nano Banana Pro, ${hf.imageCredits} credits each`}
              value={images}
              onChange={setImages}
            />
            <CountField
              id={`${uid}-clips`}
              label="Kept 5-second clips"
              hint="Per month, model below"
              value={clips}
              onChange={setClips}
            />
          </div>
          <RadioGroup
            legend="Video model"
            name={`${uid}-video-model`}
            value={videoModelId}
            onChange={setVideoModelId}
            columns="grid-cols-1"
            options={hf.videoModels.map((m) => ({
              id: m.id,
              label: m.name,
              detail: `${credits.format(m.creditsPerClip)} cr / clip`,
            }))}
          />
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor={`${uid}-keep`} className="block text-xs font-medium text-white/80">
                Keep rate
              </label>
              <output htmlFor={`${uid}-keep`} className="font-mono text-sm font-semibold tabular-nums text-emerald-300">
                {percent.format(keepRate / 100)}
              </output>
            </div>
            <input
              id={`${uid}-keep`}
              type="range"
              min={5}
              max={100}
              step={5}
              value={keepRate}
              onChange={(e) => setKeepRate(Number(e.target.value))}
              aria-describedby={`${uid}-keep-hint`}
              aria-valuetext={`${keepRate} percent`}
              className="mt-2 block h-6 w-full cursor-pointer accent-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-full"
            />
            <p id={`${uid}-keep-hint`} className="mt-1 text-[11px] leading-snug text-white/50">
              Share of image and video generations you actually use. 25% means one in four.
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="text-sm font-bold text-white">ElevenLabs</p>
          <RadioGroup
            legend="Plan, annual"
            name={`${uid}-el-plan`}
            value={elPlanId}
            onChange={setElPlanId}
            columns="grid-cols-1"
            options={el.plans.map((p) => ({
              id: p.id,
              label: p.name,
              detail: `${usdWhole.format(p.firstYearUsd)}\u00a0first\u00a0year · ${credits.format(p.creditsPerMonth)}\u00a0cr/mo`,
            }))}
          />
          <CountField
            id={`${uid}-narration`}
            label="Narration minutes a month"
            hint={`Include retakes. About ${credits.format(el.narrationCreditsPerMinute)} characters a minute at 1 credit per character.`}
            value={narration}
            onChange={setNarration}
          />
          <CountField
            id={`${uid}-music`}
            label="Music minutes a month"
            hint={`About ${credits.format(el.musicCreditsPerMinute)} credits a minute.`}
            value={music}
            onChange={setMusic}
          />
        </div>
      </div>

      {/* ── Results ────────────────────────────────────────────────── */}
      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4" role="region" aria-labelledby={`${uid}-results`}>
        <p id={`${uid}-results`} className={groupLabel}>
          Results
        </p>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announced}
        </p>

        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-white/5 bg-[#090d13] p-3">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold text-white">Higgsfield {hfPlan.name}</p>
              <p className="font-mono text-[11px] tabular-nums text-white/60">
                <span className={hfCoverage.over > 0 ? 'text-amber-300' : 'text-white'}>{credits.format(hfNeeded)}</span> /{' '}
                {credits.format(hfPlan.creditsPerMonth)} cr
              </p>
            </div>
            <CreditBar c={hfCoverage} />
            <div className="mt-3">
              <CoverageStatus c={hfCoverage} />
            </div>
            <dl className="mt-2">
              <Row
                label="Generations a month"
                sub={`${whole.format(imageGenerations)} images, ${whole.format(clipGenerations)} clips`}
                value={whole.format(imageGenerations + clipGenerations)}
              />
              <Row label="Per image generated" value={usd.format(imagePerGen)} />
              <Row label="Per kept image" value={usd.format(imagePerGen / rate)} />
              <Row label="Per clip generated" sub={videoModel.name} value={usd.format(clipPerGen)} />
              <Row label="Per kept clip" value={usd.format(clipPerGen / rate)} />
            </dl>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#090d13] p-3">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold text-white">ElevenLabs {elPlan.name}</p>
              <p className="font-mono text-[11px] tabular-nums text-white/60">
                <span className={elCoverage.over > 0 ? 'text-amber-300' : 'text-white'}>{credits.format(elNeeded)}</span> /{' '}
                {credits.format(elPlan.creditsPerMonth)} cr
              </p>
            </div>
            <CreditBar c={elCoverage} />
            <div className="mt-3">
              <CoverageStatus c={elCoverage} />
            </div>
            <dl className="mt-2">
              <Row label="Per narration minute" value={usd.format(narrationPerMinute)} />
              <Row label="Per music minute" value={usd.format(musicPerMinute)} />
              <Row label="Narration and music a month" value={usd.format(elNeeded * elUsdPerCredit)} />
            </dl>
          </div>
        </div>

        <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Combined first year</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-white">{usdWhole.format(combinedFirstYear)}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-white/50">
              {usdWhole.format(hfFirstYear)} Higgsfield {hfPlan.name} + {usdWhole.format(elPlan.firstYearUsd)} ElevenLabs {elPlan.name}
              {anyOver ? ', before any extra credits' : ''}
            </p>
          </div>
          <p className="text-[11px] leading-snug text-white/60 sm:max-w-[16rem] sm:text-right">
            Year two: ElevenLabs {elPlan.name} renews at {usdWhole.format(elPlan.renewalUsd)} a year, {usdWhole.format(renewalIncrease)} more
            than the first.
          </p>
        </div>
        <p className="mt-3 text-[11px] leading-snug text-white/55">
          Per-generation costs use each plan’s included credits. Credits beyond the plan cost extra and are not priced here.
        </p>
      </div>

      <p className="mt-4 text-[11px] leading-snug text-white/50">
        Source: higgsfield.ai/pricing and elevenlabs.io/pricing, read {PRICING.checkedOn}. Annual Black Friday prices, valid until{' '}
        {PRICING.higgsfieldSaleEnds} (Higgsfield) and {PRICING.elevenlabsSaleEnds} (ElevenLabs); credit costs per model as published by
        each vendor. Starter is left out because it does not include Seedance 2.5.
      </p>
    </section>
  )
}
