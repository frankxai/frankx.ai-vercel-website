import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CreatorStack } from '@/lib/llm-hub/creator-stacks'

export function CreatorStackCard({ stack }: { stack: CreatorStack }) {
  return (
    <article
      className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20"
      style={{ borderTopColor: `${stack.accent}55`, borderTopWidth: 2 }}
    >
      <header className="mb-4 flex items-center gap-2">
        <span className="text-2xl" aria-hidden>
          {stack.emoji}
        </span>
        <div>
          <h3 className="text-base font-bold leading-tight">{stack.modality}</h3>
          <p className="text-xs text-white/40">{stack.headline}</p>
        </div>
      </header>

      <div className="mb-4 space-y-2">
        {stack.picks.map((p) => {
          const inner = (
            <div className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: p.role === 'primary' ? stack.accent : 'rgba(255,255,255,0.3)' }}
                aria-hidden
              />
              <span className="flex-1">
                <span className="text-sm font-medium text-white">{p.name}</span>
                {p.role === 'primary' ? (
                  <span
                    className="ml-2 rounded-full px-1.5 py-0.5 text-[9px] uppercase tracking-wider"
                    style={{ backgroundColor: `${stack.accent}22`, color: stack.accent }}
                  >
                    Pick
                  </span>
                ) : null}
                <span className="mt-0.5 block text-xs text-white/45">{p.why}</span>
              </span>
            </div>
          )
          if (p.modelId) {
            return (
              <Link key={p.name} href={`/llm-hub/${p.modelId}`} className="block transition-opacity hover:opacity-80">
                {inner}
              </Link>
            )
          }
          if (p.href) {
            return (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-80"
              >
                {inner}
              </a>
            )
          }
          return <div key={p.name}>{inner}</div>
        })}
      </div>

      <p className="mb-4 border-t border-white/5 pt-3 text-xs leading-relaxed text-white/55">
        <span className="font-semibold text-white/70">Workflow.</span> {stack.workflow}
      </p>

      {stack.deeper ? (
        <Link
          href={stack.deeper.href}
          className="mt-auto inline-flex items-center gap-1 text-xs font-medium transition-colors"
          style={{ color: stack.accent }}
        >
          {stack.deeper.label} <ArrowRight className="h-3 w-3" />
        </Link>
      ) : null}
    </article>
  )
}
