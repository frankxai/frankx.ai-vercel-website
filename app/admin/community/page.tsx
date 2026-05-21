import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Dashboard — Admin | FrankX',
  robots: { index: false, follow: false },
}

// ── Types ──────────────────────────────────────────────────────
type TierKey = 'free' | 'pro' | 'vip'

interface MemberStats {
  total: number
  free: number
  pro: number
  vip: number
  newThisWeek: number
  churnRate: number
}

interface RevenueStats {
  mrr: number
  proRevenue: number
  vipRevenue: number
  ltv: number
  arpu: number
}

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: 'ama' | 'drop' | 'workshop' | 'office-hours'
  tier: TierKey | 'all'
  status: 'scheduled' | 'completed' | 'draft'
}

interface EngagementMetric {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'flat'
}

// ── Mock Data (replace with Discord API + Stripe calls) ───────
const memberStats: MemberStats = {
  total: 0,
  free: 0,
  pro: 0,
  vip: 0,
  newThisWeek: 0,
  churnRate: 0,
}

const revenueStats: RevenueStats = {
  mrr: 0,
  proRevenue: 0,
  vipRevenue: 0,
  ltv: 0,
  arpu: 0,
}

const contentCalendar: CalendarEvent[] = [
  { id: '1', title: 'Tool of the Week: Cursor AI Field Test', date: '2026-03-24', type: 'drop', tier: 'pro', status: 'scheduled' },
  { id: '2', title: 'Prompt Drop: 5 Production-Ready System Prompts', date: '2026-03-25', type: 'drop', tier: 'pro', status: 'scheduled' },
  { id: '3', title: 'Suno Workflow: Genre-Blending Techniques', date: '2026-03-26', type: 'drop', tier: 'pro', status: 'draft' },
  { id: '4', title: 'Community Showcase Spotlight', date: '2026-03-27', type: 'drop', tier: 'all', status: 'scheduled' },
  { id: '5', title: 'Friday Build: Live ACOS Plugin Development', date: '2026-03-28', type: 'drop', tier: 'pro', status: 'draft' },
  { id: '6', title: 'Monthly AMA with Frank', date: '2026-04-04', type: 'ama', tier: 'pro', status: 'scheduled' },
  { id: '7', title: 'VIP Office Hours', date: '2026-04-17', type: 'office-hours', tier: 'vip', status: 'scheduled' },
  { id: '8', title: 'Workshop: Building Your Personal AI CoE', date: '2026-04-30', type: 'workshop', tier: 'pro', status: 'draft' },
]

const engagementMetrics: EngagementMetric[] = [
  { label: 'Weekly Active Members', value: '0%', change: '--', trend: 'flat' },
  { label: 'Messages / Day', value: '0', change: '--', trend: 'flat' },
  { label: 'Avg. Response Time', value: '--', change: '--', trend: 'flat' },
  { label: 'Showcase Posts / Week', value: '0', change: '--', trend: 'flat' },
  { label: 'Prompt Downloads', value: '0', change: '--', trend: 'flat' },
  { label: 'AMA Attendance Rate', value: '0%', change: '--', trend: 'flat' },
]

const channelActivity = [
  { name: '#ai-tools', messages: 0, threads: 0, tier: 'pro' as TierKey },
  { name: '#music-production', messages: 0, threads: 0, tier: 'pro' as TierKey },
  { name: '#prompt-sharing', messages: 0, threads: 0, tier: 'pro' as TierKey },
  { name: '#showcase', messages: 0, threads: 0, tier: 'pro' as TierKey },
  { name: '#general', messages: 0, threads: 0, tier: 'free' as TierKey },
  { name: '#vip-mastermind', messages: 0, threads: 0, tier: 'vip' as TierKey },
]

// ── Helpers ────────────────────────────────────────────────────
const tierColors: Record<TierKey | 'all', string> = {
  free: 'text-zinc-400',
  pro: 'text-violet-400',
  vip: 'text-amber-400',
  all: 'text-cyan-400',
}

