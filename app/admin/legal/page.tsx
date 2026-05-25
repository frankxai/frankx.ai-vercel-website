import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Command Center — Admin | FrankX',
  robots: { index: false, follow: false },
}

const complianceItems = [
  {
    category: 'Website Legal Pages',
    items: [
      { label: '/legal/imprint — Company details (KvK, BTW)', status: 'missing', priority: 'P0' },
      { label: '/legal/privacy — GDPR Privacy Policy', status: 'missing', priority: 'P0' },
      { label: '/legal/terms — Terms of Service', status: 'missing', priority: 'P0' },
      { label: '/legal/refund — EU Refund Policy', status: 'missing', priority: 'P1' },
      { label: '/legal/cookies — Cookie Policy', status: 'missing', priority: 'P1' },
      { label: 'Cookie consent banner implementation', status: 'missing', priority: 'P1' },
      { label: 'Footer with KvK + BTW-id', status: 'missing', priority: 'P0' },
    ],
  },
  {
    category: 'GDPR Compliance',
    items: [
      { label: 'Data Processing Register (verwerkingsregister)', status: 'missing', priority: 'P0' },
      { label: 'DPA with Vercel (hosting)', status: 'pending', priority: 'P1' },
      { label: 'DPA with Resend (email)', status: 'pending', priority: 'P1' },
      { label: 'DPA with Stripe (payments)', status: 'pending', priority: 'P1' },
      { label: 'DPA with Railway (n8n hosting)', status: 'pending', priority: 'P2' },
      { label: 'Newsletter double opt-in', status: 'partial', priority: 'P1' },
      { label: 'Unsubscribe in all marketing emails', status: 'done', priority: 'P0' },
    ],
  },
  {
    category: 'IP Protection',
    items: [
      { label: 'Arcanea — EUIPO trademark filed', status: 'missing', priority: 'P0' },
      { label: 'FrankX — EUIPO trademark filed', status: 'missing', priority: 'P1' },
      { label: 'GenCreator — EUIPO trademark filed', status: 'missing', priority: 'P1' },
      { label: 'Product license terms drafted', status: 'missing', priority: 'P1' },
      { label: 'Open source license strategy', status: 'missing', priority: 'P2' },
      { label: 'Music licensing terms', status: 'missing', priority: 'P2' },
      { label: 'NFT terms of sale', status: 'missing', priority: 'P3' },
    ],
  },
  {
    category: 'Oracle Separation',
    items: [
      { label: 'Employment contract reviewed', status: 'missing', priority: 'P0' },
      { label: 'Personal IP Declaration drafted', status: 'missing', priority: 'P0' },
      { label: 'Project origin timeline documented', status: 'missing', priority: 'P0' },
      { label: 'Manager informed (informal)', status: 'missing', priority: 'P1' },
      { label: 'HR formal notification sent', status: 'missing', priority: 'P1' },
      { label: 'IP waiver obtained', status: 'missing', priority: 'P0' },
      { label: 'Device transition complete', status: 'missing', priority: 'P1' },
      { label: 'Repo audit — zero Oracle artifacts', status: 'missing', priority: 'P0' },
    ],
  },
  {
    category: 'Tax & VAT',
    items: [
      { label: 'BTW-nummer (VAT registration)', status: 'missing', priority: 'P0' },
      { label: 'VAT OSS registration for EU B2C', status: 'missing', priority: 'P1' },
      { label: 'Invoice template with all required fields', status: 'missing', priority: 'P1' },
      { label: 'WBSO application (R&D tax credit)', status: 'missing', priority: 'P2' },
      { label: 'Innovation Box qualification', status: 'missing', priority: 'P2' },
      { label: 'DGA salary administration', status: 'missing', priority: 'P1' },
    ],
  },
  {
    category: 'Product Sales Compliance',
    items: [
      { label: 'EU Consumer Rights withdrawal waiver in checkout', status: 'missing', priority: 'P1' },
      { label: 'Price display with VAT included (B2C)', status: 'partial', priority: 'P1' },
      { label: 'Order confirmation emails with required info', status: 'partial', priority: 'P1' },
      { label: 'Merchant of Record evaluated', status: 'missing', priority: 'P1' },
      { label: 'Dispute resolution / ODR link', status: 'missing', priority: 'P2' },
    ],
  },
]

