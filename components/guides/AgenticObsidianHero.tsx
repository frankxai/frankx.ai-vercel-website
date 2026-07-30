const layers = [
  {
    label: 'AI agent',
    title: 'Claude Code or Codex',
    detail: 'Reasons over the working set and proposes bounded changes.',
    signal: 'Intent',
  },
  {
    label: 'Operating layer',
    title: 'Agent Skills + MCP',
    detail: 'Skills define behavior. MCP exposes structured vault operations when needed.',
    signal: 'Policy',
  },
  {
    label: 'Memory substrate',
    title: 'Obsidian + Markdown + Git',
    detail: 'Plain files remain inspectable, portable, diffable, and recoverable.',
    signal: 'Truth',
  },
]

export default function AgenticObsidianHero() {
  return (
    <figure className="relative mb-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a0b] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 16% 18%, rgba(16,185,129,0.16), transparent 34%), radial-gradient(circle at 82% 76%, rgba(6,182,212,0.10), transparent 38%)',
        }}
      />
      <div className="relative">
        <div className="flex flex-col gap-3 border-b border-white/[0.08] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-300">Local-first agent architecture</p>
            <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
              The model is replaceable. Your memory is not.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-white/60">
            <span className="rounded-full border border-white/[0.08] px-3 py-1.5">Owned files</span>
            <span className="rounded-full border border-white/[0.08] px-3 py-1.5">Reviewable writes</span>
            <span className="rounded-full border border-white/[0.08] px-3 py-1.5">Portable context</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {layers.map((layer, index) => (
            <div key={layer.title} className="contents">
              <div className="min-h-44 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-white/45">{layer.label}</span>
                  <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                    {layer.signal}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">{layer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{layer.detail}</p>
              </div>
              {index < layers.length - 1 ? (
                <div className="hidden items-center px-1 text-emerald-300/50 lg:flex" aria-hidden="true">
                  <span className="h-px w-5 bg-current" />
                  <span className="-ml-1 text-lg">›</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="relative mt-5 text-sm leading-6 text-white/45">
        A durable second brain separates the memory substrate, the operating rules, and the model that acts on them.
      </figcaption>
    </figure>
  )
}
