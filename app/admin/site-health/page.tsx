import { createMetadata } from '@/lib/seo'
import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import {
  Activity, AlertTriangle, CheckCircle, XCircle,
  Link2, FileText, Package, BarChart3, Globe,
  Music, Users, FlaskConical, Shield, Eye,
  ArrowUpRight, Layers, Search, Settings
} from 'lucide-react'

export const metadata = createMetadata({
  title: 'Site Health Dashboard | FrankX Admin',
  description: 'Site-wide integrity monitoring — links, products, blog quality, orphan pages.',
  path: '/admin/site-health',
})

// ─── Data Loaders ──────────────────────────────────────────────────────────

async function loadAuditData() {
  const auditDir = path.join(process.cwd(), 'data', 'audit')

  const load = async (file: string) => {
    try {
      const raw = await fs.readFile(path.join(auditDir, file), 'utf-8')
      return JSON.parse(raw)
    } catch {
      return null
    }
  }

  const [brokenLinks, blogQuality, productDelivery, orphanTriage, sitemapHealth, ctaFunnel] = await Promise.all([
    load('broken-links.json'),
    load('blog-quality.json'),
    load('product-delivery.json'),
    load('orphan-triage.json'),
    load('sitemap-health.json'),
    load('cta-funnel-audit.json'),
  ])

  return { brokenLinks, blogQuality, productDelivery, orphanTriage, sitemapHealth, ctaFunnel }
}

// ─── Score Badge ───────────────────────────────────────────────────────────

