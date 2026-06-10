import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getOrg, type GenModel } from '@/lib/models-hub/registry'

export function GenModelCard({ model, accent }: { model: GenModel; accent: string }) {
  const org = getOrg(model.organization)
  return (
    <Link
      href={`/models/${model.category}/${model.id}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
    >
      <header className="mb-2 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: org?.accent_color || accent }} aria-hidden />
          <h3 className="font-bold leading-tight text-white transition-colors group-hover:text-white">{model.name}</h3>
        </div>
        {model.status === 'preview' ? (
          <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] uppercase tracking-wider text-amber-300">Preview</span>
        ) : model.status === 'legacy' ? (
          <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/50">Legacy</span>
        ) : null}
      </header>
      <p className="mb-3 text-xs text-white/40">
        {org?.name || model.organization}
        {model.io ? ` · ${model.io}` : ''}
      </p>
      {model.tagline ? <p className="mb-3 text-sm leading-relaxed text-white/65">{model.tagline}</p> : null}
      {model.highlight ? (
        <span
          className="mb-3 inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          {model.highlight}
        </span>
      ) : null}
      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3 text-xs text-white/40">
        <span>{model.pricing_note || model.license || ''}</span>
        <ArrowUpRight className="h-4 w-4 text-white/20 transition-colors group-hover:text-white/60" />
      </div>
    </Link>
  )
}
