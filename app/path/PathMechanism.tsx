type Step = {
  title: string
  body: string
}

const ACCENT = {
  fuchsia: {
    rule: 'bg-fuchsia-400/60',
    index: 'text-fuchsia-300',
  },
  blue: {
    rule: 'bg-blue-400/60',
    index: 'text-blue-300',
  },
  emerald: {
    rule: 'bg-emerald-400/60',
    index: 'text-emerald-300',
  },
} as const

export function PathMechanism({
  heading,
  steps,
  accent,
}: {
  heading: string
  steps: readonly [Step, Step, Step]
  accent: keyof typeof ACCENT
}) {
  const tone = ACCENT[accent]

  return (
    <section className="border-t border-white/5 bg-[#0a0a0b] py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-14 font-display text-3xl font-bold tracking-tight">{heading}</h2>
        <div className="relative">
          <div className={`pointer-events-none absolute top-3 bottom-3 left-[0.85rem] w-px ${tone.rule}`} aria-hidden />
          <ol>
            {steps.map((step, index) => (
              <li key={step.title} className="relative pb-12 pl-12 last:pb-0">
                <span className={`absolute left-0 top-0 font-mono text-xs tabular-nums ${tone.index}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-3 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
