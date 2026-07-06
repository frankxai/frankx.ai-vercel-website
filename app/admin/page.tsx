import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Activity,
  BarChart3,
  Bot,
  Calendar,
  DollarSign,
  FileText,
  Gauge,
  Image as ImageIcon,
  Inbox,
  Mail,
  Map as MapIcon,
  Music,
  Radar,
  Scale,
  LayoutGrid,
  TrendingUp,
  Users,
  Vault,
  Youtube,
} from 'lucide-react'

// Owner-only landing. Access is gated in middleware.ts (/admin is in protectedPaths),
// so this page is never reachable by the public — it just indexes the admin tools.
export const metadata: Metadata = {
  title: 'Admin · FrankX',
  description: 'Internal command surface.',
  robots: { index: false, follow: false },
}

type Tool = { name: string; href: string; description: string; icon: React.ComponentType<{ className?: string }> }

const groups: { label: string; tools: Tool[] }[] = [
  {
    label: 'Command',
    tools: [
      { name: 'Command Center', href: '/command-center', description: 'Mission control overview', icon: Activity },
      { name: 'BV Command Center', href: '/admin/bv-command-center', description: 'Business velocity dashboard', icon: Gauge },
      { name: 'Daily', href: '/admin/daily', description: 'Daily operating brief', icon: Calendar },
      { name: 'Site Health', href: '/admin/site-health', description: 'Uptime, errors, vitals', icon: Activity },
    ],
  },
  {
    label: 'Revenue & Growth',
    tools: [
      { name: 'Revenue', href: '/admin/revenue', description: 'Sales & revenue tracking', icon: DollarSign },
      { name: 'Wealth', href: '/admin/wealth', description: 'Portfolio & net worth', icon: TrendingUp },
      { name: 'Subscriptions', href: '/admin/subscriptions', description: 'Recurring & members', icon: BarChart3 },
      { name: 'Investment Dashboard', href: '/frankx-investment-dashboard', description: 'Revenue & portfolio model', icon: TrendingUp },
    ],
  },
  {
    label: 'Content & Community',
    tools: [
      { name: 'Content', href: '/admin/content', description: 'Content pipeline & studio', icon: FileText },
      { name: 'Content Studio', href: '/admin/content-studio', description: 'Editorial production', icon: FileText },
      { name: 'Newsletter', href: '/admin/newsletter', description: 'Strategy, simulations, approval gates', icon: Mail },
      { name: 'Strategist Canvas', href: '/admin/canvas', description: 'Visual strategist whiteboard board', icon: LayoutGrid },
      { name: 'Community', href: '/admin/community', description: 'Members & engagement', icon: Users },
      { name: 'Intake', href: '/admin/intake', description: 'Leads & inbound', icon: Inbox },
      { name: 'YouTube', href: '/admin/youtube', description: 'Channel strategy & metrics', icon: Youtube },
      { name: 'Music', href: '/admin/music', description: 'Catalog & releases', icon: Music },
    ],
  },
  {
    label: 'Systems',
    tools: [
      { name: 'Ops', href: '/ops', description: 'Agent mission control', icon: Bot },
      { name: '404 Radar', href: '/admin/404-radar', description: 'Broken-link detection', icon: Radar },
      { name: 'Image Lab', href: '/admin/image-lab', description: 'Asset generation', icon: ImageIcon },
      { name: 'Vault', href: '/admin/vault', description: 'Private asset vault', icon: Vault },
      { name: 'Map', href: '/admin/map', description: 'Internal site map', icon: MapIcon },
      { name: 'Legal', href: '/admin/legal', description: 'Policies & compliance', icon: Scale },
    ],
  },
]

export default function AdminIndexPage() {
  return (
    <div className="min-h-screen bg-[#030712] px-4 pb-24 pt-28 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-amber-400/70">
          <Activity className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Private · owner only</span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Admin</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Internal command surface. Every tool below is gated by authentication in middleware — this index is not
          reachable by the public.
        </p>

        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <section key={group.label}>
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">{group.label}</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-amber-400/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-300 transition-colors group-hover:bg-amber-500/20">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-sm font-semibold text-white">{tool.name}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-slate-500">{tool.description}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
