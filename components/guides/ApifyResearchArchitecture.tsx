import { ArrowDown, ArrowRight, CheckCircle2, CircleDashed, Database, FileCheck2, FileSearch, ShieldCheck } from 'lucide-react'

export default function ApifyResearchArchitecture() {
  return (
    <figure className="not-prose my-12 rounded-3xl border border-white/15 bg-[#0b1013] p-5 text-white sm:p-8" aria-labelledby="apify-architecture-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="font-mono text-xs tracking-wider text-emerald-300">Starlight / research to evidence</p><h3 id="apify-architecture-title" className="mt-3 text-2xl font-semibold tracking-tight">One mission. One spending authority.</h3></div>
        <div className="space-y-2 text-xs text-slate-300"><p className="flex items-center gap-2"><CheckCircle2 size={14} aria-hidden className="text-emerald-300" />Existing source inspected</p><p className="flex items-center gap-2"><CircleDashed size={14} aria-hidden className="text-amber-200" />Proposed Apify extension</p></div>
      </div>
      <div className="mt-8 rounded-2xl border border-emerald-300/35 p-5"><p className="flex items-center gap-3 font-semibold"><ShieldCheck aria-hidden size={20} className="text-emerald-300" />Mission admission</p><p className="mt-3 text-sm leading-6 text-slate-300">Operator identity, stable dispatch key and Supabase budget ledger. Stop when admission is unavailable.</p></div>
      <div className="flex justify-center py-3"><ArrowDown aria-label="Then" size={20} className="text-slate-500" /></div>
      <div className="rounded-2xl border border-emerald-300/35 p-5"><p className="flex items-center gap-3 font-semibold"><FileSearch aria-hidden size={20} className="text-emerald-300" />Researcher</p><p className="mt-3 text-sm leading-6 text-slate-300">Search tenant-scoped evidence first. Existing allowlisted page reading stays available.</p></div>
      <div className="flex justify-center py-3"><ArrowDown aria-label="Proposed connection" size={20} className="text-amber-200/70" /></div>
      <div className="rounded-2xl border border-dashed border-amber-200/40 p-5">
        <p className="text-xs font-medium text-amber-200">Proposed acquisition adapter</p>
        <div className="mt-4 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]"><div><p className="font-semibold">MCP</p><p className="mt-2 text-sm leading-6 text-slate-300">Interactive, host-governed tool use</p></div><span className="text-center font-mono text-xs text-slate-400">or</span><div><p className="font-semibold">Actor API</p><p className="mt-2 text-sm leading-6 text-slate-300">Durable runner owns the lifecycle</p></div></div>
        <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-slate-300">Approved Actor + resolved build + bounded input. Persist run ID; reconcile uncertain starts before retrying.</p>
      </div>
      <div className="flex justify-center py-3"><ArrowDown aria-label="Then" size={20} className="text-amber-200/70" /></div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="h-full rounded-2xl border border-dashed border-amber-200/40 p-5"><p className="flex items-center gap-3 font-semibold"><Database aria-hidden size={18} className="text-amber-200" />Evidence ingestion</p><p className="mt-3 text-sm leading-6 text-slate-300">Permitted R2 snapshot, checksum, metadata and cost receipt.</p></div>
        <ArrowRight aria-label="Then review" size={20} className="mx-auto rotate-90 text-slate-500 sm:rotate-0" />
        <div className="h-full rounded-2xl border border-dashed border-amber-200/40 p-5"><p className="flex items-center gap-3 font-semibold"><FileCheck2 aria-hidden size={18} className="text-amber-200" />Human acceptance</p><p className="mt-3 text-sm leading-6 text-slate-300">Confirm fields and citations. Accept a draft before publication.</p></div>
      </div>
      <figcaption className="mt-6 border-t border-white/10 pt-4 text-xs leading-6 text-slate-400">Source inspection: 13 November 2026. Solid boundaries identify existing code; dashed boundaries identify proposed connections. This diagram reports no completed live Apify mission. D1 remains a receipt index; Supabase owns budget admission and settlement.</figcaption>
    </figure>
  )
}
