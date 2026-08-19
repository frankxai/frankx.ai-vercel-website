/** Exact-text routing panel. Built in HTML so numbers cannot garble. */
export default function Grok46RoutingPanel() {
  return (
    <section
      id="grok46-panel"
      className="mb-12 rounded-2xl border border-white/[0.1] bg-[#111113] p-6 md:p-8"
      aria-labelledby="grok46-panel-title"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Code-built panel · not an image model</p>
      <h2 id="grok46-panel-title" className="mt-2 text-xl font-bold text-white">
        Grok 4.6 in the stack
      </h2>
      <p className="mt-2 text-sm text-white/55 max-w-2xl">
        Reading order: text model, image backend, compare, arena rule.
      </p>
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {[
          ['Reasoning', 'Grok 4.6 · 500k context · AA Index 61 (vendor + AA)'],
          ['Images', 'Grok Imagine, Codex image_gen, Antigravity generate_image'],
          ['Catalog', 'LLM Hub + /llm-hub/compare/grok-4-6-vs-grok-4-3'],
          ['Arena', 'Claude-native SIS receipts only. No invented Grok winner.'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-white/[0.08] px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-emerald-300/80">{k}</p>
            <p className="mt-1 text-sm text-white/80">{v}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
