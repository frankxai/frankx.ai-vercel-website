import type { Metadata } from 'next'
import Link from 'next/link'
import {
  TreePine,
  Heart,
  BookOpen,
  MessageCircle,
  Users,
  ArrowRight,
  Sparkles,
  Home,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Family Hub',
  description: 'The Riemer-Gorte family hub. A living digital space connecting generations through stories, memories, and shared experiences.',
  robots: { index: false, follow: false },
}

const familyLinks = [
  {
    title: 'Family Tree',
    description: 'Explore the Gorte and Riemer family lines. See how we are all connected.',
    href: '/family/tree',
    icon: TreePine,
    color: 'from-emerald-500/20 to-emerald-600/5',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Opa & Oma',
    description: 'Ein besonderer Platz fur alle Grosseltern. Inspiration, Bucher, und eine Einladung eure Geschichten zu teilen.',
    href: '/opa-und-oma',
    icon: Heart,
    color: 'from-amber-500/20 to-amber-600/5',
    borderColor: 'border-amber-500/20 hover:border-amber-500/40',
    iconColor: 'text-amber-400',
    badge: 'Auf Deutsch',
  },
  {
    title: 'Family Stories',
    description: 'Collected memories, wisdom, and stories from across the family. A growing archive of who we are.',
    href: '/family#stories',
    icon: BookOpen,
    color: 'from-violet-500/20 to-violet-600/5',
    borderColor: 'border-violet-500/20 hover:border-violet-500/40',
    iconColor: 'text-violet-400',
    badge: 'Coming Soon',
  },
]

export default function FamilyHubPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute top-40 right-1/4 h-[300px] w-[300px] rounded-full bg-amber-500/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-32 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/60">
            <Home className="h-3.5 w-3.5" />
            <span>Riemer &middot; Gorte</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Family Hub
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/60">
            A living digital space for the Riemer-Gorte family. Connecting generations
            through stories, memories, and shared inspiration. Built with love by Frank.
          </p>
        </div>
      </section>

      {/* Family Links */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {familyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative flex flex-col rounded-2xl border ${link.borderColor} bg-gradient-to-br ${link.color} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20`}
            >
              {link.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/70">
                  {link.badge}
                </span>
              )}

              <link.icon className={`mb-4 h-8 w-8 ${link.iconColor}`} />

              <h2 className="mb-2 text-xl font-semibold text-white">
                {link.title}
              </h2>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-white/50">
                {link.description}
              </p>

              <div className="flex items-center gap-1 text-sm font-medium text-white/40 transition-colors group-hover:text-white/70">
                Explore
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Family Values */}
      <section className="border-t border-white/[0.08] bg-white/[0.03]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">Why This Exists</h2>
            <p className="text-white/50">
              This hub is not a social network. It is a family archive.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Connection</h3>
              <p className="text-sm text-white/40">
                Bridge the distance between Amsterdam and Germany. Stay close even when apart.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <BookOpen className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Preservation</h3>
              <p className="text-sm text-white/40">
                Capture stories, wisdom, and memories before they fade. A gift for future generations.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                <Sparkles className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Inspiration</h3>
              <p className="text-sm text-white/40">
                Share what we are learning. Encourage each other to explore, create, and grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stories placeholder */}
      <section id="stories" className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center">
          <MessageCircle className="mx-auto mb-4 h-10 w-10 text-white/20" />
          <h2 className="mb-2 text-xl font-semibold text-white">Family Stories</h2>
          <p className="mb-6 text-white/40">
            This is where collected stories, memories, and wisdom will live.
            Share your stories through the prompts on the{' '}
            <Link href="/opa-und-oma" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
              Opa & Oma page
            </Link>.
          </p>
          <p className="text-sm text-white/30 italic">
            &ldquo;Die Familie ist das Wichtigste im Leben.&rdquo;
          </p>
        </div>
      </section>
    </main>
  )
}
