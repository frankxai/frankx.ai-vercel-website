import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getGenModelsByCategory, type CategoryMeta } from '@/lib/models-hub/registry'

/** Text category links out to the dedicated /llm-hub vertical. */
export function CategoryCard({ category, isText = false }: { category?: CategoryMeta; isText?: boolean }) {
  if (isText) {
    return (
      <Link
        href="/llm-hub"
        className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25"
        style={{ borderTopColor: '#a855f766', borderTopWidth: 2 }}
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold">Text & Reasoning</h3>
          <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-purple-300">
            LLM Hub
          </span>
        </div>
        <p className="mb-4 text-sm text-white/55">
          Frontier LLMs — Claude, GPT, Gemini, Grok, Llama, DeepSeek. Benchmarks, live pricing, agentic platforms, comparisons.
        </p>
        <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-purple-300">
          Open the LLM Hub <ArrowRight className="h-3 w-3" />
        </span>
      </Link>
    )
  }

  if (!category) return null
  const models = getGenModelsByCategory(category.id)
  const top = models.slice(0, 4)

  return (
    <Link
      href={`/models/${category.id}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25"
      style={{ borderTopColor: `${category.accent}66`, borderTopWidth: 2 }}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">{category.label}</h3>
        <span className="text-xs text-white/35">{models.length} models</span>
      </div>
      <p className="mb-4 text-sm text-white/55">{category.tagline}</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {top.map((m) => (
          <span
            key={m.id}
            className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/60"
          >
            {m.name}
          </span>
        ))}
        {models.length > top.length ? (
          <span className="rounded-full px-2 py-0.5 text-[11px] text-white/30">+{models.length - top.length}</span>
        ) : null}
      </div>
      <span
        className="mt-auto inline-flex items-center gap-1 text-xs font-medium"
        style={{ color: category.accent }}
      >
        Explore {category.label.toLowerCase()} <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  )
}
