'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Building2,
  ClipboardList,
  Home,
  KeyRound,
  LifeBuoy,
  MonitorCheck,
} from 'lucide-react'

const modes = [
  {
    id: 'property',
    label: 'Property page',
    icon: Building2,
    title: 'Urban Haven Sample',
    eyebrow: 'Public property layer',
    lead: 'Real media, verified amenities, approval-aware availability, and an inquiry path that does not overpromise.',
    stats: [
      ['Status', 'owner review'],
      ['Rent', 'requires approval'],
      ['FAQ', '12 answers'],
    ],
    rows: ['Verified amenities', 'Neighborhood guide', 'House rules', 'Inquiry CTA'],
  },
  {
    id: 'renter',
    label: 'Renter portal',
    icon: KeyRound,
    title: 'Stay information',
    eyebrow: 'Private renter layer',
    lead: 'Move-in guidance, utilities, trash, support, extension interest, and urgent routing without repository access secrets.',
    stats: [
      ['Access', 'code/session'],
      ['Secrets', 'not in Git'],
      ['Support', 'triaged'],
    ],
    rows: ['Arrival basics', 'Wi-Fi policy', 'Trash and recycling', 'Urgent issue path'],
  },
  {
    id: 'owner',
    label: 'Owner cockpit',
    icon: MonitorCheck,
    title: 'Weekly owner review',
    eyebrow: 'Decision layer',
    lead: 'Inquiry queue, listing drafts, vacancy timeline, maintenance risk, and agent outputs in one calm operating loop.',
    stats: [
      ['Listings', '4 drafts'],
      ['Questions', '3 missing facts'],
      ['Cadence', 'weekly'],
    ],
    rows: ['Approve replies', 'Confirm availability', 'Review maintenance', 'Update renter FAQ'],
  },
  {
    id: 'listing',
    label: 'Listing studio',
    icon: ClipboardList,
    title: 'Channel-ready drafts',
    eyebrow: 'Publication layer',
    lead: 'Kleinanzeigen, ImmoScout24, Immowelt, and own-site copy drafted from approved facts with manual publication gates.',
    stats: [
      ['Channels', '4'],
      ['Automation', 'manual publish'],
      ['Gate', 'owner approval'],
    ],
    rows: ['Headline variants', 'Missing fact checklist', 'Energy-info reminder', 'Photo approval'],
  },
] as const

export function PropertyExperiencePreview() {
  const [activeId, setActiveId] = useState<(typeof modes)[number]['id']>('property')
  const prefersReducedMotion = useReducedMotion()
  const active = useMemo(
    () => modes.find((mode) => mode.id === activeId) ?? modes[0],
    [activeId],
  )
  const ActiveIcon = active.icon

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[0.34fr_0.66fr]">
      <div className="rounded-[2rem] border border-white/10 bg-[#0d1116] p-3 sm:p-4">
        <div className="grid gap-2" role="tablist" aria-label="Property OS example surfaces">
          {modes.map((mode) => {
            const Icon = mode.icon
            const selected = activeId === mode.id
            return (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="property-os-preview-panel"
                onClick={() => setActiveId(mode.id)}
                className={`grid grid-cols-[auto_1fr] items-center gap-3 rounded-[1.35rem] border p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300/50 ${
                  selected
                    ? 'border-emerald-300/30 bg-emerald-300/10 text-white'
                    : 'border-white/8 bg-white/[0.025] text-slate-400 hover:border-white/16 hover:bg-white/[0.045]'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                    selected ? 'bg-emerald-300/15 text-emerald-100' : 'bg-white/[0.04] text-slate-400'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{mode.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">{mode.eyebrow}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#080b0d] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.4)] sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(20,184,166,0.11),transparent_35%),radial-gradient(circle_at_88%_22%,rgba(6,182,212,0.1),transparent_30%)]" />
        <div className="relative rounded-[1.75rem] border border-white/10 bg-[#0c1117]/90 p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/60">
                {active.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {active.title}
              </h3>
            </div>
            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-100 sm:flex">
              <ActiveIcon className="h-5 w-5" aria-hidden />
            </div>
          </div>

          <motion.div
            id="property-os-preview-panel"
            key={active.id}
            role="tabpanel"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
              {active.lead}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {active.stats.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              {active.rows.map((row, index) => (
                <div
                  key={row}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.045] text-slate-300">
                    {index === 0 ? <Home className="h-4 w-4" aria-hidden /> : index === 1 ? <LifeBuoy className="h-4 w-4" aria-hidden /> : <ClipboardList className="h-4 w-4" aria-hidden />}
                  </div>
                  <span className="text-sm text-slate-300">{row}</span>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[11px] text-emerald-100">
                    approved
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-7 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-1.5 rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-200"
              initial={false}
              animate={prefersReducedMotion ? { width: '76%' } : { width: ['42%', '76%', '58%'] }}
              transition={{ duration: 5.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