export default function LegalCommandCenterPage() {
  const allItems = complianceItems.flatMap(c => c.items)
  const total = allItems.length
  const done = allItems.filter(i => i.status === 'done').length
  const missing = allItems.filter(i => i.status === 'missing').length
  const critical = allItems.filter(i => i.priority === 'P0' && i.status !== 'done').length

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Legal Command Center
          </h1>
        </div>
        <p className="text-zinc-500 text-sm mb-8">
          Compliance, IP Protection & Legal Infrastructure — frankx.ai
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            <div className="text-zinc-500 text-xs mb-1">Compliance Score</div>
            <div className="text-2xl font-bold text-emerald-400">{Math.round((done / total) * 100)}%</div>
            <div className="text-zinc-600 text-xs">{done}/{total} items complete</div>
          </div>
          <div className="bg-zinc-900/50 border border-red-900/30 rounded-xl p-4">
            <div className="text-zinc-500 text-xs mb-1">P0 Critical</div>
            <div className="text-2xl font-bold text-red-400">{critical}</div>
            <div className="text-zinc-600 text-xs">must resolve before launch</div>
          </div>
          <div className="bg-zinc-900/50 border border-amber-900/30 rounded-xl p-4">
            <div className="text-zinc-500 text-xs mb-1">Missing Items</div>
            <div className="text-2xl font-bold text-amber-400">{missing}</div>
            <div className="text-zinc-600 text-xs">not yet started</div>
          </div>
          <div className="bg-zinc-900/50 border border-violet-900/30 rounded-xl p-4">
            <div className="text-zinc-500 text-xs mb-1">Categories</div>
            <div className="text-2xl font-bold text-violet-400">{complianceItems.length}</div>
            <div className="text-zinc-600 text-xs">compliance areas</div>
          </div>
        </div>

        {/* Compliance Sections */}
        <div className="space-y-6 mb-10">
          {complianceItems.map((category) => {
            const catDone = category.items.filter(i => i.status === 'done').length
            const catTotal = category.items.length
            const catPct = Math.round((catDone / catTotal) * 100)
            return (
              <div key={category.category} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-zinc-200">{category.category}</h2>
                  <span className="text-xs text-zinc-500">{catDone}/{catTotal} ({catPct}%)</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${catPct}%` }}
                  />
                </div>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 py-1.5 border-b border-zinc-800/30 last:border-0">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <StatusBadge status={item.status} />
                        <span className="text-sm text-zinc-300 truncate">{item.label}</span>
                      </div>
                      <PriorityBadge priority={item.priority} />
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <ActionCard
              title="Review Oracle Contract"
              description="First step — find IP assignment, non-compete, and moonlighting clauses"
              href="/admin/bv-command-center"
              color="red"
            />
            <ActionCard
              title="Search EUIPO TMview"
              description="Check Arcanea, FrankX, GenCreator for trademark conflicts"
              href="https://www.tmdn.org/tmview/"
              color="cyan"
              external
            />
            <ActionCard
              title="Find Amsterdam Notaris"
              description="Compare 3 notaris offices for BV formation pricing"
              href="https://www.knb.nl/vind-een-notaris"
              color="violet"
              external
            />
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Key Milestones</h2>
          <div className="space-y-3">
            <Milestone date="April 2026" label="BV Formation — Notarial Deed" status="upcoming" />
            <Milestone date="April 2026" label="EUIPO Trademark — Arcanea filed" status="upcoming" />
            <Milestone date="April 2026" label="Device Transition Complete" status="upcoming" />
            <Milestone date="May 2026" label="Website Legal Pages Live" status="future" />
            <Milestone date="May 2026" label="Accounting System Operational" status="future" />
            <Milestone date="Q3 2026" label="VAT OSS + Merchant of Record Active" status="future" />
            <Milestone date="Q4 2026" label="US Trademark Filing (Madrid Protocol)" status="future" />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-zinc-700 text-xs py-6 mt-6 border-t border-zinc-800/50">
          CONFIDENTIAL — Legal Command Center — frankx.ai/admin/legal
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    done: 'bg-emerald-900/50 text-emerald-400',
    partial: 'bg-amber-900/50 text-amber-400',
    pending: 'bg-blue-900/50 text-blue-400',
    missing: 'bg-red-900/50 text-red-400',
  }
  const icons: Record<string, string> = {
    done: '\u2713',
    partial: '\u25D4',
    pending: '\u25CB',
    missing: '\u2717',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[status]} flex-shrink-0 font-mono`}>
      {icons[status]} {status}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    P0: 'bg-red-900/50 text-red-400 border-red-800/50',
    P1: 'bg-orange-900/50 text-orange-400 border-orange-800/50',
    P2: 'bg-yellow-900/50 text-yellow-400 border-yellow-800/50',
    P3: 'bg-zinc-800 text-zinc-500 border-zinc-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[priority]} flex-shrink-0`}>
      {priority}
    </span>
  )
}

function ActionCard({ title, description, href, color, external }: {
  title: string; description: string; href: string; color: string; external?: boolean
}) {
  const borderColors: Record<string, string> = {
    red: 'border-red-800/30 hover:border-red-700/50',
    cyan: 'border-cyan-800/30 hover:border-cyan-700/50',
    violet: 'border-violet-800/30 hover:border-violet-700/50',
  }
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`bg-zinc-800/30 border ${borderColors[color]} rounded-xl p-4 block transition-colors`}
    >
      <div className="text-zinc-200 font-medium text-sm mb-1">{title}</div>
      <div className="text-zinc-500 text-xs">{description}</div>
    </a>
  )
}

function Milestone({ date, label, status }: { date: string; label: string; status: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
        status === 'upcoming' ? 'bg-amber-500' : 'bg-zinc-700'
      }`} />
      <div className="text-xs text-zinc-500 w-24 flex-shrink-0">{date}</div>
      <div className="text-sm text-zinc-300">{label}</div>
    </div>
  )
}
