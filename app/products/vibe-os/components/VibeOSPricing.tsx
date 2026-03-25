import Link from 'next/link'
import { Check, X, Minus } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Experience the Music Producer agent with daily limits',
    features: [
      '10 Music Producer prompts/day',
      '5 Creation Engine prompts/day',
      'Gemini Flash LLM',
      '7-day session history',
      'Community access',
    ],
    cta: 'Start Free',
    href: '/products/vibe-os/app',
    borderClass: 'border-white/10',
    highlighted: false,
  },
  {
    name: 'Vibe Club',
    price: '$19',
    period: '/mo',
    description: 'Unlimited agents, all 9 LLMs, monthly Vibe Pack',
    features: [
      'Unlimited Music Producer & Creation Engine',
      'Frequency Alchemist agent access',
      'All 9 LLM models across 5 providers',
      'Monthly Vibe Pack (20 curated prompts)',
      '30-day session history',
      'Arcanea Cloud preview access',
    ],
    cta: 'Join Vibe Club',
    href: '/products/vibe-os#pricing',
    borderClass: 'border-cyan-500/50',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$97',
    period: '/mo',
    description: 'API access, custom agents, team seats',
    features: [
      'Everything in Vibe Club',
      'Starlight Architect agent',
      'REST API access (10K requests/mo)',
      '3 custom agents via Agent SDK',
      '5 team seats with shared library',
      'Monthly Pro Pack (50 prompts)',
      'Priority support + Slack',
    ],
    cta: 'Go Pro',
    href: '/products/vibe-os#pricing',
    borderClass: 'border-amber-500/30',
    highlighted: false,
  },
] as const

type CellValue = string | boolean | null

interface ComparisonRow {
  feature: string
  free: CellValue
  vibeClub: CellValue
  pro: CellValue
}

const comparisonRows: ComparisonRow[] = [
  { feature: 'Music Producer Agent', free: '10/day', vibeClub: 'Unlimited', pro: 'Unlimited' },
  { feature: 'Creation Engine Agent', free: '5/day', vibeClub: 'Unlimited', pro: 'Unlimited' },
  { feature: 'Frequency Alchemist', free: null, vibeClub: true, pro: true },
  { feature: 'Starlight Architect', free: null, vibeClub: null, pro: true },
  { feature: 'LLM Access', free: 'Gemini Flash', vibeClub: 'All 9 models', pro: 'All 9 + API' },
  { feature: 'Monthly Vibe Pack', free: null, vibeClub: '20 prompts', pro: '50 prompts' },
  { feature: 'Session History', free: '7 days', vibeClub: '30 days', pro: '90 days' },
  { feature: 'Custom Agents', free: null, vibeClub: null, pro: '3' },
  { feature: 'Team Seats', free: '1', vibeClub: '1', pro: '5' },
  { feature: 'API Access', free: null, vibeClub: null, pro: 'REST API' },
  { feature: 'Priority Support', free: null, vibeClub: 'Email (48h)', pro: 'Email (24h) + Slack' },
]

function CellContent({ value }: { value: CellValue }) {
  if (value === true) {
    return <Check className="mx-auto h-5 w-5 text-emerald-400" />
  }
  if (value === null || value === false) {
    return <Minus className="mx-auto h-4 w-4 text-white/20" />
  }
  return <span className="text-sm text-white/80">{value}</span>
}

export default function VibeOSPricing() {
  return (
    <section id="pricing" className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />

      {/* Decorative top line */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="glow-badge glow-badge-cyan mb-4 inline-flex">
            Pricing
          </span>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Start Free.{' '}
            <span className="text-gradient-tech">Scale When Ready.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            No credit card required for the free tier. Upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`spotlight-card relative flex flex-col p-8 ${tier.borderClass} ${
                tier.highlighted
                  ? 'shadow-[0_0_40px_rgba(6,182,212,0.15)]'
                  : ''
              }`}
            >
              {/* Most Popular Badge */}
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Tier Name */}
              <h3 className="text-lg font-semibold text-white">{tier.name}</h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className={`text-4xl font-bold ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'
                    : 'text-white'
                }`}>
                  {tier.price}
                </span>
                <span className="text-sm text-white/50">{tier.period}</span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {tier.description}
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-white/10" />

              {/* Features */}
              <ul className="flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.href}
                className={`mt-8 block rounded-xl px-6 py-3 text-center text-sm font-semibold transition-all ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40'
                    : 'border border-white/15 text-white hover:border-white/30 hover:bg-white/5'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Competitive Positioning */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/40">
            Vibe Club at $19/mo vs. Suno Pro $30/mo + ChatGPT Plus $20/mo — more value, less cost.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20">
          <h3 className="mb-8 text-center text-xl font-semibold text-white">
            Compare all features
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-sm font-medium text-white/50">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-white/50">
                    Free
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-cyan-400">
                    Vibe Club
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-amber-400">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 ${
                      index % 2 === 0 ? 'bg-white/[0.01]' : ''
                    }`}
                  >
                    <td className="px-6 py-3 text-sm text-white/70">
                      {row.feature}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <CellContent value={row.free} />
                    </td>
                    <td className="px-6 py-3 text-center">
                      <CellContent value={row.vibeClub} />
                    </td>
                    <td className="px-6 py-3 text-center">
                      <CellContent value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
