import { ArrowRight, ExternalLink, HeartHandshake, ShieldCheck, Sparkles, Users } from 'lucide-react'

import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Ana Cecilia Cancino | Collaboration Hub',
  description: 'The dedicated FrankX collaboration hub for Ana Cecilia Cancino.',
  path: '/friends/ana',
  noindex: true,
})

const principles = [
  {
    icon: HeartHandshake,
    title: 'Human judgment first',
    detail: 'Technology supports the work; relationship, context, and consequential decisions remain human.',
  },
  {
    icon: Users,
    title: 'Clear collaboration',
    detail: 'Shared work should make ownership, review, and the next decision easier to understand.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by default',
    detail: 'Working material stays in approved private systems unless publication is explicitly agreed for a named destination.',
  },
] as const

export default function AnaFriendPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ana-obsidian text-ana-cream">
      <section className="relative isolate overflow-hidden px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-36 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-ana-aurora" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-ana-gold/60 to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ana-gold/25 bg-ana-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.08em]">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              Ana × FrankX · Dedicated hub
            </div>
            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
              One calm place for our collaboration.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ana-cream/70 md:text-xl">
              This hub is the single site destination for collaboration material related to Ana. Working documents, implementation details, and private context remain in their approved systems.
            </p>
            <p className="mt-4 max-w-2xl border-l border-ana-gold/35 pl-4 text-sm leading-6 text-ana-cream/70">
              Para Ana y su equipo: un solo punto de entrada, límites claros y control explícito sobre lo que se comparte.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#principles" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-6 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white">
                See the collaboration principles
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="https://www.anaceciliacancino.com/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-6 py-3 text-sm font-semibold text-ana-cream/80 transition hover:border-white/35 hover:text-ana-cream">
                Visit Ana&apos;s site
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_36px_130px_rgba(0,0,0,0.44)] backdrop-blur-2xl">
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6 sm:p-8">
              <Sparkles className="h-6 w-6 text-ana-gold" aria-hidden="true" />
              <p className="mt-6 text-xs font-semibold tracking-[0.08em] text-ana-gold">THE BOUNDARY</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Hub context stays in the hub.</h2>
              <p className="mt-4 text-sm leading-6 text-ana-cream/60">
                Approval for this space does not automatically approve a blog post, newsletter, social post, downloadable asset, repository, or other public route.
              </p>
              <div className="mt-7 rounded-2xl border border-ana-gold/20 bg-ana-gold/[0.07] p-5 text-sm leading-6 text-ana-cream/75">
                Any new destination requires a separate publication decision and a review of copy, metadata, images, downloads, and links.
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="principles" className="px-5 pb-24 sm:px-8 md:pb-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">HOW WE WORK</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Useful collaboration needs a visible boundary.</h2>
          <div className="mt-10 grid border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-white/10">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <article key={principle.title} className={`py-8 md:px-8 md:py-10 ${index > 0 ? 'border-t border-white/10 md:border-t-0' : ''}`}>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-ana-gold/20 bg-ana-gold/[0.08] text-ana-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ana-cream/60">{principle.detail}</p>
                </article>
              )
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://www.linkedin.com/in/ana-cancino-/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-ana-cream/70 transition hover:border-white/30 hover:text-ana-cream">
              Ana on LinkedIn
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