const tierBadgeBg: Record<TierKey | 'all', string> = {
  free: 'bg-zinc-800 text-zinc-400',
  pro: 'bg-violet-900/50 text-violet-400',
  vip: 'bg-amber-900/50 text-amber-400',
  all: 'bg-cyan-900/50 text-cyan-400',
}

const typeBadge: Record<CalendarEvent['type'], { label: string; className: string }> = {
  drop: { label: 'Content Drop', className: 'bg-violet-900/50 text-violet-400' },
  ama: { label: 'AMA', className: 'bg-cyan-900/50 text-cyan-400' },
  workshop: { label: 'Workshop', className: 'bg-emerald-900/50 text-emerald-400' },
  'office-hours': { label: 'Office Hours', className: 'bg-amber-900/50 text-amber-400' },
}

const statusDot: Record<CalendarEvent['status'], string> = {
  scheduled: 'bg-emerald-500',
  completed: 'bg-zinc-600',
  draft: 'bg-amber-500',
}

const trendIcon: Record<EngagementMetric['trend'], string> = {
  up: '\u2191',
  down: '\u2193',
  flat: '\u2013',
}

const trendColor: Record<EngagementMetric['trend'], string> = {
  up: 'text-emerald-400',
  down: 'text-red-400',
  flat: 'text-zinc-500',
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}`
}

// ── Components ─────────────────────────────────────────────────
function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const colorMap: Record<string, string> = {
    violet: 'border-violet-800/50 from-violet-500/10',
    cyan: 'border-cyan-800/50 from-cyan-500/10',
    amber: 'border-amber-800/50 from-amber-500/10',
    emerald: 'border-emerald-800/50 from-emerald-500/10',
    red: 'border-red-800/50 from-red-500/10',
  }
  const textColorMap: Record<string, string> = {
    violet: 'text-violet-400',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
    red: 'text-red-400',
  }

  return (
    <div className={`bg-gradient-to-br ${colorMap[color] ?? ''} to-transparent border ${colorMap[color]?.split(' ')[0] ?? 'border-zinc-800'} rounded-2xl p-5`}>
      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-2xl font-bold ${textColorMap[color] ?? 'text-white'}`}>{value}</div>
      <div className="text-xs text-zinc-600 mt-1">{sub}</div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────
