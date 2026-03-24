import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BV Command Center — Admin | FrankX',
  robots: { index: false, follow: false },
}

// Phase data with milestones and tasks
const phases = [
  {
    id: 'phase-0',
    name: 'Foundation & Research',
    status: 'in-progress' as const,
    timeline: 'Week 1-2',
    color: '#f59e0b',
    tasks: [
      { label: 'Review Oracle employment contract — find IP clause', done: false, critical: true },
      { label: 'Research notaris — Digital Notary €599 / Firm24 €899 / Expat Notary', done: true },
      { label: 'Search EUIPO TMview for "Arcanea" conflicts', done: false },
      { label: 'Search KvK for name availability', done: false },
      { label: 'Document personal project timeline with evidence', done: false, critical: true },
      { label: 'Apply for EUIPO SME Fund 2026 (75% trademark reimbursement!)', done: false, critical: true },
      { label: 'Set budget — revised to €2,798 (was €6,848)', done: true },
      { label: 'Research accountant — Myfinance €70/mo / OrangeTax (full)', done: true },
      { label: 'List first product on Gumroad (Creator Prompt Vault €19)', done: false },
    ],
  },
  {
    id: 'phase-1',
    name: 'Oracle Separation',
    status: 'not-started' as const,
    timeline: 'Week 1-3',
    color: '#ef4444',
    tasks: [
      { label: 'Analyze employment contract IP clause', done: false, critical: true },
      { label: 'Draft Personal IP Declaration document', done: false, critical: true },
      { label: 'Create project origin timeline with git evidence', done: false },
      { label: 'Informal manager conversation', done: false },
      { label: 'Formal HR notification email', done: false },
      { label: 'Request IP waiver from Oracle HR', done: false, critical: true },
      { label: 'Order new personal laptop', done: false },
      { label: 'Order new phone (if Oracle-provisioned)', done: false },
      { label: 'Order external SSD for secure backups', done: false },
      { label: 'Set up new dev environment on personal device', done: false },
      { label: 'Generate new SSH + GPG keys for GitHub', done: false },
      { label: 'Audit repos for Oracle artifacts', done: false },
      { label: 'Migrate all personal dev to new device', done: false },
    ],
  },
  {
    id: 'phase-2',
    name: 'BV Formation',
    status: 'not-started' as const,
    timeline: 'Week 2-4',
    color: '#8b5cf6',
    tasks: [
      { label: 'Select notaris and schedule appointment', done: false },
      { label: 'Prepare articles of association (statuten)', done: false },
      { label: 'Open business bank account (Bunq/ABN AMRO)', done: false },
      { label: 'Execute notarial deed — Future Holding BV', done: false, critical: true },
      { label: 'Execute notarial deed — Arcanea Labs BV', done: false, critical: true },
      { label: 'Register both at KvK', done: false, critical: true },
      { label: 'Apply for BTW-nummer (VAT number)', done: false },
      { label: 'Register as DGA with Belastingdienst', done: false },
      { label: 'Set up payroll for DGA salary', done: false },
    ],
  },
  {
    id: 'phase-3',
    name: 'Trademark Filing',
    status: 'not-started' as const,
    timeline: 'Week 3-5',
    color: '#06b6d4',
    tasks: [
      { label: 'TMview search — Arcanea', done: false },
      { label: 'TMview search — FrankX', done: false },
      { label: 'TMview search — GenCreator', done: false },
      { label: 'File EUIPO: Arcanea (Classes 9, 41, 42)', done: false, critical: true },
      { label: 'File EUIPO: FrankX (Classes 9, 41, 42)', done: false },
      { label: 'File EUIPO: GenCreator (Classes 9, 42)', done: false },
      { label: 'Evaluate ACOS — conflict with Amazon ACOS', done: false },
      { label: 'Set reminder: Madrid Protocol US extension (6mo)', done: false },
    ],
  },
  {
    id: 'phase-4',
    name: 'Website Legal Compliance',
    status: 'not-started' as const,
    timeline: 'Week 3-4',
    color: '#10b981',
    tasks: [
      { label: 'Create /legal/imprint with BV details', done: false },
      { label: 'Create /legal/privacy (GDPR-compliant)', done: false },
      { label: 'Create /legal/terms (product ToS)', done: false },
      { label: 'Create /legal/refund (EU Consumer Rights)', done: false },
      { label: 'Implement cookie consent banner', done: false },
      { label: 'Update footer with KvK + BTW-id', done: false },
      { label: 'Create data processing register', done: false },
      { label: 'Establish DPAs with all processors', done: false },
    ],
  },
  {
    id: 'phase-5',
    name: 'Financial Infrastructure',
    status: 'not-started' as const,
    timeline: 'Week 4-6',
    color: '#f97316',
    tasks: [
      { label: 'Set up Moneybird accounting', done: false },
      { label: 'Configure invoice templates', done: false },
      { label: 'Register for VAT OSS scheme', done: false },
      { label: 'Evaluate Merchant of Record (Paddle vs Lemon Squeezy)', done: false },
      { label: 'Apply for WBSO (R&D tax credit)', done: false },
      { label: 'Set up expense tracking', done: false },
      { label: 'Create financial projections', done: false },
    ],
  },
  {
    id: 'phase-6',
    name: 'Marketplace & Sales',
    status: 'not-started' as const,
    timeline: 'Week 5-8',
    color: '#ec4899',
    tasks: [
      { label: 'Set up Stripe account under BV', done: false },
      { label: 'Configure Merchant of Record', done: false },
      { label: 'Set up Gumroad / Etsy storefronts', done: false },
      { label: 'Research Web3 marketplace options', done: false },
      { label: 'Implement checkout on frankx.ai', done: false },
      { label: 'Create product licensing terms', done: false },
      { label: 'Set up affiliate tracking', done: false },
    ],
  },
]

