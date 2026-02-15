'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Package,
  Zap,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Train,
  Triangle,
  Workflow,
} from 'lucide-react'
import type { Affiliate } from '@/types/affiliates'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Template {
  id: string
  slug: string
  name: string
  category: string
  price: number
  originalPrice?: number
  tier: string
  description: string
  features: string[]
  techStack: string[]
  lemonSqueezy: { productId: string; variantId: string }
  downloads: number
  rating: number
  featured: boolean
  tags: string[]
}

interface Stats {
  totalTemplates: number
  activeTemplates: number
  totalRevenuePotential: number
  avgPrice: number
  blueprintCount: number
  categoryBreakdown: Record<string, number>
  tierBreakdown: Record<string, number>
}

interface RevenueClientProps {
  templates: Template[]
  affiliates: Affiliate[]
  deployPlatforms: Affiliate[]
  stats: Stats
}

// ── Platform Icons ────────────────────────────────────────────────────────────

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  railway: Train,
  vercel: Triangle,
  n8n: Workflow,
}

// ── Component ─────────────────────────────────────────────────────────────────

export function RevenueClient({
  templates,
  affiliates,
  deployPlatforms,
  stats,
}: RevenueClientProps) {
  const [tab, setTab] = useState<'overview' | 'templates' | 'affiliates' | 'projections'>('overview')

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-white/40 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">Revenue Dashboard</h1>
                <p className="text-sm text-white/40">
                  Template sales + affiliate commissions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {(['overview', 'templates', 'affiliates', 'projections'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    tab === t
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {tab === 'overview' && (
          <OverviewTab stats={stats} deployPlatforms={deployPlatforms} templates={templates} />
        )}
        {tab === 'templates' && <TemplatesTab templates={templates} />}
        {tab === 'affiliates' && <AffiliatesTab affiliates={affiliates} />}
        {tab === 'projections' && <ProjectionsTab stats={stats} />}
      </main>
    </div>
  )
}

// ── Overview Tab ──────────────────────────────────────────────────────────────

function OverviewTab({
  stats,
  deployPlatforms,
  templates,
}: {
  stats: Stats
  deployPlatforms: Affiliate[]
  templates: Template[]
}) {
  const statCards = [
    {
      label: 'Total Templates',
      value: stats.totalTemplates,
      icon: Package,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
    {
      label: 'Active (Checkout Live)',
      value: stats.activeTemplates,
      icon: stats.activeTemplates > 0 ? CheckCircle2 : AlertCircle,
      color: stats.activeTemplates > 0 ? 'text-emerald-400' : 'text-amber-400',
      bg: stats.activeTemplates > 0 ? 'bg-emerald-500/10' : 'bg-amber-500/10',
    },
    {
      label: 'Avg Price',
      value: `$${stats.avgPrice}`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Deploy Platforms',
      value: deployPlatforms.length,
      icon: Zap,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Blueprints w/ Deploy',
      value: stats.blueprintCount,
      icon: TrendingUp,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
          >
            <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-xs text-white/40">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Category + Tier Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <h3 className="mb-4 font-semibold">By Category</h3>
          <div className="space-y-3">
            {Object.entries(stats.categoryBreakdown).map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm text-white/60">{cat}</span>
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 rounded-full bg-cyan-500/40"
                    style={{ width: `${(count / stats.totalTemplates) * 120}px` }}
                  />
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <h3 className="mb-4 font-semibold">By Tier</h3>
          <div className="space-y-3">
            {Object.entries(stats.tierBreakdown).map(([tier, count]) => {
              const tierColors: Record<string, string> = {
                starter: 'bg-emerald-500/40',
                professional: 'bg-amber-500/40',
                enterprise: 'bg-purple-500/40',
              }
              return (
                <div key={tier} className="flex items-center justify-between">
                  <span className="text-sm capitalize text-white/60">{tier}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 rounded-full ${tierColors[tier] || 'bg-white/20'}`}
                      style={{ width: `${(count / stats.totalTemplates) * 120}px` }}
                    />
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Setup Checklist */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
        <h3 className="mb-4 font-semibold">Setup Checklist</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            {
              task: 'Lemon Squeezy store created',
              done: false,
              action: 'Create at lemonsqueezy.com',
            },
            {
              task: 'Template products with variant IDs',
              done: templates.some((t) => t.lemonSqueezy?.variantId),
              action: 'Add products to Lemon Squeezy',
            },
            {
              task: 'Railway affiliate signed up',
              done: false,
              action: 'Apply at railway.com/affiliate',
            },
            {
              task: 'n8n affiliate signed up',
              done: false,
              action: 'Apply via PartnerStack',
            },
            {
              task: 'Vercel affiliate signed up',
              done: false,
              action: 'Apply via Dub.co',
            },
            {
              task: 'Better Stack affiliate signed up',
              done: false,
              action: 'Apply at betterstack.com/affiliate',
            },
            {
              task: 'GA4 deploy_click events configured',
              done: true,
              action: 'Code deployed',
            },
            {
              task: 'Webhook handler active',
              done: true,
              action: '/api/webhooks/lemon-squeezy',
            },
            {
              task: 'GitHub template repos created',
              done: false,
              action: 'Create per blueprint',
            },
            {
              task: 'Deploy buttons on blueprints',
              done: true,
              action: 'DeployButtonGroup active',
            },
          ].map((item) => (
            <div
              key={item.task}
              className={`flex items-start gap-3 rounded-lg border p-3 ${
                item.done
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : 'border-white/[0.06] bg-white/[0.02]'
              }`}
            >
              {item.done ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              ) : (
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              )}
              <div>
                <p className="text-sm font-medium">{item.task}</p>
                <p className="text-xs text-white/40">{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Templates Tab ─────────────────────────────────────────────────────────────

function TemplatesTab({ templates }: { templates: Template[] }) {
  const sorted = [...templates].sort((a, b) => b.price - a.price)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">All Templates</h2>
        <p className="text-sm text-white/40">{templates.length} products</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.03]">
              <th className="px-4 py-3 text-left font-medium text-white/60">Template</th>
              <th className="px-4 py-3 text-left font-medium text-white/60">Category</th>
              <th className="px-4 py-3 text-left font-medium text-white/60">Tier</th>
              <th className="px-4 py-3 text-right font-medium text-white/60">Price</th>
              <th className="px-4 py-3 text-center font-medium text-white/60">Checkout</th>
              <th className="px-4 py-3 text-right font-medium text-white/60">Downloads</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t) => (
              <tr
                key={t.id}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-white/30">{t.slug}</div>
                </td>
                <td className="px-4 py-3 text-white/50">{t.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      t.tier === 'enterprise'
                        ? 'bg-purple-500/20 text-purple-300'
                        : t.tier === 'professional'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {t.tier}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono">${t.price}</td>
                <td className="px-4 py-3 text-center">
                  {t.lemonSqueezy?.variantId ? (
                    <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="mx-auto h-4 w-4 text-amber-400" />
                  )}
                </td>
                <td className="px-4 py-3 text-right font-mono text-white/50">
                  {t.downloads}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Affiliates Tab ────────────────────────────────────────────────────────────

function AffiliatesTab({ affiliates }: { affiliates: Affiliate[] }) {
  const byCategory = affiliates.reduce(
    (acc, a) => {
      const cat = a.category || 'Other'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(a)
      return acc
    },
    {} as Record<string, Affiliate[]>
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Affiliate Partners</h2>
        <p className="text-sm text-white/40">{affiliates.length} partners</p>
      </div>

      {Object.entries(byCategory).map(([category, partners]) => (
        <div key={category}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">
            {category}
          </h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((a) => {
              const PlatformIcon = platformIcons[a.name.toLowerCase()]
              return (
                <div
                  key={a.name}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    {PlatformIcon && <PlatformIcon className="h-4 w-4 text-white/50" />}
                    <span className="font-medium">{a.name}</span>
                    {a.oracleCompatible && (
                      <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                        Oracle Safe
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-xs text-white/40">
                    <p>
                      Commission:{' '}
                      <span className="text-white/70">{a.commission}</span>
                    </p>
                    {a.url && (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
                      >
                        Apply <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Projections Tab ───────────────────────────────────────────────────────────

function ProjectionsTab({ stats }: { stats: Stats }) {
  const scenarios = [
    {
      label: 'Conservative',
      visitors: 5000,
      conversionRate: 0.005,
      deployClickRate: 0.02,
      affiliateConversion: 0.15,
      avgCommission: 8,
    },
    {
      label: 'Moderate',
      visitors: 10000,
      conversionRate: 0.01,
      deployClickRate: 0.03,
      affiliateConversion: 0.20,
      avgCommission: 10,
    },
    {
      label: 'Optimized',
      visitors: 25000,
      conversionRate: 0.015,
      deployClickRate: 0.04,
      affiliateConversion: 0.25,
      avgCommission: 12,
    },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-bold">Revenue Projections (Monthly)</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {scenarios.map((s) => {
          const templateSales = Math.round(
            s.visitors * s.conversionRate * stats.avgPrice
          )
          const deployClicks = Math.round(s.visitors * s.deployClickRate)
          const affiliateRevenue = Math.round(
            deployClicks * s.affiliateConversion * s.avgCommission
          )
          const total = templateSales + affiliateRevenue

          return (
            <div
              key={s.label}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6"
            >
              <h3 className="mb-1 text-lg font-bold">{s.label}</h3>
              <p className="mb-4 text-xs text-white/40">
                {s.visitors.toLocaleString()} visitors/mo
              </p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Template Sales</span>
                  <span className="font-mono text-emerald-400">
                    ${templateSales.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Affiliate Commissions</span>
                  <span className="font-mono text-purple-400">
                    ${affiliateRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-white/[0.08] pt-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Total</span>
                    <span className="text-cyan-400">
                      ${total.toLocaleString()}/mo
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-white/30">
                    ${(total * 12).toLocaleString()}/yr
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-1 text-[11px] text-white/30">
                <p>
                  CVR: {(s.conversionRate * 100).toFixed(1)}% | Deploy CTR:{' '}
                  {(s.deployClickRate * 100).toFixed(0)}%
                </p>
                <p>
                  Affiliate conv: {(s.affiliateConversion * 100).toFixed(0)}% |
                  Avg commission: ${s.avgCommission}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
        <h3 className="mb-3 font-semibold">Revenue Drivers</h3>
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-white/60">Increase Template Sales</h4>
            <ul className="space-y-1 text-white/40">
              <li>- Blog posts targeting &quot;deploy [X] on Railway&quot; keywords</li>
              <li>- Email sequences for blueprint visitors</li>
              <li>- Case studies showing template ROI</li>
              <li>- Video walkthroughs on YouTube</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-white/60">Increase Affiliate Revenue</h4>
            <ul className="space-y-1 text-white/40">
              <li>- Optimize deploy button placement and copy</li>
              <li>- A/B test button colors and CTA text</li>
              <li>- Add deploy buttons to blog posts</li>
              <li>- Create comparison guides (Railway vs Render)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