function ScoreBadge({ score, label }: { score: number; label: string }) {
  const color = score >= 90 ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
    : score >= 70 ? 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10'
    : score >= 50 ? 'text-amber-400 border-amber-400/30 bg-amber-400/10'
    : 'text-red-400 border-red-400/30 bg-red-400/10'

  return (
    <div className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border ${color}`}>
      <span className="text-2xl font-bold">{score}</span>
      <span className="text-xs opacity-70">{label}</span>
    </div>
  )
}

// ─── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, color = 'cyan' }: {
  icon: React.ReactNode; label: string; value: string | number; sub?: string; color?: string
}) {
  const colors: Record<string, string> = {
    cyan: 'border-cyan-400/20 bg-cyan-400/5',
    emerald: 'border-emerald-400/20 bg-emerald-400/5',
    amber: 'border-amber-400/20 bg-amber-400/5',
    red: 'border-red-400/20 bg-red-400/5',
    violet: 'border-violet-400/20 bg-violet-400/5',
  }

  return (
    <div className={`rounded-xl border p-4 ${colors[color] || colors.cyan}`}>
      <div className="flex items-center gap-2 mb-2 text-white/50">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-white/40 mt-1">{sub}</div>}
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default async function SiteHealthPage() {
  const { brokenLinks, blogQuality, productDelivery, orphanTriage, sitemapHealth, ctaFunnel } = await loadAuditData()

  // Calculate overall health score
  const linkScore = brokenLinks ? Math.round(((brokenLinks.summary?.healthy || 0) / (brokenLinks.totalLinksChecked || 1)) * 100) : 0
  const blogScore = blogQuality?.averageScore || 0
  const productScore = productDelivery ? Math.round(((productDelivery.summary?.healthy || 0) / (productDelivery.summary?.total || 1)) * 100) : 0
  const orphanCount = brokenLinks?.orphanPages?.length || 0
  const overallScore = Math.round((linkScore + blogScore + productScore) / 3)

  // Category breakdown
  const categories = sitemapHealth?.summary || {}

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Activity className="w-6 h-6 text-cyan-400" />
              Site Health Dashboard
            </h1>
            <p className="text-white/40 text-sm mt-1">
              Last audit: {brokenLinks?.timestamp ? new Date(brokenLinks.timestamp).toLocaleDateString() : 'Never'}
              {' '}&middot;{' '}302 pages monitored
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/map" className="px-3 py-1.5 text-xs rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors">
              Repo Map
            </Link>
          </div>
        </div>

        {/* Overall Scores */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ScoreBadge score={overallScore} label="Overall" />
          <ScoreBadge score={linkScore} label="Links" />
          <ScoreBadge score={blogScore} label="Blog" />
          <ScoreBadge score={productScore} label="Products" />
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon={<Globe className="w-4 h-4" />} label="Total Pages" value={sitemapHealth?.totalPages || 302} color="cyan" />
          <StatCard icon={<Link2 className="w-4 h-4" />} label="Broken Links" value={brokenLinks?.summary?.broken || 0} sub={`of ${brokenLinks?.totalLinksChecked || 0} checked`} color={brokenLinks?.summary?.broken > 0 ? 'red' : 'emerald'} />
          <StatCard icon={<Eye className="w-4 h-4" />} label="Orphan Pages" value={orphanCount} sub="no inbound links" color={orphanCount > 20 ? 'amber' : 'emerald'} />
          <StatCard icon={<BarChart3 className="w-4 h-4" />} label="CTAs Mapped" value={ctaFunnel?.totalCTAs || 0} sub={`${ctaFunnel?.summary?.working || 0} working`} color="cyan" />
        </div>

        {/* Links Section */}
        <Section title="Link Integrity" icon={<Link2 className="w-5 h-5 text-cyan-400" />}>
          {brokenLinks?.brokenLinks?.length > 0 ? (
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4">
              <h3 className="text-sm font-medium text-red-300 mb-3">Broken Links ({brokenLinks.brokenLinks.length})</h3>
              <div className="space-y-2">
                {(brokenLinks.brokenLinks as Array<{ href: string; sourceFile: string }>).slice(0, 10).map((link, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <XCircle className="w-3 h-3 text-red-400 shrink-0" />
                    <code className="text-red-300">{link.href}</code>
                    <span className="text-white/30">&larr;</span>
                    <span className="text-white/40 truncate">{link.sourceFile}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 text-sm">All {brokenLinks?.totalLinksChecked || 0} internal links healthy</span>
            </div>
          )}
        </Section>

        {/* Blog Quality Section */}
        <Section title="Blog Quality" icon={<FileText className="w-5 h-5 text-violet-400" />}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={<CheckCircle className="w-4 h-4" />} label="Excellent" value={blogQuality?.summary?.excellent || 0} sub="90-100" color="emerald" />
            <StatCard icon={<BarChart3 className="w-4 h-4" />} label="Good" value={blogQuality?.summary?.good || 0} sub="70-89" color="cyan" />
            <StatCard icon={<AlertTriangle className="w-4 h-4" />} label="Needs Work" value={blogQuality?.summary?.needsWork || 0} sub="50-69" color="amber" />
            <StatCard icon={<XCircle className="w-4 h-4" />} label="Critical" value={blogQuality?.summary?.critical || 0} sub="0-49" color="red" />
          </div>
          {blogQuality?.topIssues?.slice(0, 5).length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-medium text-white/60 mb-3">Top Issues</h3>
              <div className="space-y-2">
                {(blogQuality.topIssues as Array<{ issue: string; count: number }>).slice(0, 5).map((issue, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-white/50">{issue.issue}</span>
                    <span className="text-amber-400 font-mono">{issue.count}x</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* Product Delivery Section */}
        <Section title="Product Delivery" icon={<Package className="w-5 h-5 text-amber-400" />}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={<CheckCircle className="w-4 h-4" />} label="Healthy" value={productDelivery?.summary?.healthy || 0} color="emerald" />
            <StatCard icon={<AlertTriangle className="w-4 h-4" />} label="Needs Work" value={productDelivery?.summary?.needsWork || 0} color="amber" />
            <StatCard icon={<XCircle className="w-4 h-4" />} label="Broken" value={productDelivery?.summary?.broken || 0} color="red" />
            <StatCard icon={<Package className="w-4 h-4" />} label="Total" value={productDelivery?.summary?.total || 0} color="cyan" />
          </div>
          {productDelivery?.products && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-medium text-white/60 mb-3">Products by Score</h3>
              <div className="space-y-2">
                {(productDelivery.products as Array<{ slug: string; score: number; status: string; issues: string[] }>)
                  .sort((a, b) => a.score - b.score)
                  .map((product, i) => {
                    const scoreColor = product.score >= 90 ? 'text-emerald-400'
                      : product.score >= 70 ? 'text-cyan-400'
                      : product.score >= 50 ? 'text-amber-400'
                      : 'text-red-400'
                    return (
                      <div key={i} className="flex items-center gap-3 text-xs">
                        <span className={`font-mono font-bold w-8 ${scoreColor}`}>{product.score}</span>
                        <Link href={`/products/${product.slug}`} className="text-white/70 hover:text-white transition-colors">
                          {product.slug}
                        </Link>
                        {product.issues?.length > 0 && (
                          <span className="text-white/30 truncate ml-auto">{product.issues[0]}</span>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </Section>

        {/* Page Categories */}
        <Section title="Site Topology" icon={<Layers className="w-5 h-5 text-cyan-400" />}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(categories as Record<string, { count: number; avgScore: number; orphans: number }>)
              .sort(([, a], [, b]) => b.count - a.count)
              .map(([cat, data]) => (
                <div key={cat} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{cat}</div>
                  <div className="text-lg font-bold text-white">{data.count} <span className="text-xs text-white/30">pages</span></div>
                  <div className="flex gap-3 mt-1 text-xs">
                    <span className="text-cyan-400">avg {data.avgScore}</span>
                    {data.orphans > 0 && <span className="text-amber-400">{data.orphans} orphan</span>}
                  </div>
                </div>
              ))}
          </div>
        </Section>

        {/* Orphan Triage */}
        {orphanTriage && (
          <Section title="Orphan Page Triage" icon={<Search className="w-5 h-5 text-amber-400" />}>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { tier: 'A', label: 'Core', count: orphanTriage.tiers?.A_core?.length || 0, color: 'red' },
                { tier: 'B', label: 'Valuable', count: orphanTriage.tiers?.B_valuable?.length || 0, color: 'amber' },
                { tier: 'C', label: 'Lab', count: orphanTriage.tiers?.C_lab?.length || 0, color: 'cyan' },
                { tier: 'D', label: 'Redirect', count: orphanTriage.tiers?.D_redirect?.length || 0, color: 'violet' },
                { tier: 'E', label: 'Stub', count: orphanTriage.tiers?.E_stub?.length || 0, color: 'red' },
              ].map(({ tier, label, count, color }) => (
                <StatCard key={tier} icon={<span className="text-xs font-bold">T{tier}</span>} label={label} value={count} color={color} />
              ))}
            </div>
          </Section>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-white/20 pt-8 border-t border-white/5">
          Run <code className="text-cyan-400/50">node scripts/pre-deploy-audit.mjs</code> to refresh audit data
          {' '}&middot;{' '}
          <Link href="/admin/map" className="text-cyan-400/50 hover:text-cyan-400 transition-colors">
            Repo Map <ArrowUpRight className="w-3 h-3 inline" />
          </Link>
        </div>
      </div>
    </div>
  )
}