const budgetItems = [
  { item: 'Notaris — Digital Notary (1 BV)', cost: '€599', status: 'researched' },
  { item: 'KvK registration', cost: '€80', status: 'pending' },
  { item: '3x EUIPO trademarks (after 75% SME Fund!)', cost: '€787 net', status: 'researched' },
  { item: 'Accountant — Myfinance (year 1)', cost: '€840', status: 'researched' },
  { item: 'Moneybird accounting (year 1)', cost: '€336', status: 'researched' },
  { item: 'Bunq Business bank (year 1)', cost: '€156', status: 'pending' },
  { item: 'Laptop (BV expense, pre-formation)', cost: '€1,500', status: 'pending' },
  { item: 'External SSD', cost: '€150', status: 'pending' },
]

const riskItems = [
  { risk: 'Oracle IP claim on personal projects', impact: 'CRITICAL', likelihood: 'LOW-MED', mitigation: 'Written IP separation, timeline docs, HR waiver' },
  { risk: 'Trademark opposition at EUIPO', impact: 'HIGH', likelihood: 'LOW', mitigation: 'Pre-search TMview, file distinctive marks first' },
  { risk: 'VAT non-compliance on EU digital sales', impact: 'HIGH', likelihood: 'MED', mitigation: 'Use Merchant of Record, accountant review' },
  { risk: 'GDPR breach / complaint', impact: 'HIGH', likelihood: 'LOW', mitigation: 'Privacy policy, DPAs, consent management' },
  { risk: 'Device transition data loss', impact: 'MED', likelihood: 'LOW', mitigation: 'SSD backup before transition, GitHub as source of truth' },
  { risk: 'BV costs exceed revenue (Year 1)', impact: 'MED', likelihood: 'HIGH', mitigation: 'Normal for startups — Oracle salary covers personal expenses' },
]

