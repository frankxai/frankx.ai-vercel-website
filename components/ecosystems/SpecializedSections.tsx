'use client'

import type { 
  UvaClusterEntry, 
  DemonstratorLab, 
  AdamToren, 
  FreeCircuitEntry, 
  EventRailEntry 
} from '@/data/ecosystems'
import { Calendar, Users, Award, ShieldAlert, Zap, MapPin, Building, Key } from 'lucide-react'

// ==========================================
// 1. FREE CIRCUIT SECTION (Plate II)
// ==========================================
export function FreeCircuitSection({ circuit }: { circuit: FreeCircuitEntry[] }) {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Plate II</span>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white mt-1">The Free Circuit</h2>
        <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-2xl">
          Foundation-phase doctrine: desks are not the bottleneck. Pay €0 for workspace and spend capital on people instead.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {circuit.map((entry) => (
          <div 
            key={entry.name}
            className="bg-[#101012] border border-white/[0.08] rounded-xl p-5 hover:border-zinc-800 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white text-md">{entry.name}</h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/[0.04] border border-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                  {entry.cost}
                </span>
              </div>
              {entry.address && (
                <span className="text-xs text-zinc-500 block mt-1">{entry.address}</span>
              )}
              {entry.notes && (
                <p className="text-zinc-400 text-xs mt-3 leading-relaxed">{entry.notes}</p>
              )}
            </div>
            {entry.hours && (
              <div className="mt-4 pt-3 border-t border-white/[0.05] text-[11px] text-zinc-500 flex items-center gap-1.5">
                <span className="font-mono">{entry.hours}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// 2. A'DAM TOWER SECTION (Plate IV)
// ==========================================
export function AdamTorenSection({ adamToren }: { adamToren: AdamToren }) {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Plate IV</span>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white mt-1">Inside A'DAM Toren</h2>
        <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-2xl">
          The music-industry tower. Three distinct access layers: public venues, coworking membership, and private tenant offices.
        </p>
      </div>

      {/* Layer cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-5 border-l-4 border-l-emerald-500">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Layer 1 — Public</span>
          <h3 className="text-md font-semibold text-white mt-1">Venues (No membership)</h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            LOOKOUT, Moon (19F, rotating), Madam (20F bar), Shelter (basement nightclub), The Loft, and The Butcher. Open to anyone. Just pay a bill, not a membership.
          </p>
        </div>
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-5 border-l-4 border-l-cyan-500">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Layer 2 — Coworking</span>
          <h3 className="text-md font-semibold text-white mt-1">A'DAM Works</h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Co-working floors (A'DAM&Co.work). Flex from €250/mo (cancel monthly) or dedicated from €400/mo. Skip as standing cost; buy flex only when a specific sprint needs tower co-location.
          </p>
        </div>
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-5 border-l-4 border-l-zinc-500">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Layer 3 — Tenants</span>
          <h3 className="text-md font-semibold text-white mt-1">Tenant Offices</h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            MassiveMusic, Sony Music NL, Sony Publishing, WINK lease private floors. Not for rent. You can only get in with a genuine business pitch, collaborator reason, or open events.
          </p>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="mt-6 border border-white/[0.08] rounded-xl bg-[#101012] overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.08] bg-zinc-900/50 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-white">Tower Tenants & Collaboration Angles</span>
          <span className="text-[10px] font-mono text-zinc-500">ADE Program Hub</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] text-zinc-500">
                <th className="p-3 font-semibold">Tenant</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Focus</th>
                <th className="p-3 font-semibold">Collab Angle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {adamToren.confirmed_tenants.map((t) => (
                <tr key={t.name} className="hover:bg-zinc-850/10">
                  <td className="p-3 font-medium text-white">{t.name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold ${
                      t.status.includes('Confirmed') 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-400 max-w-xs">{t.focus}</td>
                  <td className="p-3 text-zinc-300 font-medium">{t.collab_angle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 3. UVA SCIENCE PARK CLUSTER (Plate V)
// ==========================================
export function UvaClusterSection({ cluster, dLab }: { cluster: UvaClusterEntry[], dLab: DemonstratorLab }) {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Plate V</span>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white mt-1">UvA &amp; Science Park AI Cluster</h2>
        <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-2xl">
          Amsterdam's academic-AI flagship. Highly concentrated co-location with Informatics Institute researchers, ICAI labs, and deep-tech spinouts.
        </p>
      </div>

      {/* Cluster spaces grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cluster.slice(0, 3).map((item) => (
          <div key={item.name} className="bg-[#101012] border border-white/[0.08] rounded-xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">{item.type}</span>
              <h3 className="text-md font-semibold text-white mt-1">{item.name}</h3>
              {item.focus && (
                <span className="text-xs text-emerald-400 bg-emerald-500/[0.04] px-2 py-0.5 rounded-full inline-block mt-1 font-mono">{item.focus}</span>
              )}
              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">{item.notes}</p>
            </div>
            {(item.price_eur_month || item.price_eur_month_from) && (
              <div className="mt-4 pt-3 border-t border-white/[0.05] flex justify-between text-xs font-mono">
                <span className="text-zinc-500">Cost:</span>
                <span className="text-emerald-400 font-semibold">
                  €{item.price_eur_month || item.price_eur_month_from}/mo
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Demonstrator Lab (DLAB) detailed section */}
      <div className="bg-[#101012] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10">Incubation</span>
              <span className="text-zinc-500 text-xs font-mono">VU-powered, UvA-eligible</span>
            </div>
            <h3 className="text-xl font-serif text-white font-semibold mt-2">Demonstrator Lab (DLAB) — Free but Gated</h3>
            <p className="text-zinc-400 text-xs mt-1">A free, early-stage academic incubator providing maker facilities, labs, and equity-free support.</p>
          </div>
          <div className="text-right">
            <span className="text-zinc-500 text-xs block">Incubator Cost</span>
            <span className="text-lg font-mono text-emerald-400 font-bold">{dLab.cost}</span>
          </div>
        </div>

        {/* Playbook columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Building className="h-4 w-4 text-emerald-400" />
              Eligibility Gate &amp; Teammate Playbook
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong>The Gate:</strong> At least one team member must be a student, staff, or recent graduate of VU, UvA, HvA, or Amsterdam UMC. Idea must be ethical and scientifically grounded.
            </p>
            <div className="bg-[#0a0a0b] border border-white/[0.04] rounded-xl p-4 space-y-3 text-xs text-zinc-300">
              <span className="font-semibold block text-zinc-400">Recruiting channels:</span>
              <ul className="list-disc pl-4 space-y-2 text-zinc-400">
                {dLab.recruiting_playbook_for_qualifying_teammate.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              Incubation Stages
            </h4>
            <div className="space-y-3">
              {Object.entries(dLab.stages).map(([stageName, stage]) => (
                <div key={stageName} className="flex justify-between items-start gap-4 p-3 rounded-lg border border-white/[0.04] bg-[#0a0a0b]">
                  <div>
                    <span className="text-xs font-bold uppercase text-white font-mono">{stageName}</span>
                    <p className="text-xs text-zinc-500 mt-0.5">{stage.focus}</p>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded whitespace-nowrap">
                    {stage.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DLAB Upcoming Event */}
        {dLab.upcoming_event && (
          <div className="bg-[#0a0a0b] border border-white/[0.08] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">DLAB Open House</span>
                <span className="text-zinc-500 mt-0.5 block">{dLab.upcoming_event.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Date &amp; Time</span>
                <span className="text-zinc-300 font-mono font-semibold">{dLab.upcoming_event.date} · {dLab.upcoming_event.time}</span>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                {dLab.upcoming_event.cost}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ==========================================
// 4. EVENTS RAIL SECTION (Plate VIII)
// ==========================================
export function EventsRailSection({ events }: { events: EventRailEntry[] }) {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Plate VIII</span>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white mt-1">The Events Rail</h2>
        <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-2xl">
          Where the builder crowd actually stands in a room. Plan interview-booking sweeps around these recurring event milestones.
        </p>
      </div>

      <div className="border border-white/[0.08] rounded-xl bg-[#101012] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-zinc-900/50 text-white">
                <th className="p-3.5 font-semibold">Event</th>
                <th className="p-3.5 font-semibold">Cadence / Date</th>
                <th className="p-3.5 font-semibold">Audience / Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {events.map((e) => (
                <tr key={e.name} className="hover:bg-zinc-850/10">
                  <td className="p-3.5 font-medium text-white">{e.name}</td>
                  <td className="p-3.5 font-mono text-emerald-400 font-semibold">{e.cadence || e.dates}</td>
                  <td className="p-3.5 text-zinc-400 max-w-md leading-relaxed">{e.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
