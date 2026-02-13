import Link from 'next/link'

export const metadata = {
  title: 'Vision & Business | FrankX',
  description: 'How FrankX operates: the ecosystem, the products, the mission. A transparent look at what we\'re building and why.',
}

const pillars = [
  {
    title: 'Knowledge Layer',
    description: '70+ technical articles, 7 research portals, validated sources. Free, deep, and built for search engines and AI citations.',
    stat: '70+ articles',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
  {
    title: 'Operating Systems',
    description: 'Three interconnected platforms: Vibe OS (creative state), GenCreator OS (multi-modal production), ACOS (agentic orchestration with 630+ skills).',
    stat: '3 platforms',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/20',
  },
  {
    title: 'Products & Programs',
    description: 'Digital products, prompt libraries, courses, and high-touch programs. From free lead magnets to premium engagements.',
    stat: '$0 to $12k+',
    accent: 'text-purple-400',
    border: 'border-purple-500/20',
  },
  {
    title: 'Community',
    description: 'Inner Circle for serious builders. Coaching for individuals ready to go deep. A network of creators who ship.',
    stat: 'High-touch',
    accent: 'text-amber-400',
    border: 'border-amber-500/20',
  },
]

const revenue = [
  { tier: 'Free', products: 'Soulbook, Vibe OS, Blog, Sample Packs', purpose: 'Lead generation & trust' },
  { tier: '$27-97', products: 'Prompt Libraries, Creative AI Toolkit', purpose: 'First purchase, qualification' },
  { tier: '$297-997', products: 'Creation Chronicles, Creator Lab OS', purpose: 'Core revenue, transformation' },
  { tier: '$2.5k-12k+', products: 'Enterprise Programs, Creator Studio, Residency', purpose: 'Premium, high-touch' },
]

const principles = [
  { title: 'Ship Before Perfect', body: 'A working product beats a polished deck. We launch, learn, iterate.' },
  { title: 'Depth Over Breadth', body: 'Go deeper on fewer things rather than surface-level on many.' },
  { title: 'Build in Public', body: 'Transparent development via /changelog and /feed. Show the process, not just the result.' },
  { title: 'AI-Native Operations', body: 'Every workflow uses AI. Not as a feature — as the foundation.' },
  { title: 'Let the Work Speak', body: 'No hype. No guru energy. Results, craft, and genuine value.' },
]

export default function BusinessPlanPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Header */}
      <section className="border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
          <Link
            href="/"
            className="text-white/40 hover:text-white/70 text-sm transition-colors mb-6 inline-block"
          >
            Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Vision & Business
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            A transparent look at how FrankX operates. What we build, why we build it,
            and the business model that sustains it.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-b border-white/5">
        <h2 className="text-2xl font-bold mb-4">Mission</h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
          Help creators and technologists build real things with AI. Not hype — working systems,
          shipped products, and sustainable businesses. FrankX exists at the intersection of
          AI architecture, music production, and the creator economy.
        </p>
      </section>

      {/* Ecosystem Pillars */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-b border-white/5">
        <h2 className="text-2xl font-bold mb-8">Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className={`rounded-xl border ${pillar.border} bg-white/[0.02] p-6`}
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-semibold">{pillar.title}</h3>
                <span className={`text-xs font-mono ${pillar.accent}`}>{pillar.stat}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Value Ladder */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-b border-white/5">
        <h2 className="text-2xl font-bold mb-2">Value Ladder</h2>
        <p className="text-white/40 text-sm mb-8">How products connect from free to premium</p>
        <div className="space-y-3">
          {revenue.map((tier) => (
            <div
              key={tier.tier}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 rounded-lg border border-white/5 bg-white/[0.02] px-5 py-4"
            >
              <span className="text-emerald-400 font-mono text-sm font-semibold w-24 shrink-0">
                {tier.tier}
              </span>
              <span className="text-white/70 text-sm flex-1">{tier.products}</span>
              <span className="text-white/30 text-xs shrink-0">{tier.purpose}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Operating Principles */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-b border-white/5">
        <h2 className="text-2xl font-bold mb-8">Operating Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-5"
            >
              <h3 className="text-sm font-semibold mb-2">{principle.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{principle.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Want to work together?</h2>
          <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
            Whether you're building with AI, creating content, or scaling a creator business.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/inner-circle"
              className="text-sm px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all"
            >
              Inner Circle
            </Link>
            <Link
              href="/coaching"
              className="text-sm px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all"
            >
              Coaching
            </Link>
            <Link
              href="/products"
              className="text-sm px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all"
            >
              Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