export default function CommunityDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-violet-500 animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Community Dashboard
          </h1>
        </div>
        <p className="text-zinc-500 text-sm mb-8">
          FrankX Creator Club — Discord membership community
        </p>

        {/* Discord Integration Banner */}
        <div className="bg-indigo-950/30 border border-indigo-800/50 rounded-2xl p-5 mb-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-indigo-300 font-medium text-sm">Discord API Integration</div>
            <div className="text-zinc-500 text-xs">Connect your Discord bot to populate live member and engagement data. Set DISCORD_BOT_TOKEN and DISCORD_GUILD_ID in environment variables.</div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-zinc-800 text-zinc-500">Pending Setup</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <StatCard label="Total Members" value={String(memberStats.total)} sub={`+${memberStats.newThisWeek} this week`} color="violet" />
          <StatCard label="Pro Members" value={String(memberStats.pro)} sub={`${formatCurrency(revenueStats.proRevenue)}/mo`} color="cyan" />
          <StatCard label="VIP Members" value={String(memberStats.vip)} sub={`${formatCurrency(revenueStats.vipRevenue)}/mo`} color="amber" />
          <StatCard label="MRR" value={formatCurrency(revenueStats.mrr)} sub={`ARPU: ${formatCurrency(revenueStats.arpu)}`} color="emerald" />
          <StatCard label="Churn Rate" value={`${memberStats.churnRate}%`} sub="monthly" color="red" />
        </div>

        {/* Revenue Breakdown + Member Mix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Revenue Breakdown */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-300 mb-4">Revenue Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-violet-400">Pro ($19/mo)</span>
                  <span className="text-zinc-400 font-mono">{formatCurrency(revenueStats.proRevenue)}</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: revenueStats.mrr > 0 ? `${(revenueStats.proRevenue / revenueStats.mrr) * 100}%` : '0%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-400">VIP ($49/mo)</span>
                  <span className="text-zinc-400 font-mono">{formatCurrency(revenueStats.vipRevenue)}</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: revenueStats.mrr > 0 ? `${(revenueStats.vipRevenue / revenueStats.mrr) * 100}%` : '0%' }} />
                </div>
              </div>
              <div className="border-t border-zinc-800 pt-3 flex justify-between text-sm">
                <span className="text-zinc-300 font-medium">Total MRR</span>
                <span className="text-emerald-400 font-mono font-bold">{formatCurrency(revenueStats.mrr)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">ARR (projected)</span>
                <span className="text-zinc-400 font-mono">{formatCurrency(revenueStats.mrr * 12)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">LTV (avg)</span>
                <span className="text-zinc-400 font-mono">{formatCurrency(revenueStats.ltv)}</span>
              </div>
            </div>
          </div>

          {/* Member Composition */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-300 mb-4">Member Composition</h2>
            <div className="space-y-5">
              {([
                { tier: 'Free' as const, count: memberStats.free, color: 'zinc', pct: memberStats.total > 0 ? (memberStats.free / memberStats.total) * 100 : 0 },
                { tier: 'Pro' as const, count: memberStats.pro, color: 'violet', pct: memberStats.total > 0 ? (memberStats.pro / memberStats.total) * 100 : 0 },
                { tier: 'VIP' as const, count: memberStats.vip, color: 'amber', pct: memberStats.total > 0 ? (memberStats.vip / memberStats.total) * 100 : 0 },
              ] as const).map((t) => (
                <div key={t.tier}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={t.color === 'zinc' ? 'text-zinc-400' : t.color === 'violet' ? 'text-violet-400' : 'text-amber-400'}>
                      {t.tier}
                    </span>
                    <span className="text-zinc-500">{t.count} members ({Math.round(t.pct)}%)</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${t.color === 'zinc' ? 'bg-zinc-600' : t.color === 'violet' ? 'bg-violet-500' : 'bg-amber-500'}`}
                      style={{ width: `${t.pct}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="border-t border-zinc-800 pt-3 text-sm text-zinc-500">
                Conversion rate (Free → Pro): {memberStats.free > 0 ? `${Math.round((memberStats.pro / memberStats.free) * 100)}%` : '--'}
              </div>
            </div>
          </div>
        </div>

        {/* Content Calendar */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-zinc-300">Content Calendar</h2>
            <span className="text-xs text-zinc-600">{contentCalendar.filter(e => e.status === 'scheduled').length} scheduled / {contentCalendar.filter(e => e.status === 'draft').length} drafts</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-left border-b border-zinc-800">
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2 pr-4">Date</th>
                  <th className="pb-2 pr-4">Title</th>
                  <th className="pb-2 pr-4">Type</th>
                  <th className="pb-2">Tier</th>
                </tr>
              </thead>
              <tbody>
                {contentCalendar.map((event) => (
                  <tr key={event.id} className="border-b border-zinc-800/50">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${statusDot[event.status]}`} />
                        <span className="text-xs text-zinc-600 capitalize">{event.status}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-zinc-500 font-mono text-xs whitespace-nowrap">
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3 pr-4 text-zinc-300">{event.title}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadge[event.type].className}`}>
                        {typeBadge[event.type].label}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tierBadgeBg[event.tier]}`}>
                        {event.tier.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Engagement Metrics + Channel Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Engagement Metrics */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-300 mb-4">Engagement Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              {engagementMetrics.map((metric) => (
                <div key={metric.label} className="bg-zinc-800/30 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-1">{metric.label}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-zinc-200">{metric.value}</span>
                    <span className={`text-xs font-mono ${trendColor[metric.trend]}`}>
                      {trendIcon[metric.trend]} {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channel Activity */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-zinc-300 mb-4">Channel Activity</h2>
            <div className="space-y-3">
              {channelActivity.map((ch) => (
                <div key={ch.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-400 font-mono text-sm">{ch.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${tierBadgeBg[ch.tier]}`}>
                      {ch.tier.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span>{ch.messages} msgs</span>
                    <span>{ch.threads} threads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Membership Targets */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Growth Targets</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-left border-b border-zinc-800">
                  <th className="pb-2">Metric</th>
                  <th className="pb-2">Current</th>
                  <th className="pb-2">Month 3</th>
                  <th className="pb-2">Month 6</th>
                  <th className="pb-2">Month 12</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Total Members', current: '0', m3: '150', m6: '400', m12: '1,000' },
                  { metric: 'Pro Members', current: '0', m3: '40', m6: '100', m12: '300' },
                  { metric: 'VIP Members', current: '0', m3: '8', m6: '20', m12: '50' },
                  { metric: 'MRR', current: '$0', m3: '$1,152', m6: '$2,880', m12: '$8,150' },
                  { metric: 'Churn Rate', current: '--', m3: '<8%', m6: '<6%', m12: '<5%' },
                ].map((row) => (
                  <tr key={row.metric} className="border-b border-zinc-800/50">
                    <td className="py-2 text-zinc-300 font-medium">{row.metric}</td>
                    <td className="py-2 text-zinc-500 font-mono">{row.current}</td>
                    <td className="py-2 text-violet-400 font-mono">{row.m3}</td>
                    <td className="py-2 text-cyan-400 font-mono">{row.m6}</td>
                    <td className="py-2 text-emerald-400 font-mono">{row.m12}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Set Up Discord Server', desc: 'Create channels, roles, permissions', color: 'indigo' },
              { label: 'Connect Stripe', desc: 'Link billing for Pro & VIP tiers', color: 'violet' },
              { label: 'Deploy Discord Bot', desc: 'Welcome automation, role sync', color: 'cyan' },
              { label: 'Create Landing Page', desc: 'frankx.ai/club with tier comparison', color: 'emerald' },
              { label: 'Draft Welcome Sequence', desc: '3-email onboarding for new members', color: 'amber' },
              { label: 'Invite Founding Members', desc: 'Newsletter segment, locked pricing', color: 'violet' },
              { label: 'Schedule First AMA', desc: 'Pick date, create Discord event', color: 'cyan' },
              { label: 'Build Content Calendar', desc: 'Plan first 4 weeks of drops', color: 'emerald' },
            ].map((action) => {
              const btnColors: Record<string, string> = {
                indigo: 'border-indigo-800/50 hover:bg-indigo-900/20',
                violet: 'border-violet-800/50 hover:bg-violet-900/20',
                cyan: 'border-cyan-800/50 hover:bg-cyan-900/20',
                emerald: 'border-emerald-800/50 hover:bg-emerald-900/20',
                amber: 'border-amber-800/50 hover:bg-amber-900/20',
              }
              const textColors: Record<string, string> = {
                indigo: 'text-indigo-400',
                violet: 'text-violet-400',
                cyan: 'text-cyan-400',
                emerald: 'text-emerald-400',
                amber: 'text-amber-400',
              }
              return (
                <button
                  key={action.label}
                  className={`text-left border ${btnColors[action.color]} rounded-xl p-3 transition-colors cursor-pointer`}
                >
                  <div className={`text-sm font-medium ${textColors[action.color]}`}>{action.label}</div>
                  <div className="text-xs text-zinc-600 mt-1">{action.desc}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-zinc-700 text-xs mt-10">
          FrankX Creator Club — Community Dashboard v1.0
        </div>
      </div>
    </div>
  )
}