export default function BVCommandCenterPage() {
  const totalTasks = phases.reduce((sum, p) => sum + p.tasks.length, 0)
  const completedTasks = phases.reduce((sum, p) => sum + p.tasks.filter(t => t.done).length, 0)
  const criticalTasks = phases.flatMap(p => p.tasks.filter(t => t.critical && !t.done))
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-violet-500 animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            BV Command Center
          </h1>
        </div>
        <p className="text-zinc-500 text-sm mb-8">
          Future Holding BV + Arcanea Labs BV — Formation & Legal Strategy Tracker
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Overall Progress" value={`${overallProgress}%`} sub={`${completedTasks}/${totalTasks} tasks`} color="violet" />
          <StatCard label="Critical Blockers" value={String(criticalTasks.length)} sub="must resolve first" color="red" />
          <StatCard label="Phases" value={`0/${phases.length}`} sub="completed" color="cyan" />
          <StatCard label="Est. Budget" value="€2,798" sub="revised (was €9-14K)" color="amber" />
        </div>

        {/* Corporate Structure Diagram */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Target Corporate Structure</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-violet-900/30 border border-violet-700/50 rounded-xl p-4 w-full max-w-md text-center">
              <div className="text-violet-400 font-bold text-lg">Future Holding BV</div>
              <div className="text-zinc-500 text-sm">Frank Riemer — 100% DGA</div>
              <div className="text-zinc-600 text-xs mt-1">Owns all IP & trademarks</div>
            </div>
            <div className="w-px h-6 bg-zinc-700" />
            <div className="text-zinc-600 text-xs">100% ownership</div>
            <div className="w-px h-6 bg-zinc-700" />
            <div className="bg-cyan-900/30 border border-cyan-700/50 rounded-xl p-4 w-full max-w-md text-center">
              <div className="text-cyan-400 font-bold text-lg">Arcanea Labs BV</div>
              <div className="text-zinc-500 text-sm">Operating Company</div>
              <div className="text-zinc-600 text-xs mt-1">FrankX &bull; Arcanea &bull; GenCreator &bull; ACOS &bull; Vibe OS</div>
            </div>
          </div>
        </div>

        {/* Critical Path Alert */}
        {criticalTasks.length > 0 && (
          <div className="bg-red-950/30 border border-red-800/50 rounded-2xl p-5 mb-10">
            <h2 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Critical Path Items ({criticalTasks.length})
            </h2>
            <ul className="space-y-2">
              {criticalTasks.map((task, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <input type="checkbox" className="accent-red-500 w-4 h-4" readOnly />
                  <span className="text-zinc-300">{task.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Phase Roadmap */}
        <h2 className="text-xl font-semibold text-zinc-300 mb-6">Phase Roadmap</h2>
        <div className="space-y-6 mb-10">
          {phases.map((phase) => {
            const done = phase.tasks.filter(t => t.done).length
            const total = phase.tasks.length
            const pct = total > 0 ? Math.round((done / total) * 100) : 0
            return (
              <div key={phase.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: phase.color }} />
                    <h3 className="font-semibold text-zinc-200">{phase.name}</h3>
                    <span className="text-xs text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-full">{phase.timeline}</span>
                  </div>
                  <div className="text-xs text-zinc-500">{done}/{total} ({pct}%)</div>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-zinc-800 rounded-full mb-4 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: phase.color }} />
                </div>
                {/* Tasks */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {phase.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <input type="checkbox" checked={task.done} readOnly className="accent-violet-500 mt-0.5 w-4 h-4 flex-shrink-0" />
                      <span className={`${task.done ? 'line-through text-zinc-600' : 'text-zinc-400'} ${task.critical ? 'font-medium text-red-300' : ''}`}>
                        {task.label}
                        {task.critical && <span className="text-red-500 text-xs ml-1">(CRITICAL)</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Budget Table */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Formation Budget</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-left border-b border-zinc-800">
                  <th className="pb-2">Item</th>
                  <th className="pb-2">Estimated Cost</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {budgetItems.map((item, i) => (
                  <tr key={i} className="border-b border-zinc-800/50">
                    <td className="py-2 text-zinc-300">{item.item}</td>
                    <td className="py-2 text-amber-400 font-mono">{item.cost}</td>
                    <td className="py-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-zinc-700">
                  <td className="pt-3 font-semibold text-zinc-200">Total Initial</td>
                  <td className="pt-3 font-semibold text-amber-400 font-mono">€9,200–14,300</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Risk Register */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Risk Register</h2>
          <div className="space-y-3">
            {riskItems.map((r, i) => (
              <div key={i} className="bg-zinc-800/30 rounded-xl p-4 border border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-200 font-medium text-sm">{r.risk}</span>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      r.impact === 'CRITICAL' ? 'bg-red-900/50 text-red-400' :
                      r.impact === 'HIGH' ? 'bg-orange-900/50 text-orange-400' :
                      'bg-yellow-900/50 text-yellow-400'
                    }`}>{r.impact}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-400">{r.likelihood}</span>
                  </div>
                </div>
                <p className="text-zinc-500 text-xs">{r.mitigation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Contacts */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Key Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['Notaris (Amsterdam)', 'Accountant (NL/EN)', 'Trademark Attorney', 'Tax Advisor', 'Employment Lawyer'].map((role) => (
              <div key={role} className="bg-zinc-800/30 rounded-xl p-3 border border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-400 text-sm">{role}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-500">TBD</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-zinc-700 text-xs py-6 border-t border-zinc-800/50">
          CONFIDENTIAL — Future Holding BV Formation Plan — frankx.ai/admin/bv-command-center
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const borderColors: Record<string, string> = {
    violet: 'border-violet-800/50',
    red: 'border-red-800/50',
    cyan: 'border-cyan-800/50',
    amber: 'border-amber-800/50',
  }
  const textColors: Record<string, string> = {
    violet: 'text-violet-400',
    red: 'text-red-400',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
  }
  return (
    <div className={`bg-zinc-900/50 border ${borderColors[color]} rounded-xl p-4`}>
      <div className="text-zinc-500 text-xs mb-1">{label}</div>
      <div className={`text-2xl font-bold ${textColors[color]}`}>{value}</div>
      <div className="text-zinc-600 text-xs">{sub}</div>
    </div>
  )
}
