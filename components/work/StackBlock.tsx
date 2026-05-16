import type { StackItem } from '@/content/work/types'

type StackBlockProps = {
  stack: StackItem[]
}

const CATEGORY_LABEL: Record<StackItem['category'], string> = {
  substrate: 'Substrate',
  'agent-harness': 'Agent harness',
  cloud: 'Cloud',
  frontend: 'Frontend',
  models: 'Models',
  data: 'Data',
}

/**
 * Frank's tools used on the engagement. Plain category → items grid,
 * no marketing copy on individual rows. The substrate category renders
 * first when present — that's the open-source spine.
 */
export function StackBlock({ stack }: StackBlockProps) {
  if (!stack.length) return null

  // Surface substrate first; preserve author order otherwise.
  const ordered = [...stack].sort((a, b) => {
    if (a.category === 'substrate' && b.category !== 'substrate') return -1
    if (b.category === 'substrate' && a.category !== 'substrate') return 1
    return 0
  })

  return (
    <section
      aria-labelledby="stack-heading"
      className="border-t border-white/5 py-20 lg:py-24"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Stack
          </p>
          <h2
            id="stack-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3"
          >
            The tools underneath this engagement.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            What runs in delivery. Substrate-first — the open-source spine
            anchors the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {ordered.map((block) => (
            <article
              key={block.category}
              className={`rounded-2xl border p-6 ${
                block.category === 'substrate'
                  ? 'bg-emerald-500/[0.04] border-emerald-500/20'
                  : 'bg-white/[0.025] border-white/[0.08]'
              }`}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/70 font-medium mb-4">
                {CATEGORY_LABEL[block.category]}
              </p>
              <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-2 inline-block w-1 h-1 rounded-full bg-emerald-400/60 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
