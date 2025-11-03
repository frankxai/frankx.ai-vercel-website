import Link from 'next/link'
import { Download, Music, Code, Sparkles, Users, Zap, Book } from 'lucide-react'
import songs from '@/data/songs.json'
import SongGrid, { SongRecord } from '@/components/music/SongGrid'
import IntelligenceArsenal from '@/app/affiliates/page'
import { createMetadata } from '@/lib/seo'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const songRecords = songs as SongRecord[]

const resourcesByPersona = [
  {
    persona: 'AI Architects & Engineers',
    icon: Code,
    description: 'Enterprise-grade patterns, agent architectures, and Oracle AI integration guides',
    resources: [
      { title: 'Conscious AI Governance Playbook', type: 'PDF Guide', pages: 24 },
      { title: 'Agent Architecture Assessment', type: 'Excel Template', pages: 12 },
      { title: 'RAG System Design Canvas', type: 'PDF Canvas', pages: 1 }
    ]
  },
  {
    persona: 'Music Makers & Producers',
    icon: Music,
    description: 'Suno prompt libraries, frequency calibration techniques, and production workflows',
    resources: [
      { title: 'Suno Prompt Engineering Guide', type: 'PDF Guide', pages: 32 },
      { title: 'Frequency Alchemy Worksheet', type: 'PDF Worksheet', pages: 8 },
      { title: 'Music Production Ritual', type: 'Notion Template', pages: 15 }
    ]
  },
  {
    persona: 'Conscious Creators & Entrepreneurs',
    icon: Sparkles,
    description: 'Creator operating systems, content calendars, and soul-aligned business frameworks',
    resources: [
      { title: 'Creator Lab OS Blueprint', type: 'Notion Template', pages: 45 },
      { title: 'Content Strategy Canvas', type: 'PDF Canvas', pages: 1 },
      { title: 'Daily Intelligence Operations', type: 'Markdown Guide', pages: 8 }
    ]
  }
]

export const metadata = createMetadata({
  title: 'FrankX Resources - Free Templates, Tools & Music',
  description:
    'Access free AI templates, Suno music production guides, and consciousness-aligned systems. Built for architects, creators, and music makers.',
  keywords: [
    'ai templates',
    'suno music tutorials',
    'frankx music',
    'creator systems',
    'conscious ai resources'
  ],
  path: '/resources'
})

export default function Resources() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <main className="pb-24 pt-28">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-500/15 via-slate-950 to-slate-950 px-6 py-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-200">
              <Zap className="h-4 w-4" />
              Free Intelligence Arsenal
            </div>
            <h1 className="text-4xl font-bold sm:text-6xl leading-tight text-white">
              Everything You Need to Build with AI & Soul
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              Templates, guides, and music from the FrankX studio. All free. All proven in production.
              Whether you're architecting AI systems, creating music, or building a conscious business.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl font-bold text-primary-200">30+</p>
                <p className="mt-2 text-sm font-semibold text-white">Free Templates</p>
                <p className="mt-1 text-xs text-white/60">Ready to deploy</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl font-bold text-primary-200">50+</p>
                <p className="mt-2 text-sm font-semibold text-white">Music Tracks</p>
                <p className="mt-1 text-xs text-white/60">For focus & flow</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl font-bold text-primary-200">$0</p>
                <p className="mt-2 text-sm font-semibold text-white">Forever Free</p>
                <p className="mt-1 text-xs text-white/60">Community first</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-200">Choose Your Path</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Resources by Creator Type</h2>
              <p className="mt-4 text-white/60">Pick the collection that matches your mission</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {resourcesByPersona.map((category) => {
                const IconComponent = category.icon
                return (
                  <div
                    key={category.persona}
                    className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-primary-400/40 hover:bg-white/10"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/20 transition-transform group-hover:scale-110">
                      <IconComponent className="h-7 w-7 text-primary-200" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-white">{category.persona}</h3>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">{category.description}</p>

                    <div className="mt-6 space-y-3">
                      {category.resources.map((resource) => (
                        <div
                          key={resource.title}
                          className="rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white">{resource.title}</p>
                              <p className="mt-1 text-xs text-white/60">
                                {resource.type} • {resource.pages} pages
                              </p>
                            </div>
                            <Download className="h-4 w-4 shrink-0 text-primary-200" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/resources/templates"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
                    >
                      <Book className="h-4 w-4" />
                      Browse All Templates
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-200">
                <Music className="h-4 w-4" />
                Fresh from the studio
              </div>
              <h2 className="text-3xl font-semibold text-white">Frequency-Aligned Music for Creators</h2>
              <p className="mt-4 max-w-2xl mx-auto text-white/60">
                Suno-powered tracks designed for deep work, meditation, and creative flow. Stream for free, use in your projects, elevate your rituals.
              </p>
            </div>

            <SongGrid songs={songRecords} limit={6} />

            <div className="mt-12 text-center">
              <Link
                href="/music"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <Music className="h-4 w-4" />
                Explore Full Music Catalog
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-3xl border border-primary-400/30 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-200">
                  <Sparkles className="h-4 w-4" />
                  Coming Soon
                </div>
                <h3 className="text-3xl font-semibold text-white">Join the AI Music Academy Waitlist</h3>
                <p className="text-white/70 leading-relaxed">
                  Learn to create professional-quality music with Suno AI. Master prompt engineering, frequency design, and transformation soundscapes. First cohort launches soon.
                </p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 shrink-0 text-primary-200" />
                    <span>12-week intensive with live Suno production sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 shrink-0 text-primary-200" />
                    <span>Private creator community and collaborative releases</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Book className="h-5 w-5 shrink-0 text-primary-200" />
                    <span>Complete prompt library and production frameworks</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <form action="/api/newsletter" method="POST" className="space-y-4">
                  <input type="hidden" name="tag" value="music-academy" />
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-primary-500/50 hover:-translate-y-0.5"
                  >
                    Join the Waitlist
                  </button>
                </form>
                <p className="mt-4 text-xs text-center text-white/50">
                  Early access starts Q2 2025. No spam, pure signal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <IntelligenceArsenal />
      </main>

      <Footer />
    </div>
  )
}
