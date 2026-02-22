'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  Package,
  DollarSign,
  BarChart3,
  Bot,
  Workflow,
  Network,
  Wrench,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Pencil,
  ArrowUpRight,
  Layers,
  Users,
  ChevronDown,
  Github,
  CreditCard,
} from 'lucide-react'

import { getInvestorProducts, type InvestorProduct, INVESTOR_CATEGORIES, COMPLEXITY_META } from '@/lib/investor'

const STATUS_CONFIG = {
  live: { label: 'Live', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 },
  listed: { label: 'Listed', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', icon: CheckCircle2 },
  building: { label: 'Building', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: Clock },
  draft: { label: 'Draft', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30', icon: AlertCircle },
} as const

type ProductStatus = keyof typeof STATUS_CONFIG

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  agents: Bot,
  workflows: Workflow,
  architectures: Network,
  tools: Wrench,
}

// Product status overlay — in practice this would come from a data source
function getProductStatus(product: InvestorProduct): ProductStatus {
  // Products with real cta.href links are "listed", otherwise "draft"
  if (product.cta.href !== '#') return 'listed'
  if (product.id === 'inv-starter-kit') return 'building'
  return 'draft'
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  color,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  trend?: string
  color: string
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-emerald-400">{trend}</span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  )
}

export default function InvestorDashboardPage() {
  const products = getInvestorProducts()
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = products.filter((p) => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return false
    if (filterStatus !== 'all' && getProductStatus(p) !== filterStatus) return false
    return true
  })

  const totalRevenuePotential = products.reduce((sum, p) => sum + p.price, 0)
  const liveCount = products.filter((p) => getProductStatus(p) === 'live').length
  const draftCount = products.filter((p) => getProductStatus(p) === 'draft').length
  const categoryBreakdown = Object.entries(INVESTOR_CATEGORIES).map(([key, meta]) => ({
    key,
    name: meta.name,
    count: products.filter((p) => p.category === key).length,
  }))

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <section className="border-b border-white/[0.06] pb-6 pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Admin Dashboard
              </p>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Investor Intelligence
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Product inventory, status tracking, and revenue management
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://github.com/frankxai/investor-intelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
              >
                <Github className="h-4 w-4" />
                Product Repo
                <ExternalLink className="h-3 w-3" />
              </a>
              <Link
                href="/investor"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500/15 px-4 py-2 text-sm font-medium text-amber-400 transition-all hover:bg-amber-500/25"
              >
                <TrendingUp className="h-4 w-4" />
                View Storefront
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Products"
              value={products.length.toString()}
              icon={Package}
              color="bg-white/[0.06] text-white"
            />
            <StatCard
              label="Revenue Potential (all products)"
              value={`$${totalRevenuePotential.toLocaleString()}`}
              icon={DollarSign}
              color="bg-emerald-500/15 text-emerald-400"
            />
            <StatCard
              label="Live Products"
              value={liveCount.toString()}
              icon={CheckCircle2}
              trend={`${draftCount} in draft`}
              color="bg-cyan-500/15 text-cyan-400"
            />
            <StatCard
              label="Categories"
              value={Object.keys(INVESTOR_CATEGORIES).length.toString()}
              icon={Layers}
              color="bg-violet-500/15 text-violet-400"
            />
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="py-4">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categoryBreakdown.map(({ key, name, count }) => {
              const Icon = CATEGORY_ICONS[key] || Package
              return (
                <button
                  key={key}
                  onClick={() => setFilterCategory(filterCategory === key ? 'all' : key)}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                    filterCategory === key
                      ? 'border-amber-500/40 bg-amber-500/10'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
                  }`}
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{name}</p>
                  </div>
                  <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-xs font-bold text-slate-300">
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Status:</span>
            {['all', 'live', 'listed', 'building', 'draft'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-white/15 text-white'
                    : 'bg-white/[0.04] text-slate-400 hover:bg-white/10'
                }`}
              >
                {status === 'all' ? 'All' : STATUS_CONFIG[status as ProductStatus].label}
              </button>
            ))}
            <span className="ml-auto text-xs text-slate-500">
              {filtered.length} of {products.length} products
            </span>
          </div>
        </div>
      </section>

      {/* Product Table */}
      <section className="py-4">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Track</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Complexity</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => {
                  const status = getProductStatus(product)
                  const statusConfig = STATUS_CONFIG[status]
                  const StatusIcon = statusConfig.icon
                  const CategoryIcon = CATEGORY_ICONS[product.category] || Package
                  const complexity = COMPLEXITY_META[product.complexity]

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                    >
                      {/* Product name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
                            <CategoryIcon className="h-4 w-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{product.title}</p>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{product.subtitle}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-400 capitalize">{product.category}</span>
                      </td>

                      {/* Track */}
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            product.track === 'institutional'
                              ? 'bg-cyan-500/15 text-cyan-400'
                              : product.track === 'individual'
                                ? 'bg-violet-500/15 text-violet-400'
                                : 'bg-amber-500/15 text-amber-400'
                          }`}
                        >
                          {product.track}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3">
                        <span className={`text-sm font-bold ${product.price === 0 ? 'text-emerald-400' : 'text-white'}`}>
                          {product.priceLabel}
                        </span>
                      </td>

                      {/* Complexity */}
                      <td className="px-4 py-3">
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${complexity.color}`}>
                          {complexity.name}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusConfig.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            className="rounded p-1.5 text-slate-500 transition-colors hover:bg-white/10 hover:text-white"
                            title="Edit product"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <a
                            href={`/investor/${product.category}`}
                            className="rounded p-1.5 text-slate-500 transition-colors hover:bg-white/10 hover:text-white"
                            title="View on storefront"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Delivery & Tooling */}
      <section className="border-t border-white/[0.06] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-6 text-lg font-bold text-white">Delivery & Tooling</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
              <Github className="mb-3 h-6 w-6 text-white" />
              <h3 className="mb-1 text-sm font-bold text-white">Git-Based Products</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                All product source code in{' '}
                <a
                  href="https://github.com/frankxai/investor-intelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  frankxai/investor-intelligence
                </a>
                . Versioned with semantic versioning, delivered via GitHub Releases.
              </p>
              <span className="mt-3 inline-block rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                Active
              </span>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
              <CreditCard className="mb-3 h-6 w-6 text-slate-400" />
              <h3 className="mb-1 text-sm font-bold text-white">Stripe Payments</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Direct checkout on frankx.ai. Stripe Checkout sessions, webhook fulfillment,
                and revenue tracking. Connecting Stripe MCP next.
              </p>
              <span className="mt-3 inline-block rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                Coming Soon
              </span>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
              <Users className="mb-3 h-6 w-6 text-slate-400" />
              <h3 className="mb-1 text-sm font-bold text-white">Customer Access</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                After purchase: grant access to private repo, send download links via Resend,
                or provide license keys for premium tiers.
              </p>
              <span className="mt-3 inline-block rounded-full bg-slate-500/15 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                Planned
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Roadmap */}
      <section className="border-t border-white/[0.06] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-6 text-lg font-bold text-white">Launch Roadmap</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                batch: 'Batch 1 — Launch',
                status: 'In Progress',
                statusColor: 'text-amber-400',
                products: ['Investor Starter Kit (Free)', 'IACOS v1.0 ($297+)', 'Market Research Prompts ($47)', 'Deal Flow CRM ($27)'],
              },
              {
                batch: 'Batch 2 — Agents',
                status: 'Next Sprint',
                statusColor: 'text-slate-400',
                products: ['DD Agent Pack ($197)', 'n8n Deal Sourcing ($37)', 'Stock Research Agent ($97)'],
              },
              {
                batch: 'Batch 3 — Systems',
                status: 'Planned',
                statusColor: 'text-slate-500',
                products: ['LP Reporting ($297)', 'Competitive Intel ($97)', 'Intelligence Platform ($497)'],
              },
              {
                batch: 'Batch 4 — Scale',
                status: 'After Validation',
                statusColor: 'text-slate-600',
                products: ['Remaining products', 'Bundle pricing', 'Consulting tier'],
              },
            ].map((batch) => (
              <div key={batch.batch} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                <p className="mb-1 text-sm font-bold text-white">{batch.batch}</p>
                <p className={`mb-3 text-[10px] font-semibold uppercase tracking-wider ${batch.statusColor}`}>
                  {batch.status}
                </p>
                <ul className="space-y-1.5">
                  {batch.products.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="h-1 w-1 rounded-full bg-slate-600" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
